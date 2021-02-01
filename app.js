// *************************************************************
// Gov.UK transparency database - App.js is the subset of server.js
// *************************************************************

const express = require("express");
const cookierParser = require('cookie-parser');
const app = express();
const fs = require("fs");
const request = require("request");
const methodOverride = require("method-override");
const path = require("path");
const fileUpload = require("express-fileupload");
const fetch = require("node-fetch");
const { callbackify } = require("util");
const { Http2ServerRequest } = require("http2");
const { contains } = require("jquery");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.use(cookierParser());
const users = [];
// app.use(fileUpload());
app.use(
  fileUpload({
    useTempFiles: false,
    tempFileDir: "/tmp/",
  })
);

//*************************************************************** */
var multer = require('multer');
const axios = require("axios");

var upload = multer();
 
// for parsing application/json
app.use(express.json()); 
const jwt_decode = require("jwt-decode");
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));
//*************************************************************** */

app.locals.awards = require("./views/bulkupload/awards.json");
app.locals.Subsidy_Control_Number_Global;
app.locals.SubsidyArraySize;
app.locals.isAddSubsidyPrimarycall;
app.locals.Subsidy_Control_Number_Global_Substring;
app.locals.Subsidy_Measure_Title_Global;
app.locals.Subsidy_Adhoc_Global;
app.locals.Subsidy_Objective_Global;
app.locals.Subsidy_Objective_Other_Global;
app.locals.Subsidy_Objective_Plus_Other_Global;
app.locals.Subsidy_Instrument_Global;
app.locals.Subsidy_Instrument_Other_Global;
app.locals.Subsidy_Instrument_Plus_Other_Global;
app.locals.Subsidy_Element_Full_Amount_Global;
app.locals.Subsidy_Element_Full_Amount_Global_Trim;
app.locals.National_ID_Type_Global;
app.locals.National_ID_Number_Global;
app.locals.Beneficiary_Name_Global;
app.locals.Size_of_the_Organisation_Global;
app.locals.Granting_Authority_Name_Global;
app.locals.Legal_Granting_Date_Day_Global;
app.locals.Legal_Granting_Date_Month_Global;
app.locals.Legal_Granting_Date_Year_Global;
app.locals.Goods_or_Services_Global;
app.locals.Spending_Region_Global;
app.locals.Spending_Sector_Global;
app.locals.GetMonthName;
app.locals.file_upload_name;
app.locals.isCallfromEditAward;

app.locals.email_addresspass;
app.locals.formvalidationerrpass = [];
app.locals.errorsvalidationpass = [];

app.locals.dashboard_user_name;
app.locals.dashboard_ga_name;
app.locals.frontend_totalRecordsPerPage;

app.locals.pageCount;
app.locals.previous_page;
app.locals.next_page;
app.locals.start_record;
app.locals.end_record;
app.locals.totalrows;
app.locals.current_page_active;
app.locals.current_page;
app.locals.start_page;
app.locals.end_page;
app.locals.dashboardawards;
app.locals.awardnumber;
app.locals.fetchawarddetails;
app.locals.Award_search_URL;

app.locals.Award_selected_status;
app.locals.awards_status;
app.locals.Award_search_text;
app.locals.beis_url_publishing;
app.locals.beis_url_accessmanagement;
app.locals.beis_url_publicsearch;

app.locals.Subsidy_Control_Number_Error;
app.locals.Subsidy_Measure_Title_Error;
app.locals.Subsidy_Adhoc_Error;
app.locals.Subsidy_Objective_Error;
app.locals.Subsidy_Objective_Other_Error;
app.locals.Subsidy_Instrument_Error;
app.locals.Subsidy_Instrument_Other_Error;
app.locals.Subsidy_Element_Full_Amount_Error;
app.locals.Subsidy_Full_Amount_Range_Error;
app.locals.National_ID_Type_Error;
app.locals.National_ID_Number_Error;
app.locals.Beneficiary_Name_Error;
app.locals.Size_of_the_Organisation_Error;
app.locals.Granting_Authority_Name_Error;
app.locals.Legal_Granting_Date_Day_Error;
app.locals.Legal_Granting_Date_Month_Error;
app.locals.Legal_Granting_Date_Year_Error;
app.locals.Goods_or_Services_Error;
app.locals.Spending_Region_Error;
app.locals.Spending_Sector_Error;

