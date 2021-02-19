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
  global.beis_url_accessmanagement = "";
  global.pageCount = "";
  global.totalRecordsPerPage = "";
  global.sort = "";
  global.previous_page = "";
  global.next_page = "";
  global.start_record = "";
  global.nextId = "";
  global.end_record = "";
  global.sort = "";
  global.totalrows = "";
  global.current_page_active = "";
  global.frontend_totalRecordsPerPage = "";
  global.grantingAuthorityName = "";
  global.grantingAuthorityList = {
    gaList: [
      {
        grantingAuthorityId: 2,
        grantingAuthorityName: "0",
        approvedBy: "£500,000 - £1,000,000",
        status: "Research and development",
        createdTimestamp: "Grant Assistance for the Historic Environment",
        lastModifiedTimestamp: "Published",
      },
      ,
    ],
  };

  axios.put.mockResolvedValue({
    status: 200,
    data: {
      totalSearchResults: 10,
      currentPage: 1,
      totalPages: 1,
      gaList: [
        {
          grantingAuthorityId: 2,
          grantingAuthorityName: "0",
          approvedBy: "£500,000 - £1,000,000",
          status: "Research and development",
          createdTimestamp: "Grant Assistance for the Historic Environment",
          lastModifiedTimestamp: "Published",
        },
      ],
    },
  });

  request(app)
    .post("/mygrantingauthority", (req, res))
    .send({ editReview: "true" })
    .expect(200, done);
});

test("Unit testing for BEIS Admin route Test for POST call", (done) => {
  const req = mockRequest();
  global.UserPrincileObjectGlobal = {};
  global.dashboard_roles = "";
  const res = {};
  global.beis_url_accessmanagement = "";
  global.pageCount = "";
  global.totalRecordsPerPage = "";
  global.sort = "";
  global.previous_page = "";
  global.next_page = "";
  global.start_record = "";
  global.nextId = "";
  global.end_record = "";
  global.sort = "";
  global.totalrows = "";
  global.current_page_active = "";
  global.frontend_totalRecordsPerPage = "10";
  global.grantingAuthorityName = "";
  global.grantingAuthorityList = {
    gaList: [
      {
        grantingAuthorityId: 2,
        grantingAuthorityName: "0",
        approvedBy: "£500,000 - £1,000,000",
        status: "Research and development",
        createdTimestamp: "Grant Assistance for the Historic Environment",
        lastModifiedTimestamp: "Published",
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
          approvedBy: "£500,000 - £1,000,000",
          status: "Research and development",
          createdTimestamp: "Grant Assistance for the Historic Environment",
          lastModifiedTimestamp: "Published",
        },
      ],
    },
  });

  request(app)
    .get("/mygrantingauthority", (req, res))
    .expect(200, done);
  // expect(abcd).toBe(200);
});
