define(function() {

    function SettingsPage(id, twitter, view)
    {
        this.id = id;
        view.onFullscreenClicked(toggleFullScreen);
        twitter.onAuthorisationChange(function(userId, screenName) { view.setTwitterScreenName(screenName); });
    }

    SettingsPage.prototype.show = function()
    {
        $.mobile.changePage('#'+this.id);
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
