// ********************************************************************
// Gov.UK transparency subsidy awards routing module
// ********************************************************************

const express = require("express");
var session = require("express-session");
const router = express.Router();

const axios = require("axios");
var request = require("request");

router.get("/", async (req, res) => {
  ssn = req.session;
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  console.log("req.query.page: " + req.query.sort);
  ssn.awards_status = req.query.sort;

  ssn.Award_page = 1;
  ssn.Award_selected_status = ssn.awards_status;

  if (ssn.Award_selected_status == "Show all") {
    ssn.Award_selected_status = "";
  }

  Base_URL = beis_url_accessmanagement + "/accessmanagement/searchresults?";
  Award_text = "searchName=" + ssn.Award_search_text;
  Award_status = "status=" + ssn.Award_selected_status;
  Award_concate = "&";
  Award_page = "page=" + ssn.Award_page;
  Award_recordsperpage = "recordsPerPage=" + ssn.frontend_totalRecordsPerPage;

  Actual_URL =
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
  console.log("Actual_URL  : " + Actual_URL);

  try {
    const apidata = await axios.get(Actual_URL, ssn.UserPrincileObjectGlobal);
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
      end_record,
      nodata,
      noawards,
      noresult,
      totalrows,
      current_page_active,
      ssn,
    });
  } catch (err) {
    if (err.toString().includes("404")) {
      noresult = true;
      noawards = false;
      nodata = "No data available for filtered criteria";
      res.render("bulkupload/mysubsidyawards", {
        noresult,
        nodata,
        noawards,
      });
    } else if (err.toString().includes("401")) {
      res.render("bulkupload/notAuthorized");
    } else if (err.toString().includes("500")) {
      res.render("bulkupload/notAvailable");
    }
    console.log("message error : " + err);
  }

  // end of POST call
});

module.exports = router;
