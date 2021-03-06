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
  global.UserPrincileObjectGlobal = {};
  global.beis_url_accessmanagement =
    "https://dev-beis-tp-db-accessmanagement-service-app.azurewebsites.net";
  global.awards_status = "Filter results by status";
  global.frontend_totalRecordsPerPage = 10;
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
    .get("/editsubsidyaward", (req, res))
    .query({ award: "22" })
    // expect(abcd).toBe(200);
    .expect(200);
});
