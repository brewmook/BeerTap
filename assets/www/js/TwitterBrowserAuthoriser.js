function TwitterBrowserAuthoriser(twitter, oAuthConfig, parentDiv)
{
    var authoriser = this;
    this.oAuthConfig = oAuthConfig;
    this.button = $('<a id="twitterAuthorise" href="#" data-role="button" data-icon="plus">Authorise (browser)</a>')
                  .appendTo(parentDiv)
                  .click(function() { authoriser.authorise(twitter); });
}

TwitterBrowserAuthoriser.prototype.authorise = function(twitter)
{
    var callbackUrl = 'https://github.com/coolhandmook/OnTap';
    var oAuth = OAuth({
        consumerKey: this.oAuthConfig.consumerKey,
        consumerSecret: this.oAuthConfig.consumerSecret,
        callbackUrl: callbackUrl,
        enablePrivilege: false,
        requestTokenUrl: 'https://api.twitter.com/oauth/request_token',
        authorizationUrl: 'https://twitter.com/oauth/authorize',
        accessTokenUrl: 'https://twitter.com/oauth/access_token',
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

TwitterBrowserAuthoriser.prototype.onVerifierSuccess = function(twitter, oAuth, verifier)
{
    function success(data)
    {
        alert("You're all set, sending real tweets as " + twitter.authorisedScreenName() + " now!");
        $("#twitterScreenName").text(twitter.authorisedScreenName());
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
