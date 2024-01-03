// ********************************************************************
// Gov.UK transparency Subsidy granting authority review details from edit module
// ********************************************************************

const express = require("express");
var session = require("express-session");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
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

    try {
      const data = {
        grantingAuthorityName: "",
        grantingAuthorityID: req.query.gaid,
        pageNumber: 1,
        status: "",
        totalRecordsPerPage: 10,
        sortBy: [""],
      };
      const apidata = await axios.post(
        beis_url_searchscheme + "/searchGrantingAuthority",
        data,
        ssn.UserPrincileObjectGlobal
      );
      ssn.gaId = req.query.gaid;
      ssn.gaName = apidata.data.gaList[0].grantingAuthorityName;
      ssn.grantingAuthorityPublish_Global = false;
      ssn.GAstatus = apidata.data.gaList[0].status;
      ssn.protectedGA = ssn.protected_gas.includes(ssn.gaName);
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
    } catch (err) {
      if (err.toString().includes("500")) res.render("bulkupload/notAvailable");
      console.log("message error deactivate GA : " + err);
      // res.render("publicusersearch/noresults");
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
    // ssn.gaId
    ssn.gaName = req.body.gaName;
    // ssn.grantingAuthorityName_Global = req.body.gaName;
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
