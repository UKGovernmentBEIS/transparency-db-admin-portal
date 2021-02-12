// ***********************************************************
// Automated Unit testing scripts for subsidy objective route
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

test("Unit testing for edit granting authority", (done) => {
  const req = mockRequest();
  global.beis_url_accessmanagement = "";
  global.grantingAuthorityID_Global = "";
  global.grantingAuthorityName_Global = "";
  global.grantingAuthorityName_Error = "";
  const res = {};
  request(app)
    .get("/editgrantingauthority", (req, res))
    .query({ edit: "" })
    .expect(200, done);
  // expect(abcd).toBe(200);
});
