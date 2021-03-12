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

const mockRequest = (sessionData, body) => ({
  session: {
    data: sessionData,
  },
  body,
});

test("Unit testing for filter route Test for GET call", (done) => {
  const req = mockRequest();
  global.dashboard_roles = "";
  global.fetchawarddetails = {
    subsidyMeasure: {
      scNumber: "",
      subsidyMeasureTitle: "",
      adhoc: "",
    },
    subsidyObjective: "",
    grantingAuthorityResponse: {
      grantingAuthorityName: "",
    },
    awardNumber: "",
    legalGrantingDate: "2020 03 02",
    goodsServicesFilter: "",
    spendingRegion: "",
    spendingSector: "",
    beneficiary: {
      nationalIdType: "",
      nationalId: "",
      beneficiaryName: "",
      orgSize: "",
    },
    subsidyInstrument: "",
    subsidyFullAmountRange: "",
    subsidyFullAmountExact: "",
  };

  global.isCallfromEditAward = "";
  global.Subsidy_Adhoc_Global = "";
  global.beis_url_accessmanagement = "";
  global.Subsidy_Control_Number_Error = "";
  global.Subsidy_Control_Number_Global = "";
  global.Subsidy_Measure_Title_Error = "";
  global.Subsidy_Measure_Title_Global = "";
  global.Subsidy_Objective_Error = "";
  global.Subsidy_Objective_Global = "";
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
  global.dashboard_ga_name = "";
  global.Spending_Sector_Global = "";
  const res = {};
  request(app)
    .get("/addsubsidyeditaward", (req, res))
    .expect(200, done);
});
