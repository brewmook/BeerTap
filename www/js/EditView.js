function EditView(id, callbacks)
{
    this.page =
    $('<div class="editview">\
         <div class="header"><h1>@'+id+'</h1></div>\
         <div class="content">\
           <ul></ul>\
         </div>\
         <div class="footer">\
           <a class="refreshButton">Refresh</a>\
           <a class="addButton">Add new</a>\
         </div>\
       </div>');

    this.page.find(".refreshButton")
        .attr("href", callbacks.refreshHref)
        .click(callbacks.refreshClicked);
    this.page.find(".addButton")
        .attr("href", callbacks.addHref)
        .click(callbacks.addClicked);

    this.itemList = this.page.find("ul");
}

EditView.prototype.refresh = function(items, callbacks)
{
    var view = this;
    this.itemList.empty();
    items.forEach(function(item){ view.add(item, callbacks); });
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
