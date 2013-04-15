define(function() {

    function SettingsPage(id, twitter, view)
    {
        this.id = id;
        twitter.onAuthorisationChange(function(userId, screenName) { view.setTwitterScreenName(screenName); });
    }

    SettingsPage.prototype.show = function()
    {
        $.mobile.changePage('#'+this.id);
    };

    return SettingsPage;

});
