
const express = require('express');
const router = express.Router();

router.get('/',(req, res) => {

    const { Subsidy_awardNo } = req.body;
  
    let person = {
      subsidy: req.body.Subsidy_awardNo
      }
  
      console.log(Subsidy_awardNo);
   
    res.render('bulkupload/mysubsidyawards')
  });




module.exports = router;



