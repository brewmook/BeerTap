define(['oAuthConfig', 'Utility'],
function(oAuthConfig, Utility) {

    function TwitterBrowserAuthoriser(parentPage)
    {
        this.statusPopup =
        $('<div data-role="popup" id="" data-theme="d" data-overlay-theme="b" class="ui-content" style="min-width:250px;max-width:250px;">\
             <h3></h3>\
             <p></p>\
             <a href="#" data-rel="back" data-role="button" data-icon="check">Ok</a>\
           </div>')
           .appendTo(parentPage);

        this.authorisationRegexp = /\boauth_token=([^&]+)&oauth_verifier=([^&]+)/;
    }

    TwitterBrowserAuthoriser.prototype._createOAuth = function(twitter, accessToken)
    {
        var callbackUrl = Utility.parentPath(window.location.href);
        return OAuth({
            accessTokenKey: accessToken,
            consumerKey: oAuthConfig.consumerKey,
            consumerSecret: oAuthConfig.consumerSecret,
            callbackUrl: callbackUrl,
            enablePrivilege: false,
            proxy: twitter.proxy,
            requestTokenUrl:  twitter.urls.requestTokenUrl,
            authorizationUrl: twitter.urls.authorizationUrl,
            accessTokenUrl:   twitter.urls.accessTokenUrl
        });
    };

    TwitterBrowserAuthoriser.prototype.authorise = function(twitter)
    {
        var oAuth = this._createOAuth(twitter);

        console.log("Requesting twitter authorisation...");
        var authoriser = this;
        oAuth.fetchRequestToken(
            function(url) {
                console.log(url);
                window.location = url;
            },
            function(data) {
                alert("Failed to request Twitter authorisation URL");
                console.log("FAIL!");
                console.log(data);
            }
        );
    };

    TwitterBrowserAuthoriser.prototype.authorisationInProgress = function()
    {
        return this.authorisationRegexp.test(window.location.search);
    };

    TwitterBrowserAuthoriser.prototype.continueAuthorisation = function(twitter)
    {
        var match = this.authorisationRegexp.exec(window.location.search);
        if (match)
        {
            var accessToken = match[1];
            var verifier = match[2];
            var statusPopup = this.statusPopup;

            statusPopup.find("h3").text("Authorising");
            statusPopup.find("p").text("Please wait...");
            statusPopup.find("[data-icon=check]").addClass('ui-disabled');
            statusPopup.popup("open");

            var oAuth = this._createOAuth(twitter, accessToken);

            function failure(data)
            {
                statusPopup.find("h3").text("Failed");
                statusPopup.find("p").text("Twitter authorisation failed");
                statusPopup.find("[data-icon=check]").removeClass('ui-disabled');
                console.log("Twitter authorisation failed.");
                console.log(data);
            }

            function success(data)
            {
                var match = /oauth_token=(.*)&oauth_token_secret=(.*)&user_id=(.*)&screen_name=(.*)/.exec(data.text);
                if (match)
                {
                    twitter.setAuthorisation(match[1], match[2], match[3], match[4]);
                    statusPopup.find("h3").text("Success");
                    statusPopup.find("p").text("Sending tweets as " + twitter.authorisedScreenName());
                    statusPopup.find("[data-icon=check]").removeClass('ui-disabled');
                    console.log("Twitter authorisation successful.");
                    console.log(data);
                }
                else
                {
                    failure(data);
                }
            }

            oAuth.setVerifier(verifier);
            oAuth.fetchAccessToken(success, failure);
        }
    };

    return TwitterBrowserAuthoriser;

});