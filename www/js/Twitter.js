define(['oAuthConfig'], function(oAuthConfig) {

    function Twitter(store, proxy)
    {
        this.store = store;
        this.proxy = proxy;
        this._authorisationChangeCallbacks = [];

        this.urls = {
            userTimeline:     "https://api.twitter.com/1.1/statuses/user_timeline.json",
            userTimelineV1:   "https://api.twitter.com/1/statuses/user_timeline.json",
            update:           "https://api.twitter.com/1.1/statuses/update.json",
            requestTokenUrl:  "https://api.twitter.com/oauth/request_token",
            authorizationUrl: "https://api.twitter.com/oauth/authorize",
            accessTokenUrl:   "https://api.twitter.com/oauth/access_token"
        };

        this.oAuth = OAuth({
            consumerKey: oAuthConfig.consumerKey,
            consumerSecret: oAuthConfig.consumerSecret,
            enablePrivilege: false,
            proxy: proxy,
            requestTokenUrl:  this.urls.requestTokenUrl,
            authorizationUrl: this.urls.authorizationUrl,
            accessTokenUrl:   this.urls.accessTokenUrl
        });

        if (store.accessTokenKey && store.accessTokenSecret)
        {
            this.oAuth.setAccessToken(store.accessTokenKey, store.accessTokenSecret);
        }
    }

    Twitter.prototype.onAuthorisationChange = function(callback)
    {
        this._authorisationChangeCallbacks.push(callback);
    };

    Twitter.prototype.authorised = function()
    {
        return this.oAuth !== undefined && this.oAuth.getAccessTokenKey() != "";
    };

    Twitter.prototype.getUserTimeline = function(screenName, success)
    {
        var url;
        if (this.authorised())
            url = this.urls.userTimeline + "?trim_user=true&include_rts=false&count=100&screen_name=";
        else
            url = this.urls.userTimelineV1 + "?trim_user=true&include_rts=false&count=100&screen_name=";
        this.oAuth.getJSON(url+screenName, success, function(data) { alert("Get timeline failed"); });
    };

    Twitter.prototype.tweet = function(text, success, failure)
    {
        if (this.authorised())
        {
            var screenName = this.store.screenName;
            this.oAuth.post(this.urls.update,
                            { status: text },
                            function(data) {
                                console.log("### TWEETED as " + screenName + ":\n" + text);
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
        this._authorisationChangeCallbacks.forEach(function(callback) { callback(userId, screenName); });
    };

    Twitter.prototype.authorisedScreenName = function()
    {
        return this.store.screenName;
    };

    return Twitter;

});
