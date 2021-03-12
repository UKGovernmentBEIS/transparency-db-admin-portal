const express = require("express");
const router = express.Router();
const axios = require("axios");
var request = require("request");

router.get("/", async(req, res) => {
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
   
  try {
    const deleteUser = await axios.delete(
    beis_url_accessmanagement + "/usermanagement/deleteuser/" + Delete_UserId  , UserPrincileObjectGlobal 
    
  );

  console.log(`Status: ${deleteUser.status}`);
  API_response_code = `${deleteUser.status}`;
  console.log("API_response_code: try" + API_response_code);
  console.log("Body: ", deleteUser.data);
  deleteUser_extract = deleteUser.data;
  res.render("bulkupload/user-deactivated-successfully");
 

} catch (err) {
  
  response_error_message = err;
  console.log("message error : " + err);
  console.log("response_error_message catch : " + response_error_message);
}

});

module.exports = router;
