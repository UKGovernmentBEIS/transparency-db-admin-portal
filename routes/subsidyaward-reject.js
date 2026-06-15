// ********************************************************************
// Gov.UK transparency subsidy award reject module
// ********************************************************************

const express = require("express");
var session = require("express-session");
const router = express.Router();
const utils = require("../utils");

router.post("/", (req, res) => {
  ssn = req.session;
  if (
    typeof ssn.dashboard_roles_object_id1 === "undefined" ||
    typeof ssn.dashboard_roles_object_id2 === "undefined"
  ) {
    res.redirect("/signout");
  } else {
    utils.setSecurityHeaders(res, beis_url_accessmanagement);
    Award_status = req.body.status;
    awardnumber = req.body.awardnumber;
    res.render("bulkupload/subsidyaward-reject", { Award_status, awardnumber });
  }
});

module.exports = router;
