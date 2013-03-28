define(function() {

    function EditView(id, callbacks)
    {
        this.page =
        $('<div class="editview">\
             <div class="header"><h1></h1></div>\
             <div class="content">\
               <ul></ul>\
             </div>\
             <div class="footer">\
               <a class="refreshButton">Refresh</a>\
               <a class="addButton">Add new</a>\
             </div>\
           </div>');

        this._changeClickedHref = "#";
        this._changeClickedCallback = function(item){};
    }

    EditView.prototype.clear = function()
    {
        var itemList = this.page.find("ul");
        itemList.empty();
        itemList.append('<li>Loading...</li>');
    };

    EditView.prototype.setHeading = function(heading)
    {
        this.page.find("h1").text(heading);
    };

    EditView.prototype.refresh = function(items, callbacks)
    {
        var itemList = this.page.find("ul");
        var view = this;
        itemList.empty();
        items.forEach(function(item) {
            var li = $("<li/>");
            li.append($("<a/>")
                      .append(item.name)
                      .attr("href", view._changeClickedHref)
                      .click(function() { view._changeClickedCallback(item); }));
            li.append($("<a>Remove</a>")
                      .attr("href", callbacks.removeHref)
                      .click(function() { callbacks.removeClicked(item); }));
            itemList.append(li);
        });
    };

    EditView.prototype.remove = function(item)
    {
        var itemList = this.page.find("ul");
        itemList.find("a").filter(function(i){return $(this).text() == item.name;}).parents("li").remove();
    };

    EditView.prototype.onAddClicked = function(href, callback)
    {
        this.page.find(".addButton").attr("href", href).click(callback);
    };

    EditView.prototype.onChangeClicked = function(href, callback)
    {
        this._changeClickedHref = href;
        this._changeClickedCallback = callback;
    };

    EditView.prototype.onRefreshClicked = function(href, callback)
    {
        this.page.find(".refreshButton").attr("href", href).click(callback);
    };

    return EditView;

});
