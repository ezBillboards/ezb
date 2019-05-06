<?php

/*************************************
*Get security parameters from config
**************************************/
$config = parse_ini_file('../../../config.ini');

if(strpos($_SERVER['HTTP_REFERER'], $config['SERVER']) == false){
        header('HTTP/1.1 403 Forbidden');
        exit;
} else{
	$security['KEY'] = $config['KEY'];
	$security['KEYSIZE'] = $config['KEYSIZE'];
	$security['IVSIZE'] = $config['IVSIZE'];
	$security['ITERATIONS'] = $config['ITERATIONS'];

	echo json_encode($security);
}
?>
