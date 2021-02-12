// *************************************************************
// Gov.UK transparency database - App.js is the subset of server.js
// *************************************************************

const express = require("express");
const cookierParser = require("cookie-parser");
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
var multer = require("multer");
const axios = require("axios");

var upload = multer();

// for parsing application/json
app.use(express.json());
const jwt_decode = require("jwt-decode");
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

app.locals.gaId_no_arrow;
app.locals.ganame_arrow;
app.locals.added_by_arrow;
app.locals.status_arrow;
app.locals.created_on_arrow;
app.locals.last_modified_arrow;

/***************************************************** */
/* Default login screen - Web application Launch screen */
/****************************************************** */

app.get("/", async (req, res) => {
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  // res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  res.render("bulkupload/logintransparency");
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

var useraccount = require("./routes/user-account");
app.use("/useraccount", useraccount);

module.exports = app;
