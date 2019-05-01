<?php
$config = parse_ini_file('../../config.ini');
$security['KEY'] = $config['KEY'];
$security['KEYSIZE'] = $config['KEYSIZE'];
$security['IVSIZE'] = $config['IVSIZE'];
$security['ITERATIONS'] = $config['ITERATIONS'];

echo json_encode($security);
?>