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
        },

        "test add(): following list is unique, so is serialisation to store": function() {
            var expected = ['summer'];
            var store = new MockLocalStore({});

            var model = new FollowingModel(store);
            model.add('summer');
            model.add('summer');

            assertEquals(expected, model.following);
            assertEquals(JSON.stringify(expected), store.contents.following);
        },

        "test add(): fires followingChanged event to all listeners": function() {
            var original = ['rex'];
            var expected = ['rex', 'deb'];
            var store = new MockLocalStore({ following: JSON.stringify(original) });
            var resultOne = null;
            var resultTwo = null;

            var model = new FollowingModel(store);
            model.onFollowingChanged(function(following) { resultOne = following; });
            model.onFollowingChanged(function(following) { resultTwo = following; });
            model.add('deb');

            assertEquals(expected, resultOne);
            assertEquals(expected, resultTwo);
        },

        "test add(): add duplicate => doesn't fire followingChanged event": function() {
            var original = ['rex'];
            var store = new MockLocalStore({ following: JSON.stringify(original) });
            var result = null;

            var model = new FollowingModel(store);
            model.onFollowingChanged(function(following) { result = following; });
            model.add('rex');

            assertEquals(null, result);
        },

        "test remove(): name is removed from following and serialised to store": function() {
            var original = ['rex', 'deb', 'pedro'];
            var expected = ['rex', 'pedro'];
            var store = new MockLocalStore({ following: JSON.stringify(original) });

            var model = new FollowingModel(store);
            model.remove('deb');

            assertEquals(expected, model.following);
            assertEquals(JSON.stringify(expected), store.contents.following);
        },

        "test remove(): fires followingChanged event to all listeners": function() {
            var original = ['napoleon', 'pedro', 'kip'];
            var expected = ['pedro', 'kip'];
            var store = new MockLocalStore({ following: JSON.stringify(original) });
            var resultOne = null;
            var resultTwo = null;

            var model = new FollowingModel(store);
            model.onFollowingChanged(function(following) { resultOne = following; });
            model.onFollowingChanged(function(following) { resultTwo = following; });
            model.remove('napoleon');

            assertEquals(expected, resultOne);
            assertEquals(expected, resultTwo);
        },

        "test remove(): remove non-existant => following unchanged": function() {
            var original = ['kip', 'rico'];
            var store = new MockLocalStore({ following: JSON.stringify(original) });

            var model = new FollowingModel(store);
            model.remove('napoleon');

            assertEquals(original, model.following);
            assertEquals(JSON.stringify(original), store.contents.following);
        },

        "test remove(): remove non-existant => doesn't fire followingChanged event": function() {
            var original = ['kip', 'rico'];
            var store = new MockLocalStore({ following: JSON.stringify(original) });
            var result = null;

            var model = new FollowingModel(store);
            model.onFollowingChanged(function(following) { result = following; });
            model.remove('napoleon');

            assertEquals(null, result);
        }
    });

});