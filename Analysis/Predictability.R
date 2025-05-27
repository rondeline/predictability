## Libraries
library(tidyverse)
library(jsonlite)
library(stringr)

## Read Data 
data <- fromJSON("all_responses_identifiable.json")

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
  filter(!is.na(stimulus_item))

View(join_data)

emails <- survey |> 
  filter(item == "email")

View(emails)
  
View(survey)
  

    




