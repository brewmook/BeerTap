define(function() {

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
}

EditView.prototype.refresh = function(items, callbacks)
{
    var itemList = this.page.find("ul");
    itemList.empty();
    items.forEach(function(item) {
        var li = $("<li/>");
        li.append($("<a/>")
                  .append(item.name)
                  .attr("href", callbacks.changeHref)
                  .click(function() { callbacks.changeClicked(item); }));
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

return EditView;

});
