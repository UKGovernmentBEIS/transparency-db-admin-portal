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
const axios = require("axios");
jest.mock("axios");

const mockRequest = (sessionData, body) => ({
  session: { data: sessionData },
  body,
});

const res = {};

test("Unit testing for login email confirmation Test for POST call", (done) => {
  const req = mockRequest();
  global.isEmailEmpty = "";
request(app)
    .post("/loginemailconfirmation", (req, res))
    .send({
        email_address: "",
    })
  .expect(200, done);
});

test("Unit testing for login email confirmation Test for POST call", (done) => {
    const req = mockRequest();
    global.isEmailValid = "";
  request(app)
      .post("/loginemailconfirmation", (req, res))
      .send({
          email_address: "2008389",
      })
    .expect(200, done);
  });

  test("Unit testing for login email confirmation Test for POST call", (done) => {
    const req = mockRequest();
  request(app)
      .post("/loginemailconfirmation", (req, res))
      .send({
          email_address: "2008389@cognizant.com",
      })
    .expect(200, done);
  });