// ********************************************************************
// Gov.UK transparency subsidy award published successfully module
// ********************************************************************

const express = require("express");
var session = require("express-session");
const router = express.Router();

const axios = require("axios");
const utils = require("../utils");

router.get("/", async (req, res) => {
  ssn = req.session;
  if (
    typeof ssn.dashboard_roles_object_id1 === "undefined" ||
    typeof ssn.dashboard_roles_object_id2 === "undefined"
  ) {
    res.redirect("/signout");
  } else {
    utils.setSecurityHeaders(res, beis_url_publicsearch);
    res.render("bulkupload/subsidyaward-published-successfully");
    ssn.Subsidy_Control_Number_Global = "";
  }
});

module.exports = router;
