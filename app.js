// *************************************************************
// Gov.UK transparency database - App.js is the subset of server.js
// *************************************************************

const express = require("express");
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

app.locals.beis_url_publishing;
app.locals.beis_url_accessmanagement;
app.locals.beis_url_publicsearch;

const users = [];
// app.use(fileUpload());
app.use(
  fileUpload({
    useTempFiles: false,
    tempFileDir: "/tmp/",
  })
);
app.locals.awards = require("./views/bulkupload/awards.json");
app.locals.Subsidy_Control_Number_Global;
app.locals.Subsidy_Control_Number_Global_Substring;
app.locals.Subsidy_Measure_Title_Global;
app.locals.Subsidy_Objective_Global;
app.locals.Subsidy_Instrument_Global;
app.locals.Subsidy_Element_Full_Amount_Global;
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

/***************************************************** */
/* Default login screen - Web application Launch screen */
/****************************************************** */
app.get("/", (req, res) => {
  res.render("bulkupload/logintransparency");
});

var logintransparency = require("./routes/logintransparency");
app.use("/logintransparency", logintransparency);

// app.get('/',(req, res) => {
//   res.render('accessmanagement/enterotp')
// })

// var enterotp = require('./routes/enterotp');
// app.use('/enterotp',enterotp);

var test = require("./routes/test");
app.use("/test", test);

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

// var updatesubsidyaward = require("./routes/subsidyaward-update");
// app.use("/updatesubsidyaward", updatesubsidyaward);

var rejectsubsidyaward = require("./routes/subsidyaward-reject");
app.use("/rejectsubsidyaward", rejectsubsidyaward);

var approverejectsubsidyaward = require("./routes/subsidyaward-approve-reject");
app.use("/approverejectsubsidyaward", approverejectsubsidyaward);

var cancelmysubsidy = require("./routes/cancelmysubsidy");
app.use("/cancelmysubsidy", cancelmysubsidy);

var addsubsidyreview = require("./routes/addsubsidyreview");
app.use("/addsubsidyreview", addsubsidyreview);

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

module.exports = app;
