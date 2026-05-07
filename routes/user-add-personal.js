// ********************************************************************
// Gov.UK transparency individual user account module
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
    res.set("Content-Security-Policy", [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'"
    ].join(";"));

    res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
    res.set("Referrer-Policy", "strict-origin-when-cross-origin");
    res.set("Cross-Origin-Resource-Policy", "same-site");
    res.set("Cross-Origin-Opener-Policy", "same-origin");
    res.set("Cross-Origin-Embedder-Policy", "require-corp");

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
