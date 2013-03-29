define(['Twitter', 'TwitterConfirmer', 'TapsModel', 'JQMListView', 'ListPresenter', 'JQMEditView', 'EditPresenter', 'MainPage', 'SettingsPage'],
function(Twitter, TwitterConfirmer, TapsModel, JQMListView, ListPresenter, JQMEditView, EditPresenter, MainPage, SettingsPage) {

    function BeerTap()
    {
        this.twitter = new Twitter(localStorage);

        var listModel = new TapsModel(this.twitter);
        var listView = new JQMListView("listPage");
        var listPresenter = new ListPresenter("listPage", listModel, listView);

        var editView = new JQMEditView("editPage");
        var editModel = new TapsModel(new TwitterConfirmer(this.twitter, editView.page));
        var editPresenter = new EditPresenter("editPage", editModel, editView);

        this.mainPage = new MainPage("main", this.twitter, listPresenter, editPresenter, "#settings");
        this.settings = new SettingsPage("settings", this.twitter);

        $(document).ajaxStart(function() { $.mobile.loading( 'show' ); });
        $(document).ajaxStop(function() { $.mobile.loading( 'hide' ); });
        $(document).ajaxError(function() { alert("Error fetching data"); });

        $.mobile.changePage("#main");
    }

    return BeerTap;

});
