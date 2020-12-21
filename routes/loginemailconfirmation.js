

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
      res.render('accessmanagement/loginforgetpassword', { isEmailEmpty})
     }
  
     
    else if (!isEmailValid) { 
     
      res.render('accessmanagement/loginforgetpassword', { isEmailValid})
     }
  
  
    else { 
      
       email_addresspass = email_address;
      // app.locals.email_addresspass = email_address;
      console.log(email_addresspass)
    res.render('accessmanagement/loginemailconfirmation'),{email_addresspass} }
  });

  
module.exports = router;
  
  