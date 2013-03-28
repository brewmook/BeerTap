define(['Twitter', 'TapsModel', 'JQMListView', 'ListPage', 'JQMEditView', 'EditPage', 'MainPage', 'SettingsPage'],
function(Twitter, TapsModel, JQMListView, ListPage, JQMEditView, EditPage, MainPage, SettingsPage) {

    function BeerTap()
    {
        var jQueryMobileViewFactory = {
            newEditView: function(id, callbacks) { return new JQMEditView(id, callbacks); }
        };

        this.twitter = new Twitter(localStorage);

        var listModel = new TapsModel(this.twitter);
        var listView = new JQMListView("listPage");
        var listPresenter = new ListPage("listPage", listModel, listView);

        var editPresenter = new EditPage("editPage", this.twitter, jQueryMobileViewFactory);

        this.mainPage = new MainPage("main", this.twitter, listPresenter, editPresenter, "#settings");
        this.settings = new SettingsPage("settings", this.twitter);

        $(document).ajaxStart(function() { $.mobile.loading( 'show' ); });
        $(document).ajaxStop(function() { $.mobile.loading( 'hide' ); });
        $(document).ajaxError(function() { alert("Error fetching data"); });

        $.mobile.changePage("#main");
    }

    return BeerTap;

});
