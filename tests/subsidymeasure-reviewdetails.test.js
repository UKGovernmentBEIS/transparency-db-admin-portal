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

const mockRequest = (sessionData, body) => ({
  session: { data: sessionData },
  body,
});

test("Unit testing for Subsidy Scheme Review Details Test for GET call", (done) => {
  const req = mockRequest();
  global.dashboard_roles = "";
  const res = {};

  global.isAddSubsidyPrimarycall = "";
  global.beis_url_accessmanagement = "";
  Subsidy_Adhoc_Global = "";
  Subsidy_Measure_Title_Global = "";
  Legal_Basis_Global = "";
  Granting_Authority_URL_Global = "";
  Granting_Authority_Policy_Global = "";
  Budget_Global = "";
  Scheme_Start_Day_Global = "";
  GetMonthName = "";
  Scheme_Start_Year_Global = "";
  Scheme_End_Day_Global = "";
  GetMonthName = "";
  Scheme_End_Year_Global = "";
  global.SubsidyErrors = [];
  global.SubsidyArraySize = [];
  global.SubsidyFocus = [];

  global.Subsidy_Measure_Title_Error = "";
  global.Subsidy_Adhoc_Error = "";
  global.Granting_Authority_Name_Error = "";
  global.scheme_issued_start_day_Error = "";
  global.scheme_issued_start_month_Error = "";
  global.scheme_issued_start_year_Error = "";
  global.Legal_Basis_Error = "";
  global.Granting_Authority_URL_Error = "";
  global.Granting_Authority_Policy_Error = "";
  global.Budget_Error = "";
  global.scheme_issued_end_day_Error = "";
  global.scheme_issued_end_month_Error = "";
  global.scheme_issued_end_year_Error = "";

  request(app)
    .post("/reviewsubsidymeasures", (req, res))
    .send({
      buttonvalue: "Continue",
      Subsidy_Adhoc: "",
      Granting_Authority_Name: "",
      Subsidy_Measure_Title: "",
      Legal_Basis: "",
      Granting_Authority_URL: "",
      Granting_Authority_Policy: "",
      Budget: "",
      scheme_issued_start_year: "",
      scheme_issued_start_month: "",
      scheme_issued_start_day: "",
      scheme_issued_end_year: "",
      scheme_issued_end_month: "",
      scheme_issued_end_day: "",
    })
    .expect(200, done);
  //   expect(acd).toBe(200);
});

test("Unit testing for Subsidy Scheme Review Test for GET call", (done) => {
  const req = mockRequest();
  global.dashboard_roles = "";
  const res = {};

  global.isAddSubsidyPrimarycall = "";
  global.beis_url_accessmanagement = "";
  Subsidy_Adhoc_Global = "";
  Subsidy_Measure_Title_Global = "";
  Legal_Basis_Global = "";
  Granting_Authority_URL_Global = "";
  Granting_Authority_Policy_Global = "";
  Budget_Global = "";
  Scheme_Start_Day_Global = "";
  GetMonthName = "";
  Scheme_Start_Year_Global = "";
  Scheme_End_Day_Global = "";
  GetMonthName = "";
  Scheme_End_Year_Global = "";
  global.SubsidyErrors = [];
  global.SubsidyArraySize = [];
  global.SubsidyFocus = [];

  request(app)
    .post("/reviewsubsidymeasures", (req, res))
    .send({
      buttonvalue: "",
      Subsidy_Adhoc: "",
      Granting_Authority_Name: "",
      Subsidy_Measure_Title: "",
      Legal_Basis: "",
      Granting_Authority_URL: "",
      Granting_Authority_Policy: "",
      Budget: "",
      scheme_issued_start_year: "",
      scheme_issued_start_month: "",
      scheme_issued_start_day: "",
      scheme_issued_end_year: "",
      scheme_issued_end_month: "",
      scheme_issued_end_day: "",
    })
    .expect(200, done);
  //   expect(acd).toBe(200);
});
