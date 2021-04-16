// ***********************************************************
// Automated Unit testing scripts for search results award route
// ***********************************************************

const index = require("../app");
const request = require("supertest");
const express = require("express");
const app = express();
var session = require("express-session");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session);
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", index);
const axios = require("axios");
jest.mock("axios");

const mockRequest = (sessionData, body) => ({
  session: { data: sessionData },
  body,
});

test("Unit testing for Subsidy Award Cancel Test for GET call", async () => {
  const req = mockRequest();
  global.UserPrincileObjectGlobal = {};
  global.dashboard_roles = "";
  const res = {};
  global.awards_status = "Filter results by status";
  global.frontend_totalRecordsPerPage = 10;
  global.subsidy_scheme_name_arrow = "";
  global.subsidy_control_no_arrow = "";
  global.end_date_arrow = "";
  global.duration_arrow = "";
  global.budget_arrow = "";
  global.Search_Text_Global = "";
  global.sorting_order_pass = "";
  global.beis_url_searchscheme = "";
  global.beis_url_accessmanagement =
    "https://dev-beis-tp-db-accessmanagement-service-app.azurewebsites.net";
  global.searchawards = {
    activeScheme: "",
    allScheme: "",
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

  global.pageCount = 10;
  global.current_page_active = 1;
  global.previous_page = "";
  global.next_page = 2;
  global.start_record = 1;
  global.end_record = 10;
  global.totalrows = 10;
  axios.post.mockResolvedValue({
    status: 200,
    data: {
      totalSearchResults: 10,
      currentPage: 1,
      totalPages: 1,
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
    },
  });
  request(app)
    .get("/mysubsidymeasures", (req, res))
    .query({ award: 22 })
    .expect(200);
  //   expect(acd).toBe(200);
});
