define(['Twitter', 'JQMListView', 'JQMEditView', 'MainPage', 'SettingsPage'],
function(Twitter, JQMListView, JQMEditView, MainPage, SettingsPage) {

function BeerTap()
{
    var jQueryMobileViewFactory = {
        newListView: function(id) { return new JQMListView(id); },
        newEditView: function(id, callbacks) { return new JQMEditView(id, callbacks); },
    };

    this.twitter = new Twitter(localStorage);
    this.mainPage = new MainPage("main", this.twitter, jQueryMobileViewFactory, "#settings");
    this.settings = new SettingsPage("settings", this.twitter);

    $(document).ajaxStart(function() { $.mobile.loading( 'show' ); });
    $(document).ajaxStop(function() { $.mobile.loading( 'hide' ); });
    $(document).ajaxError(function() { alert("Error fetching data"); });

    $.mobile.changePage("#main");
}

return BeerTap;

});
