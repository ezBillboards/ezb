<?php

define('DB_SERVER', 'ezb.uprm.edu');
define('DB_USERNAME', 'ezb');
define('DB_PASSWORD', 'ezb');
define('DB_NAME', 'ezbillboards');
 
$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

$billboardID = $_GET['billboardID'];
$date = $_GET['date'];
$packages = array();

//echo $billboardID;
//echo $date;

$sql = "CALL getPackages($billboardID, '$date')";
$result = mysqli_query($conn,$sql);

if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
	$package['id'] = $row['package_ID'];
	$package['duration'] = $row['duration'];
	$package['frequency'] = $row['displayPerCycle'];
	$package['price'] = $row['price'];
	$package['availability'] = ($row['availability'] == 1) ? true : false;
    	array_push($packages, $package);
    }
} else {
    echo "No results";
}

echo json_encode($packages);

mysqli_close($conn);
?>
