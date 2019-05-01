<?php

$config = parse_ini_file('../../../config.ini');

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
$sql = "";

if($start == "Invalid date" && $end == "Invalid date"){
	$sql = "CALL getRequest(null, null)";
} else{
	$sql = "CALL getRequest('$start','$end')";
}

$result = mysqli_query($conn,$sql);
$requests = array();

if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        $request['id'] = $row['request_ID'];
        $request['date'] = $row['requestDateFormat'];
        $request['billboard_ID'] = $row['billboard_ID'];
        $request['billboard'] = $row['billboardName'];
        $request['firstName'] = $row['firstName'];
        $request['lastName'] = $row['lastName'];
        $request['displayPerCycle'] = $row['displayPerCycle'];
        $request['artworkName'] = $row['artworkName'];
        $request['artworkURL'] = $config['IMAGE_PATH'] . $row['artworkURL'];
        $request['extension'] = $row['extension'];
        $request['width'] = $row['width'];
        $request['height'] = $row['height'];
        $request['size'] = $row['size'];
        array_push($requests,$request);
    }
} else {
    echo "No results";
}

mysqli_close($conn);

echo json_encode($requests);
?>
