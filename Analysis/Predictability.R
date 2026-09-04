## Libraries
library(tidyverse)
library(jsonlite)
library(stringr)
library(ggthemes)
library(binom)
library(dplyr)
library(rstanarm)
library(emmeans)

## Read Data 
data <- fromJSON("predictability_81726.json")

data <- data |>
  mutate(
    exp_data = map(
      exp_data,
      ~ {.x$response <- as.list(.x$response)
        .x}))

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
  filter(as_datetime(response_date_created)>=as_datetime("2026-08-01"),
         exp_data_trial_type!="survey") |>
  unnest(c(response_eligibility, 
         response_date_created,
         exp_data_response,
         exp_data_stimulus_item)) |> 
  mutate(age=round(as.numeric(child_age_rounded)/365,2)) |> 
  select(child_hashed_id, response_date_created, response_eligibility, age, everything()) |>
  group_by(child_hashed_id) |>
  fill(exp_data_condition_label, .direction = "downup") |>
  ungroup()

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

# join_data <- renaming_data |> 
#   left_join(survey, by = "child_hashed_id") |> 
#   filter(!is.na(stimulus_item),
#          as.Date(date_created) >= as.Date("2025-12-03")) |> #2025-11-20
#   mutate(age_years = case_when(age >= 5 & age < 6 ~ 5,
#                                age >= 6 & age < 7 ~ 6,
#                                age >= 7 & age < 8 ~ 7),
#          condition_label = case_when(condition_label == "uphorn" ~ "Unpredictable Noise",
#                                      condition_label == "phorn" ~ "Predictable Noise",
#                                      condition_label == "pstore" ~ "Predictable Speech",
#                                      condition_label == "upstore" ~ "Unpredictable Speech",
#                                      condition_label == "silence" ~ "Silence"))

join_data <- renaming_data |> 
  left_join(survey, by = "child_hashed_id") |> 
  filter(!is.na(stimulus_item)) |> 
  mutate(condition_label = case_when(condition_label == "uphorn" ~ "Unpredictable Noise",
                                     condition_label == "phorn" ~ "Predictable Noise",
                                     condition_label == "pstore" ~ "Predictable Speech",
                                     condition_label == "upstore" ~ "Unpredictable Speech",
                                     condition_label == "silence" ~ "Silence"),
         answer = case_when(stimulus_item == "alligator" ~ "box_car",
                            stimulus_item == "ambulance" ~ "box_car",
                            stimulus_item == "bear_green" ~ "box_car",
                            stimulus_item == "bear_purple" ~ "box_dog",
                            stimulus_item == "bird" ~ "box_car",
                            stimulus_item == "bunny" ~ "box_dog",
                            stimulus_item == "bus" ~ "box_car",
                            stimulus_item == "butterfly" ~ "box_car",
                            stimulus_item == "car" ~ "box_car",
                            stimulus_item == "car_blue" ~ "box_car",
                            stimulus_item == "car_orange" ~ "box_car",
                            stimulus_item == "cow" ~ "box_dog",
                            stimulus_item == "dinosaur" ~ "box_car",
                            stimulus_item == "firetruck" ~ "box_car",
                            stimulus_item == "fish" ~ "box_car",
                            stimulus_item == "giraffe" ~ "box_dog",
                            stimulus_item == "horse" ~ "box_dog",
                            stimulus_item == "lion" ~ "box_dog",
                            stimulus_item == "lizard" ~ "box_car",
                            stimulus_item == "penguin" ~ "box_dog",
                            stimulus_item == "pickup" ~ "box_car",
                            stimulus_item == "pig" ~ "box_dog",
                            stimulus_item == "police" ~ "box_car",
                            stimulus_item == "tiger" ~ "box_dog",
                            stimulus_item == "truck" ~ "box_car",
                            stimulus_item == "truck_green" ~ "box_car",
                            stimulus_item == "turtle" ~ "box_car",
                            stimulus_item == "snake" ~ "box_car"),
         age_years = case_when(age >= 5 & age < 6 ~ 5,
                               age >= 6 & age < 7 ~ 6,
                               age >= 7 & age < 8 ~ 7),
         correct = case_when(selected_item == answer ~ 1,
                             TRUE ~ 0),
         predictability = case_when(
           condition_label %in% c("Unpredictable Noise", "Unpredictable Speech") ~ "Unpredictable",
           condition_label %in% c("Predictable Noise", "Predictable Speech") ~ "Predictable",
           TRUE ~ "Silence")) |> 
  filter(!is.na(age_years))
         # keep_row = case_when(condition_label %in% c("Predictable Noise",
         #                                             "Predictable Speech",
         #                                             "Unpredictable Noise",
         #                                             "Unpredictable Speech") &
         #                        as.Date(date_created) >= as.Date("2025-12-03") ~ TRUE,
         #                      condition_label == "Silence" &
         #                        as.Date(date_created) >= as.Date("2025-11-20") ~ TRUE,
         #                      TRUE ~ FALSE)) |>
  # filter(keep_row) |>   
  # select(-keep_row)

