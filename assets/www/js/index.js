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

function Model()
{
    this._items = {}
}

Model.prototype.parseTweets = function(data)
{
    var relevant = [];
    $.each(data, function(index, item)
    {
	var text = item.text.replace(/\s+/g, ' ');
	var matches = /OFF: *(.*) ON: *(.*)/.exec(text);
	if (matches !== null)
	{
	    relevant.push({off:matches[1],on:matches[2],date:item.created_at});
	}
    });
    relevant.reverse(); // chronological order please

    this._items = [];
    relevant.forEach(function(r)
    {
	delete this._items[r.off];
	this._items[r.on] = new Date(r.date);
    }, this);
};

Model.prototype.each = function(func)
{
    keys(this._items).sort().forEach(function(key)
    {
	func(key, this._items[key]);
    }, this);
};

var app = {

    model: new Model(),

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

    refresh: function()
    {
	$("#current").empty();
	app.model.each(app.addItem);
    },

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function()
    {
	$.getJSON(twitter.timelineQuery("TheBatTaps"), function(data)
        {
	    app.model.parseTweets(data);
	    app.refresh();
	});
    },

};
