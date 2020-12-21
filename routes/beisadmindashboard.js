
const express = require('express');
const router = express.Router();

router.post('/',(req, res) => {
    res.render('bulkupload/beisadmindashboard')
  });

module.exports = router;



