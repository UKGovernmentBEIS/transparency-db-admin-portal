// ********************************************************************
// Gov.UK transparency Subsidy scheme filter route module
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

    console.log("req.query.page: " + req.query.sort);
    schemes_status = req.query.sort;

    current_page = 1;
    ssn.scheme_selected_status = schemes_status;

    if (ssn.scheme_selected_status == "Show all") {
      ssn.scheme_selected_status = "";
    }

    const data_request = {
      searchName: ssn.Search_Text_Global,
      pageNumber: current_page,
      totalRecordsPerPage: ssn.frontend_totalRecordsPerPage,
      sortBy: ssn.sorting_order_pass,
      status: ssn.scheme_selected_status,
    };

    console.log("data requ", data_request);
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
      var searchschemes_api = apidata.data;
      console.log("searchschemes" + searchschemes_api);
      totalrows = searchschemes.totalSearchResults;

      pageCount = Math.ceil(totalrows / ssn.frontend_totalRecordsPerPage);
      console.log("totalrows :" + totalrows);
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
      res.render("bulkupload/mysubsidymeasures", {
        pageCount,
        previous_page,
        next_page,
        start_record,
        nodata,
        noresult,
        end_record,
        totalrows,
        current_page_active,
        ssn,
        searchschemes,
      });
    } catch (err) {
      if (err.toString().includes("404")) {
        noresult = true;
        nodata = "No data available for filtered criteria";
        res.render("bulkupload/mysubsidymeasures", {
          noresult,
          nodata,
        });
      } else if (err.toString().includes("500"))
        res.render("bulkupload/notAvailable");
      else if (err.toString().includes("401"))
        res.render("bulkupload/notAuthorized");
      console.log("message error : " + err);
    }
  }
  // end of POST call
});

module.exports = router;
