// ******************************************************************** 
// Gov.UK transparency subsidy award fetch details module
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
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_publicsearch);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    console.log("req.query.award: " + req.query.award);
    var awardnumber = req.query.award;

    console.log("awardnumber : " + awardnumber);

    var awardendpoint =
      beis_url_publicsearch + "/searchResults/award/" + awardnumber;

  try {
      const awardapidata = await axios.get(
        awardendpoint,
        ssn.UserPrincileObjectGlobal
      );
    console.log(`Status: ${awardapidata.status}`);
    console.log("Body: ", awardapidata.data);
      fetchawarddetails = awardapidata.data;

      fetchawarddetails.regionArray = new Array();

      if (fetchawarddetails.spendingRegion != null){
      fetchawarddetails.regionArray = JSON.parse(fetchawarddetails.spendingRegion);
    }

      Get_Award_Status = fetchawarddetails.status;
    console.log("Get_Award_Status", Get_Award_Status);

      var objectiveArray = new Array();
      if(fetchawarddetails.subsidyObjective != null){
      objectiveArray = JSON.parse(fetchawarddetails.subsidyObjective);
    }

      if (
        Get_Award_Status.toLowerCase() == "rejected" ||
        Get_Award_Status.toLowerCase() == "awaiting approval" ||
        Get_Award_Status.toLowerCase() == "published" ||
        Get_Award_Status.toLowerCase() == "deleted" ||
        Get_Award_Status.toLowerCase() == "deactive"
    ) {
        res.render("bulkupload/subsidyaward-fetch", {objectiveArray});
      }
      else {
      res.render("bulkupload/subsidyaward-fetch-notfound");
    }
  } catch (err) {
    console.error(err);
      if (err.toString().includes("500")) res.render("bulkupload/notAvailable");
      else if (err.toString().includes("401"))
      res.render("bulkupload/notAuthorized");
    }
  }
});

module.exports = router;
