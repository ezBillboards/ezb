<?php

$config = parse_ini_file('../../../config.ini');

if(strpos($_SERVER['HTTP_REFERER'], $config['SERVER']) == false){
        header('HTTP/1.1 403 Forbidden');
        exit;
} else{

date_default_timezone_set('Etc/UTC');
require 'vendor/phpmailer/phpmailer/PHPMailerAutoload.php';

define('DB_SERVER', $config['DB_SERVER']);
define('DB_USERNAME', $config['DB_USERNAME']);
define('DB_PASSWORD', $config['DB_PASSWORD']);
define('DB_NAME', $config['DB_NAME']);

/*************************************
*Post email and temporary password
*send an email telling which password
*is the temporary one
**************************************/
$emailAddress = $_POST['emailAddress'];
$tempPassword = $_POST['tempPassword'];

$mail = new PHPMailer; 
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

}
?>
