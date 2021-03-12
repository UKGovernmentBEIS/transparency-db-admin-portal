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
  console.log("totalrecords", req.query);
  // req.query = JSON.parse(JSON.stringify(req.query));

  if (req.query.hasOwnProperty("change")) {
    console.log(
      "ssn.grantingAuthorityName_Global",
      ssn.grantingAuthorityName_Global
    );

    if (ssn.dashboard_roles == "BEIS Administrator") {
      res.render("bulkupload/grantingauthority-add", {
        // ssn.grantingAuthorityName_Global,
        ssn,
      });
    } else {
      res.render("bulkupload/notAuthorized");
    }
  } else {
    ssn.grantingAuthorityName_Error = "";
    ssn.grantingAuthorityName_Global = "";
    if (ssn.dashboard_roles == "BEIS Administrator") {
      res.render("bulkupload/grantingauthority-add");
    } else {
      res.render("bulkupload/notAuthorized");
    }
  }
});

// router.post("/", (req, res) => {
//   res.set("X-Frame-Options", "DENY");
//   res.set("X-Content-Type-Options", "nosniff");
//   res.set("Content-Security-Policy", 'frame-ancestors "self"');
//   res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
//   res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

//   ssn.grantingAuthorityName_Error = false;
//   ssn.grantingAuthorityID_Global = req.body.gaNumber;
//   if (!req.body.grantingAuthorityName) ssn.grantingAuthorityName_Error = true;

//   if (ssn.grantingAuthorityName_Error) {
//     res.render("bulkupload/grantingauthority-add", {
//       ssn.grantingAuthorityName_Error,
//       ssn.grantingAuthorityID_Global,
//     });
//   } else {
//     ssn.grantingAuthorityID_Global = req.body.gaNumber;
//     ssn.grantingAuthorityName_Global = req.body.grantingAuthorityName;

//     res.render("bulkupload/grantingauthority-reviewdetails", {
//       ssn.grantingAuthorityID_Global,
//       ssn.grantingAuthorityName_Global,
//     });
//   }
// });

module.exports = router;
