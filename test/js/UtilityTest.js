define(['Utility'],
function(Utility) {

    TestCase("UtilityTest", {

        // changeRelativePath()

        "test changeRelativePath(): top-level url with trailing slash, append new path": function() {
            var url = "http://blah.com/";
            assertEquals(url+"hello", Utility.changeRelativePath(url, "hello"));
        },

        "test changeRelativePath(): top-level url with no trailing slash, append slash and new path": function() {
            var url = "http://blah.com";
            assertEquals(url+"/hello", Utility.changeRelativePath(url, "hello"));
        },

        "test changeRelativePath(): top-level url with trailing slash, append new path with single slash": function() {
            var url = "http://blah.com/";
            assertEquals(url+"hello", Utility.changeRelativePath(url, "/hello"));
        },

        "test changeRelativePath(): multiple slashes in url and no trailing slash, append new path after last slash": function() {
            var baseUrl = "http://blah.com/some/";
            assertEquals(baseUrl+"hello", Utility.changeRelativePath(baseUrl+"path", "hello"));
        },

        "test changeRelativePath(): multiple slashes in url with trailing slash, append new path after last slash": function() {
            var baseUrl = "http://blah.com/some/path/";
            assertEquals(baseUrl+"hello", Utility.changeRelativePath(baseUrl, "hello"));
        },

        "test changeRelativePath(): base url has multiple slashes and trailing slash, path has leading slash => append with single slash": function() {
            var baseUrl = "http://blah.com/some/path/";
            assertEquals(baseUrl+"hello", Utility.changeRelativePath(baseUrl, "/hello"));
        },

        // rewriteProxy()

        "test rewriteProxy(): returns function that appends path and query to given proxy url": function() {
            var proxyUrl = "http://proxy.com/blah";
            var path = "/some/path/";
            var query = "blah=12&whatever";
            var proxy = Utility.rewriteProxy(proxyUrl);

            assertEquals(proxyUrl+path+"?"+query, proxy(path, query));
        },

        "test rewriteProxy(): returns function that appends just path if no query supplied": function() {
            var proxyUrl = "http://proxy.com/blah";
            var path = "/some/path/";
            var query = "";
            var proxy = Utility.rewriteProxy(proxyUrl);

            assertEquals(proxyUrl+path, proxy(path, query));
        }
    });
});

