## Libraries
library(tidyverse)
library(jsonlite)
library(stringr)

## Read Data 
data <- fromJSON("all_responses_identifiable.json")
View(data)

unnest_data <- data |> 
  unnest(exp_data, names_sep = "_")
View(unnest_data)

flat <- unnest_data |> 
  unnest_wider(response, names_sep = "_") |> 
  unnest_wider(consent, names_sep = "_") |> 
  unnest_wider(study, names_sep = "_") |> 
  unnest_wider(participant, names_sep = "_") |> 
  unnest_wider(child, names_sep = "_")
View(flat)

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
View(tidy_data)

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
View(renaming_data)

## We need to exclude kids (based on: eligibility, English exposure, condition list)
## Data visualistion code + stats code 
## Ppt emails 

survey <- flat |> 
  select(child_hashed_id, exp_data_trial_type, exp_data_response) |> 
  filter(exp_data_trial_type == "survey") |> 
  unnest(exp_data_response) |>  
  mutate(race = case_when(str_detect(exp_data_response, "African/Black")~exp_data_response, 
                          str_detect(exp_data_response, "Asian/Pacific Islander")~exp_data_response,
                          str_detect(exp_data_response, "Caucasian/White")~exp_data_response,
                          str_detect(exp_data_response, "Native/Ingenous Peoples")~exp_data_response,
                          str_detect(exp_data_response, "Other")~exp_data_response,
                          str_detect(exp_data_response, "Prefer not to say")~exp_data_response,
                          TRUE~NA),
         email = case_when(str_detect(exp_data_response, "@")~exp_data_response,
                           TRUE~NA),
         english = case_when(exp_data_response %in% c("None of the time", "Some of the time", "Most of the time", "All of the time")~exp_data_response,
                             TRUE~NA),
         noise = case_when(exp_data_response %in% c("Are not at all bothered", "Are a little bothered", "Are somewhat bothered", "Are very bothered", "Are extremely bothered")~exp_data_response,
                           TRUE~NA),
         education = case_when(exp_data_response %in% c("Less than high school", "High school or GED", "Some college", "Bachelor's degree", "Master's degree", "Graduate or professional degree", "Prefer not to say")~exp_data_response,
                               TRUE~NA))

survey[survey == NULL] <- NA





  filter(!is.null(race))


View(survey)




         

         
#No

race_c = coalesce(race, email),
email_c = coalesce(email, race)) |> 
  select(child_hashed_id, race_c, email_c)

         
         across(c(race, email), ~replace(., is.na(.), ""), .names = "{.col}_clean")) |> 
  select(child_hashed_id, race_clean, email_clean)



        





  
  mutate(race = case_when(str_detect(race, ",")~"Multiracial",
                          TRUE~race))

  

           ## Can try doing them all together or try doing them seperately 
           ## Goal is to create another column called race, where the race data that is within exp_data_response is now also in the new column (so I should then have 4 columns in total)
           
  


included <- renaming_data |> 
  filter(eligibility == "Eligible",
         english == "Most of the time" | "All of the time")




