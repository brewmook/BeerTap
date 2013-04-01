<?php
include 'proxy.php';
proxy("https://api.twitter.com/oauth/request_token?$_SERVER[QUERY_STRING]");
?>