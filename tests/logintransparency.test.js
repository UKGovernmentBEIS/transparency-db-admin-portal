// ***********************************************************
// Automated Unit testing scripts for filter route
// ***********************************************************

const index = require("../app");
const request = require("supertest");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use("/", index);
const axios = require("axios");
jest.mock("axios");

const mockRequest = (sessionData, body) => ({
  session: {
    data: sessionData,
  },
  body,
});

test("Unit testing for Login Transparency route Test for GET call", (done) => {
  const req = mockRequest();

  const res = {};
  request(app)
    .get("/logintransparency", (req, res))
    .expect(200, done);
});
