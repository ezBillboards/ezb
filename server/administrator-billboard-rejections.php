<?php

define('DB_SERVER', 'ezb.uprm.edu');
define('DB_USERNAME', 'ezb');
define('DB_PASSWORD', 'ezb');
define('DB_NAME', 'ezbillboards');

$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

$id = $_GET['id'];
$Rejections = array();

$sql = "CALL getAdminRejections($id)";
$result = mysqli_query($conn,$sql);

if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
	$Rejection['id'] = $row['reject_ID'];
	$Rejection['rejection'] = $row['rejection'];
    array_push($Rejections, $Rejection);
    }
	echo json_encode($Rejections);
} else {
    echo "No results";
}
mysqli_close($conn);
?>