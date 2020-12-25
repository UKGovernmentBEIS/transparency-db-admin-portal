

// ********************************************************************
// Gov.UK transparency subsidy awards routing module
// ********************************************************************

const express = require('express');
const router = express.Router();
const axios = require('axios');
var request = require('request');

router.get('/',async(req, res) => {

 
  frontend_totalRecordsPerPage = 1;

  const data_request = 
  {
    "beneficiaryName": "",
    "subsidyMeasureTitle": "",
    "subsidyObjective": [],
    "spendingRegion": [],
    "subsidyInstrument": [],
    "spendingSector":[],
    "legalGrantingFromDate" :"",
    "legalGrantingToDate" : "",
    "pageNumber": 1,
    "totalRecordsPerPage" : frontend_totalRecordsPerPage,
    "sortBy" : [""]
  
};
 

  var data = JSON.parse(JSON.stringify(data_request));
 
  console.log("request :" + JSON.stringify(data));
    
      try {
          const apidata = await axios.post('http://subsidy-search-service.azurewebsites.net/searchResults', data);
          console.log(`Status: ${apidata.status}`);
          API_response_code = `${apidata.status}`;
          console.log("API_response_code: try" + API_response_code);
          console.log('Body: ', apidata.data);
          searchawards = apidata.data
          var searchawards_api = apidata.data;
          console.log("searchawards" + searchawards_api );
          const seachawardstring = JSON.stringify(searchawards_api )
          const seachawardJSON = JSON.parse(seachawardstring );
          totalrows = searchawards.totalSearchResults;
          console.log(searchawards.awards[0].subsidyFullAmountExact);  
          
          pageCount = Math.ceil(totalrows/frontend_totalRecordsPerPage );
          console.log("totalrows :" + totalrows)
          console.log("pageCount :" + pageCount)
          curren_page = 1;
          previous_page = 1;
          next_page = 2;
          start_record = 1;
          end_record = frontend_totalRecordsPerPage;
          current_page_active = 1;
         
          start_page = 1;
          if(pageCount < 10) { end_page = pageCount}
          else {
            end_page = 9;
          }
          res.render('bulkupload/mysubsidyawards',{pageCount,previous_page,next_page,
            start_record ,end_record,totalrows,current_page_active, frontend_totalRecordsPerPage   })
          
      }
      
      catch (err) {

        response_error_message = err;
        console.log("message error : " + err);
        console.log("response_error_message catch : " + response_error_message );
     
        pageCount = 10;
        previous_page = 1;
        next_page = 2;
        start_record = 1;
        end_record = 9;
        totalrows = 10;
        current_page_active = 1;
        current_page = 1;
        start_page = 1;
        end_page = 10;


        res.render('bulkupload/mysubsidyawards',{pageCount,previous_page,
            next_page,end_record ,end_record,totalrows,current_page_active,start_page,end_page, frontend_totalRecordsPerPage  })
          
        // response_error_message = err;
        // console.log("message error : " + err);
        // console.log("response_error_message catch : " + response_error_message );
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



