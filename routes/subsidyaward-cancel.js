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
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  console.log("awardnumber : " + awardnumber);

  var awardendpoint =
    beis_url_accessmanagement + "/searchResults/award/" + awardnumber;

  try {
    const awardapidata = await axios.get(awardendpoint);
    console.log(`Status: ${awardapidata.status}`);
    console.log("Body: ", awardapidata.data);
    fetchawarddetails = awardapidata.data;
    res.render("bulkupload/subsidyaward-fetch");
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
