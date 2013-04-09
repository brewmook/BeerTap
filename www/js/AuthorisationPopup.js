define(function() {

    function AuthorisationPopup(parentPage)
    {
        this.popup =
        $('<div data-role="popup" id="" data-theme="d" data-overlay-theme="b" class="ui-content" style="min-width:250px;max-width:250px;">\
             <h3></h3>\
             <p></p>\
             <a href="#" data-rel="back" data-role="button" data-icon="check">Ok</a>\
           </div>')
           .appendTo(parentPage);
    }
    
    AuthorisationPopup.prototype.show = function(heading, text, okEnabled)
    {
        this.popup.find("h3").text(heading);
        this.popup.find("p").text(text);
        if (okEnabled)
            this.popup.find("[data-icon=check]").removeClass('ui-disabled');
        else
            this.popup.find("[data-icon=check]").addClass('ui-disabled');
        this.popup.popup("open");
    };
    
    return AuthorisationPopup;

});
