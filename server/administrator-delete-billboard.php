<?php

define('DB_SERVER', 'ezb.uprm.edu');
define('DB_USERNAME', 'ezb');
define('DB_PASSWORD', 'ezb');
define('DB_NAME', 'ezbillboards');

$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

$id = $_POST['id'];

$sql = "CALL deleteBillboard($id)";
$result = mysqli_query($conn,$sql);

if (mysqli_query($conn, $sql)) {
	echo "Billboard removed successfully";
} else {
	echo "Error removing billboard: " . mysqli_error($conn);
}
mysqli_close($conn);
?>