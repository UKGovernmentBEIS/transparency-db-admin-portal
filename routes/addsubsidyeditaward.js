const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  Subsidy_Control_Number_Global = fetchawarddetails.subsidyMeasure.scNumber;
  Subsidy_Measure_Title_Global =
    fetchawarddetails.subsidyMeasure.subsidyMeasureTitle;

  Subsidy_Objective_Global = fetchawarddetails.subsidyObjective;

  var subsidy_objective_split = Subsidy_Objective_Global.split("-");
  var subsidy_objective_split_check = subsidy_objective_split[0].toLowerCase();
  if (subsidy_objective_split_check == "other") {
    Subsidy_Objective_Other_Global = subsidy_objective_split[1];
    console.log(
      "Subsidy_Objective_Other_Global:" + Subsidy_Objective_Other_Global
    );
    Subsidy_Objective_Global = "Other";
  } else {
    Subsidy_Objective_Other_Global = "";
  }
  Subsidy_Instrument_Global = fetchawarddetails.subsidyInstrument;
  console.log("instrument: " + Subsidy_Instrument_Global);

  var subsidy_instrument_split = Subsidy_Instrument_Global.split("-");
  var subsidy_instrument_split_check = subsidy_instrument_split[0].toLowerCase();
  if (subsidy_instrument_split_check == "other") {
    Subsidy_Instrument_Other_Global = subsidy_instrument_split[1];
    console.log(
      "Subsidy_Instrument_Other_Global:" + Subsidy_Instrument_Other_Global
    );
    Subsidy_Instrument_Global = "Other";
  } else {
    Subsidy_Instrument_Other_Global = "";
  }

  if (
    Subsidy_Instrument_Global ==
    "Tax measures (tax credit, or tax/duty exemption)"
  ) {
    Subsidy_Full_Amount_Range_Global = fetchawarddetails.subsidyFullAmountRange;
    Subsidy_Element_Full_Amount_Global = "";
  } else {
    Subsidy_Full_Amount_Range_Global = "";
    Subsidy_Element_Full_Amount_Global =
      fetchawarddetails.subsidyFullAmountExact;
  }

  National_ID_Type_Global = fetchawarddetails.beneficiary.nationalIdType;
  National_ID_Number_Global = fetchawarddetails.beneficiary.nationalId;
  Beneficiary_Name_Global = fetchawarddetails.beneficiary.beneficiaryName;
  Size_of_the_Organisation_Global = fetchawarddetails.beneficiary.orgSize;
  console.log(
    "Size_of_the_Organisation_Global :" + Size_of_the_Organisation_Global
  );
  Granting_Authority_Name_Global =
    fetchawarddetails.grantingAuthorityResponse.grantingAuthorityName;
  Edit_Award_Number_global = fetchawarddetails.awardNumber;

  Legal_granting_date = fetchawarddetails.legalGrantingDate;
  var Legal_date_split = Legal_granting_date.split(" ");
  Legal_Granting_Date_Day_Global = Legal_date_split[0];
  var Legal_grating_month_check = Legal_date_split[1].toLowerCase();
  if (Legal_grating_month_check == "january") {
    Legal_Granting_Date_Month_Global = parseInt("01", 8);
  } else if (Legal_grating_month_check == "february") {
    Legal_Granting_Date_Month_Global = parseInt("02", 8);
  } else if (Legal_grating_month_check == "march") {
    Legal_Granting_Date_Month_Global = parseInt("03", 8);
  } else if (Legal_grating_month_check == "april") {
    Legal_Granting_Date_Month_Global = parseInt("04", 8);
  } else if (Legal_grating_month_check == "may") {
    Legal_Granting_Date_Month_Global = parseInt("05", 8);
  } else if (Legal_grating_month_check == "june") {
    Legal_Granting_Date_Month_Global = parseInt("06", 8);
  } else if (Legal_grating_month_check == "july") {
    Legal_Granting_Date_Month_Global = parseInt("07", 8);
  } else if (Legal_grating_month_check == "august") {
    Legal_Granting_Date_Month_Global = parseInt("08", 8);
  } else if (Legal_grating_month_check == "september") {
    Legal_Granting_Date_Month_Global = parseInt("09", 8);
  } else if (Legal_grating_month_check == "october") {
    Legal_Granting_Date_Month_Global = 10;
  } else if (Legal_grating_month_check == "november") {
    Legal_Granting_Date_Month_Global = 11;
  } else if (Legal_grating_month_check == "december") {
    Legal_Granting_Date_Month_Global = 12;
  }

  Legal_Granting_Date_Year_Global = Legal_date_split[2];
  Goods_or_Services_Global = fetchawarddetails.goodsServicesFilter;
  Spending_Region_Global = fetchawarddetails.spendingRegion;
  Spending_Sector_Global = fetchawarddetails.spendingSector;

  Subsidy_Control_Number_Error = false;
  Subsidy_Measure_Title_Error = false;
  Subsidy_Adhoc_Error = false;
  Subsidy_Objective_Error = false;
  Subsidy_Objective_Other_Error = false;
  Subsidy_Instrument_Error = false;
  Subsidy_Instrument_Other_Error = false;
  Subsidy_Element_Full_Amount_Error = false;
  Subsidy_Full_Amount_Range_Error = false;
  National_ID_Type_Error = false;
  National_ID_Number_Error = false;
  Beneficiary_Name_Error = false;
  Size_of_the_Organisation_Error = false;
  Granting_Authority_Name_Error = false;
  Legal_Granting_Date_Day_Error = false;
  Legal_Granting_Date_Month_Error = false;
  Legal_Granting_Date_Year_Error = false;
  Goods_or_Services_Error = false;
  Spending_Region_Error = false;
  Spending_Sector_Error = false;
  SubsidyArraySize = 0;

  isCallfromEditAward = true;

  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  res.render("bulkupload/addsubsidyaward", {
    isCallfromEditAward,
    Subsidy_Control_Number_Global,
    Subsidy_Measure_Title_Global,
    // Subsidy_Adhoc_Global,
    Subsidy_Objective_Global,
    Subsidy_Objective_Other_Global,
    Subsidy_Instrument_Global,
    Subsidy_Instrument_Other_Global,
    Subsidy_Element_Full_Amount_Global,
    Subsidy_Full_Amount_Range_Global,
    National_ID_Type_Global,
    National_ID_Number_Global,
    Beneficiary_Name_Global,
    Size_of_the_Organisation_Global,
    Granting_Authority_Name_Global,
    Legal_Granting_Date_Day_Global,
    Legal_Granting_Date_Month_Global,
    Legal_Granting_Date_Year_Global,
    Goods_or_Services_Global,
    Spending_Region_Global,
    Spending_Sector_Global,
  });
});

module.exports = router;
