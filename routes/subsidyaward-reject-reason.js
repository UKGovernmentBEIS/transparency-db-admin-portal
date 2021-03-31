// ********************************************************************
// Gov.UK public user search page outing
// ********************************************************************

const express = require("express");
var session = require("express-session");
const router = express.Router();

const axios = require("axios");

router.post("/", async (req, res) => {
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
    var { reject_reason_text, buttonValue } = req.body;
    console.log("awardnumber : " + awardnumber);
    console.log("Award_status : " + Award_status);
    console.log("reject_reason : " + reject_reason_text);

    const data_request = {
      status: buttonValue,
      reason: reject_reason_text,
    };

    var data = JSON.parse(JSON.stringify(data_request));
    console.log("request :" + JSON.stringify(data));
    console.log(
      "user principle :" + JSON.stringify(ssn.UserPrincileObjectGlobal)
    );

    var awardendpoint =
      beis_url_accessmanagement + "/accessmanagement/" + awardnumber;

    try {
      const awardapidata = await axios.put(
        awardendpoint,
        data,
        ssn.UserPrincileObjectGlobal
      );
      console.log(`Status: ${awardapidata.status}`);
      console.log("Body: ", awardapidata.data);
      console.log("awardendpoint:" + awardendpoint);
      buttonValue = buttonValue.toLowerCase();
      res.render("bulkupload/subsidyaward-deleted-successfully", {
        buttonValue,
        awardnumber,
      });
      // try {
      //   const apidata = await axios.get(
      //     Award_search_URL,
      //     ssn.UserPrincileObjectGlobal
      //   );
      //   console.log(`Status: ${apidata.status}`);
      //   API_response_code = `${apidata.status}`;
      //   console.log("API_response_code: try" + API_response_code);
      //   console.log("Body: ", apidata.data);
      //   searchawards = apidata.data;
      //   var searchawards_api = apidata.data;
      //   console.log("searchawards" + searchawards_api);
      //   const seachawardstring = JSON.stringify(searchawards_api);
      //   const seachawardJSON = JSON.parse(seachawardstring);
      //   totalrows = searchawards.totalSearchResults;

      //   pageCount = Math.ceil(totalrows / ssn.frontend_totalRecordsPerPage);
      //   console.log("totalrows :" + totalrows);
      //   console.log("pageCount :" + pageCount);
      //   current_page = 1;
      //   previous_page = 1;
      //   next_page = 2;
      //   start_record = 1;
      //   end_record = ssn.frontend_totalRecordsPerPage;
      //   current_page_active = 1;

      //   start_page = 1;
      //   if (pageCount < 10) {
      //     end_page = pageCount;
      //   } else {
      //     end_page = 9;
      //   }

      //   res.render("bulkupload/mysubsidyawards", {
      //     pageCount,
      //     previous_page,
      //     next_page,
      //     start_record,
      //     end_record,
      //     totalrows,
      //     current_page_active,
      //     ssn,
      //   });
    } catch (err) {
      console.log("message error : " + err);
      if (err.toString().includes("500")) res.render("bulkupload/notAvailable");
      else if (err.toString().includes("401"))
        res.render("bulkupload/notAuthorized");
    }
  }
});

module.exports = router;
