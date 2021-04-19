// ***********************************************************
// Automated Unit testing scripts for filter route
// ***********************************************************

const index = require("../app");
const request = require("supertest");
const express = require("express");
const app = express();
var session = require("express-session");
const bodyParser = require("body-parser");
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
const axios = require("axios");
jest.mock("axios");

const mockRequest = (sessionData, body) => ({
  session: {
    data: sessionData,
  },
  body,
});

test("Unit testing for filter route Test for GET call", async () => {
  const req = mockRequest();
  global.dashboard_roles = "";
  global.dashboard_ga_name = "";
  global.noresult = "";

  global.Award_sorting_field = "";
  global.Award_sorting = "";
  global.subsidy_award_number_arrow = "";
  global.scheme_name_arrow = "";
  global.award_status_arrow = "";
  global.award_recipient_arrow = "";
  global.granting_authority_arrow = "";

  global.totalSubsidyAward = "";
  global.totalAwaitingAward = "";
  global.totalPublishedAward = "";
  global.totalInactiveAward = "";
  global.totalRejectedAward = "";

  global.beis_url_accessmanagement = "";
  global.awards_status = "Filter results by status";
  global.frontend_totalRecordsPerPage = 10;
  global.Award_search_text = "";
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

  global.end_page = 10;
  global.pageCount = 10;
  global.current_page_active = 1;
  global.previous_page = "";
  global.next_page = 2;
  global.start_record = 1;
  global.end_record = 10;
  global.totalrows = 10;
  global.start_page = 1;

  const res = {};
  request(app)
    .post("/cancelmysubsidy", (req, res))
    .expect(200);
  // expect(abcd).toBe(200);
});
