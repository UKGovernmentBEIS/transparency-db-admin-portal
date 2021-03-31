!(function () {
  "use strict";
  window.GOVUK = window.GOVUK || {};
  var i = { essential: !0, usage: !1 },
    o = {
      cookies_policy: "essential",
      seen_cookie_message: "essential",
      cookie_preferences_set: "essential",
      cookies_preferences_set: "essential",
      "_email-alert-frontend_session": "essential",
      licensing_session: "essential",
      govuk_contact_referrer: "essential",
      multivariatetest_cohort_coronavirus_extremely_vulnerable_rate_limit:
        "essential",
      dgu_beta_banner_dismissed: "settings",
      global_bar_seen: "settings",
      govuk_browser_upgrade_dismisssed: "settings",
      govuk_not_first_visit: "settings",
      analytics_next_page_call: "usage",
      _ga: "usage",
      _gid: "usage",
      _gat: "usage",
      "JS-Detection": "usage",
      TLSversion: "usage",
    };
  (window.GOVUK.cookie = function (e, n, r) {
    return void 0 !== n
      ? !1 === n || null === n
        ? window.GOVUK.setCookie(e, "", { days: -1 })
        : (void 0 === r && (r = { days: 30 }), window.GOVUK.setCookie(e, n, r))
      : window.GOVUK.getCookie(e);
  }),
    (window.GOVUK.setDefaultConsentCookie = function () {
      window.GOVUK.setConsentCookie(i);
    }),
    (window.GOVUK.approveAllCookieTypes = function () {
      var e = { essential: !0, usage: !0 };
      window.GOVUK.setCookie("cookies_policy", JSON.stringify(e), {
        days: 365,
      });
    }),
    (window.GOVUK.getConsentCookie = function () {
      var e,
        n = window.GOVUK.cookie("cookies_policy");
      if (!n) return null;
      try {
        e = JSON.parse(n);
      } catch (r) {
        return null;
      }
      return "object" != typeof e && null !== e && (e = JSON.parse(e)), e;
    }),
    (window.GOVUK.setConsentCookie = function (e) {
      var n = window.GOVUK.getConsentCookie();
      for (var r in (n || (n = JSON.parse(JSON.stringify(i))), e))
        if (((n[r] = e[r]), !e[r]))
          for (var t in o) o[t] === r && window.GOVUK.deleteCookie(t);
      window.GOVUK.setCookie("cookies_policy", JSON.stringify(n), {
        days: 365,
      });
    }),
    (window.GOVUK.checkConsentCookieCategory = function (e, n) {
      var r = window.GOVUK.getConsentCookie();
      if (!r && o[e]) return !0;
      r = window.GOVUK.getConsentCookie();
      try {
        return r[n];
      } catch (t) {
        return console.error(t), !1;
      }
    }),
    (window.GOVUK.checkConsentCookie = function (e, n) {
      if ("cookies_policy" === e || null === n || !1 === n) return !0;
      if (e.match("^govuk_surveySeen") || e.match("^govuk_taken"))
        return window.GOVUK.checkConsentCookieCategory(e, "settings");
      if (o[e]) {
        var r = o[e];
        return window.GOVUK.checkConsentCookieCategory(e, r);
      }
      return !1;
    }),
    (window.GOVUK.setCookie = function (e, n, r) {
      if (window.GOVUK.checkConsentCookie(e, n)) {
        void 0 === r && (r = {});
        var t = e + "=" + n + "; path=/";
        if (r.days) {
          var i = new Date();
          i.setTime(i.getTime() + 24 * r.days * 60 * 60 * 1e3),
            (t = t + "; expires=" + i.toGMTString());
        }
        "https:" === document.location.protocol && (t += "; Secure"),
          (document.cookie = t);
      }
    }),
    (window.GOVUK.getCookie = function (e) {
      for (
        var n = e + "=", r = document.cookie.split(";"), t = 0, i = r.length;
        t < i;
        t++
      ) {
        for (var o = r[t]; " " === o.charAt(0); ) o = o.substring(1, o.length);
        if (0 === o.indexOf(n))
          return decodeURIComponent(o.substring(n.length));
      }
      return null;
    }),
    (window.GOVUK.getCookieCategory = function (e) {
      return o[e];
    }),
    (window.GOVUK.deleteCookie = function (e) {
      window.GOVUK.cookie(e, null),
        window.GOVUK.cookie(e) &&
          ((document.cookie = e + "=;expires=" + new Date() + ";"),
          (document.cookie =
            e +
            "=;expires=" +
            new Date() +
            ";domain=" +
            window.location.hostname +
            ";path=/"));
    }),
    (window.GOVUK.deleteUnconsentedCookies = function () {
      var e = window.GOVUK.getConsentCookie();
      for (var n in e)
        if (!e[n]) for (var r in o) o[r] === n && window.GOVUK.deleteCookie(r);
    });
})(window),
  (function (u) {
    "use strict";
    window.GOVUK = window.GOVUK || {};
    var e = function (e, n) {
        return (
          "<a " +
          (n = n ? 'class="' + n + '"' : "") +
          ' href="{{surveyUrl}}" id="take-survey" target="_blank" rel="noopener noreferrer">' +
          e +
          "</a>"
        );
      },
      n = function (e) {
        return (
          '<section id="user-satisfaction-survey" class="visible" aria-hidden="false">  <div class="survey-wrapper">    <a class="govuk-link survey-close-button" href="#user-survey-cancel" aria-labelledby="survey-title user-survey-cancel" id="user-survey-cancel" role="button">Close</a>    <h2 class="survey-title" id="survey-title">{{title}}</h2>' +
          e +
          "  </div></section>"
        );
      },
      t = n(
        "<p>" +
          e("{{surveyCta}}", "govuk-link survey-primary-link") +
          ' <span class="postscript-cta">{{surveyCtaPostscript}}</span></p>'
      ),
      i = n(
        '<div id="email-survey-pre">  <a class="govuk-link survey-primary-link" href="#email-survey-form" id="email-survey-open" rel="noopener noreferrer" role="button" aria-expanded="false">    {{surveyCta}}  </a></div><form id="email-survey-form" action="/contact/govuk/email-survey-signup" method="post" class="js-hidden" aria-hidden="true">  <div class="survey-inner-wrapper">    <div id="survey-form-description" class="survey-form-description">{{surveyFormDescription}}      <br> {{surveyFormCtaPostscript}}    </div>    <label class="survey-form-label" for="survey-email-address">      Email Address    </label>    <input name="email_survey_signup[survey_id]" type="hidden" value="{{surveyId}}">    <input name="email_survey_signup[survey_source]" type="hidden" value="{{surveySource}}">    <input name="email_survey_signup[ga_client_id]" type="hidden" value="{{gaClientId}}">    <input class="survey-form-input" name="email_survey_signup[email_address]" id="survey-email-address" type="text" aria-describedby="survey-form-description">    <button class="survey-form-button" type="submit">{{surveyFormCta}}</button>' +
          e("{{surveyFormNoEmailInvite}}") +
          '  </div></form><div id="email-survey-post-success" class="js-hidden" aria-hidden="true" tabindex="-1">  {{surveySuccess}}</div><div id="email-survey-post-failure" class="js-hidden" aria-hidden="true" tabindex="-1">  {{surveyFailure}}</div>'
      ),
      r = 2,
      o = "(max-width: 800px)",
      c = {
        defaultSurvey: {
          url: "https://www.smartsurvey.co.uk/s/gov_uk?c={{currentPath}}",
          identifier: "user_satisfaction_survey",
          frequency: 6,
          surveyType: "email",
        },
        smallSurveys: [],
        init: function () {
          if (c.canShowAnySurvey()) {
            var e = c.getActiveSurvey(c.defaultSurvey, c.smallSurveys);
            e !== undefined && (u("#global-bar").hide(), c.displaySurvey(e));
          }
        },
        canShowAnySurvey: function () {
          return (
            !c.pathInBlocklist() &&
            !c.otherNotificationVisible() &&
            !c.userCompletedTransaction() &&
            !(u("#user-satisfaction-survey-container").length <= 0)
          );
        },
        processTemplate: function (e, r) {
          return (
            u.each(e, function (e, n) {
              r = r.replace(new RegExp("{{" + e + "}}", "g"), n);
            }),
            r
          );
        },
        getUrlSurveyTemplate: function () {
          return {
            render: function (e) {
              var n = {
                  title: "Tell us what you think of GOV.UK",
                  surveyCta: "Take the 3 minute survey",
                  surveyCtaPostscript:
                    "This will open a short survey on another website",
                  surveyUrl: c.addParamsToURL(c.getSurveyUrl(e)),
                },
                r = u.extend(n, e.templateArgs);
              return c.processTemplate(r, t);
            },
          };
        },
        getEmailSurveyTemplate: function () {
          return {
            render: function (e) {
              var n = {
                  title: "Tell us what you think of GOV.UK",
                  surveyCta: "Take a short survey to give us your feedback",
                  surveyFormDescription:
                    "We\u2019ll send you a link to a feedback form. It only takes 2 minutes to fill in.",
                  surveyFormCta: "Send me the survey",
                  surveyFormCtaPostscript:
                    "Don\u2019t worry: we won\u2019t send you spam or share your email address with anyone.",
                  surveyFormNoEmailInvite: "Don\u2019t have an email address?",
                  surveySuccess:
                    "Thanks, we\u2019ve sent you an email with a link to the survey.",
                  surveyFailure:
                    "Sorry, we\u2019re unable to send you an email right now. Please try again later.",
                  surveyId: e.identifier,
                  surveySource: c.currentPath(),
                  surveyUrl: c.addParamsToURL(c.getSurveyUrl(e)),
                  gaClientId: GOVUK.analytics.gaClientId,
                },
                r = u.extend(n, e.templateArgs);
              return c.processTemplate(r, i);
            },
          };
        },
        getActiveSurveys: function (e) {
          return u.grep(e, function (e) {
            if (c.currentTime() >= e.startTime && c.currentTime() <= e.endTime)
              return c.activeWhen(e);
          });
        },
        getDisplayableSurveys: function (e) {
          return u.grep(e, function (e) {
            return c.isSurveyToBeDisplayed(e);
          });
        },
        getActiveSurvey: function (e, n) {
          var r = c.getActiveSurveys(n),
            t = [e].concat(r),
            i = c.getDisplayableSurveys(t);
          return i.length < 2 ? i[0] : i[Math.floor(Math.random() * i.length)];
        },
        displaySurvey: function (e) {
          var n = u("#user-satisfaction-survey-container");
          if ("email" === e.surveyType) c.displayEmailSurvey(e, n);
          else {
            if ("url" !== e.surveyType && e.surveyType !== undefined) return;
            c.displayURLSurvey(e, n);
          }
          c.incrementSurveySeenCounter(e),
            c.trackEvent(e.identifier, "banner_shown", "Banner has been shown");
        },
        displayURLSurvey: function (e, n) {
          var r = c.getUrlSurveyTemplate();
          n.append(r.render(e)), c.setURLSurveyEventHandlers(e);
        },
        displayEmailSurvey: function (e, n) {
          var r = c.getEmailSurveyTemplate();
          n.append(r.render(e)), c.setEmailSurveyEventHandlers(e);
        },
        addParamsToURL: function (e) {
          var n = e.replace(/\{\{currentPath\}\}/g, c.currentPath());
          return -1 !== e.indexOf("?c=")
            ? n + "&gcl=" + GOVUK.analytics.gaClientId
            : n + "?gcl=" + GOVUK.analytics.gaClientId;
        },
        setEmailSurveyEventHandlers: function (i) {
          var e = u("#email-survey-open"),
            n = u("#user-survey-cancel"),
            r = u("#email-survey-pre"),
            o = u("#email-survey-form"),
            a = u("#email-survey-post-success"),
            s = u("#email-survey-post-failure"),
            t = u("#survey-email-address");
          u("#take-survey").click(function () {
            c.setSurveyTakenCookie(i),
              c.hideSurvey(i),
              c.trackEvent(
                i.identifier,
                "no_email_link",
                "User taken survey via no email link"
              );
          }),
            e.click(function (e) {
              return (
                (i.surveyExpanded = !0),
                c.trackEvent(
                  i.identifier,
                  "email_survey_open",
                  "Email survey opened"
                ),
                r.addClass("js-hidden").attr("aria-hidden", "true"),
                o.removeClass("js-hidden").attr("aria-hidden", "false"),
                t.focus(),
                e.stopPropagation(),
                !1
              );
            }),
            n.click(function (e) {
              return (
                c.setSurveyTakenCookie(i),
                c.hideSurvey(i),
                i.surveyExpanded
                  ? c.trackEvent(
                      i.identifier,
                      "email_survey_cancel",
                      "Email survey cancelled"
                    )
                  : c.trackEvent(
                      i.identifier,
                      "banner_no_thanks",
                      "No thanks clicked"
                    ),
                e.stopPropagation(),
                !1
              );
            }),
            o.submit(function (e) {
              var n = function () {
                  o.addClass("js-hidden").attr("aria-hidden", "true"),
                    a.removeClass("js-hidden").attr("aria-hidden", "false"),
                    a.focus(),
                    c.setSurveyTakenCookie(i),
                    c.trackEvent(
                      i.identifier,
                      "email_survey_taken",
                      "Email survey taken"
                    ),
                    c.trackEvent(
                      i.identifier,
                      "banner_taken",
                      "User taken survey"
                    );
                },
                r = function () {
                  o.addClass("js-hidden").attr("aria-hidden", "true"),
                    s.removeClass("js-hidden").attr("aria-hidden", "false"),
                    s.focus();
                },
                t = o.attr("action");
              return (
                /\.js$/.test(t) || (t += ".js"),
                u.ajax({
                  type: "POST",
                  url: t,
                  dataType: "json",
                  data: o.serialize(),
                  success: n,
                  error: r,
                  statusCode: { 500: r },
                }),
                e.stopPropagation(),
                !1
              );
            });
        },
        setURLSurveyEventHandlers: function (n) {
          var e = u("#user-survey-cancel"),
            r = u("#take-survey");
          e.click(function (e) {
            return (
              c.setSurveyTakenCookie(n),
              c.hideSurvey(n),
              c.trackEvent(
                n.identifier,
                "banner_no_thanks",
                "No thanks clicked"
              ),
              e.stopPropagation(),
              !1
            );
          }),
            r.click(function () {
              c.setSurveyTakenCookie(n),
                c.hideSurvey(n),
                c.trackEvent(n.identifier, "banner_taken", "User taken survey");
            });
        },
        isSurveyToBeDisplayed: function (e) {
          return (
            !(c.isBeingViewedOnMobile() && !c.surveyIsAllowedOnMobile(e)) &&
            "true" !== GOVUK.cookie(c.surveyTakenCookieName(e)) &&
            !c.surveyHasBeenSeenTooManyTimes(e) &&
            c.randomNumberMatches(e.frequency)
          );
        },
        pathInBlocklist: function () {
          return new RegExp(
            "^/(?:" +
              /service-manual/.source +
              /|coronavirus/.source +
              ")(?:/|$)"
          ).test(c.currentPath());
        },
        userCompletedTransaction: function () {
          function e(e, n) {
            return -1 < e.indexOf(n);
          }
          var n = c.currentPath();
          if (
            e(n, "/done") ||
            e(n, "/transaction-finished") ||
            e(n, "/driving-transaction-finished")
          )
            return !0;
        },
        trackEvent: function (e, n, r) {
          window.GOVUK.analytics.trackEvent(e, n, {
            label: r,
            value: 1,
            nonInteraction: !0,
          });
        },
        setSurveyTakenCookie: function (e) {
          window.GOVUK.cookie(c.surveyTakenCookieName(e), !0, { days: 90 });
        },
        incrementSurveySeenCounter: function (e) {
          var n = c.surveySeenCookieName(e),
            r = c.surveySeenCount(e) + 1,
            t = c.seenTooManyTimesCooloff(e);
          t
            ? window.GOVUK.cookie(n, r, { days: t })
            : window.GOVUK.cookie(n, r, { days: 730 });
        },
        seenTooManyTimesCooloff: function (e) {
          return e.seenTooManyTimesCooloff
            ? s(e.seenTooManyTimesCooloff, undefined, 1)
            : undefined;
        },
        hideSurvey: function () {
          u("#user-satisfaction-survey")
            .removeClass("visible")
            .attr("aria-hidden", "true");
        },
        randomNumberMatches: function (e) {
          return 0 === Math.floor(Math.random() * e);
        },
        getSurveyUrl: function (e) {
          return e.url instanceof Array
            ? e.url[Math.floor(Math.random() * e.url.length)]
            : e.url;
        },
        otherNotificationVisible: function () {
          return (
            0 <
            u(
              [
                ".emergency-banner:visible",
                "#taxonomy-survey:visible",
                "#global-bar:visible",
              ].join(", ")
            ).length
          );
        },
        surveyHasBeenSeenTooManyTimes: function (e) {
          return c.surveySeenCount(e) >= c.surveySeenTooManyTimesLimit(e);
        },
        surveySeenTooManyTimesLimit: function (e) {
          var n = e.seenTooManyTimesLimit;
          return "unlimited" === String(n).toLowerCase()
            ? Infinity
            : s(n, r, 1);
        },
        surveySeenCount: function (e) {
          return s(GOVUK.cookie(c.surveySeenCookieName(e)), 0, 0);
        },
        surveyTakenCookieName: function (e) {
          return a("taken_" + e.identifier);
        },
        surveySeenCookieName: function (e) {
          return a("survey_seen_" + e.identifier);
        },
        isBeingViewedOnMobile: function () {
          return window.matchMedia(o).matches;
        },
        surveyIsAllowedOnMobile: function (e) {
          return (
            e.hasOwnProperty("allowedOnMobile") && !0 === e.allowedOnMobile
          );
        },
        pathMatch: function (e) {
          return (
            e !== undefined &&
            new RegExp(
              u
                .map(u.makeArray(e), function (e) {
                  return /[\^$]/.test(e)
                    ? "(?:" + e + ")"
                    : "(?:/" + e + "(?:/|$))";
                })
                .join("|")
            ).test(c.currentPath())
          );
        },
        breadcrumbMatch: function (e) {
          return (
            e !== undefined &&
            new RegExp(u.makeArray(e).join("|"), "i").test(
              c.currentBreadcrumb()
            )
          );
        },
        sectionMatch: function (e) {
          if (e === undefined) return !1;
          var n = new RegExp(u.makeArray(e).join("|"), "i");
          return n.test(c.currentSection()) || n.test(c.currentThemes());
        },
        organisationMatch: function (e) {
          return (
            e !== undefined &&
            new RegExp(u.makeArray(e).join("|")).test(c.currentOrganisation())
          );
        },
        tlsCookieMatch: function (e) {
          var n = c.currentTlsVersion();
          return e !== undefined && "" !== n && n < e[0];
        },
        activeWhen: function (e) {
          if (e.hasOwnProperty("activeWhen")) {
            if (
              e.activeWhen.hasOwnProperty("path") ||
              e.activeWhen.hasOwnProperty("breadcrumb") ||
              e.activeWhen.hasOwnProperty("section") ||
              e.activeWhen.hasOwnProperty("organisation") ||
              e.activeWhen.hasOwnProperty("tlsCookieVersionLimit")
            ) {
              var n = e.activeWhen.matchType || "include",
                r = c.tlsCookieMatch(e.activeWhen.tlsCookieVersionLimit),
                t = c.pathMatch(e.activeWhen.path),
                i = c.breadcrumbMatch(e.activeWhen.breadcrumb),
                o = c.sectionMatch(e.activeWhen.section),
                a = c.organisationMatch(e.activeWhen.organisation),
                s = r || t || i || o || a;
              return "exclude" !== n ? s : !s;
            }
            return !0;
          }
          return !0;
        },
        currentTime: function () {
          return new Date().getTime();
        },
        currentPath: function () {
          return window.location.pathname;
        },
        currentBreadcrumb: function () {
          return u(".gem-c-breadcrumbs").text() || "";
        },
        currentSection: function () {
          return u('meta[name="govuk:section"]').attr("content") || "";
        },
        currentThemes: function () {
          return u('meta[name="govuk:themes"]').attr("content") || "";
        },
        currentOrganisation: function () {
          return (
            u('meta[name="govuk:analytics:organisations"]').attr("content") ||
            ""
          );
        },
        currentTlsVersion: function () {
          var e = GOVUK.getCookie("TLSversion");
          return null === e || "unknown" === e
            ? ""
            : parseFloat(e.replace("TLSv", "")) || "";
        },
      },
      a = function (e) {
        return (
          "govuk_" +
          e.replace(/(_\w)/g, function (e) {
            return e.charAt(1).toUpperCase();
          })
        );
      },
      s = function (e, n, r) {
        var t = parseInt(e, 10);
        return isNaN(t) || t < r ? n : t;
      };
    (window.GOVUK.userSurveys = c),
      u(document).ready(function () {
        GOVUK.userSurveys &&
          (GOVUK.analytics && GOVUK.analytics.gaClientId
            ? window.GOVUK.userSurveys.init()
            : u(window).on("gaClientSet", function () {
                window.GOVUK.userSurveys.init();
              }));
      });
  })(window.jQuery);
