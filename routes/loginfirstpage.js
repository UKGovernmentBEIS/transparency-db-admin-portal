// ********************************************************************
// Gov.UK transparency Subsidy login first page module
// ********************************************************************

const express = require("express");
var session = require("express-session");
const router = express.Router();
const utils = require("../utils");

router.get("/", (req, res) => {
  ssn = req.session;
  utils.setSecurityHeaders(res, beis_url_accessmanagement);
  res.render("accessmanagement/loginfirstpage");
});

module.exports = router;
