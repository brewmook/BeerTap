define(['Twitter', 'TwitterConfirmer', 'TapsModel', 'JQMListView', 'ListPresenter', 'JQMEditView', 'EditPresenter', 'FollowingPresenter', 'SettingsPage'],
function(Twitter, TwitterConfirmer, TapsModel, JQMListView, ListPresenter, JQMEditView, EditPresenter, FollowingPresenter, SettingsPage) {

    function BeerTap(twitterProxy)
    {
        this.twitter = new Twitter(localStorage, twitterProxy);

        var listModel = new TapsModel(this.twitter);
        var listView = new JQMListView("listPage");
        var listPresenter = new ListPresenter("listPage", listModel, listView, $.mobile.changePage);

        var editView = new JQMEditView("editPage");
        var editModel = new TapsModel(new TwitterConfirmer(this.twitter, editView.page));
        var editPresenter = new EditPresenter("editPage", editModel, editView);

        var settingsPresenter = new SettingsPage("settings", this.twitter);

        this.mainPage = new FollowingPresenter("main", this.twitter, listPresenter, editPresenter, settingsPresenter);

        $(document).ajaxStart(function() { $.mobile.loading( 'show' ); });
        $(document).ajaxStop(function() { $.mobile.loading( 'hide' ); });
        $(document).ajaxError(function() { alert("Error fetching data"); });
        $.mobile.defaultDialogTransition = 'none';
        $.mobile.defaultPageTransition = 'none';

        settingsPresenter.checkForTwitterAuthorisation(this.twitter);
    }

    return BeerTap;

});
