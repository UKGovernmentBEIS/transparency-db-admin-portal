// *************************************************************
// Gov.UK transparency database - App.js is the subset of server.js
// *************************************************************

var express = require("express");
var cookierParser = require("cookie-parser");
var app = express();

var methodOverride = require("method-override");
var path = require("path");
var fileUpload = require("express-fileupload");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.use(cookierParser());
// var users = [];
// app.use(fileUpload());
app.use(
  fileUpload({
    useTempFiles: false,
    tempFileDir: "/tmp/",
  })
);

var axios = require("axios");
app.use(express.json());
var jwt_decode = require("jwt-decode");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.locals.awards = require("./views/bulkupload/awards.json");

app.locals.beis_url_publishing;
app.locals.beis_url_accessmanagement;
app.locals.beis_url_publicsearch;
app.locals.beis_url_searchscheme;

app.locals.gaAdminCount_Global;
app.locals.gaApproverCount_Global;
app.locals.gaEncoderCount_Global;
app.locals.gaTotalCount_Global;
/***************************************************** */
/* Default login screen - Web application Launch screen */
/****************************************************** */

var session = require("express-session");
app.use(
  session({
    secret: "Key",
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
    httpOnly: false,
    secure: true,
    sameSite: "none",
    resave: true,
    saveUninitialized: true,
  })
);

console.log("Start of the application");

