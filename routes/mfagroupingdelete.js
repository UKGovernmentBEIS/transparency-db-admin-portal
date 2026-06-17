// ********************************************************************
// Gov.UK transparency mfa grouping delete module
// ********************************************************************

const express = require("express");
var session = require("express-session");
const router = express.Router();
const utils = require("../utils");

router.get("/", async (req, res) => {
  ssn = req.session;
  if (
    typeof ssn.dashboard_roles_object_id1 === "undefined" ||
    typeof ssn.dashboard_roles_object_id2 === "undefined"
  ) {
    res.redirect("/signout");
  } else if (ssn.dashboard_roles == "BEIS Administrator" || ssn.dashboard_roles == "Granting Authority Administrator") {
    utils.setSecurityHeaders(res, beis_url_accessmanagement);
    res.render("mfa/mfagroupingdelete");
  } else {
    utils.setSecurityHeaders(res, beis_url_accessmanagement);
    res.render("bulkupload/notAuthorized");
  }
});

module.exports = router;
