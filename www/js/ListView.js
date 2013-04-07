define(function() {

    function ListView(id)
    {
        this.page =
        $('<div class="listview">\
             <div class="header"><h1></h1></div>\
             <div class="content">\
               <ul></ul>\
             </div>\
             <div class="footer">\
               <div class="buttons">\
                 <button class="back">Back</button>\
                 <button class="refresh">Refresh</button>\
               </div>\
             </div>\
           </div>');

        var view = this;
        this.page.find(".refresh").click(function() { view._fireRefreshClicked(); });
        this._refreshClickedCallbacks = [];
    }

    ListView.prototype.clear = function()
    {
        var itemList = this.page.find("ul");
        itemList.empty();
        itemList.append('<li>Loading...</li>');
    };

    ListView.prototype.setHeading = function(heading)
    {
        this.page.find("h1").text(heading);
    };

    ListView.prototype.onRefreshClicked = function(callback)
    {
        this._refreshClickedCallbacks.push(callback);
    };

    ListView.prototype.refresh = function(items)
    {
        var itemList = this.page.find("ul");
        itemList.empty();
        items.forEach(function(item)
        {
            var date = item.date.toISOString().substring(0,10);
            itemList.append('<li>'+item.name+' <span class="date">'+date+'</span></li>');
        });
    };

    ListView.prototype._fireRefreshClicked = function()
    {
        this._refreshClickedCallbacks.forEach(function(callback) { callback(); });
    };

    return ListView;

});