/***************************************************** */
/* Default login screen - Web application Launch screen */
/****************************************************** */

app.get("/", async(req, res) => {  
 
  console.log("request headers "+req.headers);
  console.log("Value of X-MS-TOKEN-AAD-ACCESS-TOKEN: " + req.header("X-MS-TOKEN-AAD-ACCESS-TOKEN"));
  var access_token = req.header("x-ms-client-principal");
  console.log("access_token "+access_token);
  var id_token = req.header("x-ms-token-aad-id-token");
  console.log("id_token "+id_token);
  if (req.isAuthenticated){
    console.log("User authenticated!");
    console.log('User info: ', req.user);
    console.log('Validated claims: ', req.authInfo);
  }else{
    console.log("User not authenticated!");
  }

  Environment_variable = process.argv[2];
  if (Environment_variable == "env=dev") {
    beis_url_publishing = "https://dev-beis-tp-db-publishing-subsidies-service.azurewebsites.net";
    beis_url_accessmanagement = "https://dev-beis-tp-db-accessmanagement-service-app.azurewebsites.net";
    beis_url_publicsearch = "https://dev-beis-tp-db-public-search-service.azurewebsites.net";
    console.log(beis_url_publishing);
    console.log(beis_url_accessmanagement);
    console.log(beis_url_publicsearch);
  } else if (Environment_variable == "env=integ") {
    beis_url_publishing = "https://integ-transparency-db-publishing-subsidies-service.azurewebsites.net";
    beis_url_accessmanagement = "https://integ-transparency-db-access-management-service.azurewebsites.net";
    beis_url_publicsearch = "https://integ-transparency-db-public-search-service.azurewebsites.net";
    console.log(beis_url_publishing);
    console.log(beis_url_accessmanagement);
    console.log(beis_url_publicsearch);
  } else if (Environment_variable == "env=stag") {
    beis_url_publishing = "https://stag-transparency-db-publishing-subsidies-service.azurewebsites.net";
    beis_url_accessmanagement = "https://stag-transparency-db-access-management-service.azurewebsites.net";
    beis_url_publicsearch = "https://stag-transparency-db-public-search-service.azurewebsites.net";
    console.log(beis_url_publishing);
    console.log(beis_url_accessmanagement);
    console.log(beis_url_publicsearch);
  } else if (Environment_variable == "env=prod") {
    beis_url_publishing = "https://prod-transparency-db-publishing-subsidies-service.azurewebsites.net";
    beis_url_accessmanagement = "https://prod-transparency-db-access-management-service.azurewebsites.net";
    beis_url_publicsearch = "https://prod-transparency-db-public-search-service.azurewebsites.net";
    console.log(beis_url_publishing);
    console.log(beis_url_accessmanagement);
    console.log(beis_url_publicsearch);
  }


  // *******************
  // Globale declarations
  // *******************
  frontend_totalRecordsPerPage = 1;

  var id_token_decoded = jwt_decode(id_token);
  console.log("id_token_decoded "+id_token_decoded);
  dashboard_username = id_token_decoded.name;
  if(id_token_decoded.roles.includes("4aaddb97-dcb8-4988-b2e5-b045a4419d90")){
    dashboard_roles = "BEIS Administrator";
  }else if(id_token_decoded.roles.includes("3ee46dda-5f2b-4fd5-b92b-54c2cd8f2930")){
    dashboard_roles = "Granting Authority Administrator";
  }else if(id_token_decoded.roles.includes("058abc1f-c491-4ffa-bd52-885c4fb96943")){
    dashboard_roles = "Granting Authority Approver";
  }else if(id_token_decoded.roles.includes("e7f70439-02d4-4367-817e-52283a416ac3")){
    dashboard_roles = "Granting Authority Encoder";
  }

  if (dashboard_roles == "BEIS Administrator") {
    const userPrincipleRequest =
      '{"userName": "TEST","password": "password123","role": "BEIS Administrator","grantingAuthorityGroupId": "123","grantingAuthorityGroupName": "test"}';
    var config = {
      headers: {
        userPrinciple: userPrincipleRequest
      },
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
      res.render("bulkupload/dashboard-beisadmin", {
        beis_url_accessmanagement,dashboard_username
      });
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
      headers: {
        userPrinciple: userPrincipleRequest
      },
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
      res.render("bulkupload/dashboard-gaadmin",{
        beis_url_accessmanagement,dashboard_username
      });
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
      headers: {
        userPrinciple: userPrincipleRequest
      },
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
      res.render("bulkupload/dashboard-gaapprover",{
        beis_url_accessmanagement,dashboard_username
      });
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
      headers: {
        userPrinciple: userPrincipleRequest
      },
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
      res.render("bulkupload/dashboard-gaencoder",{
        beis_url_accessmanagement,dashboard_username
      });
    } catch (err) {
      response_error_message = err;
      console.log("message error : " + err);
      console.log("response_error_message catch : " + response_error_message);
    }
  }
});

