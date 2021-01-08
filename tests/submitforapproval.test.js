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
  global.Subsidy_Full_Amount_Range_Global = "";
  global.Subsidy_Element_Full_Amount_Global = "";
  global.Subsidy_Control_Number_Global = "";
  global.Subsidy_Measure_Title_Global = "";
  global.Subsidy_Objective_Global = "";
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
  global.Subsidy_Control_Number_Error = "";
  global.Subsidy_Measure_Title_Error = "";
  global.Subsidy_Objective_Error = "";
  global.Subsidy_Instrument_Error = "";
  global.Subsidy_Element_Full_Amount_Error = "";
  global.Subsidy_Full_Amount_Range_Error = "";
  global.National_ID_Type_Error = "";
  global.National_ID_Number_Error = "";
  global.Beneficiary_Name_Error = "";
  global.Size_of_the_Organisation_Error = "";
  global.Granting_Authority_Name_Error = "";
  global.Legal_Granting_Date_Day_Error = "";
  global.Legal_Granting_Date_Month_Error = "";
  global.Legal_Granting_Date_Year_Error = "";
  global.Goods_or_Services_Error = "";
  global.Spending_Region_Error = "";
  global.Spending_Sector_Error = "";

  global.SubsidyErrors = "";
  global.SubsidyArraySize = "";
  global.SubsidyFocus = "";

  global.isAddSubsidyPrimarycall = "";
  const res = {};
  axios.get.mockResolvedValue({
    status: 200,
    data: {
      validationErrorResult: [
        {
          column: "",
          message: "",
        },
      ],
    },
  });
  var abcd = await request(app)
    .post("/submitforapproval", (req, res))
    .send({
      Subsidy_Control_Number_Global: "",
      Subsidy_Measure_Title_Global: "",
      Subsidy_Objective_Global: "",
      Subsidy_Instrument_Global: "",
      Subsidy_Element_Full_Amount_Global: "",
      Subsidy_Full_Amount_Range_Global: "",
      National_ID_Type_Global: "",
      National_ID_Number_Global: "",
      Beneficiary_Name_Global: "",
      Size_of_the_Organisation_Global: "",
      Granting_Authority_Name_Global: "",
      Legal_Granting_Date_Day_Global: "",
      Legal_Granting_Date_Month_Global: "",
      Legal_Granting_Date_Year_Global: "",
      Goods_or_Services_Global: "",
      Spending_Region_Global: "",
      Spending_Sector_Global: "",

      Subsidy_Control_Number_Error: "",
      Subsidy_Measure_Title_Error: "",
      Subsidy_Objective_Error: "",
      Subsidy_Instrument_Error: "",
      Subsidy_Element_Full_Amount_Error: "",
      Subsidy_Full_Amount_Range_Error: "",
      National_ID_Type_Error: "",
      National_ID_Number_Error: "",
      Beneficiary_Name_Error: "",
      Size_of_the_Organisation_Error: "",
      Granting_Authority_Name_Error: "",
      Legal_Granting_Date_Day_Error: "",
      Legal_Granting_Date_Month_Error: "",
      Legal_Granting_Date_Year_Error: "",
      Goods_or_Services_Error: "",
      Spending_Region_Error: "",
      Spending_Sector_Error: "",

      SubsidyErrors: "",
      SubsidyArraySize: "",
      SubsidyFocus: "",

      isAddSubsidyPrimarycall: "",
    })
  .expect(200, done);
//   expect(abcd).toBe(200);
});

test("Unit testing for Subsidy Award Cancel Test for GET call", (done) => {
  const req = mockRequest();
  global.Subsidy_Full_Amount_Range_Global = "";
  global.Subsidy_Element_Full_Amount_Global = "";
  global.Subsidy_Control_Number_Global = "";
  global.Subsidy_Measure_Title_Global = "";
  global.Subsidy_Objective_Global = "";
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

  const res = {};
  axios.get.mockResolvedValue({
    status: 400,
    data: {
      validationErrorResult: [
        {
          column: "",
          message: "",
        },
      ],
    },
  });
  request(app)
    .post("/submitforapproval", (req, res))
    .send({
      Subsidy_Control_Number_Global: "",
      Subsidy_Control_Number_Global_Substring: "",
    })
    .expect(200, done);
  //   expect(abcd).toBe(200);
});
