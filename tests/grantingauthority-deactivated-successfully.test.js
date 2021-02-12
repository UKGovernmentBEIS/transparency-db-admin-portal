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

test("Unit testing for deactivate GA Test for GET call", (done) => {
  const req = mockRequest();
  global.beis_url_accessmanagement = "";
  global.gaId = "";
  const res = {};
  axios.delete.mockResolvedValue({
    status: 200,
  });
  request(app)
    .post("/gadeactivated", (req, res))
    .send({ gaid: "", ganame: "" })
    //   expect(abcd).toBe(200);
    .expect(200, done);
});
