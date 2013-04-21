define(function() {

    function parseTweets(tweets)
    {
        tweets.reverse(); // chronological order please

        var commands = [];
        var offOnRegExp = /(OFF|ON): *(.*)/;
        tweets.forEach(function(tweet)
        {
            var lines = tweet.text.split('\n');
            lines.forEach(function(line)
            {
                var matches = offOnRegExp.exec(line);
                if (matches)
                {
                    commands.push({
                        command: matches[1],
                        beer: matches[2],
                        time: tweet.created_at
                    });
                }
            });
        });

        return commands;
    }

    function TwitterLoader(twitter)
    {
        this._twitter = twitter;
    }

    TwitterLoader.prototype.load = function(twitterScreenName, itemsLoaded)
    {
        var model = this;
        this._twitter.getUserTimeline(twitterScreenName, function(data)
        {
            itemsLoaded(parseTweets(data));
        });
    };

    return TwitterLoader;

});
