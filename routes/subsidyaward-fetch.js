// ********************************************************************
// Gov.UK public user search page outing 
// ********************************************************************


const express = require('express');
const router = express.Router();
const axios = require('axios');
var request = require('request');

router.get('/',async(req, res) => {
console.log("req.query.award: "+ req.query.award);
awardnumber =   req.query.award;
   
console.log("awardnumber : " + awardnumber);  

var awardendpoint = beis_url_publicsearch  + '/searchResults/award/' + awardnumber ;
  
      try {
        const awardapidata = await axios.get(awardendpoint);
        console.log(`Status: ${awardapidata.status}`);
        console.log('Body: ', awardapidata.data);
        console.log("End point : " + awardendpoint);
        fetchawarddetails = awardapidata.data;
        Get_Award_Status = fetchawarddetails.status;

        if (Get_Award_Status == "Rejected") {
          res.render('bulkupload/subsidyaward-fetch-rejected')  ; 
        }
        else if (Get_Award_Status == "Awaiting approval") {
          res.render('bulkupload/subsidyaward-fetch-approval')  ; 
        }
        else if (Get_Award_Status == "Published") {
          res.render('bulkupload/subsidyaward-fetch-published')  ; 
        }  
        else if (Get_Award_Status == "Deleted") {
          res.render('bulkupload/subsidyaward-fetch-deleted')  ; 
        }
        else {
          res.render('bulkupload/subsidyaward-fetch-notfound')  ; 
        }


      } catch (err) {
          console.error(err);
      }
 
    });


module.exports = router;
