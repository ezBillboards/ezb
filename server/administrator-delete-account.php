<?php

require_once('./logger.php');

$config = parse_ini_file('../../../config.ini');

define('DB_SERVER', $config['DB_SERVER']);
define('DB_USERNAME', $config['DB_USERNAME']);
define('DB_PASSWORD', $config['DB_PASSWORD']);
define('DB_NAME', $config['DB_NAME']);
 
$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

$id = $_POST['id'];
$userEmail = $_POST['userEmail'];
$adminEmail = $_POST['adminEmail'];

$sql = "CALL deleteAccount($id)";

if (mysqli_query($conn, $sql)) {
	logger($adminEmail,"ADMIN DELETE ACCOUNT","An account with email " . $userEmail . " has been deleted");
} else {
	logger($adminEmail,"ERROR IN DB","Error updating record when deleting an account: " . mysqli_error($conn));
}

mysqli_close($conn);

?>
