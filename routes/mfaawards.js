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


    req.query = JSON.parse(JSON.stringify(req.query));
    if (req.query.hasOwnProperty("mfaAwardSearchName")){
      ssn.MFA_Award_Search_Name_Global = req.query.mfaAwardSearchName;
    } else {
      ssn.MFA_Award_Search_Name_Global = "";
    }

    if (req.query.hasOwnProperty("resultsPerPage")) {
      ssn.frontend_totalRecordsPerPage = req.query.resultsPerPage;
    } else if (ssn.frontend_totalRecordsPerPage == null || ssn.frontend_totalRecordsPerPage == "") {
      ssn.frontend_totalRecordsPerPage = 10;
    }

    if (req.query.hasOwnProperty("status")) {
      mfaAwardStatus = req.query.status;
    } else {
      mfaAwardStatus = "";
    }

    if (req.query.hasOwnProperty("page")) {
      current_page = parseInt(req.query.page);
    } else {
      current_page = 1;
    }

    if (current_page == 1) {
      previous_page = 1;
      next_page = 2;
    } else if (current_page == pageCount) {
      previous_page = pageCount - 1;
      next_page = pageCount;
    } else {
      previous_page = current_page - 1;
      next_page = current_page + 1;
    }

    sorting_column = "[" + '"' + "lastModifiedTimestamp,desc" + '"' + "]";
    sorting_order_interium = sorting_column.replace(/^"(.*)"$/, "$1");
    ssn.sorting_order_pass = JSON.parse(sorting_order_interium);
    
    const data_request = {
      searchName: ssn.MFA_Award_Search_Name_Global,
      pageNumber: current_page,
      totalRecordsPerPage: ssn.frontend_totalRecordsPerPage,
      sortBy: ssn.sorting_order_pass,
      status: mfaAwardStatus,
    };

    console.log("request :" + JSON.stringify(data_request));

    try {
      const apidata = await axios.post(
        beis_url_publishing + "/mfa/award/search",
        data_request,
        ssn.UserPrincileObjectGlobal
      );
      console.log(`Status: ${apidata.status}`);

      API_response_code = `${apidata.status}`;
      console.log("API_response_code: try" + API_response_code);
      console.log("Body: ", apidata.data);
      searchResults = apidata.data;

      ssn.allMfaAwards = searchResults.allMfaAwards;
      ssn.activeMfaAwards = searchResults.activeMfaAwards;
      ssn.deletedMfaAwards = searchResults.deletedMfaAwards;

      totalrows = searchResults.totalSearchResults;

      pageCount = Math.ceil(totalrows / ssn.frontend_totalRecordsPerPage);
      current_page_active = searchResults.currentPage;
      
      if (current_page == 1) {
        start_record = 1;
        end_record = ssn.frontend_totalRecordsPerPage;
      } else if (current_page == pageCount) {
        start_record =
          (current_page - 1) * ssn.frontend_totalRecordsPerPage + 1;
        end_record = totalrows;
      } else {
        start_record =
          current_page * ssn.frontend_totalRecordsPerPage -
          ssn.frontend_totalRecordsPerPage +
          1;
        end_record = current_page * ssn.frontend_totalRecordsPerPage;
      }      

      start_page = 1;
      if (pageCount < 10) {
        end_page = pageCount;
      } else {
        end_page = 9;
      }
      nodata = "";
      noresult = false;
      res.render("mfa/mfaawards", {
        pageCount,
        previous_page,
        next_page,
        start_record,
        end_record,
        noresult,
        totalrows,
        current_page_active,
        nodata,
        ssn,
        searchResults,
      });
    } catch (err) {
      if (err.toString().includes("404")) {
        noresult = true;
        nodata = "No MFA awards available";
        res.render("mfa/mfaawards", {
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
});

module.exports = router;
