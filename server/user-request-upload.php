<?php

/* Getting file name */
$filename = $_FILES['upload-image']['name'];

/* Location */
$location = "../../img/requests/".$filename;

$uploadOk = 1;
$imageFileType = pathinfo($location,PATHINFO_EXTENSION);

/* Valid Extensions */
$valid_extensions = array("jpg","jpeg","png");

/* Check file extension */
if( !in_array(strtolower($imageFileType),$valid_extensions) ) {
   $uploadOk = 0;
}

if($uploadOk == 0){
   echo 0;
}else{
   if(move_uploaded_file($_FILES['upload-image']['tmp_name'],$location)){
      	echo "Uploaded";
   }else{
      echo 0;
   }
}
?>
