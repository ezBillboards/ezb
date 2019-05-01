<?php

if(strpos($_SERVER['HTTP_REFERER'],"ezb.uprm.edu") == false){
	header('HTTP/1.1 403 Forbidden');
	exit;
} else{
	$config = parse_ini_file('../../../config.ini');
	echo $config['IMAGE_PATH'];
}

?>
