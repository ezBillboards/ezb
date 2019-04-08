<?php

define('DB_SERVER', 'ezb.uprm.edu');
define('DB_USERNAME', 'ezb');
define('DB_PASSWORD', 'ezb');
define('DB_NAME', 'ezbillboards');

$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

$id = $_GET['billboardID'];
$packages = array();

$sql = "CALL getAdminPackages($billboardID)";
$result = mysqli_query($conn,$sql);

if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
	$package['id'] = $row['package_ID'];
	$package['duration'] = $row['duration'];
	$package['frequency'] = $row['displayPerCycle'];
	$package['price'] = $row['price'];
    array_push($packages, $package);
    }
	echo json_encode($packages);
} else {
    echo "No results";
}
mysqli_close($conn);
?>