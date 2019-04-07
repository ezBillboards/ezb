$(document).ready(function(){
	$("#save-db-config").click(function(){
		$.post("../server/administrator-db-config.php",
			{
				server: $("#server").val(),
				username: $("#user").val(),
				password: $("#password").val(),
				dbname: $("#database").val()
			}, function(data, status){
				console.log(data);
		});	
	});
});
