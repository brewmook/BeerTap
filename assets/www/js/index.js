var app = {

    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onFreshTweets: function(tweets)
    {
	$("#current").empty();
	$.each(app.tweetsToCurrent(tweets), function(key, value)
        {
	    var text = key + " (since " + value.toLocaleDateString() + ")";
	    $("<li/>").append(text).appendTo("#current");
	});
    },

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function()
    {
	var url="https://api.twitter.com/1/statuses/user_timeline.json?screen_name=TheBatTaps&trim_user=t&include_rts=false&count=100&callback=?";
	//var url="js/sample.json";
	$.getJSON(url, function(data)
	{
	    var tweets = [];
	    $.each(data, function(index, item)
	    {
		tweets.push({text:item.text,date:item.created_at});
	    });
	    tweets.reverse(); // chronological order please
	    app.onFreshTweets(tweets);
	});
    },

    tweetsToCurrent: function(tweets)
    {
	var result = {};
	tweets.forEach(function(tweet)
        {
	    var text = tweet.text.replace(/\s+/g, ' ');
	    var matches = /OFF: (.*) ON: (.*)/.exec(text);
	    if (matches !== null)
	    {
		var off = matches[1];
		if (off in result)
		{
		    console.log("erasing "+off);
		    delete result[off];
		}
		console.log("adding "+matches[2]);
		result[matches[2]] = new Date(tweet.date);
	    }
	});
	return result;
    },

};
