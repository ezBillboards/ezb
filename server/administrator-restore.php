<?php

$config = parse_ini_file('../../../config.ini');

if(strpos($_SERVER['HTTP_REFERER'], $config['SERVER']) == false){
        header('HTTP/1.1 403 Forbidden');
        exit;
} else{
require_once('./logger.php');
$backupDir = $config['BACKUP_PATH'];
$imagesDir = $config['IMAGE_PATH'];
$filename = $_POST['filename'];
$zip = new ZipArchive;
$email = $_POST['email'];


/*************************************
*Restor backup information on server
**************************************/
if ($zip->open($backupDir . $filename)) {
    system("rm -R " . $imagesDir . "img/", $retval);
    if($retval != 0){echo "ERROR deleting previous files.";}

    $zip->extractTo($imagesDir);
    $zip->close();

    system("mysql -u root --password=ezb ezbillboards < " . $imagesDir . "ezb-dump.sql", $retval);
    if($retval != 0){echo "ERROR restoring database.";}
    
    system("rm " . $imagesDir . "ezb-dump.sql", $retval);
    if($retval != 0){echo "ERROR deleting dump.";}
	logger($email, "SYSTEM RESTORE", "Administrator " . $email . " has restored a backup file of the system, file name:  " . $filename);
} else {
    echo "ERROR opening backup file.";
}
}
?>
