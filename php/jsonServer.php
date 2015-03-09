<?php
//run using  php -S 192.168.50.100:8000 jsonServer.php

$string = file_get_contents("/vagrant/php/assets/names.json");
$json=json_decode($string,true);
print_r(json_encode($json));

?>