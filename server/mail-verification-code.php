<?php
date_default_timezone_set('Etc/UTC');
require 'vendor/phpmailer/phpmailer/PHPMailerAutoload.php';
$mail = new PHPMailer; 
$config = parse_ini_file('../../config.ini');

	$mail->isSMTP();
    $mail->Host = $config['IP'];
    $mail->Port = $config['PORT'];
    $mail->SMTPAuth = false;
	
	$mail->setFrom('ezbillboards@upr.edu', 'EZBillboards');
	$mail->addAddress('harry.hernandez@upr.edu');
	//$email = $_POST['email'];
	$random = $_POST['random'];
	//The message
    $mail->Subject = 'Ezbillboards Verification Code';
    $mail->Body    = 'Your verification code for your recently created account is: $random ';

//Send email
if (!$mail->send()) {
    echo "Mailer Error: " . $mail->ErrorInfo;
} else {
    echo "Message sent!";
}
?>