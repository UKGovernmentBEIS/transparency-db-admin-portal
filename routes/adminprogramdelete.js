// ********************************************************************
// Gov.UK transparency admin program delete module
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
  } else if (ssn.dashboard_roles == "BEIS Administrator") {
    utils.setSecurityHeaders(res, beis_url_searchscheme);
    res.render("admin-program/adminprogramdelete");
  } else {
    utils.setSecurityHeaders(res, beis_url_searchscheme);
    res.render("bulkupload/notAuthorized");
  }
});

module.exports = router;
