<?php

/*************************************
*Log function that saves an action made
*by a roll on the web app
*
* @param {string} email
* @param {string} action
* @param {string} detailAction
**************************************/
function logger($email, $action, $detailAction) {
	$config = parse_ini_file('../../../config.ini');

	define('DB_SERVER', $config['DB_SERVER']);
	define('DB_USERNAME', $config['DB_USERNAME']);
	define('DB_PASSWORD', $config['DB_PASSWORD']);
	define('DB_NAME', $config['DB_NAME']);
 
	$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
	if($conn === false){
    		die("ERROR: Could not connect. " . mysqli_connect_error());
	}

	$sql = "INSERT INTO tbllogs VALUES (NOW(), '$email', '$action', '$detailAction')";

	mysqli_query($conn, $sql);
	mysqli_close($conn);
}

?>
