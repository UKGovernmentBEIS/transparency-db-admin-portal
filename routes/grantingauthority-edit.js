const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  // req.query = JSON.parse(JSON.stringify(req.query));
  if (req.query.hasOwnProperty("edit")) {
    const grantingAuthorityID = req.query.edit;
    grantingAuthorityName_Error = "";
    console.log("grantingAuthorityID_Global", grantingAuthorityID);
    console.log("grantingAuthorityName_Global", grantingAuthorityName_Global);

    if (dashboard_roles == "BEIS Administrator") {

    res.render("bulkupload/grantingauthority-edit", {
      grantingAuthorityID_Global,
      grantingAuthorityName_Global,
    });
  }
    else {  res.render("bulkupload/notAuthorized") };
  }
});

module.exports = router;
