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

$start = $_GET['start'];
$end = $_GET['end'];

$sql = "CALL getLogs('$start','$end')";
$logs = array();
$result = mysqli_query($conn,$sql);

if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        $log['date'] = $row['date'];
        $log['time'] = $row['time'];
	$log['email'] = $row['email'];
	$log['action'] = $row['action'];
	$log['detailedAction'] = $row['detailAction'];
        array_push($logs,$log);
    }
} else {
    echo "No results";
}

mysqli_close($conn);

echo json_encode($logs);

?>

