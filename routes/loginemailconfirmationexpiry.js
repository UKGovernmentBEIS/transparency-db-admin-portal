
const express = require('express');
const router = express.Router();

router.post('/',(req, res) => {
    const { email_address } = req.body;
    let isEmailEmpty =  false;
    let validToken = '@';
    let isEmailValid = false;
    isEmailValid = email_address.includes(validToken)
    if (!email_address) { 
    
      isEmailEmpty = 'yes'
      res.render('accessmanagement/loginresetpassword', { isEmailEmpty})
     }
  
     
    else if (!isEmailValid) { 
     
      res.render('accessmanagement/loginresetpassword', { isEmailValid})
     }
  
  
    else { 
      console.log(email_address)
      email_addresspass = email_address;
      console.log("email address:" + email_addresspass)
      
    res.render('accessmanagement/loginemailconfirmationexpiry'),{email_addresspass } }
  });
module.exports = router;



