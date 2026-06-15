// ********************************************************************
// Gov.UK transparency user account review details module
// ********************************************************************

const express = require("express");
const axios = require("axios");
var session = require("express-session");
const router = express.Router();

var jwt_decode = require("jwt-decode");
const utils = require("../utils");

router.post("/", async (req, res) => {
  ssn = req.session;
  if (
    typeof ssn.dashboard_roles_object_id1 === "undefined" ||
    typeof ssn.dashboard_roles_object_id2 === "undefined"
  ) {
    res.redirect("/signout");
  } else {
    utils.setSecurityHeaders(res, beis_url_accessmanagement);

    console.log("user name :" + ssn.dashboard_user_name);

    ssn.Full_Name_Global = req.body.firstName;
    ssn.Last_Name_Global = req.body.lastName;
    ssn.Email_Id_Global = req.body.emailId;
    ssn.Phone_Number_Global = req.body.mobileNumber;
    ssn.User_Role_Global = req.body.dashboard_roles;
    ssn.GA_Name_User_Global = req.body.dashboard_ga_name;
    res.render("bulkupload/user-account-review-details", { ssn });
  }
});

module.exports = router;
