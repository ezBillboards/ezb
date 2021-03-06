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

$sql = "CALL getContact()";
$result = mysqli_query($conn,$sql);

/*************************************
*Get information from the DB
*about the user contact
**************************************/
if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
	$info['office'] = $row['officeHours'];
	$info['postal'] = $row['postalAddress'];
	$info['physical'] = $row['physicalAddress'];
	$info['phone'] = $row['phone'];
	$info['extension'] = $row['extensions'];
	$info['directPhone'] = $row['directPhone'];
	$info['fax'] = $row['fax'];
	$info['email'] = $row['email'];
    }
} else {
    echo "No results";
}

mysqli_close($conn);

echo json_encode($info);
}
?>
