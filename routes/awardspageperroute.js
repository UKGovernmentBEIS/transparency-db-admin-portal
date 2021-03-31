// ********************************************************************
// Gov.UK public user search page outing
// ********************************************************************

const express = require("express");
const router = express.Router();
const axios = require("axios");
var request = require("request");

router.get("/", async (req, res) => {
  ssn = req.session;
  // console.log("Award_search_URL top  : " + JSON.stringify(ssn));
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  console.log("req.query.page: " + req.query.sort);
  routing_pagenumber = req.query.sort;

  ssn.frontend_totalRecordsPerPage = parseInt(routing_pagenumber);
  fetch_pagenumber = 1;
  current_page = 1;
  current_page_active = current_page;

  ssn.Award_page = current_page_active;
  //  Award_selected_status = '';

  Base_URL = beis_url_accessmanagement + "/accessmanagement/searchresults?";
  Award_text = "searchName=" + ssn.Award_search_text;
  Award_status = "status=" + ssn.Award_selected_status;
  Award_concate = "&";
  Award_page = "page=" + ssn.Award_page;
  Award_recordsperpage = "recordsPerPage=" + ssn.frontend_totalRecordsPerPage;

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
  console.log("Award_search_URL   : " + JSON.stringify(Award_search_URL));

  try {
    const apidata = await axios.get(
      Award_search_URL,
      ssn.UserPrincileObjectGlobal
    );
    console.log(`Status: ${apidata.status}`);
    console.log("Body: ", apidata.data);
    searchawards = apidata.data;
    var searchawards_api = apidata.data;
    console.log("searchawards" + searchawards_api);
    const seachawardstring = JSON.stringify(searchawards_api);
    // console.log('seachawardstring' + seachawardstring );
    const seachawardJSON = JSON.parse(seachawardstring);
    // console.log('seachawardJSON ' + seachawardJSON.awards[0]  );
    totalrows = parseInt(searchawards.totalSearchResults);

    if (current_page == 1) {
      start_record = 1;
      end_record = ssn.frontend_totalRecordsPerPage;
    }
    // else if (current_page == pageCount) {
    //   start_record = (current_page - 1) *  ssn.frontend_totalRecordsPerPage + 1;
    //   end_record = totalrows;
    // } else {
    //   start_record =
    //     current_page *  ssn.frontend_totalRecordsPerPage -
    //      ssn.frontend_totalRecordsPerPage +
    //     1;
    //   end_record = current_page *  ssn.frontend_totalRecordsPerPage;
    // }

    pageCount = Math.ceil(totalrows / ssn.frontend_totalRecordsPerPage);

    if (current_page == 1) {
      previous_page = 1;
      next_page = 2;
    }
    //  else if (current_page == pageCount) {
    //   previous_page = pageCount - 1;
    //   next_page = pageCount;
    // } else {
    //   previous_page = current_page - 1;
    //   next_page = current_page + 1;
    // }

    console.log("page count :" + pageCount);
    console.log("routing current page :" + current_page);
    console.log("routing prev page :" + previous_page);
    console.log("routing next page :" + next_page);

    // this is for page management section

    if (current_page < 5 && pageCount > 9) {
      start_page = 1;
      end_page = 9;
    } else if (current_page < 5 && pageCount <= 9) {
      start_page = 1;
      end_page = pageCount;
    }
    // else if (current_page >= 5 && pageCount <= 9) {
    //   start_page = 1;
    //   end_page = pageCount;
    // }
    // if (current_page >= 5 && pageCount > 9) {
    //   (start_page = current_page - 4), (end_page = current_page + 4);
    //   nearby_last_page = pageCount - 4;
    //   if (current_page >= nearby_last_page) {
    //     end_page = pageCount;
    //     start_page = pageCount - 9;
    //   }
    // }

    nodata = "";
    noawards = false;
    noresult = false;

    console.log("Start Page :" + start_page);
    console.log("end page :" + end_page);
    console.log("page count: " + pageCount);
    res.render("bulkupload/mysubsidyawards", {
      pageCount,
      previous_page,
      next_page,
      current_page_active,
      start_record,
      noresult,
      nodata,
      noawards,
      end_record,
      totalrows,
      start_page,
      end_page,
    });
  } catch (err) {
    console.error(err);
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
  }
});

router.post("/", (req, res) => {
  ssn = req.session;
  res.render("bulkupload/mysubsidyawards");
});

module.exports = router;
