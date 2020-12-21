const express = require('express')
const app = express()
const fs = require("fs");
const request = require("request");
const methodOverride = require('method-override')
const path = require('path')
const fileUpload = require('express-fileupload')
const fetch = require("node-fetch");
const { callbackify } = require('util')
const { Http2ServerRequest } = require('http2');
const { contains } = require('jquery');

app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public'));

const users = []
// app.use(fileUpload());
app.use(fileUpload({
  useTempFiles : false,
  tempFileDir : '/tmp/'
}));
app.locals.awards = require('./views/bulkupload/awards.json');
app.locals.Subsidy_Control_Number_Global ;
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

/***************************************************** */
/* Default login screen - Web application Launch screen */
/****************************************************** */
app.get('/',(req, res) => {
  res.render('bulkupload/logintransparency')
})

// app.get('/',(req, res) => {
//   res.render('accessmanagement/enterotp')
// })

// var enterotp = require('./routes/enterotp');
// app.use('/enterotp',enterotp);


var test = require('./routes/test');
app.use('/test',test);


/****************************************************** */
/* All Router declarations */
/****************************************************** */

var loginfirstpage = require('./routes/loginfirstpage');
app.use('/loginfirstpage',loginfirstpage);

var mysubsidyawards = require('./routes/mysubsidyawards');
app.use('/mysubsidyawards',mysubsidyawards);

var bulkuploadsubsidy = require('./routes/bulkuploadsubsidy');
app.use('/bulkuploadsubsidy',bulkuploadsubsidy);

var loginforgetpassword = require('./routes/loginforgetpassword');
app.use('/loginforgetpassword',loginforgetpassword);

var loginnewpassword = require('./routes/loginnewpassword');
app.use('/loginnewpassword',loginnewpassword);

var loginemailconfirmation = require('./routes/loginemailconfirmation');
app.use('/loginemailconfirmation',loginemailconfirmation);

var loginpasswordcomplete = require('./routes/loginpasswordcomplete');
app.use('/loginpasswordcomplete',loginpasswordcomplete);

var loginresetpassword = require('./routes/loginresetpassword');
app.use('/loginresetpassword',loginresetpassword);

var loginemailconfirmationexpiry = require('./routes/loginemailconfirmationexpiry');
app.use('/loginemailconfirmationexpiry',loginemailconfirmationexpiry);

var reviewdetail = require('./routes/reviewdetail');
app.use('/reviewdetail',reviewdetail);

var formvalidation = require('./routes/formvalidation');
app.use('/formvalidation',formvalidation);

var addsubsidyaward = require('./routes/addsubsidyaward');
app.use('/addsubsidyaward',addsubsidyaward);

var cancelmysubsidy = require('./routes/cancelmysubsidy');
app.use('/cancelmysubsidy',cancelmysubsidy);

var addsubsidyreview = require('./routes/addsubsidyreview');
app.use('/addsubsidyreview',addsubsidyreview);

var submitforapproval = require('./routes/submitforapproval');
app.use('/submitforapproval',submitforapproval);

var beisadmindashboard = require('./routes/beisadmindashboard');
app.use('/beisadmindashboard',beisadmindashboard);

var mygrantingauthority = require('./routes/mygrantingauthority');
app.use('/mygrantingauthority',mygrantingauthority);

var editgrantingauthority = require('./routes/editgrantingauthority');
app.use('/editgrantingauthority',editgrantingauthority);



const port = process.env.PORT || 3000;
app.listen(port);

console.log("Server running at https://localhost:3000");
