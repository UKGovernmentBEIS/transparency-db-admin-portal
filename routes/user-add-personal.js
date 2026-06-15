// ********************************************************************
// Gov.UK transparency individual user account module
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

    ssn.Full_Name_Error = false;
    ssn.Last_Name_Error = false;
    ssn.Phone_Number_Error = false;
    UserErrors = [];
    UserFocus = [];
    UserErrorsLenght = 0;

    if (
      ssn.dashboard_roles == "BEIS Administrator" ||
      ssn.dashboard_roles == "Granting Authority Administrator"
    ) {
      res.render("bulkupload/user-add-personal");
    } else {
      res.render("bulkupload/notAuthorized");
    }
  }
});

module.exports = router;
