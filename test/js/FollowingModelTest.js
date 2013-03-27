define(['FollowingModel'],
    function(FollowingModel) {

        function MockLocalStore(contents)
        {
            this.contents = contents;
        }

        MockLocalStore.prototype.getItem = function(name)
        {
            if (this.contents.hasOwnProperty(name))
                return this.contents[name];
            return null;
        };

        MockLocalStore.prototype.setItem = function(name, value)
        {
            this.contents[name] = value;
        };

        TestCase("FollowingModelTest", {

            "test On construction, empty store => model.following is empty list": function() {
                var store = new MockLocalStore({});
                var model = new FollowingModel(store);

                assertEquals([], model.following);
            },

            "test On construction, values are pulled out of the store": function() {
                var expected = ['napoleon', 'pedro'];
                var store = new MockLocalStore({ following: JSON.stringify(expected) });
                var model = new FollowingModel(store);

                assertEquals(expected, model.following);
            },

            "test add(): names are added to following and serialised to store": function() {
                var expected = ['rico', 'kip'];
                var store = new MockLocalStore({});
                var model = new FollowingModel(store);

                model.add('rico');
                model.add('kip');

                assertEquals(expected, model.following);
                assertEquals(JSON.stringify(expected), store.contents.following);
            }
        });

    });