// ********************************************************************
// Gov.UK transparency subsidy scheme version detail page
// ********************************************************************

const express = require("express");
var session = require("express-session");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  ssn = req.session;
  if (
    typeof ssn.dashboard_roles_object_id1 === "undefined" ||
    typeof ssn.dashboard_roles_object_id2 === "undefined"
  ) {
    res.redirect("/signout");
  } else {
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

    console.log("scNumber: " + req.query.scNumber);
    console.log("version: " + req.query.version);
    const scnumber = req.query.scNumber;
    const version = req.query.version;
    

    scNumber_Global = scnumber;

    const currentURI = req.protocol + '://' + req.get('host') + req.originalUrl;
    const versionEndpoint = beis_url_searchscheme + "/scheme/" + scnumber + "/version/" + version;
    const schemeEndpoint = beis_url_searchscheme + "/scheme/" + scnumber;

    try {
      var response = await axios.get(
        versionEndpoint,
        ssn.UserPrincileObjectGlobal
      )
      schemeVersionDetails = response.data;
      
      schemeVersionDetails.spendingSectorArray = new Array();
      if(schemeVersionDetails.spendingSectors != null){
        schemeVersionDetails.spendingSectorArray = JSON.parse(schemeVersionDetails.spendingSectors);
      }

      var response = await axios.get(
        schemeEndpoint,
        ssn.UserPrincileObjectGlobal
      );

      originalScheme = response.data;

      res.render("bulkupload/subsidymeasure-version", {
        currentURI: req.protocol + '://' + req.get('host') + req.originalUrl
      });
    } catch (err) {
      const status = err.response.status;
      console.error("ERROR: " + err.message);

      var render;
      switch (status) {
        case 403:
          render = "bulkupload/notAuthorized"
          break;
        default:
          render = "bulkupload/notavailable"
      }
      res.render(render);
    }
  }
});

module.exports = router;
