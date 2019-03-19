<?php

define('DB_SERVER', 'ezb.uprm.edu');
define('DB_USERNAME', 'ezb');
define('DB_PASSWORD', 'ezb');
define('DB_NAME', 'ezbillboards');
 
$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

$id = $_GET['billboard_ID'];
$sql = "CALL getRejections($id)";
$result = mysqli_query($conn,$sql);
$rejections = array();

if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        array_push($rejections, $row['rejection']);
    }
} else {
    echo "No results";
}

mysqli_close($conn);

echo json_encode($rejections);
?>
