const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  Subsidy_Control_Number_Global = "";
  Subsidy_Measure_Title_Global = "";
  Subsidy_Adhoc_Global ="";
  Subsidy_Objective_Global = "";
  Subsidy_Objective_Other_Global ="";
  Subsidy_Instrument_Global = "";
  Subsidy_Instrument_Other_Global="";
  Subsidy_Element_Full_Amount_Global = "";
  Subsidy_Full_Amount_Range_Global = "";
  National_ID_Type_Global = "";
  National_ID_Number_Global = "";
  Beneficiary_Name_Global = "";
  Size_of_the_Organisation_Global = "";
  Granting_Authority_Name_Global = "";
  Legal_Granting_Date_Day_Global = "";
  Legal_Granting_Date_Month_Global = "";
  Legal_Granting_Date_Year_Global = "";
  Goods_or_Services_Global = "";
  Spending_Region_Global = "";
  Spending_Sector_Global = "";
  SubsidyArraySize = 0;
  

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
  
  isCallfromEditAward = false;
  var isAddSubsidyPrimarycall = true;
  res.render("bulkupload/addsubsidyaward", { isAddSubsidyPrimarycall });
});

router.post("/", (req, res) => {
  res.render("bulkupload/addsubsidyaward");
});

module.exports = router;
