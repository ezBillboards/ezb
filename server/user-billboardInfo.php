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

$id = $_GET['id'];
$sql = "CALL getBillboardInfo($id)";
$result = mysqli_query($conn,$sql);

if (mysqli_num_rows($result) > 0) {
	while($row = mysqli_fetch_assoc($result)) {
		$info['img'] = $config['IMAGE_PATH'] . $row['billboardImage_URL'];
		$info['name'] = $row['billboardName'];
		$info['width'] = $row['width'];
		$info['height'] = $row['height'];
		$info['latitude'] = $row['latitude'];
		$info['longitude'] = $row['longitude'];
		$info['readTime'] = $row['readTime'];
		$info['impressions'] = $row['impressions'];
		$info['traffic'] = $row['traffic'];
		$info['minWidth'] = $row['minWidthRes'];
		$info['minHeight'] = $row['minHeightRes'];
		$info['maxWidth'] = $row['maxWidthRes'];
		$info['maxHeight'] = $row['maxHeightRes'];
		$info['extensions'] = $row['imageExtension'];
		$info['ratios'] = $row['imageRatio'];
	}
} else {
	echo "No results";
}

mysqli_close($conn);

echo json_encode($info);
?>
