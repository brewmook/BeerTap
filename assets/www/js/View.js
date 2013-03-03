function formatDate(date)
{
    var fields = [date.getFullYear(), date.getMonth()+1, date.getDate()];
    return fields.join('/');
}

function View(page)
{
    this.page = page;
    this.itemList = page.find(".itemList");
    this.addClicked = function(){};
    this.itemRemoveClicked = function(item){};
    this.itemChangeClicked = function(item){};

    this._applyJQueryMobile();
}

View.prototype.refresh = function(items)
{
    this.itemList.empty();
    items.forEach(this.add, this);
};

View.prototype.add = function(item)
{
    var text = item.name + " (" + formatDate(item.date) + ")";
    var div = $("<div/>").attr('data-role','collapsible').trigger('create');
    $("<h4/>").append(text).appendTo(div);
    var buttons = $("<div/>").appendTo(div);
    var view = this;
    $("<a/>").attr('data-role','button')
             .attr('href','#')
             .append('Remove')
             .appendTo(buttons)
             .click(function() { view.itemRemoveClicked(item); })
             .buttonMarkup({inline:true,icon:'delete'});
    $("<a/>").attr('data-role','button')
             .attr('href','#')
             .append('Change')
             .appendTo(buttons)
             .click(function() { view.itemChangeClicked(item); })
             .buttonMarkup({inline:true,icon:'edit'});
    div.appendTo(this.itemList).collapsible();
};

View.prototype.remove = function(item)
{
    $("h4:contains('"+item.name+" (')").parent().remove();
};

View.prototype._applyJQueryMobile = function()
{
    var view = this;
    $("#addButton").click(function() { view.addClicked(); })
                   .buttonMarkup({icon:'delete'});
};
