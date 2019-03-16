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
		for (var i = 0; i < 0; i++) {
			var request = "<a href=\"#\" class=\"list-group-item\">" +
        					"<div class=\"row request-queue-info\">" +
          						"<div class=\"col-lg-3\">" +
            						"<img src=\"pepsi.jpg\" class=\"img-rounded request-queue-images\" alt=\"Pepsi\">" +
          						"</div>" +
          						"<div class=\"col-lg-9\">" +
            						"<div class=\"row request-queue-info\">" +
              							"<div class=\"col-lg-6\"  style=\"padding-right: 0.5%;\">" +
                							"<h4 class=\"list-group-item-heading text-right\" style=\"font-weight:bold;\">Request ID: </h4>" +
              							"</div>" +
              							"<div class=\"col-lg-6 text-left\" style=\"padding-left: 0.5%;\">" +
                							"<h4 class=\"list-group-item-heading checkbox-text\" style=\"font-weight:normal;\"> 20190305080323</h4>" +
              							"</div>" +
            						"</div>" +
            						"<div class=\"row\">" +
              							"<div class=\"col-lg-7\">" +
                							"<p class=\"list-group-item-text\">Main Entrance Billboard</p>" +
                							"<p class=\"list-group-item-text\">Pedro Rivera</p>" +
              							"</div>" +
              							"<div class=\"col-lg-5\">" +
                							"<p class=\"list-group-item-text\">Every 4 minutes</p>" +
                							"<p class=\"list-group-item-text\">3/5/2019</p>" +
              							"</div>" +
            						"</div>" +
          						"</div>" +
        					"</div>" +
      					   "</a>";
			$("#request-queue").append(request);	
		}
		
		console.log(requests);
	});
}