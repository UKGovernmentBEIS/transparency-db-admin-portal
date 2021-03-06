// ********************************************************************
// Gov.UK transparency user edit module
// ********************************************************************

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
    console.log("edit user role", ssn.User_Role_Single);
    UserRole = "";
    if (ssn.User_Role_Single != "") {
      if (ssn.User_Role_Single.includes("GrantingAuthority"))
        UserRole = "Granting Authority Administrators";
      else if (ssn.User_Role_Single.includes("BEIS"))
        UserRole = "BEIS Administrators";
      else if (ssn.User_Role_Single.includes("Encoder"))
        UserRole = "Granting Authority Encoder";
      else UserRole = "Granting Authority Approver";
    }

    console.log("edit UserRole", UserRole);
    res.render("bulkupload/user-edit", {
      UserRole,
      GA_Selected,
      ssn,
      // ssn.User_Name_Single,
      // ssn.User_Last_Name_Single,
      // ssn.User_Email_Single,
      // ssn.User_Mobile_Single,
    });
  }
});

module.exports = router;
