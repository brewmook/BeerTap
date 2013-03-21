define(function() {

function TwitterPinAuthoriser(twitter, oAuthConfig, parentDiv)
{
    var authoriser = this;
    this.oAuthConfig = oAuthConfig;
    this.pinDialog = new TextInputDialog("twitterPinDialog");
    this.button = $('<a id="twitterAuthorise" href="#twitterPinDialog" data-role="button" data-icon="plus">Authorise (PIN)</a>')
                  .appendTo(parentDiv)
                  .click(function() { authoriser.authorise(twitter); });
}

TwitterPinAuthoriser.prototype.authorise = function(twitter)
{
    var oAuth = OAuth({
        consumerKey: this.oAuthConfig.consumerKey,
        consumerSecret: this.oAuthConfig.consumerSecret,
        callbackUrl: 'oob',
        enablePrivilege: false,
        requestTokenUrl: 'https://api.twitter.com/oauth/request_token',
        authorizationUrl: 'https://twitter.com/oauth/authorize',
        accessTokenUrl: 'https://twitter.com/oauth/access_token',
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
    var authoriser = this;
    
    function success(data)
    {
        alert("You're all set, sending real tweets as " + twitter.authorisedScreenName() + " now!");
        $("#twitterScreenName").text(twitter.authorisedScreenName());
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