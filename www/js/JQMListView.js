function JQMListView(id, refreshCallback)
{
    this.view = new ListView(id, refreshCallback);

    this.page = this.view.page;
    this.page.attr({id:id, "data-role":"page"});
    this.page.find(".header").attr({"data-role":"header", "data-position":"fixed"});
    this.page.find(".content").attr("data-role","content");
    this.page.find("ul").attr("data-role","listview");
    this.page.find(".footer").attr({"data-role":"footer", "data-position":"fixed"});
    this.page.find(".refresh").attr("data-role","button")
                              .buttonMarkup({icon: 'refresh',
                                             inline: true,
                                             mini: false});
    this.page.on("pageshow", refreshCallback);
    this.page.appendTo("body");
}

JQMListView.prototype.refresh = function(items)
{
    this.view.refresh(items);
    this.page.find("span.date").addClass("ui-li-count").css("padding-right","5em");
    this.page.find("ul").listview('refresh');
};
