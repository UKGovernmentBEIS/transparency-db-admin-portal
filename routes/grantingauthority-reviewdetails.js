// ********************************************************************
// Gov.UK transparency Subsidy granting authority review details from add page module
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
    res.set("Cross-Origin-Resource-Policy", "same-origin");
    res.set("Cross-Origin-Opener-Policy", "same-origin");
    res.set("Cross-Origin-Embedder-Policy", "require-corp");

    console.log(
      "req.body.grantingAuthorityName",
      ssn.grantingAuthorityName_Global
    );
    ssn.grantingAuthorityName_Error_Msg = "";
    ssn.grantingAuthorityName_Error = false;

    if (ssn.dashboard_roles == "BEIS Administrator") {
      res.render("bulkupload/grantingauthority-add", {
        // ssn.grantingAuthorityName_Global,
        ssn,
      });
    } else {
      res.render("bulkupload/notAuthorized");
    }
  }
  // res.render("bulkupload/grantingauthority-reviewdetails");
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
    res.set("Cross-Origin-Resource-Policy", "same-origin");
    res.set("Cross-Origin-Opener-Policy", "same-origin");
    res.set("Cross-Origin-Embedder-Policy", "require-corp");

    ssn.grantingAuthorityName_Error = false;

    ssn.grantingAuthorityID_Global = req.body.gaNumber;
    if (!req.body.grantingAuthorityName) ssn.grantingAuthorityName_Error = true;

    if (ssn.grantingAuthorityName_Error) {
      ssn.grantingAuthorityName_Error_Msg = "Enter a public authority name";
      res.render("bulkupload/grantingauthority-add", {
        ssn,
        // ssn.grantingAuthorityName_Error,
        // ssn.grantingAuthorityName_Error_Msg,
        // ssn.grantingAuthorityID_Global,
      });
    } else {
      ssn.grantingAuthorityID_Global = req.body.gaNumber;
      ssn.grantingAuthorityName_Global = req.body.grantingAuthorityName;

      res.render("bulkupload/grantingauthority-reviewdetails", {
        // ssn.grantingAuthorityID_Global,
        // ssn.grantingAuthorityName_Global,
        ssn,
      });
    }
  }
  // res.render("bulkupload/grantingauthority-reviewdetails");
});

module.exports = router;
