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
    res.set("Content-Security-Policy", 'frame-ancestors "self"');
    res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    // console.log("req.query.ga", req.query.ga.toString());
    req.query = JSON.parse(JSON.stringify(req.query));
    var gaID = "";
    // console.log(req.query);
    // if (req.query.hasOwnProperty("ga")) {
    //   gaID = req.query.ga.split("_");
    ssn.grantingAuthorityID_Global = req.query.gaid;
    ssn.grantingAuthorityName_Global = req.query.ganame;
    ssn.grantingAuthorityPublish_Global = false;
    // }

    if (ssn.dashboard_roles == "BEIS Administrator") {
      res.render("bulkupload/grantingauthority-editreview", {
        // ssn.grantingAuthorityID_Global,
        // ssn.grantingAuthorityName_Global,
        ssn,
        // ssn.grantingAuthorityPublish_Global,
      });
    } else {
      res.render("bulkupload/notAuthorized");
    }
  }
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
    res.set("Content-Security-Policy", 'frame-ancestors "self"');
    res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    console.log("req.body", req.body);
    console.log("req.query", ssn.grantingAuthorityID_Global);
    req.query = JSON.parse(JSON.stringify(req.query));
    var gaID = "";
    // gaID = req.query.ga.split("_");
    ssn.grantingAuthorityName_Global = req.body.gaName;
    // ssn.grantingAuthorityID_Global = req.body.gaId;
    ssn.grantingAuthorityPublish_Global = true;

    res.render("bulkupload/grantingauthority-editreview", {
      // ssn.grantingAuthorityID_Global,
      // ssn.grantingAuthorityName_Global,
      // ssn.grantingAuthorityPublish_Global,
      ssn,
    });
  }
});

module.exports = router;
