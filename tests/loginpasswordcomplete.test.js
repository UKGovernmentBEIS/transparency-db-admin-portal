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

test("Unit testing for login password complete Test for GET call", (done) => {
  const req = mockRequest();
  global.beis_url_accessmanagement = "";
  request(app)
    .get("/loginpasswordcomplete", (req, res))
    .expect(200, done);
});

test("Unit testing for login password complete empty Test for POST call", (done) => {
  const req = mockRequest();
  global.isPasswordEmpty = "";
  request(app)
    .post("/loginpasswordcomplete", (req, res))
    .send({
      password: "1234",
      password1: "",
    })
    .expect(200, done);
});

test("Unit testing for login password complete length less than 8 Test for POST call ", (done) => {
  const req = mockRequest();
  global.isPasswordLengthLessThanTen = "";
  request(app)
    .post("/loginpasswordcomplete", (req, res))
    .send({
      password: "1234567",
      password1: "123456",
    })
    .expect(200, done);
});

test("Unit testing for update results page per route Test for POST call", (done) => {
  const req = mockRequest();
  global.isBothPasswordNotMatching = "";
  request(app)
    .post("/loginpasswordcomplete", (req, res))
    .send({
      password: "123456786",
      password1: "123456875",
    })
    .expect(200, done);
});

test("Unit testing for update results page per route Test for POST call", (done) => {
  const req = mockRequest();
  request(app)
    .post("/loginpasswordcomplete", (req, res))
    .send({
      password: "123456888",
      password1: "123456888",
    })
    .expect(200, done);
});
