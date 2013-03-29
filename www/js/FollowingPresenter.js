define(['FollowingView', 'TextInputDialog', 'FollowingModel'],
function(FollowingView, TextInputDialog, FollowingModel) {

    function stripLeadingAt(text)
    {
        if (text[0] == "@") return text.substring(1);
        return text;
    }

    function refreshView(view, authorisedTwitterName, nowFollowing, jqmRefresh)
    {
        var editable = [];
        var following = [];
        var authorised = "@"+authorisedTwitterName;

        nowFollowing.forEach(function(name) {
            if (name == authorised)
                editable.push(name);
            else
                following.push(name);
        });

        view.refresh(editable, following, jqmRefresh);
    }

    function FollowingPresenter(id, twitter, listPage, editPage, settingsHref)
    {
        var followDialog = new TextInputDialog("followDialog");
        var model = new FollowingModel(localStorage);
        var view = new FollowingView(id);

        twitter.onAuthorisationChange(function(userId, screenName) {
            refreshView(view, screenName, model.following, true);
        });

        model.onFollowingChanged(function(nowFollowing) {
            refreshView(view, twitter.authorisedScreenName(), nowFollowing, true);
        });

        view.onEditableClicked("#"+editPage.id, function(title) {
            editPage.show(title, stripLeadingAt(title));
        });

        view.onFollowingClicked("#"+listPage.id, function(title) {
            listPage.show(title, stripLeadingAt(title));
        });

        view.onRemoveClicked(function(title) {
            model.remove(title);
        });

        view.onFollowClicked("#followDialog", function() {
            followDialog.show("Follow", "Twitter user", "@", function(user) {
                model.add(user);
            });
        });

        view.onSettingsClicked(settingsHref, function(){});

        refreshView(view, twitter.authorisedScreenName(), model.following, false);
    }

    return FollowingPresenter;

});