function keys(obj) {
    var keys = [];
    for (var key in obj) {
	if (obj.hasOwnProperty(key)) {
	    keys.push(key);
	}
    }
    keys.sort();
    return keys;
}

function formatDate(date)
{
    var fields = [date.getFullYear(), date.getMonth()+1, date.getDate()];
    return fields.join('/');
}

var app = {

    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    addItem: function(text)
    {
	var div = $("<div/>").attr('data-role','collapsible').trigger('create');
	$("<h4/>").append(text).appendTo(div);
	var buttons = $("<div/>").appendTo(div);
	$("<a/>").attr('data-role','button')
	         .attr('href','#')
	         .append('Finished')
	         .appendTo(buttons)
		 .buttonMarkup({inline:true,icon:'delete'});
	$("<a/>").attr('data-role','button')
	         .attr('href','#')
	         .append('Change')
	         .appendTo(buttons)
		 .buttonMarkup({inline:true,icon:'edit'});
	div.appendTo("#current").collapsible();
    },

    onFreshTweets: function(tweets)
    {
	$("#current").empty();
	var result = app.tweetsToCurrent(tweets);
	$.each(keys(result).sort(), function(i, key)
        {
	    var text = key + " (" + formatDate(result[key]) + ")";
	    app.addItem(text);
	});
    },

    onJSON: function(data)
    {
	var tweets = [];
	$.each(data, function(index, item)
	{
	    tweets.push({text:item.text,date:item.created_at});
	});
	tweets.reverse(); // chronological order please
	app.onFreshTweets(tweets);
    },

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function()
    {
	//var url="https://api.twitter.com/1/statuses/user_timeline.json?screen_name=TheBatTaps&trim_user=t&include_rts=false&count=100&callback=?";
	var url="js/sample.json";
	$.getJSON(url, app.onJSON);
    },

    tweetsToCurrent: function(tweets)
    {
	var result = {};
	tweets.forEach(function(tweet)
        {
	    var text = tweet.text.replace(/\s+/g, ' ');
	    var matches = /OFF: *(.*) ON: *(.*)/.exec(text);
	    if (matches !== null)
	    {
		var off = matches[1];
		if (off in result)
		    delete result[off];
		result[matches[2]] = new Date(tweet.date);
	    }
	});
	return result;
    },

};
