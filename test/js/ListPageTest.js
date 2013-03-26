define(['ListPage'],
function(ListPage) {

    TestCase("ListPageTest", {

        "test id is assigned from twitter user id": function() {
            var factory = {
                newListView : function(id, callback) {}
            };
            var listPage = new ListPage("pies", "twitter", factory);

            assertEquals("pies", listPage.id);
        },

        "test ListView created with id": function() {
            var factory = {
                newModel : function() {},
                newListView : function(id, callback) { if (id == "pies") return "fake ListView"; }
            };
            var listPage = new ListPage("pies", "twitter", factory);

            assertEquals("fake ListView", listPage.view);
        },

        "test id is passed to new ListView": function() {
            var factory = {
                newListView : function(id, callback) { if (id == "pies") return "fake ListView"; }
            };
            var listPage = new ListPage("pies", "twitter", factory);

            assertEquals("fake ListView", listPage.view);
            assert
        }

    });

});