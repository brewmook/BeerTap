function formatDate(date)
{
    var fields = [date.getFullYear(), date.getMonth()+1, date.getDate()];
    return fields.join('/');
}

function EditView(id, inputDialog)
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
    var addButton = $("<a/>")
        .attr({href:"#"+inputDialog.id,"data-role":"button"})
        .append("Add new")
        .appendTo(footer)
        .click(function() { view.addClicked(); })
        .buttonMarkup({icon:'plus', inline:true, mini:false});

    page.appendTo("body");

    this.page = page;
    this.header = h1;
    this.itemList = itemList;
    this.inputDialogId = inputDialog.id;

    this.addClicked = function(){};
    this.itemRemoveClicked = function(item){};
    this.itemChangeClicked = function(item){};
}

EditView.prototype.refresh = function(items)
{
    this.itemList.empty();
    items.forEach(this.add, this);
    this.itemList.listview('refresh');
};

EditView.prototype.setHeader = function(text)
{
    this.header.html("@" + text);
};

EditView.prototype.add = function(item)
{
    var view = this;
    var li = $("<li/>");
    $("<a/>")
      .attr({href:"#"+this.inputDialogId})
      .append(item.name)
      .appendTo(li)
      .click(function() { view.itemChangeClicked(item); });
    $("<a/>")
      .attr({href:"#"})
      .append('Remove')
      .appendTo(li)
      .click(function() { view.itemRemoveClicked(item); });
    li.appendTo(this.itemList);
};

EditView.prototype.remove = function(item)
{
    this.itemList.find("a").filter(function(i){return $(this).text() == item.name;}).parents("li").remove();
};
