// ********************************************************************
// Gov.UK transparency Subsidy bulk upload submit module
// ********************************************************************

const express = require("express");
var session = require("express-session");
const router = express.Router();

const request = require("request");
const axios = require("axios");

const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

router.get("/", (req, res) => {
  ssn = req.session;
  if (
    typeof ssn.dashboard_roles_object_id1 === "undefined" ||
    typeof ssn.dashboard_roles_object_id2 === "undefined"
  ) {
    res.redirect("/signout");
  } else {
    let isFileUploadEmpty = false;
    let isNotCsvOrExcel = false;
    let isExcelFormat = false;

    res.set("X-Frame-Options", "DENY");
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Content-Security-Policy", 'frame-ancestors "self"');
    res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

    res.render("bulkupload/bulkuploadsubsidy", {
      isFileUploadEmpty,
      isNotCsvOrExcel,
      isExcelFormat,
    });
  }
});

router.post("/", async (req, res) => {
  ssn = req.session;
  if (
    typeof ssn.dashboard_roles_object_id1 === "undefined" ||
    typeof ssn.dashboard_roles_object_id2 === "undefined"
  ) {
    res.redirect("/signout");
  } else {
    let isFileUploadEmpty = false;

    res.set("X-Frame-Options", "DENY");
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Content-Security-Policy", 'frame-ancestors "self"');
    res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

    console.log("formvalidation");
    API_data_received = "no";

    if (req.files == null) {
      isFileUploadEmpty = true;
      console.log("file not uploaded");
      console.log("isFileUploadEmpty: " + isFileUploadEmpty);
      res.render("bulkupload/bulkuploadsubsidy", { isFileUploadEmpty });
    } else {
      var file = req.files.file_upload_1;
      var file_upload = file.name;
      var file_upload_name = file.name;
      var filedata = file.data;
      var validationerrors = [];

      function toBuffer(ab) {
        var buffer = new Buffer.alloc(ab.byteLength);
        var view = new Uint8Array(ab);
        for (var i = 0; i < buffer.length; ++i) {
          buffer[i] = view[i];
        }
        return buffer;
      }

      var url = beis_url_publishing + "/uploadBulkAwards";

      var errorsvalidationpass;
      let isFileUploadEmpty = false;
      let isUploadSectionIsActive = true;
      let validCsvFormat = ".csv";
      let validExcelFormat = ".xlsx";
      let isCsvValid = false;
      let isExcelValid = false;
      let isNotCsvOrExcel = false;
      let isExcelFormat = false;
      let isCsvFormat = false;
      let isXlsxOk = false;

      if (!file_upload) {
        isFileUploadEmpty = true;
        console.log("file not uploaded");
      } else {
        // isCsvValid = file_upload.includes(validCsvFormat);

        extensionCount = file_upload.split(".").length;
        console.log("extensioncount" + extensionCount);

        if (extensionCount > 0) {
          var extensionName_extract = file_upload.split(".");
          console.log("extesionname_extect" + extensionName_extract[1]);
          var extensionName_step = extensionName_extract[extensionCount - 1];
          var extensionName = extensionName_step.toLowerCase();
          console.log("extensionname" + extensionName);
          if (extensionName == "xlsx") {
            isExcelFormat = true;
            isXlsxOk = true;
          } else {
            isExcelFormat = false;
            isXlsxOk = false;
          }
        } else {
          isExcelFormat = false;
          isXlsxOk = false;
        }
      }

      if (isExcelFormat) {
        var req = request.post(
          url,
          ssn.UserPrincileObjectGlobal,
          function (err, resp, body) {
            if (err) {
              console.log(
                "Application Programming Interface (API) is Down at this moment"
              );
            } else {
              validationerrors = JSON.parse(body);

              console.log("URL: " + body);
              console.log("type:" + validationerrors);
              console.log(validationerrors.errorRows);
              API_data_received = "yes";
              errorsvalidationpass = JSON.stringify(
                validationerrors.validationErrorResult
              );
              console.log("type:" + errorsvalidationpass);

              if (validationerrors.errorRows == 0) {
                isXlsxOk = true;
              } else {
                isXlsxOk = false;
              }

              console.log("isExcelFormat" + isExcelFormat);
              console.log("isXlsxOk: " + isXlsxOk);
              if (isXlsxOk) {
                bulkupload = true;
                SubsidyAwardNumber = validationerrors.totalRows;

                res.render("bulkupload/submitforapproval", {
                  SubsidyAwardNumber,
                  bulkupload,
                  validationerrors,
                  ssn,
                });
              } else {
                res.render("bulkupload/bulkuploadsubsidy", {
                  file_upload_name,
                  isUploadSectionIsActive,
                  isFileUploadEmpty,
                  isNotCsvOrExcel,
                  isExcelFormat,
                  isCsvFormat,
                  isXlsxOk,
                  validationerrors,
                  errorsvalidationpass,
                });
              }
            }
          }
        );
        var form = req.form();

        form.append("file", toBuffer(file.data), {
          filename: file.name,
          contentType: file.type,
        });
      } else {
        isXlsxOk = false;
        res.render("bulkupload/bulkuploadsubsidy", {
          file_upload_name,
          isUploadSectionIsActive,
          isFileUploadEmpty,
          isNotCsvOrExcel,
          isExcelFormat,
          isCsvFormat,
          isXlsxOk,
          validationerrors,
          errorsvalidationpass,
        });
      }
    }
  }
});

module.exports = router;
