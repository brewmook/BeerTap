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

        this.view.onFullscreenClicked(toggleFullScreen);

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

    function toggleFullScreen() {
        // Lifted straight from https://developer.mozilla.org/en-US/docs/DOM/Using_fullscreen_mode
        if (!document.fullscreenElement &&    // alternative standard method
            !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    }

    return SettingsPage;

});
