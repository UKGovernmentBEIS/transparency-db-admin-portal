// ********************************************************************
// Gov.UK transparency Subsidy granting authority cancel from edit module
// ********************************************************************

const express = require("express");
var session = require("express-session");
const router = express.Router();
const utils = require("../utils");

router.get("/", (req, res) => {
  ssn = req.session;
  if (
    typeof ssn.dashboard_roles_object_id1 === "undefined" ||
    typeof ssn.dashboard_roles_object_id2 === "undefined"
  ) {
    res.redirect("/signout");
  } else {
    utils.setSecurityHeaders(res, beis_url_accessmanagement);
    ssn.grantingAuthorityID_Global = req.query.gaId;
    ssn.grantingAuthorityName_Global = req.query.gaName;
    res.render("bulkupload/grantingauthority-editcancel", {
      // ssn.grantingAuthorityID_Global,
      // ssn.grantingAuthorityName_Global,
      ssn,
    });
  }
});

module.exports = router;
