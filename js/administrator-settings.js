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

	$("#save-contact").click(function(){
                $.post("../server/administrator-contact-settings.php",
                        {
                                office: $("#office").val(),
                                postal: $("#postal").val(),
                                physical: $("#physical").val(),
                                phone: $("#phone").val(),
                                extension: $("#extension").val(),
                                directPhone: $("#directPhone").val(),
                                fax: $("#fax").val(),
                                email: $("#email").val(),
                        }, function(data, status){
                                console.log(data);
                });
        });

	$("#save-about").click(function(){
                $.post("../server/administrator-about-settings.php",
                        {
                                about: $("#about").val()
                        }, function(data, status){
                                console.log(data);
                });
        });

	$("#save-terms").click(function(){
                $.post("../server/administrator-terms-settings.php",
                        {
                                terms: $("#terms").val()
                        }, function(data, status){
                                console.log(data);
                });
        });

});
