// ***********************************************************
// Automated Unit testing scripts for update results page per route
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

const res = {};

test("Unit testing for update results page per route Test for GET call", (done) => {
  const req = mockRequest();
  global.isFileUploadEmpty = false;
  global.isNotCsvOrExcel = false;
  global.isExcelFormat = true;
  global.isCsvFormat = false;
  global.validationerrors = {
    validationErrorResult: [
      {
        columns: "",
        row: "",
        errorMessages: "",
      },
    ],
  };

  request(app)
    .get("/formvalidation", (req, res))
    .send({
      isFileUploadEmpty: false,
      isNotCsvOrExcel: false,
      isExcelFormat: true,
    })
    .expect(200, done);
});