app.get("/", async (req, res) => {
  var ssn = {};

  console.log("Landing root route");
  var id_token = req.header("x-ms-token-aad-id-token");

  if (id_token  == null){
    id_token = process.env.ID_TOKEN;
  }
   console.log("id_token " + id_token);
  // console.log("req.session", req.session);
  ssn = req.session;
  // ssn.Subsidy_Control_Number_Global="";
  // ssn.SubsidyArraySize;
  // ssn.isAddSubsidyPrimarycall;
  // ssn.Subsidy_Control_Number_Global_Substring;
  // ssn.Subsidy_Measure_Title_Global;
  // ssn.Subsidy_Adhoc_Global;
  // ssn.Subsidy_Objective_Global;
  // ssn.Subsidy_Objective_Other_Global;
  // ssn.Subsidy_Objective_Plus_Other_Global;
  // ssn.Subsidy_Instrument_Global;
  // ssn.Subsidy_Instrument_Other_Global;
  // ssn.Subsidy_Instrument_Plus_Other_Global;
  // ssn.Subsidy_Element_Full_Amount_Global;
  // ssn.Subsidy_Element_Full_Amount_Global_Trim;
  // ssn.National_ID_Type_Global;
  // ssn.National_ID_Number_Global;
  // ssn.Beneficiary_Name_Global;
  // ssn.Size_of_the_Organisation_Global;
  // ssn.Granting_Authority_Name_Global;
  // ssn.Legal_Basis_Global;
  // ssn.Legal_Granting_Date_Day_Global;
  // ssn.Legal_Granting_Date_Month_Global;
  // ssn.Legal_Granting_Date_Year_Global;
  // ssn.Goods_or_Services_Global;
  // ssn.Spending_Region_Global;
  // ssn.Spending_Sector_Global;
  // ssn.Granting_Authority_URL_Global;
  // ssn.Granting_Authority_Policy_Global;
  // ssn.Budget_Global;

  // ssn.Scheme_Start_Day_Global;
  // ssn.Scheme_Start_Month_Global;
  // ssn.Scheme_Start_Year_Global;
  // ssn.Scheme_End_Day_Global;
  // ssn.Scheme_End_Month_Global;
  // ssn.Scheme_End_Year_Global;

  // ssn.grantingAuthorityID_global;
  // ssn.grantingAuthorityName_Global;

  // ssn.GetMonthName;
  // ssn.GetEndMonthName;
  // ssn.file_upload_name;
  // ssn.isCallfromEditAward;
  // ssn.addUser_extract;

  // ssn.email_addresspass;
  // ssn.formvalidationerrpass = [];
  // ssn.errorsvalidationpass = [];

  // ssn.dashboard_user_name;
  // ssn.user_id;

  // ssn.dashboard_ga_name;
  // ssn.dashboard_roles;
  // ssn.dashbaord_ga_ID;
  // ssn.frontend_totalRecordsPerPage;
  // ssn.Environment_variable;

  // ssn.pageCount;
  // ssn.previous_page;
  // ssn.next_page;
  // ssn.start_record;
  // ssn.end_record;
  // ssn.totalrows;
  // ssn.current_page_active;
  // ssn.current_page;
  // ssn.start_page;
  // ssn.end_page;
  // ssn.dashboardawards;
  // ssn.awardnumber;
  // ssn.fetchawarddetails;
  // ssn.Award_search_URL;
  // ssn.grantingAuthorityPublish_Global;

  // ssn.Award_selected_status;
  // ssn.awards_status;
  // ssn.Award_search_text;

  // ssn.scheme_selected_status;
  // ssn.schemes_status;
  // ssn.Schemes_search_text;
  // ssn.scNumber_Global;

  // ssn.Subsidy_Control_Number_Error;
  // ssn.Subsidy_Measure_Title_Error;
  // ssn.Subsidy_Adhoc_Error;
  // ssn.Subsidy_Objective_Error;
  // ssn.Subsidy_Objective_Other_Error;
  // ssn.Subsidy_Instrument_Error;
  // ssn.Subsidy_Instrument_Other_Error;
  // ssn.Subsidy_Element_Full_Amount_Error;
  // ssn.Subsidy_Full_Amount_Range_Error;
  // ssn.National_ID_Type_Error;
  // ssn.National_ID_Number_Error;
  // ssn.Beneficiary_Name_Error;
  // ssn.Size_of_the_Organisation_Error;
  // ssn.Granting_Authority_Name_Error;
  // ssn.Granting_Authority_Valid_Name_Error;
  // ssn.Legal_Granting_Date_Day_Error;
  // ssn.Legal_Granting_Date_Month_Error;
  // ssn.Legal_Granting_Date_Year_Error;
  // ssn.Goods_or_Services_Error;
  // ssn.Spending_Region_Error;
  // ssn.Spending_Sector_Error;
  // ssn.grantingAuthorityName_Error;
  // ssn.grantingAuthorityName_Error_Msg;

  // ssn.searchmeasuredetails;
  // ssn.Subsidy_Control_Number_Global_Text;
  // ssn.Scheme_Legal_Granting_Start_Date_Month;
  // ssn.Scheme_Legal_Granting_Start_Date_Day;
  // ssn.Scheme_Legal_Granting_Start_Date_Year;
  // ssn.Scheme_Legal_Granting_End_Date_Month;
  // ssn.Scheme_Legal_Granting_End_Date_Day;
  // ssn.Scheme_Legal_Granting_End_Date_Year;
  // ssn.subsidy_scheme_name_sorting_order;
  // ssn.subsidy_control_no_sorting_order;
  // ssn.granting_authority_sorting_order;
  // ssn.start_date_sorting_order;
  // ssn.end_date_sorting_order;
  // ssn.duration_sorting_order;
  // ssn.budget_sorting_order;
  // ssn.sorting_order_pass;
  // ssn.Search_Text_Global;

  // ssn.apiroles_extract;
  // ssn.apiroles_total_objects;
  // ssn.isUserSlectIsPrimaryCall;
  // ssn.Granting_Authority_Name_Measure_Global;
  // ssn.Granting_Authority_Selected;
  // ssn.GA_Selected;
  // ssn.Roles_Selected;
  // ssn.GAUserList;

  // ssn.gaId_no_arrow;
  // ssn.ganame_arrow;
  // ssn.added_by_arrow;
  // ssn.status_arrow;
  // ssn.created_on_arrow;
  // ssn.last_modified_arrow;
  // ssn.UserPrincileObjectGlobal;

  // ssn.User_Role_Global;
  // ssn.GA_Name_User_Global;
  // ssn.Full_Name_Global;
  // ssn.Last_Name_Global;
  // ssn.Email_Id_Global;
  // ssn.Phone_Number_Global;
  // ssn.UserErrorLength_Global;
  // ssn.Full_Name_Error;
  // ssn.Last_Name_Error;
  // ssn.Email_Id_Error;
  // ssn.User_Role_Error;
  // ssn.GA_Name_User_Error;
  // ssn.Phone_Number_Error;
  // ssn.UserErrorsLenght;

  // ssn.gaID_extract;

  // ssn.User_Role_Single;
  // ssn.User_GA_Name;
  // ssn.User_Name_Single;
  // ssn.User_Last_Name_Single;
  // ssn.User_Email_Single;
  // ssn.User_Mobile_Single;
  // ssn.Delete_UserId;

  // ssn.GAUserList_Empty;

  // ssn.GaListArr_Global;

  var Environment_variable = process.argv[2];
    
  if (Environment_variable == "env=local") {
    var localServices;
    var localSvcObj = {
      "publishsubs" : false,
      "accessmgmt" : false,
      "publicsearch" : false,
      "gaschemes" : false
    }
    //Parse local service flags to determine whether specific local services are referenced or not.
    //Note: the ports are important if running locally, check the spring server is running on these
    if (process.argv.length > 3){
      localServices = process.argv[3];
      console.log("app.js: Local process argument is " + localServices);

      //Example of expected local services input is;
      // local=publishsubs,accessmgmt,publicsearch,gaschemes
      //the above example would reference all 4 backend services locally
      //omitting one would omit it from local reference
      if (localServices.indexOf("=") !== -1){
        var str = localServices.split("=")[1];
        //If single value, i.e. local=accessmgmt push to localServices
        var localArr = [];
        if (str.indexOf(",") !== -1){
          //If str contains , i.e. is more than one service in list
          localArr = str.split(",");
        } else {
          localArr.push(str);
        }
        
        for (var i in localArr){
          if (localArr[i].toLowerCase().indexOf("publishsubs") !== -1){
            localSvcObj.publishsubs = true;
            console.log("app.js: Targeting local publishing subsidies service");
          }
          if (localArr[i].toLowerCase().indexOf("accessmgmt") !== -1){
            localSvcObj.accessmgmt = true;
            console.log("app.js: Targeting local access management service");
          }
          if (localArr[i].toLowerCase().indexOf("publicsearch") !== -1){
            localSvcObj.publicsearch = true;
            console.log("app.js: Targeting local public search service");
          }
          if (localArr[i].toLowerCase().indexOf("gaschemes") !== -1){
            localSvcObj.gaschemes = true;
            console.log("app.js: Targeting local GA schemes service");
          }
        }
      }
    } else {
      console.log("app.js: Defaulting to targeting all local backend services");
      //Default to use all local services if local= omitted
      localSvcObj.publishsubs = true;
      localSvcObj.accessmgmt = true;
      localSvcObj.publicsearch = true;
      localSvcObj.gaschemes = true;
    }

    // DM 03-09-21
    //Ideally need to keep these URLs in a separate file so these URL variables have a single value assignment
    beis_url_publishing = ((localSvcObj.publishsubs) ?
      "http://localhost:8178" : "https://dev-transparency-db-publishing-subsidies-service.azurewebsites.net");
      
    beis_url_accessmanagement = ((localSvcObj.accessmgmt) ?
      "http://localhost:8090" : "https://dev-transparency-db-access-management-service.azurewebsites.net"); 

    beis_url_publicsearch = ((localSvcObj.publicsearch) ?
      "http://localhost:8581" : "https://dev-transparency-db-public-search-service.azurewebsites.net"); 
      
    beis_url_searchscheme = ((localSvcObj.gaschemes) ?
      "http://localhost:8182" : "https://dev-transparency-db-ga-schemes-service.azurewebsites.net"); 

    beis_redirect_url = "http://localhost:3000"; //http://localhost:3000
    beis_public_search =
      "http://localhost:3001"; //http://localhost:3001

    console.log(beis_url_publishing);
    console.log(beis_url_accessmanagement);
    console.log(beis_url_publicsearch);
  } else if (Environment_variable == "env=dev") {
    //                    OLD URLs below
    // beis_url_publishing =        
    //   "https://dev-beis-tp-db-publishing-subsidies-service.azurewebsites.net";
    // beis_url_accessmanagement =
    //   "https://dev-beis-tp-db-accessmanagement-service-app.azurewebsites.net";
    // beis_url_publicsearch =
    //   "https://dev-beis-tp-db-public-search-service.azurewebsites.net";
    // beis_url_searchscheme =
    //   "https://dev-beis-tp-db-ga-schemes-service.azurewebsites.net";

    // beis_
    _url = "https://dev-beis-tp-dp-admin-portal.azurewebsites.net";
    // beis_public_search =
    //   "https://dev-beis-tp-db-publicsearch-portal.azurewebsites.net";

    // DM 30-04-21
    beis_url_publishing =
      "https://dev-transparency-db-publishing-subsidies-service.azurewebsites.net";
    beis_url_accessmanagement =
      "https://dev-transparency-db-access-management-service.azurewebsites.net";
    beis_url_publicsearch =
      "https://dev-transparency-db-public-search-service.azurewebsites.net";
    beis_url_searchscheme =
      "https://dev-transparency-db-ga-schemes-service.azurewebsites.net";

    beis_redirect_url = "https://manageuksubsidies-dev.beis.gov.uk";
    beis_public_search =
      "https://dev-transparency-db-publicsearch-portal.azurewebsites.net";

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
    beis_redirect_url =
      "http://integ-transparency-db-admin-portal.azurewebsites.net";
    beis_public_search =
      "https://integ-transparency-db-publicsearch-portal.azurewebsites.net";
    console.log(beis_url_publishing);
    console.log(beis_url_accessmanagement);
    console.log(beis_url_publicsearch);
  } else if (Environment_variable == "env=stg") {
    beis_url_publishing =
      "https://stg-transparency-db-publishing-subsidies-service.azurewebsites.net";
    beis_url_accessmanagement =
      "https://stg-transparency-db-access-management-service.azurewebsites.net";
    beis_url_publicsearch =
      "https://stg-transparency-db-public-search-service.azurewebsites.net";
    beis_url_searchscheme =
      "https://stg-transparency-db-ga-schemes-service.azurewebsites.net";
    beis_redirect_url = "https://manageuksubsidies-stg.beis.gov.uk";
    beis_public_search = "https://searchforuksubsidies-stg.beis.gov.uk";
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
    beis_redirect_url = "https://manageuksubsidies.beis.gov.uk";
    beis_public_search = "https://searchforuksubsidies.beis.gov.uk";
    console.log(beis_url_publishing);
    console.log(beis_url_accessmanagement);
    console.log(beis_url_publicsearch);
  }

  // *******************
  // Globale declarations
  // *******************
  ssn.frontend_totalRecordsPerPage = 10;

  var id_token_decoded = jwt_decode(id_token);
  // console.log("id_token_decoded " + id_token_decoded);
  // console.log("logged in user " + id_token_decoded.name);
  // console.log("id_token_decoded parsed " + JSON.stringify(id_token_decoded));
  var id_token_json = JSON.parse(JSON.stringify(id_token_decoded));
  ssn.dashboard_user_name = id_token_decoded.name;
  ssn.user_id = id_token_decoded.oid;
  ssn.dashboard_roles_object = JSON.stringify(id_token_json.roles);
  // console.log("username : " + ssn.dashboard_user_name);
  // console.log("roles :" + ssn.dashboard_roles_object);
  ssn.dashboard_roles_object_id1 = ssn.dashboard_roles_object.substr(2, 36);
  ssn.dashboard_roles_object_id2 = ssn.dashboard_roles_object.substr(41, 36);

  console.log(
    "ssn.dashboard_roles_object_id1:" + ssn.dashboard_roles_object_id1
  );
  console.log(
    "ssn.dashboard_roles_object_id2:" + ssn.dashboard_roles_object_id2
  );

  try {
    var apiroles = await axios.get(
      beis_url_accessmanagement + "/accessmanagement/allga"
    );
    console.log(`Status: ${apiroles.status}`);
    API_response_code = `${apiroles.status}`;
    console.log("API_response_code: try" + API_response_code);
    // console.log("Body: ", apiroles.data);
    ssn.apiroles_extract = apiroles.data;
    ssn.apiroles_total_objects = Object.keys(ssn.apiroles_extract).length;
    // console.log(" apiroles_total_objects: ", ssn.apiroles_total_objects);

    for (var i = 0; i < ssn.apiroles_total_objects; i++) {
      if (ssn.dashboard_roles_object_id1 == ssn.apiroles_extract[i].azGrpId) {
        console.log("gaName id1 : " + ssn.apiroles_extract[i].gaId);
        apiroles_extract_object1 = ssn.apiroles_extract[i].gaName;
        ssn.dashbaord_ga_ID = ssn.apiroles_extract[i].gaId;
      }
    }

    for (var i = 0; i < ssn.apiroles_total_objects; i++) {
      if (ssn.dashboard_roles_object_id2 == ssn.apiroles_extract[i].azGrpId) {
        console.log("gaName id2 : " + ssn.apiroles_extract[i].gaName);
        apiroles_extract_object2 = ssn.apiroles_extract[i].gaName;
      }
    }
  } catch (err) {
    response_error_message = err;
    console.log("message error : " + err);
    console.log("response_error_message catch : " + response_error_message);
    // window.location.href = "/signout";
  }

  if (apiroles_extract_object1.includes("BEIS Administrator")) {
    ssn.dashboard_roles = "BEIS Administrator";
    ssn.dashboard_ga_name = apiroles_extract_object2;
    azGrpId_Global = ssn.dashboard_roles_object_id2;
  } else if (
    apiroles_extract_object1.includes("Granting Authority Administrator")
  ) {
    ssn.dashboard_roles = "Granting Authority Administrator";
    ssn.dashboard_ga_name = apiroles_extract_object2;
    azGrpId_Global = ssn.dashboard_roles_object_id2;
  } else if (apiroles_extract_object1.includes("Granting Authority Approver")) {
    ssn.dashboard_roles = "Granting Authority Approver";
    ssn.dashboard_ga_name = apiroles_extract_object2;
    azGrpId_Global = ssn.dashboard_roles_object_id2;
  } else if (apiroles_extract_object1.includes("Granting Authority Encoder")) {
    ssn.dashboard_roles = "Granting Authority Encoder";
    ssn.dashboard_ga_name = apiroles_extract_object2;
    azGrpId_Global = ssn.dashboard_roles_object_id2;
  }

  if (apiroles_extract_object2.includes("BEIS Administrator")) {
    ssn.dashboard_roles = "BEIS Administrator";
    ssn.dashboard_ga_name = apiroles_extract_object1;
    azGrpId_Global = ssn.dashboard_roles_object_id1;
  } else if (
    apiroles_extract_object2.includes("Granting Authority Administrator")
  ) {
    ssn.dashboard_roles = "Granting Authority Administrator";
    ssn.dashboard_ga_name = apiroles_extract_object1;
    azGrpId_Global = ssn.dashboard_roles_object_id1;
  } else if (apiroles_extract_object2.includes("Granting Authority Approver")) {
    ssn.dashboard_roles = "Granting Authority Approver";
    ssn.dashboard_ga_name = apiroles_extract_object1;
    azGrpId_Global = ssn.dashboard_roles_object_id1;
  } else if (apiroles_extract_object2.includes("Granting Authority Encoder")) {
    ssn.dashboard_roles = "Granting Authority Encoder";
    ssn.dashboard_ga_name = apiroles_extract_object1;
    azGrpId_Global = ssn.dashboard_roles_object_id1;
  }

  // console.log("ssn.dashboard_roles : " + ssn.dashboard_roles);
  // console.log("ssn.dashboard_ga_name : " + ssn.dashboard_ga_name);

  var userPrincipleRequest =
    '{"userName":"' +
    ssn.dashboard_user_name +
    '","password":"password123",' +
    '"role":"' +
    ssn.dashboard_roles +
    '","grantingAuthorityGroupId":"' +
    ssn.dashbaord_ga_ID +
    '","grantingAuthorityGroupName":"' +
    ssn.dashboard_ga_name +
    '"}';

  // console.log("userprincile: " + userPrincipleRequest);
  ssn.UserPrincileObjectGlobal = {
    headers: {
      userPrinciple: userPrincipleRequest,
      "x-ms-token-aad-id-token": id_token,
      "Content-Type": "application/json;charset=UTF-8",
    },
  };
  gaAdminCount_Global = 0;
  gaApproverCount_Global = 0;
  gaEncoderCount_Global = 0;
  gaTotalCount_Global = 0;
  azuserUsers = 0;
  try {
    // azGrpId = ssn.dashboard_roles_object_id1;
    // if (ssn.dashboard_roles == "BEIS Administrator")
    //   azGrpId = ssn.dashboard_roles_object_id1;
    // else azGrpId = ssn.dashboard_roles_object_id2;
    userManagementEndpoint = "/usermanagement/groups/" + azGrpId_Global; // default to users for group
    if (ssn.dashboard_roles == "BEIS Administrator") {
        userManagementEndpoint = "/usermanagement/countUsers"; // if BEIS Admin, just get counts
    }
    const apidata = await axios.get(
      beis_url_accessmanagement + userManagementEndpoint,
      ssn.UserPrincileObjectGlobal
    );
    console.log(`Status: ${apidata.status}`);
    API_response_code = `${apidata.status}`;
    console.log("Body GROUPS: ", apidata.data.value);

    if (ssn.dashboard_roles != "BEIS Administrator") {
      apidata.data.value.forEach(function (items) {
        if (items.roleName.toLowerCase().includes("administrators"))
          gaAdminCount_Global++;
        if (items.roleName.toLowerCase().includes("approvers"))
          gaApproverCount_Global++;
        if (items.roleName.toLowerCase().includes("encoders"))
          gaEncoderCount_Global++;
        if(items.roleName == 'Azure-User')
          azuserUsers++;
      });
      gaTotalCount_Global = (apidata.data.value.length - azuserUsers);
    } else if (ssn.dashboard_roles == "BEIS Administrator") {
      gaAdminCount_Global = apidata.data.adminCount;
      gaApproverCount_Global = apidata.data.approverCount;
      gaEncoderCount_Global = apidata.data.encoderCount;
      gaTotalCount_Global = apidata.data.totalCount;
    }
  } catch (err) {
    response_error_message = err;
    console.log("message error : " + err);
    console.log(
      "response_error_message catchGROUPS : " + response_error_message
    );
    res.redirect("/signout");
    // window.location.href = "/signout";
  }
  var searchAudits = [];
  try {
    const data_request = {
      searchName: "",
      searchStartDate: "",
      searchEndDate: "",
      pageNumber: 1,
      totalRecordsPerPage: 10,
      sortBy: ["createdTimestamp,desc"],
    };
    const apidata = await axios.post(
      beis_url_accessmanagement + "/accessmanagement/auditlogs",
      data_request,
      ssn.UserPrincileObjectGlobal
    );

    // console.log("Body: ", apidata.data);
    if (apidata.data.auditLogs.length > 5) {
      for (var i = 0; i <= 4; i++) {
        searchAudits.push(apidata.data.auditLogs[i]);
      }
    } else {
      for (var i = 0; i < apidata.data.auditLogs.length; i++) {
        searchAudits.push(apidata.data.auditLogs[i]);
      }
    }
    console.log("searchAudits", searchAudits);
  } catch (err) {
    console.log("searchAudits", searchAudits);
    console.log("message error : " + err);
  }

  console.log("ssn.dashboard_roles", ssn.dashboard_roles);
  console.log("ssn.dashboard_roles_object_id1", ssn.dashboard_roles_object_id1);
  console.log("ssn.dashboard_roles_object_id2", ssn.dashboard_roles_object_id2);

  if (ssn.dashboard_roles == "BEIS Administrator") {
    var data = JSON.parse(JSON.stringify(userPrincipleRequest));
    // console.log("request :" + JSON.stringify(data));

    try {
      var apidata = await axios.get(
        beis_url_accessmanagement + "/accessmanagement/beisadmin",
        ssn.UserPrincileObjectGlobal
      );
      // console.log(`Status: ${apidata.status}`);
      // API_response_code = `${apidata.status}`;
      // console.log("API_response_code: try" + API_response_code);
      // console.log("Body: ", apidata.data);
      dashboardawards = apidata.data;

      res.render("bulkupload/dashboard-beisadmin", {
        beis_url_accessmanagement,
        ssn,
        searchAudits,
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
  } else if (ssn.dashboard_roles == "Granting Authority Administrator") {
    var data = JSON.parse(JSON.stringify(userPrincipleRequest));
    // console.log("request :" + JSON.stringify(data));

    try {
      var apidata = await axios.get(
        beis_url_accessmanagement + "/accessmanagement/gaadmin",
        ssn.UserPrincileObjectGlobal
      );
      // console.log(`Status: ${apidata.status}`);
      API_response_code = `${apidata.status}`;
      // console.log("API_response_code: try" + API_response_code);
      // console.log("Body: ", apidata.data);
      dashboardawards = apidata.data;
      res.render("bulkupload/dashboard-gaadmin", {
        beis_url_accessmanagement,
        // ssn.dashboard_user_name,
        ssn,
        searchAudits,
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
  } else if (ssn.dashboard_roles == "Granting Authority Approver") {
    var data = JSON.parse(JSON.stringify(userPrincipleRequest));
    console.log("request :" + JSON.stringify(data));

    try {
      var apidata = await axios.get(
        beis_url_accessmanagement + "/accessmanagement/gaapprover",
        ssn.UserPrincileObjectGlobal
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
        ssn,
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
  } else if (ssn.dashboard_roles == "Granting Authority Encoder") {
    var data = JSON.parse(JSON.stringify(userPrincipleRequest));
    console.log("request :" + JSON.stringify(data));

    try {
      var apidata = await axios.get(
        beis_url_accessmanagement + "/accessmanagement/gaencoder",
        ssn.UserPrincileObjectGlobal
      );
      console.log(`Status: ${apidata.status}`);
      API_response_code = `${apidata.status}`;
      console.log("API_response_code: try" + API_response_code);
      console.log("Body: ", apidata.data);
      dashboardawards = apidata.data;
      res.render("bulkupload/dashboard-gaencoder", {
        beis_url_accessmanagement,
        // ssn.dashboard_user_name,
        ssn,
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

// var subsidyawarddeletedsuccessfully = require("./routes/subsidyaward-deleted-successfully");
// app.use("/subsidyawarddeletedsuccessfully", subsidyawarddeletedsuccessfully);

var bulkuploadsubsidy = require("./routes/bulkuploadsubsidy");
app.use("/bulkuploadsubsidy", bulkuploadsubsidy);

// var loginforgetpassword = require("./routes/loginforgetpassword");
// app.use("/loginforgetpassword", loginforgetpassword);

// var loginnewpassword = require("./routes/loginnewpassword");
// app.use("/loginnewpassword", loginnewpassword);

// var loginemailconfirmation = require("./routes/loginemailconfirmation");
// app.use("/loginemailconfirmation", loginemailconfirmation);

// var loginpasswordcomplete = require("./routes/loginpasswordcomplete");
// app.use("/loginpasswordcomplete", loginpasswordcomplete);

// var loginresetpassword = require("./routes/loginresetpassword");
// app.use("/loginresetpassword", loginresetpassword);

// var loginemailconfirmationexpiry = require("./routes/loginemailconfirmationexpiry");
// app.use("/loginemailconfirmationexpiry", loginemailconfirmationexpiry);

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

// var choosedashboard = require("./routes/choosedashboard");
// app.use("/choosedashboard", choosedashboard);

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

var cancelsubsidymeasure = require("./routes/subsidymeasure-edit-cancel");
app.use("/cancelsubsidymeasure", cancelsubsidymeasure);

var subsidymeasurereedit = require("./routes/subsidymeasure-re-edit");
app.use("/subsidymeasurereedit", subsidymeasurereedit);

var editreviewsubsidymeasure = require("./routes/subsidymeasure-editreview");
app.use("/editreviewsubsidymeasure", editreviewsubsidymeasure);

var subsidymeasurereditreview = require("./routes/subsidymeasure-re-editreview");
app.use("/subsidymeasurereditreview", subsidymeasurereditreview);

var deactivatescheme = require("./routes/subsidymeasure-deactivate");
app.use("/deactivatescheme", deactivatescheme);

var successfullydeactivatescheme = require("./routes/subsidymeasure-deactivated-successfully");
app.use("/successfullydeactivatescheme", successfullydeactivatescheme);
app.use("/successfullydeletescheme", successfullydeactivatescheme);

var deletescheme = require("./routes/subsidymeasure-delete");
app.use("/deletescheme", deletescheme);

var awardspageroute = require("./routes/awardspageroute");
app.use("/awardspageroute", awardspageroute);

var awardsortroute = require("./routes/awardsortroute");
app.use("/awardsortroute", awardsortroute);

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

// var manageusers = require("./routes/users-manage");
// app.use("/manageusers", manageusers);

var userselect = require("./routes/user-select");
app.use("/userselect", userselect);

var usersubmit = require("./routes/user-submit");
app.use("/usersubmit", usersubmit);

var usersubmitpersonal = require("./routes/user-submit-personal");
app.use("/usersubmitpersonal", usersubmitpersonal);

var adduser = require("./routes/user-add");
app.use("/adduser", adduser);

var adduserpersonal = require("./routes/user-add-personal");
app.use("/adduserpersonal", adduserpersonal);

var edituser = require("./routes/user-edit");
app.use("/edituser", edituser);

var canceluser = require("./routes/user-cancel");
app.use("/canceluser", canceluser);

var userreview = require("./routes/user-review");
app.use("/userreview", userreview);

var userreviewpersonal = require("./routes/user-review-personal");
app.use("/userreviewpersonal", userreviewpersonal);

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

var notAuthorized = require("./routes/notAuthorized");
app.use("/notauthorized", notAuthorized);

var signout = require("./routes/signout");
app.use("/signout", signout);

var feedbackform = require("./routes/feedbackform");
app.use("/feedbackform", feedbackform);

var submitfeedback = require("./routes/feedbacksubmit");
app.use("/submitfeedback", submitfeedback);

var internalguidancedocument = require("./routes/internalguidancedocument");
app.use("/guidancedocument", internalguidancedocument);

var useraccountdetails = require("./routes/user-account-details");
app.use("/useraccountdetails", useraccountdetails);

var useraccountreviewdetails = require("./routes/user-account-review-details");
app.use("/accountreviewdetails", useraccountreviewdetails);

var useraccountcancel = require("./routes/user-account-cancel");
app.use("/user-account-cancel", useraccountcancel);

var useraccountsubmit = require("./routes/user-account-submit");
app.use("/useraccountsubmit", useraccountsubmit);

var usereditreview = require("./routes/user-edit-review");
app.use("/usereditreview", usereditreview);

var usereditsubmit = require("./routes/user-edit-success");
app.use("/usereditsubmit", usereditsubmit);

//audit routes

var audithomepage = require("./routes/audit-homepage-route");
app.use("/audithomepage", audithomepage);

var auditrecordsperpageroute = require("./routes/audit-recordsperpage-route");
app.use("/auditrecordsperpageroute", auditrecordsperpageroute);

var auditsortroute = require("./routes/audit-sort-route");
app.use("/auditsortroute", auditsortroute);

var auditsearchbydateroute = require("./routes/audit-searchbydate-route");
app.use("/auditsearchbydateroute", auditsearchbydateroute);

var auditsearchbytextroute = require("./routes/audit-searchbytext-route");
app.use("/auditsearchbytextroute", auditsearchbytextroute);

var auditpageroute = require("./routes/audit-page-route");
app.use("/auditpageroute", auditpageroute);

// Cookies Consent

var cookieshelp = require("./routes/cookies-help");
app.use("/cookieshelp", cookieshelp);

// Privacy Notice
var privacynotice = require("./routes/privacy-notice");
app.use("/privacy", privacynotice);

// MFA Groupings
app.use("/mfagroupings", require("./routes/mfagroupings"));
app.use("/mfagroupingadd", require("./routes/mfagroupingadd"));
app.use("/mfagroupingreview", require("./routes/mfagroupingreview"));
app.use("/mfagroupingaddreview", require("./routes/mfagroupingaddreview"));
app.use("/mfagroupingcancelreview", require("./routes/mfagroupingcancelreview"));
app.use("/mfagroupingpublished", require("./routes/mfagroupingpublished"));
app.use("/mfagrouping", require("./routes/mfagrouping"));
app.use("/mfagroupingdelete", require("./routes/mfagroupingdelete"));
app.use("/mfagroupingdeletesuccess", require("./routes/mfagroupingdeletesuccess"));

module.exports = app;
