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
  global.User_Role_Single = "";
  global.User_GA_Name = "";
  global.User_Name_Single = "";
  global.GA_Selected = "";
  global.User_Last_Name_Single = "";
  global.User_Email_Single = "";
  global.User_Mobile_Single = "";
  global.GAUserList = {
    value: [
      {
        id: "",
        roleName: "",
        displayName: "",
        surname: "",
        userPrincipalName: "",
        mobilePhone: "",
      },
    ],
  };
  request(app)
    .get("/userindividualdetails", (req, res))
    .query({ userObject: " 21" })
    .expect(200, done);
  //   expect(acd).toBe(200);
});
