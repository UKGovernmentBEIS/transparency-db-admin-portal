const express = require("express");
var session = require("express-session");
const router = express.Router();

router.post("/", (req, res) => {
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

    const { email_address } = req.body;
    let isEmailEmpty = false;
    let validToken = "@";
    let isEmailValid = false;
    isEmailValid = email_address.includes(validToken);
    if (!email_address) {
      isEmailEmpty = "yes";
      res.render("accessmanagement/loginresetpassword", { isEmailEmpty });
    } else if (!isEmailValid) {
      res.render("accessmanagement/loginresetpassword", { isEmailValid });
    } else {
      console.log(email_address);
      email_addresspass = email_address;
      console.log("email address:" + email_addresspass);

      res.render("accessmanagement/loginemailconfirmationexpiry"),
        { email_addresspass };
    }
  }
});
module.exports = router;
