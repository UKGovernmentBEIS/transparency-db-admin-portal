// ********************************************************************
// Gov.UK Admin portal subsidy scheme fetch Routing
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
    typeof ssn.dashboard_roles_object_id2 === "undefined" ||
    req.session.cookie.maxAge <= 0
  ) {
    res.redirect("/signout");
  } else {
    res.set("X-Frame-Options", "DENY");
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Content-Security-Policy", 'frame-ancestors "self"');
    res.set("Access-Control-Allow-Origin", beis_url_publicsearch);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

    console.log("req.query.scheme: " + req.query.scheme);
    scnumber = req.query.scheme;
    console.log("scnumber : " + scnumber);
    var measureendpoint = beis_url_searchscheme + "/scheme/" + scnumber;

    try {
      const measureapidata = await axios.get(
        measureendpoint,
        ssn.UserPrincileObjectGlobal
      );
      console.log(`Status: ${measureapidata.status}`);
      console.log("Body: ", measureapidata.data);
      ssn.searchmeasuredetails = measureapidata.data;
      Scheme_Start_Date = ssn.searchmeasuredetails.startDate;
      Scheme_End_Date = ssn.searchmeasuredetails.endDate;

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

      ssn.Scheme_Legal_Granting_Start_Date_Month =
        month.indexOf(date[1]) + 1 < 10
          ? "0" + (month.indexOf(date[1]) + 1)
          : month.indexOf(date[1]) + 1;
      Scheme_Legal_Granting_Start_Date_Day = date[0];
      ssn.Scheme_Legal_Granting_Start_Date_Year = date[2];

      var date = Scheme_End_Date.split(" ");
      ssn.Scheme_Legal_Granting_End_Date_Month =
        month.indexOf(date[1]) + 1 < 10
          ? "0" + (month.indexOf(date[1]) + 1)
          : month.indexOf(date[1]) + 1;
      ssn.Scheme_Legal_Granting_End_Date_Day = date[0];
      ssn.Scheme_Legal_Granting_End_Date_Year = date[2];

      ssn.SubsidyArraySize = 0;

      ssn.Subsidy_Measure_Title_Error = false;
      ssn.Subsidy_Adhoc_Error = false;
      ssn.Granting_Authority_Name_Error = false;
      ssn.scheme_issued_start_day_Error = false;
      ssn.scheme_issued_start_month_Error = false;
      ssn.scheme_issued_start_year_Error = false;
      Legal_Basis_Error = false;
      Granting_Authority_URL_Error = false;
      Granting_Authority_Policy_Error = false;
      Budget_Error = false;
      ssn.scheme_issued_end_day_Error = false;
      ssn.scheme_issued_end_month_Error = false;
      ssn.scheme_issued_end_year_Error = false;

      if (ssn.dashboard_roles !== "Granting Authority Encoder") {
        res.render("bulkupload/subsidymeasures-edit");
      } else {
        res.render("bulkupload/notAuthorized");
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
