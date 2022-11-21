// ********************************************************************
// Gov.UK transparency mfa grouping delete module
// ********************************************************************

const express = require("express");
var session = require("express-session");
const router = express.Router();

router.get("/", async (req, res) => {
  ssn = req.session;
  if (
    typeof ssn.dashboard_roles_object_id1 === "undefined" ||
    typeof ssn.dashboard_roles_object_id2 === "undefined"
  ) {
    res.redirect("/signout");
  } else if (ssn.dashboard_roles == "BEIS Administrator" || ssn.dashboard_roles == "Granting Authority Administrator") {
    res.set("X-Frame-Options", "DENY");
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Content-Security-Policy", 'frame-ancestors "self"');
    res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    res.render("mfa/mfagroupingdelete");
  } else {
    res.render("bulkupload/notAuthorized");
  }
});

module.exports = router;
