$(document).ready(function(){
	$("#view-profile").click(function(){
		$.get("../server/approver-view-client-profile.php", function(data, status){
			var profile = JSON.parse(data);
			$("#profile-email").text(profile.email);
			$("#profile-mobile").text(profile.mobile);
			$("#profile-work").text(profile.work);
			$("#profile-company").text(profile.company);
			$("#profile-address").text(profile.address);
			$("#profile-url").text(profile.url);
			console.log(profile);
		});
	});
});
