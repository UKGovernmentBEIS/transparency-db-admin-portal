// ********************************************************************
// Gov.UK public user search page outing
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
    awardnumber = req.query.award;
    res.set("X-Frame-Options", "DENY");
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Content-Security-Policy", 'frame-ancestors "self"');
    res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    try {
      const awardapidata = await axios.get(
        beis_url_accessmanagement + "/searchResults/award/" + awardnumber,
        ssn.UserPrincileObjectGlobal
      );
      console.log(`Status: ${awardapidata.status}`);
      console.log("Body: ", awardapidata.data);
      searchawarddetails = awardapidata.data;
      Subsidy_Control_Number = awardapidata.data.subsidyMeasure.scNumber;
      Subsidy_Measure_Title =
        awardapidata.data.subsidyMeasure.subsidyMeasureTitle;
      Subsidy_Element_Full_Amount = awardapidata.data.subsidyFullAmountRange;
      Granting_Authority_Name =
        awardapidata.data.grantingAuthorityResponse.grantingAuthorityName;
      Subsidy_Objective = awardapidata.data.subsidyObjective;
      Spending_Region = awardapidata.data.spendingRegion;
      Subsidy_Instrument = awardapidata.data.subsidyInstrument;
      Spending_Sector = awardapidata.data.spendingSector;
      National_ID_Number = awardapidata.data.beneficiary.nationalId;
      National_ID_Type = awardapidata.data.beneficiary.nationalIdType;
      Size_of_the_Organisation = awardapidata.data.beneficiary.orgSize;
      Beneficiary_Name = awardapidata.data.beneficiary.beneficiaryName;
      Goods_or_Services = awardapidata.data.goodsServicesFilter;

      var date = awardapidata.data.legalGrantingDate.split(" ");
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

      Legal_Granting_Date_Month =
        month.indexOf(date[1]) + 1 < 10
          ? "0" + (month.indexOf(date[1]) + 1)
          : month.indexOf(date[1]) + 1;

      Legal_Granting_Date_Day = date[0];

      Legal_Granting_Date_Year = date[2];

      res.render("bulkupload/subsidyaward-edit", { awardnumber });
    } catch (err) {
      console.error(err);
      if (err.toString().includes("500")) res.render("bulkupload/notAvailable");
      else if (err.toString().includes("401"))
        res.render("bulkupload/notAuthorized");
    }
  }
});

module.exports = router;
