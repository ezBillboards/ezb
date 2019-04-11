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
$Regulations = array();

$sql = "CALL getAdminRegulations($id)";
$result = mysqli_query($conn,$sql);

if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
	$Regulation['id'] = $row['reg_ID'];
	$Regulation['regulation'] = $row['regulation'];
    array_push($Regulations, $Regulation);
    }
	echo json_encode($Regulations);
} else {
    echo "No results";
}
mysqli_close($conn);
?>