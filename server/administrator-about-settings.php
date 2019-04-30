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

$about = $_POST['about'];
$adminEmail = $_POST['adminEmail'];

$sql = "CALL putAbout('$about')";

if (mysqli_query($conn, $sql)) {
        logger($adminEmail, "UPDATE ABOUT", "About information has been updated");
} else {
	logger($adminEmail, "ERROR UPDATE ABOUT", " Error while trying to update About information");
}

mysqli_close($conn);

?>

