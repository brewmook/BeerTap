function EditView(id, callbacks)
{
    var view = this;
    var page = $("<div/>").attr({"data-role":"page",id:id});
    var header = $("<div/>")
        .attr({"data-role":"header",
               "data-position":"fixed"})
        .appendTo(page);
    var h1 = $("<h1/>").append("@"+id).appendTo(header);
    var content = $("<div/>").attr("data-role","content").appendTo(page);
    var itemList = $("<ul/>")
        .attr({"data-role":"listview",
               "data-split-icon":"delete",
               "data-split-theme":"e",
               "data-inset":"false"})
        .appendTo(content);
    var footer = $("<div/>")
        .attr({"data-role":"footer",
               "data-position":"fixed"})
        .appendTo(page);
    var refreshButton = $("<a/>")
        .attr({href:callbacks.refreshHref,"data-role":"button"})
        .append("Refresh")
        .appendTo(footer)
        .click(callbacks.refreshClicked)
        .buttonMarkup({icon:'refresh', inline:true, mini:false});
    var addButton = $("<a/>")
        .attr({href:callbacks.addHref,"data-role":"button"})
        .append("Add new")
        .appendTo(footer)
        .click(callbacks.addClicked)
        .buttonMarkup({icon:'plus', inline:true, mini:false});

    page.appendTo("body");

    this.page = page;
    this.header = h1;
    this.itemList = itemList;
}

EditView.prototype.refresh = function(items, callbacks)
{
    var view = this;
    this.itemList.empty();
    items.forEach(function(item){ view.add(item, callbacks); });
    this.itemList.listview('refresh');
};

EditView.prototype.setHeader = function(text)
{
    this.header.html("@" + text);
};

EditView.prototype.add = function(item, callbacks)
{
    var li = $("<li/>");
    $("<a/>")
      .attr({href:callbacks.changeHref})
      .append(item.name)
      .appendTo(li)
      .click(function() { callbacks.changeClicked(item); });
    $("<a/>")
      .attr({href:callbacks.removeHref})
      .append('Remove')
      .appendTo(li)
      .click(function() { callbacks.removeClicked(item); });
    li.appendTo(this.itemList);
};

EditView.prototype.remove = function(item)
{
    this.itemList.find("a").filter(function(i){return $(this).text() == item.name;}).parents("li").remove();
};
