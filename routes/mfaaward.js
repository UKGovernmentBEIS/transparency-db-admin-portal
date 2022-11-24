// ********************************************************************
// Gov.UK transparency mfa grouping view screen
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
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

    if(req.query.hasOwnProperty("id")){
        mfaAwardNumber = req.query.id;
    }else{
        res.render("bulkupload/notAvailable");
    }

    var mfaAwardEndpoint = beis_url_publishing + "/mfa/award/" + mfaAwardNumber;

    try {
      const apiData = await axios.get(
        mfaAwardEndpoint,
        ssn.UserPrincileObjectGlobal
      );

      ssn.mfaAwardDetails = apiData.data;

      res.render("mfa/mfaaward");

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
