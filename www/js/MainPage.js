define(['MainView', 'TextInputDialog', 'ListPage', 'EditPage', 'FollowingModel', 'Model'],
function(MainView, TextInputDialog, ListPage, EditPage, FollowingModel, Model) {

function addFollowToView(twitterScreenName, twitter, view, viewFactory, refreshList)
{
    if (twitterScreenName[0] == "@")
        twitterScreenName = twitterScreenName.substring(1);

    if (twitterScreenName == twitter.authorisedScreenName())
    {
        new EditPage(twitterScreenName, twitter, view.page, viewFactory);
        view.addEditable("@"+twitterScreenName, "#"+twitterScreenName, refreshList)
    }
    else
    {
        var model = new Model(twitter);
        var listView = viewFactory.newListView(twitterScreenName);
        listView.setHeading('@'+twitterScreenName);
        new ListPage(twitterScreenName, model, listView);
        view.addFollowing("@"+twitterScreenName, "#"+twitterScreenName, refreshList)
    }
};

function MainPage(id, twitter, viewFactory, settingsHref)
{
    var followDialog = new TextInputDialog("followDialog");
    var model = new FollowingModel(localStorage);
    var view = new MainView(id);

    view.setFollowButton("#followDialog", function() {
        followDialog.show("Follow", "Twitter user", "@", function(user) {
            model.add(user);
            addFollowToView(user, twitter, view, viewFactory, true);
        });
    });

    view.setSettingsButton(settingsHref, function(){});

    model.following.forEach(function(follow)
    {
        addFollowToView(follow, twitter, view, viewFactory, false);
    });
}

return MainPage;

});