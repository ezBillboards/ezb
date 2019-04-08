<?php

$backupDir = "../../backups/";
$imagesDir = "../../imgTest/";
$filename = $_POST['filename'];

$zip = new ZipArchive;

if ($zip->open($backupDir . $filename)) {
    $zip->extractTo($imagesDir);
    $zip->close();
    
    system("mysql -u root --password=ezb ezbillboards < " . $imagesDir . "ezb-dump.sql", $retval);
    if($retval != 0){"ERROR restoring database.";}
    
    system("rm " . $imagesDir . "ezb-dump.sql", $retval);
    if($retval != 0){"ERROR deleting dump.";}

} else {
    echo "ERROR opening backup file.";
}

?>
