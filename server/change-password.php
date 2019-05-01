<?php

$config = parse_ini_file('../../config.ini');

define('DB_SERVER', $config['DB_SERVER']);
define('DB_USERNAME', $config['DB_USERNAME']);
define('DB_PASSWORD', $config['DB_PASSWORD']);
define('DB_NAME', $config['DB_NAME']);
 
$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
$userID = $_POST['userID'];
$newPassword = $_POST['newPassword'];
$sql = "CALL putPassword($userID, '$newPassword')";

if (mysqli_query($conn, $sql)) {
		echo "Record updated successfully";
} else {
		echo "Error updating record: " . mysqli_error($conn);
}
mysqli_close($conn);

?>
