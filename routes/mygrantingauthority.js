const express = require("express");
const axios = require("axios");
var session = require("express-session");
const router = express.Router();

router.get("/", async (req, res) => {
  ssn = req.session;
  console.log("ssn", JSON.stringify(ssn));
  if (ssn.dashboard_roles == "BEIS Administrator") {
    res.set("X-Frame-Options", "DENY");
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Content-Security-Policy", 'frame-ancestors "self"');
    res.set("Access-Control-Allow-Origin", beis_url_searchscheme);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    req.query = JSON.parse(JSON.stringify(req.query));
    //  ssn.frontend_totalRecordsPerPage = 10;
    grantingAuthorityName = "";
    status = "";
    var data = {};
    if (req.query.hasOwnProperty("totalRecordsPerPage"))
      ssn.frontend_totalRecordsPerPage = Number(req.query.totalRecordsPerPage);
    if (req.query.hasOwnProperty("status")) status = req.query.status;
    if (req.query.hasOwnProperty("sort")) {
      sort = req.query.sort;
      arrow = req.query.arrow;
      if (sort == "gaId") {
        ssn.gaId_no_arrow = arrow;

        ssn.ganame_arrow = "upanddown";
        ssn.added_by_arrow = "upanddown";
        ssn.status_arrow = "upanddown";
        ssn.created_on_arrow = "upanddown";
        ssn.last_modified_arrow = "upanddown";

        if (ssn.gaId_no_arrow == "upanddown") {
          sorting_column = "gaId,asc";
          ssn.gaId_no_arrow = "upacending";
        } else if (ssn.gaId_no_arrow == "upacending") {
          sorting_column = "gaId,desc";
          ssn.gaId_no_arrow = "downdecending";
        } else {
          sorting_column = "gaId,asc";
          ssn.gaId_no_arrow = "upacending";
        }
      }

      if (sort == "gaName") {
        ssn.ganame_arrow = arrow;
        ssn.gaId_no_arrow = "upanddown";
        ssn.added_by_arrow = "upanddown";
        ssn.status_arrow = "upanddown";
        ssn.created_on_arrow = "upanddown";

        if (ssn.ganame_arrow == "upanddown") {
          sorting_column = "grantingAuthorityName,asc";
          ssn.ganame_arrow = "upacending";
        } else if (ssn.ganame_arrow == "upacending") {
          sorting_column = "grantingAuthorityName,desc";
          ssn.ganame_arrow = "downdecending";
        } else {
          sorting_column = "grantingAuthorityName,asc";
          ssn.ganame_arrow = "upacending";
        }
      }
      if (sort == "added_by") {
        ssn.gaId_no_arrow = "upanddown";
        ssn.ganame_arrow = "upanddown";
        ssn.added_by_arrow = arrow;
        ssn.status_arrow = "upanddown";
        ssn.created_on_arrow = "upanddown";
        ssn.last_modified_arrow = "upanddown";
        if (ssn.added_by_arrow == "upanddown") {
          sorting_column = "approvedBy,asc";
          ssn.added_by_arrow = "upacending";
        } else if (ssn.added_by_arrow == "upacending") {
          sorting_column = "approvedBy,desc";
          ssn.added_by_arrow = "downdecending";
        } else {
          sorting_column = "approvedBy,asc";
          ssn.added_by_arrow = "upacending";
        }
      }
      if (sort == "status") {
        ssn.gaId_no_arrow = "upanddown";
        ssn.ganame_arrow = "upanddown";
        ssn.added_by_arrow = "upanddown";
        ssn.status_arrow = arrow;
        ssn.created_on_arrow = "upanddown";
        ssn.last_modified_arrow = "upanddown";

        if (ssn.status_arrow == "upanddown") {
          sorting_column = "status,asc";
          ssn.status_arrow = "upacending";
        } else if (ssn.status_arrow == "upacending") {
          sorting_column = "status,desc";
          ssn.status_arrow = "downdecending";
        } else {
          sorting_column = "status,asc";
          ssn.status_arrow = "upacending";
        }
      }
      if (sort == "created_on") {
        ssn.gaId_no_arrow = "upanddown";
        ssn.ganame_arrow = "upanddown";
        ssn.added_by_arrow = "upanddown";
        ssn.status_arrow = "upanddown";
        ssn.created_on_arrow = arrow;
        ssn.last_modified_arrow = "upanddown";

        if (ssn.created_on_arrow == "upanddown") {
          sorting_column = "createdTimestamp,asc";
          ssn.created_on_arrow = "upacending";
        } else if (ssn.created_on_arrow == "upacending") {
          sorting_column = "createdTimestamp,desc";
          ssn.created_on_arrow = "downdecending";
        } else {
          sorting_column = "createdTimestamp,asc";
          ssn.created_on_arrow = "upacending";
        }
      }
      if (sort == "last_modified") {
        ssn.gaId_no_arrow = "upanddown";
        ssn.ganame_arrow = "upanddown";
        ssn.added_by_arrow = "upanddown";
        ssn.status_arrow = "upanddown";
        ssn.created_on_arrow = "upanddown";
        ssn.last_modified_arrow = arrow;

        if (ssn.last_modified_arrow == "upanddown") {
          sorting_column = "lastModifiedTimestamp,asc";
          ssn.last_modified_arrow = "upacending";
        } else if (ssn.last_modified_arrow == "upacending") {
          sorting_column = "lastModifiedTimestamp,desc";
          ssn.last_modified_arrow = "downdecending";
        } else {
          sorting_column = "lastModifiedTimestamp,asc";
          ssn.last_modified_arrow = "upacending";
        }
      }
      if (ssn.grantingAuthorityName_Global)
        grantingAuthorityName = ssn.grantingAuthorityName_Global;
      else grantingAuthorityName = grantingAuthorityID_global;
      current_page = 1;
      // data = {
      //   grantingAuthorityName: ssn.grantingAuthorityName_Global,
      //   grantingAuthorityID: grantingAuthorityID_global,
      //   pageNumber: 1,
      //   status: status,
      //   totalRecordsPerPage:  ssn.frontend_totalRecordsPerPage,
      //   sortBy: [sorting_column],
      // };
    } else if (req.query.hasOwnProperty("page")) {
      current_page = Number(req.query.page);
      console.log("current page :" + current_page);
      if (current_page == 1) {
        previous_page = 1;
        next_page = 2;
      } else if (current_page == pageCount) {
        previous_page = pageCount - 1;
        next_page = pageCount;
      } else {
        previous_page = current_page - 1;
        next_page = current_page + 1;
        console.log("next page else:" + next_page);
      }

      if (ssn.grantingAuthorityName_Global)
        grantingAuthorityName = ssn.grantingAuthorityName_Global;
      else grantingAuthorityName = grantingAuthorityID_global;

      // data = {
      //   grantingAuthorityName: ssn.grantingAuthorityName_Global,
      //   grantingAuthorityID: grantingAuthorityID_global,
      //   pageNumber: current_page,
      //   status: status,
      //   totalRecordsPerPage:  ssn.frontend_totalRecordsPerPage,
      //   sortBy: [sorting_column],
      // };
    } else {
      ssn.gaId_no_arrow = "upanddown";
      ssn.ganame_arrow = "upanddown";
      ssn.added_by_arrow = "upanddown";
      ssn.status_arrow = "upanddown";
      ssn.created_on_arrow = "downdecending";
      ssn.last_modified_arrow = "upanddown";
      sorting_column = "createdTimestamp,desc";
      current_page = 1;
      ssn.grantingAuthorityName_Global = "";
      grantingAuthorityID_global = "";
      //  ssn.frontend_totalRecordsPerPage = 10;
    }
    data = {
      grantingAuthorityName: ssn.grantingAuthorityName_Global,
      grantingAuthorityID: grantingAuthorityID_global,
      pageNumber: current_page,
      status: status,
      // totalRecordsPerPage: 10,
      totalRecordsPerPage: ssn.frontend_totalRecordsPerPage,
      sortBy: [sorting_column],
    };

    try {
      const apidata = await axios.post(
        beis_url_searchscheme + "/searchGrantingAuthority",
        data,
        ssn.UserPrincileObjectGlobal
      );
      // var maxGAId = [];
      // var grantingAuthorityName = "";
      API_response_code = `${apidata.status}`;
      grantingAuthorityList = apidata.data;
      totalrows = grantingAuthorityList.totalSearchResults;

      activeCount = grantingAuthorityList.activeCount;
      inActiveCount = grantingAuthorityList.inActiveCount;
      totalSearchResults = grantingAuthorityList.totalSearchResults;

      // apidata.data.gaList.forEach(function (item) {
      //   maxGAId.push(item.grantingAuthorityId);
      // });
      // var nextId = Math.max(...maxGAId);

      if (req.query.hasOwnProperty("page")) {
        pageCount = Math.ceil(totalrows / ssn.frontend_totalRecordsPerPage);
        current_page = grantingAuthorityList.currentPage;
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
        console.log(
          "ssn.frontend_totalRecordsPerPage",
          ssn.frontend_totalRecordsPerPage
        );
        pageCount = Math.ceil(totalrows / ssn.frontend_totalRecordsPerPage);

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
      nogas = false;
      noresult = false;
      noGrantingAuthority = "";

      // console.log("next :" + next_page);
      // console.log("previous:" + previous_page);
      // console.log("curren:" + current_page);
      console.log("records per page:" + pageCount);

      res.render("bulkupload/mygrantingauthority", {
        pageCount,
        previous_page,
        next_page,
        month,
        start_record,
        grantingAuthorityList,
        status,
        nogas,
        noresult,
        noGrantingAuthority,
        ssn,
        // gaId_no_arrow,
        // ganame_arrow,
        // added_by_arrow,
        // status_arrow,
        // created_on_arrow,
        // last_modified_arrow,

        activeCount,
        inActiveCount,
        totalSearchResults,

        grantingAuthorityName,
        end_record,
        totalrows,
        current_page,
        ssn,
      });
    } catch (err) {
      if (err.toString().includes("404")) {
        noGrantingAuthority = "No granting authority available";
        res.render("bulkupload/mygrantingauthority", {
          noGrantingAuthority,
          noresult,
          nogas,
        });
      } else if (err.toString().includes("401"))
        res.render("bulkupload/notAuthorized");
      else {
        noGrantingAuthority = "No granting authority available";
        res.render("bulkupload/mygrantingauthority", {
          noGrantingAuthority,
          noresult,
          nogas,
        });
      }

      noresult = true;
      nogas = true;

      response_error_message = err;
      console.log("message error : " + err);
      console.log("response_error_message catch : " + response_error_message);
      // res.render("publicusersearch/noresults");
    }
  } else res.render("bulkupload/notAuthorized");
});

router.post("/", async (req, res) => {
  ssn = req.session;
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_searchscheme);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  var grantingAuthority = "",
    grantingAuthorityName = "";

  var gatype = new RegExp("^[0-9]+$");
  req.body = JSON.parse(JSON.stringify(req.body));

  ssn.gaId_no_arrow = "upanddown";
  ssn.ganame_arrow = "upanddown";
  ssn.added_by_arrow = "upanddown";
  ssn.status_arrow = "upanddown";
  ssn.created_on_arrow = "downdecending";
  ssn.last_modified_arrow = "upanddown";
  // ssn.grantingAuthorityName_Global = "";
  // grantingAuthorityID_global = "";

  console.log("req.body", req.body);

  // if (req.body.hasOwnProperty("totalRecordsPerPage"))
  //    ssn.frontend_totalRecordsPerPage = req.body.totalRecordsPerPage;
  if (req.body.hasOwnProperty("status")) {
    status = req.body.status;
    if (ssn.grantingAuthorityName_Global)
      grantingAuthorityName = ssn.grantingAuthorityName_Global;
    else grantingAuthorityName = grantingAuthorityID_global;
  }

  if (req.body.hasOwnProperty("grantingAuthorityName")) {
    grantingAuthority = gatype.test(req.body.grantingAuthorityName);
    if (grantingAuthority) {
      grantingAuthorityID_global = req.body.grantingAuthorityName;
      grantingAuthorityName = req.body.grantingAuthorityName;
      ssn.grantingAuthorityName_Global = "";
    }
    // grantingAuthorityID_global = req.body.grantingAuthorityName;
    else {
      grantingAuthorityID_global = "";
      ssn.grantingAuthorityName_Global = req.body.grantingAuthorityName;
      grantingAuthorityName = req.body.grantingAuthorityName;
    }
  }
  const data = {
    grantingAuthorityName: ssn.grantingAuthorityName_Global,
    grantingAuthorityID: grantingAuthorityID_global,
    pageNumber: 1,
    status: status,
    totalRecordsPerPage: ssn.frontend_totalRecordsPerPage,
    sortBy: [""],
  };

  console.log("My GA Data", data);

  try {
    const apidata = await axios.post(
      beis_url_searchscheme + "/searchGrantingAuthority",
      data,
      ssn.UserPrincileObjectGlobal
    );

    API_response_code = `${apidata.status}`;
    grantingAuthorityList = apidata.data;
    totalrows = grantingAuthorityList.totalSearchResults;
    if (req.body.hasOwnProperty("grantingAuthorityName")) {
      activeCount = grantingAuthorityList.activeCount;
      inActiveCount = grantingAuthorityList.inActiveCount;
      totalSearchResults = grantingAuthorityList.totalSearchResults;
    }

    pageCount = Math.ceil(totalrows / ssn.frontend_totalRecordsPerPage);
    // console.log("totalrows :" + totalrows);
    // console.log("pageCount :" + pageCount);
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
    noresult = false;
    nogas = false;
    noGrantingAuthority = "";
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
      nogas,
      noGrantingAuthority,
      ssn,
      // ssn.gaId_no_arrow,
      // ssn.ganame_arrow,
      // ssn.added_by_arrow,
      // ssn.status_arrow,
      // ssn.created_on_arrow,
      // ssn.last_modified_arrow,

      activeCount,
      inActiveCount,
      totalSearchResults,

      grantingAuthorityList,
      totalrows,
      current_page_active,
      ssn,
    });
  } catch (err) {
    if (req.body.hasOwnProperty("grantingAuthorityName"))
      grantingAuthorityName = req.body.grantingAuthorityName;

    if (err == "Error: Request failed with status code 404") {
      noGrantingAuthority = "No granting authority available";
      noresult = true;
      nogas = false;
      res.render("bulkupload/mygrantingauthority", {
        noGrantingAuthority,
        noresult,
        nogas,
        grantingAuthorityName,
      });
    }
    response_error_message = err;
    console.log("message error : " + err);
    console.log("response_error_message catch : " + response_error_message);
    // res.render("publicusersearch/noresults");
  }
});
module.exports = router;
