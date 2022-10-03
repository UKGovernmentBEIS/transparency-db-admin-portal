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
    ssn.scheme_issued_start_day_Error = false;
    ssn.scheme_issued_start_month_Error = false;
    ssn.scheme_issued_start_year_Error = false;
    ssn.Legal_Basis_Error = false;
    ssn.Granting_Authority_Name_Inactive_Error = false;
    ssn.Granting_Authority_URL_Error = false;
    ssn.Granting_Authority_Policy_Error = false;
    ssn.Budget_Error = false;
    ssn.scheme_issued_end_day_Error = false;
    ssn.scheme_issued_end_month_Error = false;
    ssn.scheme_issued_end_year_Error = false;
    ssn.scheme_issued_end_day_lesser_Error = false;

    ssn.Subsidy_Measure_Title_Global = "";
    ssn.Subsidy_Adhoc_Global = "";

    ssn.SubsidyArraySize = 0;

    ssn.Subsidy_Adhoc_Global = "";
    ssn.Granting_Authority_Name_Measure_Global = "";
    ssn.Subsidy_Measure_Title_Global = "";
    ssn.Legal_Basis_Global = "";
    ssn.Granting_Authority_URL_Global = "";
    ssn.Granting_Authority_Policy_Global = "";
    ssn.Budget_Global = "";
    ssn.Scheme_Start_Day_Global = "";
    ssn.Scheme_Start_Month_Global = "";
    ssn.Scheme_Start_Year_Global = "";
    ssn.Scheme_End_Day_Global = "";
    ssn.Scheme_End_Month_Global = "";
    ssn.Scheme_End_Year_Global = "";
    formatedCurrency = "";
    isCallfromEditAward = false;
    var isAddSubsidyPrimarycall = true;
    ssn.Has_No_End_Date = "";

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
