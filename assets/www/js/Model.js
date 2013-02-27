function keys(obj) {
    var keys = [];
    for (var key in obj) {
	if (obj.hasOwnProperty(key)) {
	    keys.push(key);
	}
    }
    return keys;
}

function Model(twitterScreenName)
{
    this.items = [];
    this.itemsLoaded = function(){};
    this.itemRemoved = function(item){};
}

Model.prototype.load = function(twitterScreenName)
{
    var model = this;
    $.getJSON(twitter.timelineQuery(twitterScreenName), function(data)
    {
	model._parseTweets(data);
    });
};

Model.prototype._parseTweets = function(data)
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
    this.itemsLoaded();
};

Model.prototype.remove = function(name)
{
    this.items.forEach(function(item, index)
    {
	if (item.name == name)
	{
	    twitter.tweet("OFF: " + item.name);
	    this.items.splice(index,index);
	    this.itemRemoved(item);
	    return;
	}
    }, this);
};
