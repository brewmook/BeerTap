define(['Twitter', 'TwitterLogger', 'TwitterLoader', 'TwitterConfirmer', 'TapsModel', 'JQMListView', 'ListPresenter', 'JQMEditView',
        'EditPresenter', 'FollowingPresenter', 'SettingsView', 'SettingsPage', 'AuthorisationPopup',
        'TwitterBrowserAuthoriser', 'TwitterInAppBrowserAuthoriser', 'TwitterPinAuthoriser', 'Utility'],
function(Twitter, TwitterLogger, TwitterLoader, TwitterConfirmer, TapsModel, JQMListView, ListPresenter, JQMEditView,
         EditPresenter, FollowingPresenter, SettingsView, SettingsPage, AuthorisationPopup,
         TwitterBrowserAuthoriser, TwitterInAppBrowserAuthoriser, TwitterPinAuthoriser, Utility) {

    function BeerTap(isPhoneGap)
    {
        var twitterProxy = undefined;
        if (!isPhoneGap)
        {
            var twitterProxyUrl = Utility.changeRelativePath(window.location.href, 'twitter');
            twitterProxy = Utility.rewriteProxy(twitterProxyUrl);
        }

        var twitter = new Twitter(localStorage, twitterProxy);
        var twitterLoader = new TwitterLoader(twitter);

        var listModel = new TapsModel(twitterLoader);
        var listView = new JQMListView("listPage");
        var listPresenter = new ListPresenter("listPage", listModel, listView, $.mobile.changePage);

        var editView = new JQMEditView("editPage");
        var twitterConfirmer = new TwitterConfirmer(twitter, editView.page);
        var editModel = new TapsModel(twitterLoader, new TwitterLogger(twitterConfirmer));
        var editPresenter = new EditPresenter("editPage", editModel, editView);

        var settingsView = new SettingsView("settings", twitter.screenName());
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
