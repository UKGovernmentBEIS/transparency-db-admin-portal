// ***********************************************************
// Automated Unit testing scripts for search results award route
// ***********************************************************

const index = require("../app");
const request = require("supertest");
const express = require("express");
const app = express();
var session = require("express-session");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session);
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", index);

const mockRequest = (sessionData, body) => ({
  session: { data: sessionData },
  body,
});

test("Unit testing for Subsidy Scheme Edit Test for GET call", async () => {
  const req = mockRequest();
  global.dashboard_roles = "";
  const res = {};
  global.ssn = {};
  global.beis_url_accessmanagement = "";
  global.User_Role_Global = "";
  global.dashboard_ga_name = "";
  global.dashboard_user_name = "";
  global.GA_Name_User_Global = "";
  global.Full_Name_Global = "";
  global.Last_Name_Global = "";
  global.Email_Id_Global = "";
  global.Phone_Number_Global = "";

  request(app)
    .get("/adduser", (req, res))
    .expect(200);
  // expect(acd).toBe(200);
});
