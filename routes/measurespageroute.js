// ********************************************************************
// Gov.UK transparency Subsidy scheme page route module
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

    console.log("req.query.page: " + req.query.page);
    routing_pagenumber = req.query.page;
    current_page = parseInt(routing_pagenumber);

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
    typeof ssn.dashboard_roles_object_id2 === "undefined"
  ) {
    res.redirect("/signout");
  } else {
    res.set("X-Frame-Options", "DENY");
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Content-Security-Policy", 'frame-ancestors "self"');
    res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

    res.render("bulkupload/mysubsidymeasures");
  }
});

module.exports = router;
