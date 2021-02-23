// *************************************************************
// Gov.UK transparency database - App.js is the subset of server.js
// *************************************************************

var express = require("express");
var cookierParser = require("cookie-parser");
var app = express();
var fs = require("fs");
var request = require("request");
var methodOverride = require("method-override");
var path = require("path");
var fileUpload = require("express-fileupload");
var fetch = require("node-fetch");
var { callbackify } = require("util");
var { Http2ServerRequest } = require("http2");
var { contains } = require("jquery");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.use(cookierParser());
var users = [];
// app.use(fileUpload());
app.use(
  fileUpload({
    useTempFiles: false,
    tempFileDir: "/tmp/",
  })
);

//*************************************************************** */
var multer = require("multer");
var axios = require("axios");

var upload = multer();

// for parsing application/json
app.use(express.json());
var jwt_decode = require("jwt-decode");
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// for parsing multipart/form-data
// app.use(upload.array());
app.use(express.static("public"));
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
app.locals.Legal_Basis_Global;
app.locals.Legal_Granting_Date_Day_Global;
app.locals.Legal_Granting_Date_Month_Global;
app.locals.Legal_Granting_Date_Year_Global;
app.locals.Goods_or_Services_Global;
app.locals.Spending_Region_Global;
app.locals.Spending_Sector_Global;
app.locals.Granting_Authority_URL_Global;
app.locals.Granting_Authority_Policy_Global;
app.locals.Budget_Global;

app.locals.Scheme_Start_Day_Global;
app.locals.Scheme_Start_Month_Global;
app.locals.Scheme_Start_Year_Global;
app.locals.Scheme_End_Day_Global;
app.locals.Scheme_End_Month_Global;
app.locals.Scheme_End_Year_Global;

app.locals.grantingAuthorityID_global;
app.locals.grantingAuthorityName_Global;

app.locals.GetMonthName;
app.locals.file_upload_name;
app.locals.isCallfromEditAward;

app.locals.email_addresspass;
app.locals.formvalidationerrpass = [];
app.locals.errorsvalidationpass = [];

app.locals.dashboard_user_name;
app.locals.user_id;
app.locals.dashboard_ga_name;
app.locals.dashboard_roles;
app.locals.dashbaord_ga_ID;
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
app.locals.grantingAuthorityPublish_Global;

app.locals.Award_selected_status;
app.locals.awards_status;
app.locals.Award_search_text;

app.locals.scheme_selected_status;
app.locals.schemes_status;
app.locals.Schemes_search_text;
app.locals.scNumber_Global;

app.locals.beis_url_publishing;
app.locals.beis_url_accessmanagement;
app.locals.beis_url_publicsearch;
app.locals.beis_url_searchscheme;

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
app.locals.grantingAuthorityName_Error;
app.locals.grantingAuthorityName_Error_Msg;

app.locals.searchmeasuredetails;
app.locals.Subsidy_Control_Number_Global_Text;
app.locals.Scheme_Legal_Granting_Start_Date_Month;
app.locals.Scheme_Legal_Granting_Start_Date_Day;
app.locals.Scheme_Legal_Granting_Start_Date_Year;
app.locals.Scheme_Legal_Granting_End_Date_Month;
app.locals.Scheme_Legal_Granting_End_Date_Day;
app.locals.Scheme_Legal_Granting_End_Date_Year;
app.locals.subsidy_scheme_name_sorting_order;
app.locals.subsidy_control_no_sorting_order;
app.locals.granting_authority_sorting_order;
app.locals.start_date_sorting_order;
app.locals.end_date_sorting_order;
app.locals.duration_sorting_order;
app.locals.budget_sorting_order;
app.locals.sorting_order_pass;
app.locals.Search_Text_Global;

app.locals.apiroles_extract;
app.locals.apiroles_total_objects;
app.locals.isUserSlectIsPrimaryCall;
app.locals.Granting_Authority_Name_Measure_Global;
app.locals.Granting_Authority_Selected;
app.locals.GA_Selected;
app.locals.Roles_Selected;
app.locals.GAUserList;

