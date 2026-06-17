// ********************************************************************
// Gov.UK transparency user edit review module
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
    
    ssn.User_Role_Single = req.body.userRole;
    ssn.User_GA_Name = req.body.GA_Selected;
    ssn.User_Name_Single = req.body.User_Name_Single;
    ssn.User_Last_Name_Single = req.body.User_Last_Name_Single;
    ssn.User_Email_Single = req.body.User_Email_Single;
    ssn.User_Mobile_Single = req.body.User_Mobile_Single;
    res.render("bulkupload/user-edit-review");
  }
});

module.exports = router;
