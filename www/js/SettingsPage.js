define(function() {

    function SettingsPage(id, login, view)
    {
        this.id = id;
        login.onAuthorisationChange(function(userId, screenName) { view.setScreenName(screenName); });
    }

    SettingsPage.prototype.show = function()
    {
        $.mobile.changePage('#'+this.id);
    };

    return SettingsPage;

});
