define(['oAuthConfig'], function(oAuthConfig) {

    function TwitterInAppBrowserAuthoriser()
    {
    }

    TwitterInAppBrowserAuthoriser.prototype.authorise = function(twitter)
    {
        var callbackUrl = 'https://github.com/coolhandmook/BeerTap';
        var oAuth = OAuth({
            consumerKey: oAuthConfig.consumerKey,
            consumerSecret: oAuthConfig.consumerSecret,
            callbackUrl: callbackUrl,
            enablePrivilege: false,
            proxy: twitter.proxy,
            requestTokenUrl:  twitter.urls.requestTokenUrl,
            authorizationUrl: twitter.urls.authorizationUrl,
            accessTokenUrl:   twitter.urls.accessTokenUrl
        });

        console.log("Requesting twitter authorisation...");
        var authoriser = this;
        oAuth.fetchRequestToken(
            function(url) {
                var browser = window.open(url, '_blank');
                browser.addEventListener('loadstart', function(event) {
                    var split = event.url.split('?');
                    console.log(split);
                    if (split[0] == callbackUrl)
                    {
                        browser.close();
                        split = split[1].split("oauth_verifier=");
                        if (split.length > 1) authoriser.onVerifierSuccess(twitter, oAuth, split[1]);
                    }
                });
            },
            function(data) {
                alert("Failed to request Twitter authorisation URL");
                console.log("FAIL!");
                console.log(data);
            }
        );
    };

    TwitterInAppBrowserAuthoriser.prototype.onVerifierSuccess = function(twitter, oAuth, verifier)
    {
        function success(data)
        {
            alert("You're all set, sending real tweets as " + twitter.authorisedScreenName() + " now!");
            console.log("Twitter authorisation successful.");
            console.log(data);
        }

        function failure(data)
        {
            alert("Dang, authorisation didn't work.");
            console.log("Twitter authorisation failed.");
            console.log(data);
        }

        oAuth.setVerifier(verifier);
        oAuth.fetchAccessToken(
            function(data) {
                var match = /oauth_token=(.*)&oauth_token_secret=(.*)&user_id=(.*)&screen_name=(.*)/.exec(data.text);
                if (match)
                {
                    twitter.setAuthorisation(match[1], match[2], match[3], match[4]);
                    success(data);
                }
                else
                {
                    failure(data);
                }
            },
            failure);
    };

    return TwitterInAppBrowserAuthoriser;

});