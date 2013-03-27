define(['MainView', 'TextInputDialog', 'EditPage', 'FollowingModel'],
function(MainView, TextInputDialog, EditPage, FollowingModel) {

function stripLeadingAt(text)
{
    if (text[0] == "@") return text.substring(1);
    return text;
}

function addFollowToView(twitterScreenName, twitter, view, listPageId, editPageId, refreshList)
{
    twitterScreenName = stripLeadingAt(twitterScreenName);

    if (twitterScreenName == twitter.authorisedScreenName())
    {
        view.addEditable("@"+twitterScreenName, "#"+editPageId, refreshList)
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

    var editPage = new EditPage("editPage", twitter, viewFactory);

    view.onEditableClicked(function(title) {
        editPage.show(title, stripLeadingAt(title));
    });

    view.onFollowingClicked(function(title) {
        listPage.show(title, stripLeadingAt(title));
    });

    view.onFollowClicked("#followDialog", function() {
        followDialog.show("Follow", "Twitter user", "@", function(user) {
            model.add(user);
            addFollowToView(user, twitter, view, listPage.id, editPage.id, true);
        });
    });

    view.onSettingsClicked(settingsHref, function(){});

    model.following.forEach(function(follow)
    {
        addFollowToView(follow, twitter, view, listPage.id, editPage.id, false);
    });
}

return MainPage;

});