
const express = require('express');
const router = express.Router();

router.get('/',(req, res) => {
 
    var isAddSubsidyPrimarycall = true;
    res.render('bulkupload/addsubsidyaward', { isAddSubsidyPrimarycall }) 
  });
  
   
  router.post('/',(req, res) => {
    res.render('bulkupload/addsubsidyaward')
  })

module.exports = router;



