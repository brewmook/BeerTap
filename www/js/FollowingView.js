define(['AboutView'],
function(AboutView) {

    function addLink(list, title, nameClick, removeClick)
    {
        var a = $("<a/>").append(title).click(function() { nameClick(title); });
        var remove = ($('<a>Remove</a>').click(function() { removeClick(title); }));
        list.append($("<li/>").append(a).append(remove));
    }

    function FollowingView(id)
    {
        this.page = $('<div id="'+id+'" data-role="page">\
    <div data-role="header" data-position="fixed"><h1>BeerTap</h1></div>\
    <div data-role="content">\
        <ul data-role="listview" data-split-icon="delete" data-split-theme="c" data-inset="false"></ul>\
    </div>\
    <div data-role="footer" data-position="fixed">\
        <div data-role="controlgroup" data-type="horizontal" data-mini="true" style="float: right">\
            <button class="about" data-icon="info" data-inline="true" data-theme="a">About</button>\
        </div>\
        <div data-role="controlgroup" data-type="horizontal" data-mini="true">\
            <button class="follow" data-icon="plus" data-inline="true" data-theme="a">Follow</button>\
            <button class="settings" data-icon="gear" data-inline="true" data-theme="a">Settings</button>\
        </div>\
    </div>\
</div>').appendTo('body');

        this._editableClickedCallback = function(title){};
        this._followingClickedCallback = function(title){};
        this._removeClickedCallback = function(title){};

        var about = new AboutView(this.page);
        this.page.find(".about").click(function() { about.show(); });
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
