
const express = require('express');
const router = express.Router();

router.get('/',(req, res) => {

    res.render('bulkupload/reviewdetail');

    

  });

module.exports = router;



