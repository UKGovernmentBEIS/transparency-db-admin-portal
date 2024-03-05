// ********************************************************************
// Gov.UK transparency subsidy scheme add review details module
// ********************************************************************

const express = require("express");
var session = require("express-session");
const router = express.Router();

router.post("/", (req, res) => {
  ssn = req.session;
  if (
    typeof ssn.dashboard_roles_object_id1 === "undefined" ||
    typeof ssn.dashboard_roles_object_id2 === "undefined"
  ) {
    res.redirect("/signout");
  } else {
    res.set("X-Frame-Options", "DENY");
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Content-Security-Policy", 'frame-ancestors "self"');
    res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    isAddSubsidyPrimarycall = false;
    ssn.GetMonthName = "";
    ssn.GetConfirmationMonthName = "";
    ssn.SubsidyErrors = [];
    ssn.SubsidyFocus = [];
    Additem = 0;
    ssn.SubsidyArraySize = 0;
    ssn.Subsidy_Measure_Title_Error = false;
    ssn.Subsidy_Adhoc_Error = false;
    ssn.Subsidy_Measure_Title_255_Error = false;
    ssn.Granting_Authority_URL_255_Error = false;
    ssn.Granting_Authority_Policy_255_Error = false;
    ssn.Legal_Basis_Error = false;
    ssn.Granting_Authority_Name_Error = false;
    ssn.Granting_Authority_URL_Error = false;
    ssn.Granting_Authority_Name_Inactive_Error = false;
    ssn.Granting_Authority_Policy_Error = false;
    ssn.Budget_Error = false;
    ssn.scheme_issued_start_year_Error = false;
    ssn.scheme_issued_start_month_Error = false;
    ssn.scheme_issued_start_day_Error = false;
    ssn.scheme_issued_end_year_Error = false;
    ssn.scheme_issued_end_month_Error = false;
    ssn.scheme_issued_end_day_Error = false;
    ssn.scheme_issued_end_day_lesser_Error = false;
    ssn.Subsidy_Scheme_Description_Error = false;
    ssn.Subsidy_Scheme_Description_Length_Error = false;
    ssn.spendingsector_Error = false;
    ssn.Maximum_Amount_Under_Scheme_255_Error = false;

    var {
      Subsidy_Adhoc,
      scNumber,
      Granting_Authority_Name,
      Subsidy_Measure_Title,
      Legal_Basis,
      Granting_Authority_URL,
      Granting_Authority_Policy,
      Budget,
      Maximum_Amount_Under_Scheme,
      scheme_issued_confirmation_year,
      scheme_issued_confirmation_month,
      scheme_issued_confirmation_day,
      scheme_issued_start_year,
      scheme_issued_start_month,
      scheme_issued_start_day,
      scheme_issued_end_year,
      scheme_issued_end_month,
      scheme_issued_end_day,
      buttonvalue,
      spendingsector_accommodation,
      spendingsector_activities_of_extraterritorial,
      spendingsector_undifferentiated_goods,
      spendingsector_administrative,
      spendingsector_agriculture_forestry_and_fishing,
      spendingsector_arts_entertainment,
      spendingsector_construction,
      spendingsector_education,
      spendingsector_Electricity_gas_steam_and_air_conditioning_supply,
      spendingsector_financial_and_insurance_activities,
      spendingsector_human_health,
      spendingsector_information_and_communication,
      spendingsector_Manufacturing,
      spendingsector_mining_and_quarrying,
      spendingsector_Other_service_activities,
      spendingsector_professional,
      spendingsector_public_administration,
      spendingsector_real_estate_activities,
      spendingsector_transportation_and_storage,
      spendingsector_water_supply,
      spendingsector_wholesale_and_retail_trade,
      myCheck,
      has_no_end_date,
      Subsidy_Scheme_Description
    } = req.body;

    ssn.Subsidy_Adhoc_Global = Subsidy_Adhoc;
    ssn.scNumber_Global = scNumber;
    ssn.Granting_Authority_Name_Global = Granting_Authority_Name;
    ssn.Subsidy_Measure_Title_Global = Subsidy_Measure_Title;
    ssn.Legal_Basis_Global = Legal_Basis;
    ssn.Granting_Authority_URL_Global = Granting_Authority_URL;
    ssn.Granting_Authority_Policy_Global = Granting_Authority_Policy;
    ssn.Subsidy_Scheme_Description_Global = Subsidy_Scheme_Description;
    const formatter = new Intl.NumberFormat("en-GB");

    if (Budget.includes(",")) Budget = Budget.split(",").join("");
    formatedCurrency = formatter.format(Budget);

    ssn.Budget_Global = Budget;
    ssn.Maximum_Amount_Under_Scheme_Global = Maximum_Amount_Under_Scheme;
    ssn.Scheme_Confirmation_Day_Global = scheme_issued_confirmation_day;
    ssn.Scheme_Confirmation_Month_Global = scheme_issued_confirmation_month;
    ssn.Scheme_Confirmation_Year_Global = scheme_issued_confirmation_year;
    ssn.Scheme_Start_Day_Global = scheme_issued_start_day;
    ssn.Scheme_Start_Month_Global = scheme_issued_start_month;
    ssn.Scheme_Start_Year_Global = scheme_issued_start_year;
    ssn.Has_No_End_Date_Global = has_no_end_date;
    ssn.Has_No_End_Date_Output_Global = "NA";

    if (ssn.Subsidy_Adhoc_Global == "Yes") {
      ssn.Scheme_End_Day_Global = scheme_issued_start_day;
      ssn.Scheme_End_Month_Global = scheme_issued_start_month;
      ssn.Scheme_End_Year_Global = scheme_issued_start_year;
      scheme_issued_end_day = scheme_issued_start_day;
      scheme_issued_end_month = scheme_issued_start_month;
      scheme_issued_end_year = scheme_issued_start_year;
    } else if ((ssn.Subsidy_Adhoc_Global == "No") && (myCheck == "on")) {
      ssn.Scheme_End_Day_Global = 31;
      ssn.Scheme_End_Month_Global = 12;
      ssn.Scheme_End_Year_Global = 9999;
      ssn.Has_No_End_Date_Global = true;
      scheme_issued_end_day = 31;
      scheme_issued_end_month = 12;
      scheme_issued_end_year = 9999;
      has_no_end_date = true;
    } else {
      ssn.Scheme_End_Day_Global = scheme_issued_end_day;
      ssn.Scheme_End_Month_Global = scheme_issued_end_month;
      ssn.Scheme_End_Year_Global = scheme_issued_end_year;
    }



    const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August','September', 'October', 'November', 'December'];

    ssn.GetConfirmationMonthName = monthArray[((parseInt(scheme_issued_confirmation_month)) - 1)];
    ssn.GetMonthName = monthArray[((parseInt(scheme_issued_start_month)) - 1)];
    ssn.GetEndMonthName = monthArray[((parseInt(scheme_issued_end_month)) - 1)];

    var spendingSectorArray = new Array();
    ssn.Spending_Sector_Array_Global = spendingSectorArray


    if(spendingsector_accommodation){
      ssn.spendingsector_accommodation_Global = spendingsector_accommodation;
      spendingSectorArray.push(spendingsector_accommodation);
    }

    if(spendingsector_activities_of_extraterritorial){
      ssn.spendingsector_activities_of_extraterritorial_Global = spendingsector_activities_of_extraterritorial;
      spendingSectorArray.push(spendingsector_activities_of_extraterritorial);
    }

    if(spendingsector_undifferentiated_goods){
      ssn.spendingsector_undifferentiated_goods_Global = spendingsector_undifferentiated_goods;
      spendingSectorArray.push(spendingsector_undifferentiated_goods);
    }

    if(spendingsector_administrative){
      ssn.spendingsector_administrative_Global = spendingsector_administrative;
      spendingSectorArray.push(spendingsector_administrative);
    }

    if(spendingsector_agriculture_forestry_and_fishing){
      ssn.spendingsector_agriculture_forestry_and_fishing_Global = spendingsector_agriculture_forestry_and_fishing;
      spendingSectorArray.push(spendingsector_agriculture_forestry_and_fishing);
    }

    if(spendingsector_arts_entertainment){
      ssn.spendingsector_arts_entertainment_Global = spendingsector_arts_entertainment;
      spendingSectorArray.push(spendingsector_arts_entertainment);
    }

    if(spendingsector_construction){
      ssn.spendingsector_construction_Global = spendingsector_construction;
      spendingSectorArray.push(spendingsector_construction);
    }

    if(spendingsector_education){
      ssn.spendingsector_education_Global = spendingsector_education;
      spendingSectorArray.push(spendingsector_education);
    }

    if(spendingsector_Electricity_gas_steam_and_air_conditioning_supply){
      ssn.spendingsector_Electricity_gas_steam_and_air_conditioning_supply_Global = spendingsector_Electricity_gas_steam_and_air_conditioning_supply;
      spendingSectorArray.push(spendingsector_Electricity_gas_steam_and_air_conditioning_supply);
    }

    if(spendingsector_financial_and_insurance_activities){
      ssn.spendingsector_financial_and_insurance_activities_Global = spendingsector_financial_and_insurance_activities;
      spendingSectorArray.push(spendingsector_financial_and_insurance_activities);
    }

    if(spendingsector_human_health){
      ssn.spendingsector_human_health_Global = spendingsector_human_health;
      spendingSectorArray.push(spendingsector_human_health);
    }

    if(spendingsector_information_and_communication){
      ssn.spendingsector_information_and_communication_Global = spendingsector_information_and_communication;
      spendingSectorArray.push(spendingsector_information_and_communication);
    }

    if(spendingsector_Manufacturing){
      ssn.spendingsector_Manufacturing_Global = spendingsector_Manufacturing;
      spendingSectorArray.push(spendingsector_Manufacturing);
    }

    if(spendingsector_mining_and_quarrying){
      ssn.spendingsector_mining_and_quarrying_Global = spendingsector_mining_and_quarrying;
      spendingSectorArray.push(spendingsector_mining_and_quarrying);
    }

    if(spendingsector_Other_service_activities){
      ssn.spendingsector_Other_service_activities_Global = spendingsector_Other_service_activities;
      spendingSectorArray.push(spendingsector_Other_service_activities);
    }

    if(spendingsector_professional){
      ssn.spendingsector_professional_Global = spendingsector_professional;
      spendingSectorArray.push(spendingsector_professional);
    }

    if(spendingsector_public_administration){
      ssn.spendingsector_public_administration_Global = spendingsector_public_administration;
      spendingSectorArray.push(spendingsector_public_administration);
    }

    if(spendingsector_real_estate_activities){
      ssn.spendingsector_real_estate_activities_Global = spendingsector_real_estate_activities;
      spendingSectorArray.push(spendingsector_real_estate_activities);
    }

    if(spendingsector_transportation_and_storage){
      ssn.spendingsector_transportation_and_storage_Global = spendingsector_transportation_and_storage;
      spendingSectorArray.push(spendingsector_transportation_and_storage);
    }

    if(spendingsector_water_supply){
      ssn.spendingsector_water_supply_Global = spendingsector_water_supply;
      spendingSectorArray.push(spendingsector_water_supply);
    }

    if(spendingsector_wholesale_and_retail_trade){
      ssn.spendingsector_wholesale_and_retail_trade_Global = spendingsector_wholesale_and_retail_trade;
      spendingSectorArray.push(spendingsector_wholesale_and_retail_trade);
    }

    ssn.Scheme_Sector_Json_Global = JSON.stringify(spendingSectorArray);

    if (buttonvalue == "Update") {
      //Empty field validations

      if (!Subsidy_Measure_Title) {
        ssn.Subsidy_Measure_Title_Error = true;
        ssn.SubsidyErrors.push("Enter the subsidy scheme name");
        ssn.SubsidyFocus.push("#Subsidy_Measure_Title");
        // Additem = Additem + 1;
      }
      if (Subsidy_Measure_Title != "" && Subsidy_Measure_Title > 255) {
        ssn.Subsidy_Measure_Title_Error = false;
        ssn.Subsidy_Measure_Title_255_Error = true;
        ssn.SubsidyErrors.push(
          "Subsidy scheme name cannot be greater than 255 characters"
        );
        ssn.SubsidyFocus.push("#Subsidy_Measure_Title");
        // Additem = Additem + 1;
      }

      if (Granting_Authority_URL != "" && Granting_Authority_URL.length > 255) {
        ssn.Granting_Authority_URL_Error = false;
        ssn.Granting_Authority_URL_255_Error = true;
        ssn.SubsidyErrors.push(
          "Public authority policy url cannot be greater than 255 characters"
        );
        ssn.SubsidyFocus.push("#Granting_Authority_URL");
        // Additem = Additem + 1;
      }

      if (
        Granting_Authority_Policy != "" &&
        Granting_Authority_Policy.length > 255
      ) {
        ssn.Granting_Authority_Policy_Error = false;
        ssn.Granting_Authority_Policy_255_Error = true;
        ssn.SubsidyErrors.push(
          "Public authority policy description cannot be greater than 255 characters"
        );
        ssn.SubsidyFocus.push("#Granting_Authority_Policy");
        // Additem = Additem + 1;
      }
      if (!Subsidy_Adhoc) {
        ssn.Subsidy_Adhoc_Error = true;
        ssn.SubsidyErrors.push(" Select the adhoc subsidy scheme");
        ssn.SubsidyFocus.push("#Subsidy_Adhoc");
        // Additem = Additem + 1;
      }

      if (Subsidy_Scheme_Description == ""){
        ssn.Subsidy_Scheme_Description_Error = true;
        ssn.SubsidyErrors.push("Enter the Subsidy scheme description");
        ssn.SubsidyFocus.push("#Subsidy_Scheme_Description");
      } else if (Subsidy_Scheme_Description.length > 10000){
        ssn.Subsidy_Scheme_Description_Length_Error = true;
        ssn.SubsidyErrors.push("The subsidy scheme description must be 10000 characters or less.");
        ssn.SubsidyFocus.push("#Subsidy_Scheme_Description");
      }

      if (!Legal_Basis) {
        ssn.Legal_Basis_Error = true;
        ssn.SubsidyErrors.push("Enter a valid legal basis");
        ssn.SubsidyFocus.push("#Legal_Basis");
        // Additem = Additem + 1;
      }

      if (Granting_Authority_URL != "" && !Granting_Authority_Policy) {
        ssn.Granting_Authority_Policy_Error = true;
        ssn.SubsidyErrors.push("If you provide a URL, you must also provide a policy description");
        ssn.SubsidyFocus.push("#Granting_Authority_Policy");
      }

      if (Granting_Authority_Policy != "" && !Granting_Authority_URL) {
        ssn.Granting_Authority_URL_Error = true;
        ssn.SubsidyErrors.push("If you provide a policy description, you must also provide a URL");
        ssn.SubsidyFocus.push("#Granting_Authority_URL");
      }

      if (!Budget) {
        ssn.Budget_Error = true;
        ssn.SubsidyErrors.push("Enter the budget");
        ssn.SubsidyFocus.push("#Budget");
        // Additem = Additem + 1;
      }
      if (Maximum_Amount_Under_Scheme.length > 255) {
        ssn.Maximum_Amount_Under_Scheme_255_Error = true;
        ssn.SubsidyErrors.push("Maximum amount under a scheme cannot be greater than 255 characters");
        ssn.SubsidyFocus.push("#Maximum_Amount_Under_Scheme");
      }
      if (!scheme_issued_start_day) {
        ssn.scheme_issued_start_day_Error = true;
        ssn.SubsidyErrors.push("Enter the legal starting day of the date");
        ssn.SubsidyFocus.push("#scheme_issued_start_day");
        // Additem = Additem + 1;
      }
      if (scheme_issued_start_day != "") {
        // day validation starts here

        if (scheme_issued_start_day > 31 || scheme_issued_start_day < 1) {
          ssn.scheme_issued_start_day_Error = true;
          ssn.SubsidyErrors.push(
            "Enter a valid starting day"
          );
          ssn.SubsidyFocus.push("#scheme_issued_start_day");
          // Additem = Additem + 1;
        }

        if (
          scheme_issued_start_day == 31 &&
          (scheme_issued_start_month == parseInt("02", 8) ||
            scheme_issued_start_month == parseInt("04", 8) ||
            scheme_issued_start_month == parseInt("06", 8) ||
            scheme_issued_start_month == parseInt("09", 8) ||
            scheme_issued_start_month == 11)
        ) {
          ssn.scheme_issued_start_day_Error = true;
          ssn.SubsidyErrors.push("Enter a valid starting day");
          ssn.SubsidyFocus.push("#scheme_issued_start_day");
          // Additem = Additem + 1;
        }

        if (
          scheme_issued_start_day == 29 &&
          scheme_issued_start_month == parseInt("02", 8)
        ) {
          if (
            (scheme_issued_start_year % 4 == 0 &&
              scheme_issued_start_year % 100 != 0) ||
            scheme_issued_start_year % 400 == 0
          ) {
          } else {
            ssn.scheme_issued_start_day_Error = true;
            ssn.SubsidyErrors.push("Enter a valid starting day");
            ssn.SubsidyFocus.push("#scheme_issued_start_day");
            // Additem = Additem + 1;
          }
        }

        if (
          scheme_issued_start_day == 30 &&
          scheme_issued_start_month == parseInt("02", 8)
        ) {
          ssn.scheme_issued_start_day_Error = true;
          ssn.SubsidyErrors.push("Enter a valid starting day");
          ssn.SubsidyFocus.push("#scheme_issued_start_day");
          // Additem = Additem + 1;
        }
      }
      // day validation ends here

      if (!scheme_issued_confirmation_month) {
        ssn.scheme_issued_confirmation_month_Error = true;
        ssn.SubsidyErrors.push(
          "     Enter the legal confirmation month of the date"
        );
        ssn.SubsidyFocus.push("#scheme_issued_confirmation_month");
        // Additem = Additem + 1;
      }
      if (scheme_issued_confirmation_month != "") {
        if (scheme_issued_confirmation_month > 12 || scheme_issued_confirmation_month == 0) {
          ssn.scheme_issued_confirmation_month_Error = true;
          ssn.SubsidyErrors.push(
            "     Enter the legal confirmation month from 1 to 12"
          );
          ssn.SubsidyFocus.push("#scheme_issued_confirmation_month");
          // Additem = Additem + 1;
        }
      }
      if (!scheme_issued_confirmation_year) {
        ssn.scheme_issued_confirmation_year_Error = true;
        ssn.SubsidyErrors.push(
          "     Enter the legal confirmation year of the date"
        );
        ssn.SubsidyFocus.push("#scheme_issued_confirmation_year");
        // Additem = Additem + 1;
      }
      if (!scheme_issued_confirmation_day) {
        ssn.scheme_issued_confirmation_day_Error = true;
        ssn.SubsidyErrors.push("     Enter the legal confirmation day of the date");
        ssn.SubsidyFocus.push("#scheme_issued_confirmation_day");
        // Additem = Additem + 1;
      }
      if (scheme_issued_confirmation_day != "") {
        // day validation starts here

        if (scheme_issued_confirmation_day > 31 || scheme_issued_confirmation_day < 1) {
          ssn.scheme_issued_confirmation_day_Error = true;
          ssn.SubsidyErrors.push(
            "     Enter the valid legal confirmation day of the date"
          );
          ssn.SubsidyFocus.push("#scheme_issued_confirmation_day");
          // Additem = Additem + 1;
        }

        if (
          scheme_issued_confirmation_day == 31 &&
          (scheme_issued_confirmation_month == parseInt("02", 8) ||
            scheme_issued_confirmation_month == parseInt("04", 8) ||
            scheme_issued_confirmation_month == parseInt("06", 8) ||
            scheme_issued_confirmation_month == parseInt("09", 10) ||
            scheme_issued_confirmation_month == 11)
        ) {
          ssn.scheme_issued_confirmation_day_Error = true;
          ssn.SubsidyErrors.push("     Enter the valid day");
          ssn.SubsidyFocus.push("#scheme_issued_confirmation_day");
          // Additem = Additem + 1;
        }

        if (
          scheme_issued_confirmation_day == 29 &&
          scheme_issued_confirmation_month == parseInt("02", 8)
        ) {
          if (
            (scheme_issued_confirmation_year % 4 == 0 &&
              scheme_issued_confirmation_year % 100 != 0) ||
            scheme_issued_confirmation_year % 400 == 0
          ) {
          } else {
            ssn.scheme_issued_confirmation_day_Error = true;
            ssn.SubsidyErrors.push("     Enter the valid day");
            ssn.SubsidyFocus.push("#scheme_issued_confirmation_day");
            // Additem = Additem + 1;
          }
        }

        if (scheme_issued_confirmation_year > 9999) {
          ssn.scheme_issued_confirmation_year_Error = true;
          ssn.SubsidyErrors.push(
            "     Maximum year that can be added is 9999"
          );
          ssn.SubsidyFocus.push("#scheme_issued_confirmation_year");
        }

        if (
          scheme_issued_confirmation_day == 30 &&
          scheme_issued_confirmation_month == parseInt("02", 8)
        ) {
          ssn.scheme_issued_confirmation_day_Error = true;
          ssn.SubsidyErrors.push("Enter the valid day");
          ssn.SubsidyFocus.push("#scheme_issued_confirmation_day");
          // Additem = Additem + 1;
        }
      }
      // day velidation ends here

      if(!ssn.scheme_issued_confirmation_day_Error && !ssn.scheme_issued_confirmation_month_Error && !ssn.scheme_issued_confirmation_year_Error){
        const now = Date.now();
        const confirmationDateString = scheme_issued_confirmation_year.concat('-',scheme_issued_confirmation_month,'-',scheme_issued_confirmation_day);
        const confirmationDate = Date.parse(confirmationDateString);

        if(confirmationDate > now){
          ssn.scheme_issued_confirmation_year_Error = true;
          ssn.scheme_issued_confirmation_month_Error = true;
          ssn.scheme_issued_confirmation_day_Error = true;
          ssn.SubsidyErrors.push("Confirmation date cannot be in the future");
          ssn.SubsidyFocus.push("#scheme_issued_confirmation_day");
        }
      }

      if (!scheme_issued_start_month) {
        ssn.scheme_issued_start_month_Error = true;
        ssn.SubsidyErrors.push(
          "Enter the legal starting month of the date"
        );
        ssn.SubsidyFocus.push("#scheme_issued_start_month");
        // Additem = Additem + 1;
      }
      if (scheme_issued_start_month != "") {
        if (scheme_issued_start_month > 12 || scheme_issued_start_month == 0) {
          ssn.scheme_issued_start_month_Error = true;
          ssn.SubsidyErrors.push(
            "Enter the legal starting month from 1 to 12"
          );
          ssn.SubsidyFocus.push("#scheme_issued_start_month");
          // Additem = Additem + 1;
        }
      }
      if (!scheme_issued_start_year) {
        ssn.scheme_issued_start_year_Error = true;
        ssn.SubsidyErrors.push(
          "Enter the legal starting year of the date"
        );
        ssn.SubsidyFocus.push("#scheme_issued_start_year");
        // Additem = Additem + 1;
      }
      if (ssn.Subsidy_Adhoc_Global != "Yes") {
        if (!scheme_issued_end_day) {
          ssn.scheme_issued_end_day_Error = true;
          ssn.SubsidyErrors.push(
            "Enter the legal end day of the date"
          );
          ssn.SubsidyFocus.push("#scheme_issued_end_day");
          // Additem = Additem + 1;
        }

        // day validation starts here
        if (scheme_issued_end_day != "") {
          var sdate = new Date(
            scheme_issued_start_year +
              "-" +
              scheme_issued_start_month +
              "-" +
              scheme_issued_start_day
          );
          var edate = new Date(
            scheme_issued_end_year +
              "-" +
              scheme_issued_end_month +
              "-" +
              scheme_issued_end_day
          );

          if (sdate > edate) {
            ssn.scheme_issued_end_day_Error = false;
            ssn.scheme_issued_end_day_lesser_Error = true;
            ssn.SubsidyErrors.push("End date should be later than start date");
            ssn.SubsidyFocus.push("#scheme_issued_end_day");
          }

          if (scheme_issued_end_day > 31 || scheme_issued_end_day < 1) {
            ssn.scheme_issued_end_day_Error = true;
            ssn.SubsidyErrors.push("Enter the valid end date");
            ssn.SubsidyFocus.push("#scheme_issued_end_day");
            // Additem = Additem + 1;
          }

          if (
            scheme_issued_end_day == 31 &&
            (scheme_issued_end_month == parseInt("02", 8) ||
              scheme_issued_end_month == parseInt("04", 8) ||
              scheme_issued_end_month == parseInt("06", 8) ||
              scheme_issued_end_month == parseInt("09", 8) ||
              scheme_issued_end_month == 11)
          ) {
            ssn.scheme_issued_end_day_Error = true;
            ssn.SubsidyErrors.push("Enter the valid end date");
            ssn.SubsidyFocus.push("#scheme_issued_end_day");
            // Additem = Additem + 1;
          }

          if (
            scheme_issued_end_day == 29 &&
            scheme_issued_end_month == parseInt("02", 8)
          ) {
            if (
              (scheme_issued_end_year % 4 == 0 &&
                scheme_issued_end_year % 100 != 0) ||
              scheme_issued_end_year % 400 == 0
            ) {
            } else {
              ssn.scheme_issued_end_day_Error = true;
              ssn.SubsidyErrors.push("Enter the valid end date");
              ssn.SubsidyFocus.push("#scheme_issued_end_day");
              // Additem = Additem + 1;
            }
          }

          if (
            scheme_issued_end_day == 30 &&
            scheme_issued_end_month == parseInt("02", 8)
          ) {
            ssn.scheme_issued_end_day_Error = true;
            ssn.SubsidyErrors.push("Enter the valid end date");
            ssn.SubsidyFocus.push("#scheme_issued_end_day");
            // Additem = Additem + 1;
          }
        }
        // day velidation ends here

        if (!scheme_issued_end_month) {
          ssn.scheme_issued_end_month_Error = true;
          ssn.SubsidyErrors.push(
            "Enter the legal end month of the date"
          );
          ssn.SubsidyFocus.push("#scheme_issued_end_month");
          // Additem = Additem + 1;
        }
        if (scheme_issued_end_month != "") {
          if (scheme_issued_end_month > 12 || scheme_issued_end_month == 0) {
            ssn.scheme_issued_end_month_Error = true;
            ssn.SubsidyErrors.push(
              "Enter a legal end month from 1 to 12"
            );
            ssn.SubsidyFocus.push("#scheme_issued_end_month");
            // Additem = Additem + 1;
          }
        }
        if (!scheme_issued_end_year) {
          ssn.scheme_issued_end_year_Error = true;
          ssn.SubsidyErrors.push(
            "Enter the legal end year of the date"
          );
          ssn.SubsidyFocus.push("#scheme_issued_end_year");
          // Additem = Additem + 1;
        }
        if (spendingSectorArray.length == 0){
          ssn.spendingsector_Error = true;
          ssn.SubsidyErrors.push(
            "Enter at least one or more spending sector(s)"
          );
          ssn.SubsidyFocus.push("#spendingSectorArray");
        }
      }
      ssn.SubsidyArraySize = ssn.SubsidyErrors.length;

      if (
        ssn.Subsidy_Measure_Title_Error ||
        ssn.Subsidy_Adhoc_Error ||
        ssn.Granting_Authority_Name_Error ||
        ssn.scheme_issued_confirmation_day_Error ||
        ssn.scheme_issued_confirmation_month_Error ||
        ssn.scheme_issued_confirmation_year_Error ||
        ssn.scheme_issued_start_day_Error ||
        ssn.scheme_issued_start_month_Error ||
        ssn.scheme_issued_start_year_Error ||
        ssn.Legal_Basis_Error ||
        ssn.Granting_Authority_URL_Error ||
        ssn.Granting_Authority_Policy_Error ||
        ssn.Budget_Error ||
        ssn.scheme_issued_end_day_Error ||
        ssn.scheme_issued_end_month_Error ||
        ssn.scheme_issued_end_day_lesser_Error ||
        ssn.scheme_issued_end_year_Error ||
        ssn.Subsidy_Measure_Title_255_Error ||
        ssn.Granting_Authority_URL_255_Error ||
        ssn.Granting_Authority_Policy_255_Error ||
        ssn.Subsidy_Scheme_Description_Error ||
        ssn.Subsidy_Scheme_Description_Length_Error ||
        ssn.spendingsector_Error ||
        ssn.Maximum_Amount_Under_Scheme_255_Error
      ) {
        res.render("bulkupload/subsidymeasures-edit", {
          ssn,
          // ssn.Subsidy_Measure_Title_Global,
          // ssn.Subsidy_Adhoc_Global,

          // ssn.Granting_Authority_Name_Global,
          // ssn.Scheme_Start_Day_Global,
          // ssn.Scheme_Start_Month_Global,
          // ssn.Scheme_Start_Year_Global,
          // ssn.Scheme_End_Day_Global,
          // ssn.Scheme_End_Month_Global,
          // ssn.Scheme_End_Year_Global,
          // ssn.Legal_Basis_Global,
          // ssn.Granting_Authority_URL_Global,
          // ssn.Granting_Authority_Policy_Global,
          // ssn.Budget_Global,

          // ssn.Subsidy_Measure_Title_Error,
          // ssn.Subsidy_Adhoc_Error,
          // ssn.Legal_Basis_Error,
          // ssn.Granting_Authority_URL_Error,
          // ssn.Granting_Authority_Policy_Error,
          // ssn.Budget_Error,
          // ssn.Granting_Authority_Name_Error,
          // ssn.scheme_issued_start_day_Error,
          // ssn.scheme_issued_start_month_Error,
          // ssn.scheme_issued_start_year_Error,
          // scheme_issued_end_day_Error,
          // scheme_issued_end_month_Error,
          // scheme_issued_end_year_Error,
          // ssn.SubsidyErrors,
          // ssn.SubsidyArraySize,
          // ssn.SubsidyFocus,

          isAddSubsidyPrimarycall,
          spendingSectorArray,
        });
      } else {
        res.render("bulkupload/subsidymeasure-re-editreview", {
          // ssn.Subsidy_Measure_Title_Global,
          // ssn.Subsidy_Adhoc_Global,
          // ssn.Legal_Basis_Global,
          // ssn.Granting_Authority_URL_Global,
          // ssn.Granting_Authority_Policy_Global,
          // ssn.Budget_Global,
          // ssn.Granting_Authority_Name_Global,
          // ssn.Scheme_Start_Day_Global,
          // ssn.Scheme_Start_Month_Global,
          // ssn.Scheme_Start_Year_Global,
          // ssn.Scheme_End_Day_Global,
          // ssn.Scheme_End_Month_Global,
          // ssn.Scheme_End_Year_Global,
          ssn,
          formatedCurrency,
          spendingSectorArray
          // ssn.GetMonthName,
        });
      }
    } else {
      res.render("bulkupload/subsidyaward-cancel");
    }
  }
});

router.get("/", (req, res) => {
  ssn = req.session;
  if (
    typeof ssn.dashboard_roles_object_id1 === "undefined" ||
    typeof ssn.dashboard_roles_object_id2 === "undefined"
  ) {
    res.redirect("/signout");
  } else {
    res.set("X-Frame-Options", "DENY");
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Content-Security-Policy", 'frame-ancestors "self"');
    res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    res.render("bulkupload/subsidymeasure-reviewdetails");
  }
});

module.exports = router;
