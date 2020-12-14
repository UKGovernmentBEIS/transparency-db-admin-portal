
const express = require('express');
const router = express.Router();


router.get('/',(req, res) => {
    let isEmailValid = true;
    res.render('accessmanagement/loginresetpassword',{isEmailValid})
  })
  
  
  router.post('/',(req, res) => {
    res.render('accessmanagement/loginresetpassword')
  })
module.exports = router;



