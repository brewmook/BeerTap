define(function() {

function TwitterProxy(localProxyUrl)
{
    this.localProxyUrl = localProxyUrl;
}

TwitterProxy.prototype.onAuthorisationChange = function(callback)
{
}

TwitterProxy.prototype.authorised = function()
{
    return false;
}

TwitterProxy.prototype.getUserTimeline = function(screenName, callback)
{
    $.getJSON(this.localProxyUrl+"?screen_name="+screenName+"&trim_user=true&include_rts=false&count=100",
              callback);
};

TwitterProxy.prototype.tweet = function(text, success, failure)
{
    failure("Twitter proxy not authorised");
};

TwitterProxy.prototype.setAuthorisation = function(accessTokenKey, accessTokenSecret, userId, screenName)
{
}

TwitterProxy.prototype.authorisedScreenName = function()
{
    return undefined;
}

return TwitterProxy;

});
