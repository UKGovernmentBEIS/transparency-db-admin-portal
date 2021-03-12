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

test("Unit testing for Subsidy Scheme Edit Test for GET call", (done) => {
  const req = mockRequest();
  global.dashboard_roles = "";
  const res = {};
  global.dashboard_ga_name = "";

  global.beis_url_accessmanagement = "";
  global.Subsidy_Measure_Title_Global = "";
  global.Subsidy_Adhoc_Global = "";
  global.Legal_Basis_Global = "";
  global.Granting_Authority_URL_Global = "";
  global.Granting_Authority_Policy_Global = "";
  global.Budget_Global = "";
  global.Granting_Authority_Name_Measure_Global = "";
  global.Scheme_Start_Day_Global = "";
  global.Scheme_Start_Month_Global = "";
  global.Scheme_Start_Year_Global = "";
  global.Scheme_End_Day_Global = "";
  global.Scheme_End_Month_Global = "";
  global.Scheme_End_Year_Global = "";

  global.SubsidyArraySize = "";
  global.SubsidyErrors = "";
  global.Subsidy_Adhoc_Error = "";
  global.Subsidy_Adhoc_Global = "";
  global.Subsidy_Measure_Title_Error = "";
  global.Legal_Basis_Error = "";
  global.Granting_Authority_URL_Error = "";
  global.Granting_Authority_Policy_Error = "";
  global.Budget_Error = "";
  global.scheme_issued_start_day_Error = "";
  global.Granting_Authority_Name_Error = "";

  global.scheme_issued_start_month_Error = "";
  global.scheme_issued_start_year_Error = "";
  global.scheme_issued_end_day_Error = "";
  global.scheme_issued_end_month_Error = "";
  global.scheme_issued_end_year_Error = "";
  request(app)
    .get("/addreviewsubsidymeasures", (req, res))
    .expect(200, done);
  //   expect(acd).toBe(200);
});
