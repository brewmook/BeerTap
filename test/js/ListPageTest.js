define(['ListPage'],
function(ListPage) {

    TestCase("ListPageTest", {

        setUp: function() {
            this.model = {
                load: function(arg) { this.loadArgument = arg; },
                onItemsLoaded: function(arg) { this.onItemsLoadedArgument = arg; },
                onItemsLoadedArgument: function(items){}
            };
            this.view = {
                clear: function() { this.clearCalled = true; },
                refresh: function(arg) { this.refreshArgument = arg; },
                setHeading: function(title) { this.setHeadingArgument = title; },
                onRefreshClicked: function(arg) { this.onRefreshClickedArgument = arg; },
                onRefreshClickedArgument: function(){}
            };
        },

        tearDown: function() {
            delete this.model;
            delete this.view;
        },

        "test id, model and view are assigned from construction arguments": function() {
            var id = "pies";
            var listPage = new ListPage(id, this.model, this.view);

            assertSame(id, listPage.id);
            assertSame(this.model, listPage.model);
            assertSame(this.view, listPage.view);
        },

        "test when refresh clicked, model.load() is called": function() {
            var listPage = new ListPage("twitterid", this.model, this.view);
            this.view.onRefreshClickedArgument();
            assertSame("twitterid", this.model.loadArgument);
        },

        "test when model items loaded, view.refresh() is called": function() {
            var items = [1, 2, 3];
            var listPage = new ListPage("twitterid", this.model, this.view);
            this.model.onItemsLoadedArgument(items);
            assertSame(items, this.view.refreshArgument);
        },

        "test show(): set view header, clear view, load feed": function() {
            var title = 'a title';
            var twitterid = 'something';

            var listPage = new ListPage("whatever", this.model, this.view);
            listPage.show(title, twitterid);

            assertTrue(this.view.clearCalled);
            assertEquals(title, this.view.setHeadingArgument);
            assertEquals(twitterid, this.model.loadArgument);
        }

    });

});