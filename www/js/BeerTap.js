define(['Twitter', 'TwitterLogger', 'TwitterConfirmer', 'TapsModel', 'JQMListView', 'ListPresenter', 'JQMEditView',
        'EditPresenter', 'FollowingPresenter', 'SettingsView', 'SettingsPage', 'AuthorisationPopup',
        'TwitterBrowserAuthoriser', 'TwitterInAppBrowserAuthoriser', 'TwitterPinAuthoriser'],
function(Twitter, TwitterLogger, TwitterConfirmer, TapsModel, JQMListView, ListPresenter, JQMEditView,
         EditPresenter, FollowingPresenter, SettingsView, SettingsPage, AuthorisationPopup,
         TwitterBrowserAuthoriser, TwitterInAppBrowserAuthoriser, TwitterPinAuthoriser) {

    function BeerTap(isPhoneGap, twitterProxy)
    {
        var twitter = new Twitter(localStorage, twitterProxy);
        var twitterLogger = new TwitterLogger(twitter);

        var listModel = new TapsModel(twitter, twitterLogger);
        var listView = new JQMListView("listPage");
        var listPresenter = new ListPresenter("listPage", listModel, listView, $.mobile.changePage);

        var editView = new JQMEditView("editPage");
        var editModel = new TapsModel(new TwitterConfirmer(twitter, editView.page), twitterLogger);
        var editPresenter = new EditPresenter("editPage", editModel, editView);

        var settingsView = new SettingsView("settings", twitter.authorisedScreenName());
        var settingsPresenter = new SettingsPage("settings", twitter, settingsView);

        this.mainPage = new FollowingPresenter("main", twitter, listPresenter, editPresenter, settingsPresenter);

        $(document).ajaxStart(function() { $.mobile.loading( 'show' ); });
        $(document).ajaxStop(function() { $.mobile.loading( 'hide' ); });
        $(document).ajaxError(function() { alert("Error fetching data"); });
        $.mobile.defaultDialogTransition = 'none';
        $.mobile.defaultPageTransition = 'none';

        window.addEventListener("orientationchange", function() { hideAddressBar(); });
        hideAddressBar();

        var authorisationPopup = new AuthorisationPopup("main", twitter);

        if (isPhoneGap)
        {
            var browserAuthoriser = new TwitterInAppBrowserAuthoriser(authorisationPopup);
            settingsView.addAuthoriser("Authorise (Browser)", function() { browserAuthoriser.authorise(twitter); });

            var pinAuthoriser = new TwitterPinAuthoriser(authorisationPopup);
            settingsView.addAuthoriser("Authorise (PIN)", function() { pinAuthoriser.authorise(twitter); });
        }
        else
        {
            var browserAuthoriser = new TwitterBrowserAuthoriser(authorisationPopup);
            settingsView.addAuthoriser("Authorise", function() { browserAuthoriser.authorise(twitter); });
        }
    }

    function hideAddressBar()
    {
        if(document.documentElement.scrollHeight<window.outerHeight/window.devicePixelRatio)
            document.documentElement.style.height=(window.outerHeight/window.devicePixelRatio)+'px';
        setTimeout(function(){ window.scrollTo(0,1); }, 100);
    }

    return BeerTap;

});
