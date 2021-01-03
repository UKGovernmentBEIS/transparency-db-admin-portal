const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  console.log("reqqqq", req.body);
  var GetMonthName;

  if (req.body.Legal_Granting_Date_Month == 01) {
    GetMonthName = "January";
  }
  if (req.body.Legal_Granting_Date_Month == 02) {
    GetMonthName = "February";
  }
  if (req.body.Legal_Granting_Date_Month == 03) {
    GetMonthName = "March";
  }
  if (req.body.Legal_Granting_Date_Month == 04) {
    GetMonthName = "April";
  }
  if (req.body.Legal_Granting_Date_Month == 05) {
    GetMonthName = "May";
  }
  if (req.body.Legal_Granting_Date_Month == 06) {
    GetMonthName = "June";
  }
  if (req.body.Legal_Granting_Date_Month == 07) {
    GetMonthName = "July";
  }
  if (req.body.Legal_Granting_Date_Month == 08) {
    GetMonthName = "August";
  }
  if (req.body.Legal_Granting_Date_Month == 09) {
    GetMonthName = "September";
  }
  if (req.body.Legal_Granting_Date_Month == 10) {
    GetMonthName = "October";
  }
  if (req.body.Legal_Granting_Date_Month == 11) {
    GetMonthName = "November";
  }
  if (req.body.Legal_Granting_Date_Month == 12) {
    GetMonthName = "December";
  }

  console.log("req.body.Legal_Granting_Date_Month" + GetMonthName);

  Subsidy_Control_Number_Global = req.body.Subsidy_Control_Number;
  Subsidy_Measure_Title_Global = req.body.Subsidy_Measure_Title;
  Subsidy_Objective_Global = req.body.Subsidy_Objective;
  Subsidy_Instrument_Global = req.body.Subsidy_Instrument;
  Subsidy_Element_Full_Amount_Global = req.body.Subsidy_Element_Full_Amount;
  Subsidy_Full_Amount_Range_Global = req.body.Subsidy_Full_Amount_Range;
  National_ID_Type_Global = req.body.National_ID_Type;
  National_ID_Number_Global = req.body.National_ID_Number;
  Beneficiary_Name_Global = req.body.Beneficiary_Name;
  Size_of_the_Organisation_Global = req.body.Size_of_the_Organisation;
  Granting_Authority_Name_Global = req.body.Granting_Authority_Name;
  Legal_Granting_Date_Day_Global = req.body.Legal_Granting_Date_Day;
  Legal_Granting_Date_Month_Global = req.body.Legal_Granting_Date_Month;
  Legal_Granting_Date_Year_Global = req.body.Legal_Granting_Date_Year;
  Goods_or_Services_Global = req.body.Goods_or_Services;
  Spending_Region_Global = req.body.Spending_Region;
  Spending_Sector_Global = req.body.Spending_Sector;
  //Empty field validations

  res.render("bulkupload/subsidyaward-edit-review", {
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
    GetMonthName,
  });
});

router.get("/", (req, res) => {
  res.render("bulkupload/subsidyaward-edit-review");
});

module.exports = router;
