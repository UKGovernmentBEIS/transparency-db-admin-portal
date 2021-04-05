const express = require("express");
var session = require("express-session");
const router = express.Router();

router.get("/", (req, res) => {
  ssn = req.session;
  if (
    typeof ssn.dashboard_roles_object_id1 === "undefined" ||
    typeof ssn.dashboard_roles_object_id2 === "undefined"
  ) {
    res.redirect("/signout");
  } else {
    res.set("X-Frame-Options", "DENY");
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Content-Security-Policy", 'frame-ancestors "self"');
    res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

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
