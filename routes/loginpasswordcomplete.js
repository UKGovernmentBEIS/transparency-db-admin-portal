
const express = require('express');
const { route } = require('./loginfirstpage');
const router = express.Router();


router.get('/',(req, res) => {
    res.render('accessmanagement/loginpasswordcomplete')
  })

router.post('/',(req, res) => {

  const { password,password1 } = req.body;
  let isPasswordEmpty =  false;
  let isPasswordLengthLessThanTen =  false; 
  let isBothPasswordNotMatching =false;
  
  passwordLength = password.length;
  
  if (!password || !password1) { 
    
    isPasswordEmpty = true
    res.render('accessmanagement/loginnewpassword', { isPasswordEmpty})
   }

   else if(passwordLength < 8 ) {
    isPasswordLengthLessThanTen = true;
    res.render('accessmanagement/loginnewpassword', { isPasswordLengthLessThanTen })
   }
    else if(password != password1 ) {
      isBothPasswordNotMatching = true;
      res.render('accessmanagement/loginnewpassword', { isBothPasswordNotMatching })

   }


 else {

  res.render('accessmanagement/loginpasswordcomplete') }
});

module.exports = router;




