// ********************************************************************
// Gov.UK transparency subsidy scheme edit module
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

    console.log("req.query.scheme: " + req.query.scheme);
    scnumber = req.query.scheme;
    edit = req.query.editsc;
    if (edit == "No") {
      console.log("scnumber : " + scnumber);
      var measureendpoint = beis_url_searchscheme + "/scheme/" + scnumber;

      try {
        const measureapidata = await axios.get(
          measureendpoint,
          ssn.UserPrincileObjectGlobal
        );
        console.log(`Status: ${measureapidata.status}`);
        console.log("Body: ", measureapidata.data);
        // ssn.searchmeasuredetails = measureapidata.data;

        ssn.Subsidy_Adhoc_Global = measureapidata.data.adhoc;
        ssn.scNumber_Global = measureapidata.data.scNumber;
        ssn.Granting_Authority_Name_Global = measureapidata.data.gaName;
        ssn.Subsidy_Measure_Title_Global =
          measureapidata.data.subsidyMeasureTitle;
        ssn.Legal_Basis_Global = measureapidata.data.legalBasisText;
        ssn.Granting_Authority_URL_Global =
          measureapidata.data.gaSubsidyWebLink;
        ssn.Granting_Authority_Policy_Global =
          measureapidata.data.gaSubsidyWebLinkDescription;
        ssn.Budget_Global = measureapidata.data.budget;
        // ssn.Schemaf4fc86e-1846-4339-9e83-4b1d8c04bc4ce_Start_Day_Global = scheme_issued_start_day;
        // ssn.Scheme_Start_Month_Global = scheme_issued_start_month;
        // ssn.Scheme_Start_Year_Global = scheme_issued_start_year;
        // ssn.Scheme_End_Day_Global = scheme_issued_end_day;
        // ssn.Scheme_End_Month_Global = scheme_issued_end_month;
        // ssn.Scheme_End_Year_Global = scheme_issued_end_year;

        Scheme_Start_Date = ssn.searchmeasuredetails.startDate;
        Scheme_End_Date = ssn.searchmeasuredetails.endDate;
        ssn.Has_No_End_Date = measureapidata.data.hasNoEndDate;

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

        ssn.Scheme_Start_Month_Global =
          month.indexOf(date[1]) + 1 < 10
            ? "0" + (month.indexOf(date[1]) + 1)
            : month.indexOf(date[1]) + 1;
        ssn.Scheme_Start_Day_Global = date[0];
        ssn.Scheme_Start_Year_Global = date[2];

        var date = Scheme_End_Date.split(" ");
        ssn.Scheme_End_Month_Global =
          month.indexOf(date[1]) + 1 < 10
            ? "0" + (month.indexOf(date[1]) + 1)
            : month.indexOf(date[1]) + 1;
        ssn.Scheme_End_Day_Global = date[0];
        ssn.Scheme_End_Year_Global = date[2];

        ssn.SubsidyArraySize = 0;

        const formatter = new Intl.NumberFormat("en-GB");
        Budget = measureapidata.data.budget;
        if (measureapidata.data.budget.includes(","))
          Budget = measureapidata.data.budget.split(",").join("");
        formatedCurrency = formatter.format(Budget);

        ssn.Subsidy_Measure_Title_Error = false;
        ssn.Subsidy_Measure_Title_255_Error = false;
        ssn.Granting_Authority_URL_255_Error = false;
        ssn.Granting_Authority_Policy_255_Error = false;
        ssn.Subsidy_Adhoc_Error = false;
        ssn.Granting_Authority_Name_Error = false;
        ssn.scheme_issued_start_day_Error = false;
        ssn.scheme_issued_start_month_Error = false;
        ssn.scheme_issued_start_year_Error = false;
        ssn.Legal_Basis_Error = false;
        ssn.Granting_Authority_URL_Error = false;
        ssn.Granting_Authority_Name_Inactive_Error = false;
        ssn.Granting_Authority_Policy_Error = false;
        ssn.Budget_Error = false;
        ssn.scheme_issued_end_day_Error = false;
        ssn.scheme_issued_end_day_lesser_Error = false;
        ssn.scheme_issued_end_month_Error = false;
        ssn.scheme_issued_end_year_Error = false;

        if (ssn.dashboard_roles !== "Granting Authority Encoder") {
          res.render("bulkupload/subsidymeasures-edit", { formatedCurrency });
        } else {
          res.render("bulkupload/notAuthorized");
        }
      } catch (err) {
        console.error(err);
        if (err.toString().includes("500"))
          res.render("bulkupload/notAvailable");
        else if (err.toString().includes("401"))
          res.render("bulkupload/notAuthorized");
      }
    } else {
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

      ssn.Scheme_Start_Month_Global =
        month.indexOf(ssn.GetMonthName) + 1 < "10"
          ? "0" + (month.indexOf(ssn.GetMonthName) + 1)
          : month.indexOf(ssn.GetMonthName) + 1;

      ssn.Scheme_End_Month_Global =
        month.indexOf(ssn.GetEndMonthName) + 1 < "10"
          ? "0" + (month.indexOf(ssn.GetEndMonthName) + 1)
          : month.indexOf(ssn.GetEndMonthName) + 1;

      const formatter = new Intl.NumberFormat("en-GB");

      if (formatedCurrency.includes(","))
        Budget = formatedCurrency.split(",").join("");
      formatedCurrency = formatter.format(Budget);
      if (ssn.dashboard_roles !== "Granting Authority Encoder") {
        res.render("bulkupload/subsidymeasures-edit", { formatedCurrency });
      } else {
        res.render("bulkupload/notAuthorized");
      }
    }
  }
});

module.exports = router;
