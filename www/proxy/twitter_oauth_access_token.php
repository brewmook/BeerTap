<?php
include 'proxy.php';
proxy("https://api.twitter.com/oauth/access_token?$_SERVER[QUERY_STRING]");
?>