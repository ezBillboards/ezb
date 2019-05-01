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

$terms = $_POST['terms'];
$adminEmail = $_POST['adminEmail'];

$sql = "CALL putTerms('$terms')";

if (mysqli_query($conn, $sql)) {
	logger($adminEmail, "UPDATE TERMS", "Terms & Privacy Policy has been updated");
} else {
	logger($adminEmail, "ERROR UPDATE TERMS", " Error while trying to update Terms & Privacy Policy");
}

mysqli_close($conn);

?>

