
  
const express = require('express');
const router = express.Router();

router.get('/',(req, res) => {

    let isEmailValid = true;
    res.render('accessmanagement/loginforgetpassword',{isEmailValid})
  });

module.exports = router;
