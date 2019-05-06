<?php

$config = parse_ini_file('../../../config.ini');

if(strpos($_SERVER['HTTP_REFERER'], $config['SERVER']) == false){
        header('HTTP/1.1 403 Forbidden');
        exit;
} else{
	require_once('./logger.php');
	define('DB_SERVER', $config['DB_SERVER']);
	define('DB_USERNAME', $config['DB_USERNAME']);
	define('DB_PASSWORD', $config['DB_PASSWORD']);
	define('DB_NAME', $config['DB_NAME']);
	 
	$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
	 
	if($conn === false){
		die("ERROR: Could not connect. " . mysqli_connect_error());
	}

	/*************************************
	*Post verified email on DB
	**************************************/
	$email = $_POST['email'];

	$sql = "CALL putVerified('$email')";

	if (mysqli_query($conn, $sql)) {
		logger($email, "VERIFIED ACCOUNT", $email . " has been verified successfully");
	} else {
		logger($email, "VERIFIED ACCOUNT", "Error verifying email " . $email);
	}

	mysqli_close($conn);
}
?>
