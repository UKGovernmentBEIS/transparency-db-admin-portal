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

test("Unit testing for cancel subsidy award Test for GET call", (done) => {
  const req = mockRequest();
  global.beis_url_accessmanagement = "";
  global.azGrpId = "";
  global.gaid = "";
  global.ganame = "";
  global.gaListArr = [
    {
      id: "911c0701-a028-40dd-9465-7c9d4bd0b7c8",
      displayName: "devhmrcgaapprover",
      givenName: "devhmrcgaapproverFN",
      surname: "devhmrcgaapproverLN",
      userPrincipalName: "devhmrcgaapprover@beisdevcts.onmicrosoft.com",
    },
  ];

  axios.get.mockResolvedValue({
    status: 200,
    data: {
      value: [
        {
          id: "911c0701-a028-40dd-9465-7c9d4bd0b7c8",
          displayName: "devhmrcgaapprover",
          givenName: "devhmrcgaapproverFN",
          surname: "devhmrcgaapproverLN",
          userPrincipalName: "devhmrcgaapprover@beisdevcts.onmicrosoft.com",
        },
      ],
    },
  });
  const res = {};
  request(app)
    .get("/deactivategrantingauthority", (req, res))
    .query({ gaId: "", gaName: "" })
    .send({ gaid: "", ganame: "", gaListArr: [], azGrpId: "" })
    .expect(200, done);
});
