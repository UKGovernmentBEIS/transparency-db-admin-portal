const express = require("express");
const { route } = require("./loginfirstpage");
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

    res.render("accessmanagement/loginpasswordcomplete");
  }
});

router.post("/", (req, res) => {
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

    const { password, password1 } = req.body;
    let isPasswordEmpty = false;
    let isPasswordLengthLessThanTen = false;
    let isBothPasswordNotMatching = false;

    passwordLength = password.length;

    if (!password || !password1) {
      isPasswordEmpty = true;
      res.render("accessmanagement/loginnewpassword", { isPasswordEmpty });
    } else if (passwordLength < 8) {
      isPasswordLengthLessThanTen = true;
      res.render("accessmanagement/loginnewpassword", {
        isPasswordLengthLessThanTen,
      });
    } else if (password != password1) {
      isBothPasswordNotMatching = true;
      res.render("accessmanagement/loginnewpassword", {
        isBothPasswordNotMatching,
      });
    } else {
      res.render("accessmanagement/loginpasswordcomplete");
    }
  }
});

module.exports = router;
