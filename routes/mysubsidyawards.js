
const express = require('express');
const { truncate } = require('fs');
const router = express.Router();

router.get('/',(req, res) => {
  
    res.render('bulkupload/mysubsidyawards')
  });
  

  router.post('/', (req, res) => {
    const { email_address , password} = req.body;
    let isEmailAndPasswordEmpty = false;
    let isPasswordEmpty = false;
    let isPasswordlesseight = false;

    
  
    if(!email_address && !password ) 
    { 
      isEmailAndPasswordEmpty = true ;
    }
  
    else if (!email_address) {
      isEmailAndPasswordEmpty = true ;
  
    }
                   
    else if(!password ) 
    {
    isPasswordEmpty = true;
    }
       
    else if(password ) 
    {
      if( password.length <8 ){

        isPasswordlesseight = true;
      }

    }


    if (isEmailAndPasswordEmpty || isPasswordEmpty || isPasswordlesseight) 
    {
      
        res.render('accessmanagement/loginfirstpage', {
         isEmailAndPasswordEmpty ,
         isPasswordEmpty,
         isPasswordlesseight,
         email_address : email_address,
         password
         } );
    } 
    // this is for password expiry page temporary
    else if (email_address =='xyz.xyz@xyz.com') {
      let isEmailValid = true;
      res.render('accessmanagement/loginresetpassword',{isEmailValid})
   
    }
    else { res.render('bulkupload/mysubsidyawards')}
  
    } );
  

module.exports = router;



