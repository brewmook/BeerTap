define(['oAuthConfig', 'Utility'],
function(oAuthConfig, Utility) {

    function TwitterBrowserAuthoriser(twitter, authorisationVerifier)
    {
        var authorisationRegexp = /\boauth_token=([^&]+)&oauth_verifier=([^&]+)/;
        var match = authorisationRegexp.exec(window.location.search);
        if (match)
        {
            var accessToken = match[1];
            var verifier = match[2];
            var oAuth = this._createOAuth(twitter, accessToken);
            authorisationVerifier.verify(twitter, oAuth, verifier);
        }
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

    return TwitterBrowserAuthoriser;

});