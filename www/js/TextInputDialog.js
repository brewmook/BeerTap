define(function() {

function TextInputDialog(id)
{
    var dialog = $("<div/>").attr({"data-role":"dialog", id:id});
    var header = $("<div/>").attr("data-role","header").appendTo(dialog);
    var h1 = $("<h1/>").appendTo(header);
    var content = $("<div/>").attr("data-role","content").appendTo(dialog);
    var label = $("<label/>").attr("for",id+"Input").appendTo(content);
    var input = $("<input/>").attr({type:"text",id:id+"Input"}).appendTo(content);
    var buttongroup = $("<div/>").attr("class","ui-grid-a").appendTo(content);
    var left = $("<div/>").attr("class","ui-block-a").appendTo(buttongroup);
    var right = $("<div/>").attr("class","ui-block-b").appendTo(buttongroup);
    var cancel = $("<a/>")
        .attr({href:"#","data-role":"button","data-rel":"back"})
        .append("Cancel")
        .appendTo(left)
        .buttonMarkup({icon:'delete'});
    var submit = $("<a/>")
        .attr({href:"#","data-role":"button","data-rel":"back","data-theme":"e"})
        .append("Ok")
        .appendTo(right)
        .buttonMarkup({icon:'check'});

    dialog.appendTo("body").trigger('create');
  
    this.id = id;
    this.title = h1;
    this.label = label;
    this.dialog = dialog;
    this.input = input;
    this.submit = submit;
}

TextInputDialog.prototype.show = function(title, prompt, text, callback)
{
    var input = this.input;
    var dialog = this.dialog;
    this.title.html(title);
    this.label.html(prompt);
    input.val(text);
    this.submit.unbind('click').click(function()
    {
        callback(input.val());
    });
};

return TextInputDialog;

});
