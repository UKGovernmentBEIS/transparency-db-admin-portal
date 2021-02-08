// ********************************************************************
// Gov.UK Admin portal subsidy scheme fetch Routing
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

  console.log("req.query.scheme: " + req.query.scheme);
  scnumber = req.query.scheme;
  console.log("scnumber : " + scnumber);
  var measureendpoint = beis_url_searchscheme + "/scheme/" + scnumber;

  try {
    const measureapidata = await axios.get(measureendpoint);
    console.log(`Status: ${measureapidata.status}`);
    console.log("Body: ", measureapidata.data);
    searchmeasuredetails = measureapidata.data;
    Scheme_Start_Date = searchmeasuredetails.startDate;
    Scheme_End_Date = searchmeasuredetails.endDate;

    var date = Scheme_Start_Date.split(" ");

    var month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    Scheme_Legal_Granting_Start_Date_Month =
      month.indexOf(date[1]) + 1 < 10
        ? "0" + (month.indexOf(date[1]) + 1)
        : month.indexOf(date[1]) + 1;
    Scheme_Legal_Granting_Start_Date_Day = date[0];
    Scheme_Legal_Granting_Start_Date_Year = date[2];

    var date = Scheme_End_Date.split(" ");
    Scheme_Legal_Granting_End_Date_Month =
      month.indexOf(date[1]) + 1 < 10
        ? "0" + (month.indexOf(date[1]) + 1)
        : month.indexOf(date[1]) + 1;
    Scheme_Legal_Granting_End_Date_Day = date[0];
    Scheme_Legal_Granting_End_Date_Year = date[2];

    SubsidyArraySize = 0;

    Subsidy_Measure_Title_Error = false;
    Subsidy_Adhoc_Error = false;
    Granting_Authority_Name_Error = false;
    scheme_issued_start_day_Error = false;
    scheme_issued_start_month_Error = false;
    scheme_issued_start_year_Error = false;
    Legal_Basis_Error = false;
    Granting_Authority_URL_Error = false;
    Granting_Authority_Policy_Error = false;
    Budget_Error = false;
    scheme_issued_end_day_Error = false;
    scheme_issued_end_month_Error = false;
    scheme_issued_end_year_Error = false;

    res.render("bulkupload/subsidymeasures-edit");
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
