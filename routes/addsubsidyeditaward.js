const express = require("express");
var session = require("express-session");
const router = express.Router();

router.get("/", (req, res) => {
  ssn = req.session;
  ssn.Subsidy_Control_Number_Global = fetchawarddetails.subsidyMeasure.scNumber;
  ssn.Subsidy_Measure_Title_Global =
    fetchawarddetails.subsidyMeasure.subsidyMeasureTitle;

  ssn.Subsidy_Objective_Global = fetchawarddetails.subsidyObjective;

  var subsidy_objective_split = ssn.Subsidy_Objective_Global.split("-");
  var subsidy_objective_split_check = subsidy_objective_split[0].toLowerCase();
  if (subsidy_objective_split_check == "other") {
    ssn.Subsidy_Objective_Other_Global = subsidy_objective_split[1];
    console.log(
      "ssn.Subsidy_Objective_Other_Global:" + ssn.Subsidy_Objective_Other_Global
    );
    ssn.Subsidy_Objective_Global = "Other";
  } else {
    ssn.Subsidy_Objective_Other_Global = "";
  }
  ssn.Subsidy_Instrument_Global = fetchawarddetails.subsidyInstrument;
  console.log("instrument: " + ssn.Subsidy_Instrument_Global);

  var subsidy_instrument_split = ssn.Subsidy_Instrument_Global.split("-");
  var subsidy_instrument_split_check = subsidy_instrument_split[0].toLowerCase();
  if (subsidy_instrument_split_check == "other") {
    ssn.Subsidy_Instrument_Other_Global = subsidy_instrument_split[1];
    console.log(
      "ssn.Subsidy_Instrument_Other_Global:" +
        ssn.Subsidy_Instrument_Other_Global
    );
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
    ssn.Subsidy_Element_Full_Amount_Global = "";
  } else {
    ssn.Subsidy_Full_Amount_Range_Global = "";
    ssn.Subsidy_Element_Full_Amount_Global =
      fetchawarddetails.subsidyFullAmountExact;
  }

  ssn.National_ID_Type_Global = fetchawarddetails.beneficiary.nationalIdType;
  ssn.National_ID_Number_Global = fetchawarddetails.beneficiary.nationalId;
  ssn.Beneficiary_Name_Global = fetchawarddetails.beneficiary.beneficiaryName;
  ssn.Size_of_the_Organisation_Global = fetchawarddetails.beneficiary.orgSize;
  console.log(
    "ssn.Size_of_the_Organisation_Global :" +
      ssn.Size_of_the_Organisation_Global
  );
  ssn.Granting_Authority_Name_Global =
    fetchawarddetails.grantingAuthorityResponse.grantingAuthorityName;
  ssn.Edit_Award_Number_global = fetchawarddetails.awardNumber;

  Legal_granting_date = fetchawarddetails.legalGrantingDate;
  var Legal_date_split = Legal_granting_date.split(" ");
  ssn.Legal_Granting_Date_Day_Global = Legal_date_split[0];
  var Legal_grating_month_check = Legal_date_split[1].toLowerCase();
  if (Legal_grating_month_check == "january") {
    ssn.Legal_Granting_Date_Month_Global = parseInt("01", 8);
  } else if (Legal_grating_month_check == "february") {
    ssn.Legal_Granting_Date_Month_Global = parseInt("02", 8);
  } else if (Legal_grating_month_check == "march") {
    ssn.Legal_Granting_Date_Month_Global = parseInt("03", 8);
  } else if (Legal_grating_month_check == "april") {
    ssn.Legal_Granting_Date_Month_Global = parseInt("04", 8);
  } else if (Legal_grating_month_check == "may") {
    ssn.Legal_Granting_Date_Month_Global = parseInt("05", 8);
  } else if (Legal_grating_month_check == "june") {
    ssn.Legal_Granting_Date_Month_Global = parseInt("06", 8);
  } else if (Legal_grating_month_check == "july") {
    ssn.Legal_Granting_Date_Month_Global = parseInt("07", 8);
  } else if (Legal_grating_month_check == "august") {
    ssn.Legal_Granting_Date_Month_Global = parseInt("08", 8);
  } else if (Legal_grating_month_check == "september") {
    ssn.Legal_Granting_Date_Month_Global = parseInt("09", 8);
  } else if (Legal_grating_month_check == "october") {
    ssn.Legal_Granting_Date_Month_Global = 10;
  } else if (Legal_grating_month_check == "november") {
    ssn.Legal_Granting_Date_Month_Global = 11;
  } else if (Legal_grating_month_check == "december") {
    ssn.Legal_Granting_Date_Month_Global = 12;
  }

  ssn.Legal_Granting_Date_Year_Global = Legal_date_split[2];
  ssn.Goods_or_Services_Global = fetchawarddetails.goodsServicesFilter;
  ssn.Spending_Region_Global = fetchawarddetails.spendingRegion;
  ssn.Spending_Sector_Global = fetchawarddetails.spendingSector;

  ssn.Subsidy_Control_Number_Error = false;
  ssn.Subsidy_Measure_Title_Error = false;
  ssn.Subsidy_Adhoc_Error = false;
  ssn.Subsidy_Objective_Error = false;
  ssn.Subsidy_Objective_Other_Error = false;
  ssn.Subsidy_Instrument_Error = false;
  ssn.Subsidy_Instrument_Other_Error = false;
  ssn.Subsidy_Element_Full_Amount_Error = false;
  ssn.Subsidy_Full_Amount_Range_Error = false;
  ssn.National_ID_Type_Error = false;
  ssn.National_ID_Number_Error = false;
  ssn.Beneficiary_Name_Error = false;
  ssn.Size_of_the_Organisation_Error = false;
  ssn.Granting_Authority_Name_Error = false;
  ssn.Legal_Granting_Date_Day_Error = false;
  ssn.Legal_Granting_Date_Month_Error = false;
  ssn.Legal_Granting_Date_Year_Error = false;
  ssn.Goods_or_Services_Error = false;
  ssn.Spending_Region_Error = false;
  ssn.Spending_Sector_Error = false;
  SubsidyArraySize = 0;

  isCallfromEditAward = true;

  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  res.render("bulkupload/addsubsidyaward", {
    isCallfromEditAward,
    ssn,
    // ssn.Subsidy_Control_Number_Global,
    // ssn.Subsidy_Measure_Title_Global,
    // ssn.Subsidy_Adhoc_Global,
    // ssn.Subsidy_Objective_Global,
    // ssn.Subsidy_Objective_Other_Global,
    // ssn.Subsidy_Instrument_Global,
    // ssn.Subsidy_Instrument_Other_Global,
    // ssn.Subsidy_Element_Full_Amount_Global,
    // ssn.Subsidy_Full_Amount_Range_Global,
    // ssn.National_ID_Type_Global,
    // ssn.National_ID_Number_Global,
    // ssn.Beneficiary_Name_Global,
    // ssn.Size_of_the_Organisation_Global,
    // ssn.Granting_Authority_Name_Global,
    // ssn.Legal_Granting_Date_Day_Global,
    // ssn.Legal_Granting_Date_Month_Global,
    // ssn.Legal_Granting_Date_Year_Global,
    // ssn.Goods_or_Services_Global,
    // ssn.Spending_Region_Global,
    // ssn.Spending_Sector_Global,
  });
});

module.exports = router;
