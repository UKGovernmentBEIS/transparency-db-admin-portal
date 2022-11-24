// ********************************************************************
// Gov.UK transparency subsidy scheme deactivated successfully module
// ********************************************************************

const express = require("express");
var session = require("express-session");
const router = express.Router();

const axios = require("axios");
var request = require("request");

router.get("/", async (req, res) => {
  ssn = req.session;
  if (
    typeof ssn.dashboard_roles_object_id1 === "undefined" ||
    typeof ssn.dashboard_roles_object_id2 === "undefined"
  ) {
    res.redirect("/signout");
  } else {
    var mfaGroupingStatus = "Deleted";
    var render = "mfa/mfagroupingdeletesuccess";

    res.set("X-Frame-Options", "DENY");
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Content-Security-Policy", 'frame-ancestors "self"');
    res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

    try {
      console.log("MFA Grouping Number", ssn.mfaGroupingDetails.mfaGroupingNumber);
      const deleteApiData = await axios.put(
        beis_url_publishing + `/mfa/grouping/update/${ssn.mfaGroupingDetails.mfaGroupingNumber}`,
        {
          status: mfaGroupingStatus,
        },
        ssn.UserPrincileObjectGlobal
      );

      console.log(`Status: ${deleteApiData.status}`);

      res.render(render, {
        ssn,
      });
    } catch (err) {
      const status = err.response.status;
      console.log("message error : " + err);

      var render = "bulkupload/notAvailable";
      switch(status){
        case 500:
          break;
        case 401:
        case 403:
          render = "bulkupload/notAuthorized"
          break;
      }
      res.render(render);
    }
  }
});

module.exports = router;
