define(function() {

    function addLink(list, title, nameClick, removeClick)
    {
        var a = $("<a/>").append(title).click(function() { nameClick(title); });
        var remove = ($('<a>Remove</a>').click(function() { removeClick(title); }));
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
               <div class="buttons">\
                 <button class="follow">Follow</button>\
                 <button class="settings">Settings</button>\
               </div>\
             </div>\
           </div>');

        this.page.attr({id:id, 'data-role':'page'});
        this.page.find(".header").attr({'data-role':'header', 'data-position':'fixed'});
        this.page.find("ul").attr({"data-role":"listview",
                                   "data-split-icon":"delete",
                                   "data-split-theme":"c",
                                   "data-inset":"false"});
        this.page.find(".footer").attr({'data-role':'footer', 'data-position':'fixed'});
        this.page.find(".buttons").attr({"data-role":"controlgroup", "data-type":"horizontal", "data-mini":true});
        this.page.find(".follow")
            .button({icon:'plus', inline:true, theme:'a'});
        this.page.find(".settings")
            .button({icon:'gear', inline:true, theme:'a'});

        this._editableClickedCallback = function(title){};
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
            addLink(list, name, this._editableClickedCallback, this._removeClickedCallback);
        }, this);

        if (following.length > 0)
            list.append($('<li>Following</li>').attr('data-role', 'list-divider'));

        following.forEach(function(name) {
            addLink(list, name, this._followingClickedCallback, this._removeClickedCallback);
        }, this);

        if (jqmRrefresh) list.listview('refresh');
    };

    FollowingView.prototype.onFollowClicked = function(click)
    {
        this.page.find(".follow").click(click);
    };

    FollowingView.prototype.onSettingsClicked = function(click)
    {
        this.page.find(".settings").click(click);
    };

    FollowingView.prototype.onFollowingClicked = function(callback)
    {
        this._followingClickedCallback = callback;
    };

    FollowingView.prototype.onEditableClicked = function(callback)
    {
        this._editableClickedCallback = callback;
    };

    FollowingView.prototype.onRemoveClicked = function(callback)
    {
        this._removeClickedCallback = callback;
    };

    return FollowingView;

});
