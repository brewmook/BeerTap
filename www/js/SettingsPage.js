define(['TwitterBrowserAuthoriser', 'TwitterPinAuthoriser', 'SettingsView'],
function(TwitterBrowserAuthoriser, TwitterPinAuthoriser, SettingsView) {

    function SettingsPage(id, twitter)
    {
        this.view = new SettingsView(id);
        this.view.setTwitterScreenName(twitter.authorisedScreenName());

        if (twitter.proxy === undefined)
        {
            var browserAuthoriser = new TwitterBrowserAuthoriser();
            this.view.addAuthoriser("Browser", "#", function() { browserAuthoriser.authorise(twitter); });
        }

        var pinAuthoriser = new TwitterPinAuthoriser("twitterPinDialog");
        this.view.addAuthoriser("PIN", "#twitterPinDialog", function() { pinAuthoriser.authorise(twitter); });

        var view = this.view;
        twitter.onAuthorisationChange(function(userId, screenName) { view.setTwitterScreenName(screenName); });
    }

    return SettingsPage;

});
