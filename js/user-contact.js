$(document).ready(function(){
/*******************
*Get Map background
********************/
	$.get("../server/get-image-path.php", function(data, status){
                $("#map").attr("src", data + "img/ezb/Map.jpg");
        });

/************************
*Get contact information
*from Db
*************************/
	$.get("../server/user-contact.php", function(data, status){
        	var info = JSON.parse(data);
                $("#office-hours").append(info.office);
                $("#postal").text(info.postal);
                $("#physical").text(info.physical);
                $("#phone").text(info.phone);
                $("#extension").text(info.extension);
                $("#direct-phone").text(info.directPhone);
                $("#fax").text(info.fax);
                $("#email").text(info.email);

		$("#footer-physical").text(info.physical);
		$("#footer-email").text(info.email);
		$("#footer-phone").text(info.phone);
		$("#footer-extension").text(info.extension);
        });
	

});
