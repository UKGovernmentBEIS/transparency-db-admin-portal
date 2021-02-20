// ********************************************************************
// Gov.UK transparency subsidy awards routing module
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

  console.log("req.query.page: " + req.query.sort);
  awards_status = req.query.sort;

  Award_page = 1;
  Award_selected_status = awards_status;

  if (Award_selected_status == "Show all") {
    Award_selected_status = "";
  }

  Base_URL = beis_url_accessmanagement + "/accessmanagement/searchresults?";
  Award_text = "searchName=" + Award_search_text;
  Award_status = "status=" + Award_selected_status;
  Award_concate = "&";
  Award_page = "page=" + Award_page;
  Award_recordsperpage = "recordsPerPage=" + frontend_totalRecordsPerPage;

  Actual_URL =
    Base_URL +
    Award_text +
    Award_concate +
    Award_status +
    Award_concate +
    Award_page +
    Award_concate +
    Award_recordsperpage;
  console.log("Actual_URL  : " + Actual_URL);

  try {
    const apidata = await axios.get(Actual_URL);
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

    pageCount = Math.ceil(totalrows / frontend_totalRecordsPerPage);
    console.log("totalrows :" + totalrows);
    console.log("pageCount :" + pageCount);
    current_page = 1;
    previous_page = 1;
    next_page = 2;
    start_record = 1;
    end_record = frontend_totalRecordsPerPage;
    current_page_active = 1;

    start_page = 1;
    if (pageCount < 10) {
      end_page = pageCount;
    } else {
      end_page = 9;
    }
    nodata = "";
    noresult = false;
    res.render("bulkupload/mysubsidyawards", {
      pageCount,
      previous_page,
      next_page,
      start_record,
      end_record,
      nodata,
      noresult,
      totalrows,
      current_page_active,
      frontend_totalRecordsPerPage,
    });
  } catch (err) {
    if (err == "Error: Request failed with status code 404") {
      noresult = true;
      nodata = "No data available for filtered criteria";
      res.render("bulkupload/mysubsidyawards", {
        noresult,
        nodata,
      });
    }
    response_error_message = err;
    console.log("message error : " + err);
  }

  // end of POST call
});

module.exports = router;
