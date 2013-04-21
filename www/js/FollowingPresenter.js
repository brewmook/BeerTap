define(['FollowingView', 'TextInputDialog', 'FollowingModel'],
function(FollowingView, TextInputDialog, FollowingModel) {

    function stripLeadingAt(text)
    {
        if (text[0] == "@") return text.substring(1);
        return text;
    }

    function refreshView(view, userName, nowFollowing)
    {
        var editable = [];
        var following = [];
        var authorised = stripLeadingAt(userName);

        nowFollowing.forEach(function(name) {
            if (stripLeadingAt(name) == authorised)
                editable.push(name);
            else
                following.push(name);
        });

        view.refresh(editable, following);
    }

    function FollowingPresenter(id, login, listPage, editPage, settingsPage)
    {
        var followDialog = new TextInputDialog("followDialog");
        var model = new FollowingModel(localStorage);
        var view = new FollowingView(id);

        login.onAuthorisationChange(function(userId, screenName) {
            refreshView(view, screenName, model.following);
        });

        model.onFollowingChanged(function(nowFollowing) {
            refreshView(view, login.screenName(), nowFollowing);
        });

        view.onEditableClicked(function(title) {
            editPage.show(title, stripLeadingAt(title));
        });

        view.onFollowingClicked(function(title) {
            listPage.show(title, stripLeadingAt(title));
        });

        view.onSettingsClicked(function(){
            settingsPage.show();
        });

        view.onRemoveClicked(function(title) {
            model.remove(title);
        });

        view.onFollowClicked(function() {
            followDialog.show("Follow", "User name", "", function(user) {
                model.add(user);
            });
        });

        refreshView(view, login.screenName(), model.following);
    }

    return FollowingPresenter;

});