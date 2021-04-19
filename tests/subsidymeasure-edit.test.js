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

test("Unit testing for Subsidy Scheme Edit Test for GET call", async () => {
  const req = mockRequest();
  global.UserPrincileObjectGlobal = {};
  global.dashboard_roles = "";
  const res = {};
  global.beis_url_publicsearch = "";
  global.Subsidy_Adhoc_Error = "";
  global.Subsidy_Measure_Title_Error = "";
  global.ssn = {};
  global.ssn.Legal_Basis_Error = "";
  global.ssn.Granting_Authority_URL_Error = "";
  global.ssn.Granting_Authority_Policy_Error = "";
  global.ssn.Budget_Error = "";
  global.ssn.scheme_issued_start_day_Error = "";
  global.ssn.scheme_issued_start_month_Error = "";
  global.ssn.scheme_issued_start_year_Error = "";
  global.scheme_issued_end_day_Error = "";
  global.scheme_issued_end_month_Error = "";
  global.scheme_issued_end_year_Error = "";
  global.beis_url_searchscheme = "";
  global.searchmeasuredetails = {
    adhoc: "",
    subsidyMeasureTitle: "",
    legalBasisText: "",
    gaSubsidyWebLink: "",
    gaSubsidyWebLinkDescription: "",
    budget: "",
  };
  axios.get.mockResolvedValue({
    status: 200,
    data: {
      adhoc: "",
      subsidyMeasureTitle: "",
      legalBasisText: "",
      gaSubsidyWebLink: "",
      gaSubsidyWebLinkDescription: "",
      budget: "",
      startDate: "",
      endDate: "",
    },
  });
  request(app)
    .get("/editsubsidymeasure", (req, res))
    .send({ scheme: "" })
    .expect(200);
  //   expect(acd).toBe(200);
});
