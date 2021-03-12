// ***********************************************************
// Automated Unit testing scripts for search results award route
// ***********************************************************

const index = require("../app");
const request = require("supertest");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", index);
const axios = require("axios");
jest.mock("axios");

const mockRequest = (sessionData, body) => ({
  session: { data: sessionData },
  body,
});

test("Unit testing for BEIS Admin route Test for POST call", (done) => {
  const req = mockRequest();
  global.UserPrincileObjectGlobal = {};
  global.dashboard_roles = "";
  const res = {};
  global.beis_url_searchscheme = "";
  global.pageCount = "";
  global.totalRecordsPerPage = "";
  global.sort = "";
  global.previous_page = "";
  global.next_page = "";
  global.start_record = "";
  global.noresult = "";
  global.end_record = "";
  global.sort = "";
  global.totalrows = "";
  global.nodata = "";
  global.noresult = "";
  global.current_page_active = "";
  global.grantingAuthorityName_Global = "";
  global.grantingAuthorityID_global = "";
  global.frontend_totalRecordsPerPage = "";
  global.grantingAuthorityName = "";
  global.gaId_no_arrow = "";
  global.ganame_arrow = "";
  global.added_by_arrow = "";
  global.status_arrow = "";
  global.created_on_arrow = "";
  global.last_modified_arrow = "";
  global.sorting_column = "";
  global.grantingAuthorityList = {
    gaList: [
      {
        grantingAuthorityId: 2,
        grantingAuthorityName: "0",
        approvedBy: "Researcg",
        status: "Research and development",
        createdTimestamp: "2020-12-27T17:29:03.202013",
        lastModifiedTimestamp: "2020-12-27T17:29:03.202013",
      },
      ,
    ],
  };

  axios.post.mockResolvedValue({
    status: 200,
    data: {
      totalSearchResults: 10,
      currentPage: 1,
      totalPages: 1,
      gaList: [
        {
          grantingAuthorityId: 2,
          grantingAuthorityName: "0",
          approvedBy: "Researcg",
          status: "Research and development",
          createdTimestamp: "2020-12-27T17:29:03.202013",
          lastModifiedTimestamp: "2020-12-27T17:29:03.202013",
        },
      ],
    },
  });

  request(app)
    .post("/mygrantingauthority", (req, res))
    .send({
      totalRecordsPerPage: "",
      status: "",
      grantingAuthorityName: "",
    })
    .expect(200, done);
  // expect(abcd).toBe(200);
});

test("Unit testing for BEIS Admin route Test for POST call", (done) => {
  const req = mockRequest();
  global.UserPrincileObjectGlobal = {};
  global.dashboard_roles = "";
  const res = {};
  global.beis_url_searchscheme = "";
  global.pageCount = "";
  global.nodata = "";
  global.noresult = "";
  global.totalRecordsPerPage = "";
  global.sort = "";
  global.previous_page = "";
  global.next_page = "";
  global.date = "";
  global.start_record = "";
  global.noresult = "";
  global.end_record = "";
  global.grantingAuthorityName_Global = "";
  global.grantingAuthorityID_global = "";
  global.sort = "";
  global.totalrows = "";
  global.current_page_active = "";
  global.frontend_totalRecordsPerPage = "10";
  global.grantingAuthorityName = "";

  global.sorting_column = "";
  global.gaId_no_arrow = "";
  global.ganame_arrow = "";
  global.added_by_arrow = "";
  global.status_arrow = "";
  global.created_on_arrow = "";
  global.last_modified_arrow = "";

  global.grantingAuthorityList = {
    gaList: [
      {
        grantingAuthorityId: 2,
        grantingAuthorityName: "0",
        approvedBy: "Researcg",
        status: "Research and development",
        createdTimestamp: "2020-12-27T17:29:03.202013",
        lastModifiedTimestamp: "2020-12-27T17:29:03.202013",
      },
      ,
    ],
  };

  axios.post.mockResolvedValue({
    status: 200,
    data: {
      totalSearchResults: 10,
      currentPage: 1,
      totalPages: 1,
      gaList: [
        {
          grantingAuthorityId: 2,
          grantingAuthorityName: "0",
          approvedBy: "Researcg",
          status: "Research and development",
          createdTimestamp: "2020-12-27T17:29:03.202013",
          lastModifiedTimestamp: "2020-12-27T17:29:03.202013",
        },
      ],
    },
  });

  request(app)
    .get("/mygrantingauthority", (req, res))
    .query({ totalRecordsPerPage: "", status: "", sort: "" })
    .expect(200, done);
  // expect(abcd).toBe(200);
});
