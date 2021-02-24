const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  // console.log("req.query.ga", req.query.ga.toString());
  req.query = JSON.parse(JSON.stringify(req.query));
  var gaID = "";
  // console.log(req.query);
  // if (req.query.hasOwnProperty("ga")) {
  //   gaID = req.query.ga.split("_");
  grantingAuthorityID_Global = req.query.gaid;
  grantingAuthorityName_Global = req.query.ganame;
  grantingAuthorityPublish_Global = false;
  // }

  if (dashboard_roles == "BEIS Administrator") {
  res.render("bulkupload/grantingauthority-editreview", {
    grantingAuthorityID_Global,
    grantingAuthorityName_Global,
    grantingAuthorityPublish_Global,
  });
}
  else {  res.render("bulkupload/notAuthorized") };

});

router.post("/", (req, res) => {
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  console.log("req.body", req.body);
  console.log("req.query", grantingAuthorityID_Global);
  req.query = JSON.parse(JSON.stringify(req.query));
  var gaID = "";
  // gaID = req.query.ga.split("_");
  grantingAuthorityName_Global = req.body.gaName;
  // grantingAuthorityID_Global = req.body.gaId;
  grantingAuthorityPublish_Global = true;

  res.render("bulkupload/grantingauthority-editreview", {
    grantingAuthorityID_Global,
    grantingAuthorityName_Global,
    grantingAuthorityPublish_Global,
  });
});

module.exports = router;
