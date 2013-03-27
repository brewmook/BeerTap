define(['MainView', 'TextInputDialog', 'EditPage', 'FollowingModel'],
function(MainView, TextInputDialog, EditPage, FollowingModel) {

function stripLeadingAt(text)
{
    if (text[0] == "@") return text.substring(1);
    return text;
}

function addFollowToView(twitterScreenName, twitter, view, listPageId, viewFactory, refreshList)
{
    twitterScreenName = stripLeadingAt(twitterScreenName);

    if (twitterScreenName == twitter.authorisedScreenName())
    {
        new EditPage(twitterScreenName, twitter, view.page, viewFactory);
        view.addEditable("@"+twitterScreenName, "#"+twitterScreenName, refreshList)
    }
    else
    {
        view.addFollowing("@"+twitterScreenName, "#"+listPageId, refreshList)
    }
};

function MainPage(id, twitter, listPage, viewFactory, settingsHref)
{
    var followDialog = new TextInputDialog("followDialog");
    var model = new FollowingModel(localStorage);
    var view = new MainView(id);

    view.onFollowingClicked(function(title) {
        listPage.show(title, stripLeadingAt(title));
    });

    view.setFollowButton("#followDialog", function() {
        followDialog.show("Follow", "Twitter user", "@", function(user) {
            model.add(user);
            addFollowToView(user, twitter, view, listPage.id, viewFactory, true);
        });
    });

    view.setSettingsButton(settingsHref, function(){});

    model.following.forEach(function(follow)
    {
        addFollowToView(follow, twitter, view, listPage.id, viewFactory, false);
    });
}

return MainPage;

});