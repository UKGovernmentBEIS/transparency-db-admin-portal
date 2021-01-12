const express = require("express");
const router = express.Router();
const axios = require("axios");
var request = require("request");

router.post("/", async (req, res) => {
  // ********************************************************
  // Read environment property file and set the API URL end points
  // ********************************************************
  var beis_url_accessmanagement = "";
  var beis_url_publishing = "";
  var beis_url_publicsearch = "";
  Environment_variable = process.argv[2].split("=");
  // if (Environment_variable == "env=dev") {
  beis_url_publishing = `https://${Environment_variable[1]}-beis-tp-db-publishing-subsidies-service.azurewebsites.net`;
  beis_url_accessmanagement = `https://${Environment_variable[1]}-beis-tp-db-accessmanagement-service-app.azurewebsites.net`;
  beis_url_publicsearch = `https://${Environment_variable[1]}-beis-tp-db-public-search-service.azurewebsites.net`;
  console.log(beis_url_publishing);
  console.log(beis_url_accessmanagement);
  console.log(beis_url_publicsearch);
  // } else if (Environment_variable == "env=integ") {
  //   beis_url_publishing =
  //     "https://integ-transparency-db-publishing-subsidies-service.azurewebsites.net";
  //   beis_url_accessmanagement =
  //     "https://integ-transparency-db-access-management-service.azurewebsites.net";
  //   beis_url_publicsearch =
  //     "https://integ-transparency-db-public-search-service.azurewebsites.net";
  //   console.log(beis_url_publishing);
  //   console.log(beis_url_accessmanagement);
  //   console.log(beis_url_publicsearch);
  // } else if (Environment_variable == "env=stag") {
  //   beis_url_publishing =
  //     "https://stag-transparency-db-publishing-subsidies-service.azurewebsites.net";
  //   beis_url_accessmanagement =
  //     "https://stag-transparency-db-access-management-service.azurewebsites.net";
  //   beis_url_publicsearch =
  //     "https://stag-transparency-db-public-search-service.azurewebsites.net";
  //   console.log(beis_url_publishing);
  //   console.log(beis_url_accessmanagement);
  //   console.log(beis_url_publicsearch);
  // }

  // *******************
  // Globale declarations
  // *******************
  frontend_totalRecordsPerPage = 1;

  var { dashboard_username, dashboard_roles, dashboard_GA } = req.body;

  console.log("dashboard_username:" + dashboard_username);
  console.log("dashboard_roles:" + dashboard_roles);

  dashboard_user_name = dashboard_username;
  dashboard_ga_name = dashboard_GA;

  if (dashboard_roles == "BEIS Administrator") {
    const userPrincipleRequest =
      '{"userName": "TEST","password": "password123","role": "BEIS Administrator","grantingAuthorityGroupId": "123","grantingAuthorityGroupName": "test"}';
    var config = {
      headers: { userPrinciple: userPrincipleRequest },
    };

    var data = JSON.parse(JSON.stringify(userPrincipleRequest));
    console.log("request :" + JSON.stringify(data));

    try {
      const apidata = await axios.get(
        beis_url_accessmanagement + "/accessmanagement/beisadmin",
        config
      );
      console.log(`Status: ${apidata.status}`);
      API_response_code = `${apidata.status}`;
      console.log("API_response_code: try" + API_response_code);
      console.log("Body: ", apidata.data);
      dashboardawards = apidata.data;
      res.render("bulkupload/dashboard-beisadmin");
    } catch (err) {
      response_error_message = err;
      console.log("message error : " + err);
      console.log("response_error_message catch : " + response_error_message);
    }
  } else if (dashboard_roles == "Granting Authority Administrator") {
    const userPrincipleRequest =
      '{"userName":"SYSTEM","password":"password123","role":"Granting Authority Administrator","grantingAuthorityGroupId":"123","grantingAuthorityGroupName":"' +
      dashboard_ga_name +
      '"}';
    var config = {
      headers: { userPrinciple: userPrincipleRequest },
    };

    var data = JSON.parse(JSON.stringify(userPrincipleRequest));
    console.log("request :" + JSON.stringify(data));

    try {
      const apidata = await axios.get(
        beis_url_accessmanagement + "/accessmanagement/gaadmin",
        config
      );
      console.log(`Status: ${apidata.status}`);
      API_response_code = `${apidata.status}`;
      console.log("API_response_code: try" + API_response_code);
      console.log("Body: ", apidata.data);
      dashboardawards = apidata.data;
      res.render("bulkupload/dashboard-gaadmin");
    } catch (err) {
      response_error_message = err;
      console.log("message error : " + err);
      console.log("response_error_message catch : " + response_error_message);
    }
  } else if (dashboard_roles == "Granting Authority Approver") {
    const userPrincipleRequest =
      '{"userName":"SYSTEM","password":"password123","role":"Granting Authority Approver","grantingAuthorityGroupId":"123","grantingAuthorityGroupName":"' +
      dashboard_ga_name +
      '"}';
    var config = {
      headers: { userPrinciple: userPrincipleRequest },
    };

    var data = JSON.parse(JSON.stringify(userPrincipleRequest));
    console.log("request :" + JSON.stringify(data));

    try {
      const apidata = await axios.get(
        beis_url_accessmanagement + "/accessmanagement/gaapprover",
        config
      );
      console.log(`Status: ${apidata.status}`);
      API_response_code = `${apidata.status}`;
      console.log("API_response_code: try" + API_response_code);
      console.log("Body: ", apidata.data);
      dashboardawards = apidata.data;
      res.render("bulkupload/dashboard-gaapprover");
    } catch (err) {
      response_error_message = err;
      console.log("message error : " + err);
      console.log("response_error_message catch : " + response_error_message);
    }
  } else if (dashboard_roles == "Granting Authority Encoder") {
    const userPrincipleRequest =
      '{"userName":"SYSTEM","password":"password123","role":"Granting Authority Encoder","grantingAuthorityGroupId":"123","grantingAuthorityGroupName":"' +
      dashboard_ga_name +
      '"}';
    var config = {
      headers: { userPrinciple: userPrincipleRequest },
    };

    var data = JSON.parse(JSON.stringify(userPrincipleRequest));
    console.log("request :" + JSON.stringify(data));

    try {
      const apidata = await axios.get(
        beis_url_accessmanagement + "/accessmanagement/gaencoder",
        config
      );
      console.log(`Status: ${apidata.status}`);
      API_response_code = `${apidata.status}`;
      console.log("API_response_code: try" + API_response_code);
      console.log("Body: ", apidata.data);
      dashboardawards = apidata.data;
      res.render("bulkupload/dashboard-gaencoder");
    } catch (err) {
      response_error_message = err;
      console.log("message error : " + err);
      console.log("response_error_message catch : " + response_error_message);
    }
  }
});

module.exports = router;
