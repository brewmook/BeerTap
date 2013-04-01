<?php
include 'proxy.php';
proxy("https://api.twitter.com/oauth/authorize?$_SERVER[QUERY_STRING]");
?>