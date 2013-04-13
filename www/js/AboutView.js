define(['Version'],
function(Version) {

    function AboutView(parentPage)
    {
        var revision = Version.revision.substring(0,10);
        var date = new Date(Version.timestamp);
        date = date.toLocaleString();

        this.popup =
        $('<div data-role="popup" data-theme="d" data-overlay-theme="b" class="ui-content" style="min-width:250px;max-width:250px;">\
             <h3>BeerTap '+Version.string+'</h3>\
             <p>Timestamp: '+date+'</p>\
             <p>Revision: '+revision+'</p>\
             <a href="#" data-rel="back" data-role="button" data-icon="check">Ok</a>\
           </div>')
           .appendTo(parentPage);
    }

    AboutView.prototype.show = function()
    {
        this.popup.popup("open");
    };

    return AboutView;

});
