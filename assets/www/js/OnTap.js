function OnTap()
{
    this.pages = [];
}

OnTap.prototype.addPage = function(page)
{
    this.pages.push(page);
    var li = $("<li/>").appendTo("#pages");
    var a = $("<a/>").attr("href","#"+page.id).append(page.id).appendTo(li);
    $("#pages").listview('refresh');
};
