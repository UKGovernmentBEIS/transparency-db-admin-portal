// ***********************************************************
// Automated Unit testing scripts for no results route
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

const res = {};

test("Unit testing for no results route - Test for POST call", (done) => {
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
  const res = {};
  request(app)
    .get("/bulkuploadsubsidy", (req, res))
    .expect(200, done);
  // expect(abcd).toBe(200);
});
