<?php

$config = parse_ini_file('../../../config.ini');

if(strpos($_SERVER['HTTP_REFERER'], $config['SERVER']) == false){
        header('HTTP/1.1 403 Forbidden');
        exit;
} else{

$backupDir = $config['BACKUP_PATH'];
$imagesDir = $config['IMAGE_PATH'];
$filename = $_POST['filename'];
$zip = new ZipArchive;


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

} else {
    echo "ERROR opening backup file.";
}
}
?>
