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

test("Unit testing for Subsidy Award Fetch Test for GET call", async () => {
  const req = mockRequest();
  global.dashboard_roles = "";
  const res = {};
  global.noresult = "";
  global.nodata = "";
  global.dashboard_ga_name = "";

  global.totalSubsidyAward = "";
  global.totalAwaitingAward = "";
  global.totalPublishedAward = "";
  global.totalInactiveAward = "";
  global.totalRejectedAward = "";

  global.buttonValue = "";
  global.awardnumber = "";

  global.Award_sorting_field = "";
  global.Award_sorting = "";
  global.subsidy_award_number_arrow = "";
  global.scheme_name_arrow = "";
  global.award_status_arrow = "";
  global.award_recipient_arrow = "";
  global.granting_authority_arrow = "";

  global.UserPrincileObjectGlobal = {};
  global.beis_url_accessmanagement =
    "https://dev-beis-tp-db-accessmanagement-service-app.azurewebsites.net";
  global.awards_status = "Filter results by status";
  global.frontend_totalRecordsPerPage = 10;
  global.awardnumber = 22;
  global.Award_status = "";
  global.Award_search_URL = "";

  global.pageCount = "";
  global.previous_page = "";
  global.next_page = "";
  global.start_record = "";
  global.end_record = "";
  global.totalrows = "";
  global.current_page_active = "";
  global.frontend_totalRecordsPerPage = "";
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
  axios.put.mockResolvedValue({
    status: 200,
    data: {
      subsidyMeasure: {
        scNumber: "",
        subsidyMeasureTitle: "",
      },
      subsidyObjective: "",
      subsidyInstrument: "",
      subsidyFullAmountRange: "",
      subsidyFullAmountExact: "",
      legalGrantingDate: "",
      goodsServicesFilter: "",
      spendingRegion: "",
      spendingSector: "",
      beneficiary: {
        beneficiaryName: "",
        orgSize: "",
        nationalIdType: "",
        nationalId: "",
      },
      grantingAuthorityResponse: {
        grantingAuthorityName: "",
      },
    },
  });

  axios.get.mockResolvedValue({
    status: 200,
    data: {
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
  request(app)
    .post("/subsidyawardrejectreason", (req, res))
    .send({ search_award_text: "" })
    // expect(abcd).toBe(200);
    .expect(200);
});
