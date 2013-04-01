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

function proxyLog($text)
{
    file_put_contents('proxy.log', "$text\n", FILE_APPEND | LOCK_EX);
}

function proxy($url)
{
    proxyLog($url);

    $ch = curl_init( $url );

    if ( strtolower($_SERVER['REQUEST_METHOD']) == 'post' )
    {
        curl_setopt( $ch, CURLOPT_POST, true );
        curl_setopt( $ch, CURLOPT_POSTFIELDS, $_POST );
    }

    curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, true );
    curl_setopt( $ch, CURLOPT_HEADER, true );
    curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );

    // Propagate headers to response.
    $requestHeader = array();
    foreach (getallheaders() as $name => $value) {
        if (strtolower($name) == "authorization")
        {
            $requestHeader[] = "$name: $value\n";
        }
    }
    curl_setopt( $ch, CURLOPT_HTTPHEADER, $requestHeader );
    proxyLog("Request headers:");
    proxyLog(print_r($requestHeader, true));

    $result = curl_exec($ch);
    proxyLog("RESULT:");
    proxyLog(print_r($result, true));

    list( $header, $contents ) = preg_split( '/([\r\n][\r\n])\\1/', $result, 2 );

    $status = curl_getinfo( $ch );

    curl_close( $ch );

    // Split header text into an array.
    $header_text = preg_split( '/[\r\n]+/', $header );

    proxyLog("RESPONSE:");
    // Propagate headers to response.
    foreach ( $header_text as $header )
    {
        header( $header );
        proxyLog($header);
    }

    print $contents;
}
?>
