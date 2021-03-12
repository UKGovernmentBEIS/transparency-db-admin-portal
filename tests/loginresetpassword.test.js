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

test("Unit testing for Login Reset password Test for GET call", (done) => {
  const req = mockRequest();
  global.dashboard_roles = "";
  const res = {};
  global.beis_url_accessmanagement = "";
  request(app)
    .get("/loginresetpassword", (req, res))
    .expect(200, done);
  //   expect(acd).toBe(200);
});

test("Unit testing for Login Reset password test for Post call", (done) => {
  const req = mockRequest();
  global.dashboard_roles = "";
  const res = {};
  global.beis_url_accessmanagement = "";
  request(app)
    .post("/loginresetpassword", (req, res))
    .expect(200, done);
  //   expect(acd).toBe(200);
});
