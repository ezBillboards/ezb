<?php

define('DB_SERVER', 'ezb.uprm.edu');
define('DB_USERNAME', 'ezb');
define('DB_PASSWORD', 'ezb');
define('DB_NAME', 'ezbillboards');

$emailAddress = $_POST['emailAddress'];
$tempPassword = $_POST['tempPassword'];

date_default_timezone_set('Etc/UTC');
require 'vendor/phpmailer/phpmailer/PHPMailerAutoload.php';
$mail = new PHPMailer; 
$config = parse_ini_file('../../config.ini');
$mail->isSMTP();
$mail->Host = $config['IP'];
$mail->Port = $config['PORT'];
$mail->SMTPAuth = false;

$mail->setFrom('ezbillboards@upr.edu', 'EZBillboards');
$mail->addAddress($emailAddress);

$mail->Subject = 'Ezbillboards Temporary Password';
$mail->Body    = 'Your temporary password is: ' .  $tempPassword;
 
$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}


$sql = "call putTempPsswd('$emailAddress','$tempPassword')";

if (mysqli_query($conn, $sql)) {
    			echo "Record updated successfully";
				//Send email
				if (!$mail->send()) {
					echo "Mailer Error: " . $mail->ErrorInfo;
				} else {
					echo "Message sent!";
				}
		} else {
    			echo "Error updating record: " . mysqli_error($conn);
		}
mysqli_close($conn);


?>