var logintransparency = require("./routes/logintransparency");
app.use("/logintransparency", logintransparency);

/****************************************************** */
/* All Router declarations */
/****************************************************** */

var loginfirstpage = require("./routes/loginfirstpage");
app.use("/loginfirstpage", loginfirstpage);

var mysubsidyawards = require("./routes/mysubsidyawards");
app.use("/mysubsidyawards", mysubsidyawards);

var bulkuploadsubsidy = require("./routes/bulkuploadsubsidy");
app.use("/bulkuploadsubsidy", bulkuploadsubsidy);

var loginforgetpassword = require("./routes/loginforgetpassword");
app.use("/loginforgetpassword", loginforgetpassword);

var loginnewpassword = require("./routes/loginnewpassword");
app.use("/loginnewpassword", loginnewpassword);

var loginemailconfirmation = require("./routes/loginemailconfirmation");
app.use("/loginemailconfirmation", loginemailconfirmation);

var loginpasswordcomplete = require("./routes/loginpasswordcomplete");
app.use("/loginpasswordcomplete", loginpasswordcomplete);

var loginresetpassword = require("./routes/loginresetpassword");
app.use("/loginresetpassword", loginresetpassword);

var loginemailconfirmationexpiry = require("./routes/loginemailconfirmationexpiry");
app.use("/loginemailconfirmationexpiry", loginemailconfirmationexpiry);

var reviewdetail = require("./routes/reviewdetail");
app.use("/reviewdetail", reviewdetail);

var formvalidation = require("./routes/formvalidation");
app.use("/formvalidation", formvalidation);

var addsubsidyaward = require("./routes/addsubsidyaward");
app.use("/addsubsidyaward", addsubsidyaward);

var editsubsidyaward = require("./routes/subsidyaward-edit");
app.use("/editsubsidyaward", editsubsidyaward);

var rejectsubsidyaward = require("./routes/subsidyaward-reject");
app.use("/rejectsubsidyaward", rejectsubsidyaward);

var approverejectsubsidyaward = require("./routes/subsidyaward-approve-reject");
app.use("/approverejectsubsidyaward", approverejectsubsidyaward);

var cancelmysubsidy = require("./routes/cancelmysubsidy");
app.use("/cancelmysubsidy", cancelmysubsidy);

var addsubsidyreview = require("./routes/addsubsidyreview");
app.use("/addsubsidyreview", addsubsidyreview);

