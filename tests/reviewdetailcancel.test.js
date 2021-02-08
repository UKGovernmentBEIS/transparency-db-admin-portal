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

test("Unit testing for Subsidy Award Cancel Test for GET call", (done) => {
  const req = mockRequest();
  global.beis_url_accessmanagement = "";
  global.Subsidy_Control_Number_Global_Substring = "";
  global.Subsidy_Instrument_Global = "";
  global.Subsidy_Element_Full_Amount_Global = "";
  global.Legal_Granting_Date_Month_Global = "";
  global.Subsidy_Control_Number_Global = "";
  global.Subsidy_Measure_Title_Global = "";
  global.Subsidy_Objective_Global = "";
  global.Subsidy_Objective_Plus_Other_Global = "";
  global.Subsidy_Instrument_Plus_Other_Global = "";
  global.Subsidy_Objective_Other_Global = "";
  global.Subsidy_Instrument_Other_Global = "";
  global.Subsidy_Full_Amount_Range_Global = "";
  global.Granting_Authority_Name_Global = "";
  global.Legal_Granting_Date_Day_Global = "";
  global.GetMonthName = "";
  global.Legal_Granting_Date_Year_Global = "";
  global.Beneficiary_Name_Global = "";
  global.Size_of_the_Organisation_Global = "";
  global.National_ID_Type_Global = "";
  global.National_ID_Number_Global = "";
  global.Goods_or_Services_Global = "";
  global.Spending_Region_Global = "";
  global.Spending_Sector_Global = "";
  global.Subsidy_Instrument_Global = "";
  const res = {};
  request(app)
    .get("/reviewdetailcancel", (req, res))
    .expect(200, done);
  // expect(abcd).toBe(200);
});
