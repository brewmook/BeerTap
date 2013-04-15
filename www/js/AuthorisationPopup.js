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

    function AuthorisationPopup(parentPageId)
    {
        this.parentPageHref = "#"+parentPageId;
        this.popup =
        $('<div data-role="popup" data-theme="d" data-overlay-theme="b" class="ui-content" style="min-width:250px;max-width:250px;">\
             <h3></h3>\
             <p></p>\
             <a href="#" data-rel="back" data-role="button" data-icon="check">Ok</a>\
           </div>')
            .appendTo($(this.parentPageHref)).popup().trigger('create');
    }

    AuthorisationPopup.prototype.show = function()
    {
        $.mobile.changePage(this.parentPageHref);
        show(this.popup, "Verifying", "Please wait...", false);
    };

    AuthorisationPopup.prototype.success = function(userId, screenName)
    {
        show(this.popup, "Success", "Sending tweets as " + screenName, true);
        console.log("Twitter authorisation successful.");
    };

    AuthorisationPopup.prototype.failure = function(data)
    {
        show(this.popup, "Failed", "Twitter authorisation failed", true);
        console.log("Twitter authorisation failed.");
        console.log(data);
    };

    return AuthorisationPopup;

});
