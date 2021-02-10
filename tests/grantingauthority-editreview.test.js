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

const mockRequest = (sessionData, body) => ({
  session: {
    data: sessionData,
  },
  body,
});

test("Unit testing for cancel subsidy award Test for GET call", (done) => {
  const req = mockRequest();
  global.beis_url_accessmanagement = "";
  global.grantingAuthorityID_Global = "";
  grantingAuthorityName_Global = "";
  grantingAuthorityPublish_Global = "";
  const res = {};
  request(app)
    .get("/editreviewgrantingauthority", (req, res))
    .send({ gaName: "" })
    .expect(200, done);
});
