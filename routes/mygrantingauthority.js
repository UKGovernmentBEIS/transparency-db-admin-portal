
const express = require('express');
const router = express.Router();

router.get('/',(req, res) => {
    res.render('bulkupload/mygrantingauthority')
  });

module.exports = router;



