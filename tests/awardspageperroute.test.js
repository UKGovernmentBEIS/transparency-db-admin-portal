// ***********************************************************
// Automated Unit testing scripts for hide filter route
// ***********************************************************

const index = require("../app");
const request = require("supertest");
const express = require("express");
const app = express();
var session = require("express-session");
const bodyParser = require("body-parser");
const axios = require("axios");
jest.mock("axios");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session);
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", index);

const mockRequest = (sessionData, body) => ({
  session: { data: sessionData },
  body,
});

const res = {};

test("Unit testing for hide filter route Test for GET call", async () => {
  const req = mockRequest();
  global.dashboard_roles = "";
  global.noresult = "";
  global.Award_sorting = "";
  global.dashboard_ga_name = "";
  global.beis_url_accessmanagement =
    "https://dev-beis-tp-db-accessmanagement-service-app.azurewebsites.net";
  global.awards_status = "Draft";
  global.frontend_totalRecordsPerPage = 10;
  global.Award_selected_status = "";
  global.dashboard_ga_name = "";
  global.searchawards = {
    awards: [
      {
        awardNumber: 2,
        subsidyFullAmountExact: "0",
        subsidyFullAmountRange: "£500,000 - £1,000,000",
        subsidyObjective: "Research and development",
        subsidyMeasureTitle: "Grant Assistance for the Historic Environment",
        status: "Published",
        gaName: "Flintshire County council",
        lastModifiedDate: "08 January 2021",
        scNumber: "SC10029",
        subsidyInstrument: "Tax measures (tax credit, or tax/duty exemption)",
        beneficiaryName: "Adamaarku Productions LTD",
      },
    ],
  };
  global.UserPrincileObjectGlobal = {};
  global.Award_search_text = "";
  global.pageCount = 10;
  global.current_page_active = 1;
  global.previous_page = "";
  global.next_page = 2;
  global.start_record = 1;
  global.end_record = 10;
  global.totalrows = 10;
  global.start_page = 1;
  global.end_page = 10;

  global.totalSubsidyAward = "";
  global.totalAwaitingAward = "";
  global.totalPublishedAward = "";
  global.totalInactiveAward = "";
  global.totalRejectedAward = "";

  global.Award_sorting_field = "";
  global.subsidy_award_number_arrow = "";
  global.scheme_name_arrow = "";
  global.award_status_arrow = "";
  global.award_recipient_arrow = "";
  global.granting_authority_arrow = "";

  axios.get.mockResolvedValue({
    status: 200,
    data: {
      totalSearchResults: 10,
      currentPage: 1,
      totalPages: 1,
      awards: [
        {
          awardNumber: 2,
          subsidyFullAmountExact: "0",
          subsidyFullAmountRange: "£500,000 - £1,000,000",
          subsidyObjective: "Research and development",
          subsidyMeasureTitle: "Grant Assistance for the Historic Environment",
          status: "Published",
          gaName: "Flintshire County council",
          lastModifiedDate: "08 January 2021",
          scNumber: "SC10029",
          subsidyInstrument: "Tax measures (tax credit, or tax/duty exemption)",
          beneficiaryName: "Adamaarku Productions LTD",
        },
      ],
    },
  });
  const res = {};
  request(app)
    .get("/awardspageperroute", (req, res))
    .query({ sort: "10" })
    .expect(200);
});

test("Unit testing for filter route Test for GET call", async () => {
  const req = mockRequest();
  global.dashboard_roles = "";
  global.noresult = "";
  global.beis_url_accessmanagement =
    "https://dev-beis-tp-db-accessmanagement-service-app.azurewebsites.net";
  global.awards_status = "Filter results by status";
  global.frontend_totalRecordsPerPage = 10;

  global.totalSubsidyAward = "";
  global.totalAwaitingAward = "";
  global.totalPublishedAward = "";
  global.totalInactiveAward = "";
  global.totalRejectedAward = "";

  global.searchawards = {
    awards: [
      {
        awardNumber: 2,
        subsidyFullAmountExact: "0",
        subsidyFullAmountRange: "£500,000 - £1,000,000",
        subsidyObjective: "Research and development",
        subsidyMeasureTitle: "Grant Assistance for the Historic Environment",
        status: "Published",
        gaName: "Flintshire County council",
        lastModifiedDate: "08 January 2021",
        scNumber: "SC10029",
        subsidyInstrument: "Tax measures (tax credit, or tax/duty exemption)",
        beneficiaryName: "Adamaarku Productions LTD",
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

  global.Award_sorting_field = "";
  global.subsidy_award_number_arrow = "";
  global.scheme_name_arrow = "";
  global.award_status_arrow = "";
  global.award_recipient_arrow = "";
  global.granting_authority_arrow = "";

  axios.get.mockResolvedValue({
    status: 200,
    data: {
      totalSearchResults: 10,
      currentPage: 1,
      totalPages: 1,
      awards: [
        {
          awardNumber: 2,
          subsidyFullAmountExact: "0",
          subsidyFullAmountRange: "£500,000 - £1,000,000",
          subsidyObjective: "Research and development",
          subsidyMeasureTitle: "Grant Assistance for the Historic Environment",
          status: "Published",
          gaName: "Flintshire County council",
          lastModifiedDate: "08 January 2021",
          scNumber: "SC10029",
          subsidyInstrument: "Tax measures (tax credit, or tax/duty exemption)",
          beneficiaryName: "Adamaarku Productions LTD",
        },
      ],
    },
  });
  const res = {};
  request(app)
    .post("/awardspageperroute", (req, res))
    .expect(200);
  //   expect(abcd).toBe(200);
});
