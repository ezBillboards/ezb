<?php

define('DB_SERVER', 'ezb.uprm.edu');
define('DB_USERNAME', 'ezb');
define('DB_PASSWORD', 'ezb');
define('DB_NAME', 'ezbillboards');
 
$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

$emailAddress = $_POST['emailAddress'];
$tempPassword = $_POST['tempPassword'];
$sql = "call putTempPsswd('$emailAddress','$tempPassword')";

if (mysqli_query($conn, $sql)) {
    			echo "Record updated successfully";
		} else {
    			echo "Error updating record: " . mysqli_error($conn);
		}
mysqli_close($conn);

$random = $_POST['random'];
//The message
$sbj = "Ezbillboards Temporary Password";
$msg = "Your temporary password is: $tempPassword ";
$hdr = "From: ezbillboards@ezb.uprm.edu\r\n";

$msg = wordwrap($msg,70);

//Send email
mail("felix.gonzalez3@upr.edu",$sbj,$msg,$hdr);

?>