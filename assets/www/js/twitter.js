// Mock back end pretending to be twitter
var twitter = {
    timelineQuery: function(screenName) {
        //return "https://api.twitter.com/1/statuses/user_timeline.json?screen_name="+screenName+"&trim_user=t&include_rts=false&count=100&callback=?";
	return "js/sample.json";
    },

    tweet: function(text) {
        console.log("TWEETED: " + text);
    }
};
