// ***********************************************************
// Automated Unit testing scripts for filter route
// ***********************************************************

const index = require("../app");
const request = require("supertest");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");
jest.mock("axios");
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

const mockRequest = (sessionData, body) => ({
  session: {
    data: sessionData,
  },
  body,
});

test("Unit testing for cancel subsidy award Test for GET call", (done) => {
  const req = mockRequest();
  global.dashboard_roles = "";
  global.beis_url_accessmanagement = "";
  global.grantingAuthorityName_Error_Msg = "";
  global.process.argv = ["", "", "env=dev"];
  global.grantingAuthorityName_Global = "";
  global.UserPrincileObjectGlobal = {};
  global.grantingAuthorityName_Error = "";
  global.review = "true";
  global.gaID = "";
  const res = {};
  axios.put.mockResolvedValue({
    status: 200,
    gaId: "",
  });
  request(app)
    .post("/submitgrantingauthority", (req, res))
    .send({
      editReview: "true",
      grantingAuthorityID: "22",
      grantingAuthorityName: "BEIS HMRC",
    })
    // expect(abcd).toBe(200);
    .expect(200, done);
});

test("Unit testing for cancel subsidy award Test for GET call", (done) => {
  const req = mockRequest();
  global.dashboard_roles = "";
  global.beis_url_accessmanagement = "";
  global.gaID = "";
  global.grantingAuthorityName_Error_Msg = "";
  global.process.argv = ["", "", "env=dev"];
  global.grantingAuthorityName_Global = "";
  global.grantingAuthorityName_Error = "";
  global.UserPrincileObjectGlobal = {};
  global.review = "";
  const res = {};
  axios.post.mockResolvedValue({
    status: 200,
    gaId: "",
  });
  request(app)
    .post("/submitgrantingauthority", (req, res))
    .send({
      editReview: "",
      GaName: "",
    })
    // expect(abcd).toBe(200);
    .expect(200, done);
});
