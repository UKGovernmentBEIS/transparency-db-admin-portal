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

const mockRequest = (sessionData, body) => ({
  session: { data: sessionData },
  body,
});

test("Unit testing for Subsidy Award Cancel Test for GET call", (done) => {
  const req = mockRequest();
  const res = {};

  request(app)
    .get("/subsidyawardcancel", (req, res))
    .send({
      Subsidy_Control_Number: "SC1033",
      Subsidy_Measure_Title: "",
      Subsidy_Objective: "",
      Subsidy_Instrument: "",
      Subsidy_Element_Full_Amount: "",
      Subsidy_Full_Amount_Range: "",
      National_ID_Type: "",
      National_ID_Number: "",
      Beneficiary_Name: "",
      Size_of_the_Organisation: "",
      Granting_Authority_Name: "",
      Legal_Granting_Date_Day: "",
      Legal_Granting_Date_Month: "",
      Legal_Granting_Date_Year: "",
      Goods_or_Services: "",
      Spending_Region: "",
      Spending_Sector: "",
    })
    .expect(200, done);
  //   expect(acd).toBe(200);
});
