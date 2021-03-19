const express = require("express");
var session = require("express-session");
const router = express.Router();

router.post("/", (req, res) => {
  ssn = req.session;
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  ssn.User_Role_Single = req.body.userRole;
  ssn.User_GA_Name = req.body.GA_Selected;
  ssn.User_Name_Single = req.body.User_Name_Single;
  ssn.User_Last_Name_Single = req.body.User_Last_Name_Single;
  ssn.User_Email_Single = req.body.User_Email_Single;
  ssn.User_Mobile_Single = req.body.User_Mobile_Single;
  res.render("bulkupload/user-edit-review");
});

module.exports = router;
