define(['ListPresenter'],
function(ListPresenter) {

    TestCase("ListPresenterTest", {

        setUp: function() {
            this.model = {
                load: function(arg) { this.loadArgument = arg; },
                on: function(name, callback) { this.callbacks[name] = callback; },
                callbacks: {}
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
            var listPage = new ListPresenter(id, this.model, this.view);

            assertSame(id, listPage.id);
            assertSame(this.model, listPage.model);
            assertSame(this.view, listPage.view);
        },

        "test when refresh clicked, model.load() is called with userid of previous show()": function() {
            var listPage = new ListPresenter("whatever", this.model, this.view, function(){});
            listPage.show("title", "userid");
            this.view.onRefreshClickedArgument();
            assertSame("userid", this.model.loadArgument);
        },

        "test when model items loaded, view.refresh() is called": function() {
            var items = [1, 2, 3];
            var listPage = new ListPresenter("whatever", this.model, this.view);
            this.model.callbacks['itemsLoaded'](items);
            assertSame(items, this.view.refreshArgument);
        },

        "test show(): set view header, clear view, load feed, change page": function() {
            var title = 'a title';
            var userid = 'something';
            var changePageHref = null;
            function changePage(href) { changePageHref = href; }

            var listPage = new ListPresenter("whatever", this.model, this.view, changePage);
            listPage.show(title, userid);

            assertTrue(this.view.clearCalled);
            assertEquals(title, this.view.setHeadingArgument);
            assertEquals(userid, this.model.loadArgument);
            assertEquals('#whatever', changePageHref);
        }

    });

});