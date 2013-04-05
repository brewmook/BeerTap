define(['TwitterBrowserAuthoriser', 'TwitterPinAuthoriser', 'SettingsView'],
function(TwitterBrowserAuthoriser, TwitterPinAuthoriser, SettingsView) {

    function SettingsPage(id, twitter, twitterUrls, twitterProxy)
    {
        this.view = new SettingsView(id);
        this.view.setTwitterScreenName(twitter.authorisedScreenName());

        if (twitterProxy === undefined)
        {
            var browserAuthoriser = new TwitterBrowserAuthoriser();
            this.view.addAuthoriser("Browser", "#", function() { browserAuthoriser.authorise(twitter, twitterUrls, twitterProxy); });
        }

        var pinAuthoriser = new TwitterPinAuthoriser("twitterPinDialog");
        this.view.addAuthoriser("PIN", "#twitterPinDialog", function() { pinAuthoriser.authorise(twitter, twitterUrls, twitterProxy); });

        var view = this.view;
        twitter.onAuthorisationChange(function(userId, screenName) { view.setTwitterScreenName(screenName); });
    }

    return SettingsPage;

});
