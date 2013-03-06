function keys(obj) {
    var result = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            result.push(key);
        }
    }
    return result;
}

function Model(twitter)
{
    this.twitter = twitter;
    this.items = [];
    this.itemsLoaded = function(){};
    this.itemRemoved = function(item){};
}

Model.prototype.load = function(twitterScreenName)
{
    var model = this;
    this.twitter.getUserTimeline(twitterScreenName, function(data)
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

Model.prototype.add = function(name, tweet)
{
    var index = this.findIndex(name);
    if (index < 0)
    {
        var i = 0;
        if (tweet) this.twitter.tweet("ON: " + name, function(data){}, function(data){});
        while (i < this.items.length && this.items[i].name < name) ++i;
        this.items.splice(i, 0, {name:name, date:new Date()});
        this.itemsLoaded();
    }
};

Model.prototype.remove = function(name)
{
    var index = this.findIndex(name);
    if (index >= 0)
    {
        var item = this.items[index];
        this.twitter.tweet("OFF: " + name, function(data){}, function(data){});
        this.items.splice(index,1);
        this.itemRemoved(item);
    }
};

Model.prototype.change = function(oldname, newname)
{
    if (oldname != newname)
    {
        var oldindex = this.findIndex(oldname);
        var newindex = this.findIndex(newname);
        if (oldindex >= 0 && newindex < 0)
        {
            this.twitter.tweet("OFF: " + oldname + "\nON: " + newname, function(data){}, function(data){});
            this.items.splice(oldindex,1);
            this.add(newname, false);
        }
    }
};

Model.prototype.findIndex = function(name)
{
    var i = 0;
    while (i < this.items.length && this.items[i].name != name) ++i;
    if (i == this.items.length) i = -1;
    return i;
};
