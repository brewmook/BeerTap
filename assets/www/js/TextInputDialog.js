function TextInputDialog(id, title, prompt)
{
    var dialog = $("<div/>").attr({"data-role":"dialog", id:id});
    var header = $("<div/>").attr("data-role","header").appendTo(dialog);
    var h1 = $("<h1/>").append(title).appendTo(header);
    var content = $("<div/>").attr("data-role","content").appendTo(dialog);
    var label = $("<label/>").attr("for","input").append(prompt).appendTo(content);
    var input = $("<input/>").attr({type:"text",name:"name"}).appendTo(content);
    var submit = $("<a/>")
        .attr({href:"#","data-role":"button","data-rel":"back"})
        .append("Ok")
        .appendTo(content)
        .buttonMarkup({inline:true,icon:'check'});
    var cancel = $("<a/>")
        .attr({href:"#","data-role":"button","data-rel":"back"})
        .append("Cancel")
        .appendTo(content)
        .buttonMarkup({inline:true,icon:'delete'});

    dialog.appendTo("body").trigger('create');
  
    this.id = id;
    this.dialog = dialog;
    this.input = input;
    this.submit = submit;
}

TextInputDialog.prototype.show = function(text, callback)
{
    var input = this.input;
    var dialog = this.dialog;
    input.val(text);
    this.submit.unbind('click').click(function()
    {
        callback(input.val());
    });
};
