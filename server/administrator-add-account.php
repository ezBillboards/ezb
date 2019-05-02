<?php

if(strpos($_SERVER['HTTP_REFERER'],"ezb.uprm.edu") == false){
        header('HTTP/1.1 403 Forbidden');
        exit;
} else{
	date_default_timezone_set('Etc/UTC');
	require 'vendor/phpmailer/phpmailer/PHPMailerAutoload.php';
	require_once('./logger.php');

	$config = parse_ini_file('../../../config.ini');

	define('DB_SERVER', $config['DB_SERVER']);
	define('DB_USERNAME', $config['DB_USERNAME']);
	define('DB_PASSWORD', $config['DB_PASSWORD']);
	define('DB_NAME', $config['DB_NAME']);
 
	$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
	if($conn === false){
    		die("ERROR: Could not connect. " . mysqli_connect_error());
	}

	$firstName = $_POST['firstName'];
	$lastName = $_POST['lastName'];
	$email = $_POST['email'];
	$tempPass = $_POST['tempPass'];
	$workPhone = $_POST['workPhone'];
	$mobilePhone = $_POST['mobilePhone'];
	$office = $_POST['office'];
	$role = $_POST['role'];
	$adminEmail = $_POST['adminEmail'];

	$roleStr;
	if($role == 0) $roleStr = "Administrator";
	else if($role == 1) $roleStr = "Approver";
	else $roleStr = "Publisher";

	$sql = "CALL postAccountAdmin('$firstName','$lastName','$email','$tempPass','$workPhone','$mobilePhone','$office','$roleStr')";

	if (mysqli_query($conn, $sql)) {
		logger($adminEmail, "CREATE " . strtoupper($roleStr). " ACCOUNT", "An ". $roleStr . " with email " . $email . " has been created");
		$mail = new PHPMailer;
        	$mail->isSMTP();
        	$mail->Host = $config['IP'];
        	$mail->Port = $config['PORT'];
        	$mail->SMTPAuth = false;

        	$mail->setFrom('ezbillboards@upr.edu', 'EZBillboards');
        	$mail->addAddress($email);

		$mail->Subject = 'You Have Been Assigned the '. $roleStr .' Role.';
        	$mail->Body    = 'You have been assigned as a ' . $roleStr . '. Your temporary password is ' . $tempPass;

		if (!$mail->send()) {
			logger($adminEmail, "ERROR EMAIL","Error while trying to send email to " . $roleStr);
        	} else {
        		logger($adminEmail, "EMAIL SENT","Email sent to new " . $roleStr);
        	}
	} else {
		logger($adminEmail,"ERROR IN DB","Error updating record when creating new account: " . mysqli_error($conn));
	}

	mysqli_close($conn);
}
?>
