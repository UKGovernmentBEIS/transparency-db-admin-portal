
const express = require('express');
const router = express.Router();

router.get('/',(req, res) => {
    res.render('bulkupload/logintransparency')
  });

module.exports = router;



