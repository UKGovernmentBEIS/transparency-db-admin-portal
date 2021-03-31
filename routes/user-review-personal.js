const express = require("express");
var session = require("express-session");
const router = express.Router();

router.post("/", async (req, res) => {
  ssn = req.session;
  if (
    typeof ssn.dashboard_roles_object_id1 === "undefined" ||
    typeof ssn.dashboard_roles_object_id2 === "undefined" ||
    req.session.cookie.maxAge <= 0
  ) {
    res.redirect("/signout");
  } else {
    res.set("X-Frame-Options", "DENY");
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Content-Security-Policy", 'frame-ancestors "self"');
    res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

    var { Full_Name, Last_Name, Phone_Number } = req.body;

    UserErrors = [];
    UserFocus = [];
    UserErrorsLenght = 0;

    if (!Full_Name) {
      ssn.Full_Name_Error = true;
      UserErrors.push("Enter the first name");
      UserFocus.push("#FullName");
    }
    if (!Last_Name) {
      ssn.Last_Name_Error = true;
      UserErrors.push("Enter the last name");
      UserFocus.push("#LastName");
    }

    if (!Phone_Number) {
      ssn.Phone_Number_Error = true;
      UserErrors.push("Enter the mobile phone number");
      UserFocus.push("#PhoneNumber");
    }
    console.log(
      "Detaials of the User : " + Full_Name + Last_Name + Phone_Number
    );

    ssn.UserErrorLength_Global = UserErrors.length;

    console.log("UserErrorsLenght :" + ssn.UserErrorLength_Global);

    ssn.Full_Name_Global = Full_Name;
    ssn.Last_Name_Global = Last_Name;
    ssn.Phone_Number_Global = Phone_Number;

    if (ssn.UserErrorLength_Global > 0) {
      res.render("bulkupload/user-add-personal");
    } else {
      res.render("bulkupload/user-review-personal");
    }
  }
});

router.get("/", (req, res) => {
  ssn = req.session;
  if (
    typeof ssn.dashboard_roles_object_id1 === "undefined" ||
    typeof ssn.dashboard_roles_object_id2 === "undefined" ||
    req.session.cookie.maxAge <= 0
  ) {
    res.redirect("/signout");
  } else {
    res.set("X-Frame-Options", "DENY");
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Content-Security-Policy", 'frame-ancestors "self"');
    res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    res.render("bulkupload/user-review-personal");
  }
});

module.exports = router;
