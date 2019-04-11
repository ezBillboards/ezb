<?php

$config = parse_ini_file('../../config.ini');
$category = $_POST['category'];

/*$office = $_POST['office'];
$postal = $_POST['postal'];
$physical = $_POST['physical'];
$phone = $_POST['phone'];
$extension = $_POST['extension'];
$directPhone = $_POST['directPhone'];
$fax = $_POST['fax'];
$email = $_POST['email'];
$about = $_POST['about'];
$terms = $_POST['terms'];
*/
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
	echo "ERROR opening file.";
}
	
$success = fwrite($handle, $content);
fclose($handle);

echo $success;

?>

