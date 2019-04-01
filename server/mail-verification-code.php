<?php


//$email = $_POST['email'];
$random = $_POST['random'];
//The message
$msg = "Your verification code is: " + $random + " ";

$msg = wordwrap($msg,70);

//Send email
mail("felix.gonzalez3@upr.edu",Ezbillboards Verification code,$msg);
?>