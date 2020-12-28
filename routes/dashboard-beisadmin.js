const express = require("express");
const router = express.Router();

router.post("/", async(req, res) => {


const userPrinciple = {"userName": "TEST","password": "password123","role": "BEIS Administrator","grantingAuthorityGroupId": "123","grantingAuthorityGroupName": "test"}
var data = JSON.parse(JSON.stringify(userPrinciple));
console.log("request :" + JSON.stringify(data));
    
      try {
          const apidata = await axios.post('http://subsidy-search-service.azurewebsites.net/searchResults', data);
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
  
});

module.exports = router;
