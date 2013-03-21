define(function() {

function ListView(id, refreshCallback)
{
    this.page =
    $('<div class="listview">\
         <div class="header"><h1>@'+id+'</h1></div>\
         <div class="content">\
           <ul></ul>\
         </div>\
         <div class="footer"><a class="refresh" href="#">Refresh</a></div>\
       </div>');

    this.page.find(".refresh").click(refreshCallback);
}

ListView.prototype.refresh = function(items)
{
    var itemList = this.page.find("ul");
    itemList.empty();
    items.forEach(function(item)
    {
        var date = item.date.toISOString().substring(0,10);
        itemList.append('<li>'+item.name+' <span>'+date+'</span></li>');
    });
};

return ListView;

});
