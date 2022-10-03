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

const mockRequest = (sessionData, body) => ({
  session: { data: sessionData },
  body,
});

test("Unit testing for Subsidy Scheme Edit Test for GET call", async () => {
  const req = mockRequest();
  global.dashboard_roles = "";
  const res = {};
  global.beis_url_publicsearch = "";
  global.Subsidy_Measure_Title_Global = "";
  global.Subsidy_Adhoc_Global = "";
  global.beis_url_accessmanagement = "";
  global.Granting_Authority_Name_Global = "";
  global.Scheme_Confirmation_Day_Global = "";
  global.Scheme_Confirmation_Month_Global = "";
  global.Scheme_Confirmation_Year_Global = "";
  global.Scheme_Start_Day_Global = "";
  global.Scheme_Start_Month_Global = "";
  global.Scheme_Start_Year_Global = "";
  global.Scheme_End_Day_Global = "";
  global.Scheme_End_Month_Global = "";
  global.Scheme_End_Year_Global = "";
  global.Legal_Basis_Global = "";
  global.Granting_Authority_URL_Global = "";
  global.Granting_Authority_Policy_Global = "";
  global.Budget_Global = "";
  global.ssn = {};
  global.ssn.GetMonthName = "";
  global.Subsidy_Measure_Title_Error = "";
  global.Subsidy_Adhoc_Error = "";
  global.ssn.Legal_Basis_Error = "";
  global.ssn.Granting_Authority_URL_Error = "";
  global.ssn.Granting_Authority_Policy_Error = "";
  global.ssn.Budget_Error = "";
  global.Granting_Authority_Name_Error = "";
  global.ssn.scheme_issued_confirmation_day_Error = "";
  global.ssn.scheme_issued_confirmation_month_Error = "";
  global.ssn.scheme_issued_confirmation_year_Error = "";
  global.ssn.scheme_issued_start_day_Error = "";
  global.ssn.scheme_issued_start_month_Error = "";
  global.ssn.scheme_issued_start_year_Error = "";
  global.scheme_issued_end_day_Error = "";
  global.scheme_issued_end_month_Error = "";
  global.scheme_issued_end_year_Error = "";
  global.SubsidyErrors = [];
  global.SubsidyArraySize = "";
  global.SubsidyFocus = [];

  global.isAddSubsidyPrimarycall = "";
  global.beis_url_searchscheme = "";

  request(app)
    .post("/subsidymeasurereedit", (req, res))
    .send({
      Subsidy_Adhoc: "",
      Granting_Authority_Name: "",
      Subsidy_Measure_Title: "",
      Legal_Basis: "",
      Granting_Authority_URL: "",
      Granting_Authority_Policy: "",
      Budget: "",
      scheme_issued_confirmation_day: "",
      scheme_issued_confirmation_month: "",
      scheme_issued_confirmation_year: "",
      scheme_issued_start_year: "",
      scheme_issued_start_month: "",
      scheme_issued_start_day: "",
      scheme_issued_end_year: "",
      scheme_issued_end_month: "",
      scheme_issued_end_day: "",
      buttonvalue: "Update",
    })
    .expect(200);
  //   expect(acd).toBe(200);
});

test("Unit testing for Subsidy Scheme Edit Test for GET call", async () => {
  const req = mockRequest();
  global.dashboard_roles = "";
  const res = {};
  global.beis_url_publicsearch = "";
  global.Subsidy_Measure_Title_Global = "";
  global.Subsidy_Adhoc_Global = "";
  global.beis_url_accessmanagement = "";

  global.Granting_Authority_Name_Global = "";
  global.Scheme_Confirmation_Day_Global = "";
  global.Scheme_Confirmation_Month_Global = "";
  global.Scheme_Confirmation_Year_Global = "";
  global.Scheme_Start_Day_Global = "";
  global.Scheme_Start_Month_Global = "";
  global.Scheme_Start_Year_Global = "";
  global.Scheme_End_Day_Global = "";
  global.Scheme_End_Month_Global = "";
  global.Scheme_End_Year_Global = "";
  global.Legal_Basis_Global = "";
  global.Granting_Authority_URL_Global = "";
  global.Granting_Authority_Policy_Global = "";
  global.Budget_Global = "";

  global.SubsidyErrors = [];
  global.SubsidyArraySize = "";
  global.SubsidyFocus = [];
  global.ssn = {};
  global.ssn.GetMonthName = "";
  global.isAddSubsidyPrimarycall = "";
  global.beis_url_searchscheme = "";

  request(app)
    .post("/subsidymeasurereedit", (req, res))
    .send({
      Subsidy_Adhoc: "",
      Granting_Authority_Name: "",
      Subsidy_Measure_Title: "",
      Legal_Basis: "",
      Granting_Authority_URL: "",
      Granting_Authority_Policy: "",
      Budget: "",
      scheme_issued_confirmation_day: "",
      scheme_issued_confirmation_month: "",
      scheme_issued_confirmation_year: "",
      scheme_issued_start_year: "",
      scheme_issued_start_month: "",
      scheme_issued_start_day: "",
      scheme_issued_end_year: "",
      scheme_issued_end_month: "",
      scheme_issued_end_day: "",
      buttonvalue: "",
    })
    .expect(200);
  //   expect(acd).toBe(200);
});
