<?php
if(strpos($_SERVER['HTTP_REFERER'],"ezb.uprm.edu") == false){
	header('HTTP/1.1 403 Forbidden');
	exit;
} else{
	$config = parse_ini_file('../../../config.ini');
	$security['KEY'] = $config['KEY'];
	$security['KEYSIZE'] = $config['KEYSIZE'];
	$security['IVSIZE'] = $config['IVSIZE'];
	$security['ITERATIONS'] = $config['ITERATIONS'];

	echo json_encode($security);
}
?>