# Analysis
full_analysis <- join_data |>
  filter(stimulus_item != "penguin",
         stimulus_item != "car",
         stimulus_item != "bear_green",
         stimulus_item != "bear_purple") |> 
  group_by(predictability) |> 
  summarise(mean_correct = mean(correct),
            ci_l = binom.bayes(x = sum(correct), n = n())$lower,
            ci_u = binom.bayes(x = sum(correct), n = n())$upper,
            n = n())

View(full_analysis)

ggplot(full_analysis, aes(x = predictability, y = mean_correct, fill = predictability)) +
  geom_bar(stat = "identity", position = position_dodge(width = 0.2)) +
  geom_errorbar(aes(ymin = ci_l, ymax = ci_u), width = 0.2) +
  ylim(0,1) +
  xlab("Condition") +
  ylab("Accuracy") +
  scale_fill_manual(values = c("Predictable" = "#213352", "Silence" = "#8C1515", "Unpredictable" = "#4D4F53")) +
  geom_hline(yintercept = 0.5, linetype = "dashed") +
  #coord_flip() +
  theme_few() +
  theme(legend.position = "none")

full_analysis_trial <- join_data |>
  filter(stimulus_item != "penguin",
         stimulus_item != "car",
         stimulus_item != "bear_green",
         stimulus_item != "bear_purple")
  
full_analysis_trial$predictability <- factor(full_analysis_trial$predictability, levels = c('Silence', 'Predictable', 'Unpredictable'))

full_analysis_model <- stan_glmer(correct ~ predictability + (1 | child_hashed_id),
      family = binomial,
      data = full_analysis_trial)

summary(full_analysis_model,
        probs = c(0.025, 0.975),
        digits = 2)

full_analysis_emmeans <- emmeans(full_analysis_model, pairwise ~ predictability)

target_analysis <- join_data |> 
  filter(stimulus_item %in% c("alligator", "bird", "butterfly", "dinosaur", "fish", "lizard", "snake", "turtle")) |>
  group_by(predictability) |> 
  summarise(mean_correct = mean(correct),
            ci_l = binom.bayes(x = sum(correct), n = n())$lower,
            ci_u = binom.bayes(x = sum(correct), n = n())$upper,
            n = n()) |> 
  mutate(predictability = fct_reorder(predictability, mean_correct, .desc = FALSE))

View(target_analysis)

ggplot(target_analysis, aes(x = predictability, y = mean_correct, fill = predictability)) +
  geom_bar(stat = "identity", position = position_dodge(width = 0.2)) +
  geom_errorbar(aes(ymin = ci_l, ymax = ci_u), width = 0.2) +
  ylim(0,1) +
  xlab("Condition") +
  ylab("Accuracy") +
  scale_fill_manual(values = c("Predictable" = "#213352", "Silence" = "#8C1515", "Unpredictable" = "#4D4F53")) +
  geom_hline(yintercept = 0.5, linetype = "dashed") +
  #coord_flip() +
  theme_few() +
  theme(legend.position = "none")

target_analysis_trial <- join_data |> 
  filter(stimulus_item %in% c("alligator", "bird", "butterfly", "dinosaur", "fish", "lizard", "snake", "turtle"))

target_analysis_trial_participant <- target_analysis_trial |> 
  ungroup() |> 
  group_by(child_hashed_id) |> 
  reframe(predictability = predictability,
          mean_correct = mean(correct)) 
  
View(target_analysis_trial_participant)

target_analysis_model <- stan_glmer(correct ~ predictability + (1 | child_hashed_id),
                                  family = binomial,
                                  data = target_analysis_trial)

target_analysis_emmeans <- emmeans(target_analysis_model, pairwise ~ predictability)

