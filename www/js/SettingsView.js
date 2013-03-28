define(function(){

    function SettingsView(id)
    {
        this.page =
        $('<div id="'+id+'" data-role="page">\
             <div data-role="header"><h1>Settings</h1></div>\
             <div data-role="content">\
               <div data-role="collapsible-set" data-collapsed-icon="arrow-r" data-expanded-icon="arrow-d" data-inset="false">\
                 <div data-role="collapsible" id="twitter-settings">\
                   <h4>Twitter</h4>\
                   <div>\
                     <p>Screen Name: <span class="twitterScreenName"></span></p>\
                     <div class="authorisers" />\
                   </div>\
                 </div>\
               </div>\
             </div>\
           </div>');

        this.page.appendTo("body");

        this.authorisers = this.page.find(".authorisers");
    }

    SettingsView.prototype.setTwitterScreenName = function(screenName)
    {
        this.page.find(".twitterScreenName").text(screenName || "");
    };

    SettingsView.prototype.addAuthoriser = function(label, href, click)
    {
        var button = $('<a href="'+href+'" data-role="button" data-icon="plus">Authorise ('+label+')</a>')
                     .appendTo(this.page.find(".authorisers"))
                     .click(click);
    };

    return SettingsView;

});
