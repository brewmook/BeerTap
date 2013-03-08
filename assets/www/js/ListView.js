function ListView(id, refreshCallback)
{
    var view = this;
    var page = $("<div/>").attr({"data-role":"page", id:id});
    var header = $("<div/>")
        .attr({"data-role":"header",
               "data-position":"fixed"})
        .appendTo(page);
    var h1 = $("<h1/>").append("@"+id).appendTo(header);
    var content = $("<div/>").attr("data-role","content").appendTo(page);
    var itemList = $("<ul/>")
        .attr({"data-role":"listview"})
        .appendTo(content);
    var footer = $("<div/>")
        .attr({"data-role":"footer",
               "data-position":"fixed"})
        .appendTo(page);
    var refreshButton = $("<a/>")
        .attr({href:"#","data-role":"button"})
        .append("Refresh")
        .appendTo(footer)
        .click(refreshCallback)
        .buttonMarkup({icon:'refresh', inline:true, mini:false});

    page.appendTo("body");

    this.page = page;
    this.itemList = itemList;
}

ListView.prototype.refresh = function(items)
{
    this.itemList.empty();
    items.forEach(function(item)
    {
        var date = item.date.toISOString().substring(0,10);
        var li = $("<li/>").append(item.name).appendTo(this.itemList).css("padding-right","5em");
        $("<span/>").attr("class","ui-li-count").append(date).appendTo(li);
    }, this);
    this.itemList.listview('refresh');
};