target_analysis_trial_summary <- summary(target_analysis_model,
        probs = c(0.025, 0.975),
        digits = 2)

nontarget_analysis <- join_data |> 
  filter(stimulus_item %in% c("bus", "ambulance", "truck", "horse", "lion", "pickup", "car_blue", "giraffe", 
                              "car_orange", "police", "tiger", "bunny", "firetruck", "truck_green", "cow", "pig")) |> 
  group_by(predictability) |> 
  summarise(mean_correct = mean(correct),
            ci_l = binom.bayes(x = sum(correct), n = n())$lower,
            ci_u = binom.bayes(x = sum(correct), n = n())$upper,
            n = n()) |> 
  mutate(predictability = fct_reorder(predictability, mean_correct, .desc = FALSE))

View(nontarget_analysis)

ggplot(nontarget_analysis, aes(x = predictability, y = mean_correct, fill = predictability)) +
  geom_bar(stat = "identity", position = position_dodge(width = 0.2)) +
  geom_errorbar(aes(ymin = ci_l, ymax = ci_u), width = 0.2) +
  ylim(0,1) +
  xlab("Condition") +
  ylab("Accuracy") +
  scale_fill_manual(values = c("Predictable" = "#213352", "Silence" = "#8C1515", "Unpredictable" = "#4D4F53")) +
  geom_hline(yintercept = 0.5, linetype = "dashed") +
  #coord_flip() +
  theme_few() +
  theme(legend.position = "none")

nontarget_analysis_trial <- join_data |> 
  filter(stimulus_item %in% c("bus", "ambulance", "truck", "horse", "lion", "pickup", "car_blue", "giraffe", 
                              "car_orange", "police", "tiger", "bunny", "firetruck", "truck_green", "cow", "pig"))

nontarget_analysis_model <- stan_glmer(correct ~ predictability + (1 | child_hashed_id),
                                    family = binomial,
                                    data = nontarget_analysis_trial)

nontarget_analysis_trial_summary <- summary(nontarget_analysis_model,
                                         probs = c(0.025, 0.975),
                                         digits = 2)

nontarget_analysis_emmeans <- emmeans(nontarget_analysis_model, pairwise ~ predictability)

nontarget_analysis_age <- join_data |> 
  filter(stimulus_item %in% c("bus", "ambulance", "truck", "horse", "lion", "pickup", "car_blue", "giraffe", 
                              "car_orange", "police", "tiger", "bunny", "firetruck", "truck_green", "cow", "pig")) |>
  group_by(predictability, age_years) |> 
  summarise(mean_correct = mean(correct),
            ci_l = binom.bayes(x = sum(correct), n = n())$lower,
            ci_u = binom.bayes(x = sum(correct), n = n())$upper,
            n = n()) |> 
  mutate(predictability = fct_reorder(predictability, mean_correct, .desc = FALSE))

View(nontarget_analysis_age)

target_analysis_age <- join_data |> 
  filter(stimulus_item %in% c("alligator", "bird", "butterfly", "dinosaur", "fish", "lizard", "snake", "turtle")) |> 
  group_by(predictability, age_years) |> 
  summarise(mean_correct = mean(correct),
            ci_l = binom.bayes(x = sum(correct), n = n())$lower,
            ci_u = binom.bayes(x = sum(correct), n = n())$upper,
            n = n()) |> 
  mutate(predictability = fct_reorder(predictability, mean_correct, .desc = FALSE))

View(target_analysis_age)
  
# Data Viz
ggplot(target_analysis, aes(x = predictability, y = mean_correct, fill = predictability)) +
  geom_bar(stat = "identity", position = position_dodge(width = 0.2)) +
  ylim(0,1) +
  xlab("Condition") +
  ylab("Accuracy") +
  geom_hline(yintercept = 0.5, linetype = "dashed") +
  coord_flip() +
  theme_few() +
  theme(legend.position = "none")

grouped_analysis <- join_data |> 
  filter(stimulus_item %in% c("bird", "turtle", )) |> 
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

#Presentation Order- Unpredictable
presentation_order <- join_data |> 
  filter(condition_label == "Unpredictable Speech",
         stimulus_item %in% c("butterfly", "snake", "bird", "fish", "turtle"))


age_analysis <- join_data |> 
  filter(stimulus_item %in% c("alligator", "bird", "butterfly", "dinosaur", "fish", "lizard", "snake", "turtle")) |> 
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

