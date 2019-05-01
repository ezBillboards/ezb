<?php

require_once('./logger.php');

$config = parse_ini_file('../../config.ini');

$category = $_POST['category'];
$adminEmail = $_POST['adminEmail'];

if($category == "db"){
	
	$server = $_POST['server'];
	$username = $_POST['username'];
	$password = $_POST['password'];
	$dbname = $_POST['dbname'];
	$content = "[database]\n" .
	   "DB_SERVER = $server\n" .
	   "DB_USERNAME = $username\n" . 
	   "DB_PASSWORD = $password\n" .
	   "DB_NAME = $dbname\n\n" .
	   "[mail server]\n" .
	   "IP = " . $config['IP'] . "\n" .
	   "PORT = " . $config['PORT'] . "\n\n" .
	   "[backup path]\n" .
	   "BACKUP_PATH = " . $config['BACKUP_PATH'] . "\n\n" .
	   "[image path]\n" .
	   "IMAGE_PATH = " . $config['IMAGE_PATH'] . "\n\n";
} else if($category == "mail"){
	$ip = $_POST['ip'];
	$port = $_POST['port'];
	$content = "[database]\n" .
           "DB_SERVER = " . $config['DB_SERVER'] . "\n" .
           "DB_USERNAME = " . $config['DB_USERNAME'] . "\n" .
           "DB_PASSWORD = " . $config['DB_PASSWORD'] . "\n" .
           "DB_NAME = " . $config['DB_NAME'] . "\n\n" .
           "[mail server]\n" .
	   "IP = $ip\n" .
           "PORT = $port\n\n" .
           "[backup path]\n" .
           "BACKUP_PATH = " . $config['BACKUP_PATH'] . "\n\n" .
           "[image path]\n" .
           "IMAGE_PATH = " . $config['IMAGE_PATH'] . "\n\n";
} else if($category == "backup"){
	$backupPath = $_POST['backupPath'];
        $content = "[database]\n" .
           "DB_SERVER = " . $config['DB_SERVER'] . "\n" .
           "DB_USERNAME = " . $config['DB_USERNAME'] . "\n" .
           "DB_PASSWORD = " . $config['DB_PASSWORD'] . "\n" .
           "DB_NAME = " . $config['DB_NAME'] . "\n\n" .
           "[mail server]\n" .
	   "IP = " . $config['IP'] . "\n" .
           "PORT = " . $config['PORT'] . "\n\n" .
           "[backup path]\n" .
           "BACKUP_PATH = $backupPath\n\n" .
           "[image path]\n" .
           "IMAGE_PATH = " . $config['IMAGE_PATH'] . "\n\n";
} else if($category == "image"){
        $imagePath = $_POST['imagePath'];
        $content = "[database]\n" .
           "DB_SERVER = " . $config['DB_SERVER'] . "\n" .
           "DB_USERNAME = " . $config['DB_USERNAME'] . "\n" .
           "DB_PASSWORD = " . $config['DB_PASSWORD'] . "\n" .
           "DB_NAME = " . $config['DB_NAME'] . "\n\n" .
           "[mail server]\n" .
           "IP = " . $config['IP'] . "\n" .
           "PORT = " . $config['PORT'] . "\n\n" .
           "[backup path]\n" .
           "BACKUP_PATH = " . $config['BACKUP_PATH'] . "\n\n" .
           "[image path]\n" .
           "IMAGE_PATH = $imagePath\n\n";
}

if (!$handle = fopen("../../config.ini", 'w')) {
	logger($adminEmail,"ERROR UPDATE " . strtoupper($category), "Error trying opening config file.");
}
	
$result = fwrite($handle, $content);
fclose($handle);

$additionalInfo;
if($category == "image" || $category == "backup"){
	$additionalInfo = "path";
} else{
	$additionalInfo = "configuration";
}

if($result){
	logger($adminEmail,"UPDATE " . strtoupper($category) . " " . strtoupper($additionalInfo), $category . " " . $additionalInfo . " has been updated");
} else{
	logger($adminEmail,"ERROR UPDATE " . strtoupper($category) . " " . strtoupper($additionalInfo), "Error trying writing config file.");
}

?>

