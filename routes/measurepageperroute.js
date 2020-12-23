// ********************************************************************
// Gov.UK transparency admin portal page outing 
// ********************************************************************
const express = require('express');
const router = express.Router();
const axios = require('axios');
var request = require('request');

router.get('/',async(req, res) => {

 console.log("req.query.recordperpage "+ req.query.recordperpage);
 frontend_totalRecordsPerPage = req.query.recordperpage;


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
console.log("request data : " + data);
  
      try {
        const apidata = await axios.post('http://subsidy-search-service.azurewebsites.net/searchResults', data);
        console.log(`Status: ${apidata.status}`);
          console.log('Body: ', apidata.data);
          searchawards = apidata.data
          var searchawards_api = apidata.data;
          console.log("searchawards" + searchawards_api );
          const seachawardstring = JSON.stringify(searchawards_api );
          const seachawardJSON = JSON.parse(seachawardstring );
         
          totalrows = parseInt(searchawards.totalSearchResults);
          console.log(searchawards.awards[0].beneficiary.beneficiaryType);
          console.log(searchawards.awards[0].subsidyFullAmountExact);
        
          start_record = 1 ; end_record = frontend_totalRecordsPerPage          
          pageCount = Math.ceil(totalrows/frontend_totalRecordsPerPage) ;

          current_page = 1;
          current_page_active = current_page;
          previous_page = 1; 
          next_page = 2 ; 
         
          console.log("routing current page :" + current_page);
          console.log("routing prev page :" + previous_page);
          console.log("routing next page :" + next_page );
              
          // this is for page management section

          if(current_page < 5 && pageCount > 9 ) {  start_page = 1; end_page = 9 }
          else if (current_page < 5 && pageCount <= 9 ) {  start_page = 1; end_page = pageCount }
          else if (current_page >= 5 && pageCount <= 9 ) {  start_page = 1; end_page = pageCount }
          if (current_page >= 5 && pageCount > 9 )
            { start_page = current_page - 4 , 
              end_page = current_page + 4 
              nearby_last_page = pageCount - 4;
              if ( current_page >= nearby_last_page)  {
                    end_page = pageCount;
                    start_page = pageCount -9   

              }
            }


          console.log("Start Page :" + start_page)
          console.log("end page :" + end_page)
          console.log("page count: " + pageCount);
          res.render('bulkupload/mysubsidymeasures',{pageCount,previous_page,next_page,current_page_active,start_record,end_record ,totalrows, start_page,end_page})
          

      } catch (err) {
          console.error(err);
      }
 
    });


module.exports = router;
