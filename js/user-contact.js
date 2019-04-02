$(document).ready(function(){

	$.get("../server/user-contact.php", function(data, status){
        	var info = JSON.parse(data);
                console.log(info);
                $("#office-hours").text("Office Hours: " + info.office);
                $("#postal").text(info.postal);
                $("#physical").text(info.physical);
                $("#phone").text(info.phone);
                $("#extension").text(info.extension);
                $("#direct-phone").text(info.directPhone);
                $("#fax").text(info.fax);
                $("#email").text(info.email);
        });
	

});
