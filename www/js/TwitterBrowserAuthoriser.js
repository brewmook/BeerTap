define(['oAuthConfig', 'Utility'],
function(oAuthConfig, Utility) {

    function TwitterBrowserAuthoriser(statusPopup)
    {
        this.statusPopup = statusPopup;
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

            statusPopup.show("Authorising", "Please wait...", false);

            var oAuth = this._createOAuth(twitter, accessToken);

            function failure(data)
            {
                statusPopup.show("Failed", "Twitter authorisation failed", true);
                console.log("Twitter authorisation failed.");
                console.log(data);
            }

            function success(data)
            {
                var match = /oauth_token=(.*)&oauth_token_secret=(.*)&user_id=(.*)&screen_name=(.*)/.exec(data.text);
                if (match)
                {
                    twitter.setAuthorisation(match[1], match[2], match[3], match[4]);
                    statusPopup.show("Success", "Sending tweets as " + twitter.authorisedScreenName(), true);
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