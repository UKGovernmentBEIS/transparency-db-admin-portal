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
  global.dashboard_user_name = "";
  global.dashboardawards = {
    grantingAuthorityUserActionCount: {
      totalGrantingAuthority: 0,
      totalGAPublishedByUser: 0,
      totalDeactiveGA: 0,
    },
    awardUserActionCount: {
      totalSubsidyAward: 3,
    },
    subsidyMeasureUserActionCount: {
      totalPublishedSubsidyMeasures: 0,
      totalDraftSubsidyMeasures: 2,
      totalSubsidyMeasures: 2,
      totalAwaitingSubsidyMeasures: 0,
      totalDeletedSubsidyMeasures: 0,
    },
    awardResponse: null,
    subsidyMeasureResponse: [
      {
        subsidyMeasureTitle: "AHDB Promotional Measures scheme",
        scNumber: "SC10001",
        startDate: "2014-10-23",
        endDate: "2021-03-31",
        duration: "6 years 5 months 3 weeks ",
        budget: "180000000",
        gaName: "Scottish Government",
        lastModifiedDate: "04 January 2021",
      },
      {
        subsidyMeasureTitle: "Plug in Taxi Grant",
        scNumber: "SC10068",
        startDate: "2017-12-20",
        endDate: "2021-03-31",
        duration: "3 years 3 months 2 weeks 4 days ",
        budget: "16000000",
        gaName: "Scottish Government",
        lastModifiedDate: "04 January 2021",
      },
    ],
    grantingAuthorityResponse: null,
  };
  const res = {};

  axios.get.mockResolvedValue({
    status: "success",
    data: {
      grantingAuthorityUserActionCount: {
        totalGrantingAuthority: 0,
        totalGAPublishedByUser: 0,
        totalDeactiveGA: 0,
      },
      awardUserActionCount: {
        totalSubsidyAward: 3,
      },
      subsidyMeasureUserActionCount: {
        totalPublishedSubsidyMeasures: 0,
        totalDraftSubsidyMeasures: 2,
        totalSubsidyMeasures: 2,
        totalAwaitingSubsidyMeasures: 0,
        totalDeletedSubsidyMeasures: 0,
      },
      awardResponse: null,
      subsidyMeasureResponse: [
        {
          subsidyMeasureTitle: "AHDB Promotional Measures scheme",
          scNumber: "SC10001",
          startDate: "2014-10-23",
          endDate: "2021-03-31",
          duration: "6 years 5 months 3 weeks ",
          budget: "180000000",
          gaName: "Scottish Government",
          lastModifiedDate: "04 January 2021",
        },
        {
          subsidyMeasureTitle: "Plug in Taxi Grant",
          scNumber: "SC10068",
          startDate: "2017-12-20",
          endDate: "2021-03-31",
          duration: "3 years 3 months 2 weeks 4 days ",
          budget: "16000000",
          gaName: "Scottish Government",
          lastModifiedDate: "04 January 2021",
        },
      ],
      grantingAuthorityResponse: null,
    },
  });
  request(app)
    .post("/beisadmindashboard", (req, res))
    .expect(200, done);
});
