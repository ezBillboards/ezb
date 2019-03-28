<?php

define('DB_SERVER', 'ezb.uprm.edu');
define('DB_USERNAME', 'ezb');
define('DB_PASSWORD', 'ezb');
define('DB_NAME', 'ezbillboards');
 
$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

$sql = "CALL getBillboards()";
$result = mysqli_query($conn,$sql);
$billboards = array();

if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
	$billboard['id'] = $row['billboard_ID'];
	$billboard['img'] = $row['billboardImage_URL'];
	$billboard['name'] = $row['billboardName'];
	$billboard['description'] = $row['billboardDescription'];
        array_push($billboards, $billboard);
    }
} else {
    echo "No results";
}

mysqli_close($conn);

echo json_encode($billboards);
?>
