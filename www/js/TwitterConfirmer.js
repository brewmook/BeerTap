define(function() {

    function TwitterConfirmer(twitter, parentPage)
    {
        this.twitter = twitter;
        this.popup =
            $('<div data-role="popup" id="confirmTweet" data-theme="d" data-overlay-theme="b" class="ui-content"><!-- style="max-width:340px; padding-bottom:2em;" -->\
                 <h3>Confirm Tweet</h3>\
                 <pre class="tweetPreview"></pre>\
                 <a href="#" data-role="button" data-rel="back" data-inline="true" data-mini="true" data-icon="delete">Cancel</a>\
                 <a href="#" data-role="button" data-rel="back" data-inline="true" data-mini="true" data-icon="check" data-theme="b">Ok</a>\
               </div>')
            .appendTo(parentPage);
    }

    TwitterConfirmer.prototype.tweet = function(text, success, fail)
    {
        var twitter = this.twitter;
        this.popup.find("[data-icon=check]").unbind('click').click(function() {
            twitter.tweet(text, success, fail);
        });
        this.popup.find(".tweetPreview").text(text);

        // Timeout is here to give page chance to change back from a TextInputDialog
        // so that this confirmer dialog shows properly.
        var popup = this.popup;
        setTimeout(function() { popup.popup("open"); }, 500);
    };

    TwitterConfirmer.prototype.getUserTimeline = function(screenName, callback)
    {
        this.twitter.getUserTimeline(screenName, callback);
    };

    return TwitterConfirmer;

});
