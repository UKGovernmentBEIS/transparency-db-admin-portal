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

test("Unit testing for Subsidy Scheme Review Test for GET call", (done) => {
  const req = mockRequest();
  const res = {};
  Subsidy_Adhoc_Global = "";
  Subsidy_Measure_Title_Global = "";
  Legal_Basis_Global = "";
  Granting_Authority_URL_Global = "";
  Granting_Authority_Policy_Global = "";
  Budget_Global = "";
  Scheme_Start_Day_Global = "";
  GetMonthName = "";
  Scheme_Start_Year_Global = "";
  Scheme_End_Day_Global = "";
  GetMonthName = "";
  Scheme_End_Year_Global = "";
  request(app)
    .get("/reviewsubsidymeasures", (req, res))
    .expect(200, done);
  //   expect(acd).toBe(200);
});
