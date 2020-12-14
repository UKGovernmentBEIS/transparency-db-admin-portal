
const express = require('express');
const router = express.Router();

router.post('/',(req, res) => {
  
    res.render('bulkupload/submitforapproval',{ Subsidy_Control_Number_Global,Subsidy_Control_Number_Global_Substring })
  });
  

module.exports = router;



