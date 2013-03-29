define(['TwitterProxy', 'ListView', 'ListPresenter', 'TapsModel'],
function (TwitterProxy, ListView, ListPresenter, TapsModel) {

    function BeerTapEmbed(twitterScreenName, parent)
    {
        var twitter = new TwitterProxy("proxy/twitter_user_timeline_json.php");
        var model = new TapsModel(twitter);
        var view = new ListView(twitterScreenName);
        var presenter = new ListPresenter(twitterScreenName, model, view);
        view.page.appendTo(parent);
        presenter.show('@'+twitterScreenName, twitterScreenName);
    }

    return BeerTapEmbed;

});
