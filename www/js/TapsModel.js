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

    function TapsModel(loader, logger)
    {
        this._loader = loader;
        this._logger = logger;
        this._items = [];
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

    TapsModel.prototype.load = function(userId)
    {
        var model = this;
        this._loader.load(userId, function(commands)
        {
            model._items = reduceCommandsToItems(commands);
            model._fireItemsLoaded();
        });
    };

    function reduceCommandsToItems(commands)
    {
        var itemSet = {};
        commands.forEach(function(command)
        {
            if (command.command == "OFF")
                delete itemSet[command.beer];
            else if (command.command == "ON")
                itemSet[command.beer] = command.time;
        });

        var items = [];
        keys(itemSet).sort().forEach(function(key)
        {
            items.push({name:key, date:new Date(itemSet[key])});
        });

        return items;
    }

    TapsModel.prototype.add = function(name, tweet)
    {
        var index = this.findIndex(name);
        if (index < 0)
        {
            var model = this;
            function success()
            {
                var i = 0;
                while (i < model._items.length && model._items[i].name < name) ++i;
                model._items.splice(i, 0, {name:name, date:new Date()});
                model._fireItemsLoaded();
            }
            if (tweet)
                this._logger.add(name, success);
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
                var item = model._items[index];
                model._items.splice(index,1);
                model._fireItemRemoved(item);
            }
            this._logger.remove(name, success);
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
                    model._items.splice(oldindex,1);
                    model.add(newname, false);
                }
                this._logger.change(oldname, newname, success);
            }
        }
    };

    TapsModel.prototype.findIndex = function(name)
    {
        var i = 0;
        while (i < this._items.length && this._items[i].name != name) ++i;
        if (i == this._items.length) i = -1;
        return i;
    };

    TapsModel.prototype._fireItemsLoaded = function()
    {
        this._itemsLoadedCallbacks.forEach(function(callback) { callback(this._items); }, this);
    };

    TapsModel.prototype._fireItemRemoved = function(item)
    {
        this._itemRemovedCallbacks.forEach(function(callback) { callback(item); });
    };

    return TapsModel;

});
