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

test("Unit testing for Subsidy Scheme Edit Test for GET call", (done) => {
  const req = mockRequest();
  global.UserPrincileObjectGlobal = {};
  global.dashboard_roles = "";
  const res = {};
  global.beis_url_publicsearch = "";
  global.beis_url_searchscheme = "";
  global.beis_url_accessmanagement = "";
  global.scNumber_Global = "";
  global.Subsidy_Control_Number_Global_Text = "";
  global.Subsidy_Adhoc_Global = "";
  global.Granting_Authority_Name_Measure_Global = "";
  global.Subsidy_Measure_Title_Global = "";
  global.Legal_Basis_Global = "";
  global.Granting_Authority_URL_Global = "";
  global.Granting_Authority_Policy_Global = "";
  global.Budget_Global = "";
  global.subsidy_start_date = "";
  global.subsidy_end_date = "";
  global.Scheme_Start_Year_Global = "";
  global.Scheme_Start_Month_Global = "";
  global.Scheme_Start_Day_Global = "";
  global.Scheme_End_Year_Global = "";
  global.Scheme_End_Month_Global = "";
  global.Scheme_End_Day_Global = "";
  //   global.SubsidyErrors = [];
  //   global.SubsidyFocus = [];

  //   global.Subsidy_Measure_Title_Error = false;
  //   global.Subsidy_Adhoc_Error = false;
  //   global.Granting_Authority_Name_Error = false;
  //   global.scheme_issued_start_year_Error = false;
  //   global.scheme_issued_start_month_Error = false;
  //   global.scheme_issued_start_day_Error = false;
  //   global.scheme_issued_end_year_Error = false;
  //   global.scheme_issued_end_month_Error = false;
  //   global.scheme_issued_end_day_Error = false;

  axios.post.mockResolvedValue({
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
    .post("/subsidymeasurepublished", (req, res))
    .send({ button_value: "add_measure" })
    .expect(200, done);
  //   expect(acd).toBe(200);
});

test("Unit testing for Subsidy Scheme Edit Test for GET call", (done) => {
  const req = mockRequest();
  global.dashboard_roles = "";
  const res = {};
  global.beis_url_publicsearch = "";
  global.beis_url_searchscheme = "";
  global.beis_url_accessmanagement = "";

  global.scNumber_Global = "";
  global.Subsidy_Adhoc_Global_Flag = "";
  global.Granting_Authority_Name_Global = "";
  global.Subsidy_Measure_Title_Global = "";
  global.Legal_Basis_Global = "";
  global.Granting_Authority_URL_Global = "";
  global.Granting_Authority_Policy_Global = "";
  global.Budget_Global = "";
  global.subsidy_start_date = "";
  global.subsidy_end_date = "";
  global.Subsidy_Control_Number_Global_Text = "";
  global.Scheme_Start_Year_Global = "";
  global.Scheme_Start_Month_Global = "";
  global.Scheme_Start_Day_Global = "";
  global.Scheme_End_Year_Global = "";
  global.Scheme_End_Month_Global = "";
  global.Scheme_End_Day_Global = "";
  //   global.SubsidyErrors = [];
  //   global.SubsidyFocus = [];

  //   global.Subsidy_Measure_Title_Error = false;
  //   global.Subsidy_Adhoc_Error = false;
  //   global.Granting_Authority_Name_Error = false;
  //   global.scheme_issued_start_year_Error = false;
  //   global.scheme_issued_start_month_Error = false;
  //   global.scheme_issued_start_day_Error = false;
  //   global.scheme_issued_end_year_Error = false;
  //   global.scheme_issued_end_month_Error = false;
  //   global.scheme_issued_end_day_Error = false;

  axios.post.mockResolvedValue({
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
    .post("/subsidymeasurepublished", (req, res))
    .send({ button_value: "" })
    .expect(200, done);
  //   expect(acd).toBe(200);
});
