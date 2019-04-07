<?php

define('DB_SERVER', 'ezb.uprm.edu');
define('DB_USERNAME', 'ezb');
define('DB_PASSWORD', 'ezb');
define('DB_NAME', 'ezbillboards');
 
$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

$office = $_POST['office'];
$postal = $_POST['postal'];
$physical = $_POST['physical'];
$phone = $_POST['phone'];
$extension = $_POST['extension'];
$directPhone = $_POST['directPhone'];
$fax = $_POST['fax'];
$email = $_POST['email'];

echo $office . " " . $postal . " " . $physical . " " . $phone . " " . $extension . " " . $directPhone . " " . $fax . " " . $email;

/*$sql = "CALL putContactInfo('$office','$postal','$physical','$phone','$extension','$directPhone','$fax','$email')";

if (mysqli_query($conn, $sql)) {
        echo "Record updated successfully";
} else {
        echo "Error updating record: " . mysqli_error($conn);
}
*/
mysqli_close($conn);

?>

