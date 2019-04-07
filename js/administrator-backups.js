$(document).ready(function(){
	$("#backup").click(function(){
		$.post("../server/administrator-backups.php",{filename:$("#filename").val()}, function(data,status){
	                console.log(data);
        	});
	});
});

