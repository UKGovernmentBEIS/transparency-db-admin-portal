const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  req.query = JSON.parse(JSON.stringify(req.query));
  // frontend_totalRecordsPerPage = 10;

  var data = {};
  if (req.query.hasOwnProperty("totalRecordsPerPage"))
    frontend_totalRecordsPerPage = req.query.totalRecordsPerPage;
  if (req.query.hasOwnProperty("status")) status = req.query.status;
  else status = "";
  if (req.query.hasOwnProperty("sort")) {
    sort = req.query.sort;
    arrow = req.query.arrow;
    if (sort == "gaId") {
      gaId_no_arrow = arrow;

      ganame_arrow = "upanddown";
      added_by_arrow = "upanddown";
      status_arrow = "upanddown";
      created_on_arrow = "downdecending";
      last_modified_arrow = "upanddown";

      if (gaId_no_arrow == "upanddown") {
        sorting_column = "gaId,asc";
        gaId_no_arrow = "downdecending";
      } else if (gaId_no_arrow == "upacending") {
        sorting_column = "gaId,asc";
        gaId_no_arrow = "downdecending";
      } else {
        sorting_column = "gaId,desc";
        gaId_no_arrow = "upacending";
      }
    }

    if (sort == "gaName") {
      ganame_arrow = arrow;
      gaId_no_arrow = "upanddown";
      added_by_arrow = "upanddown";
      status_arrow = "upanddown";
      created_on_arrow = "downdecending";

      if (ganame_arrow == "upanddown") {
        sorting_column = "grantingAuthorityName,asc";
        ganame_arrow = "downdecending";
      } else if (ganame_arrow == "upacending") {
        sorting_column = "grantingAuthorityName,asc";
        ganame_arrow = "downdecending";
      } else {
        sorting_column = "grantingAuthorityName,desc";
        ganame_arrow = "upacending";
      }
    }
    if (sort == "added_by") {
      gaId_no_arrow = "upanddown";
      ganame_arrow = "upanddown";
      added_by_arrow = arrow;
      status_arrow = "upanddown";
      created_on_arrow = "downdecending";
      last_modified_arrow = "upanddown";
      if (added_by_arrow == "upanddown") {
        sorting_column = "approvedBy,asc";
        added_by_arrow = "downdecending";
      } else if (added_by_arrow == "upacending") {
        sorting_column = "approvedBy,asc";
        added_by_arrow = "downdecending";
      } else {
        sorting_column = "approvedBy,desc";
        added_by_arrow = "upacending";
      }
    }
    if (sort == "status") {
      gaId_no_arrow = "upanddown";
      ganame_arrow = "upanddown";
      added_by_arrow = "upanddown";
      status_arrow = arrow;
      created_on_arrow = "downdecending";
      last_modified_arrow = "upanddown";

      if (status_arrow == "upanddown") {
        sorting_column = "status,asc";
        status_arrow = "downdecending";
      } else if (status_arrow == "upacending") {
        sorting_column = "status,asc";
        status_arrow = "downdecending";
      } else {
        sorting_column = "status,desc";
        status_arrow = "upacending";
      }
    }
    if (sort == "created_on") {
      gaId_no_arrow = "upanddown";
      ganame_arrow = "upanddown";
      added_by_arrow = "upanddown";
      status_arrow = "upanddown";
      created_on_arrow = arrow;
      last_modified_arrow = "upanddown";

      if (created_on_arrow == "upanddown") {
        sorting_column = "createdTimestamp,asc";
        created_on_arrow = "downdecending";
      } else if (created_on_arrow == "upacending") {
        sorting_column = "createdTimestamp,asc";
        created_on_arrow = "downdecending";
      } else {
        sorting_column = "createdTimestamp,desc";
        created_on_arrow = "upacending";
      }
    }
    if (sort == "last_modified") {
      gaId_no_arrow = "upanddown";
      ganame_arrow = "upanddown";
      added_by_arrow = "upanddown";
      status_arrow = "upanddown";
      created_on_arrow = "downdecending";
      last_modified_arrow = arrow;

      if (last_modified_arrow == "upanddown") {
        sorting_column = "lastModifiedTimestamp,asc";
        last_modified_arrow = "downdecending";
      } else if (last_modified_arrow == "upacending") {
        sorting_column = "lastModifiedTimestamp,asc";
        last_modified_arrow = "downdecending";
      } else {
        sorting_column = "lastModifiedTimestamp,desc";
        last_modified_arrow = "upacending";
      }
    }
    data = {
      grantingAuthorityName: "",
      grantingAuthorityID: "",
      pageNumber: 1,
      status: status,
      totalRecordsPerPage: frontend_totalRecordsPerPage,
      sortBy: [sorting_column],
    };
  } else if (req.query.hasOwnProperty("page")) {
    var current_page = req.query.page;
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
    if (grantingAuthorityName_Global)
      grantingAuthorityName = grantingAuthorityName_Global;
    else grantingAuthorityName = grantingAuthorityID_global;

    data = {
      grantingAuthorityName: grantingAuthorityName_Global,
      grantingAuthorityID: grantingAuthorityID_global,
      pageNumber: current_page,
      status: status,
      totalRecordsPerPage: frontend_totalRecordsPerPage,
      sortBy: [""],
    };
  } else {
    gaId_no_arrow = "upanddown";
    ganame_arrow = "upanddown";
    added_by_arrow = "upanddown";
    status_arrow = "upanddown";
    created_on_arrow = "downdecending";
    last_modified_arrow = "upanddown";

    data = {
      grantingAuthorityName: "",
      grantingAuthorityID: "",
      pageNumber: 1,
      status: status,
      totalRecordsPerPage: 10,
      sortBy: [""],
    };
  }
  console.log("data", data);

  try {
    const apidata = await axios.post(
      beis_url_accessmanagement + "/searchGrantingAuthority",
      data,
      UserPrincileObjectGlobal
    );
    console.log("apidata", apidata.data);
    // var maxGAId = [];
    var grantingAuthorityName = "";
    API_response_code = `${apidata.status}`;
    grantingAuthorityList = apidata.data;
    totalrows = grantingAuthorityList.totalSearchResults;
    // apidata.data.gaList.forEach(function (item) {
    //   maxGAId.push(item.grantingAuthorityId);
    // });
    // var nextId = Math.max(...maxGAId);
    if (req.query.hasOwnProperty("page")) {
      var current_page = req.query.page;
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
    } else {
      pageCount = Math.ceil(totalrows / frontend_totalRecordsPerPage);
      console.log("totalrows :" + totalrows);
      console.log("pageCount :" + pageCount);
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
    }
    var month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    noresult = false;
    res.render("bulkupload/mygrantingauthority", {
      pageCount,
      previous_page,
      next_page,
      month,
      start_record,
      grantingAuthorityList,
      status,
      noresult,
      gaId_no_arrow,
      ganame_arrow,
      added_by_arrow,
      status_arrow,
      created_on_arrow,
      last_modified_arrow,

      grantingAuthorityName,
      end_record,
      totalrows,
      current_page,
      frontend_totalRecordsPerPage,
    });
  } catch (err) {
    if (err == "Error: Request failed with status code 404") {
      noGrantingAuthority = "No granting authority available";
      noresult = true;
      res.render("bulkupload/mygrantingauthority", {
        noGrantingAuthority,
        noresult,
      });
    }
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

  gaId_no_arrow = "upanddown";
  ganame_arrow = "upanddown";
  added_by_arrow = "upanddown";
  status_arrow = "upanddown";
  created_on_arrow = "downdecending";
  last_modified_arrow = "upanddown";
  grantingAuthorityName_Global = "";
  grantingAuthorityID_global = "";
  if (req.body.hasOwnProperty("totalRecordsPerPage"))
    frontend_totalRecordsPerPage = req.body.totalRecordsPerPage;
  if (req.body.hasOwnProperty("status")) status = req.body.status;

  if (req.body.hasOwnProperty("grantingAuthorityName")) {
    grantingAuthority = gatype.test(req.body.grantingAuthorityName);
    if (grantingAuthority) {
      grantingAuthorityID_global = req.body.grantingAuthorityName;
      grantingAuthorityName = req.body.grantingAuthorityName;
      grantingAuthorityName_Global = "";
    }
    // grantingAuthorityID_global = req.body.grantingAuthorityName;
    else {
      grantingAuthorityID_global = "";
      grantingAuthorityName_Global = req.body.grantingAuthorityName;
      grantingAuthorityName = req.body.grantingAuthorityName;
    }
  }
  const data = {
    grantingAuthorityName: grantingAuthorityName_Global,
    grantingAuthorityID: grantingAuthorityID_global,
    pageNumber: 1,
    status: sort,
    totalRecordsPerPage: frontend_totalRecordsPerPage,
    sortBy: [""],
  };
  try {
    const apidata = await axios.post(
      beis_url_accessmanagement + "/searchGrantingAuthority",
      data,
      UserPrincileObjectGlobal
    );
    console.log("apidata", apidata.data);
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
    // var maxGAId = [];
    // grantingAuthorityList.gaList.forEach(function (item) {
    //   maxGAId.push(item.grantingAuthorityId);
    // });
    // var nextId = Math.max(...maxGAId);
    noresult = false;
    var month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    res.render("bulkupload/mygrantingauthority", {
      pageCount,
      previous_page,
      next_page,
      start_record,
      // nextId,
      month,
      end_record,
      grantingAuthorityName,
      status,
      noresult,
      gaId_no_arrow,
      ganame_arrow,
      added_by_arrow,
      status_arrow,
      created_on_arrow,
      last_modified_arrow,

      grantingAuthorityList,
      totalrows,
      current_page_active,
      frontend_totalRecordsPerPage,
    });
  } catch (err) {
    if (err == "Error: Request failed with status code 404") {
      noGrantingAuthority = "No granting authority available";
      noresult = true;
      res.render("bulkupload/mygrantingauthority", {
        noGrantingAuthority,
        noresult,
      });
    }
    response_error_message = err;
    console.log("message error : " + err);
    console.log("response_error_message catch : " + response_error_message);
    // res.render("publicusersearch/noresults");
  }
});
module.exports = router;
