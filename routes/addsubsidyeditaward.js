// ********************************************************************
// Gov.UK transparency Edit Single Subsidy Award module
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
    ssn.Subsidy_Control_Number_Error = false;
    ssn.Subsidy_Measure_Title_Error = false;
    ssn.Subsidy_Measure_Title_255_Error = false;
    ssn.Granting_Authority_URL_255_Error = false;
    ssn.Granting_Authority_Policy_255_Error = false;
    ssn.SC_Not_active = false;
    ssn.Subsidy_Adhoc_Error = false;
    ssn.Subsidy_Objective_Error = false;
    ssn.Subsidy_Objective_Other_Error = false;
    ssn.Subsidy_Objective_Other_255_Error = false;
    ssn.Subsidy_Instrument_Other_255_Error = false;
    ssn.Beneficiary_Name_255_Error = false;
    ssn.Subsidy_Instrument_Error = false;
    ssn.Subsidy_Full_Amount_Range_Exceed_Error = false;
    ssn.Subsidy_Element_Full_Amount_Exceed_Error = false;
    ssn.Subsidy_Instrument_Other_Error = false;
    ssn.Subsidy_Element_Full_Amount_Error = false;
    ssn.Subsidy_Full_Amount_Range_Error = false;
    ssn.National_ID_Type_Error = false;
    ssn.National_ID_Number_Error = false;
    ssn.Beneficiary_Name_Error = false;
    ssn.Size_of_the_Organisation_Error = false;
    ssn.Granting_Authority_Name_Error = false;
    ssn.Granting_Authority_Valid_Name_Error = false;
    ssn.Legal_Granting_Date_Day_Error = false;
    ssn.Legal_Granting_Date_Month_Error = false;
    ssn.Legal_Granting_Date_Year_Error = false;
    ssn.Goods_or_Services_Error = false;
    ssn.Spending_Region_Error = false;
    ssn.Spending_Sector_Error = false;
    ssn.Subsidy_Award_Interest_Error = false;
    ssn.SubsidyErrors = [];
    ssn.SubsidyFocus = [];
    
    ssn.objective_Array_Global = new Array();
    ssn.objective_culture_Global = undefined;
    ssn.objective_employment_Global = undefined;
    ssn.objective_energy_efficiency_Global = undefined;
    ssn.objective_environmental_Global = undefined;
    ssn.objective_infrastructure_Global = undefined;
    ssn.objective_regional_development_Global = undefined;
    ssn.objective_rescue_subsidy_Global = undefined;
    ssn.objective_research_Global = undefined;
    ssn.objective_training_Global = undefined;
    ssn.objective_other_Global = undefined;

    ssn.SubsidyArraySize = 0;

    ssn.Subsidy_Control_Number_Name_Global =
      fetchawarddetails.subsidyMeasure.scNumber;
    ssn.Subsidy_Measure_Title_Global =
      fetchawarddetails.subsidyMeasure.subsidyMeasureTitle;

    ssn.Standalone_Award_Global = fetchawarddetails.standaloneAward;
    ssn.Subsidy_Award_Description_Global = fetchawarddetails.subsidyAwardDescription;

    ssn.Specific_Policy_Objective_global = fetchawarddetails.specificPolicyObjective;

    ssn.Subsidy_Objective_Global = fetchawarddetails.subsidyObjective;


    var subsidy_objective_split = ssn.Subsidy_Objective_Global.split("-");
    var subsidy_objective_split_check = subsidy_objective_split[0].toLowerCase();
    ssn.Subsidy_Instrument_Global = fetchawarddetails.subsidyInstrument;
    console.log("instrument: " + ssn.Subsidy_Instrument_Global);

    var subsidy_instrument_split = ssn.Subsidy_Instrument_Global.split("-");
    var subsidy_instrument_split_check = subsidy_instrument_split[0].toLowerCase();
    if (subsidy_instrument_split_check == "other") {
      ssn.Subsidy_Instrument_Other_Global = subsidy_instrument_split[1];

      ssn.Subsidy_Instrument_Global = "Other";
    } else {
      ssn.Subsidy_Instrument_Other_Global = "";
    }

    if (
      ssn.Subsidy_Instrument_Global ==
      "Tax measures (tax credit, or tax/duty exemption)"
    ) {
      ssn.Subsidy_Full_Amount_Range_Global =
        fetchawarddetails.subsidyFullAmountRange;
      var rangeSplit = ssn.Subsidy_Full_Amount_Range_Global.split(" - ")
      if (rangeSplit.length == 2) {
        ssn.Subsidy_Full_Amount_Range_Lower_Global = Number(rangeSplit[0].replace(/[^0-9.-]+/g, ""));
        ssn.Subsidy_Full_Amount_Range_Upper_Global = Number(rangeSplit[1].replace(/[^0-9.-]+/g, ""));
      } else {
        ssn.Subsidy_Full_Amount_Range_Lower_Global = "";
        ssn.Subsidy_Full_Amount_Range_Upper_Global = "";
      }
      ssn.Subsidy_Element_Full_Amount_Global = "";
    } else {
        ssn.Subsidy_Full_Amount_Range_Global = "";
        ssn.Subsidy_Full_Amount_Range_Lower_Global = "";
        ssn.Subsidy_Full_Amount_Range_Upper_Global = "";
        ssn.Subsidy_Element_Full_Amount_Global =
        fetchawarddetails.subsidyFullAmountExact;
    }

    ssn.National_ID_Type_Global = fetchawarddetails.beneficiary.nationalIdType;
    ssn.National_ID_Number_Global = fetchawarddetails.beneficiary.nationalId;
    ssn.Beneficiary_Name_Global = fetchawarddetails.beneficiary.beneficiaryName;
    ssn.Size_of_the_Organisation_Global = fetchawarddetails.beneficiary.orgSize;

    ssn.Granting_Authority_Name_Global =
      fetchawarddetails.grantingAuthorityResponse.grantingAuthorityName;
    ssn.Edit_Award_Number_global = fetchawarddetails.awardNumber;

    Legal_granting_date = fetchawarddetails.legalGrantingDate;
    var Legal_date_split = Legal_granting_date.split(" ");
    ssn.Legal_Granting_Date_Day_Global = Legal_date_split[0];
    var Legal_grating_month_check = Legal_date_split[1].toLowerCase();
    if (Legal_grating_month_check == "january") {
      ssn.Legal_Granting_Date_Month_Global = "01";
    } else if (Legal_grating_month_check == "february") {
      ssn.Legal_Granting_Date_Month_Global = "02";
    } else if (Legal_grating_month_check == "march") {
      ssn.Legal_Granting_Date_Month_Global = "03";
    } else if (Legal_grating_month_check == "april") {
      ssn.Legal_Granting_Date_Month_Global = "04";
    } else if (Legal_grating_month_check == "may") {
      ssn.Legal_Granting_Date_Month_Global = "05";
    } else if (Legal_grating_month_check == "june") {
      ssn.Legal_Granting_Date_Month_Global = "06";
    } else if (Legal_grating_month_check == "july") {
      ssn.Legal_Granting_Date_Month_Global = "07";
    } else if (Legal_grating_month_check == "august") {
      ssn.Legal_Granting_Date_Month_Global = "08";
    } else if (Legal_grating_month_check == "september") {
      ssn.Legal_Granting_Date_Month_Global = "09";
    } else if (Legal_grating_month_check == "october") {
      ssn.Legal_Granting_Date_Month_Global = "10";
    } else if (Legal_grating_month_check == "november") {
      ssn.Legal_Granting_Date_Month_Global = "11";
    } else if (Legal_grating_month_check == "december") {
      ssn.Legal_Granting_Date_Month_Global = "12";
    }

    var objectiveArray = new Array();
    if(fetchawarddetails.subsidyObjective != null){
      objectiveArray = JSON.parse(fetchawarddetails.subsidyObjective);
    }
    ssn.Objective_Array_Other_Global = JSON.parse(fetchawarddetails.subsidyObjective).slice(-1).toString().replace('Other - ', '')

    objectiveArray.forEach(function(objective){
      switch(objective) {
        case "Culture or Heritage":
          ssn.objective_culture_Global = true;
          break;
        case "Employment":
          ssn.objective_employment_Global = true;
          break;
        case "Energy efficiency":
          ssn.objective_energy_efficiency_Global = true;
          break;
        case "Environmental protection":
          ssn.objective_environmental_Global = true;
          break;
        case "Infrastructure":
          ssn.objective_infrastructure_Global = true;
          break;
        case "Regional development":
          ssn.objective_regional_development_Global = true;
          break;
        case "Rescue and restructuring subsidy":
          ssn.objective_rescue_subsidy_Global = true;
          break;
        case "Research and development":
          ssn.objective_research_Global = true;
          break;
        case "Training":
          ssn.objective_training_Global = true;
          break;
        case "Other - " + ssn.Objective_Array_Other_Global:
          ssn.objective_other_Global = true;
          ssn.Subsidy_Objective_Other_Global = ssn.Objective_Array_Other_Global;
          break;
      }
    });
    ssn.Legal_Granting_Date_Year_Global = Legal_date_split[2];
    ssn.Goods_or_Services_Global = fetchawarddetails.goodsServicesFilter;
    
    if(fetchawarddetails.spendingRegion){
      ssn.Spending_Regions_Selected_Global = JSON.parse(fetchawarddetails.spendingRegion);
    }

    ssn.Spending_Sector_Global = fetchawarddetails.spendingSector;
    ssn.Subsidy_Award_Interest_Global = fetchawarddetails.subsidyAwardInterest;

    ssn.Subsidy_Control_Number_Error = false;
    ssn.Subsidy_Measure_Title_Error = false;
    ssn.Subsidy_Measure_Title_255_Error = false;
    ssn.Granting_Authority_URL_255_Error = false;
    ssn.Granting_Authority_Policy_255_Error = false;
    ssn.Subsidy_Adhoc_Error = false;
    ssn.Subsidy_Objective_Error = false;
    ssn.Subsidy_Objective_Other_Error = false;
    ssn.Subsidy_Objective_Other_255_Error = false;
    ssn.Subsidy_Instrument_Other_255_Error = false;
    ssn.Beneficiary_Name_255_Error = false;
    ssn.Subsidy_Instrument_Error = false;
    ssn.Subsidy_Instrument_Other_Error = false;
    ssn.Subsidy_Element_Full_Amount_Error = false;
    ssn.Subsidy_Full_Amount_Range_Error = false;
    ssn.National_ID_Type_Error = false;
    ssn.National_ID_Number_Error = false;
    ssn.Beneficiary_Name_Error = false;
    ssn.Size_of_the_Organisation_Error = false;
    ssn.Granting_Authority_Name_Error = false;
    ssn.Granting_Authority_Valid_Name_Error = false;
    ssn.Legal_Granting_Date_Day_Error = false;
    ssn.Legal_Granting_Date_Month_Error = false;
    ssn.Legal_Granting_Date_Year_Error = false;
    ssn.Goods_or_Services_Error = false;
    ssn.Spending_Region_Error = false;
    ssn.Spending_Sector_Error = false;
    ssn.SC_Not_active = false;
    SubsidyArraySize = 0;

    isCallfromEditAward = true;
    ssn.addToScheme = false;

    res.set("X-Frame-Options", "DENY");
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Content-Security-Policy", 'frame-ancestors "self"');
    res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

    res.render("bulkupload/addsubsidyaward", {
      isCallfromEditAward,
      ssn,
    });
  }
});

module.exports = router;
