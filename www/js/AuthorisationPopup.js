define(function() {

    function show(popup, heading, text, okEnabled)
    {
        popup.find("h3").text(heading);
        popup.find("p").text(text);
        if (okEnabled)
            popup.find("[data-icon=check]").removeClass('ui-disabled');
        else
            popup.find("[data-icon=check]").addClass('ui-disabled');
        popup.popup("open");
    }

    function AuthorisationPopup(parentPageId, twitter)
    {
        this.parentPageHref = "#"+parentPageId;
        this.popup =
        $('<div data-role="popup" data-theme="d" data-overlay-theme="b" class="ui-content" style="min-width:250px;max-width:250px;">\
             <h3></h3>\
             <p></p>\
             <a href="#" data-rel="back" data-role="button" data-icon="check">Ok</a>\
           </div>')
            .appendTo($(this.parentPageHref)).popup().trigger('create');
        this.twitter = twitter;
        var popup = this.popup;
        twitter.onAuthorisationChange(function(userId, screenName) { success(popup, screenName); });
    }

    AuthorisationPopup.prototype.verify = function(verifier, accessToken)
    {
        $.mobile.changePage(this.parentPageHref);
        show(this.popup, "Verifying", "Please wait...", false);
        var popup = this.popup;
        this.twitter.verifyAuthorisation(verifier, accessToken, function(data) { failure(popup, data); });
    };

    function success(popup, screenName)
    {
        if (popup.is(":visible"))
        {
            show(popup, "Success", "Sending tweets as " + screenName, true);
            console.log("Twitter authorisation successful.");
        }
    }

    function failure(popup, data)
    {
        show(popup, "Failed", "Twitter authorisation failed", true);
        console.log("Twitter authorisation failed.");
        console.log(data);
    }

    return AuthorisationPopup;

});
