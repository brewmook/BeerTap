define(function() {

function addLink(page, selector, title, href, refresh)
{
    var list = page.find("ul");
    var after = list.find(selector);
    var li = $("<li/>").insertAfter(after);
    var a = $("<a/>").attr("href",href).append(title).appendTo(li);
    after.show();
    if (refresh) list.listview('refresh');
}

function MainView(id)
{
    this.page =
    $('<div>\
         <div class="header"><h1>BeerTap</h1></div>\
         <div data-role="content">\
           <ul>\
             <li class="editableDivider">Editable</li>\
             <li class="followingDivider">Following</li>\
           </ul>\
         </div>\
         <div class="footer">\
           <a class="follow" href="#">Follow</a>\
           <a class="settings" href="#">Settings</a>\
         </div>\
       </div>');

    this.page.attr({id:id, 'data-role':'page'});
    this.page.find(".header").attr({'data-role':'header', 'data-position':'fixed'})
    this.page.find("ul").attr({"data-role":"listview",
                               "data-inset":"false"});
    this.page.find("li").attr('data-role', 'list-divider').hide();
    this.page.find(".footer").attr({'data-role':'footer', 'data-position':'fixed'});
    this.page.find(".follow")
        .attr("data-role","button")
        .buttonMarkup({icon:'plus', inline:true, mini:false});
    this.page.find(".settings")
        .attr("data-role","button")
        .buttonMarkup({icon:'gear', inline:true, mini:false});

    this.page.appendTo("body");
}

MainView.prototype.addEditable = function(title, href, refresh)
{
    addLink(this.page, ".editableDivider", title, href, refresh);
};

MainView.prototype.addFollowing = function(title, href, refresh)
{
    addLink(this.page, ".followingDivider", title, href, refresh);
};

MainView.prototype.setFollowButton = function(href, click)
{
    this.page.find(".follow").attr("href",href).click(click);
};

MainView.prototype.setSettingsButton = function(href, click)
{
    this.page.find(".settings").attr("href",href).click(click);
};

return MainView;

});
