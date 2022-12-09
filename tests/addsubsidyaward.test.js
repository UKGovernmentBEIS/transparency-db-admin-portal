// ***********************************************************
// Automated Unit testing scripts for filter route
// ***********************************************************

const index = require("../app");
const request = require("supertest");
const express = require("express");
const app = express();
var session = require("express-session");
const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(session);
app.use(bodyParser.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use("/", index);
const axios = require("axios");

jest.mock("axios");
const mockRequest = (sessionData) => {
  return {
    session: sessionData,
  };
};

test("Unit testing for spending filter route - Test for POST call", async () => {
  const req = mockRequest({
    dashboard_roles_object_id1: "",
    dashboard_roles_object_id2: "",
  });
  global.ssn = req.session;
  ssn.dashboard_roles = "";
  ssn.SubsidyArraySize = 0;
  ssn.SubsidyFocus = [];
  ssn.SubsidyErrors = [];

  global.isAddSubsidyPrimarycall = false;
  global.isCallfromEditAward = false;
  ssn.Edit_Award_Number_global = "";
  ssn.beis_url_accessmanagement = "";
  ssn.Subsidy_Element_Full_Amount_Exceed_Error = "";
  ssn.Granting_Authority_Valid_Name_Error = "";
  ssn.Subsidy_Full_Amount_Range_Exceed_Error = "";
  ssn.Subsidy_Control_Number_Error = "";
  ssn.Subsidy_Control_Number_Name_Global = "";
  ssn.Subsidy_Measure_Title_Error = "";
  ssn.Subsidy_Measure_Title_Global = "";
  ssn.Subsidy_Objective_Error = "";
  ssn.Subsidy_Objective_Global = "";
  ssn.Subsidy_Instrument_Error = "";
  ssn.Subsidy_Instrument_Global = "";
  ssn.Subsidy_Full_Amount_Range_Error = "";
  ssn.Subsidy_Full_Amount_Range_Global = "upto500k";
  ssn.Subsidy_Element_Full_Amount_Error = "";
  ssn.Subsidy_Element_Full_Amount_Global = "";
  ssn.Granting_Authority_Name_Error = "";
  ssn.Granting_Authority_Name_Global = "";
  ssn.Legal_Granting_Date_Day_Error = "";
  ssn.Legal_Granting_Date_Month_Error = "";
  ssn.Legal_Granting_Date_Year_Error = "";
  ssn.Legal_Granting_Date_Day_Global = "";
  ssn.Legal_Granting_Date_Year_Global = "";
  ssn.Legal_Granting_Date_Month_Global = "";
  ssn.Beneficiary_Name_Error = "";
  ssn.Beneficiary_Name_Global = "";
  ssn.Size_of_the_Organisation_Error = "";
  ssn.Size_of_the_Organisation_Global = "";
  ssn.National_ID_Type_Error = "";
  ssn.National_ID_Type_Global = "";
  ssn.National_ID_Number_Error = "";
  ssn.National_ID_Number_Global = "";
  ssn.Goods_or_Services_Error = "";
  ssn.Goods_or_Services_Global = "";
  ssn.Spending_Region_Error = "";
  ssn.Spending_Region_Global = "";
  ssn.Spending_Sector_Error = "";
  ssn.Spending_Sector_Global = "";
  ssn.dashboard_ga_name = "";

  ssn.Subsidy_Measure_Title_255_Error = "";
  ssn.Granting_Authority_URL_255_Error = "";
  ssn.Granting_Authority_Policy_255_Error = "";
  ssn.SC_Not_active = "";
  ssn.Subsidy_Objective_Other_255_Error = "";
  ssn.Subsidy_Instrument_Other_255_Error = "";
  ssn.Beneficiary_Name_255_Error = "";
  ssn.Maximum_Amount_Under_Scheme_Error = "";
  ssn.Maximum_Amount_Under_Scheme_255_Error = "";

  ssn.dashboard_roles_object_id1 = "";
  ssn.dashboard_roles_object_id2 = "";
  const res = {};

  request(app)
    .post("/addsubsidyaward", (req, res))
    .query({ scheme: 23 })
    .send({
      dashboard_roles_object_id1: "",
      dashboard_roles_object_id2: "",
    })
    .set(req.session, {
      dashboard_roles_object_id1: "",
      dashboard_roles_object_id2: "",
    })
    .expect(200);
  // expect(next).toHaveBeenCalled();

  // expect(abcd).toBe(200);
});

test("Unit testing for filter route Test for GET call", async () => {
  const req = mockRequest({
    dashboard_roles_object_id1: "",
    dashboard_roles_object_id2: "",
  });
  req.session.destroy = jest.fn().mockImplementation((fn) => fn(false));
  ssn = req.session;
  ssn.dashboard_roles = "";
  ssn.SubsidyArraySize = 0;
  ssn.SubsidyFocus = [];
  ssn.SubsidyErrors = [];

  global.isAddSubsidyPrimarycall = false;
  global.isCallfromEditAward = false;
  ssn.beis_url_accessmanagement = "";
  ssn.Edit_Award_Number_global = "";
  ssn.Subsidy_Element_Full_Amount_Exceed_Error = "";
  ssn.Granting_Authority_Valid_Name_Error = "";
  ssn.Subsidy_Full_Amount_Range_Exceed_Error = "";
  ssn.Subsidy_Control_Number_Error = "";
  ssn.Subsidy_Control_Number_Name_Global = "";
  ssn.Subsidy_Measure_Title_Error = "";
  ssn.Subsidy_Measure_Title_Global = "";
  ssn.Subsidy_Objective_Error = "";
  ssn.Subsidy_Objective_Global = "";
  ssn.Subsidy_Instrument_Error = "";
  ssn.Subsidy_Instrument_Global = "";
  ssn.Subsidy_Full_Amount_Range_Error = "";
  ssn.Subsidy_Full_Amount_Range_Global = "upto500k";
  ssn.Subsidy_Element_Full_Amount_Error = "";
  ssn.Subsidy_Element_Full_Amount_Global = "";
  ssn.Granting_Authority_Name_Error = "";
  ssn.Granting_Authority_Name_Global = "";
  ssn.Legal_Granting_Date_Day_Error = "";
  ssn.Legal_Granting_Date_Month_Error = "";
  ssn.Legal_Granting_Date_Year_Error = "";
  ssn.Legal_Granting_Date_Day_Global = "";
  ssn.Legal_Granting_Date_Year_Global = "";
  ssn.Legal_Granting_Date_Month_Global = "";
  ssn.Beneficiary_Name_Error = "";
  ssn.Beneficiary_Name_Global = "";
  ssn.Size_of_the_Organisation_Error = "";
  ssn.Size_of_the_Organisation_Global = "";
  ssn.National_ID_Type_Error = "";
  ssn.National_ID_Type_Global = "";
  ssn.National_ID_Number_Error = "";
  ssn.National_ID_Number_Global = "";
  ssn.Goods_or_Services_Error = "";
  ssn.Goods_or_Services_Global = "";
  ssn.Spending_Region_Error = "";
  ssn.Spending_Region_Global = "";
  ssn.Spending_Sector_Error = "";
  ssn.Spending_Sector_Global = "";
  ssn.dashboard_ga_name = "";
  ssn.dashboard_roles_object_id1 = "";
  ssn.dashboard_roles_object_id2 = "";
  ssn.Subsidy_Measure_Title_255_Error = "";
  ssn.Granting_Authority_URL_255_Error = "";
  ssn.Granting_Authority_Policy_255_Error = "";
  ssn.SC_Not_active = "";
  ssn.Subsidy_Objective_Other_255_Error = "";
  ssn.Subsidy_Instrument_Other_255_Error = "";
  ssn.Beneficiary_Name_255_Error = "";
  ssn.Maximum_Amount_Under_Scheme_Error = "";
  ssn.Maximum_Amount_Under_Scheme_255_Error = "";

  const res = {};
  request(app)
    .get("/addsubsidyaward", (req, res))
    .query({ scheme: 23 })
    .send({ isAddSubsidyPrimarycall: false, isCallfromEditAward: false })
    .set("cookie", {
      dashboard_roles_object_id1: "",
      dashboard_roles_object_id2: "",
    })
    .expect(200);
  // expect(abcd).toBe(200);
});
