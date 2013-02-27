function formatDate(date)
{
    var fields = [date.getFullYear(), date.getMonth()+1, date.getDate()];
    return fields.join('/');
}

function View(container)
{
    this.container = container;
    this.itemRemoveClicked = function(item){};
    this.itemChangeClicked = function(item){};
}

View.prototype.refresh = function(items)
{
    this.container.empty();
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
    div.appendTo(this.container).collapsible();
};

View.prototype.remove = function(item)
{
    $("h4:contains('"+item.name+" (')").parent().remove();
};
