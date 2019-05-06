<?php

$config = parse_ini_file('../../../config.ini');

if(strpos($_SERVER['HTTP_REFERER'], $config['SERVER']) == false){
        header('HTTP/1.1 403 Forbidden');
        exit;
} else{

/*************************
*Post backup path from
*administrator backup view
*to the DB
*************************/

$backupDir = $config['BACKUP_PATH'];
$backupFiles = scandir($backupDir);
$result = array();
	
for ($i = 2; $i < count($backupFiles); $i++) {
	if(strpos($backupFiles[$i], ".zip")){
		array_push($result,$backupFiles[$i]);	
	}
}

echo json_encode($result);
}
?>
