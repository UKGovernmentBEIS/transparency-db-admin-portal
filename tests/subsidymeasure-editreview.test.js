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
  global.searchmeasuredetails = {
    adhoc: "",
    scNumber: "",
    gaName: "",
    subsidyMeasureTitle: "",
    legalBasisText: "",
    gaSubsidyWebLink: "",
    gaSubsidyWebLinkDescription: "",
    budget: "",
  };
  global.Scheme_Legal_Granting_Start_Date_Day = "";
  global.Scheme_Legal_Granting_Start_Date_Month = "";
  global.Scheme_Legal_Granting_Start_Date_Year = "";
  global.Scheme_Legal_Granting_End_Date_Day = "";
  global.Scheme_Legal_Granting_End_Date_Month = "";
  global.Scheme_Legal_Granting_End_Date_Year = "";
  global.beis_url_searchscheme = "";
  axios.get.mockResolvedValue({
    status: 200,
    data: {
      adhoc: "",
      gaName: "",
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
    .get("/editreviewsubsidymeasure", (req, res))
    .query({ scheme: " " })
    .expect(200);
  //   expect(acd).toBe(200);
});
