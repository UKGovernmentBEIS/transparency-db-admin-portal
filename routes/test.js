
const express = require('express');
const router = express.Router();

router.post('/',(req, res) => {


        
        res.render('accessmanagement/test')


  
  });

  router.get('/',(req, res) => {


        
    res.render('accessmanagement/test')



});

module.exports = router;



