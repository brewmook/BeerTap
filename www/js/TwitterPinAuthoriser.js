define(['oAuthConfig', 'TextInputDialog'],
function(oAuthConfig, TextInputDialog) {

    function TwitterPinAuthoriser(dialogId)
    {
        this.pinDialog = new TextInputDialog(dialogId);
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
        var authoriser = this;
        oAuth.fetchRequestToken(
            function(url) {
                console.log("Success - sending user to "+url);
                authoriser.pinDialog.show("Twitter PIN", "Enter authorisation PIN:", url, function(pin) { authoriser.onPinSubmit(twitter, oAuth, pin); });
                alert("Go to the URL shown in the PIN dialog, authorise with Twitter, then come back and enter the PIN instead of the URL.");
            },
            function(data) {
                alert("Failed to request Twitter authorisation URL");
                console.log("FAIL!");
                console.log(data);
            }
        );
    };

    TwitterPinAuthoriser.prototype.onPinSubmit = function(twitter, oAuth, pin)
    {
        function success(data)
        {
            alert("You're all set, sending real tweets as " + twitter.authorisedScreenName() + " now!");
            console.log("Twitter authorisation successful.");
            console.log(data);
        }

        function failure(data)
        {
            alert("Dang, your PIN didn't work.");
            console.log("Twitter authorisation failed.");
            console.log(data);
        }

        oAuth.setVerifier(pin);
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

    return TwitterPinAuthoriser;

});