function ListView(id, refreshCallback)
{
    var view = this;
    var page = $("<div/>").attr({"data-role":"page", id:id});
    var header = $("<div/>").attr("data-role","header").appendTo(page);
    var h1 = $("<h1/>").append("@"+id).appendTo(header);
    var content = $("<div/>").attr("data-role","content").appendTo(page);
    var refreshButton = $("<a/>")
        .attr({href:"#","data-role":"button"})
        .append("Refresh")
        .appendTo(content)
        .click(refreshCallback)
        .buttonMarkup({icon:'refresh', inline:true});
    var itemList = $("<ul/>")
        .attr({"data-role":"listview"})
        .appendTo(content);

    page.appendTo("body");

    this.page = page;
    this.itemList = itemList;
}

ListView.prototype.refresh = function(items)
{
    this.itemList.empty();
    items.forEach(function(item)
    {
        var date = [item.date.getFullYear(), item.date.getMonth()+1, item.date.getDate()].join('/');
        var text = item.name + " (" + date + ")";
        var li = $("<li/>").append(text).appendTo(this.itemList);
        this.itemList.listview('refresh');
    }, this);
};
