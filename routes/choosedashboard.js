const express = require('express');
const router = express.Router();
const axios = require('axios');
var request = require('request');


router.post("/", async(req, res) => {

// *******************
// Globale declarations
// *******************
frontend_totalRecordsPerPage  = 1;

var    { dashboard_username,dashboard_roles,dashboard_GA } = req.body;

console.log("dashboard_username:" + dashboard_username);
console.log("dashboard_roles:" + dashboard_roles);

dashboard_user_name = dashboard_username;
dashboard_ga_name = dashboard_GA;

if ( dashboard_roles == 'BEIS Administrator') { 

const userPrincipleRequest = '{"userName": "TEST","password": "password123","role": "BEIS Administrator","grantingAuthorityGroupId": "123","grantingAuthorityGroupName": "test"}';
var config = {
    headers: { 'userPrinciple': userPrincipleRequest }
  
 };


var data = JSON.parse(JSON.stringify(userPrincipleRequest));
console.log("request :" + JSON.stringify(data));
    
      try {
          const apidata = await axios.get('http://dev-beis-tp-db-accessmanagement-service-app.azurewebsites.net/accessmanagement/beisadmin', config);;
          console.log(`Status: ${apidata.status}`);
          API_response_code = `${apidata.status}`;
          console.log("API_response_code: try" + API_response_code);
          console.log('Body: ', apidata.data);
          dashboardawards = apidata.data
          res.render("bulkupload/dashboard-beisadmin");          
      }
      
      catch (err) {

        response_error_message = err;
        console.log("message error : " + err);
        console.log("response_error_message catch : " + response_error_message );
     
      }

}
else if( dashboard_roles == 'Granting Authority Administrator') { 
  
  const userPrincipleRequest = '{"userName":"SYSTEM","password":"password123","role":"Granting Authority Administrator","grantingAuthorityGroupId":"123","grantingAuthorityGroupName":"HMRC"}';
var config = {
    headers: { 'userPrinciple': userPrincipleRequest }
  
 };


var data = JSON.parse(JSON.stringify(userPrincipleRequest));
console.log("request :" + JSON.stringify(data));
    
      try {
          const apidata = await axios.get('http://dev-beis-tp-db-accessmanagement-service-app.azurewebsites.net/accessmanagement/gaadmin', config);;
          console.log(`Status: ${apidata.status}`);
          API_response_code = `${apidata.status}`;
          console.log("API_response_code: try" + API_response_code);
          console.log('Body: ', apidata.data);
          dashboardawards = apidata.data
          res.render("bulkupload/dashboard-gaadmin");          
      }
      
      catch (err) {

        response_error_message = err;
        console.log("message error : " + err);
        console.log("response_error_message catch : " + response_error_message );
     
      } 
 }
else if( dashboard_roles == 'Granting Authority Approver') {
  
  const userPrincipleRequest = '{"userName":"SYSTEM","password":"password123","role":"Granting Authority Approver","grantingAuthorityGroupId":"123","grantingAuthorityGroupName":"HMRC"}';
  var config = {
      headers: { 'userPrinciple': userPrincipleRequest }
    
   };
  
  
  var data = JSON.parse(JSON.stringify(userPrincipleRequest));
  console.log("request :" + JSON.stringify(data));
      
        try {
            const apidata = await axios.get('http://dev-beis-tp-db-accessmanagement-service-app.azurewebsites.net/accessmanagement/gaapprover', config);;
            console.log(`Status: ${apidata.status}`);
            API_response_code = `${apidata.status}`;
            console.log("API_response_code: try" + API_response_code);
            console.log('Body: ', apidata.data);
            dashboardawards = apidata.data
            res.render("bulkupload/dashboard-gaapprover");          
        }
        
        catch (err) {
  
          response_error_message = err;
          console.log("message error : " + err);
          console.log("response_error_message catch : " + response_error_message );
       
        } 
   }

else if( dashboard_roles == 'Granting Authority Encoder') {
  
  const userPrincipleRequest = '{"userName":"SYSTEM","password":"password123","role":"Granting Authority Encoder","grantingAuthorityGroupId":"123","grantingAuthorityGroupName":"HMRC"}';
  var config = {
      headers: { 'userPrinciple': userPrincipleRequest }
    
   };
  
  
  var data = JSON.parse(JSON.stringify(userPrincipleRequest));
  console.log("request :" + JSON.stringify(data));
      
        try {
            const apidata = await axios.get('http://dev-beis-tp-db-accessmanagement-service-app.azurewebsites.net/accessmanagement/gaencoder', config);;
            console.log(`Status: ${apidata.status}`);
            API_response_code = `${apidata.status}`;
            console.log("API_response_code: try" + API_response_code);
            console.log('Body: ', apidata.data);
            dashboardawards = apidata.data
            res.render("bulkupload/dashboard-gaencoder");          
        }
        
        catch (err) {
  
          response_error_message = err;
          console.log("message error : " + err);
          console.log("response_error_message catch : " + response_error_message );
       
        } 
   }




});

module.exports = router;
