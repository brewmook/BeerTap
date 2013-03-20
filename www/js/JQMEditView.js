function JQMEditView(id, callbacks)
{
    this.view = new EditView(id, callbacks);

    this.page = this.view.page;
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

    this.itemList = this.view.itemList;
    this.itemList.attr({"data-role":"listview",
                        "data-split-icon":"delete",
                        "data-split-theme":"e",
                        "data-inset":"false"});

    this.page.appendTo("body");
}

JQMEditView.prototype.refresh = function(items, callbacks)
{
    this.view.refresh(items, callbacks);
    this.itemList.listview('refresh');
};

JQMEditView.prototype.remove = function(item)
{
    this.view.remove(item);
};
