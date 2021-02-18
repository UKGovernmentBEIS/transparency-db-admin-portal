// ***********************************************************
// Automated Unit testing scripts for update results page per route
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

const res = {};

test("Unit testing for login Forgot Password Test for GET call", (done) => {
  const req = mockRequest();
  global.dashboard_roles = "";
  global.beis_url_accessmanagement = "";
  request(app)
    .get("/loginnewpassword", (req, res))
    .expect(200, done);
});
