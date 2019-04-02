$(document).ready(function(){

	$.get("../server/user-about.php", function(data, status){
                $("#about").text(data);
        });
});
