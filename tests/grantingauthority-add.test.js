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

const mockRequest = (sessionData, body) => ({
  session: {
    data: sessionData,
  },
  body,
});

test("Unit testing for cancel subsidy award Test for GET call", async () => {
  const req = mockRequest();
  global.dashboard_roles = "";
  global.beis_url_accessmanagement = "";
  global.grantingAuthorityID_Global = "";
  global.grantingAuthorityName_Error = "";
  global.grantingAuthorityName_Global = "";
  const res = {};
  request(app)
    .get("/addgrantingauthority", (req, res))
    .query({ change: "70" })
    .expect(200);
});

test("Unit testing for cancel subsidy award Test for GET call", async () => {
  const req = mockRequest();
  global.dashboard_roles = "";
  global.beis_url_accessmanagement = "";
  global.grantingAuthorityID_Global = "";
  global.grantingAuthorityName_Error = "";
  global.grantingAuthorityName_Global = "";
  const res = {};
  request(app)
    .get("/addgrantingauthority", (req, res))
    .query({ totalrecords: "70" })
    .expect(200);
});
