define(['Twitter', 'TwitterConfirmer', 'TapsModel', 'JQMListView', 'ListPresenter', 'JQMEditView', 'EditPresenter', 'FollowingPresenter', 'SettingsPage'],
function(Twitter, TwitterConfirmer, TapsModel, JQMListView, ListPresenter, JQMEditView, EditPresenter, FollowingPresenter, SettingsPage) {

    function BeerTap(twitterProxy)
    {
        twitterUrls = {
            userTimeline:     "https://api.twitter.com/1.1/statuses/user_timeline.json",
            userTimelineV1:   "https://api.twitter.com/1/statuses/user_timeline.json",
            update:           "https://api.twitter.com/1.1/statuses/update.json",
            requestTokenUrl:  "https://api.twitter.com/oauth/request_token",
            authorizationUrl: "https://api.twitter.com/oauth/authorize",
            accessTokenUrl:   "https://api.twitter.com/oauth/access_token"
        };

        this.twitter = new Twitter(localStorage, twitterUrls, twitterProxy);

        var listModel = new TapsModel(this.twitter);
        var listView = new JQMListView("listPage");
        var listPresenter = new ListPresenter("listPage", listModel, listView);

        var editView = new JQMEditView("editPage");
        var editModel = new TapsModel(new TwitterConfirmer(this.twitter, editView.page));
        var editPresenter = new EditPresenter("editPage", editModel, editView);

        this.mainPage = new FollowingPresenter("main", this.twitter, listPresenter, editPresenter, "#settings");
        this.settings = new SettingsPage("settings", this.twitter, twitterUrls, twitterProxy);

        $(document).ajaxStart(function() { $.mobile.loading( 'show' ); });
        $(document).ajaxStop(function() { $.mobile.loading( 'hide' ); });
        $(document).ajaxError(function() { alert("Error fetching data"); });

        $.mobile.changePage("#main");
    }

    return BeerTap;

});
