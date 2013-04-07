define(['ListView'], function(ListView) {

    function JQMListView(id)
    {
        this.view = new ListView(id);

        this.page = this.view.page;
        this.page.attr({id:id, "data-role":"page"});
        this.page.find(".header").attr({"data-role":"header", "data-position":"fixed"});
        this.page.find(".content").attr("data-role","content");
        this.page.find("ul").attr("data-role","listview");
        this.page.find(".footer").attr({"data-role":"footer", "data-position":"fixed"});
        this.page.find(".buttons").attr({"data-role":"controlgroup", "data-type":"horizontal", "data-mini":true});
        this.page.find(".back").button({icon:'back', theme:'a'}).click(function(){history.go(-1);});
        this.page.find(".refresh").button({icon:'refresh', theme:'a'});
        this.page.appendTo("body");
    }

    JQMListView.prototype.clear = function()
    {
        this.view.clear();
    };

    JQMListView.prototype.setHeading = function(heading)
    {
        this.view.setHeading(heading);
    };

    JQMListView.prototype.onRefreshClicked = function(callback)
    {
        this.view.onRefreshClicked(callback);
    };

    JQMListView.prototype.refresh = function(items)
    {
        this.view.refresh(items);
        this.page.find("span.date").addClass("ui-li-count");
        this.page.find("ul").listview('refresh');
    };

    return JQMListView;

});
