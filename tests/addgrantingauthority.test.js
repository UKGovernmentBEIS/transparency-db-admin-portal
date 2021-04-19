// ***********************************************************
// Automated Unit testing scripts for beneficiary name route
// ***********************************************************

const index = require("../app");
const request = require("supertest");
const express = require("express");
var session = require("express-session");
const app = express();
const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(session);
app.use(bodyParser.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use("/", index);

const mockRequest = (sessiondata) => {
  return {
    session: sessiondata,
  };
};

const res = {};

test("Add Granting Authority Get Call", async () => {
  const req = mockRequest({
    dashboard_roles_object_id1: "erert",
    dashboard_roles_object_id2: "ytuyutuy",
  });
  global.dashboard_roles = "";
  global.beis_url_accessmanagement = "";
  global.grantingAuthorityName_Global = "";
  global.grantingAuthorityName_Error = "";
  global.ssn = {};
  ssn.dashboard_roles_object_id1 = "ghghgh";
  ssn.dashboard_roles_object_id2 = "uhjhj";
  const res = {};
  request(app)
    .get("/addgrantingauthority", (req, res))
    .set("session", req.session)
    .query({ change: 23 })
    .expect(200);
  // expect(abcd).toBe(200);
});

test("Add Granting Authority Get Call", async () => {
  const req = mockRequest(
    {
      dashboard_roles_object_id1: "",
      dashboard_roles_object_id2: "",
    },
    {}
  );
  console.log("req", req);
  global.dashboard_roles = "";
  global.beis_url_accessmanagement = "";
  global.grantingAuthorityName_Global = "";
  global.grantingAuthorityName_Error = "";
  ssn.dashboard_roles_object_id1 = "hjggjg";
  ssn.dashboard_roles_object_id2 = "hgghfgf";
  const res = {};

  request(app)
    .get("/addgrantingauthority", (req, res))
    .expect(200);
});
