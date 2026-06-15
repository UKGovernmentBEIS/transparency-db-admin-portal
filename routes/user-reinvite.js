// ********************************************************************
// Gov.UK transparency submit user details module
// ********************************************************************

const express = require("express");
var session = require("express-session");
const router = express.Router();

const axios = require("axios");
var request = require("request");
const utils = require("../utils");

router.get("/", async (req, res) => {
  ssn = req.session;
  if (
    typeof ssn.dashboard_roles_object_id1 === "undefined" ||
    typeof ssn.dashboard_roles_object_id2 === "undefined"
  ) {
    res.redirect("/signout");
  } else {
    utils.setSecurityHeaders(res, beis_url_accessmanagement);

    var inviteSent = false;
    var messageHeader = "";
    var messageBody = "";
    var redemptionLink = "";

    try {
      const userObject = await axios.get(
        beis_url_accessmanagement + "/usermanagement/users/" + ssn.user_id,
        ssn.UserPrincileObjectGlobal
      );


      if (userObject.data) {
        var data_request = {
          invitedUserEmailAddress: userObject.data.mail,
          inviteRedirectUrl: beis_redirect_url,
          sendInvitationMessage: true,
          grpRoleIds: [],
          reInvite: true,
        };

        var data = JSON.parse(JSON.stringify(data_request));
        console.log("request data user submit: " + JSON.stringify(data));

        const addUser = await axios.post(
          beis_url_accessmanagement + "/usermanagement/invitation",
          data,
          ssn.UserPrincileObjectGlobal,
        );

        inviteSent = true;
        messageHeader = "Invite resent successfully"
        messageBody = "Invite resent to " + userObject.data.mail;
        redemptionLink = addUser.data.inviteRedeemUrl;
      }

      res.render("bulkupload/user-individual-detail", {
        inviteSent,
        messageHeader,
        messageBody,
        redemptionLink
      });

    } catch (err) {
      console.log("message error : " + err);
      messageHeader = "Error sending invite."
      messageBody = "Error sending invite to user. Error: " + err; 
      res.render("bulkupload/user-individual-detail", {
        inviteSent,
        messageHeader,
        messageBody,
      });
    }

    }
});

module.exports = router;
