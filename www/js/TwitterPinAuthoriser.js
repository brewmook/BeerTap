define(['oAuthConfig', 'TextInputDialog'],
function(oAuthConfig, TextInputDialog) {

    function TwitterPinAuthoriser(verifier)
    {
        this.verifier = verifier;
        this.pinDialog = new TextInputDialog("twitterPinDialog");
    }

    TwitterPinAuthoriser.prototype.authorise = function(twitter)
    {
        var oAuth = OAuth({
            consumerKey: oAuthConfig.consumerKey,
            consumerSecret: oAuthConfig.consumerSecret,
            callbackUrl: 'oob',
            enablePrivilege: false,
            proxy: twitter.proxy,
            requestTokenUrl:  twitter.urls.requestTokenUrl,
            authorizationUrl: twitter.urls.authorizationUrl,
            accessTokenUrl:   twitter.urls.accessTokenUrl
        });

        console.log("Requesting twitter authorisation...");
        var pinDialog = this.pinDialog;
        var verifier = this.verifier;
        oAuth.fetchRequestToken(
            function(url) {
                console.log("Success - sending user to "+url);
                pinDialog.show("Twitter PIN", "Enter authorisation PIN:", url, function(pin) {
                    // Timeout to give the pin dialog a chance to close properly
                    setTimeout(function() { verifier.verify(twitter, oAuth, pin); }, 250);
                });
                alert("Go to the URL shown in the PIN dialog, authorise with Twitter, then come back and enter the PIN instead of the URL.");
            },
            function(data) {
                alert("Failed to request Twitter authorisation URL");
                console.log("FAIL!");
                console.log(data);
            }
        );
    };

    return TwitterPinAuthoriser;

});