# Individual Trial Performance
trial_performance <- join_data |> 
  mutate(switch = case_when(stimulus_item %in% c("bus", "ambulance", "truck", "horse", "lion", "pickup", "car_blue", "giraffe", 
                                                 "car_orange", "police", "tiger", "bunny", "firetruck", "truck_green", "cow", "pig") ~ "nonswitch",
                            stimulus_item %in% c("alligator", "bird", "butterfly", "dinosaur", "fish", "lizard", "snake", "turtle") ~ "switch")) |>
  filter(!is.na(switch)) |> 
  select(child_hashed_id, predictability, stimulus_item, switch, correct, everything())

View(trial_performance)

# Comprehension Check
comprehension_check <- join_data |>
  mutate(trial = case_when(stimulus_item %in% c("penguin", "car") ~ "training",
                           stimulus_item %in% c("bus", "ambulance", "truck", "horse", "lion", "pickup", "car_blue", "giraffe", 
                                                "car_orange", "police", "tiger", "bunny", "firetruck", "truck_green", "cow", "pig",
                                                "alligator", "bird", "butterfly", "dinosaur", "fish", "lizard", "snake", "turtle") ~ "test",
                           stimulus_item %in% c("bear_green", "bear_purple") ~ "comprehension"),
         switch = case_when(stimulus_item %in% c("bus", "ambulance", "truck", "horse", "lion", "pickup", "car_blue", "giraffe", 
                                                 "car_orange", "police", "tiger", "bunny", "firetruck", "truck_green", "cow", "pig") ~ "nonswitch",
                            stimulus_item %in% c("alligator", "bird", "butterfly", "dinosaur", "fish", "lizard", "snake", "turtle") ~ "switch")) |>
  filter(trial != "training") |> 
  group_by(child_hashed_id, predictability) |>
  summarise(comprehension = mean(correct[trial == "comprehension"], na.rm = TRUE),
            bear_green = correct[stimulus_item == "bear_green"][1],
            bear_purple = correct[stimulus_item == "bear_purple"][1],
            test_overall = mean(correct[trial == "test"], na.rm = TRUE),
            nonswitch = mean(correct[trial == "test" & switch == "nonswitch"], na.rm = TRUE),
            switch = mean(correct[trial == "test" & switch == "switch"], na.rm = TRUE),
            ci_l = binom.bayes(x = sum(correct), n = n())$lower,
            ci_u = binom.bayes(x = sum(correct), n = n())$upper,
            n = n())
  
View(comprehension_check)

# Demographic Data
race <- join_data |> 
  distinct(child_hashed_id, .keep_all = TRUE) |> 
  group_by(race) |> 
  summarise(n = n(),
            percentage = n/16*100)

View(race)

gender <- join_data |> 
  distinct(child_hashed_id, .keep_all = TRUE) |> 
  group_by(gender) |> 
  summarise(n = n(),
            percentage = n/16*100)

View(gender)
  
# Emails to pay participants 
emails <- survey |> 
  select(email)

View(emails)
  
View(survey)

# Power analysis

library(lme4)
library(purrr)

set.seed(123)

## ---------------------------
## 1. DESIGN
## ---------------------------
n_items_total      <- 20
n_switch_items     <- 5
n_nonswitch_items  <- n_items_total - n_switch_items

# Item-level trial_type (same for everyone)
item_df <- data.frame(
  item_id    = factor(1:n_items_total),
  trial_type = c(rep("non_switch", n_nonswitch_items),
                 rep("switch",     n_switch_items))
)

## ---------------------------
## 2. TRUE EFFECTS from pilot data
## ---------------------------

# Silence (reference condition)
silence_nonswitch <- 0.978
silence_switch    <- 0.833

# Predictable
pred_nonswitch <- 0.827
pred_switch    <- 0.760

# Unpredictable
un_nonswitch <- 0.983
un_switch    <- 0.450

# Intercept: Silence, non-switch
baseline_acc <- silence_nonswitch
beta_0 <- qlogis(baseline_acc)

# Main effect of trial type: switch vs non-switch in Silence
beta_trial_type <- qlogis(silence_switch) - qlogis(silence_nonswitch)

# Main effects of condition on non-switch trials (vs Silence)
beta_cond_predictable   <- qlogis(pred_nonswitch) - qlogis(silence_nonswitch)
beta_cond_unpredictable <- qlogis(un_nonswitch)  - qlogis(silence_nonswitch)

