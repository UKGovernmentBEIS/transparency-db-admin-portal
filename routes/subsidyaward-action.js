// ********************************************************************
// Gov.UK transparency subsidy award approve,reject or delete module
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
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    var { Award_status } = req.body;

    console.log("awardnumber : " + awardnumber);
    console.log("Award_status : " + Award_status);

    try {
      if (Award_status == "Rejected" || Award_status == "Deleted") {
        if (Award_status == "Rejected") Award_status = "Reject";
        else Award_status = "Delete";
        Award_status_lower = Award_status.toLowerCase();
        res.render("bulkupload/subsidyaward-delete", {
          awardnumber,
          Award_status,
          Award_status_lower,
        });
      } else {
        const data_request = {
          status: Award_status,
        };

        ssn.awards_status = "";
        Award_selected_status = "";

        var data = JSON.parse(JSON.stringify(data_request));
        console.log("request :" + JSON.stringify(data));

        var awardendpoint =
          beis_url_accessmanagement + "/accessmanagement/" + awardnumber;
        const awardapidata = await axios.put(
          awardendpoint,
          data,
          ssn.UserPrincileObjectGlobal
        );
        console.log(`Status: ${awardapidata.status}`);
        console.log("Body: ", awardapidata.data);
        // fetchawarddetails = awardapidata.data;

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

          if (Award_status == "Published") {
            res.render("bulkupload/subsidyaward-published-successfully", {
              awardnumber,
            });
            // res.render("bulkupload/mysubsidyawards", {
            //   pageCount,
            //   previous_page,
            //   next_page,
            //   start_record,
            //   end_record,
            //   totalrows,
            //   current_page_active,
            //    ssn.frontend_totalRecordsPerPage,
            // });
          }
        } catch (err) {
          console.log("message error : " + err);
          if (err.toString().includes("401"))
            res.render("bulkupload/notAuthorized");
          else if (err.toString().includes("500"))
            res.render("bulkupload/notAvailable");

          // res.render('publicusersearch/noresults');
        }
      }
      //   res.render('bulkupload/mysubsidyawards')  ;
    } catch (err) {
      if (err.toString().includes("401"))
        res.render("bulkupload/notAuthorized");
      else if (err.toString().includes("500"))
        res.render("bulkupload/notAvailable");
      console.log("message error : " + err);
    }
  }
});

module.exports = router;
