// ********************************************************************
// Gov.UK transparency subsidy audit seach by date module
// ********************************************************************

const express = require("express");
var session = require("express-session");
const router = express.Router();

const axios = require("axios");
var request = require("request");

router.post("/", async (req, res) => {
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

    console.log("req.query.page: " + req.body.Audit_Granting_Date_Day);
    ssn.awards_status = req.query.sort;

    Award_page = 1;
    Award_selected_status = ssn.awards_status;

    if (Award_selected_status == "Show all") {
      Award_selected_status = "";
    }

    ssn.audit_search_by_from_date =
      req.body.Audit_Granting_Date_Year_Start +
      "-" +
      req.body.Audit_Granting_Date_Month_Start +
      "-" +
      req.body.Audit_Granting_Date_Day_Start;
    if (
      !req.body.Audit_Granting_Date_Day_End ||
      !req.body.Audit_Granting_Date_Month_End ||
      !req.body.Audit_Granting_Date_Year_End
    )
      ssn.audit_search_by_end_date =
        req.body.Audit_Granting_Date_Year_Start +
        "-" +
        req.body.Audit_Granting_Date_Month_Start +
        "-" +
        req.body.Audit_Granting_Date_Day_Start;
    else
      ssn.audit_search_by_end_date =
        req.body.Audit_Granting_Date_Year_End +
        "-" +
        req.body.Audit_Granting_Date_Month_End +
        "-" +
        req.body.Audit_Granting_Date_Day_End;

    ssn.Audit_Granting_Date_Year_End_Global =
      req.body.Audit_Granting_Date_Year_End;
    ssn.Audit_Granting_Date_Month_End_Global =
      req.body.Audit_Granting_Date_Month_End;
    ssn.Audit_Granting_Date_Day_End_Global =
      req.body.Audit_Granting_Date_Day_End;

    ssn.Audit_Granting_Date_Year_Start_Global =
      req.body.Audit_Granting_Date_Year_Start;
    ssn.Audit_Granting_Date_Month_Start_Global =
      req.body.Audit_Granting_Date_Month_Start;
    ssn.Audit_Granting_Date_Day_Start_Global =
      req.body.Audit_Granting_Date_Day_Start;

    const data_request = {
      searchName: ssn.audit_search_by_text,
      searchStartDate: ssn.audit_search_by_from_date,
      searchEndDate: ssn.audit_search_by_end_date,
      pageNumber: 1,
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

    console.log("user principle object:" + JSON.stringify(data_request));
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
  }
  // end of POST call
});

module.exports = router;
