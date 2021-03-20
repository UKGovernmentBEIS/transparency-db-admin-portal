// ********************************************************************
// Gov.UK transparency subsidy awards routing module
// ********************************************************************

const express = require("express");
var session = require("express-session");
const router = express.Router();

const axios = require("axios");
var request = require("request");

router.post("/", async (req, res) => {
  ssn = req.session;
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  var { search_award_text } = req.body;
  ssn.frontend_totalRecordsPerPage = 10;
  ssn.awards_status = "";

  ssn.Award_search_text = search_award_text;

  Award_page = 1;
  Award_selected_status = ssn.awards_status;

  Base_URL = beis_url_accessmanagement + "/accessmanagement/searchresults?";
  Award_text = "searchName=" + ssn.Award_search_text;
  Award_status = "status=" + Award_selected_status;
  Award_concate = "&";
  Award_page = "page=" + Award_page;
  Award_recordsperpage = "recordsPerPage=" + ssn.frontend_totalRecordsPerPage;

  Award_search_URL =
    Base_URL +
    Award_text +
    Award_concate +
    Award_status +
    Award_concate +
    Award_page +
    Award_concate +
    Award_recordsperpage +
    Award_concate +
    Award_sorting +
    Award_sorting_field;
  console.log("Award_search_URL   : " + Award_search_URL);

  console.log("ssn.UserPrincileObjectGlobal", ssn);
  try {
    const apidata = await axios.get(
      Award_search_URL,
      ssn.UserPrincileObjectGlobal
    );
    console.log(`Status: ${apidata.status}`);
    API_response_code = `${apidata.status}`;
    console.log("API_response_code: try" + API_response_code);
    console.log("Body: ", apidata.data);
    searchawards = apidata.data;
    var searchawards_api = apidata.data;
    console.log("searchawards" + searchawards_api);
    const seachawardstring = JSON.stringify(searchawards_api);
    const seachawardJSON = JSON.parse(seachawardstring);
    totalrows = searchawards.totalSearchResults;

    totalAwaitingAward = searchawards_api.awardStatusCounts.totalAwaitingAward;
    totalRejectedAward = searchawards_api.awardStatusCounts.totalRejectedAward;
    totalSubsidyAward = searchawards_api.awardStatusCounts.totalSubsidyAward;
    totalPublishedAward =
      searchawards_api.awardStatusCounts.totalPublishedAward;
    totalInactiveAward = searchawards_api.awardStatusCounts.totalDeleteAward;

    pageCount = Math.ceil(totalrows / ssn.frontend_totalRecordsPerPage);
    console.log("awards_status :" + ssn.awards_status);
    console.log("pageCount :" + pageCount);
    current_page = 1;
    previous_page = 1;
    next_page = 2;
    start_record = 1;
    end_record = ssn.frontend_totalRecordsPerPage;
    current_page_active = 1;

    start_page = 1;
    if (pageCount < 10) {
      end_page = pageCount;
    } else {
      end_page = 9;
    }
    nodata = "";
    noresult = false;
    noawards = false;
    res.render("bulkupload/mysubsidyawards", {
      pageCount,
      previous_page,
      next_page,
      start_record,
      nodata,
      noawards,
      noresult,
      end_record,
      totalrows,
      current_page_active,
      ssn,

      totalAwaitingAward,
      totalRejectedAward,
      totalSubsidyAward,
      totalPublishedAward,
      totalInactiveAward,
    });
  } catch (err) {
    if (err == "Error: Request failed with status code 404") {
      noresult = true;
      noawards = false;
      nodata = "No data available for searched criteria";
      res.render("bulkupload/mysubsidyawards", {
        noresult,
        nodata,
        noawards,
      });
    } else if (err.toString().includes("500"))
      res.render("bulkupload/notAvailable");
    else if (err.toString().includes("401"))
      res.render("bulkupload/notAuthorized");

    console.log("message error : " + err);
  }

  // end of POST call
});

module.exports = router;
