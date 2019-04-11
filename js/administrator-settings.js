$(document).ready(function(){
	$.get("../server/administrator-read-config.php",function(data, status){
		var settings = JSON.parse(data);
		console.log(settings);
		$("#server").val(settings.DB_SERVER);
                $("#user").val(settings.DB_USERNAME);
                $("#password").val(settings.DB_PASSWORD);
                $("#database").val(settings.DB_NAME);
		$("#ip").val(settings.IP);
                $("#port").val(settings.PORT);
                $("#backup").val(settings.BACKUP_PATH);
                $("#image").val(settings.IMAGE_PATH);
                $("#office").val(settings.OFFICE);
                $("#postal").val(settings.POSTAL);
                $("#physical").val(settings.PHYSICAL);
                $("#phone").val(settings.PHONE);
                $("#extension").val(settings.EXTENSION);
                $("#directPhone").val(settings.DIRECT_PHONE);
                $("#fax").val(settings.FAX);
                $("#email").val(settings.EMAIL);
                $("#about").val(settings.ABOUT);
                $("#terms").val(settings.TERMS);
	});

	$(".save-config").click(function(){
		var configCategory = $(this).attr("id");
		if(configCategory == "db"){
			$.post("../server/administrator-save-config.php",
                        {
                                category: configCategory,
                                server: $("#server").val(),
                                username: $("#user").val(),
                                password: $("#password").val(),
                                dbname: $("#database").val(),
                        }, function(data, status){
                                console.log(data);
                	});
		} else if(configCategory == "mail"){
			$.post("../server/administrator-save-config.php",
                        {
                                category: configCategory,
                                ip: $("#ip").val(),
                                port: $("#port").val(),
                        }, function(data, status){
                                console.log(data);
                	});
		} else if(configCategory == "backup"){
			$.post("../server/administrator-save-config.php",
                        {
                                category: configCategory,
                                backupPath: $("#backup").val(),
                        }, function(data, status){
                                console.log(data);
                	});
		} else if(configCategory == "image"){
			$.post("../server/administrator-save-config.php",
                        {
                                category: configCategory,
                                imagePath: $("#image").val(),
                        }, function(data, status){
                                console.log(data);
                	});
		}
	});
	
	$("#save-contact").click(function(){
                $.post("../server/administrator-contact-settings.php",
                        {
                                office:$("#office").val(),
                		postal:$("#postal").val(),
                		physical:$("#physical").val(),
                		phone:$("#phone").val(),
                		extension:$("#extension").val(),
                		directPhone:$("#directPhone").val(),
                		fax:$("#fax").val(),
                		email:$("#email").val()
                        }, function(data, status){
                                console.log(data);
                });
        });

	$("#save-about").click(function(){
                $.post("../server/administrator-about-settings.php",
                        {
                                about: $("#about").val(),
                        }, function(data, status){
                                console.log(data);
                });
        });

	$("#save-terms").click(function(){
                $.post("../server/administrator-terms-settings.php",
                        {
                                terms: $("#terms").val(),
                        }, function(data, status){
                                console.log(data);
                });
        });
});
