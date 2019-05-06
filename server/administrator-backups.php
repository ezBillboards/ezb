<?php

$config = parse_ini_file('../../../config.ini');

if(strpos($_SERVER['HTTP_REFERER'], $config['SERVER']) == false){
        header('HTTP/1.1 403 Forbidden');
        exit;
} else{

require_once('./logger.php');

/*************************
*Post information from
*administrator backup to
*the DB
*************************/
$filename = $_POST['filename'];
$backupDir = $config['BACKUP_PATH'];
$imageDir = $config['IMAGE_PATH'];
$backup = $backupDir . $filename;
$zip = new ZipArchive();


/*************************
*Creates ZIP
*makes a msqldump
*saves info on zip
*create images
*erase dump on DB
*************************/
if($zip->open($backup, ZipArchive::CREATE)){
	
	system("mysqldump -u root --password=ezb ezbillboards > " . $backupDir . "ezb-dump.sql", $retval);
	if($retval != 0){echo "ERROR making dump file.";}
	
	if(file_exists($backupDir . "ezb-dump.sql")){
	        $zip->addFile($backupDir . "/ezb-dump.sql", "ezb-dump.sql");
        } else {
                echo "ERROR backing up dump file.";
        }

	$ezbImageDir = $imageDir . "img/ezb/";
        $ezbImages = scandir($ezbImageDir);
	
	for ($i = 2; $i < count($ezbImages); $i++) {
		if(file_exists($ezbImageDir . $ezbImages[$i])){
			$zip->addFile($ezbImageDir . $ezbImages[$i], "img/ezb/" . $ezbImages[$i]);
		} else {
			echo "ERROR backing up a ezb image = " . $ezbImages[$i] . ".";
		}
	}

	$billboardsImageDir = $imageDir . "img/billboards/";
        $billboardImages = scandir($billboardsImageDir);

        for ($i = 2; $i < count($billboardImages); $i++) {
                if(file_exists($billboardsImageDir . $billboardImages[$i])){
                        $zip->addFile($billboardsImageDir . $billboardImages[$i], "img/billboards/" . $billboardImages[$i]);
                } else {
                        echo "ERROR backing up a billboard image = " . $billboardImages[$i] . ".";
                }
        }
	
	$requestsImageDir = $imageDir . "img/requests/";
        $requestImages = scandir($requestsImageDir);

        for ($i = 2; $i < count($requestImages); $i++) {
                if(file_exists($requestsImageDir . $requestImages[$i])){
                        $zip->addFile($requestsImageDir . $requestImages[$i], "img/requests/" . $requestImages[$i]);
                } else {
                        echo "ERROR backing up a request image = " . $requestImages[$i] . ".";
                }
        }	
}else{
	echo "ERROR";
}

$zip->close();

system("rm " . $backupDir . "ezb-dump.sql", $retval);
if($retval != 0){echo "ERROR deleting dump.";}
}
?>
