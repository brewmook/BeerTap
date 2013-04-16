define(['Twitter', 'TwitterConfirmer', 'TapsModel', 'JQMListView', 'ListPresenter', 'JQMEditView',
        'EditPresenter', 'FollowingPresenter', 'SettingsView', 'SettingsPage', 'AuthorisationPopup',
        'TwitterBrowserAuthoriser', 'TwitterInAppBrowserAuthoriser', 'TwitterPinAuthoriser', 'AuthorisationVerifier'],
function(Twitter, TwitterConfirmer, TapsModel, JQMListView, ListPresenter, JQMEditView,
         EditPresenter, FollowingPresenter, SettingsView, SettingsPage, AuthorisationPopup,
         TwitterBrowserAuthoriser, TwitterInAppBrowserAuthoriser, TwitterPinAuthoriser, AuthorisationVerifier) {

    function BeerTap(isPhoneGap, twitterProxy)
    {
        var twitter = new Twitter(localStorage, twitterProxy);

        var listModel = new TapsModel(twitter);
        var listView = new JQMListView("listPage");
        var listPresenter = new ListPresenter("listPage", listModel, listView, $.mobile.changePage);

        var editView = new JQMEditView("editPage");
        var editModel = new TapsModel(new TwitterConfirmer(twitter, editView.page));
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

        var authorisationPopup = new AuthorisationPopup("main");
        var verifier = new AuthorisationVerifier(twitter, authorisationPopup);

        if (isPhoneGap)
        {
            var browserAuthoriser = new TwitterInAppBrowserAuthoriser(verifier);
            settingsView.addAuthoriser("Authorise (Browser)", function() { browserAuthoriser.authorise(twitter); });

            var pinAuthoriser = new TwitterPinAuthoriser(verifier);
            settingsView.addAuthoriser("Authorise (PIN)", function() { pinAuthoriser.authorise(twitter); });
        }
        else
        {
            var browserAuthoriser = new TwitterBrowserAuthoriser(twitter, verifier);
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
