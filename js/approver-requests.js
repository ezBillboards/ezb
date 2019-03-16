var requests;

getRequests();

$(document).ready(function(){
	$("#view-profile").click(function(){
		$.get("../server/approver-view-client-profile.php", function(data, status){
			var profile = JSON.parse(data);
			$("#profile-name").text(profile.firstName + " " + profile.lastName);
			$("#profile-email").text(profile.email);
			$("#profile-mobile").text(profile.mobile);
			$("#profile-work").text(profile.work);
			$("#profile-company").text(profile.company);
			$("#profile-address1").text(profile.address1);
			$("#profile-address2").text(profile.address2);
			$("#profile-city-state-zipcode").text(profile.city + ", " + profile.state + " " + profile.zipcode);
			$("#profile-url").text(profile.url);
			$("#profile-facebook").attr("href",profile.facebookURL);
			$("#profile-instagram").attr("href",profile.instagramURL);
			$("#profile-twitter").attr("href",profile.twitterURL);
			console.log(profile);
		});
	});
});

function getRequests(){
	$.get("../server/approver-requests.php", function(data, status){
		requests = JSON.parse(data);
		console.log(requests);
	});
}