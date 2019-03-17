<?php

define('DB_SERVER', 'ezb.uprm.edu');
define('DB_USERNAME', 'ezb');
define('DB_PASSWORD', 'ezb');
define('DB_NAME', 'ezbillboards');
 
$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

$id = $_GET['id'];
$sql = "CALL getUserInfo($id)";
$result = mysqli_query($conn,$sql);

if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        $profile['firstName'] = $row['firstName'];
        $profile['lastName'] = $row['lastName'];
        $profile['email'] = $row['emailAddress'];
        $profile['mobile'] = $row['mobilePhone'];
        $profile['work'] = $row['workPhone'];
        $profile['company'] = $row['companyName'];
        $profile['url'] = $row['companyURL'];
        $profile['facebookURL'] = $row['facebookURL'];
        $profile['instagramURL'] = $row['instagramURL'];
        $profile['twitterURL'] = $row['twitterURL'];
        $profile['address1'] = $row['address1'];
        $profile['address2'] = $row['address2'];
        $profile['city'] = $row['city'];
        $profile['state'] = $row['state'];
        $profile['zipcode'] = $row['zipcode'];
    }
} else {
    echo "No results";
}

mysqli_close($conn);

echo json_encode($profile);
?>
