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

    this.page.attr({id:id, "data-role":"page"});
    this.page.find(".header").attr({"data-role":"header", "data-position":"fixed"});
    this.page.find(".content").attr("data-role","content");
    this.page.find(".footer").attr({"data-role":"footer", "data-position":"fixed"});
    this.page.find(".refreshButton")
        .attr("data-role","button")
        .buttonMarkup({icon:'refresh', inline:true, mini:false});
    this.page.find(".addButton")
        .attr("data-role","button")
        .buttonMarkup({icon:'plus', inline:true, mini:false});

    this.itemList = this.page.find("ul");
    this.itemList.attr({"data-role":"listview",
                        "data-split-icon":"delete",
                        "data-split-theme":"e",
                        "data-inset":"false"});

    this.page.appendTo("body");
}

EditView.prototype.refresh = function(items, callbacks)
{
    var view = this;
    this.itemList.empty();
    items.forEach(function(item){ view.add(item, callbacks); });
    this.itemList.listview('refresh');
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
