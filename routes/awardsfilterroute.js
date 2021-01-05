// ********************************************************************
// Gov.UK transparency subsidy awards routing module
// ********************************************************************

const express = require("express");
const router = express.Router();
const axios = require("axios");
var request = require("request");

router.get("/", async (req, res) => {

  console.log("req.query.page: " + req.query.sort);
  awards_status = req.query.sort;

  Award_page = 1;
  Award_selected_status = awards_status;

  Base_URL = 'http://access-management-service.azurewebsites.net/accessmanagement/searchresults?';
  Award_status = 'status=' + Award_selected_status;
  Award_concate = '&';
  Award_page = 'page=' + Award_page
  Award_recordsperpage = 'recordsPerPage=' + frontend_totalRecordsPerPage

  Actual_URL = Base_URL  + Award_status + Award_concate + Award_page + Award_concate + Award_recordsperpage ;
  console.log("Actual_URL  : " + Actual_URL) ;

  try {
    const apidata = await axios.get(Actual_URL );
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
    res.render("bulkupload/mysubsidyawards", {
      pageCount,
      previous_page,
      next_page,
      start_record,
      end_record,
      totalrows,
      current_page_active,
      frontend_totalRecordsPerPage,
    });
  } catch (err) {
    

    response_error_message = err;
    console.log("message error : " + err);
    console.log("response_error_message catch : " + response_error_message );
   
  }

  // end of POST call
});

module.exports = router;
