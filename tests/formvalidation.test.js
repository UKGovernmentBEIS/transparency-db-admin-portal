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
  global.beis_url_accessmanagement = "";
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

test("Unit testing for update results page per route Test for POST call", (done) => {
  const req = mockRequest();
  global.isFileUploadEmpty = false;
  global.beis_url_accessmanagement = "";
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
  global.files = null;
  request(app)
    .post("/formvalidation", (req, res))
    .send({
      isFileUploadEmpty: false,
      isNotCsvOrExcel: false,
      isExcelFormat: true,
    })
    .attach("files", null)
    .expect(200, done);
});

test("Unit testing for update results page per route Test for POST call", async () => {
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
  global.beis_url_publishing = "";
  const file_upload_1 = { file_upload_1: "timesheetDec.png" };
  request(app)
    .post("/formvalidation", (req, res))
    // .attach("files", "exportFile.csv")
    .attach("file_upload_1", "timesheetDec.png")
    // .req({ files: "exportFile.csv" })
    .expect(200);
  // expect(resp).toBe(200);
});
