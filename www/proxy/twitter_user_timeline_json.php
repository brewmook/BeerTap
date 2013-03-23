<?php
echo file_get_contents("https://api.twitter.com/1/statuses/user_timeline.json?$_SERVER[QUERY_STRING]");
?>
