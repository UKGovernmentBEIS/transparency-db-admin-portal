// ********************************************************************
// Gov.UK transparency mfa award reject reason module
// ********************************************************************

const express = require("express");
var session = require("express-session");
const router = express.Router();

const axios = require("axios");

router.post("/", async (req, res) => {
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
    var { awardnumber, reject_reason_text, buttonValue } = req.body;
    console.log("awardnumber : " + awardnumber);
    console.log("Award_status : " + Award_status);
    console.log("reject_reason : " + reject_reason_text);

    const data = {
      mfaAwardNumber: awardnumber,
      speiAssistance: Boolean(ssn.mfaAwardDetails.isSpeiAssistance.toLowerCase() === "yes"),
      mfaGroupingPresent: ssn.mfaAwardDetails.hasMfaGrouping,
      status: buttonValue,
      reason: reject_reason_text,
    }

    var endpoint = beis_url_publishing + "/mfa/award/update/" + awardnumber;

    try {
      const response = await axios.put(
        endpoint,
        data,
        ssn.UserPrincileObjectGlobal
      );

      buttonValue = buttonValue.toLowerCase();
      res.render("mfa/mfaawarddeletesuccess", {
        buttonValue,
        awardnumber,
      });
    } catch (err) {
      const status = err.response.status;
      console.error("ERROR: " + err.message);

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
