const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  console.log("totalrecords", req.query);
  // req.query = JSON.parse(JSON.stringify(req.query));

  if (req.query.hasOwnProperty("change")) {
    // const grantingAuthorityID_Global = req.query.change;
    // console.log("grantingAuthorityID_Global", grantingAuthorityID_Global);
    console.log("grantingAuthorityName_Global", grantingAuthorityName_Global);
    res.render("bulkupload/grantingauthority-add", {
      grantingAuthorityName_Global,
    });
  }
  // else if (req.query.hasOwnProperty("totalrecords")) {
  //   grantingAuthorityName_Error = "";
  //   grantingAuthorityName_Global = "";
  //   res.render("bulkupload/grantingauthority-add");
  // }
  else {
    grantingAuthorityName_Error = "";
    grantingAuthorityName_Global = "";
    res.render("bulkupload/grantingauthority-add");
  }
});

// router.post("/", (req, res) => {
//   res.set("X-Frame-Options", "DENY");
//   res.set("X-Content-Type-Options", "nosniff");
//   res.set("Content-Security-Policy", 'frame-ancestors "self"');
//   res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
//   res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

//   grantingAuthorityName_Error = false;
//   grantingAuthorityID_Global = req.body.gaNumber;
//   if (!req.body.grantingAuthorityName) grantingAuthorityName_Error = true;

//   if (grantingAuthorityName_Error) {
//     res.render("bulkupload/grantingauthority-add", {
//       grantingAuthorityName_Error,
//       grantingAuthorityID_Global,
//     });
//   } else {
//     grantingAuthorityID_Global = req.body.gaNumber;
//     grantingAuthorityName_Global = req.body.grantingAuthorityName;

//     res.render("bulkupload/grantingauthority-reviewdetails", {
//       grantingAuthorityID_Global,
//       grantingAuthorityName_Global,
//     });
//   }
// });

module.exports = router;
