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
const axios = require("axios");
jest.mock("axios");

const mockRequest = (sessionData, body) => ({
  session: { data: sessionData },
  body,
});

test("Unit testing for Subsidy Scheme Edit Test for GET call", (done) => {
  const req = mockRequest();
  const res = {};
  global.user_id = "";
  global.UserPrincileObjectGlobal = {};
  global.dashboard_roles = "";
  global.beis_url_accessmanagement = "";
  global.Full_Name_Global = "";
  global.dashboard_ga_name = "";
  global.dashboard_user_name = "";
  axios.get.mockResolvedValue({
    status: 200,
    data: {
      totalSearchResults: 10,
      currentPage: 1,
      totalPages: 1,
      gaList: [
        {
          grantingAuthorityId: 2,
          grantingAuthorityName: "0",
          approvedBy: "Researcg",
          status: "Research and development",
          createdTimestamp: "2020-12-27T17:29:03.202013",
          lastModifiedTimestamp: "2020-12-27T17:29:03.202013",
        },
      ],
    },
  });
  request(app)
    .get("/useraccount", (req, res))
    .expect(200, done);
  // expect(acd).toBe(200);
});
