<?php

$settings = parse_ini_file('../../../config.ini');

define('DB_SERVER', $settings['DB_SERVER']);
define('DB_USERNAME', $settings['DB_USERNAME']);
define('DB_PASSWORD', $settings['DB_PASSWORD']);
define('DB_NAME', $settings['DB_NAME']);

$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

$sql = "CALL getContact()";
$result = mysqli_query($conn,$sql);

if (mysqli_num_rows($result) > 0) {
	$row = mysqli_fetch_assoc($result);
        $settings['OFFICE'] = $row['officeHours'];
        $settings['POSTAL'] = $row['postalAddress'];
        $settings['PHYSICAL'] = $row['physicalAddress'];
        $settings['PHONE'] = $row['phone'];
        $settings['EXTENSION'] = $row['extensions'];
        $settings['DIRECT_PHONE'] = $row['directPhone'];
        $settings['FAX'] = $row['fax'];
        $settings['EMAIL'] = $row['email'];
} else {
    echo "No results";
}

mysqli_close($conn);

$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

$sql = "CALL getSettings()";
$result = mysqli_query($conn,$sql);

if (mysqli_num_rows($result) > 0) {
	$row = mysqli_fetch_assoc($result);
	$settings['ABOUT'] = $row['about'];
	$settings['TERMS'] = $row['terms'];
} else {
    echo "No results";
}

mysqli_close($conn);

echo json_encode($settings);

?>
