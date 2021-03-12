// ********************************************************************
// Gov.UK public user search page outing
// ********************************************************************

const express = require("express");
const router = express.Router();
const axios = require("axios");
var request = require("request");

router.get("/", async (req, res) => {
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_publicsearch);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  console.log("req.query.award: " + req.query.award);
  awardnumber = req.query.award;

  console.log("awardnumber : " + awardnumber);

  var awardendpoint =
    beis_url_publicsearch + "/searchResults/award/" + awardnumber;

  try {
    const awardapidata = await axios.get(
      awardendpoint,
      UserPrincileObjectGlobal
    );
    console.log(`Status: ${awardapidata.status}`);
    console.log("Body: ", awardapidata.data);
    fetchawarddetails = awardapidata.data;
    Get_Award_Status = fetchawarddetails.status;
    console.log("Get_Award_Status", Get_Award_Status);
    if (
      Get_Award_Status.toLowerCase() == "rejected" ||
      Get_Award_Status.toLowerCase() == "awaiting approval" ||
      Get_Award_Status.toLowerCase() == "published" ||
      Get_Award_Status.toLowerCase() == "deleted" ||
      Get_Award_Status.toLowerCase() == "deactive"
    ) {
      res.render("bulkupload/subsidyaward-fetch");
    }
    // else if (Get_Award_Status == "Awaiting approval") {
    //   res.render('bulkupload/subsidyaward-fetch-approval')  ;
    // }
    // else if (Get_Award_Status == "Published") {
    //   res.render('bulkupload/subsidyaward-fetch-published')  ;
    // }
    // else if (Get_Award_Status == "Deleted") {
    //   res.render('bulkupload/subsidyaward-fetch-deleted')  ;
    // }
    else {
      res.render("bulkupload/subsidyaward-fetch-notfound");
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
