$(document).ready(function(){
	$("button").click(function(){
		$.get("approver-view-client-profile.php", function(data, status){
                        var profile = JSON.parse(data);
                        $("#profile-email").text(profile.email);
			console.log(profile);
		});
	});
});
