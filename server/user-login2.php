<?php
define('DB_SERVER', 'ezb.uprm.edu');
define('DB_USERNAME', 'ezb');
define('DB_PASSWORD', 'ezb');
define('DB_NAME', 'ezbillboards');
 
$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

$sql = "call getLoginUser( 'example@publisher.com');";
$sql .= "call getLoginApprover( 'example@publisher.com');";
$sql .= "call getLoginPublisher( 'example@publisher.com');";
$sql .= "call getLoginAdmin( 'example@publisher.com')";
$counter = 1;

// Execute multi query
if (mysqli_multi_query($conn,$sql))
{
  do
    {
    // Store first result set
    if ($result=mysqli_store_result($conn)) {
      // Fetch one and one row
      if ($row=mysqli_fetch_row($result))
        {
        $request['id'] = $row['ID'];
		$request['role_ID'] = $counter
        }else{
	echo "Not Found!!!";
	}
      // Free result set
      mysqli_free_result($result);
      }
	$counter++;
    }
  while (mysqli_next_result($conn));
}

echo $counter;
mysqli_close($conn);
?>
