<?php


//$email = $_POST['email'];
$random = $_POST['random'];
//The message
$sbj = "Ezbillboards Verification code";
$msg = "Your verification code is: $random ";
$hdr = "From: ezbillboards@ezb.uprm.edu\r\n";

$msg = wordwrap($msg,70);

//Send email
mail("felix.gonzalez3@upr.edu",$sbj,$msg,$hdr);
?>