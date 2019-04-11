<?php

define('DB_SERVER', 'ezb.uprm.edu');
define('DB_USERNAME', 'ezb');
define('DB_PASSWORD', 'ezb');
define('DB_NAME', 'ezbillboards');
 
$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

$terms = $_POST['terms'];

echo $terms;

$sql = "CALL putTerms('$terms')";

if (mysqli_query($conn, $sql)) {
        echo "Record updated successfully";
} else {
        echo "Error updating record: " . mysqli_error($conn);
}

mysqli_close($conn);

?>

