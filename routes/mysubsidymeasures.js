// ********************************************************************
// Gov.UK transparency subsidy scheme list module
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
    res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

    ssn.frontend_totalRecordsPerPage = 10;
    subsidy_scheme_name_arrow = "upanddown";
    subsidy_control_no_arrow = "downdecending";
    granting_authority_arrow = "upanddown";
    start_date_arrow = "upanddown";
    end_date_arrow = "upanddown";
    duration_arrow = "upanddown";
    budget_arrow = "upanddown";
    subsidy_scheme_name_sorting_order = "asc";
    ssn.subsidy_control_no_sorting_order = "desc";
    ssn.granting_authority_sorting_order = "desc";
    ssn.start_date_sorting_order = "desc";
    ssn.end_date_sorting_order = "desc";
    ssn.duration_sorting_order = "desc";
    ssn.budget_sorting_order = "desc";
    schemes_status = "";
    sorting_column = "[" + '"' + "scNumber,desc" + '"' + "]";
    sorting_order_interium = sorting_column.replace(/^"(.*)"$/, "$1");
    ssn.sorting_order_pass = JSON.parse(sorting_order_interium);

    ssn.Search_Text_Global = "";
    req.query = JSON.parse(JSON.stringify(req.query));
    if (req.query.hasOwnProperty("sort")) schemes_status = req.query.sort;
    else schemes_status = "";
    const data_request = {
      searchName: ssn.Search_Text_Global,
      pageNumber: 1,
      totalRecordsPerPage: ssn.frontend_totalRecordsPerPage,
      sortBy: ssn.sorting_order_pass,
      status: schemes_status,
    };

    console.log("request :" + JSON.stringify(data_request));

    try {
      const apidata = await axios.post(
        beis_url_searchscheme + "/scheme/search",
        data_request,
        ssn.UserPrincileObjectGlobal
      );
      console.log(`Status: ${apidata.status}`);

      API_response_code = `${apidata.status}`;
      console.log("API_response_code: try" + API_response_code);
      console.log("Body: ", apidata.data);
      searchschemes = apidata.data;

      ssn.allScheme = searchschemes.allScheme;
      ssn.activeScheme = searchschemes.activeScheme;
      ssn.inactiveScheme = searchschemes.inactiveScheme;
      ssn.deletedScheme = searchschemes.deletedScheme;

      var searchschemes_api = apidata.data;
      console.log("searchschemes" + searchschemes_api);

      totalrows = searchschemes.totalSearchResults;

      pageCount = Math.ceil(totalrows / ssn.frontend_totalRecordsPerPage);
      console.log("totalrows :" + totalrows);
      console.log("pageCount :" + pageCount);
      curren_page = 1;
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
      noscheme = false;
      res.render("bulkupload/mysubsidymeasures", {
        pageCount,
        previous_page,
        next_page,
        start_record,
        end_record,
        noresult,
        noscheme,
        totalrows,
        current_page_active,
        // allScheme,
        nodata,
        ssn,
        // activeScheme,
        // inactiveScheme,
        searchschemes,
      });
    } catch (err) {
      if (err.toString().includes("404")) {
        noresult = true;
        noscheme = true;
        nodata = "No subsidy scheme available";
        res.render("bulkupload/mysubsidymeasures", {
          noresult,
          nodata,
          noscheme,
        });
      } else if (err.toString().includes("500"))
        res.render("bulkupload/notAvailable");
      else if (err.toString().includes("401"))
        res.render("bulkupload/notAuthorized");
      console.log("message error : " + err);
    }
  }
});

module.exports = router;
