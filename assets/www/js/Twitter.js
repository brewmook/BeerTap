// Mock back end pretending to be twitter
function Twitter(screenName)
{
	this.screenName = screenName;
}

Twitter.prototype.getUserTimeline = function(screenName, callback)
{
	//var url = "https://api.twitter.com/1/statuses/user_timeline.json?screen_name="+screenName+"&trim_user=t&include_rts=false&count=100&callback=?";
	var url = "js/sample.json";
	$.getJSON(url, callback);
};

Twitter.prototype.tweet = function(text)
{
    console.log("### TWEETED as " + this.screenName + ":\n" + text);
};
