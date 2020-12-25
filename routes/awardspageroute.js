// ********************************************************************
// Gov.UK public user search page outing 
// ********************************************************************


const express = require('express');
const router = express.Router();
const axios = require('axios');
var request = require('request');

router.get('/',async(req, res) => {

 console.log("req.query.page: "+ req.query.page);
//  frontend_totalRecordsPerPage = 3;
 routing_pagenumber =   req.query.page;
 current_page = parseInt(routing_pagenumber);
 console.log("current_page pageroute : " +  current_page );

 current_page_active = current_page;
 
 if (current_page == 1) { previous_page = 1; next_page = 2 } 
 else if (current_page == pageCount ) { previous_page = pageCount - 1; next_page = pageCount } 
 else { previous_page = current_page - 1; next_page = current_page + 1;}
 console.log("routing current page :" + current_page);
 console.log("routing prev page :" + previous_page);
 console.log("routing next page :" + next_page );


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
        "pageNumber": current_page,
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
          // console.log('seachawardstring' + seachawardstring );
          const seachawardJSON = JSON.parse(seachawardstring );
          // console.log('seachawardJSON ' + seachawardJSON.awards[0]  );
          totalrows = parseInt(searchawards.totalSearchResults);
          console.log(searchawards.awards[0].beneficiary.beneficiaryType);
          console.log(searchawards.awards[0].subsidyFullAmountExact);
          console.log("req.query.page: "+ req.query.page);

          if (current_page == 1) { start_record = 1 ; end_record = frontend_totalRecordsPerPage }
          else if (current_page == pageCount ) { start_record = (current_page - 1)  * frontend_totalRecordsPerPage + 1; end_record =  totalrows }
          else { 
            start_record = current_page * frontend_totalRecordsPerPage - frontend_totalRecordsPerPage + 1 ;
            end_record = current_page * frontend_totalRecordsPerPage ;
          }

          pageCount = Math.ceil(totalrows/frontend_totalRecordsPerPage) ;

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

          res.render('bulkupload/mysubsidyawards',{pageCount,previous_page,next_page,current_page_active,start_record,end_record ,totalrows})
          

      } catch (err) {
          console.error(err);
      }
 
    });



  router.post('/',(req, res) => {
   
    res.render('bulkupload/mysubsidyawards');

  });


module.exports = router;
