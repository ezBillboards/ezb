<?php

$config = parse_ini_file('../../../config.ini');

if(strpos($_SERVER['HTTP_REFERER'], $config['SERVER']) == false){
        header('HTTP/1.1 403 Forbidden');
        exit;
} else{

define('DB_SERVER', $config['DB_SERVER']);
define('DB_USERNAME', $config['DB_USERNAME']);
define('DB_PASSWORD', $config['DB_PASSWORD']);
define('DB_NAME', $config['DB_NAME']);
 
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

/*************************************
*Get information from the DB
*about the billboards packages
**************************************/
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
}
?>
