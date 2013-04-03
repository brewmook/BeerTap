<?PHP

// Based on Simple PHP Proxy 1.6
//
// Project Home - http://benalman.com/projects/php-simple-proxy/
// GitHub       - http://github.com/cowboy/php-simple-proxy/
// Source       - http://github.com/cowboy/php-simple-proxy/raw/master/ba-simple-proxy.php
//
// About: License
//
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
//
// About: Examples
//
// This working example, complete with fully commented code, illustrates one way
// in which [the full version of] this PHP script can be used.
//
// Simple - http://benalman.com/code/projects/php-simple-proxy/examples/simple/
//
// Topic: POST Parameters
//
// All POST parameters are automatically passed through to the remote URL
// request.
//
// Topic: Notes
//
// * Assumes magic_quotes_gpc = Off in php.ini
//
//
// ############################################################################

ini_set('display_errors', 'On');

function proxy($url)
{
    $ch = curl_init( $url );
    $url = parse_url($url);

    if ( strtolower($_SERVER['REQUEST_METHOD']) == 'post' )
    {
        curl_setopt( $ch, CURLOPT_POST, true );
        curl_setopt( $ch, CURLOPT_POSTFIELDS, file_get_contents("php://input") );
    }

    curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, true );
    curl_setopt( $ch, CURLOPT_HEADER, true );
    curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );

    $requestHeader = array();
    $requestHeader[] = "Host: $url[host]";
    foreach (getallheaders() as $name => $value)
    {
        if (strtolower($name) != "host")
            $requestHeader[] = "$name: $value";
    }
    curl_setopt( $ch, CURLOPT_HTTPHEADER, $requestHeader );

    $result = curl_exec($ch);
    curl_close($ch);

    list( $headers, $contents ) = preg_split( '/([\r\n][\r\n])\\1/', $result, 2 );

    $headers = preg_split('/[\r\n]+/', $headers);
    foreach($headers as $header)
        header($header);

    print $contents;
}
?>
