const express = require("express");
var session = require("express-session");
const router = express.Router();

router.get("/", (req, res) => {
  ssn = req.session;
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  ssn.grantingAuthorityID_Global = req.query.gaId;
  ssn.grantingAuthorityName_Global = req.query.gaName;
  res.render("bulkupload/grantingauthority-editcancel", {
    // ssn.grantingAuthorityID_Global,
    // ssn.grantingAuthorityName_Global,
    ssn,
  });
});

module.exports = router;
