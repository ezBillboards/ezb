<?php

$config = parse_ini_file('../../../config.ini');

$backupDir = $config['BACKUP_PATH'];
$backupFiles = scandir($backupDir);
$result = array();
	
for ($i = 2; $i < count($backupFiles); $i++) {
	if(strpos($backupFiles[$i], ".zip")){
		array_push($result,$backupFiles[$i]);	
	}
}

echo json_encode($result);

?>
