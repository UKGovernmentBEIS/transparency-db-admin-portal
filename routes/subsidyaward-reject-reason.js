// ********************************************************************
// Gov.UK public user search page outing 
// ********************************************************************


const express = require('express');
const router = express.Router();
const axios = require('axios');
var request = require('request');

router.post('/',async(req, res) => {
   
var { reject_reason_text} = req.body;
console.log("awardnumber : " + awardnumber);  
console.log("Award_status : " + Award_status);
console.log("reject_reason : " + reject_reason_text);

const data_request = 
{
    "status": "Rejected",
    "reason": reject_reason_text
};

var data = JSON.parse(JSON.stringify(data_request));
console.log("request :" + JSON.stringify(data));

var awardendpoint = beis_url_accessmanagement + '/accessmanagement/' + awardnumber ;
  
      try {
        const awardapidata = await axios.put(awardendpoint,data);
        console.log(`Status: ${awardapidata.status}`);
        console.log('Body: ', awardapidata.data);
       console.log("awardendpoint:" + awardendpoint);


        try {
            const apidata = await axios.get(Award_search_URL );
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
            console.log("response_error_message catch : " + response_error_message );
            // res.render('publicusersearch/noresults');
          }

        //   res.render('bulkupload/mysubsidyawards')  ; 

      } catch (err) {
        response_error_message = err;
        console.log("message error : " + err);
        console.log("response_error_message catch : " + response_error_message );
      }
 
    });


module.exports = router;
