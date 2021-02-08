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

test("Unit testing for submit for approval Test for GET call", (done) => {
  const req = mockRequest();
  global.beis_url_accessmanagement = "";
  global.Subsidy_Full_Amount_Range_Global = "";
  global.Subsidy_Element_Full_Amount_Global = "";
  global.Subsidy_Control_Number_Global = "";
  global.Subsidy_Measure_Title_Global = "";
  global.Subsidy_Objective_Global = "";
  global.Subsidy_Objective_Other_Global = "";
  global.Subsidy_Instrument_Other_Global = "";
  global.Subsidy_Full_Amount_Range_Global = "";
  global.Granting_Authority_Name_Global = "";
  global.Legal_Granting_Date_Day_Global = "01";
  global.Legal_Granting_Date_Month_Global = "01";
  global.Legal_Granting_Date_Year_Global = "2020";
  global.Beneficiary_Name_Global = "";
  global.Size_of_the_Organisation_Global = "";
  global.National_ID_Type_Global = "";
  global.National_ID_Number_Global = "";
  global.Goods_or_Services_Global = "";
  global.Spending_Region_Global = "";
  global.Spending_Sector_Global = "";
  global.Subsidy_Instrument_Global = "";
  global.Subsidy_Control_Number_Global_Substring = "";
  global.beis_url_publishing = "";
  const res = {};
  axios.post.mockResolvedValue({
    status: 200,
    data: {
      totalErrors: 0,
      validationErrorResult: [
        {
          column: "subsidyControlNumber",
          message: "subsidyMeasureTitle",
        },
      ],
    },
  });
  request(app)
    .post("/submitforapproval", (req, res))
    .expect(200, done);
  //   expect(abcd).toBe(200);
});

test("Unit testing for Submit for approval Test for GET call", (done) => {
  const req = mockRequest();
  global.SubsidyArraySize = 0;
  global.SubsidyErrors = [];
  global.SubsidyFocus = [];
  global.isAddSubsidyPrimarycall = "";
  global.Edit_Award_Number_global = "";
  global.isCallfromEditAward = "";
  global.Subsidy_Full_Amount_Range_Global = "";
  global.Subsidy_Element_Full_Amount_Global = "";
  global.Subsidy_Adhoc_Global = "";
  global.Subsidy_Control_Number_Global = "";
  global.Subsidy_Measure_Title_Global = "";
  global.Subsidy_Objective_Global = "";
  global.Subsidy_Objective_Other_Global = "";
  global.Subsidy_Instrument_Other_Global = "";
  global.Subsidy_Full_Amount_Range_Global = "";
  global.Granting_Authority_Name_Global = "";
  global.Legal_Granting_Date_Day_Global = "01";
  global.Legal_Granting_Date_Month_Global = "01";
  global.Legal_Granting_Date_Year_Global = "2020";
  global.Subsidy_Objective_Plus_Other_Global = "";
  global.Subsidy_Instrument_Plus_Other_Global = "";
  global.Beneficiary_Name_Global = "";
  global.Size_of_the_Organisation_Global = "";
  global.National_ID_Type_Global = "";
  global.National_ID_Number_Global = "";
  global.Goods_or_Services_Global = "";
  global.Spending_Region_Global = "";
  global.Spending_Sector_Global = "";
  global.Subsidy_Instrument_Global = "";
  global.Subsidy_Control_Number_Global_Substring = "";

  global.Subsidy_Control_Number_Error = "";
  global.Subsidy_Measure_Title_Error = "";
  global.Subsidy_Objective_Error = "";
  global.Subsidy_Instrument_Error = "";
  global.Subsidy_Element_Full_Amount_Error = "";
  global.Subsidy_Full_Amount_Range_Error = "";
  global.National_ID_Type_Error = "";
  global.National_ID_Number_Error = "";
  global.Beneficiary_Name_Error = "";
  global.Subsidy_Adhoc_Error = "";
  global.Size_of_the_Organisation_Error = "";
  global.Granting_Authority_Name_Error = "";
  global.Legal_Granting_Date_Day_Error = "";
  global.Legal_Granting_Date_Month_Error = "";
  global.Legal_Granting_Date_Year_Error = "";
  global.Goods_or_Services_Error = "";
  global.Spending_Region_Error = "";
  global.Subsidy_Objective_Other_Error = "";
  global.Subsidy_Instrument_Other_Error = "";
  global.Spending_Sector_Error = "";
  global.SubsidyErrors = "";
  global.SubsidyArraySize = "";
  global.SubsidyFocus = "";
  global.isAddSubsidyPrimarycall = "";
  global.Subsidy_Control_Number_Global_Substring = "";
  global.beis_url_publishing = "";
  const res = {};
  axios.post.mockResolvedValue({
    status: 200,
    data: {
      totalErrors: 1,
      validationErrorResult: [
        {
          column: "grantingAuthorityName",
          message: "",
        },
      ],
    },
  });
  request(app)
    .post("/submitforapproval", (req, res))
    .expect(200, done);
  // expect(abcd).toBe(200);
});

test("Unit testing for Submit for approval Test for GET call", (done) => {
  const req = mockRequest();
  global.SubsidyArraySize = 0;
  global.SubsidyErrors = [];
  global.SubsidyFocus = [];
  global.isAddSubsidyPrimarycall = "";
  global.Edit_Award_Number_global = "";
  global.isCallfromEditAward = "";
  global.Subsidy_Full_Amount_Range_Global = "";
  global.Subsidy_Element_Full_Amount_Global = "";
  global.Subsidy_Control_Number_Global = "";
  global.Subsidy_Measure_Title_Global = "";
  global.Subsidy_Objective_Global = "";
  global.Subsidy_Objective_Other_Global = "";
  global.Subsidy_Full_Amount_Range_Global = "";
  global.Subsidy_Instrument_Other_Global = "";
  global.Granting_Authority_Name_Global = "";
  global.Legal_Granting_Date_Day_Global = "01";
  global.Legal_Granting_Date_Month_Global = "01";
  global.Legal_Granting_Date_Year_Global = "2020";
  global.Beneficiary_Name_Global = "";
  global.Size_of_the_Organisation_Global = "";
  global.National_ID_Type_Global = "";
  global.National_ID_Number_Global = "";
  global.Goods_or_Services_Global = "";
  global.Spending_Region_Global = "";
  global.Spending_Sector_Global = "";
  global.Subsidy_Instrument_Global = "";
  global.Subsidy_Control_Number_Global_Substring = "";
  global.beis_url_publishing = "";
  const res = {};
  axios.post.mockResolvedValue({
    status: 400,
    data: {
      validationErrorResult: [
        {
          column: "grantingAuthorityName",
          message: "",
        },
      ],
    },
  });
  request(app)
    .post("/submitforapproval", (req, res))
    .expect(200, done);
  //   expect(abcd).toBe(200);
});
