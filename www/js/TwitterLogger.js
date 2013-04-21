define(function() {

    function TwitterLogger(twitter)
    {
        this._twitter = twitter;
    }

    TwitterLogger.prototype.add = function(name, success)
    {
        this._twitter.tweet("ON: " + name, success, function(data){});
    };

    TwitterLogger.prototype.remove = function(name, success)
    {
        this._twitter.tweet("OFF: " + name, success, function(data){});
    };

    TwitterLogger.prototype.change = function(oldname, newname, success)
    {
        this._twitter.tweet("OFF: " + oldname + "\nON: " + newname, success, function(data){});
    };

    return TwitterLogger;

});
