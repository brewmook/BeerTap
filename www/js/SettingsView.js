define(function() {

    function SettingsView(id, twitterScreenName)
    {
        this.page =
        $('<div id="'+id+'" data-role="page">\
             <div data-role="header"><h1>Settings</h1></div>\
             <div data-role="content">\
               <div data-role="collapsible-set" data-collapsed-icon="arrow-r" data-expanded-icon="arrow-d" data-inset="false" data-theme="c" data-content-theme="d">\
                 <div data-role="collapsible" id="twitter-settings">\
                   <h4>Twitter</h4>\
                   <div>\
                     <p>Screen Name: <span class="twitterScreenName">'+twitterScreenName+'</span></p>\
                     <div class="authorisers" />\
                   </div>\
                 </div>\
               </div>\
             </div>\
             <div class="footer">\
               <div class="buttons">\
                 <button class="back">Back</button>\
               </div>\
             </div>\
           </div>');

        this.page.find(".footer").attr({"data-role":"footer", "data-position":"fixed"});
        this.page.find(".buttons").attr({"data-role":"controlgroup", "data-type":"horizontal", "data-mini":true});
        this.page.find(".back").button({icon:'back', theme:'a'}).click(function(){history.go(-1);});

        this.page.appendTo("body");

        this.authorisers = this.page.find(".authorisers");
    }

    SettingsView.prototype.setTwitterScreenName = function(screenName)
    {
        this.page.find(".twitterScreenName").text(screenName || "");
    };

    SettingsView.prototype.addAuthoriser = function(label, click)
    {
        var button = $('<a data-role="button" data-icon="plus">'+label+'</a>')
                     .appendTo(this.page.find(".authorisers"))
                     .click(click);
    };

    return SettingsView;

});
