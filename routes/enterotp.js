
const express = require('express');
const router = express.Router();

router.post('/',(req, res) => {

    

    const { email_address } = req.body;

    var otp = email_address ;

    

    if(otp == '9923666') {

        
        res.render('accessmanagement/loginfirstpage')


    }
    else {
        var messagepass = "Unauthorised access, please enter the OTP that you have received from administrator"
        res.render('accessmanagement/enterotp', {messagepass})
    
    }

  });

module.exports = router;



