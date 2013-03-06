function Twitter(screenName, oAuthConfig)
{
    this.screenName = screenName;

    this.oAuth = OAuth({
        consumerKey: oAuthConfig.consumerKey,
        consumerSecret: oAuthConfig.consumerSecret,
        callbackUrl: 'oob',
        enablePrivilege: false,
        requestTokenUrl: 'https://api.twitter.com/oauth/request_token',
        authorizationUrl: 'https://twitter.com/oauth/authorize',
        accessTokenUrl: 'https://twitter.com/oauth/access_token',
    });
  
    if (localStorage.accessTokenKey && localStorage.accessTokenSecret)
    {
        this.oAuth.setAccessToken(localStorage.accessTokenKey, localStorage.accessTokenSecret);
    }
}

Twitter.prototype.authorised = function()
{
    return this.oAuth !== undefined && this.oAuth.getAccessTokenKey() != "";
}

Twitter.prototype.getUserTimeline = function(screenName, callback)
{
    //var url = "https://api.twitter.com/1/statuses/user_timeline.json?screen_name="+screenName+"&trim_user=t&include_rts=false&count=100&callback=?";
    var url = "js/sample.json";
    $.getJSON(url, callback);
};

Twitter.prototype.tweet = function(text, success, failure)
{
    var logMessage = "### TWEETED as " + this.screenName + ":\n" + text;
    if (this.authorised())
    {
        this.oAuth.post("https://api.twitter.com/1.1/statuses/update.json",
                        { status: text },
                        function(data) { console.log(logMessage); success(data); },
                        failure);
    }
    else
    {
        console.log('### Twitter not authorised, faking it!');
        console.log(logMessage);
        success('FAKE');
    }
};

Twitter.prototype.requestAuthorisationPinURL = function(success, failure)
{
    this.oAuth.fetchRequestToken(success, failure);
};

Twitter.prototype.setAuthorisationPin = function(pin, success, failure)
{
    if (this.oAuth !== undefined)
    {
        this.oAuth.setVerifier(pin);
        this.oAuth.fetchAccessToken(success, failure);
    }
};
