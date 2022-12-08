// ********************************************************************
// Gov.UK transparency subsidy scheme add module
// ********************************************************************

const express = require("express");
var session = require("express-session");
const router = express.Router();

router.get("/", (req, res) => {
  ssn = req.session;
  if (
    typeof ssn.dashboard_roles_object_id1 === "undefined" ||
    typeof ssn.dashboard_roles_object_id2 === "undefined"
  ) {
    res.redirect("/signout");
  } else {
    // res.set("X-Frame-Options", "DENY");
    // res.set("X-Content-Type-Options", "nosniff");
    // res.set("Content-Security-Policy", 'frame-ancestors "self"');
    // res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
    // res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    ssn.Subsidy_Measure_Title_Error = false;
    ssn.Subsidy_Measure_Title_255_Error = false;
    ssn.Granting_Authority_URL_255_Error = false;
    ssn.Granting_Authority_Policy_255_Error = false;
    ssn.Subsidy_Adhoc_Error = false;
    ssn.Granting_Authority_Name_Error = false;
    ssn.scheme_issued_confirmation_day_Error = false;
    ssn.scheme_issued_confirmation_month_Error = false;
    ssn.scheme_issued_confirmation_year_Error = false;
    ssn.scheme_issued_start_day_Error = false;
    ssn.scheme_issued_start_month_Error = false;
    ssn.scheme_issued_start_year_Error = false;
    ssn.Legal_Basis_Error = false;
    ssn.Subsidy_Scheme_Description_Error = false;
    ssn.Subsidy_Scheme_Description_5000_Error = false;
    ssn.Granting_Authority_Name_Inactive_Error = false;
    ssn.Granting_Authority_URL_Error = false;
    ssn.Granting_Authority_Policy_Error = false;
    ssn.Budget_Error = false;
    ssn.scheme_issued_end_day_Error = false;
    ssn.scheme_issued_end_month_Error = false;
    ssn.scheme_issued_end_year_Error = false;
    ssn.scheme_issued_end_day_lesser_Error = false;
    ssn.spendingsector_Error = false;

    ssn.Subsidy_Measure_Title_Global = "";
    ssn.Subsidy_Adhoc_Global = "";
    ssn.Subsidy_Scheme_Description_Global = "";

    ssn.SubsidyArraySize = 0;

    ssn.Subsidy_Adhoc_Global = "";
    ssn.Granting_Authority_Name_Measure_Global = "";
    ssn.Subsidy_Measure_Title_Global = "";
    ssn.Legal_Basis_Global = "";
    ssn.Granting_Authority_URL_Global = "";
    ssn.Granting_Authority_Policy_Global = "";
    ssn.Budget_Global = "";
    ssn.Scheme_Confirmation_Day_Global = "";
    ssn.Scheme_Confirmation_Month_Global = "";
    ssn.Scheme_Confirmation_Year_Global = "";
    ssn.Scheme_Start_Day_Global = "";
    ssn.Scheme_Start_Month_Global = "";
    ssn.Scheme_Start_Year_Global = "";
    ssn.Scheme_End_Day_Global = "";
    ssn.Scheme_End_Month_Global = "";
    ssn.Scheme_End_Year_Global = "";
    ssn.Scheme_Sector_Json_Global = "";
    ssn.Spending_Sector_Array_Global = new Array();
    ssn.spendingsector_accommodation_Global = "";
    ssn.spendingsector_activities_of_extraterritorial_Global = "";
    ssn.spendingsector_undifferentiated_goods_Global = "";
    ssn.spendingsector_administrative_Global = "";
    ssn.spendingsector_agriculture_forestry_and_fishing_Global = "";
    ssn.spendingsector_arts_entertainment_Global = "";
    ssn.spendingsector_construction_Global = "";
    ssn.spendingsector_education_Global = "";
    ssn.spendingsector_Electricity_gas_steam_and_air_conditioning_supply_Global = "";
    ssn.spendingsector_financial_and_insurance_activities_Global = "";
    ssn.spendingsector_human_health_Global = "";
    ssn.spendingsector_information_and_communication_Global = "";
    ssn.spendingsector_Manufacturing_Global = "";
    ssn.spendingsector_mining_and_quarrying_Global = "";
    ssn.spendingsector_Other_service_activities_Global = "";
    ssn.spendingsector_professional_Global = "";
    ssn.spendingsector_public_administration_Global = "";
    ssn.spendingsector_real_estate_activities_Global = "";
    ssn.spendingsector_transportation_and_storage_Global = "";
    ssn.spendingsector_water_supply_Global = "";
    ssn.spendingsector_wholesale_and_retail_trade_Global = "";
    formatedCurrency = "";
    isCallfromEditAward = false;
    var isAddSubsidyPrimarycall = true;
    ssn.Has_No_End_Date_Global = false;

    if (ssn.dashboard_roles !== "Granting Authority Encoder") {
      res.render("bulkupload/subsidymeasures-add", { isAddSubsidyPrimarycall });
    } else {
      res.render("bulkupload/notAuthorized");
    }
  }
});
router.post("/", (req, res) => {
  ssn = req.session;
  if (
    typeof ssn.dashboard_roles_object_id1 === "undefined" ||
    typeof ssn.dashboard_roles_object_id2 === "undefined"
  ) {
    res.redirect("/signout");
  } else {
    // res.set("X-Frame-Options", "DENY");
    // res.set("X-Content-Type-Options", "nosniff");
    // res.set("Content-Security-Policy", 'frame-ancestors "self"');
    // res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
    // res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    res.render("bulkupload/subsidymeasures-add");
  }
});
module.exports = router;
