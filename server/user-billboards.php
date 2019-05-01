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

$sql = "CALL getBillboards()";
$result = mysqli_query($conn,$sql);
$billboards = array();

if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
	$billboard['id'] = $row['billboard_ID'];
	$billboard['img'] = $config['IMAGE_PATH'] . $row['billboardImage_URL'];
	$billboard['name'] = $row['billboardName'];
	$billboard['description'] = $row['billboardDescription'];
	$billboard['extensions'] = $row['imageExtension'];
	$billboard['ratios'] = $row['imageRatio'];
	$billboard['minWidth'] = $row['minWidthRes'];
	$billboard['minHeight'] = $row['minHeightRes'];
        array_push($billboards, $billboard);
    }
}

mysqli_close($conn);

echo json_encode($billboards);
?>
