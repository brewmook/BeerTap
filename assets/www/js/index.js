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

function View(container)
{
    this.container = container;
}

View.prototype.refresh = function(items)
{
    this.container.empty();
    items.forEach(this.add, this);
};

View.prototype.add = function(item)
{
    var text = item.name + " (" + formatDate(item.date) + ")";
    var div = $("<div/>").attr('data-role','collapsible').trigger('create');
    $("<h4/>").append(text).appendTo(div);
    var buttons = $("<div/>").appendTo(div);
    $("<a/>").attr('data-role','button')
	     .attr('href','#')
	     .append('Remove')
	     .appendTo(buttons)
	     .click(function() { app.removeItem(item); })
	     .buttonMarkup({inline:true,icon:'delete'});
    $("<a/>").attr('data-role','button')
	     .attr('href','#')
	     .append('Change')
	     .appendTo(buttons)
	     .buttonMarkup({inline:true,icon:'edit'});
    div.appendTo(this.container).collapsible();
};

View.prototype.remove = function(item)
{
    $("h4:contains('"+item.name+" (')").parent().remove();
};

var app = {

    model: new Model(),
    view: new View($("#current")),

    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    removeItem: function(item)
    {
	app.model.remove(item);
	app.view.remove(item);
	twitter.tweet("OFF: " + item.name);
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
	    app.view.refresh(app.model.items);
	});
    },

};
