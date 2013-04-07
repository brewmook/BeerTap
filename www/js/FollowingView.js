define(function() {

    function addLink(list, title, nameClick, removeClick)
    {
        var a = $("<a/>").append(title).click(function() { nameClick(title); });
        var remove = ($('<a>Remove</a>').click(function() { removeClick(title); }));
        list.append($("<li/>").append(a).append(remove));
    }

    function FollowingView(id)
    {
        this.page = $("#"+id);
        this.page.find(".content").append(
            $("<ul/>").attr({"data-role":"listview",
                             "data-split-icon":"delete",
                             "data-split-theme":"c",
                             "data-inset":"false"}));
        this.page.find(".buttons").append($('<a href="#" class="follow">Follow</a>').buttonMarkup({icon:'plus', inline:true, theme:'a'}));
        this.page.find(".buttons").append($('<a href="#" class="settings">Settings</a>').buttonMarkup({icon:'gear', inline:true, theme:'a'}));
        this.page.trigger("create");

        this._editableClickedCallback = function(title){};
        this._followingClickedCallback = function(title){};
        this._removeClickedCallback = function(title){};
    }

    FollowingView.prototype.refresh = function(editable, following)
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

        list.listview('refresh');
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