# Interaction: extra switch cost in each condition vs Silence
switch_cost_silence <- qlogis(silence_switch) - qlogis(silence_nonswitch)
switch_cost_pred    <- qlogis(pred_switch)    - qlogis(pred_nonswitch)
switch_cost_un      <- qlogis(un_switch)      - qlogis(un_nonswitch)

beta_int_predictable   <- switch_cost_pred - switch_cost_silence
beta_int_unpredictable <- switch_cost_un   - switch_cost_silence

# (Optional) shrink effects a bit to be conservative
shrink <- 0.7
beta_trial_type        <- beta_trial_type        * shrink
beta_cond_predictable  <- beta_cond_predictable  * shrink
beta_cond_unpredictable<- beta_cond_unpredictable* shrink
beta_int_predictable   <- beta_int_predictable   * shrink
beta_int_unpredictable <- beta_int_unpredictable * shrink

# Random-effect SDs (tweak if you like)
sd_participant <- 0.7
sd_item        <- 0.4

## ---------------------------
## 3. Function to simulate one dataset and test interaction
## ---------------------------

simulate_one <- function(n_per_condition) {
  
  conditions <- c("Silence", "Predictable", "Unpredictable")
  
  # Participants per condition
  participants <- data.frame(
    condition = factor(rep(conditions, each = n_per_condition),
                       levels = conditions),
    participant_id = factor(unlist(lapply(conditions, function(cond) {
      paste0(cond, "_", seq_len(n_per_condition))
    })))
  )
  
  # Cross with items: each participant sees all items
  df <- crossing(participants, item_df)  # adds item_id + trial_type
  
  # Treatment coding (Silence & non_switch as reference)
  df <- df |>
    mutate(
      cond_predictable   = ifelse(condition == "Predictable",   1, 0),
      cond_unpredictable = ifelse(condition == "Unpredictable", 1, 0),
      is_switch          = ifelse(trial_type == "switch",       1, 0)
    )
  
  # Random intercepts
  n_participants <- nlevels(df$participant_id)
  n_items        <- nlevels(df$item_id)
  
  u_participant <- rnorm(n_participants, 0, sd_participant)
  u_item        <- rnorm(n_items,        0, sd_item)
  
  df$u_participant <- u_participant[df$participant_id]
  df$u_item        <- u_item[df$item_id]
  
  # Linear predictor
  df <- df |>
    mutate(
      eta = beta_0 +
        beta_cond_predictable   * cond_predictable +
        beta_cond_unpredictable * cond_unpredictable +
        beta_trial_type         * is_switch +
        beta_int_predictable    * (cond_predictable   * is_switch) +
        beta_int_unpredictable  * (cond_unpredictable * is_switch) +
        u_participant + u_item,
      p   = plogis(eta),
      accuracy = rbinom(n(), 1, p)
    )
  
  # Fit model; occasionally it may not converge, so wrap in tryCatch
  fit <- tryCatch(
    glmer(
      accuracy ~ condition * trial_type +
        (1 | participant_id) + (1 | item_id),
      data = df,
      family = binomial,
      control = glmerControl(optimizer = "bobyqa",
                             optCtrl = list(maxfun = 2e5))
    ),
    error = function(e) NULL,
    warning = function(w) {
      # still return the model if it exists
      if (inherits(w, "warning")) invokeRestart("muffleWarning")
    }
  )
  
  if (is.null(fit)) return(NA)
  
  coefs <- summary(fit)$coefficients
  
  # Name is usually "conditionUnpredictable:trial_typeswitch"
  p_val <- coefs["conditionUnpredictable:trial_typeswitch", "Pr(>|z|)"]
  
  p_val < 0.05  # TRUE = detected interaction
}

## ---------------------------
## 4. Run power analysis
## ---------------------------

n_sims <- 200  # bump to 500+ when you're happy with runtime
n_per_condition_vec <- c(15, 20, 25, 30, 35, 40)

power_results <- lapply(n_per_condition_vec, function(npc) {
  res <- replicate(n_sims, simulate_one(n_per_condition = npc))
  data.frame(
    n_per_condition = npc,
    total_n = 3 * npc,
    power = mean(res, na.rm = TRUE)
  )
}) |> bind_rows()

power_results





