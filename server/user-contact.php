<?php

define('DB_SERVER', 'ezb.uprm.edu');
define('DB_USERNAME', 'ezb');
define('DB_PASSWORD', 'ezb');
define('DB_NAME', 'ezbillboards');
 
$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

$sql = "CALL getContact()";
$result = mysqli_query($conn,$sql);

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
?>