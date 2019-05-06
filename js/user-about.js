$(document).ready(function(){
/**************
*Get EZB logos
***************/
	$.get("../server/get-image-path.php", function(data, status){
                $("#rectory").attr("src", data + "img/ezb/Rectoria.jpg");
        });

/**************
*Get About info
***************/
	$.get("../server/user-about.php", function(data, status){
                $("#about").html(data);
        });
});
