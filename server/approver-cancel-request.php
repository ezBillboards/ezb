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



/*************************************
*Post Id and cancelId on the DB
**************************************/ 
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
	
$id = $_POST['id'];
$cancelId = $_POST['cancelId'];
$emailAddress = $_POST['emailAddress'];

$sql = "CALL putCancelRequest($id, $cancelId)";

if (mysqli_query($conn, $sql)) {
	logger($emailAddress, "CANCEL REQUEST", $emailAddress . " has cancelled request with ID: " . $ID);
} else {
    logger($emailAddress, "CANCEL REQUEST", "Error cancelling request with ID: " . $ID);
}

mysqli_close($conn);
}
?>
