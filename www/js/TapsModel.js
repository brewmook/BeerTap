define(function() {

    function keys(obj) {
        var result = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                result.push(key);
            }
        }
        return result;
    }

    function TapsModel(twitter)
    {
        this.twitter = twitter;
        this.items = [];
        this._itemsLoadedCallbacks = [];
        this._itemRemovedCallbacks = [];
    }

    TapsModel.prototype.onItemsLoaded = function(callback)
    {
        this._itemsLoadedCallbacks.push(callback);
    };

    TapsModel.prototype.onItemRemoved = function(callback)
    {
        this._itemRemovedCallbacks.push(callback);
    };

    TapsModel.prototype.load = function(twitterScreenName)
    {
        var model = this;
        this.twitter.getUserTimeline(twitterScreenName, function(data)
        {
            model._parseTweets(data);
        });
    };

    TapsModel.prototype._parseTweets = function(tweets)
    {
        tweets.reverse(); // chronological order please

        var itemSet = {};
        var offOnRegExp = /(OFF|ON): *(.*)/;
        tweets.forEach(function(tweet)
        {
            var lines = tweet.text.split('\n');
            lines.forEach(function(line)
            {
                var matches = offOnRegExp.exec(line);
                if (matches)
                {
                    var command = matches[1];
                    var text = matches[2];
                    if (command == "OFF")
                        delete itemSet[text];
                    else if (command == "ON")
                        itemSet[text] = tweet.created_at;
                }
            });
        });

        var items = [];
        keys(itemSet).sort().forEach(function(key)
        {
            items.push({name:key, date:new Date(itemSet[key])});
        });

        this.items = items;
        this._fireItemsLoaded();
    };

    TapsModel.prototype.add = function(name, tweet)
    {
        var index = this.findIndex(name);
        if (index < 0)
        {
            var model = this;
            function success()
            {
                var i = 0;
                while (i < model.items.length && model.items[i].name < name) ++i;
                model.items.splice(i, 0, {name:name, date:new Date()});
                model._fireItemsLoaded();
            }
            if (tweet)
                this.twitter.tweet("ON: " + name, success, function(data){});
            else
                success();
        }
    };

    TapsModel.prototype.remove = function(name)
    {
        var index = this.findIndex(name);
        if (index >= 0)
        {
            var model = this;
            function success()
            {
                var item = model.items[index];
                model.items.splice(index,1);
                model._fireItemRemoved(item);
            }
            this.twitter.tweet("OFF: " + name, success, function(data){});
        }
    };

    TapsModel.prototype.change = function(oldname, newname)
    {
        if (oldname != newname)
        {
            var oldindex = this.findIndex(oldname);
            var newindex = this.findIndex(newname);
            if (oldindex >= 0 && newindex < 0)
            {
                var model = this;
                function success()
                {
                    model.items.splice(oldindex,1);
                    model.add(newname, false);
                }
                this.twitter.tweet("OFF: " + oldname + "\nON: " + newname, success, function(data){});
            }
        }
    };

    TapsModel.prototype.findIndex = function(name)
    {
        var i = 0;
        while (i < this.items.length && this.items[i].name != name) ++i;
        if (i == this.items.length) i = -1;
        return i;
    };

    TapsModel.prototype._fireItemsLoaded = function()
    {
        this._itemsLoadedCallbacks.forEach(function(callback) { callback(this.items); }, this);
    };

    TapsModel.prototype._fireItemRemoved = function(item)
    {
        this._itemRemovedCallbacks.forEach(function(callback) { callback(item); });
    };

    return TapsModel;

});
