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
  global.Subsidy_Control_Number_Global = "";
  global.Subsidy_Measure_Title_Global = "";
  global.Subsidy_Objective_Global = "";
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
    .get("/reviewdetail", (req, res))
    .expect(200, done);
  //   expect(abcd).toBe(200);
});
test("Unit testing for Subsidy Award Cancel Test for POSt call", (done) => {
  const req = mockRequest();
  global.Subsidy_Control_Number = "";
  global.Subsidy_Measure_Title = "";
  global.Subsidy_Objective = "";
  global.Subsidy_Instrument = "";
  global.Subsidy_Element_Full_Amount = "";
  global.Subsidy_Full_Amount_Range = "";
  global.National_ID_Type = "";
  global.National_ID_Number = "";
  global.Beneficiary_Name = "";
  global.Size_of_the_Organisation = "";
  global.Granting_Authority_Name = "";
  global.Legal_Granting_Date_Day = "";
  global.Legal_Granting_Date_Month = "";
  global.Legal_Granting_Date_Year = "";
  global.Goods_or_Services = "";
  global.Spending_Region = "";
  global.Spending_Sector = "";
  global.mylink = "";
  global.buttonvalue = "";
  const res = {};
  request(app)
    .post("/reviewdetail", (req, res))
    .expect(200, done);
  //   expect(abcd).toBe(200);
});

test("Unit testing for Subsidy Award Cancel Test for POSt call", (done) => {
  const req = mockRequest();
  global.Subsidy_Control_Number = "";
  global.Subsidy_Measure_Title = "";
  global.Subsidy_Objective = "";
  global.Subsidy_Instrument = "";
  global.Subsidy_Element_Full_Amount = "";
  global.Subsidy_Full_Amount_Range = "";
  global.National_ID_Type = "";
  global.National_ID_Number = "";
  global.Beneficiary_Name = "";
  global.Size_of_the_Organisation = "";
  global.Granting_Authority_Name = "";
  global.Legal_Granting_Date_Day = "";
  global.Legal_Granting_Date_Month = "";
  global.Legal_Granting_Date_Year = "";
  global.Goods_or_Services = "";
  global.Spending_Region = "Empty";
  global.Spending_Sector = "Empty";
  global.mylink = "";
  global.buttonvalue = "continue";

  const res = {};
  request(app)
    .post("/reviewdetail", (req, res))
    .expect(200, done);
  //   expect(abcd).toBe(200);
});
