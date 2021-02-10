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
  const res = {};
  global.beis_url_searchscheme = "";

  global.frontend_totalRecordsPerPage = "10";
  global.sorting_order_pass = "";
  global.Search_Text_Global = "";

  global.start_record = 1;
  global.end_record = 10;
  global.totalrows = 10;
  global.start_page = 1;
  global.end_page = 10;
  global.next_page = 2;
  global.pageCount = "10";
  global.schemes_status = "";
  global.previous_page = 1;
  global.current_page_active = 1;
  global.subsidy_scheme_name_arrow = "";
  global.subsidy_control_no_arrow = "";
  global.granting_authority_arrow = "";
  global.start_date_arrow = "";
  global.end_date_arrow = "";
  global.duration_arrow = "";
  global.budget_arrow = "";
  global.beis_url_accessmanagement = "";
  global.searchschemes = {
    schemes: [
      {
        subsidyMeasureTitle: "",
        scNumber: "",
        gaName: "",
        startDate: "",
        endDate: "",
        duration: "",
        budget: "",
      },
    ],
  };

  axios.post.mockResolvedValue({
    status: 200,
    data: {
      totalSearchResults: 10,
      currentPage: 1,
      totalPages: 1,
      schemes: [
        {
          subsidyMeasureTitle: "",
          scNumber: "",
          gaName: "",
          startDate: "",
          endDate: "",
          duration: "",
          budget: "",
        },
      ],
    },
  });
  request(app)
    .get("/measurespageperroute", (req, res))
    .query({ sort: 10 })
    .expect(200, done);
});

test("Unit testing for BEIS Admin route Test for POST call", (done) => {
  const req = mockRequest();
  const res = {};
  global.beis_url_searchscheme = "";

  global.Search_Text_Global = "";
  global.current_page = "";
  global.sorting_order_pass = [""];
  global.scheme_selected_status = "";
  global.duration_arrow = "";
  global.budget_arrow = "";
  global.searchschemes = {
    schemes: [
      {
        subsidyMeasureTitle: "",
        scNumber: "",
        gaName: "",
        startDate: "",
        endDate: "",
        duration: "",
        budget: "",
      },
    ],
  };

  isAddSubsidyPrimarycall = false;
  GetMonthName = "";
  SubsidyErrors = [];
  SubsidyFocus = [];

  global.start_record = 1;
  global.frontend_totalRecordsPerPage = "10";
  global.sorting_order_pass = "";
  global.end_record = 10;
  global.totalrows = 10;
  global.start_page = 1;
  global.end_page = 10;
  global.next_page = 2;
  global.pageCount = "1";
  global.schemes_status = "";
  global.previous_page = 1;
  global.current_page_active = 1;
  global.frontend_totalRecordsPerPage = 1;

  axios.post.mockResolvedValue({
    status: 200,
    data: {
      totalSearchResults: 10,
      currentPage: 1,
      totalPages: 1,
      schemes: [
        {
          subsidyMeasureTitle: "",
          scNumber: "",
          gaName: "",
          startDate: "",
          endDate: "",
          duration: "",
          budget: "",
        },
      ],
    },
  });
  request(app)
    .get("/measuresfilterroute", (req, res))
    .query({ sort: 1 })
    .expect(200, done);
  // expect(abcd).toBe(200);
});