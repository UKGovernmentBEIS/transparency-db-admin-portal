// ********************************************************************
// Gov.UK public user search results routing module
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

  Environment_variable = process.argv[2];
  if (Environment_variable == "env=dev") {
    beis_url_publishing =
      "https://dev-beis-tp-db-publishing-subsidies-service.azurewebsites.net";
    beis_url_accessmanagement =
      "https://dev-beis-tp-db-accessmanagement-service-app.azurewebsites.net";
    beis_url_publicsearch =
      "https://dev-beis-tp-db-public-search-service.azurewebsites.net";
    beis_url_searchscheme =
      "https://dev-beis-tp-db-ga-schemes-service.azurewebsites.net";

    console.log(beis_url_publishing);
    console.log(beis_url_accessmanagement);
    console.log(beis_url_publicsearch);
    console.log(beis_url_searchscheme);
  } else if (Environment_variable == "env=integ") {
    beis_url_publishing =
      "https://integ-transparency-db-publishing-subsidies-service.azurewebsites.net";
    beis_url_accessmanagement =
      "https://integ-transparency-db-access-management-service.azurewebsites.net";
    beis_url_publicsearch =
      "https://integ-transparency-db-public-search-service.azurewebsites.net";

    beis_url_searchscheme =
      "https://integ-transparency-db-ga-schemes-service.azurewebsites.net";

    console.log(beis_url_publishing);
    console.log(beis_url_accessmanagement);
    console.log(beis_url_publicsearch);
  } else if (Environment_variable == "env=stag") {
    beis_url_publishing =
      "https://stag-transparency-db-publishing-subsidies-service.azurewebsites.net";
    beis_url_accessmanagement =
      "https://stag-transparency-db-access-management-service.azurewebsites.net";
    beis_url_publicsearch =
      "https://stag-transparency-db-public-search-service.azurewebsites.net";

    beis_url_searchscheme =
      "https://stag-transparency-db-ga-schemes-service.azurewebsites.net";

    console.log(beis_url_publishing);
    console.log(beis_url_accessmanagement);
    console.log(beis_url_publicsearch);
  } else if (Environment_variable == "env=prod") {
    beis_url_publishing =
      "https://prod-transparency-db-publishing-subsidies-service.azurewebsites.net";
    beis_url_accessmanagement =
      "https://prod-transparency-db-access-management-service.azurewebsites.net";
    beis_url_publicsearch =
      "https://prod-transparency-db-public-search-service.azurewebsites.net";
    console.log(beis_url_publishing);
    console.log(beis_url_accessmanagement);
    console.log(beis_url_publicsearch);
  }

  frontend_totalRecordsPerPage = 10;
  subsidy_scheme_name_arrow = "upascending";
  subsidy_control_no_arrow = "upanddown";
  granting_authority_arrow = "upanddown";
  start_date_arrow = "upanddown";
  end_date_arrow = "upanddown";
  duration_arrow = "upanddown";
  budget_arrow = "upanddown";
  subsidy_scheme_name_sorting_order = "asc";
  subsidy_control_no_sorting_order = "desc";
  granting_authority_sorting_order = "desc";
  start_date_sorting_order = "desc";
  end_date_sorting_order = "desc";
  duration_sorting_order = "desc";
  budget_sorting_order = "desc";
  schemes_status = "Filter results by status";
  sorting_column = "[" + '"' + "subsidyMeasureTitle,asc" + '"' + "]";
  sorting_order_interium = sorting_column.replace(/^"(.*)"$/, "$1");
  sorting_order_pass = JSON.parse(sorting_order_interium);

  Search_Text_Global = "";
  req.query = JSON.parse(JSON.stringify(req.query));
  if (req.query.hasOwnProperty("sort")) schemes_status = req.query.sort;
  else schemes_status = "";
  const data_request = {
    searchName: Search_Text_Global,
    pageNumber: 1,
    totalRecordsPerPage: frontend_totalRecordsPerPage,
    sortBy: sorting_order_pass,
    status: schemes_status,
  };

  console.log("request :" + JSON.stringify(data_request));

  try {
    const apidata = await axios.post(
      beis_url_searchscheme + "/scheme/search",
      data_request,
      UserPrincileObjectGlobal
    );
    console.log(`Status: ${apidata.status}`);

    API_response_code = `${apidata.status}`;
    console.log("API_response_code: try" + API_response_code);
    console.log("Body: ", apidata.data);
    searchschemes = apidata.data;

    allScheme = searchschemes.allScheme;
    activeScheme = searchschemes.activeScheme;
    inactiveScheme = searchschemes.inactiveScheme;

    var searchschemes_api = apidata.data;
    console.log("searchschemes" + searchschemes_api);

    totalrows = searchschemes.totalSearchResults;

    pageCount = Math.ceil(totalrows / frontend_totalRecordsPerPage);
    console.log("totalrows :" + totalrows);
    console.log("pageCount :" + pageCount);
    curren_page = 1;
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
      allScheme,
      activeScheme,
      inactiveScheme,
      searchschemes,
    });
  } catch (err) {
    response_error_message = err;
    console.log("message error : " + err);
    console.log("response_error_message catch : " + response_error_message);
  }
});

module.exports = router;
