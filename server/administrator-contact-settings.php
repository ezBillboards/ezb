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
*Post contact intformation from
*from the front to the DB
*office
*postal
*physical
*phone
*extension
*directPhone
*fax
*email
*adminEmail
**************************************/
$office = $_POST['office'];
$postal = $_POST['postal'];
$physical = $_POST['physical'];
$phone = $_POST['phone'];
$extension = $_POST['extension'];
$directPhone = $_POST['directPhone'];
$fax = $_POST['fax'];
$email = $_POST['email'];
$adminEmail = $_POST['adminEmail'];

$sql = "CALL putContact('$postal','$physical','$phone','$extension','$directPhone','$fax','$email','$office')";

if (mysqli_query($conn, $sql)) {
	logger($adminEmail, "UPDATE CONTACT", "Contact information has been updated");
} else {
	logger($adminEmail, "ERROR UPDATE CONTACT", " Error while trying to update Contact information");
}

mysqli_close($conn);
}
?>

