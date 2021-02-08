const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  console.log("req.query.ga", req.query.ga);
  var gaID = req.query.ga.split("_");
  grantingAuthorityID_Global = gaID[0];
  res.render(
    "bulkupload/grantingauthority-editreview",
    grantingAuthorityID_Global
  );
});

module.exports = router;
