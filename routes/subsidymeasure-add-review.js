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
    res.set("X-Frame-Options", "DENY");
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Content-Security-Policy", 'frame-ancestors "self"');
    res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    res.render("bulkupload/subsidymeasures-add", {
      ssn,
      //ssn.Subsidy_Measure_Title_Global,
      // ssn.Subsidy_Adhoc_Global,
      // ssn.Legal_Basis_Global,
      // ssn.Granting_Authority_URL_Global,
      // ssn.Granting_Authority_Policy_Global,
      // ssn.Budget_Global,
      //ssn.Granting_Authority_Name_Measure_Global,
      // ssn.Scheme_Start_Day_Global,
      // ssn.Scheme_Start_Month_Global,
      // ssn.Scheme_Start_Year_Global,
      // ssn.Scheme_End_Day_Global,
      // ssn.Scheme_End_Month_Global,
      // ssn.Scheme_End_Year_Global,
    });
  }
});

module.exports = router;
