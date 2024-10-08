// ********************************************************************
// Gov.UK transparency subsidy scheme edit review details module
// ********************************************************************

const express = require("express");
var session = require("express-session");
const router = express.Router();

const axios = require("axios");
var request = require("request");
var utils = require("../utils");

router.get("/", async (req, res) => {
  ssn = req.session;
  if (
    typeof ssn.dashboard_roles_object_id1 === "undefined" ||
    typeof ssn.dashboard_roles_object_id2 === "undefined"
  ) {
    res.redirect("/signout");
  } else {
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

    console.log("req.query.scheme: " + req.query.scheme);
    scnumber = req.query.scheme;
    console.log("scnumber : " + scnumber);

    scNumber_Global = scnumber;
    var currentURI = req.protocol + '://' + req.get('host') + req.originalUrl;
    var measureendpoint = beis_url_searchscheme + "/scheme/" + scnumber + "/withawards";
    currentPage = 1;
    if(req.query.hasOwnProperty("page"))
    {
      var pageParse = parseInt(req.query.page);
      if(!isNaN(pageParse))
      {
        if(typeof totalPages === "undefined")
          totalPages = 1;
        currentPage = Math.max(1,Math.min(pageParse, totalPages));
      }
    }
    prevPage = Math.max(1,currentPage-1);
    perPage = ssn.frontend_totalRecordsPerPage;
    if (req.query.hasOwnProperty("perPage"))
    {
      var perPageParse = parseInt(req.query.perPage);
      if(!isNaN(perPageParse))
      {
        perPage = perPageParse;
      }
    }
    ssn.frontend_totalRecordsPerPage = perPage;
    try {
      const data = {
        scNumber: scnumber,
        pageNumber: currentPage,
        status: "",
        totalRecordsPerPage: ssn.frontend_totalRecordsPerPage,
        sortBy: ["awardNumber,desc"],
      };
      await axios.post(
        measureendpoint,
        data,
        ssn.UserPrincileObjectGlobal
      ).then((response) => {
        ssn.searchmeasuredetails = response.data;
        Scheme_Confirmation_Date = ssn.searchmeasuredetails.confirmationDate;
        Scheme_Start_Date = ssn.searchmeasuredetails.startDate;
        Scheme_End_Date = ssn.searchmeasuredetails.endDate;
        Specific_Policy_Objective = ssn.searchmeasuredetails.Specific_Policy_Objective;
        Subsidy_Scheme_Description = ssn.searchmeasuredetails.Subsidy_Scheme_Description;
        

        Maximum_Amount_Under_Scheme = ssn.searchmeasuredetails.maximumAmountUnderScheme
        Subsidy_Scheme_Interest = ssn.searchmeasuredetails.Subsidy_Scheme_Interest;
        console.log(`Status: ${response.status}`);
        console.log("Body: ", response.data);
        
        totalSearchResults = response.data.awardSearchResults.totalSearchResults;
        totalPages = response.data.awardSearchResults.totalPages;
        hasAwards = totalSearchResults > 0;
        console.log(hasAwards);
        console.log(totalSearchResults)
        startRecord = ((currentPage-1) * ssn.frontend_totalRecordsPerPage)+1;
        endRecord = Math.min((currentPage * ssn.frontend_totalRecordsPerPage), totalSearchResults);

        searchawards = response.data.awardSearchResults.responseList;
        nextPage = Math.min(totalPages, currentPage + 1);
        pagingStart = Math.max(1, currentPage - 5);
        pagingEnd = Math.min(totalPages, currentPage + 5);

        schemeVersions = response.data.schemeVersions;

        var spendingSectorArray = new Array();
        if(ssn.searchmeasuredetails.spendingSectors != null){
          spendingSectorArray = JSON.parse(ssn.searchmeasuredetails.spendingSectors);
        }

        var purposeArray = new Array();
        if(ssn.searchmeasuredetails.purpose != null){
          purposeArray = JSON.parse(ssn.searchmeasuredetails.purpose);
        }

        var date = Scheme_Start_Date.split(" ");
        console.log("Scheme_Start_Date", Scheme_Start_Date);

        res.render("bulkupload/subsidymeasure-editreview", {
          spendingSectorArray,
          purposeArray,
          currentURI: req.protocol + '://' + req.get('host') + req.originalUrl
        });
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
