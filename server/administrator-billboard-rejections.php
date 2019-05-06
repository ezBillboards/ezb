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

/*************************************
*Get id from
*DB to send it to the front
*end with the corresponding
*id
*rejection
**************************************/
$id = $_GET['id'];
$Rejections = array();

$sql = "CALL getAdminRejections($id)";
$result = mysqli_query($conn,$sql);

if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
	$Rejection['id'] = $row['reject_ID'];
	$Rejection['rejection'] = $row['rejection'];
    array_push($Rejections, $Rejection);
    }
	echo json_encode($Rejections);
} else {
    echo "No results";
}
mysqli_close($conn);
}
?>
