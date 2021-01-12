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

test("Unit testing for Subsidy Award Fetch Test for GET call", (done) => {
  const req = mockRequest();
  const res = {};
  global.beis_url_publicsearch =
    "https://dev-beis-tp-db-accessmanagement-service-app.azurewebsites.net";
  global.awards_status = "Filter results by status";
  global.frontend_totalRecordsPerPage = 10;
  global.fetchawarddetails = {
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
  };
  axios.get.mockResolvedValue({
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
  request(app)
    .get("/subsidyawardfetch", (req, res))
    .query({ award: 22 })
    .expect(200, done);
  // expect(acd).toBe(200);
});
