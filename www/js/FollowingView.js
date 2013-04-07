define(function() {

    function addLink(list, title, href, nameClick, removeClick)
    {
        var a = $("<a/>").attr("href",href).append(title).click(function() { nameClick(title); });
        var remove = ($('<a href="#">Remove</a>').click(function() { removeClick(title); }));
        list.append($("<li/>").append(a).append(remove));
    }

    function FollowingView(id)
    {
        this.page =
        $('<div>\
             <div class="header"><h1>BeerTap</h1></div>\
             <div data-role="content">\
               <ul></ul>\
             </div>\
             <div class="footer">\
               <a class="follow">Follow</a>\
               <a class="settings">Settings</a>\
             </div>\
           </div>');

        this.page.attr({id:id, 'data-role':'page'});
        this.page.find(".header").attr({'data-role':'header', 'data-position':'fixed'});
        this.page.find("ul").attr({"data-role":"listview",
                                   "data-split-icon":"delete",
                                   "data-split-theme":"c",
                                   "data-inset":"false"});
        this.page.find(".footer").attr({'data-role':'footer', 'data-position':'fixed'});
        this.page.find(".follow")
            .attr("data-role","button")
            .buttonMarkup({icon:'plus', inline:true, mini:false});
        this.page.find(".settings")
            .attr("data-role","button")
            .buttonMarkup({icon:'gear', inline:true, mini:false});

        this._editableClickedHref = "#";
        this._editableClickedCallback = function(title){};
        this._followingClickedHref = "#";
        this._followingClickedCallback = function(title){};
        this._removeClickedCallback = function(title){};

        this.page.appendTo("body");
    }

    FollowingView.prototype.refresh = function(editable, following, jqmRrefresh)
    {
        var list = this.page.find("ul");
        list.empty();

        if (editable.length > 0)
            list.append($('<li>Editable</li>').attr('data-role', 'list-divider'));

        editable.forEach(function(name) {
            addLink(list, name, this._editableClickedHref, this._editableClickedCallback, this._removeClickedCallback);
        }, this);

        if (following.length > 0)
            list.append($('<li>Following</li>').attr('data-role', 'list-divider'));

        following.forEach(function(name) {
            addLink(list, name, this._followingClickedHref, this._followingClickedCallback, this._removeClickedCallback);
        }, this);

        if (jqmRrefresh) list.listview('refresh');
    };

    FollowingView.prototype.onFollowClicked = function(click)
    {
        this.page.find(".follow").click(click);
    };

    FollowingView.prototype.onSettingsClicked = function(href, click)
    {
        this.page.find(".settings").attr("href",href).click(click);
    };

    FollowingView.prototype.onFollowingClicked = function(href, callback)
    {
        this._followingClickedHref = href;
        this._followingClickedCallback = callback;
    };

    FollowingView.prototype.onEditableClicked = function(href, callback)
    {
        this._editableClickedHref = href;
        this._editableClickedCallback = callback;
    };

    FollowingView.prototype.onRemoveClicked = function(callback)
    {
        this._removeClickedCallback = callback;
    };

    return FollowingView;

});
