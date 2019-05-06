<?php

/*************************************
*Get IMAGE path on config
**************************************/
$config = parse_ini_file('../../../config.ini');

if(strpos($_SERVER['HTTP_REFERER'], $config['SERVER']) == false){
        header('HTTP/1.1 403 Forbidden');
        exit;
} else{
	echo $config['IMAGE_PATH'];
}
?>
