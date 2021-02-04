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
  Subsidy_Measure_Title_Error = "";
  Subsidy_Adhoc_Error = "";
  Legal_Basis_Error = "";
  Granting_Authority_Name_Error = "";
  Granting_Authority_URL_Error = "";
  Granting_Authority_Policy_Error = "";
  Budget_Error = "";
  scheme_issued_start_year_Error = "";
  scheme_issued_start_month_Error = "";
  scheme_issued_start_day_Error = "";
  scheme_issued_end_year_Error = "";
  scheme_issued_end_month_Error = "";
  scheme_issued_end_day_Error = "";
  isAddSubsidyPrimarycall = false;
  GetMonthName = "";
  SubsidyErrors = [];
  SubsidyFocus = [];
  Subsidy_Adhoc_Global = "";
  Granting_Authority_Name_Global = "";
  Subsidy_Measure_Title_Global = "";
  Legal_Basis_Global = "";
  Granting_Authority_URL_Global = "";
  Granting_Authority_Policy_Global = "";
  Budget_Global = "";
  Granting_Authority_Name_Global = "";
  Scheme_Start_Day_Global = "";
  Scheme_Start_Month_Global = "";
  Scheme_Start_Year_Global = "";
  Scheme_End_Day_Global = "";
  Scheme_End_Month_Global = "";
  Scheme_End_Year_Global = "";
  global.start_record = 1;
  global.end_record = 10;
  global.totalrows = 10;
  global.start_page = 1;
  global.end_page = 10;
  global.next_page = 2;
  global.pageCount = "10";
  global.previous_page = 1;
  global.current_page_active = 1;
  global.beis_url_accessmanagement = "";
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
    .get("/measurespageroute", (req, res))
    .query({ page: 10 })
    .expect(200, done);
});

test("Unit testing for BEIS Admin route Test for POST call", (done) => {
  const req = mockRequest();
  const res = {};
  Subsidy_Measure_Title_Error = "";
  Subsidy_Adhoc_Error = "";
  Legal_Basis_Error = "";
  Granting_Authority_Name_Error = "";
  Granting_Authority_URL_Error = "";
  Granting_Authority_Policy_Error = "";
  Budget_Error = "";
  scheme_issued_start_year_Error = "";
  scheme_issued_start_month_Error = "";
  scheme_issued_start_day_Error = "";
  scheme_issued_end_year_Error = "";
  scheme_issued_end_month_Error = "";
  scheme_issued_end_day_Error = "";
  isAddSubsidyPrimarycall = false;
  GetMonthName = "";
  SubsidyErrors = [];
  SubsidyFocus = [];
  Subsidy_Adhoc_Global = "";
  Granting_Authority_Name_Global = "";
  Subsidy_Measure_Title_Global = "";
  Legal_Basis_Global = "";
  Granting_Authority_URL_Global = "";
  Granting_Authority_Policy_Global = "";
  Budget_Global = "";
  Granting_Authority_Name_Global = "";
  Scheme_Start_Day_Global = "";
  Scheme_Start_Month_Global = "";
  Scheme_Start_Year_Global = "";
  Scheme_End_Day_Global = "";
  Scheme_End_Month_Global = "";
  Scheme_End_Year_Global = "";
  global.start_record = 1;
  global.end_record = 10;
  global.totalrows = 10;
  global.start_page = 1;
  global.end_page = 10;
  global.next_page = 2;
  global.pageCount = "10";
  global.previous_page = 1;
  global.current_page_active = 1;
  global.beis_url_accessmanagement = "";
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
    .get("/measurespageroute", (req, res))
    .query({ page: 1 })
    .expect(200, done);
});
