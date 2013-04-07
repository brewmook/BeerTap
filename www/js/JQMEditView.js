define(['EditView'], function(EditView) {

    function JQMEditView(id)
    {
        this.view = new EditView(id);

        this.page = this.view.page;
        this.page.attr({id:id, "data-role":"page"});
        this.page.find(".header").attr({"data-role":"header", "data-position":"fixed"});
        this.page.find(".content").attr("data-role","content");
        this.page.find(".footer").attr({"data-role":"footer", "data-position":"fixed"});
        this.page.find(".buttons").attr({"data-role":"controlgroup", "data-type":"horizontal", "data-mini":true});
        this.page.find(".refresh")
            .button({icon:'refresh', inline:true, theme:'a'});
        this.page.find(".add")
            .button({icon:'plus', inline:true, theme:'a'});

        this.itemList = this.page.find("ul");
        this.itemList.attr({"data-role":"listview",
                            "data-split-icon":"delete",
                            "data-split-theme":"c",
                            "data-inset":"false"});

        this.page.appendTo("body");
    }

    JQMEditView.prototype.clear = function()
    {
        this.view.clear();
    };

    JQMEditView.prototype.setHeading = function(heading)
    {
        this.view.setHeading(heading);
    };

    JQMEditView.prototype.refresh = function(items)
    {
        this.view.refresh(items);
        this.itemList.listview('refresh');
    };

    JQMEditView.prototype.remove = function(item)
    {
        this.view.remove(item);
    };

    JQMEditView.prototype.onAddClicked = function(callback)
    {
        this.view.onAddClicked(callback);
    };

    JQMEditView.prototype.onChangeClicked = function(callback)
    {
        this.view.onChangeClicked(callback);
    };

    JQMEditView.prototype.onRefreshClicked = function(callback)
    {
        this.view.onRefreshClicked(callback);
    };

    JQMEditView.prototype.onRemoveClicked = function(callback)
    {
        this.view.onRemoveClicked(callback);
    };

    return JQMEditView;

});
