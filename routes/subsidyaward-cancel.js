// ********************************************************************
// Gov.UK public user search page outing 
// ********************************************************************


const express = require('express');
const router = express.Router();
const axios = require('axios');
var request = require('request');

router.get('/',async(req, res) => {

console.log("awardnumber : " + awardnumber);  

var awardendpoint = 'http://dev-beis-tp-db-public-search-service.azurewebsites.net/searchResults/award/' + awardnumber ;
  
      try {
        const awardapidata = await axios.get(awardendpoint);
        console.log(`Status: ${awardapidata.status}`);
        console.log('Body: ', awardapidata.data);
        fetchawarddetails = awardapidata.data;
          res.render('bulkupload/subsidyaward-fetch')  ; 

      } catch (err) {
          console.error(err);
      }
 
    });


module.exports = router;
