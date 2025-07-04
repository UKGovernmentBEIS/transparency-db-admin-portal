// ********************************************************************
// Gov.UK transparency subsidy scheme deactivated successfully module
// ********************************************************************

const express = require("express");
var session = require("express-session");
const router = express.Router();

const axios = require("axios");
var request = require("request");

router.post("/", async (req, res) => {
  ssn = req.session;
  var {action,reason,scheme}=req.body;
  
  if (
    typeof ssn.dashboard_roles_object_id1 === "undefined" ||
    typeof ssn.dashboard_roles_object_id2 === "undefined"
  ) {
    res.redirect("/signout");
  } else {
    var schemeStatus = "Inactive";
    var render = "bulkupload/subsidymeasure-deactivated-successfully";

    if(action === "Delete")
    {      
      if (ssn.dashboard_roles != "BEIS Administrator"){
        res.render("bulkupload/notAuthorized");
      }
      else
      {        
        schemeStatus = "Deleted";
        render = "bulkupload/subsidymeasure-deleted-successfully";
      }
    }
    
    if(typeof reason === 'undefined')
    {      
      res.redirect("/deactivatescheme?action=" +  action + "&scheme=" +scheme + "&error=True");
      return;
    }

    reason = reason.trim();
    if(reason.length > 1000 || reason.length <= 0)
    {        
      res.redirect("/deactivatescheme?action=" +  action + "&scheme=" +scheme + "&error=True");
      return;
    }
    
    
    if(scheme === 'undefined')
      {      
        res.redirect("bulkupload/notAvailable");
        return;
      }
  
      scheme = scheme.trim();


    res.set("X-Frame-Options", "DENY");
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Content-Security-Policy", 'frame-ancestors "self"');
    res.set("Access-Control-Allow-Origin", beis_url_accessmanagement);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

    try {
      console.log("scNumber_Global", scheme);
      const deleteUser = await axios.put(
        beis_url_searchscheme + `/scheme/update/${scheme}`,
        {
          status: schemeStatus,
          reason: reason
        },
        ssn.UserPrincileObjectGlobal
      );

      console.log(`Status: ${deleteUser.status}`);

      if (schemeStatus == "Deleted"){
        const deleteAwards = await axios.put(
          beis_url_publishing + `/award/deletescheme/${scheme}`, {}, ssn.UserPrincileObjectGlobal
        );
      }

      res.render(render, {
        scheme,
      });
    } catch (err) {
      const status = err.response.status;
      console.log("message error : " + err);

      var render = "bulkupload/notAvailable";
      switch(status){
        case 500:
          break;
        case 401:
        case 403:
          render = "bulkupload/notAuthorized"
          break;
      }
      res.render(render);
    }
  }
});

module.exports = router;
