$(document).ready(function(){
	$.get("../server/get-image-path.php", function(data, status){
                $("#rectory").attr("src", data + "img/ezb/Rectoria.jpg");
        });
	
	$.get("../server/user-about.php", function(data, status){
                $("#about").html(data);
        });
});
