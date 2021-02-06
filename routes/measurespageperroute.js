// ********************************************************************
// Gov.UK public user search page outing
// ********************************************************************

const express = require("express");
const router = express.Router();
const axios = require("axios");
var request = require("request");

router.get("/", async (req, res) => {
  console.log("req.query.page: " + req.query.sort);
  routing_pagenumber = req.query.sort;

  frontend_totalRecordsPerPage = parseInt(routing_pagenumber);
  fetch_pagenumber = 1;
  current_page = 1;
  current_page_active = current_page;

  const data_request = {
    searchName: Search_Text_Global,
    pageNumber: current_page,
    totalRecordsPerPage: frontend_totalRecordsPerPage,
    sortBy: sorting_order_pass,
    status: "",
  };


  var data = JSON.parse(JSON.stringify(data_request));
  console.log("request data : " + data);

  try {
    const apidata = await axios.post(
      beis_url_searchscheme + "/scheme/search",
      data_request
    );
    console.log(`Status: ${apidata.status}`);
    console.log("Body: ", apidata.data);
    searchschemes = apidata.data;
    var searchschemes_api = apidata.data;
    console.log("searchschemes" + searchschemes_api);
    const seachawardstring = JSON.stringify(searchschemes_api);
    const seachawardJSON = JSON.parse(seachawardstring);
    totalrows = parseInt(searchschemes.totalSearchResults);
    console.log("req.query.page: " + req.query.sort);

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
      start_page,
      end_page,
    });
  } catch (err) {
    console.error(err);
  }
});

router.post("/", (req, res) => {
  res.render("bulkupload/mysubsidymeasures");
});

module.exports = router;
