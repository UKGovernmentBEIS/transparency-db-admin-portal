// ********************************************************************
// Gov.UK transparency subsidy awards routing module
// ********************************************************************

const express = require("express");
const router = express.Router();
const axios = require("axios");
var request = require("request");

router.get("/", async (req, res) => {
  console.log("TEST")
  console.log("url :" +  beis_url_accessmanagement );
  frontend_totalRecordsPerPage = 10;
  Award_page = 1;
  awards_status = "Filter results by status";
  Award_selected_status = "";
  Award_search_text = "";

  Base_URL = beis_url_accessmanagement + "/accessmanagement/searchresults?";
  Award_status = "status=" + Award_selected_status;
  Award_concate = "&";
  Award_page = "page=" + Award_page;
  Award_recordsperpage = "recordsPerPage=" + frontend_totalRecordsPerPage;

  Award_search_URL =
    Base_URL +
    Award_status +
    Award_concate +
    Award_page +
    Award_concate +
    Award_recordsperpage;
  console.log("Award_search_URL  : " + Award_search_URL);

  try {
    const apidata = await axios.get(Award_search_URL);
    console.log(`Status: ${apidata.status}`);
    API_response_code = `${apidata.status}`;
    console.log("API_response_code: try" + API_response_code);
    console.log("Body: ", apidata.data);
    searchawards = apidata.data;
    var searchawards_api = apidata.data;
    console.log("searchawards" + searchawards_api);
    const seachawardstring = JSON.stringify(searchawards_api);
    const seachawardJSON = JSON.parse(seachawardstring);
    totalrows = searchawards.totalSearchResults;

    pageCount = Math.ceil(totalrows / frontend_totalRecordsPerPage);
    console.log("totalrows :" + totalrows);
    console.log("pageCount :" + pageCount);
    current_page = 1;
    previous_page = 1;
    next_page = 2;
    start_record = 1;
    end_record = frontend_totalRecordsPerPage;
    current_page_active = 1;

    start_page = 1;
    if (pageCount < 10) {
      end_page = pageCount;
    } else {
      end_page = 9;
    }
    res.render("bulkupload/mysubsidyawards", {
      pageCount,
      previous_page,
      next_page,
      start_record,
      end_record,
      totalrows,
      current_page_active,
      frontend_totalRecordsPerPage,
    });
  } catch (err) {
    response_error_message = err;
    console.log("message error : " + err);
    console.log("response_error_message catch : " + response_error_message);
    // res.render('publicusersearch/noresults');
  }

  // end of POST call
});

module.exports = router;

// old my subsidy award code for validation email and pass from home screen
// **************************************************************************
// const express = require('express');
// const { truncate } = require('fs');
// const router = express.Router();

// router.get('/',(req, res) => {

//     res.render('bulkupload/mysubsidyawards')
//   });

//   router.post('/', (req, res) => {
//     const { email_address , password} = req.body;
//     let isEmailAndPasswordEmpty = false;
//     let isPasswordEmpty = false;
//     let isPasswordlesseight = false;

//     if(!email_address && !password )
//     {
//       isEmailAndPasswordEmpty = true ;
//     }

//     else if (!email_address) {
//       isEmailAndPasswordEmpty = true ;

//     }

//     else if(!password )
//     {
//     isPasswordEmpty = true;
//     }

//     else if(password )
//     {
//       if( password.length <8 ){

//         isPasswordlesseight = true;
//       }

//     }

//     if (isEmailAndPasswordEmpty || isPasswordEmpty || isPasswordlesseight)
//     {

//         res.render('accessmanagement/loginfirstpage', {
//          isEmailAndPasswordEmpty ,
//          isPasswordEmpty,
//          isPasswordlesseight,
//          email_address : email_address,
//          password
//          } );
//     }
//     // this is for password expiry page temporary
//     else if (email_address =='xyz.xyz@xyz.com') {
//       let isEmailValid = true;
//       res.render('accessmanagement/loginresetpassword',{isEmailValid})

//     }
//     else { res.render('bulkupload/mysubsidyawards')}

//     } );

// module.exports = router;
