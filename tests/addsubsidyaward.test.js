// ***********************************************************
// Automated Unit testing scripts for filter route
// ***********************************************************

const index = require("../app");
const request = require("supertest");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use("/", index);
const axios = require("axios");
jest.mock("axios");

const mockRequest = (sessionData, body) => ({
  session: {
    data: sessionData,
  },
  body,
});

test("Unit testing for spending filter route - Test for POST call", (done) => {
  global.locals.SubsidyArraySize = 0;
  global.locals.Subsidy_Control_Number_Error = "";
  global.locals.Subsidy_Control_Number_Global = "";
  global.locals.Subsidy_Measure_Title_Error = "";
  global.locals.Subsidy_Measure_Title_Global = "";
  global.locals.Subsidy_Objective_Error = "";
  global.locals.Subsidy_Objective_Global = "";
  global.locals.Subsidy_Instrument_Error = "";
  global.locals.Subsidy_Instrument_Global = "";
  global.locals.Subsidy_Full_Amount_Range_Error = "";
  global.locals.Subsidy_Full_Amount_Range_Global = "upto500k";
  global.locals.Subsidy_Element_Full_Amount_Error = "";
  global.locals.Subsidy_Element_Full_Amount_Global = "";
  global.locals.Granting_Authority_Name_Error = "";
  global.locals.Granting_Authority_Name_Global = "";
  global.locals.Legal_Granting_Date_Day_Error = "";
  global.locals.Legal_Granting_Date_Month_Error = "";
  global.locals.Legal_Granting_Date_Year_Error = "";
  global.locals.Legal_Granting_Date_Day_Global = "";
  global.locals.Legal_Granting_Date_Month_Error = "";
  global.locals.Legal_Granting_Date_Year_Error = "";
  global.locals.Legal_Granting_Date_Year_Global = "";
  global.locals.Legal_Granting_Date_Month_Global = "";
  global.locals.Beneficiary_Name_Error = "";
  global.locals.Beneficiary_Name_Global = "";
  global.locals.Size_of_the_Organisation_Error = "";
  global.locals.Size_of_the_Organisation_Global = "";
  global.locals.National_ID_Type_Error = "";
  global.locals.National_ID_Type_Global = "";
  global.locals.National_ID_Number_Error = "";
  global.locals.National_ID_Number_Global = "";
  global.locals.Goods_or_Services_Error = "";
  global.locals.Goods_or_Services_Global = "";
  global.locals.Spending_Region_Error = "";
  global.locals.Spending_Region_Global = "";
  global.locals.Spending_Sector_Error = "";
  global.locals.Spending_Sector_Global = "";
  const req = mockRequest();

  const res = {};
  request(app)
    .post("/addsubsidyaward", (req, res))
    .expect(200, done);
});

test("Unit testing for filter route Test for GET call", (done) => {
  const req = mockRequest();

  const res = {};
  request(app)
    .get("/addsubsidyaward", (req, res))
    .expect(200, done);
});
