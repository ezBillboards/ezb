<?php

date_default_timezone_set('Etc/UTC');
require 'vendor/phpmailer/phpmailer/PHPMailerAutoload.php';
require_once('./logger.php');

$config = parse_ini_file('../../config.ini');

define('DB_SERVER', $config['DB_SERVER']);
define('DB_USERNAME', $config['DB_USERNAME']);
define('DB_PASSWORD', $config['DB_PASSWORD']);
define('DB_NAME', $config['DB_NAME']);
 
$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
	
$id = $_POST['id'];
$publisherID = $_POST['publisherID'];
$publisherEmail = $_POST['publisherEmail'];

$sql = "CALL putStatusPublisher($id,$publisherID)";

if (mysqli_query($conn, $sql)) {
    logger($publisherEmail,"PUBLISHED REQUEST", "A request with ID #" . $id . " has been published");
    mysqli_close($conn);

    $conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

    if($conn === false){
	    die("ERROR: Could not connect. " . mysqli_connect_error());
    }

    $sql = "CALL getRequestEmail($id)";
    $result = mysqli_query($conn,$sql);

    if (mysqli_num_rows($result) > 0) {
            $info = mysqli_fetch_assoc($result);
            $userEmail = $info['emailAddress'];
    }else {
            logger($publisherEmail,"ERROR EMAIL", "Error while trying to get user email when publishing his request with ID #" . $id);
    }

    mysqli_close($conn);

    $mail = new PHPMailer;
    $mail->isSMTP();
    $mail->Host = $config['IP'];
    $mail->Port = $config['PORT'];
    $mail->SMTPAuth = false;

    $mail->setFrom('ezbillboards@upr.edu', 'EZBillboards');
    $mail->addAddress($userEmail);

    $mail->Subject = 'Your Request Image Has Been Published.';
    $mail->Body    = 'Your request with ID: ' . $id . ' has been scheduled to publish.';

    if (!$mail->send()) {
	    logger($publisherEmail,"ERROR EMAIL SENT", "Error while trying to send email to user when publihing request " . $mail->ErrorInfo);
    } else {
            logger($publisherEmail,"EMAIL SENT", "Email was sent to user " . $userEmail . " to notify his request has been published");
    }
    
} else {
	logger($publisherEmail,"ERROR IN DB","Error creating record when publishing a request: " . mysqli_error($conn));
}

?>
