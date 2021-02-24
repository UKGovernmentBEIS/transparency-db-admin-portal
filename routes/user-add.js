const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  Full_Name_Error = false;
  Last_Name_Error = false;
  Email_Id_Error = false;
  Phone_Number_Error = false;

  if (dashboard_roles == "BEIS Administrator" || dashboard_roles == "Granting Authority Administrator") {
  res.render("bulkupload/user-add");
  }
  else {  res.render("bulkupload/notAuthorized") };
});

module.exports = router;
