const express = require("express");
var session = require("express-session");
const router = express.Router();

router.get("/", (req, res) => {
  ssn = req.session;
  req.query = JSON.parse(JSON.stringify(req.query));
  if (req.query.hasOwnProperty("scheme"))
    ssn.Subsidy_Control_Number_Name_Global = req.query.scheme;
  else ssn.Subsidy_Control_Number_Name_Global = "";
  ssn.Subsidy_Measure_Title_Global = "";
  ssn.Subsidy_Adhoc_Global = "";
  ssn.Subsidy_Objective_Global = "";
  ssn.Subsidy_Objective_Other_Global = "";
  ssn.Subsidy_Instrument_Global = "";
  ssn.Subsidy_Instrument_Other_Global = "";
  ssn.Subsidy_Element_Full_Amount_Global = "";
  ssn.Subsidy_Full_Amount_Range_Global = "";
  ssn.National_ID_Type_Global = "";
  ssn.National_ID_Number_Global = "";
  ssn.Beneficiary_Name_Global = "";
  ssn.Size_of_the_Organisation_Global = "";
  ssn.Granting_Authority_Name_Global = "";
  ssn.Legal_Granting_Date_Day_Global = "";
  ssn.Legal_Granting_Date_Month_Global = "";
  ssn.Legal_Granting_Date_Year_Global = "";
  ssn.Goods_or_Services_Global = "";
  ssn.Spending_Region_Global = "";
  ssn.Spending_Sector_Global = "";
  ssn.SubsidyArraySize = 0;

  ssn.Subsidy_Control_Number_Error = false;
  ssn.Subsidy_Measure_Title_Error = false;
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

  isCallfromEditAward = false;
  var isAddSubsidyPrimarycall = true;

  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  res.render("bulkupload/addsubsidyaward", { isAddSubsidyPrimarycall });
});

router.post("/", (req, res) => {
  ssn = req.session;
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  res.render("bulkupload/addsubsidyaward");
});

module.exports = router;
