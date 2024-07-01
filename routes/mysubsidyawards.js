// ********************************************************************
// Gov.UK transparency subsidy awards list module
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
    ssn.Award_page = 1;

    ssn.subsidy_award_number_arrow = "downdecending";
    ssn.scheme_name_arrow = "upanddown";
    ssn.granting_authority_arrow = "upanddown";
    ssn.award_status_arrow = "upanddown";
    ssn.award_recipient_arrow = "upanddown";
    ssn.subsidy_award_number_sorting_order = "desc";
    ssn.scheme_name_sorting_order = "asc";
    ssn.granting_authority_sorting_order = "desc";
    ssn.award_status_sorting_order = "desc";
    ssn.award_recipient_sorting_order = "desc";

    // awards_status = "Filter results by status";
    ssn.awards_status = "";
    req.query = JSON.parse(JSON.stringify(req.query));

    if (req.query.hasOwnProperty("sort")) {
      ssn.awards_status = req.query.sort;
      ssn.Award_selected_status = req.query.sort;
    } else {
      ssn.awards_status = "";
      ssn.Award_selected_status = "";
    }
    ssn.Award_search_text = "";
    Base_URL = beis_url_accessmanagement + "/accessmanagement/searchresults?";
    Award_status = "status=" + ssn.awards_status;
    Award_concate = "&";
    Award_page = "page=" + ssn.Award_page;
    Award_recordsperpage = "recordsPerPage=" + ssn.frontend_totalRecordsPerPage;
    Award_sorting = "sortBy=";
    Award_sorting_field = "awardNumber-desc";

    Award_search_URL =
      Base_URL +
      Award_status +
      Award_concate +
      Award_page +
      Award_concate +
      Award_recordsperpage +
      Award_concate +
      Award_sorting +
      Award_sorting_field;

    try {
      const apidata = await axios.get(
        Award_search_URL,
        ssn.UserPrincileObjectGlobal,
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

      totalAwaitingAward =
        searchawards_api.awardStatusCounts.totalAwaitingAward;
      totalRejectedAward =
        searchawards_api.awardStatusCounts.totalRejectedAward;
      totalSubsidyAward = searchawards_api.awardStatusCounts.totalSubsidyAward;
      totalPublishedAward =
        searchawards_api.awardStatusCounts.totalPublishedAward;
      totalInactiveAward = searchawards_api.awardStatusCounts.totalDeleteAward;

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
      noawards = false;
      noresult = false;
      res.render("bulkupload/mysubsidyawards", {
        pageCount,
        previous_page,
        next_page,
        start_record,
        noresult,
        nodata,
        noawards,
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
      if (err.toString().includes("404")) {
        noresult = true;
        noawards = true;
        nodata = "No subsidy awards available";
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
      // res.render("publicusersearch/noresults");
    }
  }
  // end of POST call
});

module.exports = router;
