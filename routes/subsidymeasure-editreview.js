// ********************************************************************
// Gov.UK transparency subsidy scheme edit review details module
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
    // res.set("X-Frame-Options", "DENY");
    // res.set("X-Content-Type-Options", "nosniff");
    // res.set("Content-Security-Policy", 'frame-ancestors "self"');
    // res.set("Access-Control-Allow-Origin", beis_url_publicsearch);

    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

    console.log("req.query.scheme: " + req.query.scheme);
    scnumber = req.query.scheme;
    console.log("scnumber : " + scnumber);

    scNumber_Global = scnumber;
    // ssn.Subsidy_Control_Number_Global = scnumber;

    var measureendpoint = beis_url_searchscheme + "/scheme/" + scnumber;

    try {
      const measureapidata = await axios.get(
        measureendpoint,
        ssn.UserPrincileObjectGlobal
      );
      console.log(`Status: ${measureapidata.status}`);
      console.log("Body: ", measureapidata.data);
      ssn.searchmeasuredetails = measureapidata.data;
      Scheme_Confirmation_Date = ssn.searchmeasuredetails.confirmationDate;
      Scheme_Start_Date = ssn.searchmeasuredetails.startDate;
      Scheme_End_Date = ssn.searchmeasuredetails.endDate;
      Subsidy_Scheme_Description = ssn.searchmeasuredetails.Subsidy_Scheme_Description;
      Maximum_Amount_Under_Scheme = ssn.searchmeasuredetails.maximumAmountUnderScheme;


      var spendingSectorArray = new Array();
      if(ssn.searchmeasuredetails.spendingSectors != null){
        spendingSectorArray = JSON.parse(ssn.searchmeasuredetails.spendingSectors);
      }

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
      console.log("Scheme_Start_Date", Scheme_Start_Date);

      res.render("bulkupload/subsidymeasure-editreview", {
        spendingSectorArray
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
