// ***********************************************************
// Automated Unit testing scripts for filter route
// ***********************************************************

const index = require("../app");
const request = require("supertest");
const express = require("express");
const app = express();
var session = require("express-session");
const bodyParser = require("body-parser");
const axios = require("axios");
jest.mock("axios");
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(session);
app.use(bodyParser.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use("/", index);

const mockRequest = (sessionData, body) => ({
  session: {
    data: sessionData,
  },
  body,
});

test("Unit testing for cancel subsidy award Test for GET call", async () => {
  const req = mockRequest();
  global.dashboard_roles = "";
  global.subsidy_scheme_name_arrow = "";
  global.subsidy_control_no_arrow = "";
  global.granting_authority_arrow = "";
  global.start_date_arrow = "";
  global.end_date_arrow = "";
  global.duration_arrow = "";
  global.noresult = "";
  global.budget_arrow = "";
  global.UserPrincileObjectGlobal = {};
  global.subsidy_scheme_name_sorting_order = "";
  global.subsidy_control_no_sorting_order = "";
  global.granting_authority_sorting_order = "";
  global.start_date_sorting_order = "";
  global.end_date_sorting_order = "";
  global.duration_sorting_order = "";
  global.budget_sorting_order = "";
  global.schemes_status = "";
  global.sorting_column = "";
  global.sorting_order_pass = [""];
  global.beis_url_accessmanagement = "";
  global.schemes_status = "";
  global.Search_Text_Global = "";
  global.start_record = "";
  global.beis_url_searchscheme = "";
  global.end_record = "";
  global.totalrows = "";
  global.pageCount = "";
  global.current_page_active = "";
  global.start_page = "";
  global.end_page = "";
  global.next_page = "";
  global.pageCount = "";
  global.searchschemes = {
    allScheme: "",
    activeScheme: "",
    inactiveScheme: "",
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

  global.frontend_totalRecordsPerPage = "";

  const res = {};
  axios.post.mockResolvedValue({
    status: 200,
    data: {
      allScheme: "",
      activeScheme: "",
      inactiveScheme: "",
      totalSearchResults: "",
      schemes: [
        {
          scNumber: "",
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
    .post("/measuresearchroute", (req, res))
    .send({
      search_text: "",
      grantingAuthorityID: "",
      grantingAuthorityName: "",
      schemes: [],
    })
    // expect(abcd).toBe(200);
    .expect(200);
});
