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

test("Unit testing for Subsidy Scheme Edit Test for GET call", (done) => {
  const req = mockRequest();
  const res = {};
  global.beis_url_accessmanagement = "";
  global.User_Role_Global = "";

  global.GA_Name_User_Global = "";
  global.Full_Name_Global = "";
  global.Last_Name_Global = "";
  global.Email_Id_Global = "";
  global.Phone_Number_Global = "";

  request(app)
    .get("/adduser", (req, res))
    .expect(200, done);
  //   expect(acd).toBe(200);
});