var addsubsidyeditaward = require("./routes/addsubsidyeditaward");
app.use("/addsubsidyeditaward", addsubsidyeditaward);

var submitforapproval = require("./routes/submitforapproval");
app.use("/submitforapproval", submitforapproval);

var mygrantingauthority = require("./routes/mygrantingauthority");
app.use("/mygrantingauthority", mygrantingauthority);

var editgrantingauthority = require("./routes/editgrantingauthority");
app.use("/editgrantingauthority", editgrantingauthority);

var addgrantingauthority = require("./routes/addgrantingauthority");
app.use("/addgrantingauthority", addgrantingauthority);

var choosedashboard = require("./routes/choosedashboard");
app.use("/choosedashboard", choosedashboard);

var mysubsidymeasures = require("./routes/mysubsidymeasures");
app.use("/mysubsidymeasures", mysubsidymeasures);

var addsubsidymeasures = require("./routes/subsidymeasures-add");
app.use("/addsubsidymeasures", addsubsidymeasures);

var reviewsubsidymeasures = require("./routes/subsidymeasure-reviewdetails");
app.use("/reviewsubsidymeasures", reviewsubsidymeasures);

var editsubsidymeasures = require("./routes/subsidymeasure-edit");
app.use("/editsubsidymeasure", editsubsidymeasures);

var awardspageroute = require("./routes/awardspageroute");
app.use("/awardspageroute", awardspageroute);

var awardspageperroute = require("./routes/awardspageperroute");
app.use("/awardspageperroute", awardspageperroute);

var awardsfilterroute = require("./routes/awardsfilterroute");
app.use("/awardsfilterroute", awardsfilterroute);

var measurespageroute = require("./routes/measurespageroute");
app.use("/measurespageroute", measurespageroute);

var measurespageperroute = require("./routes/measurespageperroute");
app.use("/measurespageperroute", measurespageperroute);

var subsidyawardfetchcancel = require("./routes/cancel-subsidyawardfetch");
app.use("/subsidyawardfetchcancel", subsidyawardfetchcancel);

var subsidyawardcancel = require("./routes/subsidyaward-cancel");
app.use("/subsidyawardcancel", subsidyawardcancel);

var subsidyawardfetch = require("./routes/subsidyaward-fetch");
app.use("/subsidyawardfetch", subsidyawardfetch);

var subsidyawardaction = require("./routes/subsidyaward-action");
app.use("/subsidyawardaction", subsidyawardaction);

var subsidyawardreviewcancel = require("./routes/subsidyaward-review-cancel");
app.use("/subsidyawardreviewcancel", subsidyawardreviewcancel);

var subsidyawardsearch = require("./routes/subsidyaward-search");
app.use("/subsidyawardsearch", subsidyawardsearch);

var subsidyawardrejectreason = require("./routes/subsidyaward-reject-reason");
app.use("/subsidyawardrejectreason", subsidyawardrejectreason);

var reviewdetailcancel = require("./routes/reviewdetailcancel");
app.use("/reviewdetailcancel", reviewdetailcancel);

//Users Pages

var manageusers = require("./routes/users-manage");
app.use("/manageusers", manageusers);

var manageusers = require("./routes/user-add");
app.use("/adduser", manageusers);

var canceluser = require("./routes/user-cancel");
app.use("/canceluser", canceluser);

var canceluser = require("./routes/user-review");
app.use("/reviewuser", canceluser);

var useraddedsuccessfully = require("./routes/user-added-successfully");
app.use("/useraddedsuccessfully", useraddedsuccessfully);

var userindividualdetails = require("./routes/user-individual-detail");
app.use("/userindividualdetails", userindividualdetails);

var userdeactivate = require("./routes/user-deactivate");
app.use("/userdeactivate", userdeactivate);

var userdeactivated = require("./routes/user-deactivated-successfully");
app.use("/userdeactivated", userdeactivated);

module.exports = app;
