const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  frontend_totalRecordsPerPage = 10;

  const data = {
    grantingAuthorityName: "",
    grantingAuthorityID: "",
    pageNumber: 1,
    totalRecordsPerPage: frontend_totalRecordsPerPage,
    sortBy: [""],
  };
  try {
    const apidata = await axios.post(
      "https://dev-beis-tp-db-ga-schemes-service.azurewebsites.net/searchGrantingAuthority",
      data
    );
    const sort = "";
    var maxGAId = [];
    var grantingAuthorityName = "";
    API_response_code = `${apidata.status}`;
    grantingAuthorityList = apidata.data;
    totalrows = grantingAuthorityList.totalSearchResults;
    apidata.data.gaList.forEach(function (item) {
      maxGAId.push(item.grantingAuthorityId);
    });
    var nextId = Math.max(...maxGAId);

    pageCount = Math.ceil(totalrows / frontend_totalRecordsPerPage);
    // console.log("totalrows :" + totalrows);
    // console.log("pageCount :" + pageCount);
    current_page = 1;
    previous_page = 1;
    next_page = 2;
    start_record = 1;
    end_record = frontend_totalRecordsPerPage;
    current_page_active = 1;

    start_page = 1;
    if (pageCount < 10) {
      end_page = pageCount;
    } else {
      end_page = 9;
    }
    res.render("bulkupload/mygrantingauthority", {
      pageCount,
      previous_page,
      next_page,
      nextId,
      start_record,
      grantingAuthorityList,
      sort,
      grantingAuthorityName,
      end_record,
      totalrows,
      current_page_active,
      frontend_totalRecordsPerPage,
    });
  } catch (err) {
    response_error_message = err;
    console.log("message error : " + err);
    console.log("response_error_message catch : " + response_error_message);
    // res.render("publicusersearch/noresults");
  }
});

router.post("/", async (req, res) => {
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  var grantingAuthority = "",
    grantingAuthorityName = "",
    grantingAuthorityID = "";
  var sort = "";
  var gatype = new RegExp("^[0-9]+$");
  req.body = JSON.parse(JSON.stringify(req.body));

  if (req.body.hasOwnProperty("totalRecordsPerPage"))
    frontend_totalRecordsPerPage = req.body.totalRecordsPerPage;
  if (req.body.hasOwnProperty("sort")) sort = req.body.sort;

  if (req.body.hasOwnProperty("grantingAuthorityName")) {
    grantingAuthority = gatype.test(req.body.grantingAuthorityName);
    if (grantingAuthority) grantingAuthorityID = req.body.grantingAuthorityName;
    else grantingAuthorityName = req.body.grantingAuthorityName;
  }
  const data = {
    grantingAuthorityName: grantingAuthorityName,
    grantingAuthorityID: grantingAuthorityID,
    pageNumber: 1,
    totalRecordsPerPage: frontend_totalRecordsPerPage,
    sortBy: [sort],
  };
  try {
    const apidata = await axios.post(
      "https://dev-beis-tp-db-ga-schemes-service.azurewebsites.net/searchGrantingAuthority",
      data
    );
    console.log("apidata", apidata);
    API_response_code = `${apidata.status}`;
    grantingAuthorityList = apidata.data;
    totalrows = grantingAuthorityList.totalSearchResults;

    pageCount = Math.ceil(totalrows / frontend_totalRecordsPerPage);
    // console.log("totalrows :" + totalrows);
    // console.log("pageCount :" + pageCount);
    current_page = 1;
    previous_page = 1;
    next_page = 2;
    start_record = 1;
    end_record = frontend_totalRecordsPerPage;
    current_page_active = 1;

    start_page = 1;
    if (pageCount < 10) {
      end_page = pageCount;
    } else {
      end_page = 9;
    }
    var maxGAId = [];
    grantingAuthorityList.gaList.forEach(function (item) {
      maxGAId.push(item.grantingAuthorityId);
    });
    var nextId = Math.max(...maxGAId);
    res.render("bulkupload/mygrantingauthority", {
      pageCount,
      previous_page,
      next_page,
      start_record,
      nextId,
      end_record,
      grantingAuthorityName,
      sort,
      grantingAuthorityList,
      totalrows,
      current_page_active,
      frontend_totalRecordsPerPage,
    });
  } catch (err) {
    response_error_message = err;
    console.log("message error : " + err);
    console.log("response_error_message catch : " + response_error_message);
    // res.render("publicusersearch/noresults");
  }
});
module.exports = router;
