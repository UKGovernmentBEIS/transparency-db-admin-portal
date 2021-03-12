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
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  console.log("req.query.page: " + req.query.page);
  routing_pagenumber = req.query.page;
  current_page = parseInt(routing_pagenumber);
  console.log("current_page pageroute : " + current_page);

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
  console.log("routing current page :" + current_page);
  console.log("routing prev page :" + previous_page);
  console.log("routing next page :" + next_page);

  Audit_page = current_page_active;

  const data_request = {
    searchName: ssn.audit_search_by_text,
    searchStartDate: ssn.audit_search_by_from_date,
    searchEndDate: ssn.audit_search_by_end_date,
    pageNumber: Audit_page,
    totalRecordsPerPage: ssn.frontend_totalRecordsPerPage,
    sortBy: [ssn.sorting_order],
  };

  var userPrincipleRequest =
    '{"userName":"' +
    ssn.dashboard_user_name +
    '","password":"password123",' +
    '"role":"' +
    ssn.dashboard_roles +
    '","grantingAuthorityGroupId":"' +
    ssn.dashbaord_ga_ID +
    '","grantingAuthorityGroupName":"' +
    ssn.dashboard_ga_name +
    '"}';

  console.log("userprinciple: " + userPrincipleRequest);
  ssn.UserPrincipleObjectGlobal = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      userPrinciple: userPrincipleRequest,
    },
  };

  console.log(
    "user principle object:" + JSON.stringify(ssn.UserPrincipleObjectGlobal)
  );
  try {
    const apidata = await axios.post(
      beis_url_accessmanagement + "/accessmanagement/auditlogs",
      data_request,
      ssn.UserPrincipleObjectGlobal
    );
    console.log(`Status: ${apidata.status}`);
    API_response_code = `${apidata.status}`;
    console.log("API_response_code: try" + API_response_code);
    console.log("Body: ", apidata.data);
    searchAudits = apidata.data;
    var searchAudits_api = apidata.data;
    console.log("searchAudits" + searchAudits_api);
    const seachAuditstring = JSON.stringify(searchAudits_api);
    const seachAuditJSON = JSON.parse(seachAuditstring);
    totalrows = searchAudits.totalSearchResults;

    if (current_page == 1) {
      start_record = 1;
      end_record = ssn.frontend_totalRecordsPerPage;
    } else if (current_page == pageCount) {
      start_record = (current_page - 1) * ssn.frontend_totalRecordsPerPage + 1;
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
    nodata = "";
    noawards = false;
    noresult = false;

    console.log("Start Page :" + start_page);
    console.log("end page :" + end_page);
    console.log("page count: " + pageCount);

    res.render("bulkupload/audit-homepage", {
      pageCount,
      previous_page,
      next_page,
      start_record,
      noresult,
      nodata,
      end_record,
      totalrows,
      current_page_active,
      searchAudits,
      ssn,
    });
  } catch (err) {
    if (err == "Error: Request failed with status code 404") {
      noresult = true;
      nodata = "No audits available";
      res.render("bulkupload/audit-homepage", {
        noresult,
        nodata,
      });
    } else if (err.toString().includes("401")) {
      res.render("bulkupload/notAuthorized");
    } else if (err.toString().includes("500")) {
      res.render("bulkupload/notAvailable");
    }
    console.log("message error : " + err);
    // res.render("publicusersearch/noresults");
  }

  // end of POST call
});

module.exports = router;
