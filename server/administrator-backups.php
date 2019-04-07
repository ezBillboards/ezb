<?php

$filename = $_POST['filename'];
$backupDir = "../../backups/";
$backup = $backupDir . $filename;

$zip = new ZipArchive();

if($zip->open($backup, ZipArchive::CREATE)){
	
	system("mysqldump -u root --password=ezb ezbillboards > ../../sqlDumps/ezb-dump.sql", $retval);
	if($retval != 0){"ERROR making dump file.";}
	
	if(file_exists("../../sqlDumps/ezb-dump.sql")){
	        $zip->addFile("../../sqlDumps/ezb-dump.sql", "ezb-dump.sql");
        } else {
                echo "ERROR backing up dump file.";
        }

	$ezbImageDir = "../../img/ezb/";
        $ezbImages = scandir($ezbImageDir);
	
	for ($i = 2; $i < count($ezbImages); $i++) {
		if(file_exists($ezbImageDir . $ezbImages[$i])){
			$zip->addFile($ezbImageDir . $ezbImages[$i], "img/ezb/" . $ezbImages[$i]);
		} else {
			echo "ERROR backing up a ezb image = " . $ezbImages[$i] . ".";
		}
	}

	$billboardsImageDir = "../../img/billboards/";
        $billboardImages = scandir($billboardsImageDir);

        for ($i = 2; $i < count($billboardImages); $i++) {
                if(file_exists($billboardsImageDir . $billboardImages[$i])){
                        $zip->addFile($billboardsImageDir . $billboardImages[$i], "img/billboards/" . $billboardImages[$i]);
                } else {
                        echo "ERROR backing up a billboard image = " . $billboardImages[$i] . ".";
                }
        }
	
	$requestsImageDir = "../../img/requests/";
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

?>
