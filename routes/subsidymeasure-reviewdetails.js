// ********************************************************************
// Gov.UK transparency subsidy scheme review details module
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
    ssn.GetConfirmationMonthName = "";
    ssn.GetMonthName = "";
    ssn.GetEndMonthName = "";
    ssn.SubsidyErrors = [];
    ssn.SubsidyFocus = [];
    ssn.Additem = 0;
    ssn.SubsidyArraySize = 0;
    ssn.Subsidy_Measure_Title_Error = false;
    ssn.Subsidy_Adhoc_Error = false;
    ssn.Legal_Basis_Error = false;
    ssn.Legal_Basis_5000_Error = false;
    ssn.Granting_Authority_Name_Error = false;
    ssn.Granting_Authority_URL_Error = false;
    ssn.Granting_Authority_Policy_Error = false;
    ssn.Budget_Error = false;
    ssn.Granting_Authority_Name_Inactive_Error = false;
    ssn.Subsidy_Measure_Title_255_Error = false;
    ssn.Granting_Authority_URL_255_Error = false;
    ssn.Granting_Authority_Policy_255_Error = false;
    ssn.scheme_issued_confirmation_year_Error = false;
    ssn.scheme_issued_confirmation_month_Error = false;
    ssn.scheme_issued_confirmation_day_Error = false;
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
    ssn.purpose_Error = false;
    ssn.Subsidy_Scheme_Interest_Error = false;


    var {
      Subsidy_Adhoc,
      Granting_Authority_Name,
      Subsidy_Measure_Title,
      Subsidy_Scheme_Description,

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
      purpose_culture_and_heritage,
      purpose_employment,
      purpose_energy_efficiency,
      purpose_environmental_protection,
      purpose_infrastructure,
      purpose_regional_development,
      purpose_rescue_subsidy,
      purpose_research_and_development,
      purpose_training,
      purpose_other,
      Subsidy_Scheme_Interest
    } = req.body;

    console.log("isAddSubsidyPrimarycall: " + isAddSubsidyPrimarycall);

    console.log("buttonvalue:" + buttonvalue);

    console.log("  Subsidy_Adhoc :" + Subsidy_Adhoc);
    console.log(
      "Granting_Authority_Name from schem: " + Granting_Authority_Name
    );

    ssn.Subsidy_Adhoc_Global = Subsidy_Adhoc;

    if (ssn.dashboard_roles == "BEIS Administrator") {
      ssn.Granting_Authority_Name_Measure_Global = Granting_Authority_Name;
    } else {
      ssn.Granting_Authority_Name_Measure_Global = ssn.dashboard_ga_name;
      Granting_Authority_Name = ssn.dashboard_ga_name;
    }

    ssn.Subsidy_Measure_Title_Global = Subsidy_Measure_Title;
    ssn.Legal_Basis_Global = Legal_Basis;
    ssn.Granting_Authority_URL_Global = Granting_Authority_URL;
    ssn.Granting_Authority_Policy_Global = Granting_Authority_Policy;
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

    ssn.Subsidy_Scheme_Description_Global = Subsidy_Scheme_Description;

    ssn.Subsidy_Scheme_Interest_Global = Subsidy_Scheme_Interest;

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

    //spending sector sorting
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

    //purpose sorting
    var purposeArray = new Array();
    ssn.Purpose_Array_Global = purposeArray

    if(purpose_culture_and_heritage){
      ssn.purpose_culture_or_heritage_Global = purpose_culture_and_heritage;
      purposeArray.push(purpose_culture_and_heritage);
    }

    if(purpose_employment){
      ssn.purpose_employment_Global = purpose_employment;
      purposeArray.push(purpose_employment);
    }

    if(purpose_energy_efficiency){
      ssn.purpose_energy_efficiency_Global = purpose_energy_efficiency;
      purposeArray.push(purpose_energy_efficiency);
    }

    if(purpose_environmental_protection){
      ssn.purpose_environmental_protection_Global = purpose_environmental_protection;
      purposeArray.push(purpose_environmental_protection);
    }

    if(purpose_infrastructure){
      ssn.purpose_infrastructure_Global = purpose_infrastructure;
      purposeArray.push(purpose_infrastructure);
    }

    if(purpose_regional_development){
      ssn.purpose_regional_development_Global = purpose_regional_development;
      purposeArray.push(purpose_regional_development);
    }

    if(purpose_rescue_subsidy){
      ssn.purpose_rescue_subsidy_Global = purpose_rescue_subsidy;
      purposeArray.push(purpose_rescue_subsidy);
    }

    if(purpose_research_and_development){
      ssn.purpose_research_and_development_Global = purpose_research_and_development;
      purposeArray.push(purpose_research_and_development);
    }


    if(purpose_training){
      ssn.purpose_training_Global = purpose_training;
      purposeArray.push(purpose_training);
    }

    if(purpose_other){
      ssn.purpose_other_Global = purpose_other;
      purposeArray.push(purpose_other);
    }

    ssn.Scheme_purpose_Json_Global = JSON.stringify(purposeArray);

    console.log("ssn.Subsidy_Adhoc_Global :" + ssn.Subsidy_Adhoc_Global);
    console.log(
      "ssn.Granting_Authority_Name_Measure_Global :" +
        ssn.Granting_Authority_Name_Measure_Global
    );
    console.log(
      "ssn.Subsidy_Measure_Title_Global :" + ssn.Subsidy_Measure_Title_Global
    );
    console.log("ssn.Subsidy_Scheme_Description_Global  :" + ssn.Subsidy_Scheme_Description_Global);
    console.log("ssn.Legal_Basis_Global  :" + ssn.Legal_Basis_Global);
    console.log(
      "ssn.Granting_Authority_URL_Global :" + ssn.Granting_Authority_URL_Global
    );
    console.log(
      "ssn.Granting_Authority_Policy_Global :" +
        ssn.Granting_Authority_Policy_Global
    );
    console.log("ssn.Budget_Global :" + ssn.Budget_Global);

    console.log("ssn.Maximum_Amount_Under_Scheme_Global :" + ssn.Maximum_Amount_Under_Scheme_Global);

    console.log("ssn.Scheme_Confirmation_Day_Global :" + ssn.Scheme_Confirmation_Day_Global);
    console.log(
      "ssn.Scheme_Confirmation_Month_Global :" + ssn.Scheme_Confirmation_Month_Global
    );
    console.log(
      "ssn.Scheme_Confirmation_Year_Global  :" + ssn.Scheme_Confirmation_Year_Global
    );

    console.log("ssn.Scheme_Start_Day_Global :" + ssn.Scheme_Start_Day_Global);
    console.log(
      "ssn.Scheme_Start_Month_Global :" + ssn.Scheme_Start_Month_Global
    );
    console.log(
      "ssn.Scheme_Start_Year_Global  :" + ssn.Scheme_Start_Year_Global
    );
    console.log("ssn.Scheme_End_Day_Global :" + ssn.Scheme_End_Day_Global);
    console.log("ssn.Scheme_End_Month_Global :" + ssn.Scheme_End_Month_Global);
    console.log("ssn.Scheme_End_Year_Global  :" + ssn.Scheme_End_Year_Global);

    console.log("ssn.spendingsector_accommodation  :" + ssn.spendingsector_accommodation_Global)
    console.log("ssn.spendingsector_activities_of_extraterritorial  :" + ssn.spendingsector_activities_of_extraterritorial_Global)
    console.log("ssn.spendingsector_undifferentiated_goods  :" + ssn.spendingsector_undifferentiated_goods_Global)
    console.log("ssn.spendingsector_administrative  :" + ssn.spendingsector_administrative_Global)
    console.log("ssn.spendingsector_agriculture_forestry_and_fishing  :" + ssn.spendingsector_agriculture_forestry_and_fishing_Global)
    console.log("ssn.spendingsector_arts_entertainment  :" + ssn.spendingsector_arts_entertainment_Global)
    console.log("ssn.spendingsector_construction  :" + ssn.spendingsector_construction_Global)
    console.log("ssn.spendingsector_education  :" + ssn.spendingsector_education_Global)
    console.log("ssn.spendingsector_Electricity_gas_steam_and_air_conditioning_supply  :" + ssn.spendingsector_Electricity_gas_steam_and_air_conditioning_supply_Global)
    console.log("ssn.spendingsector_financial_and_insurance_activities  :" + ssn.spendingsector_financial_and_insurance_activities_Global)
    console.log("ssn.spendingsector_human_health  :" + ssn.spendingsector_human_health_Global)
    console.log("ssn.spendingsector_information_and_communication  :" + ssn.spendingsector_information_and_communication_Global)
    console.log("ssn.spendingsector_Manufacturing  :" + ssn.spendingsector_Manufacturing_Global)
    console.log("ssn.spendingsector_mining_and_quarrying  :" + ssn.spendingsector_mining_and_quarrying_Global)
    console.log("ssn.spendingsector_Other_service_activities  :" + ssn.spendingsector_Other_service_activities_Global)
    console.log("ssn.spendingsector_professional  :" + ssn.spendingsector_professional_Global)
    console.log("ssn.spendingsector_public_administration  :" + ssn.spendingsector_public_administration_Global)
    console.log("ssn.spendingsector_real_estate_activities  :" + ssn.spendingsector_real_estate_activities_Global)
    console.log("ssn.spendingsector_transportation_and_storage  :" + ssn.spendingsector_transportation_and_storage_Global)
    console.log("ssn.spendingsector_water_supply  :" + ssn.spendingsector_water_supply_Global)
    console.log("ssn.spendingsector_wholesale_and_retail_trade  :" + ssn.spendingsector_wholesale_and_retail_trade_Global)

    console.log("ssn.purpose_culture_or_heritage  :" + ssn.purpose_culture_or_heritage_Global)
    console.log("ssn.purpose_employment  :" + ssn.purpose_employment_Global)
    console.log("ssn.purpose_energy_efficiency  :" + ssn.purpose_energy_efficiency_Global)
    console.log("ssn.purpose_environmental_protection  :" + ssn.purpose_environmental_protection_Global)
    console.log("ssn.purpose_infrastructure  :" + ssn.purpose_infrastructure_Global)
    console.log("ssn.purpose_regional_devlopment  :" + ssn.purpose_regional_devlopment_Global)
    console.log("ssn.purpose_rescue_subsidy  :" + ssn.purpose_rescue_subsidy_Global)
    console.log("ssn.purpose_research_and_development  :" + ssn.purpose_research_and_development_Global)
    console.log("ssn.purpose_training  :" + ssn.purpose_training_Global)
    console.log("ssn.purpose_other  :" + ssn.purpose_other_Global)
    console.log("ssn.Subsidy_Scheme_Interest :" + ssn.Subsidy_Scheme_Interest_Global)

    const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August','September', 'October', 'November', 'December'];

    ssn.GetConfirmationMonthName = monthArray[((parseInt(scheme_issued_confirmation_month)) - 1)];
    ssn.GetMonthName = monthArray[((parseInt(scheme_issued_start_month)) - 1)];
    ssn.GetEndMonthName = monthArray[((parseInt(scheme_issued_end_month)) - 1)];

    console.log("scheme_issued_start_month" + ssn.GetMonthName);

    if (buttonvalue == "Continue") {
      //Empty field validations
      if (!Subsidy_Adhoc) {
        ssn.Subsidy_Adhoc_Error = true;
        ssn.SubsidyErrors.push(" Select the adhoc subsidy scheme");
        ssn.SubsidyFocus.push("#Subsidy_Adhoc");
      }
      if (!Subsidy_Measure_Title) {
        ssn.Subsidy_Measure_Title_Error = true;
        ssn.SubsidyErrors.push("Enter the subsidy scheme name");
        ssn.SubsidyFocus.push("#Subsidy_Measure_Title");
      }

      if (Subsidy_Measure_Title != "" && Subsidy_Measure_Title.length > 255) {
        ssn.Subsidy_Measure_Title_Error = false;
        ssn.Subsidy_Measure_Title_255_Error = true;
        ssn.SubsidyErrors.push(
          "Subsidy scheme name cannot be greater than 255 characters"
        );
        ssn.SubsidyFocus.push("#Subsidy_Measure_Title");
      }

      if (!Subsidy_Scheme_Interest) {
        ssn.Subsidy_Scheme_Interest_Error = true;
        ssn.SubsidyErrors.push("You must select the if the scheme is of interest, particular interest or neither");
        ssn.SubsidyFocus.push("#Subsidy_Scheme_Interest");
      }

      if (Subsidy_Scheme_Description == ""){
        ssn.Subsidy_Scheme_Description_Error = true;
        ssn.SubsidyErrors.push("Enter the Subsidy scheme description");
        ssn.SubsidyFocus.push("#Subsidy_Scheme_Description");
      } else if (Subsidy_Scheme_Description.length > 10000){
        ssn.Subsidy_Scheme_Description_Length_Error = true;
        ssn.SubsidyErrors.push(" The subsidy scheme description must be 10000 characters or less.");
        ssn.SubsidyFocus.push("#Subsidy_Scheme_Description");
      }

      if (!Granting_Authority_Name) {
        ssn.Granting_Authority_Name_Error = true;
        ssn.SubsidyErrors.push(" Enter the public authority name");
        ssn.SubsidyFocus.push("#Granting_Authority_Name");
      }

      if (!Legal_Basis) {
        ssn.Legal_Basis_Error = true;
        ssn.SubsidyErrors.push("Enter a valid legal basis");
        ssn.SubsidyFocus.push("#Legal_Basis");
      } else if (Legal_Basis && Legal_Basis.length > 5000) {
        ssn.Legal_Basis_5000_Error = true;
        ssn.SubsidyErrors.push("The legal basis must be 5000 characters or less.");
        ssn.SubsidyFocus.push("#Legal_Basis");
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

      if (Granting_Authority_URL != "" && Granting_Authority_URL.length > 255) {
        ssn.Granting_Authority_URL_Error = false;
        ssn.Granting_Authority_URL_255_Error = true;
        ssn.SubsidyErrors.push(
          "Public authority policy url cannot be greater than 255 characters"
        );
        ssn.SubsidyFocus.push("#Granting_Authority_URL");
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
      }
      if (!Budget) {
        ssn.Budget_Error = true;
        ssn.SubsidyErrors.push("Enter the valid budget");
        ssn.SubsidyFocus.push("#Budget");
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
      }

      if (!scheme_issued_confirmation_month) {
        ssn.scheme_issued_confirmation_month_Error = true;
        ssn.SubsidyErrors.push(
          "     Enter the legal confirmation month of the date"
        );
        ssn.SubsidyFocus.push("#scheme_issued_confirmation_month");
      }
      if (scheme_issued_confirmation_month != "") {
        if (scheme_issued_confirmation_month > 12 || scheme_issued_confirmation_month == 0) {
          ssn.scheme_issued_confirmation_month_Error = true;
          ssn.SubsidyErrors.push(
            "     Enter the legal confirmation month from 1 to 12"
          );
          ssn.SubsidyFocus.push("#scheme_issued_confirmation_month");
        }
      }
      if (!scheme_issued_confirmation_year) {
        ssn.scheme_issued_confirmation_year_Error = true;
        ssn.SubsidyErrors.push(
          "     Enter the legal confirmation year of the date"
        );
        ssn.SubsidyFocus.push("#scheme_issued_confirmation_year");
      }
      if (!scheme_issued_confirmation_day) {
        ssn.scheme_issued_confirmation_day_Error = true;
        ssn.SubsidyErrors.push("     Enter the legal confirmation day of the date");
        ssn.SubsidyFocus.push("#scheme_issued_confirmation_day");
      }
      if (scheme_issued_confirmation_day != "") {
        // day validation starts here

        if (scheme_issued_confirmation_day > 31 || scheme_issued_confirmation_day < 1) {
          ssn.scheme_issued_confirmation_day_Error = true;
          ssn.SubsidyErrors.push(
            "     Enter the valid legal confirmation day of the date"
          );
          ssn.SubsidyFocus.push("#scheme_issued_confirmation_day");
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
          }
        }

        if (scheme_issued_confirmation_year > 9999) {
          ssn.scheme_issued_confirmation_year_Error = true;
          ssn.SubsidyErrors.push(
            "     Enter the legal confirmation year from 0 to 9999"
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
        }
      }

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


      // day validation starts here
      if (scheme_issued_start_day != "") {
        if (scheme_issued_start_day > 31 || scheme_issued_start_day < 1) {
          ssn.scheme_issued_start_day_Error = true;

          ssn.SubsidyErrors.push(
            "Enter a valid starting day"
          );
          ssn.SubsidyFocus.push("#scheme_issued_start_day");
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
          ssn.SubsidyErrors.push(
            "Enter a valid starting day"
          );
          ssn.SubsidyFocus.push("#scheme_issued_start_day");
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
            ssn.SubsidyErrors.push(
              "Enter a valid starting day"
            );
            ssn.SubsidyFocus.push("#scheme_issued_start_day");
          }
        }

        if (
          scheme_issued_start_day == 30 &&
          scheme_issued_start_month == parseInt("02", 8)
        ) {
          ssn.scheme_issued_start_day_Error = true;
          ssn.SubsidyErrors.push(
            "Enter a valid starting day"
          );
          ssn.SubsidyFocus.push("#scheme_issued_start_day");
        }
      }
      // day velidation ends here

      if (!scheme_issued_start_month) {
        ssn.scheme_issued_start_month_Error = true;
        ssn.SubsidyErrors.push("Enter the legal starting month of the date");
        ssn.SubsidyFocus.push("#scheme_issued_start_month");
      }
      if (scheme_issued_start_month != "") {
        if (scheme_issued_start_month > 12 || scheme_issued_start_month == 0) {
          ssn.scheme_issued_start_month_Error = true;
          ssn.SubsidyErrors.push("Enter a valid starting month from 1 to 12");
          ssn.SubsidyFocus.push("#scheme_issued_start_month");
        }
      }

      if (!scheme_issued_start_year) {
        ssn.scheme_issued_start_year_Error = true;
        ssn.SubsidyErrors.push("Enter the legal starting year of the date");
        ssn.SubsidyFocus.push("#scheme_issued_start_year");
      }
      if (ssn.Subsidy_Adhoc_Global != "Yes") {
        if (!scheme_issued_end_day) {
          ssn.scheme_issued_end_day_Error = true;
          ssn.SubsidyErrors.push(
            "Enter the legal end day of the date"
          );
          ssn.SubsidyFocus.push("#scheme_issued_end_day");
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
          // var truedate = sdate > edate;
          if (sdate > edate) {
            ssn.scheme_issued_end_day_Error = false;
            ssn.scheme_issued_end_day_lesser_Error = true;
            ssn.SubsidyErrors.push("End date should be later than start date");
            ssn.SubsidyFocus.push("#scheme_issued_end_day");
          }
          if (scheme_issued_end_day > 31 || scheme_issued_end_day < 1) {
            ssn.scheme_issued_end_day_Error = true;
            ssn.SubsidyErrors.push("Enter a valid end day");
            ssn.SubsidyFocus.push("#scheme_issued_end_day");
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
            ssn.SubsidyErrors.push("Enter a valid end day");
            ssn.SubsidyFocus.push("#scheme_issued_end_day");
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
              ssn.SubsidyErrors.push("Enter a valid end day");
              ssn.SubsidyFocus.push("#scheme_issued_end_day");
            }
          }

          if (
            scheme_issued_end_day == 30 &&
            scheme_issued_end_month == parseInt("02", 8)
          ) {
            ssn.scheme_issued_end_day_Error = true;
            ssn.SubsidyErrors.push("Enter a valid end day");
            ssn.SubsidyFocus.push("#scheme_issued_end_day");
          }
        }
        // day validation ends here

        if (!scheme_issued_end_month) {
          ssn.scheme_issued_end_month_Error = true;
          ssn.SubsidyErrors.push(
            "Enter the legal end month of the date"
          );
          ssn.SubsidyFocus.push("#scheme_issued_end_month");
        }
        if (scheme_issued_end_month != "") {
          if (scheme_issued_end_month > 12 || scheme_issued_end_month == 0) {
            ssn.scheme_issued_end_month_Error = true;
            ssn.SubsidyErrors.push(
              "Enter a valid end month from 1 to 12"
            );
            ssn.SubsidyFocus.push("#scheme_issued_end_month");
          }
        }
        if (!scheme_issued_end_year) {
          ssn.scheme_issued_end_year_Error = true;
          ssn.SubsidyErrors.push(
            "Enter the legal end year of the date"
          );
          ssn.SubsidyFocus.push("#scheme_issued_end_year");
        }
      }

      if (spendingSectorArray.length == 0){
        ssn.spendingsector_Error = true;
        ssn.SubsidyErrors.push(
          "Enter at least one or more spending sector(s)"
        );
        ssn.SubsidyFocus.push("#spendingSectorArray");
      }

      if (purposeArray.length == 0){
        ssn.purpose_Error = true;
        ssn.SubsidyErrors.push(
          "Enter at least one or more purpose(s)"
        );
        ssn.SubsidyFocus.push("#purposeArray");
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
        ssn.Legal_Basis_5000_Error ||
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
        ssn.Maximum_Amount_Under_Scheme_255_Error ||
        ssn.purpose_Error ||
        ssn.Subsidy_Scheme_Interest_Error
      ) {
        res.render("bulkupload/subsidymeasures-add", {
          formatedCurrency,
          ssn,
          isAddSubsidyPrimarycall,
          spendingSectorArray,
          purposeArray,
        });
      } else {
        res.render("bulkupload/subsidymeasure-reviewdetails", {
          ssn,
          formatedCurrency,
          spendingSectorArray,
          purposeArray,
        });
      }
    } else {
      ssn.Subsidy_Adhoc_Global = Subsidy_Adhoc;
      ssn.Granting_Authority_Name_Measure_Global = Granting_Authority_Name;
      ssn.Subsidy_Measure_Title_Global = Subsidy_Measure_Title;
      ssn.Legal_Basis_Global = Legal_Basis;
      ssn.Granting_Authority_URL_Global = Granting_Authority_URL;
      ssn.Granting_Authority_Policy_Global = Granting_Authority_Policy;
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
      ssn.Subsidy_Scheme_Interest_Global = Subsidy_Scheme_Interest;
      res.render("bulkupload/subsidymeasure-cancel");
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