app.locals.gaId_no_arrow;
app.locals.ganame_arrow;
app.locals.added_by_arrow;
app.locals.status_arrow;
app.locals.created_on_arrow;
app.locals.last_modified_arrow;
app.locals.UserPrincileObjectGlobal;

app.locals.User_Role_Global;
app.locals.GA_Name_User_Global;
app.locals.Full_Name_Global;
app.locals.Last_Name_Global;
app.locals.Email_Id_Global;
app.locals.Phone_Number_Global;

app.locals.User_Role_Single;
app.locals.User_GA_Name;
app.locals.User_Name_Single;
app.locals.User_Last_Name_Single;
app.locals.User_Email_Single;
app.locals.User_Mobile_Single;
app.locals.Delete_UserId;

app.locals.GAUserList_Empty ;

app.locals.GaListArr_Global;

app.locals.gaAdminCount_Global;
app.locals.gaApproverCount_Global;
app.locals.gaEncoderCount_Global;
app.locals.gaTotalCount_Global;
/***************************************************** */
/* Default login screen - Web application Launch screen */
/****************************************************** */

app.get("/", async (req, res) => {

  var id_token = req.header("x-ms-token-aad-id-token");
  console.log("id_token " + id_token);

  
  Environment_variable = process.argv[2];
  console.log("id_token " + id_token);

  if (Environment_variable == "env=dev") {
    beis_url_publishing =
      "https://dev-beis-tp-db-publishing-subsidies-service.azurewebsites.net";
    beis_url_accessmanagement =
      "https://dev-beis-tp-db-accessmanagement-service-app.azurewebsites.net";
    beis_url_publicsearch =
      "https://dev-beis-tp-db-public-search-service.azurewebsites.net";
    beis_url_searchscheme =
      "https://dev-beis-tp-db-ga-schemes-service.azurewebsites.net";
    console.log(beis_url_publishing);
    console.log(beis_url_accessmanagement);
    console.log(beis_url_publicsearch);
  } else if (Environment_variable == "env=integ") {
    beis_url_publishing =
      "https://integ-transparency-db-publishing-subsidies-service.azurewebsites.net";
    beis_url_accessmanagement =
      "https://integ-transparency-db-access-management-service.azurewebsites.net";
    beis_url_publicsearch =
      "https://integ-transparency-db-public-search-service.azurewebsites.net";
    beis_url_searchscheme =
      "https://integ-transparency-db-ga-schemes-service.azurewebsites.net";
    console.log(beis_url_publishing);
    console.log(beis_url_accessmanagement);
    console.log(beis_url_publicsearch);
  } else if (Environment_variable == "env=stag") {
    beis_url_publishing =
      "https://stag-transparency-db-publishing-subsidies-service.azurewebsites.net";
    beis_url_accessmanagement =
      "https://stag-transparency-db-access-management-service.azurewebsites.net";
    beis_url_publicsearch =
      "https://stag-transparency-db-public-search-service.azurewebsites.net";
    beis_url_searchscheme =
      "https://stag-transparency-db-ga-schemes-service.azurewebsites.net";
    console.log(beis_url_publishing);
    console.log(beis_url_accessmanagement);
    console.log(beis_url_publicsearch);
  } else if (Environment_variable == "env=prod") {
    beis_url_publishing =
      "https://prod-transparency-db-publishing-subsidies-service.azurewebsites.net";
    beis_url_accessmanagement =
      "https://prod-transparency-db-access-management-service.azurewebsites.net";
    beis_url_publicsearch =
      "https://prod-transparency-db-public-search-service.azurewebsites.net";
    beis_url_searchscheme =
      "https://prod-transparency-db-ga-schemes-service.azurewebsites.net";
    console.log(beis_url_publishing);
    console.log(beis_url_accessmanagement);
    console.log(beis_url_publicsearch);
  }

  // *******************
  // Globale declarations
  // *******************
  frontend_totalRecordsPerPage = 10;

  var id_token_decoded = jwt_decode(id_token);
  console.log("id_token_decoded " + id_token_decoded);
  console.log("logged in user " + id_token_decoded.name);
  console.log("id_token_decoded parsed " + JSON.stringify(id_token_decoded));
  var id_token_json = JSON.parse(JSON.stringify(id_token_decoded));
  dashboard_user_name = id_token_decoded.name;
  user_id = id_token_decoded.oid;
  dashboard_roles_object = JSON.stringify(id_token_json.roles);
  console.log("roles :" + dashboard_roles_object);
  dashboard_roles_object_id1 = dashboard_roles_object.substr(2, 36);
  dashboard_roles_object_id2 = dashboard_roles_object.substr(41, 36);

  console.log("dashboard_roles_object_id1:" + dashboard_roles_object_id1);
  console.log("dashboard_roles_object_id2:" + dashboard_roles_object_id2);

  try {
    var apiroles = await axios.get(
      beis_url_accessmanagement + "/accessmanagement/allga"
    );
    console.log(`Status: ${apiroles.status}`);
    API_response_code = `${apiroles.status}`;
    console.log("API_response_code: try" + API_response_code);
    console.log("Body: ", apiroles.data);
    apiroles_extract = apiroles.data;
    apiroles_total_objects = Object.keys(apiroles_extract).length;
    console.log(" apiroles_total_objects: ", apiroles_total_objects);

    for (var i = 0; i < apiroles_total_objects; i++) {
      if (dashboard_roles_object_id1 == apiroles_extract[i].azGrpId) {
        console.log("gaName id1 : " + apiroles_extract[i].gaId);
        apiroles_extract_object1 = apiroles_extract[i].gaName;
        dashbaord_ga_ID = apiroles_extract[i].gaId;
      }
    }

    for (var i = 0; i < apiroles_total_objects; i++) {
      if (dashboard_roles_object_id2 == apiroles_extract[i].azGrpId) {
        console.log("gaName id2 : " + apiroles_extract[i].gaName);
        apiroles_extract_object2 = apiroles_extract[i].gaName;
      }
    }
  } catch (err) {
    response_error_message = err;
    console.log("message error : " + err);
    console.log("response_error_message catch : " + response_error_message);
  }

  if (apiroles_extract_object1.includes("BEIS Administrator")) {
    dashboard_roles = "BEIS Administrator";
    dashboard_ga_name = apiroles_extract_object2;
  } else if (
    apiroles_extract_object1.includes("Granting Authority Administrator")
  ) {
    dashboard_roles = "Granting Authority Administrator";
    dashboard_ga_name = apiroles_extract_object2;
  } else if (apiroles_extract_object1.includes("Granting Authority Approver")) {
    dashboard_roles = "Granting Authority Approver";
    dashboard_ga_name = apiroles_extract_object2;
  } else if (apiroles_extract_object1.includes("Granting Authority Encoder")) {
    dashboard_roles = "Granting Authority Encoder";
    dashboard_ga_name = apiroles_extract_object2;
  }

  if (apiroles_extract_object2.includes("BEIS Administrator")) {
    dashboard_roles = "BEIS Administrator";
    dashboard_ga_name = apiroles_extract_object1;
  } else if (
    apiroles_extract_object2.includes("Granting Authority Administrator")
  ) {
    dashboard_roles = "Granting Authority Administrator";
    dashboard_ga_name = apiroles_extract_object1;
  } else if (apiroles_extract_object2.includes("Granting Authority Approver")) {
    dashboard_roles = "Granting Authority Approver";
    dashboard_ga_name = apiroles_extract_object1;
  } else if (apiroles_extract_object2.includes("Granting Authority Encoder")) {
    dashboard_roles = "Granting Authority Encoder";
    dashboard_ga_name = apiroles_extract_object1;
  }

  console.log("dashboard_roles : " + dashboard_roles);
  console.log("dashboard_ga_name : " + dashboard_ga_name);

  var userPrincipleRequest =
    '{"userName":"' +
    dashboard_user_name +
    '","password":"password123",' +
    '"role":"' +
    dashboard_roles +
    '","grantingAuthorityGroupId":"' +
    dashbaord_ga_ID +
    '","grantingAuthorityGroupName":"' +
    dashboard_ga_name +
    '"}';

  console.log("userprincile: " + userPrincipleRequest);
  UserPrincileObjectGlobal = {
    headers: {
      userPrinciple: userPrincipleRequest,
    },
  };
  console.log("dashbaord_ga_ID", dashboard_roles_object_id2);
  gaAdminCount_Global = 0;
  gaApproverCount_Global = 0;
  gaEncoderCount_Global = 0;
  gaTotalCount_Global = 0;
  try {
    const apidata = await axios.get(
      beis_url_accessmanagement +
        "/usermanagement/groups/" +
        dashboard_roles_object_id2,
      UserPrincileObjectGlobal
    );
    console.log(`Status: ${apidata.status}`);
    API_response_code = `${apidata.status}`;
    console.log("Body GROUPS: ", apidata.data.value);

    var env = Environment_variable.split("=");
    apidata.data.value.forEach(function (items) {
      if (items.roleName.toLowerCase().includes("administrators"))
        gaAdminCount_Global++;
      if (items.roleName.toLowerCase().includes("approvers"))
        gaApproverCount_Global++;
      if (items.roleName.toLowerCase().includes("encoders"))
        gaEncoderCount_Global++;
    });
    gaTotalCount_Global = apidata.data.value.length;
  } catch (err) {
    response_error_message = err;
    console.log("message error : " + err);
    console.log(
      "response_error_message catchGROUPS : " + response_error_message
    );
  }

  if (dashboard_roles == "BEIS Administrator") {
    // var userPrincipleRequest =
    //   '{"userName": "TEST","password": "password123","role": "BEIS Administrator","grantingAuthorityGroupId": "123","grantingAuthorityGroupName": "test"}';
    // var config = {
    //   headers: {
    //     userPrinciple: userPrincipleRequest,
    //   },
    // };

    var data = JSON.parse(JSON.stringify(userPrincipleRequest));
    console.log("request :" + JSON.stringify(data));

    try {
      var apidata = await axios.get(
        beis_url_accessmanagement + "/accessmanagement/beisadmin",
        UserPrincileObjectGlobal
      );
      console.log(`Status: ${apidata.status}`);
      API_response_code = `${apidata.status}`;
      console.log("API_response_code: try" + API_response_code);
      console.log("Body: ", apidata.data);
      dashboardawards = apidata.data;
      res.render("bulkupload/dashboard-beisadmin", {
        beis_url_accessmanagement,
        dashboard_user_name,
        gaAdminCount_Global,
        gaApproverCount_Global,
        gaEncoderCount_Global,
        gaTotalCount_Global,
      });
    } catch (err) {
      response_error_message = err;
      console.log("message error : " + err);
      console.log("response_error_message catch : " + response_error_message);
    }
  } else if (dashboard_roles == "Granting Authority Administrator") {
    // var userPrincipleRequest =
    //   '{"userName":"SYSTEM","password":"password123","role":"Granting Authority Administrator","grantingAuthorityGroupId":"123","grantingAuthorityGroupName":"' +
    //   dashboard_ga_name +
    //   '"}';
    // var config = {
    //   headers: {
    //     userPrinciple: userPrincipleRequest,
    //   },
    // };

    var data = JSON.parse(JSON.stringify(userPrincipleRequest));
    console.log("request :" + JSON.stringify(data));

    try {
      var apidata = await axios.get(
        beis_url_accessmanagement + "/accessmanagement/gaadmin",
        UserPrincileObjectGlobal
      );
      console.log(`Status: ${apidata.status}`);
      API_response_code = `${apidata.status}`;
      console.log("API_response_code: try" + API_response_code);
      console.log("Body: ", apidata.data);
      dashboardawards = apidata.data;
      res.render("bulkupload/dashboard-gaadmin", {
        beis_url_accessmanagement,
        dashboard_user_name,
        gaAdminCount_Global,
        gaApproverCount_Global,
        gaEncoderCount_Global,
        gaTotalCount_Global,
      });
    } catch (err) {
      response_error_message = err;
      console.log("message error : " + err);
      console.log("response_error_message catch : " + response_error_message);
    }
  } else if (dashboard_roles == "Granting Authority Approver") {
    // var userPrincipleRequest =
    //   '{"userName":"SYSTEM","password":"password123","role":"Granting Authority Approver","grantingAuthorityGroupId":"123","grantingAuthorityGroupName":"' +
    //   dashboard_ga_name +
    //   '"}';
    // var config = {
    //   headers: {
    //     userPrinciple: userPrincipleRequest,
    //   },
    // };

    var data = JSON.parse(JSON.stringify(userPrincipleRequest));
    console.log("request :" + JSON.stringify(data));

    try {
      var apidata = await axios.get(
        beis_url_accessmanagement + "/accessmanagement/gaapprover",
        UserPrincileObjectGlobal
      );
      console.log(`Status: ${apidata.status}`);
      API_response_code = `${apidata.status}`;
      console.log("API_response_code: try" + API_response_code);
      console.log("Body: ", apidata.data);
      console.log("gaAdminCount_Global", gaAdminCount_Global);
      console.log("gaApproverCount_Global", gaApproverCount_Global);
      console.log("gaEncoderCount_Global", gaEncoderCount_Global);
      console.log("gaTotalCount_Global", gaTotalCount_Global);
      dashboardawards = apidata.data;
      res.render("bulkupload/dashboard-gaapprover", {
        beis_url_accessmanagement,
        dashboard_user_name,
        gaAdminCount_Global,
        gaApproverCount_Global,
        gaEncoderCount_Global,
        gaTotalCount_Global,
      });
    } catch (err) {
      response_error_message = err;
      console.log("message error : " + err);
      console.log("response_error_message catch : " + response_error_message);
    }
  } else if (dashboard_roles == "Granting Authority Encoder") {
    // var userPrincipleRequest =
    //   '{"userName":"SYSTEM","password":"password123","role":"Granting Authority Encoder","grantingAuthorityGroupId":"123","grantingAuthorityGroupName":"' +
    //   dashboard_ga_name +
    //   '"}';
    // var config = {
    //   headers: {
    //     userPrinciple: userPrincipleRequest,
    //   },
    // };

    var data = JSON.parse(JSON.stringify(userPrincipleRequest));
    console.log("request :" + JSON.stringify(data));

    try {
      var apidata = await axios.get(
        beis_url_accessmanagement + "/accessmanagement/gaencoder",
        UserPrincileObjectGlobal
      );
      console.log(`Status: ${apidata.status}`);
      API_response_code = `${apidata.status}`;
      console.log("API_response_code: try" + API_response_code);
      console.log("Body: ", apidata.data);
      dashboardawards = apidata.data;
      res.render("bulkupload/dashboard-gaencoder", {
        beis_url_accessmanagement,
        dashboard_user_name,
        gaAdminCount_Global,
        gaApproverCount_Global,
        gaEncoderCount_Global,
        gaTotalCount_Global,
      });
    } catch (err) {
      response_error_message = err;
      console.log("message error : " + err);
      console.log("response_error_message catch : " + response_error_message);
    }
  }

  // res.render("bulkupload/logintransparency");
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

var canceladdsubsidyaward = require("./routes/subsidyaward-add-cancel");
app.use("/canceladdsubsidyaward", canceladdsubsidyaward);

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

var reviewgrantingauthority = require("./routes/grantingauthority-reviewdetails");
app.use("/reviewgrantingauthority", reviewgrantingauthority);

var submitgrantingauthority = require("./routes/grantingauthority-submit");
app.use("/submitgrantingauthority", submitgrantingauthority);

var editgrantingauthority = require("./routes/grantingauthority-edit");
app.use("/editgrantingauthority", editgrantingauthority);

var cancelgrantingauthority = require("./routes/grantingauthority-add-cancel");
app.use("/cancelgrantingauthority", cancelgrantingauthority);

var editreviewgrantingauthority = require("./routes/grantingauthority-editreview");
app.use("/editreviewgrantingauthority", editreviewgrantingauthority);

var editgacancel = require("./routes/grantingauthority-editcancel");
app.use("/editgacancel", editgacancel);

var addsuccessgrantingauthority = require("./routes/grantingauthority-addsuccessfully");
app.use("/addsuccessgrantingauthority", addsuccessgrantingauthority);

var addgrantingauthority = require("./routes/grantingauthority-add");
app.use("/addgrantingauthority", addgrantingauthority);

var deactivategrantingauthority = require("./routes/grantingauthority-deactivate");
app.use("/deactivategrantingauthority", deactivategrantingauthority);

var deactivatedGA = require("./routes/grantingauthority-deactivated-successfully");
app.use("/gadeactivated", deactivatedGA);

var choosedashboard = require("./routes/choosedashboard");
app.use("/choosedashboard", choosedashboard);

var mysubsidymeasures = require("./routes/mysubsidymeasures");
app.use("/mysubsidymeasures", mysubsidymeasures);

var addsubsidymeasures = require("./routes/subsidymeasures-add");
app.use("/addsubsidymeasures", addsubsidymeasures);

var canceladdsubsidymeasures = require("./routes/subsidymeasure-add-cancel");
app.use("/canceladdsubsidymeasures", canceladdsubsidymeasures);

var cancelreviewsubsidymeasures = require("./routes/subsidymeasure-review-cancel");
app.use("/cancelreviewsubsidymeasures", cancelreviewsubsidymeasures);

var addreviewsubsidymeasures = require("./routes/subsidymeasure-add-review");
app.use("/addreviewsubsidymeasures", addreviewsubsidymeasures);

var subsidymeasurepublished = require("./routes/subsidymeasure-published");
app.use("/subsidymeasurepublished", subsidymeasurepublished);

var reviewsubsidymeasures = require("./routes/subsidymeasure-reviewdetails");
app.use("/reviewsubsidymeasures", reviewsubsidymeasures);

var editsubsidymeasures = require("./routes/subsidymeasure-edit");
app.use("/editsubsidymeasure", editsubsidymeasures);

var subsidymeasurereedit = require("./routes/subsidymeasure-re-edit");
app.use("/subsidymeasurereedit", subsidymeasurereedit);

var editreviewsubsidymeasure = require("./routes/subsidymeasure-editreview");
app.use("/editreviewsubsidymeasure", editreviewsubsidymeasure);

var subsidymeasurereditreview = require("./routes/subsidymeasure-re-editreview");
app.use("/subsidymeasurereditreview", subsidymeasurereditreview);

var awardspageroute = require("./routes/awardspageroute");
app.use("/awardspageroute", awardspageroute);

var awardspageperroute = require("./routes/awardspageperroute");
app.use("/awardspageperroute", awardspageperroute);

var awardsfilterroute = require("./routes/awardsfilterroute");
app.use("/awardsfilterroute", awardsfilterroute);

var measuresfilterroute = require("./routes/measuresfilterroute");
app.use("/measuresfilterroute", measuresfilterroute);

var measuresortroute = require("./routes/measuresortroute");
app.use("/measuresortroute", measuresortroute);

var measuresearchroute = require("./routes/measuresearchroute");
app.use("/measuresearchroute", measuresearchroute);

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

var userselect = require("./routes/user-select");
app.use("/userselect", userselect);

var usersubmit = require("./routes/user-submit");
app.use("/usersubmit", usersubmit);

var adduser = require("./routes/user-add");
app.use("/adduser", adduser);

var edituser = require("./routes/user-edit");
app.use("/edituser", edituser);

var canceluser = require("./routes/user-cancel");
app.use("/canceluser", canceluser);

var userreview = require("./routes/user-review");
app.use("/userreview", userreview);

var useraddedsuccessfully = require("./routes/user-added-successfully");
app.use("/useraddedsuccessfully", useraddedsuccessfully);

var userindividualdetails = require("./routes/user-individual-detail");
app.use("/userindividualdetails", userindividualdetails);

var userdeactivate = require("./routes/user-deactivate");
app.use("/userdeactivate", userdeactivate);

var userdeactivated = require("./routes/user-deactivated-successfully");
app.use("/userdeactivated", userdeactivated);

var useraccount = require("./routes/user-account");
app.use("/useraccount", useraccount);

module.exports = app;
