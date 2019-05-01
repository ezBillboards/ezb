<?php

require_once('./logger.php');

$config = parse_ini_file('../../config.ini');

define('DB_SERVER', $config['DB_SERVER']);
define('DB_USERNAME', $config['DB_USERNAME']);
define('DB_PASSWORD', $config['DB_PASSWORD']);
define('DB_NAME', $config['DB_NAME']);
 
$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

$userID = $_POST['id'];
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$workPhone = $_POST['workPhone'];
$mobilePhone = $_POST['mobilePhone'];
$office = $_POST['office'];
$role = $_POST['role'];
$userEmail = $_POST['userEmail'];
$adminEmail = $_POST['adminEmail'];

$sql = "CALL putAccountAdmin($userID, '$firstName','$lastName','$workPhone','$mobilePhone','$office','$role')";

if (mysqli_query($conn, $sql)) {
	logger($adminEmail,"ADMIN UPDATE ACCOUNT","An account with email " . $userEmail . " has been updated");
} else {
	logger($adminEmail,"ERROR IN DB","Error updating record when updating an account: " . mysqli_error($conn));
}

mysqli_close($conn);

?>
