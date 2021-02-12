// ***********************************************************
// Automated Unit testing scripts for filter route
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

const res = {};

test("Unit testing for spending filter route - Test for GET call", (done) => {
  const req = mockRequest();
  global.SubsidyArraySize = 0;
  global.beis_url_accessmanagement = "";
  global.Subsidy_Control_Number_Error = "";
  global.Subsidy_Control_Number_Global = "";
  global.Subsidy_Adhoc_Global = "";
  global.Subsidy_Measure_Title_Error = "";
  global.Subsidy_Measure_Title_Global = "";
  global.Subsidy_Instrument_Other_Global = "";
  global.Subsidy_Objective_Error = "";
  global.Subsidy_Objective_Global = "";
  global.Subsidy_Objective_Other_Global = "";
  global.Subsidy_Instrument_Error = "";
  global.Subsidy_Instrument_Global = "";
  global.Subsidy_Full_Amount_Range_Error = "";
  global.Subsidy_Full_Amount_Range_Global = "upto500k";
  global.Subsidy_Element_Full_Amount_Error = "";
  global.Subsidy_Element_Full_Amount_Global = "";
  global.Granting_Authority_Name_Error = "";
  global.Granting_Authority_Name_Global = "";
  global.Legal_Granting_Date_Day_Error = "";
  global.Legal_Granting_Date_Month_Error = "";
  global.Legal_Granting_Date_Year_Error = "";
  global.Legal_Granting_Date_Day_Global = "";
  global.Legal_Granting_Date_Month_Error = "";
  global.Legal_Granting_Date_Year_Error = "";
  global.Legal_Granting_Date_Year_Global = "";
  global.Legal_Granting_Date_Month_Global = "";
  global.Beneficiary_Name_Error = "";
  global.Beneficiary_Name_Global = "";
  global.Size_of_the_Organisation_Error = "";
  global.Size_of_the_Organisation_Global = "";
  global.National_ID_Type_Error = "";
  global.National_ID_Type_Global = "";
  global.National_ID_Number_Error = "";
  global.National_ID_Number_Global = "";
  global.Goods_or_Services_Error = "";
  global.Goods_or_Services_Global = "";
  global.Spending_Region_Error = "";
  global.Spending_Region_Global = "";
  global.Spending_Sector_Error = "";
  global.Subsidy_Objective_Other_Error = "";
  global.Subsidy_Instrument_Other_Error = "";
  global.Subsidy_Adhoc_Error = "";
  global.Spending_Sector_Global = "";
  global.Subsidy_Objective_Plus_Other_Global = "";
  global.Subsidy_Instrument_Plus_Other_Global = "";
  global.isCallfromEditAward = "";
  const res = {};
  request(app)
    .get("/addsubsidyreview", (req, res))
    .send({
      Subsidy_Control_Number_Global: "",
      Subsidy_Measure_Title_Global: "",
      Subsidy_Objective_Global: "",
      Subsidy_Adhoc_Global: "",
      Subsidy_Objective_Other_Global: "",
      Subsidy_Instrument_Other_Global: "",
      Subsidy_Instrument_Global: "",
      Subsidy_Element_Full_Amount_Global: "",
      National_ID_Type_Global: "",
      National_ID_Number_Global: "",
      Beneficiary_Name_Global: "",
      Size_of_the_Organisation_Global: "",
      Granting_Authority_Name_Global: "",
      Legal_Granting_Date_Day_Global: "",
      Legal_Granting_Date_Month_Global: "",
      Legal_Granting_Date_Year_Global: "",
      Subsidy_Objective_Plus_Other_Global: "",
      Subsidy_Instrument_Plus_Other_Global: "",
      Goods_or_Services_Global: "",
      Spending_Region_Global: "",
      Spending_Sector_Global: "",
    })
    .expect(200, done);
  // expect(resp).toBe(200);
});
