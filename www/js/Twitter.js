function Twitter(oAuthConfig, store)
{
    this.store = store;

    this.oAuth = OAuth({
        consumerKey: oAuthConfig.consumerKey,
        consumerSecret: oAuthConfig.consumerSecret,
        enablePrivilege: false,
    });

    if (store.accessTokenKey && store.accessTokenSecret)
    {
        this.oAuth.setAccessToken(store.accessTokenKey, store.accessTokenSecret);
    }
}

Twitter.prototype.authorised = function()
{
    return this.oAuth !== undefined && this.oAuth.getAccessTokenKey() != "";
}

Twitter.prototype.getUserTimeline = function(screenName, callback)
{
    $.getJSON("https://api.twitter.com/1/statuses/user_timeline.json?screen_name="+screenName+"&trim_user=true&include_rts=false&count=100",
              callback);
};

Twitter.prototype.tweet = function(text, success, failure)
{
    if (this.authorised())
    {
        this.oAuth.post("https://api.twitter.com/1.1/statuses/update.json",
                        { status: text },
                        function(data) {
                            console.log("### TWEETED as " + this.store.screenName + ":\n" + text);
                            success(data);
                        },
                        failure);
    }
    else
    {
        failure("Twitter not authorised");
    }
};

Twitter.prototype.setAuthorisation = function(accessTokenKey, accessTokenSecret, userId, screenName)
{
    this.store.accessTokenKey = accessTokenKey;
    this.store.accessTokenSecret = accessTokenSecret;
    this.store.userId = userId;
    this.store.screenName = screenName;
    this.oAuth.setAccessToken(accessTokenKey, accessTokenSecret);
}

Twitter.prototype.authorisedScreenName = function()
{
    return this.store.screenName;
}
