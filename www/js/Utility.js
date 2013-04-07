define(function() {

    return {

        changeRelativePath: function(url, path)
        {
            var match = /(.*:\/\/.+)\//.exec(url);
            if (match)
                url = match[1];
            if (path.indexOf('/') == 0)
                path = path.substring(1);
            return url + '/' + path;
        },

        rewriteProxy: function(proxyUrl)
        {
            return function(path, query)
            {
                if (query != '')
                    return proxyUrl + path + '?' + query;
                return proxyUrl + path;
            }
        }

    };

});
