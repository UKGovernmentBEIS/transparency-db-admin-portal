const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
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
    res.render("accessmanagement/loginforgetpassword", { isEmailEmpty });
  } else if (!isEmailValid) {
    res.render("accessmanagement/loginforgetpassword", { isEmailValid });
  } else {
    email_addresspass = email_address;
    // app.locals.email_addresspass = email_address;
    console.log(email_addresspass);
    res.render("accessmanagement/loginemailconfirmation"),
      { email_addresspass };
  }
});

module.exports = router;
