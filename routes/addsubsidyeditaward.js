const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  Subsidy_Control_Number_Global = fetchawarddetails.subsidyMeasure.scNumber;
  Subsidy_Measure_Title_Global = fetchawarddetails.subsidyMeasure.subsidyMeasureTitle;
  Subsidy_Adhoc_Global_Check = fetchawarddetails.subsidyMeasure.adhoc
  if ( Subsidy_Adhoc_Global_Check == true) { Subsidy_Adhoc_Global = 'Yes';  }
  else if( Subsidy_Adhoc_Global_Check == false) { Subsidy_Adhoc_Global = 'No';}
  Subsidy_Objective_Global = fetchawarddetails.subsidyObjective;
  
  var subsidy_objective_split = Subsidy_Objective_Global.split("-");
  var subsidy_objective_split_check =  subsidy_objective_split[0].toLowerCase();
  if (subsidy_objective_split_check  == 'other') { 
    Subsidy_Objective_Other_Global  =   subsidy_objective_split[1];
    console.log("Subsidy_Objective_Other_Global:" + Subsidy_Objective_Other_Global);
    Subsidy_Objective_Global = "Other"
  }
  else {

    Subsidy_Objective_Other_Global ="";
  }
  Subsidy_Instrument_Global = fetchawarddetails.subsidyInstrument;
  console.log("instrument: " + Subsidy_Instrument_Global);
 
  var subsidy_instrument_split = Subsidy_Instrument_Global.split("-");
  var subsidy_instrument_split_check =  subsidy_instrument_split[0].toLowerCase();
  if (subsidy_instrument_split_check  == 'other') { 
    Subsidy_Instrument_Other_Global  =   subsidy_instrument_split[1];
    console.log("Subsidy_Instrument_Other_Global:" + Subsidy_Instrument_Other_Global);
    Subsidy_Instrument_Global = "Other"
  }
  else {

    Subsidy_Instrument_Other_Global ="";
  }


  if (Subsidy_Instrument_Global == "Tax measures (tax credit, or tax/duty exemption)") {
    Subsidy_Full_Amount_Range_Global =  fetchawarddetails.subsidyFullAmountRange
    Subsidy_Element_Full_Amount_Global = "";
  }
  else {
    Subsidy_Full_Amount_Range_Global =  "";
    Subsidy_Element_Full_Amount_Global = fetchawarddetails.subsidyFullAmountExact;
  }
  
  National_ID_Type_Global = fetchawarddetails.beneficiary.nationalIdType;
  National_ID_Number_Global = fetchawarddetails.beneficiary.nationalId;
  Beneficiary_Name_Global = fetchawarddetails.beneficiary.beneficiaryName;
  Size_of_the_Organisation_Global = fetchawarddetails.beneficiary.beneficiaryName.orgSize;
  Granting_Authority_Name_Global = fetchawarddetails.grantingAuthorityResponse.grantingAuthorityName;
 
  Legal_granting_date = fetchawarddetails.legalGrantingDate;
  var Legal_date_split = Legal_granting_date.split(" ");
  Legal_Granting_Date_Day_Global = Legal_date_split[0];
  var Legal_grating_month_check =  Legal_date_split[1].toLowerCase();
  if (Legal_grating_month_check == 'january') { Legal_Granting_Date_Month_Global = 01; }
  else if (Legal_grating_month_check == 'february') { Legal_Granting_Date_Month_Global = 02; }
  else if (Legal_grating_month_check == 'march') { Legal_Granting_Date_Month_Global = 03; }
  else if (Legal_grating_month_check == 'april') { Legal_Granting_Date_Month_Global = 04; }
  else if (Legal_grating_month_check == 'may') { Legal_Granting_Date_Month_Global = 05; }
  else if (Legal_grating_month_check == 'june') { Legal_Granting_Date_Month_Global = 06; }
  else if (Legal_grating_month_check == 'july') { Legal_Granting_Date_Month_Global = 07; }
  else if (Legal_grating_month_check == 'august') { Legal_Granting_Date_Month_Global = 08; }
  else if (Legal_grating_month_check == 'september') { Legal_Granting_Date_Month_Global = 09; }
  else if (Legal_grating_month_check == 'october') { Legal_Granting_Date_Month_Global = 10; }
  else if (Legal_grating_month_check == 'november') { Legal_Granting_Date_Month_Global = 11; }
  else if (Legal_grating_month_check == 'december') { Legal_Granting_Date_Month_Global = 12; }

  
  Legal_Granting_Date_Year_Global = Legal_date_split[2];
  Goods_or_Services_Global =  fetchawarddetails.goodsServicesFilter;
  Spending_Region_Global = fetchawarddetails.spendingRegion;
  Spending_Sector_Global = fetchawarddetails.spendingSector;

  var isAddSubsidyPrimarycall = false;
  res.render("bulkupload/addsubsidyaward", {
    isAddSubsidyPrimarycall,
    Subsidy_Control_Number_Global,
    Subsidy_Measure_Title_Global,
    Subsidy_Adhoc_Global,
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
