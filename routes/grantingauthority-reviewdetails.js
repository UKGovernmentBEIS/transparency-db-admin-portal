const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  grantingAuthorityName_Error = false;
  grantingAuthorityID_Global = req.body.gaNumber;
  if (!req.body.grantingAuthorityName) grantingAuthorityName_Error = true;

  if (grantingAuthorityName_Error) {
    res.render("bulkupload/grantingauthority-add", {
      grantingAuthorityName_Error,
      grantingAuthorityID_Global,
    });
  } else {
    grantingAuthorityID_Global = req.body.gaNumber;
    grantingAuthorityName_Global = req.body.grantingAuthorityName;

    res.render("bulkupload/grantingauthority-reviewdetails", {
      grantingAuthorityID_Global,
      grantingAuthorityName_Global,
    });
  }
  // res.render("bulkupload/grantingauthority-reviewdetails");
});

module.exports = router;