const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {

// *******************
// Globale declarations
// *******************
frontend_totalRecordsPerPage  = 1;


// *******************
// Globale declarations
// *******************

var    { dashboard_username,dashboard_roles } = req.body;

console.log("dashboard_username:" + dashboard_username);
console.log("dashboard_roles:" + dashboard_roles);

dashboard_user_name = dashboard_username;

if ( dashboard_username == 'Albert Einstein') { res.render("bulkupload/dashboard-beisadmin");}
else if( dashboard_username == 'Barry Smith') { res.render("bulkupload/dashboard-gaadmin");}
else if( dashboard_username == 'Claire Jones') { res.render("bulkupload/dashboard-gaapprover");}
else if( dashboard_username == 'Mary Johnson') { res.render("bulkupload/dashboard-gaencoder");}




});

module.exports = router;
