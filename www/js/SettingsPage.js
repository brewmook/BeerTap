define(['TwitterBrowserAuthoriser', 'TwitterInAppBrowserAuthoriser', 'TwitterPinAuthoriser', 'AuthorisationVerifier', 'SettingsView'],
function(TwitterBrowserAuthoriser, TwitterInAppBrowserAuthoriser, TwitterPinAuthoriser, AuthorisationVerifier, SettingsView) {

    function SettingsPage(id, twitter)
    {
        this.id = id;
        this.view = new SettingsView(id);
        this.view.setTwitterScreenName(twitter.authorisedScreenName());

        var verifier = new AuthorisationVerifier(this.view.authorisationPopup);

        if (twitter.proxy === undefined)
        {
            var browserAuthoriser = new TwitterInAppBrowserAuthoriser(verifier);
            this.view.addAuthoriser("Authorise (Browser)", function() { browserAuthoriser.authorise(twitter); });

            var pinAuthoriser = new TwitterPinAuthoriser(verifier);
            this.view.addAuthoriser("Authorise (PIN)", function() { pinAuthoriser.authorise(twitter); });
        }
        else
        {
            var browserAuthoriser = new TwitterBrowserAuthoriser(verifier);
            this.view.addAuthoriser("Authorise", function() { browserAuthoriser.authorise(twitter); });
            this.browserAuthoriser = browserAuthoriser;
        }

        var view = this.view;
        twitter.onAuthorisationChange(function(userId, screenName) { view.setTwitterScreenName(screenName); });
    }

    SettingsPage.prototype.show = function()
    {
        $.mobile.changePage('#'+this.id);
    };

    SettingsPage.prototype.checkForTwitterAuthorisation = function(twitter)
    {
        if (this.browserAuthoriser && this.browserAuthoriser.authorisationInProgress())
        {
            this.show();
            this.browserAuthoriser.continueAuthorisation(twitter);
        }
    };

    return SettingsPage;

});
