// ********************************************************************
// Gov.UK transparency Subsidy granting authority edit module
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
    res.set("X-Frame-Options", "DENY");
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Content-Security-Policy", 'frame-ancestors "self"');
    res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

    // req.query = JSON.parse(JSON.stringify(req.query));
    if (req.query.hasOwnProperty("edit")) {
      const grantingAuthorityID = req.query.edit;
      ssn.grantingAuthorityName_Error = "";
      console.log("ssn.grantingAuthorityID_Global", grantingAuthorityID);
      console.log(
        "ssn.grantingAuthorityName_Global",
        ssn.grantingAuthorityName_Global
      );

      if (ssn.dashboard_roles == "BEIS Administrator") {
        res.render("bulkupload/grantingauthority-edit", {
          ssn,
          // ssn.grantingAuthorityID_Global,
          // ssn.grantingAuthorityName_Global,
        });
      } else {
        res.render("bulkupload/notAuthorized");
      }
    }
  }
});

module.exports = router;
