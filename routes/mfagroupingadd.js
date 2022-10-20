// ********************************************************************
// Gov.UK transparency Add Single Subsidy Award module
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
    req.query = JSON.parse(JSON.stringify(req.query));
    if (req.query.hasOwnProperty("mfagrouping"))
      ssn.MFA_Grouping_Number_Global = req.query.mfagrouping;
    else ssn.MFA_Grouping_Number_Global = "";
    
    ssn.MFA_Grouping_Name_Global = "";
    ssn.Granting_Authority_Name_Global = "";

    ssn.Granting_Authority_Name_Error = false;
    ssn.Granting_Authority_Exists_Error = false;
    ssn.Granting_Authority_Inactive_Error = false;
    ssn.Granting_Authority_Multiple_Error = false;

    ssn.MFA_Grouping_Name_Error = false;
    ssn.MFA_Grouping_Name_Length_Error = false;

    ssn.MFAGroupingErrors = [];

    isCallfromEditGrouping = false;

    res.set("X-Frame-Options", "DENY");
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Content-Security-Policy", 'frame-ancestors "self"');
    res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

    res.render("mfa/mfagroupingadd", { 
      ssn
       });
    }
});

module.exports = router;
