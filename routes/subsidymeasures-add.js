const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {

  // res.set("X-Frame-Options", "DENY");
  // res.set("X-Content-Type-Options", "nosniff");
  // res.set("Content-Security-Policy", 'frame-ancestors "self"');
  // res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  // res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  Subsidy_Measure_Title_Error = false;
  Subsidy_Adhoc_Error = false;
  Granting_Authority_Name_Error = false;
  scheme_issued_start_day_Error = false;
  scheme_issued_start_month_Error = false;
  scheme_issued_start_year_Error = false;
  Legal_Basis_Error = false;
  Granting_Authority_URL_Error = false;
  Granting_Authority_Policy_Error = false;
  Budget_Error = false;
  scheme_issued_end_day_Error = false;
  scheme_issued_end_month_Error = false;
  scheme_issued_end_year_Error = false;

  Subsidy_Measure_Title_Global = "";
  Subsidy_Adhoc_Global = "";

  SubsidyArraySize = 0;

  Subsidy_Adhoc_Global = "";
  Granting_Authority_Name_Global = "";
  Subsidy_Measure_Title_Global = "";
  Legal_Basis_Global = "";
  Granting_Authority_URL_Global = "";
  Granting_Authority_Policy_Global = "";
  Budget_Global = "";
  Granting_Authority_Name_Global = "";
  Scheme_Start_Day_Global = "";
  Scheme_Start_Month_Global = "";
  Scheme_Start_Year_Global = "";
  Scheme_End_Day_Global = "";
  Scheme_End_Month_Global = "";
  Scheme_End_Year_Global = "";

  isCallfromEditAward = false;
  var isAddSubsidyPrimarycall = true;
  res.render("bulkupload/subsidymeasures-add", { isAddSubsidyPrimarycall });
});
router.post("/", (req, res) => {
  // res.set("X-Frame-Options", "DENY");
  // res.set("X-Content-Type-Options", "nosniff");
  // res.set("Content-Security-Policy", 'frame-ancestors "self"');
  // res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  // res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  res.render("bulkupload/subsidymeasures-add");
});
module.exports = router;
