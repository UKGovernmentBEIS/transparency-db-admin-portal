// ********************************************************************
// Gov.UK transparency user account details module
// ********************************************************************

const express = require("express");
const axios = require("axios");
var session = require("express-session");
const router = express.Router();

var jwt_decode = require("jwt-decode");
const utils = require("../utils");

router.get("/", async (req, res) => {
  ssn = req.session;
  if (
    typeof ssn.dashboard_roles_object_id1 === "undefined" ||
    typeof ssn.dashboard_roles_object_id2 === "undefined"
  ) {
    res.redirect("/signout");
  } else {
    utils.setSecurityHeaders(res, beis_url_accessmanagement);

    console.log("User_id: " + ssn.user_id);
    console.log("user name :" + ssn.dashboard_user_name);

    res.render("bulkupload/user-account-details", { ssn });
  }
});

module.exports = router;
