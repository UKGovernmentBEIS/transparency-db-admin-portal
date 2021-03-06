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

test("Unit testing for Subsidy Award Cancel Test for GET call", async () => {
  const req = mockRequest();
  global.dashboard_roles = "";
  const res = {};
  global.awardnumber = 22;
  global.beis_url_accessmanagement = "";

  global.Award_sorting_field = "";
  global.Award_sorting = "";
  global.subsidy_award_number_arrow = "";
  global.scheme_name_arrow = "";
  global.award_status_arrow = "";
  global.award_recipient_arrow = "";
  global.granting_authority_arrow = "";
  global.Award_status = "";
  request(app)
    .get("/rejectsubsidyaward", (req, res))
    .expect(200);
  //   expect(acd).toBe(200);
});
