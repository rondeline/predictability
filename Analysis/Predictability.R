## Libraries
library(tidyverse)
library(jsonlite)
library(stringr)
library(ggthemes)
library(binom)

## Read Data 
data <- fromJSON("predictability_6325.json")

unnest_data <- data |> 
  unnest(exp_data, names_sep = "_")

flat <- unnest_data |> 
  unnest_wider(response, names_sep = "_") |> 
  unnest_wider(consent, names_sep = "_") |> 
  unnest_wider(study, names_sep = "_") |> 
  unnest_wider(participant, names_sep = "_") |> 
  unnest_wider(child, names_sep = "_")

tidy_data <- flat |> 
  select(child_hashed_id, response_date_created, response_eligibility, child_age_rounded, child_gender, child_condition_list, exp_data_trial_type, exp_data_trial_index, exp_data_response, exp_data_condition_label, exp_data_condition_number, exp_data_stimulus_item, exp_data_selected_item) |>
  filter(as_datetime(response_date_created)>=as_datetime("2025-04-30"), 
         exp_data_trial_type!="survey") |>
  unnest(c(response_eligibility, 
         response_date_created,
         exp_data_response,
         exp_data_stimulus_item)) |> 
  mutate(age=round(as.numeric(child_age_rounded)/365,2)) |> 
  select(child_hashed_id, response_date_created, response_eligibility, age, everything())

## Renaming 
renaming_data <- tidy_data |> 
  rename(gender = child_gender, 
         date_created = response_date_created, 
         eligibility = response_eligibility,
         age_rounded = child_age_rounded,
         trial_type = exp_data_trial_type,
         trial_index = exp_data_trial_index,
         data_response = exp_data_response,
         condition_label = exp_data_condition_label,
         condition_number = exp_data_condition_number,
         stimulus_item = exp_data_stimulus_item,
         selected_item = exp_data_selected_item,
         condition_list = child_condition_list)

## We need to exclude kids (based on: eligibility, English exposure, condition list)
## Data visualistion code + stats code 
## Ppt emails 

survey <- flat |> 
  select(child_hashed_id, exp_data_trial_type, exp_data_response) |> 
  filter(exp_data_trial_type == "survey") |> 
  unnest(exp_data_response) |>
  distinct(child_hashed_id, exp_data_response) |>
  mutate(item = case_when(exp_data_response %in% c("African/Black", "Asian/Pacific Islander", "Caucasian/White", "Hispanic/Latino", "Native/Ingenous Peoples", "Other", "Prefer not to say") ~ "race",
                          str_detect(exp_data_response, "@") ~ "email",
                          exp_data_response %in% c("None of the time", "Some of the time", "Most of the time", "All of the time") ~ "english",
                          exp_data_response %in% c("Are not at all bothered", "Are a little bothered", "Are somewhat bothered", "Are very bothered", "Are extremely bothered") ~ "noise",
                          exp_data_response %in% c("Less than high school", "High school or GED", "Some college", "Bachelor's degree", "Master's degree", "Graduate or professional degree", "Prefer not to say") ~ "education",          
                          TRUE ~ NA)) |> 
  filter(!is.na(item)) |> 
  pivot_wider(names_from = item,
              values_from = exp_data_response,
              values_fn = ~ first(.x)) |>
  unnest(cols = c(race, email, english, noise, education)) |> 
  mutate(race = case_when(str_detect(race, ",") ~ "Multiracial",
                          TRUE ~ race))

join_data <- renaming_data |> 
  left_join(survey, by = "child_hashed_id") |> 
  filter(!is.na(stimulus_item),
         as.Date(date_created) >= as.Date("2025-05-30")) |> 
  mutate(age_years = case_when(age >= 3 & age < 4 ~ 3,
                               age >= 4 & age < 5 ~ 4,
                               age >= 5 & age < 6 ~ 5),
         condition_label = case_when(condition_label == "uphorn" ~ "Unpredictable Noise",
                                     condition_label == "phorn" ~ "Predictable Noise",
                                     condition_label == "pstore" ~ "Predictable Speech",
                                     condition_label == "upstore" ~ "Unpredictable Speech",
                                     condition_label == "silence" ~ "Silence"))

View(join_data)

# Analysis
full_analysis <- join_data |>
  filter(stimulus_item != "penguin") |> 
  mutate(answer = case_when(stimulus_item == "car" ~ "box_car",
                            stimulus_item == "ambulance" ~ "box_car",
                            stimulus_item == "bus" ~ "box_car",
                            stimulus_item == "truck" ~ "box_car",
                            stimulus_item == "horse" ~ "box_dog",
                            stimulus_item == "lion" ~ "box_dog",
                            stimulus_item == "turtle" ~ "box_car",
                            stimulus_item == "bird" ~ "box_car"),
         correct = case_when(selected_item == answer ~ 1,
                             TRUE ~ 0),
         predictability = case_when(
           condition_label %in% c("Unpredictable Noise", "Unpredictable Speech") ~ "Unpredictable",
           condition_label %in% c("Predictable Noise", "Predictable Speech") ~ "Predictable",
           TRUE ~ "Silence")) |> 
  group_by(predictability) |> 
  summarise(mean_correct = mean(correct),
            ci_l = binom.bayes(x = sum(correct), n = n())$lower,
            ci_u = binom.bayes(x = sum(correct), n = n())$upper,
            n = n())

