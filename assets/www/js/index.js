function keys(obj) {
    var keys = [];
    for (var key in obj) {
	if (obj.hasOwnProperty(key)) {
	    keys.push(key);
	}
    }
    return keys;
}

function formatDate(date)
{
    var fields = [date.getFullYear(), date.getMonth()+1, date.getDate()];
    return fields.join('/');
}

function Model()
{
    this.items = [];
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

    var itemSet = {};
    relevant.forEach(function(r)
    {
	delete itemSet[r.off];
	itemSet[r.on] = r.date;
    });

    var items = [];
    keys(itemSet).sort().forEach(function(key)
    {
	items.push({name:key, date:new Date(itemSet[key])});
    });

    this.items = items;
};

Model.prototype.remove = function(name)
{
    this.items.forEach(function(item, index)
    {
	if (item.name == name)
	{
	    this.items.splice(index,index);
	    return;
	}
    }, this);
};

var app = {

    model: new Model(),

    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    addItem: function(item)
    {
	var name = item.name;
	var date = item.date;
        var text = name + " (" + formatDate(date) + ")";
	var div = $("<div/>").attr('data-role','collapsible').trigger('create');
	$("<h4/>").append(text).appendTo(div);
	var buttons = $("<div/>").appendTo(div);
	$("<a/>").attr('data-role','button')
	         .attr('href','#')
	         .append('Remove')
	         .appendTo(buttons)
		 .click(function() { app.removeItem(name); })
		 .buttonMarkup({inline:true,icon:'delete'});
	$("<a/>").attr('data-role','button')
	         .attr('href','#')
	         .append('Change')
	         .appendTo(buttons)
		 .buttonMarkup({inline:true,icon:'edit'});
	div.appendTo("#current").collapsible();
    },

    removeItem: function(name)
    {
	$("h4:contains('"+name+" (')").parent().remove();
	app.model.remove(name);
	twitter.tweet("OFF: " + name);
    },

    refresh: function(items)
    {
	$("#current").empty();
	items.forEach(app.addItem);
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
	    app.refresh(app.model.items);
	});
    },

};
