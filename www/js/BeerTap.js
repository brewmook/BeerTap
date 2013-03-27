define(['Twitter', 'Model', 'JQMListView', 'ListPage', 'JQMEditView', 'MainPage', 'SettingsPage'],
function(Twitter, Model, JQMListView, ListPage, JQMEditView, MainPage, SettingsPage) {

function BeerTap()
{
    var jQueryMobileViewFactory = {
        newEditView: function(id, callbacks) { return new JQMEditView(id, callbacks); }
    };

    this.twitter = new Twitter(localStorage);

    var listModel = new Model(this.twitter);
    var listView = new JQMListView("listPage");
    var listPresenter = new ListPage("listPage", listModel, listView);

    this.mainPage = new MainPage("main", this.twitter, listPresenter, jQueryMobileViewFactory, "#settings");
    this.settings = new SettingsPage("settings", this.twitter);

    $(document).ajaxStart(function() { $.mobile.loading( 'show' ); });
    $(document).ajaxStop(function() { $.mobile.loading( 'hide' ); });
    $(document).ajaxError(function() { alert("Error fetching data"); });

    $.mobile.changePage("#main");
}

return BeerTap;

});
