<?php

$config = parse_ini_file('../../../config.ini');

if(strpos($_SERVER['HTTP_REFERER'], $config['SERVER']) == false){
        header('HTTP/1.1 403 Forbidden');
        exit;
} else{


	/*************************************
	*Mail Setup, sends email about 
	*verification code creation
	**************************************/
	require_once('./logger.php');
	date_default_timezone_set('Etc/UTC');
	require 'vendor/phpmailer/phpmailer/PHPMailerAutoload.php';
	$mail = new PHPMailer; 
	$config = parse_ini_file('../../../config.ini');
		$emailAddress = $_POST['emailAddress'];
		$random = $_POST['random'];
		
		$mail->isSMTP();
		$mail->Host = $config['IP'];
		$mail->Port = $config['PORT'];
		$mail->SMTPAuth = false;
		
		$mail->setFrom('ezbillboards@upr.edu', 'EZBillboards');
		$mail->addAddress($emailAddress);
		
		//The message
		$mail->Subject = 'EZBillboards Verification Code';
		$mail->Body    = 'Your verification code for your recently created account is: ' .  $random;

	//Send email
	if (!$mail->send()) {
		logger($emailAddress, "VERIFICATION CODE", "Error sending verification code: " . $mail->ErrorInfo);
	} else {
		logger($emailAddress, "VERIFICATION CODE", "Verification code " . $random . " has been sent to " . $emailAddress );
	}
}
?>
