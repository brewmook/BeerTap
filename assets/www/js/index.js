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

    addItem: function(name, date)
    {
        var text = name + " (" + formatDate(date) + ")";
	var div = $("<div/>").attr('data-role','collapsible').trigger('create');
	$("<h4/>").append(text).appendTo(div);
	var buttons = $("<div/>").appendTo(div);
	$("<a/>").attr('data-role','button')
	         .attr('href','#')
	         .append('Finished')
	         .appendTo(buttons)
		 .click(function() { app.finishItem(name, date); })
		 .buttonMarkup({inline:true,icon:'delete'});
	$("<a/>").attr('data-role','button')
	         .attr('href','#')
	         .append('Change')
	         .appendTo(buttons)
		 .buttonMarkup({inline:true,icon:'edit'});
	div.appendTo("#current").collapsible();
    },

    finishItem: function(name, date)
    {
        var text = name + " (" + formatDate(date) + ")";
	$("h4:contains("+text+")").parent().remove();
	twitter.tweet("OFF: " + name);
    },

    onFreshTweets: function(tweets)
    {
	$("#current").empty();
	var result = app.tweetsToCurrent(tweets);
	$.each(keys(result).sort(), function(i, key)
        {
	    app.addItem(key, result[key]);
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
	$.getJSON(twitter.timelineQuery("TheBatTaps"), app.onJSON);
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
