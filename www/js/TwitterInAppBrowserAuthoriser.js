define(['oAuthConfig'], function(oAuthConfig) {

    function TwitterInAppBrowserAuthoriser(verifier)
    {
        this.verifier = verifier;
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
        var verifier = this.verifier;
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
                        if (split.length > 1)
                            verifier.verify(twitter, oAuth, split[1]);
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

    return TwitterInAppBrowserAuthoriser;

});