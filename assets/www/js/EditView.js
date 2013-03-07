function formatDate(date)
{
    var fields = [date.getFullYear(), date.getMonth()+1, date.getDate()];
    return fields.join('/');
}

function EditView(id, inputDialog)
{
    var view = this;
    var page = $("<div/>").attr({"data-role":"page",id:id});
    var header = $("<div/>").attr("data-role","header").appendTo(page);
    var h1 = $("<h1/>").append("@"+id).appendTo(header);
    var content = $("<div/>").attr("data-role","content").appendTo(page);
    var addButton = $("<a/>")
        .attr({href:"#"+inputDialog.id,"data-role":"button"})
        .append("Add new")
        .appendTo(content)
        .click(function() { view.addClicked(); })
        .buttonMarkup({icon:'plus', inline:true});
    var itemList = $("<div/>")
        .attr({"data-role":"collapsible-set",
               "data-collapsed-icon":"arrow-r",
               "data-expanded-icon": "arrow-d",
               "data-inset":"false"})
        .appendTo(content);

    page.appendTo("body").trigger('create');

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
};

EditView.prototype.setHeader = function(text)
{
    this.header.html("@" + text);
};

EditView.prototype.add = function(item)
{
    var text = item.name + " (" + formatDate(item.date) + ")";
    var div = $("<div/>").attr('data-role','collapsible').trigger('create');
    $("<h4/>").append(text).appendTo(div);
    var buttons = $("<div/>").appendTo(div);
    var view = this;
    $("<a/>")
      .attr({href:"#","data-role":"button"})
      .append('Remove')
      .appendTo(buttons)
      .click(function() { view.itemRemoveClicked(item); })
      .buttonMarkup({inline:true,icon:'delete'});
    $("<a/>")
      .attr({href:"#"+this.inputDialogId,"data-role":"button"})
      .append('Change')
      .appendTo(buttons)
      .click(function() { view.itemChangeClicked(item); })
      .buttonMarkup({inline:true,icon:'edit'});
    div.appendTo(this.itemList).collapsible();
};

EditView.prototype.remove = function(item)
{
    this.itemList.find("h4:contains('"+item.name+" (')").parent().remove();
};
