// ********************************************************************
// Gov.UK public user search page outing
// ********************************************************************

const express = require("express");
const router = express.Router();
const axios = require("axios");
var request = require("request");

router.get("/", async (req, res) => {
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  console.log("req.query.page: " + req.query.page);
  //  frontend_totalRecordsPerPage = 3;
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

  Award_page = current_page_active;
  //  Award_selected_status = '';

  Base_URL = beis_url_accessmanagement + "/accessmanagement/searchresults?";
  Award_text = "searchName=" + Award_search_text;
  Award_status = "status=" + Award_selected_status;
  Award_concate = "&";
  Award_page = "page=" + Award_page;
  Award_recordsperpage = "recordsPerPage=" + frontend_totalRecordsPerPage;

  Award_search_URL =
    Base_URL +
    Award_text +
    Award_concate +
    Award_status +
    Award_concate +
    Award_page +
    Award_concate +
    Award_recordsperpage;
  console.log("Award_search_URL   : " + Award_search_URL);

  try {
    const apidata = await axios.get(Award_search_URL);
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
      end_record = frontend_totalRecordsPerPage;
    } else if (current_page == pageCount) {
      start_record = (current_page - 1) * frontend_totalRecordsPerPage + 1;
      end_record = totalrows;
    } else {
      start_record =
        current_page * frontend_totalRecordsPerPage -
        frontend_totalRecordsPerPage +
        1;
      end_record = current_page * frontend_totalRecordsPerPage;
    }

    pageCount = Math.ceil(totalrows / frontend_totalRecordsPerPage);

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

    res.render("bulkupload/mysubsidyawards", {
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
  }
});

router.post("/", (req, res) => {
  res.render("bulkupload/mysubsidyawards");
});

module.exports = router;
