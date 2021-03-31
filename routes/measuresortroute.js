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

    if (sort_column_name == "Scheme_Name") {
      if (subsidy_scheme_name_sorting_order == "asc") {
        sorting_column = "[" + '"' + "subsidyMeasureTitle,desc" + '"' + "]";
        subsidy_scheme_name_arrow = "downdecending";
        subsidy_control_no_arrow = "upanddown";
        granting_authority_arrow = "upanddown";
        start_date_arrow = "upanddown";
        end_date_arrow = "upanddown";
        duration_arrow = "upanddown";
        budget_arrow = "upanddown";
        subsidy_scheme_name_sorting_order = "desc";
      } else {
        sorting_column = "[" + '"' + "subsidyMeasureTitle,asc" + '"' + "]";
        subsidy_scheme_name_arrow = "upacending";
        subsidy_control_no_arrow = "upanddown";
        granting_authority_arrow = "upanddown";
        start_date_arrow = "upanddown";
        end_date_arrow = "upanddown";
        duration_arrow = "upanddown";
        budget_arrow = "upanddown";
        subsidy_scheme_name_sorting_order = "asc";
      }
    } else if (sort_column_name == "Control_Number") {
      if (ssn.subsidy_control_no_sorting_order == "asc") {
        sorting_column = "[" + '"' + "scNumber,desc" + '"' + "]";
        subsidy_scheme_name_arrow = "upanddown";
        subsidy_control_no_arrow = "downdecending";
        granting_authority_arrow = "upanddown";
        start_date_arrow = "upanddown";
        end_date_arrow = "upanddown";
        duration_arrow = "upanddown";
        budget_arrow = "upanddown";
        ssn.subsidy_control_no_sorting_order = "desc";
      } else {
        sorting_column = "[" + '"' + "scNumber,asc" + '"' + "]";
        subsidy_scheme_name_arrow = "upanddown";
        subsidy_control_no_arrow = "upacending";
        granting_authority_arrow = "upanddown";
        start_date_arrow = "upanddown";
        end_date_arrow = "upanddown";
        duration_arrow = "upanddown";
        budget_arrow = "upanddown";
        ssn.subsidy_control_no_sorting_order = "asc";
      }
    } else if (sort_column_name == "Granting_Authority") {
      if (ssn.granting_authority_sorting_order == "asc") {
        sorting_column =
          "[" +
          '"' +
          "grantingAuthority.grantingAuthorityName,desc" +
          '"' +
          "]";
        subsidy_scheme_name_arrow = "upanddown";
        subsidy_control_no_arrow = "upanddown";
        granting_authority_arrow = "downdecending";
        start_date_arrow = "upanddown";
        end_date_arrow = "upanddown";
        duration_arrow = "upanddown";
        budget_arrow = "upanddown";
        ssn.granting_authority_sorting_order = "desc";
      } else {
        sorting_column =
          "[" + '"' + "grantingAuthority.grantingAuthorityName,asc" + '"' + "]";
        subsidy_scheme_name_arrow = "upanddown";
        subsidy_control_no_arrow = "upanddown";
        granting_authority_arrow = "upacending";
        start_date_arrow = "upanddown";
        end_date_arrow = "upanddown";
        duration_arrow = "upanddown";
        budget_arrow = "upanddown";
        ssn.granting_authority_sorting_order = "asc";
      }
    } else if (sort_column_name == "Start_Date") {
      if (ssn.start_date_sorting_order == "asc") {
        sorting_column = "[" + '"' + "startDate,desc" + '"' + "]";
        subsidy_scheme_name_arrow = "upanddown";
        subsidy_control_no_arrow = "upanddown";
        granting_authority_arrow = "upanddown";
        start_date_arrow = "downdecending";
        end_date_arrow = "upanddown";
        duration_arrow = "upanddown";
        budget_arrow = "upanddown";
        ssn.start_date_sorting_order = "desc";
      } else {
        sorting_column = "[" + '"' + "startDate,asc" + '"' + "]";
        subsidy_scheme_name_arrow = "upanddown";
        subsidy_control_no_arrow = "upanddown";
        granting_authority_arrow = "upanddown";
        start_date_arrow = "upacending";
        end_date_arrow = "upanddown";
        duration_arrow = "upanddown";
        budget_arrow = "upanddown";
        ssn.start_date_sorting_order = "asc";
      }
    } else if (sort_column_name == "End_Date") {
      if (ssn.end_date_sorting_order == "asc") {
        sorting_column = "[" + '"' + "endDate,desc" + '"' + "]";
        subsidy_scheme_name_arrow = "upanddown";
        subsidy_control_no_arrow = "upanddown";
        granting_authority_arrow = "upanddown";
        start_date_arrow = "upanddown";
        end_date_arrow = "downdecending";
        duration_arrow = "upanddown";
        budget_arrow = "upanddown";
        ssn.end_date_sorting_order = "desc";
      } else {
        sorting_column = "[" + '"' + "endDate,asc" + '"' + "]";
        subsidy_scheme_name_arrow = "upanddown";
        subsidy_control_no_arrow = "upanddown";
        granting_authority_arrow = "upanddown";
        start_date_arrow = "upanddown";
        end_date_arrow = "upacending";
        duration_arrow = "upanddown";
        budget_arrow = "upanddown";
        ssn.end_date_sorting_order = "asc";
      }
    } else if (sort_column_name == "Duration") {
      if (ssn.duration_sorting_order == "asc") {
        sorting_column = "[" + '"' + "duration,desc" + '"' + "]";
        subsidy_scheme_name_arrow = "upanddown";
        subsidy_control_no_arrow = "upanddown";
        granting_authority_arrow = "upanddown";
        start_date_arrow = "upanddown";
        end_date_arrow = "upanddown";
        duration_arrow = "downdecending";
        budget_arrow = "upanddown";
        ssn.duration_sorting_order = "desc";
      } else {
        sorting_column = "[" + '"' + "duration,asc" + '"' + "]";
        subsidy_scheme_name_arrow = "upanddown";
        subsidy_control_no_arrow = "upanddown";
        granting_authority_arrow = "upanddown";
        start_date_arrow = "upanddown";
        end_date_arrow = "upanddown";
        duration_arrow = "upacending";
        budget_arrow = "upanddown";
        ssn.duration_sorting_order = "asc";
      }
    } else if (sort_column_name == "Budget") {
      if (ssn.budget_sorting_order == "asc") {
        sorting_column = "[" + '"' + "budget,desc" + '"' + "]";
        subsidy_scheme_name_arrow = "upanddown";
        subsidy_control_no_arrow = "upanddown";
        granting_authority_arrow = "upanddown";
        start_date_arrow = "upanddown";
        end_date_arrow = "upanddown";
        duration_arrow = "upanddown";
        budget_arrow = "downdecending";
        ssn.budget_sorting_order = "desc";
      } else {
        sorting_column = "[" + '"' + "budget,asc" + '"' + "]";
        subsidy_scheme_name_arrow = "upanddown";
        subsidy_control_no_arrow = "upanddown";
        granting_authority_arrow = "upanddown";
        start_date_arrow = "upanddown";
        end_date_arrow = "upanddown";
        duration_arrow = "upanddown";
        budget_arrow = "upacending";
        ssn.budget_sorting_order = "asc";
      }
    }

    sorting_order_interium = sorting_column.replace(/^"(.*)"$/, "$1");
    ssn.sorting_order_pass = JSON.parse(sorting_order_interium);
    console.log("sorting_order_interium" + sorting_order_interium);

    current_page = 1;

    current_page_active = current_page;

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

    const data_request = {
      searchName: ssn.Search_Text_Global,
      pageNumber: current_page,
      totalRecordsPerPage: ssn.frontend_totalRecordsPerPage,
      sortBy: ssn.sorting_order_pass,
      status: ssn.scheme_selected_status,
    };

    var data = JSON.parse(JSON.stringify(data_request));
    console.log("request data : " + data);

    try {
      const apidata = await axios.post(
        beis_url_searchscheme + "/scheme/search",
        data_request,
        ssn.UserPrincileObjectGlobal
      );
      console.log(`Status: ${apidata.status}`);
      console.log("Body: ", apidata.data);
      searchschemes = apidata.data;
      var searchschemes_api = apidata.data;
      console.log("searchschemes" + searchschemes_api);
      const seachawardstring = JSON.stringify(searchschemes_api);
      const seachawardJSON = JSON.parse(seachawardstring);
      totalrows = parseInt(searchschemes.totalSearchResults);

      console.log("req.query.page: " + req.query.page);

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

      pageCount = Math.ceil(totalrows / ssn.frontend_totalRecordsPerPage);

      // this is for page management section

      if (current_page < 5 && pageCount > 9) {
        start_page = 1;
        end_page = 9;
      } else if (current_page < 5 && pageCount <= 9) {
        start_page = 1;
        end_page = pageCount;
      } else if (current_page >= 5 && pageCount <= 9) {
        start_page = 1;
        end_page = pageCount;
      }
      if (current_page >= 5 && pageCount > 9) {
        (start_page = current_page - 4), (end_page = current_page + 4);
        nearby_last_page = pageCount - 4;
        if (current_page >= nearby_last_page) {
          end_page = pageCount;
          start_page = pageCount - 9;
        }
      }

      console.log("Start Page :" + start_page);
      console.log("end page :" + end_page);
      console.log("page count: " + pageCount);

      res.render("bulkupload/mysubsidymeasures", {
        pageCount,
        previous_page,
        next_page,
        current_page_active,
        start_record,
        end_record,
        totalrows,
      });
    } catch (err) {
      console.error(err);
      if (err.toString().includes("500")) res.render("bulkupload/notAvailable");
      else if (err.toString().includes("401"))
        res.render("bulkupload/notAuthorized");
    }
  }
});

router.post("/", (req, res) => {
  ssn = req.session;
  if (
    typeof ssn.dashboard_roles_object_id1 === "undefined" ||
    typeof ssn.dashboard_roles_object_id2 === "undefined" ||
    req.session.cookie.maxAge <= 0
  ) {
    res.redirect("/signout");
  } else {
    res.render("bulkupload/mysubsidymeasures");
  }
});

module.exports = router;
