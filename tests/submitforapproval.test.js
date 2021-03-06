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
const axios = require("axios");
jest.mock("axios");

const mockRequest = (sessionData, body) => ({
  session: { data: sessionData },
  body,
});

test("Unit testing for submit for approval Test for GET call", async () => {
  const req = mockRequest();
  global.dashboard_roles = "";
  global.nodata = "";
  global.noresult = "";

  global.totalSubsidyAward = "";
  global.totalAwaitingAward = "";
  global.totalPublishedAward = "";
  global.totalInactiveAward = "";
  global.totalRejectedAward = "";

  global.UserPrincileObjectGlobal = {};
  global.beis_url_accessmanagement = "";
  global.Subsidy_Full_Amount_Range_Global = "";
  global.Subsidy_Element_Full_Amount_Global = "";
  global.Subsidy_Control_Number_Global = "";
  global.Subsidy_Measure_Title_Global = "";
  global.Subsidy_Objective_Global = "";
  global.SubsidyBulkUpload = "";
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
  global.isCallfromEditAward = "";
  global.Edit_Award_Number_global = "";

  global.start_page = "";
  global.end_page = "";

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
      message: "23456 Award",
    },
  });
  request(app)
    .post("/submitforapproval", (req, res))
    .expect(200);
  // expect(abcd).toBe(200);
});

test("Unit testing for Submit for approval Test for GET call", async () => {
  const req = mockRequest();
  global.dashboard_roles = "";
  global.SubsidyArraySize = 0;
  global.nodata = "";
  global.noresult = "";
  global.UserPrincileObjectGlobal = {};

  global.totalSubsidyAward = "";
  global.totalAwaitingAward = "";
  global.totalPublishedAward = "";
  global.totalInactiveAward = "";
  global.totalRejectedAward = "";

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

  global.start_page = "";
  global.end_page = "";

  global.Award_sorting_field = "";
  global.Award_sorting = "";
  global.subsidy_award_number_arrow = "";
  global.scheme_name_arrow = "";
  global.award_status_arrow = "";
  global.award_recipient_arrow = "";
  global.granting_authority_arrow = "";

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
  global.GA_Selected = "";
  global.dashboard_ga_name = "";
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
    .expect(200);
  // expect(abcd).toBe(200);
});

test("Unit testing for Submit for approval Test for GET call", async () => {
  const req = mockRequest();
  global.dashboard_roles = "";
  global.SubsidyArraySize = 0;
  global.nodata = "";
  global.noresult = "";

  global.totalSubsidyAward = "";
  global.totalAwaitingAward = "";
  global.totalPublishedAward = "";
  global.totalInactiveAward = "";
  global.totalRejectedAward = "";

  global.UserPrincileObjectGlobal = {};
  global.SubsidyErrors = [];
  global.SubsidyFocus = [];
  global.isAddSubsidyPrimarycall = "";
  global.Edit_Award_Number_global = "";
  global.SubsidyBulkUpload = "";
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
  global.dashboard_ga_name = "";
  global.Subsidy_Instrument_Global = "";

  global.Award_sorting_field = "";
  global.Award_sorting = "";
  global.subsidy_award_number_arrow = "";
  global.scheme_name_arrow = "";
  global.award_status_arrow = "";
  global.award_recipient_arrow = "";
  global.granting_authority_arrow = "";

  global.SubsidyAwardNumber = "";
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
      message: "23456 Award",
    },
  });
  request(app)
    .post("/submitforapproval", (req, res))
    .expect(200);
  // expect(abcd).toBe(200);
});
