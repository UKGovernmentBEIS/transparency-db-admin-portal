// ********************************************************************
// Gov.UK transparency subsidy awards routing module
// ********************************************************************

const express = require("express");
const router = express.Router();
const axios = require("axios");
var request = require("request");

router.get("/", async (req, res) => {
  console.log("req.query.page: " + req.query.sort);
  schemes_status = req.query.sort;

  current_page = 1;
  scheme_selected_status = schemes_status;

  if (scheme_selected_status == "Show all") {
    scheme_selected_status = "";
  }

  const data_request = {
    searchName: Search_Text_Global,
    pageNumber: current_page,
    totalRecordsPerPage: frontend_totalRecordsPerPage,
    sortBy: sorting_order_pass,
    status: scheme_selected_status,
  };

  console.log("data requ", data_request);
  try {
    const apidata = await axios.post(
      beis_url_searchscheme + "/scheme/search",
      data_request
    );
    console.log(`Status: ${apidata.status}`);
    API_response_code = `${apidata.status}`;
    console.log("API_response_code: try" + API_response_code);
    console.log("Body: ", apidata.data);
    searchschemes = apidata.data;
    var searchschemes_api = apidata.data;
    console.log("searchschemes" + searchschemes_api);
    totalrows = searchschemes.totalSearchResults;

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
    res.render("bulkupload/mysubsidymeasures", {
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
    console.log("response_error_message catch : " + response_error_message);
  }

  // end of POST call
});

module.exports = router;
