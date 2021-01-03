const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  var isAddSubsidyPrimarycall = false;
  var GetMonthName;
  var SubsidyErrors = [];
  var SubsidyFocus = [];
  var Additem = 0;
  var SubsidyArraySize = 0;
  var Subsidy_Control_Number_Error = false;
  var Subsidy_Measure_Title_Error = false;
  var Subsidy_Objective_Error = false;
  var Subsidy_Instrument_Error = false;
  var Subsidy_Element_Full_Amount_Error = false;
  var Subsidy_Full_Amount_Range_Error = false;
  var National_ID_Type_Error = false;
  var National_ID_Number_Error = false;
  var Beneficiary_Name_Error = false;
  var Size_of_the_Organisation_Error = false;
  var Granting_Authority_Name_Error = false;
  var Legal_Granting_Date_Day_Error = false;
  var Legal_Granting_Date_Month_Error = false;
  var Legal_Granting_Date_Year_Error = false;
  var Goods_or_Services_Error = false;
  var Spending_Region_Error = false;
  var Spending_Sector_Error = false;

  const {
    Subsidy_Control_Number,
    Subsidy_Measure_Title,
    Subsidy_Objective,
    Subsidy_Instrument,
    Subsidy_Element_Full_Amount,
    Subsidy_Full_Amount_Range,
    National_ID_Type,
    National_ID_Number,
    Beneficiary_Name,
    Size_of_the_Organisation,
    Granting_Authority_Name,
    Legal_Granting_Date_Day,
    Legal_Granting_Date_Month,
    Legal_Granting_Date_Year,
    Goods_or_Services,
    Spending_Region,
    Spending_Sector,
  } = req.body;

  console.log("isAddSubsidyPrimarycall: " + isAddSubsidyPrimarycall);
  console.log("Subsidy_Instrument :" + Subsidy_Instrument);
  console.log("Spending_Sector :" + Spending_Sector);

  Subsidy_Control_Number_Global = Subsidy_Control_Number;
  Subsidy_Measure_Title_Global = Subsidy_Measure_Title;
  Subsidy_Objective_Global = Subsidy_Objective;
  Subsidy_Instrument_Global = Subsidy_Instrument;
  Subsidy_Element_Full_Amount_Global = Subsidy_Element_Full_Amount;
  Subsidy_Full_Amount_Range_Global = Subsidy_Full_Amount_Range;
  National_ID_Type_Global = National_ID_Type;
  National_ID_Number_Global = National_ID_Number;
  Beneficiary_Name_Global = Beneficiary_Name;
  Size_of_the_Organisation_Global = Size_of_the_Organisation;
  Granting_Authority_Name_Global = Granting_Authority_Name;
  Legal_Granting_Date_Day_Global = Legal_Granting_Date_Day;
  Legal_Granting_Date_Month_Global = Legal_Granting_Date_Month;
  Legal_Granting_Date_Year_Global = Legal_Granting_Date_Year;
  Goods_or_Services_Global = Goods_or_Services;
  Spending_Region_Global = Spending_Region;
  Spending_Sector_Global = Spending_Sector;

  Subsidy_Control_Number_Global_Substring = Subsidy_Control_Number_Global.substring(
    2,
    10
  );

  if (Legal_Granting_Date_Month_Global == 01) {
    GetMonthName = "January";
  }
  if (Legal_Granting_Date_Month_Global == 02) {
    GetMonthName = "February";
  }
  if (Legal_Granting_Date_Month_Global == 03) {
    GetMonthName = "March";
  }
  if (Legal_Granting_Date_Month_Global == 04) {
    GetMonthName = "April";
  }
  if (Legal_Granting_Date_Month_Global == 05) {
    GetMonthName = "May";
  }
  if (Legal_Granting_Date_Month_Global == 06) {
    GetMonthName = "June";
  }
  if (Legal_Granting_Date_Month_Global == 07) {
    GetMonthName = "July";
  }
  if (Legal_Granting_Date_Month_Global == 08) {
    GetMonthName = "August";
  }
  if (Legal_Granting_Date_Month_Global == 09) {
    GetMonthName = "September";
  }
  if (Legal_Granting_Date_Month_Global == 10) {
    GetMonthName = "October";
  }
  if (Legal_Granting_Date_Month_Global == 11) {
    GetMonthName = "November";
  }
  if (Legal_Granting_Date_Month_Global == 12) {
    GetMonthName = "December";
  }

  console.log("Legal_Granting_Date_Month_Global" + GetMonthName);

  //Empty field validations

  if (!Subsidy_Control_Number) {
    Subsidy_Control_Number_Error = true;
    SubsidyErrors[Additem] = "     Enter the subsidy control number";
    SubsidyFocus[Additem] = "#Subsidy_Control_Number";
    Additem = Additem + 1;
  }

  if (!Subsidy_Measure_Title) {
    Subsidy_Measure_Title_Error = true;
    SubsidyErrors[Additem] = "     Enter the subsidy measure title";
    SubsidyFocus[Additem] = "#Subsidy_Measure_Title";
    Additem = Additem + 1;
  }

  if (Subsidy_Objective == "Empty") {
    Subsidy_Objective_Error = true;
    SubsidyErrors[Additem] = "     Select the subsidy objective";
    SubsidyFocus[Additem] = "#Subsidy_Objective";
    Additem = Additem + 1;
  }

  if (Subsidy_Instrument == "Empty") {
    Subsidy_Instrument_Error = true;
    SubsidyErrors[Additem] = "     Select the subsidy instrument";
    SubsidyFocus[Additem] = "#Subsidy_Instrument";
    Additem = Additem + 1;
  }

  console.log("subsidy element full amot : " + Subsidy_Element_Full_Amount);
  console.log("Subsidy_Full_Amount_Range : " + Subsidy_Full_Amount_Range);
  if (!Subsidy_Element_Full_Amount && Subsidy_Instrument != "Tax measures") {
    Subsidy_Element_Full_Amount_Error = true;
    SubsidyErrors[Additem] = "     Enter the subsidy element full amount";
    SubsidyFocus[Additem] = "#Subsidy_Element_Full_Amount";
    Additem = Additem + 1;
  } else if (
    !Subsidy_Full_Amount_Range &&
    Subsidy_Instrument == "Tax measures"
  ) {
    Subsidy_Full_Amount_Range_Error = true;
    SubsidyErrors[Additem] = "     Enter the subsidy full amount range";
    SubsidyFocus[Additem] = "#Subsidy_Full_Amount_Range";
    Additem = Additem + 1;
  }

  if (!National_ID_Type) {
    National_ID_Type_Error = true;
    SubsidyErrors[Additem] = "     Choose the national id type";
    SubsidyFocus[Additem] = "#National_ID_Type";
    Additem = Additem + 1;
  }

  if (!National_ID_Number) {
    National_ID_Number_Error = true;
    SubsidyErrors[Additem] = "     Enter the national id number";
    SubsidyFocus[Additem] = "#National_ID_Number";
    Additem = Additem + 1;
  }

  if (!Beneficiary_Name) {
    Beneficiary_Name_Error = true;
    SubsidyErrors[Additem] = "     Enter the beneficiary name";
    SubsidyFocus[Additem] = "#Beneficiary_Name";
    Additem = Additem + 1;
  }

  if (!Size_of_the_Organisation) {
    Size_of_the_Organisation_Error = true;
    SubsidyErrors[Additem] = "     Choose the size of the organisation";
    SubsidyFocus[Additem] = "#Size_of_the_Organisation";
    Additem = Additem + 1;
  }

  if (!Granting_Authority_Name) {
    Granting_Authority_Name_Error = true;
    SubsidyErrors[Additem] = "     Enter the granting authority name";
    SubsidyFocus[Additem] = "#Granting_Authority_Name";
    Additem = Additem + 1;
  }

  if (!Legal_Granting_Date_Day) {
    Legal_Granting_Date_Day_Error = true;
    SubsidyErrors[Additem] = "     Enter the legal granting day of the date";
    SubsidyFocus[Additem] = "#Legal_Granting_Date_Day";
    Additem = Additem + 1;
  }

  // day validation starts here

  if (Legal_Granting_Date_Day > 31 || Legal_Granting_Date_Day < 1) {
    Legal_Granting_Date_Day_Error = true;
    SubsidyErrors[Additem] =
      "     Enter the valid legal granting day of the date";
    SubsidyFocus[Additem] = "#Legal_Granting_Date_Day";
    Additem = Additem + 1;
  }

  if (
    Legal_Granting_Date_Day == 31 &&
    (Legal_Granting_Date_Month == 02 ||
      Legal_Granting_Date_Month == 04 ||
      Legal_Granting_Date_Month == 06 ||
      Legal_Granting_Date_Month == 09 ||
      Legal_Granting_Date_Month == 11)
  ) {
    Legal_Granting_Date_Day_Error = true;
    SubsidyErrors[Additem] = "     Enter the valid day";
    SubsidyFocus[Additem] = "#Legal_Granting_Date_Day";
    Additem = Additem + 1;
  }

  if (Legal_Granting_Date_Day == 29 && Legal_Granting_Date_Month == 02) {
    if (
      (Legal_Granting_Date_Year % 4 == 0 &&
        Legal_Granting_Date_Year % 100 != 0) ||
      Legal_Granting_Date_Year % 400 == 0
    ) {
    } else {
      Legal_Granting_Date_Day_Error = true;
      SubsidyErrors[Additem] = "     Enter the valid day";
      SubsidyFocus[Additem] = "#Legal_Granting_Date_Day";
      Additem = Additem + 1;
    }
  }

  if (Legal_Granting_Date_Day == 30 && Legal_Granting_Date_Month == 02) {
    Legal_Granting_Date_Day_Error = true;
    SubsidyErrors[Additem] = "     Enter the valid day";
    SubsidyFocus[Additem] = "#Legal_Granting_Date_Day";
    Additem = Additem + 1;
  }

  // day velidation ends here

  if (!Legal_Granting_Date_Month) {
    Legal_Granting_Date_Month_Error = true;
    SubsidyErrors[Additem] = "     Enter the legal granting month of the date";
    SubsidyFocus[Additem] = "#Legal_Granting_Date_Month";
    Additem = Additem + 1;
  }

  if (Legal_Granting_Date_Month > 12 || Legal_Granting_Date_Month == 0) {
    Legal_Granting_Date_Month_Error = true;
    SubsidyErrors[Additem] = "     Enter the legal granting month from 1 to 12";
    SubsidyFocus[Additem] = "#Legal_Granting_Date_Month";
    Additem = Additem + 1;
  }

  if (!Legal_Granting_Date_Year) {
    Legal_Granting_Date_Year_Error = true;
    SubsidyErrors[Additem] = "     Enter the legal granting year of the date";
    SubsidyFocus[Additem] = "#Legal_Granting_Date_Year";
    Additem = Additem + 1;
  }

  if (!Goods_or_Services) {
    Goods_or_Services_Error = true;
    SubsidyErrors[Additem] = "     Choose the Goods or Services";
    SubsidyFocus[Additem] = "#Goods_or_Services";
    Additem = Additem + 1;
  }

  if (Spending_Region == "Empty") {
    Spending_Region_Error = true;
    SubsidyErrors[Additem] = "     Select the spending region";
    SubsidyFocus[Additem] = "#Spending_Region";
  }

  if (Spending_Sector == "Empty") {
    Spending_Sector_Error = true;
    SubsidyErrors[Additem] = "     Select the spending sector";
    SubsidyFocus[Additem] = "#Spending_Sector";
  }

  var SubsidyArraySize = SubsidyErrors.length;

  if (
    Subsidy_Control_Number_Error ||
    Subsidy_Measure_Title_Error ||
    Subsidy_Objective_Error ||
    Subsidy_Instrument_Error ||
    Subsidy_Element_Full_Amount_Error ||
    Subsidy_Full_Amount_Range_Error ||
    National_ID_Type_Error ||
    National_ID_Number_Error ||
    Beneficiary_Name_Error ||
    Size_of_the_Organisation_Error ||
    Granting_Authority_Name_Error ||
    Legal_Granting_Date_Day_Error ||
    Legal_Granting_Date_Month_Error ||
    Legal_Granting_Date_Year_Error ||
    Goods_or_Services_Error ||
    Spending_Region_Error ||
    Spending_Sector_Error
  ) {
    res.render("bulkupload/addsubsidyaward", {
      Subsidy_Control_Number_Global,
      Subsidy_Measure_Title_Global,
      Subsidy_Objective_Global,
      Subsidy_Instrument_Global,
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

      Subsidy_Control_Number_Error,
      Subsidy_Measure_Title_Error,
      Subsidy_Objective_Error,
      Subsidy_Instrument_Error,
      Subsidy_Element_Full_Amount_Error,
      Subsidy_Full_Amount_Range_Error,
      National_ID_Type_Error,
      National_ID_Number_Error,
      Beneficiary_Name_Error,
      Size_of_the_Organisation_Error,
      Granting_Authority_Name_Error,
      Legal_Granting_Date_Day_Error,
      Legal_Granting_Date_Month_Error,
      Legal_Granting_Date_Year_Error,
      Goods_or_Services_Error,
      Spending_Region_Error,
      Spending_Sector_Error,

      SubsidyErrors,
      SubsidyArraySize,
      SubsidyFocus,

      isAddSubsidyPrimarycall,
    });
  } else {
    res.render("bulkupload/reviewdetail", {
      Subsidy_Control_Number_Global,
      Subsidy_Control_Number_Global_Substring,
      Subsidy_Measure_Title_Global,
      Subsidy_Objective_Global,
      Subsidy_Instrument_Global,
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
      GetMonthName,
    });
  }
});

router.get("/", (req, res) => {
  res.render("bulkupload/reviewdetail");
});

module.exports = router;
