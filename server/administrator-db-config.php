<?php
	$server = $_POST['server'];
	$username = $_POST['username'];
	$password = $_POST['password'];
	$dbname = $_POST['dbname'];

	$content = "[database]\nDB_SERVER = $server\nDB_USERNAME = $username\nDB_PASSWORD = $password\nDB_NAME = $dbname\n";

	if (!$handle = fopen("../../config.ini", 'w')) { 
		echo "ERROR opening file."; 
	}
 	$success = fwrite($handle, $content);
	fclose($handle); 
 
	echo $success;
?>