View(full_analysis)

ggplot(full_analysis, aes(x = predictability, y = mean_correct, fill = predictability)) +
  geom_bar(stat = "identity", position = position_dodge(width = 0.2)) +
  ylim(0,1) +
  xlab("Condition") +
  ylab("Accuracy") +
  geom_hline(yintercept = 0.5, linetype = "dashed") +
  #coord_flip() +
  theme_few() +
  theme(legend.position = "none")

target_analysis <- join_data |> 
  filter(stimulus_item %in% c("bird", "turtle")) |> 
  mutate(answer = case_when(stimulus_item == "bird" ~ "box_car",
                            stimulus_item == "turtle" ~ "box_car"),
         correct = case_when(selected_item == answer ~ 1,
                             TRUE ~ 0)) |> 
  group_by(condition_label) |> 
  summarise(mean_correct = mean(correct),
            ci_l = binom.bayes(x = sum(correct), n = n())$lower,
            ci_u = binom.bayes(x = sum(correct), n = n())$upper,
            n = n()) |> 
  mutate(condition_label = fct_reorder(condition_label, mean_correct, .desc = FALSE))

View(target_analysis)

# Data Viz
ggplot(target_analysis, aes(x = condition_label, y = mean_correct, fill = condition_label)) +
  geom_bar(stat = "identity", position = position_dodge(width = 0.2)) +
  ylim(0,1) +
  xlab("Condition") +
  ylab("Accuracy") +
  geom_hline(yintercept = 0.5, linetype = "dashed") +
  coord_flip() +
  theme_few() +
  theme(legend.position = "none")

grouped_analysis <- join_data |> 
  filter(stimulus_item %in% c("bird", "turtle")) |> 
  mutate(answer = "box_car",
         correct = as.integer(selected_item == answer),
         predictability = case_when(
           condition_label %in% c("Unpredictable Noise", "Unpredictable Speech") ~ "Unpredictable",
           condition_label %in% c("Predictable Noise", "Predictable Speech") ~ "Predictable",
           TRUE ~ "Silence")) |> 
  group_by(child_hashed_id, predictability) |> 
  summarise(subject_mean = mean(correct), .groups = "drop") |> 
  group_by(predictability) |> 
  summarise(
    mean_correct = mean(subject_mean),
    ci_l = binom.bayes(x = sum(subject_mean), n = n())$lower,
    ci_u = binom.bayes(x = sum(subject_mean), n = n())$upper,
    n = n()) |> 
  mutate(predictability = fct_reorder(predictability, mean_correct, .desc = FALSE))
  
  View(grouped_analysis)
  
# Data Viz
ggplot(target_analysis, aes(x = condition_label, y = mean_correct, fill = condition_label)) +
  geom_bar(stat = "identity", position = position_dodge(width = 0.2)) +
  ylim(0,1) +
  xlab("Condition") +
  ylab("Accuracy") +
  geom_hline(yintercept = 0.5, linetype = "dashed") +
  coord_flip() +
  theme_few()

ggplot(grouped_analysis, aes(x = predictability, y = mean_correct, fill = predictability)) +
  geom_bar(stat = "identity", position = position_dodge(width = 0.2)) +
  #geom_errorbar(aes(ymin = ci_l, ymax = ci_u),
                #position = position_dodge(width = 0.9), width = 0.3) +
  ylim(0,1) +
  xlab("Condition") +
  ylab("Accuracy") +
  geom_hline(yintercept = 0.5, linetype = "dashed") +
  theme_few() +
  theme(legend.position = "none")

age_analysis <- join_data |> 
  filter(stimulus_item %in% c("bird", "turtle")) |> 
  mutate(answer = "box_car",
         correct = as.integer(selected_item == answer),
         predictability = case_when(
           condition_label %in% c("Unpredictable Noise", "Unpredictable Speech") ~ "Unpredictable",
           condition_label %in% c("Predictable Noise", "Predictable Speech") ~ "Predictable",
           TRUE ~ "Silence")) |> 
  group_by(child_hashed_id, predictability, age_years) |>
  summarise(subject_mean = mean(correct), .groups = "drop") |> 
  group_by(predictability, age_years) |> 
  summarise(
    mean_correct = mean(subject_mean),
    ci_l = binom.bayes(x = sum(subject_mean), n = n())$lower,
    ci_u = binom.bayes(x = sum(subject_mean), n = n())$upper,
    n = n()) |> 
  mutate(predictability = fct_reorder(predictability, mean_correct, .desc = FALSE))

View(age_analysis)
  
# Emails to pay participants 
emails <- survey |> 
  select(email)

View(emails)
  
View(survey)
  

    




