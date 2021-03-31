// ********************************************************************
// Gov.UK public user search page outing
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
    typeof ssn.dashboard_roles_object_id2 === "undefined" ||
    req.session.cookie.maxAge <= 0
  ) {
    res.redirect("/signout");
  } else {
    res.set("X-Frame-Options", "DENY");
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Content-Security-Policy", 'frame-ancestors "self"');
    res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

    console.log("req.query.page: " + req.query.page);
    sort_column_name = req.query.page;

    if (sort_column_name == "subsidy_award_number") {
      if (ssn.subsidy_award_number_sorting_order == "asc") {
        Award_sorting_field = "awardNumber-desc";
        ssn.subsidy_award_number_arrow = "downdecending";
        ssn.scheme_name_arrow = "upanddown";
        ssn.granting_authority_arrow = "upanddown";
        ssn.award_status_arrow = "upanddown";
        ssn.award_recipient_arrow = "upanddown";
        ssn.subsidy_award_number_sorting_order = "desc";
      } else {
        Award_sorting_field = "awardNumber-asc";
        ssn.subsidy_award_number_arrow = "upacending";
        ssn.scheme_name_arrow = "upanddown";
        ssn.granting_authority_arrow = "upanddown";
        ssn.award_status_arrow = "upanddown";
        ssn.award_recipient_arrow = "upanddown";
        ssn.subsidy_award_number_sorting_order = "asc";
      }
    } else if (sort_column_name == "scheme_name") {
      if (ssn.scheme_name_sorting_order == "asc") {
        Award_sorting_field = "subsidyMeasure.subsidyMeasureTitle-desc";
        ssn.subsidy_award_number_arrow = "upanddown";
        ssn.scheme_name_arrow = "downdecending";
        ssn.granting_authority_arrow = "upanddown";
        ssn.award_status_arrow = "upanddown";
        ssn.award_recipient_arrow = "upanddown";
        ssn.scheme_name_sorting_order = "desc";
      } else {
        Award_sorting_field = "subsidyMeasure.subsidyMeasureTitle-asc";
        ssn.subsidy_award_number_arrow = "upanddown";
        ssn.scheme_name_arrow = "upacending";
        ssn.granting_authority_arrow = "upanddown";
        ssn.award_status_arrow = "upanddown";
        ssn.award_recipient_arrow = "upanddown";
        ssn.scheme_name_sorting_order = "asc";
      }
    } else if (sort_column_name == "Granting_Authority") {
      if (ssn.granting_authority_sorting_order == "asc") {
        Award_sorting_field = "grantingAuthority.grantingAuthorityName-desc";
        ssn.subsidy_award_number_arrow = "upanddown";
        ssn.scheme_name_arrow = "upanddown";
        ssn.granting_authority_arrow = "downdecending";
        ssn.award_status_arrow = "upanddown";
        ssn.award_recipient_arrow = "upanddown";
        ssn.granting_authority_sorting_order = "desc";
      } else {
        Award_sorting_field = "grantingAuthority.grantingAuthorityName-asc";
        ssn.subsidy_award_number_arrow = "upanddown";
        ssn.scheme_name_arrow = "upanddown";
        ssn.granting_authority_arrow = "upacending";
        ssn.award_status_arrow = "upanddown";
        ssn.award_recipient_arrow = "upanddown";
        ssn.granting_authority_sorting_order = "asc";
      }
    } else if (sort_column_name == "award_status") {
      if (ssn.award_status_sorting_order == "asc") {
        Award_sorting_field = "status-desc";
        ssn.subsidy_award_number_arrow = "upanddown";
        ssn.scheme_name_arrow = "upanddown";
        ssn.granting_authority_arrow = "upanddown";
        ssn.award_status_arrow = "downdecending";
        ssn.award_recipient_arrow = "upanddown";
        ssn.award_status_sorting_order = "desc";
      } else {
        Award_sorting_field = "status-asc";
        ssn.subsidy_award_number_arrow = "upanddown";
        ssn.scheme_name_arrow = "upanddown";
        ssn.granting_authority_arrow = "upanddown";
        ssn.award_status_arrow = "upacending";
        ssn.award_recipient_arrow = "upanddown";
        ssn.award_status_sorting_order = "asc";
      }
    } else if (sort_column_name == "award_recipient") {
      if (ssn.award_recipient_sorting_order == "asc") {
        Award_sorting_field = "beneficiary.beneficiaryName-desc";
        ssn.subsidy_award_number_arrow = "upanddown";
        ssn.scheme_name_arrow = "upanddown";
        ssn.granting_authority_arrow = "upanddown";
        ssn.award_status_arrow = "upanddown";
        ssn.award_recipient_arrow = "downdecending";
        ssn.award_recipient_sorting_order = "desc";
      } else {
        Award_sorting_field = "beneficiary.beneficiaryName-asc";
        ssn.subsidy_award_number_arrow = "upanddown";
        ssn.scheme_name_arrow = "upanddown";
        ssn.granting_authority_arrow = "upanddown";
        ssn.award_status_arrow = "upanddown";
        ssn.award_recipient_arrow = "upacending";
        ssn.award_recipient_sorting_order = "asc";
      }
    }

    current_page = 1;
    current_page_active = current_page;
    previous_page = 1;
    next_page = 2;
    ssn.Award_page = 1;

    Award_text = "searchName=" + ssn.Award_search_text;
    Base_URL = beis_url_accessmanagement + "/accessmanagement/searchresults?";
    Award_status = "status=" + ssn.Award_selected_status;
    Award_concate = "&";
    Award_recordsperpage = "recordsPerPage=" + ssn.frontend_totalRecordsPerPage;
    Award_sorting = "sortBy=";

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

    console.log("Award_search_URL  : " + JSON.stringify(Award_search_URL));

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
      frontend_totalRecordsPerPage = ssn.frontend_totalRecordsPerPage;
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
        frontend_totalRecordsPerPage,
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
      } else if (err.toString().includes("401"))
        res.render("bulkupload/notAuthorized");
      else if (err.toString().includes("500"))
        res.render("bulkupload/notAvailable");

      console.log("message error : " + err);
      // res.render("publicusersearch/noresults");
    }
  }
  // end of POST call
});

module.exports = router;
