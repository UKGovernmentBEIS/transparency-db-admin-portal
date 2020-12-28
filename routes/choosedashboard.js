const express = require('express');
const router = express.Router();
const axios = require('axios');
var request = require('request');


router.post("/", async(req, res) => {

// *******************
// Globale declarations
// *******************
frontend_totalRecordsPerPage  = 1;


// *******************
// Globale declarations
// *******************

var    { dashboard_username,dashboard_roles } = req.body;

console.log("dashboard_username:" + dashboard_username);
console.log("dashboard_roles:" + dashboard_roles);

dashboard_user_name = dashboard_username;

if ( dashboard_username == 'Albert Einstein') { 


// userPrinciple = 'userPrinciple';
const userPrincipleRequest = '{"userName": "TEST","password": "password123","role": "BEIS Administrator","grantingAuthorityGroupId": "123","grantingAuthorityGroupName": "test"}';
var config = {
    headers: { 'userPrinciple': userPrincipleRequest }
  
 };

//  var config = {
//     headers: { 'userPrinciple':'{"userName": "TEST","password": "password123","role": "BEIS Administrator","grantingAuthorityGroupId": "123","grantingAuthorityGroupName": "test"}' }
//  };
  
const userPrincipleRequest1 = {"userName": "TEST","password": "password123","role": "BEIS Administrator","grantingAuthorityGroupId": "123","grantingAuthorityGroupName": "test"}

var data = JSON.parse(JSON.stringify(userPrincipleRequest));
console.log("request :" + JSON.stringify(data));
    
      try {
          const apidata = await axios.get('https://access-management-service.azurewebsites.net/accessmanagement/beisadmin', config);;
          console.log(`Status: ${apidata.status}`);
          API_response_code = `${apidata.status}`;
          console.log("API_response_code: try" + API_response_code);
          console.log('Body: ', apidata.data);
          res.render("bulkupload/dashboard-beisadmin");          
      }
      
      catch (err) {

        response_error_message = err;
        console.log("message error : " + err);
        console.log("response_error_message catch : " + response_error_message );
     
      }

}
else if( dashboard_username == 'Barry Smith') { res.render("bulkupload/dashboard-gaadmin");}
else if( dashboard_username == 'Claire Jones') { res.render("bulkupload/dashboard-gaapprover");}
else if( dashboard_username == 'Mary Johnson') { res.render("bulkupload/dashboard-gaencoder");}




});

module.exports = router;
