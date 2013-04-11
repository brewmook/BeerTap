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
        this._showDates = true;
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
            var date = '';
            if (this._showDates)
            {
                var isodate = item.date.toISOString().substring(0,10);
                date = ' <span class="date">'+date+'</span>';
            }
            itemList.append('<li>'+item.name+date+'</li>');
        });
    };

    ListView.prototype._fireRefreshClicked = function()
    {
        this._refreshClickedCallbacks.forEach(function(callback) { callback(); });
    };

    ListView.prototype.hideRefreshButton = function()
    {
        this.page.find(".refresh").hide();
    };

    ListView.prototype.hideDates = function()
    {
        this.page.find(".date").hide();
        this._showDates = false;
    };

    return ListView;

});
