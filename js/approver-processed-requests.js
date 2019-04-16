/*approver processes requests JavaScript*/
var requests;
var tab = 'Approved';
var currentRequestIndex;
var currentRequestID;

getApprovedRequests();

$(document).ready(function(){
  $(".nav-tabs a").click(function(){
    $(this).tab('show');
	tab = $(this).text();
	if(tab === 'Approved')
		getApprovedRequests();
	else if(tab === 'Denied')
		getDeniedRequests();
	else
		getCancelledRequests();
  });
  
  $("#searchApproved").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#approved-requests tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

  $("#searchDenied").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#denied-requests tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

  $("#searchCancelled").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#cancelled-requests tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
  
});

function getApprovedRequests(){
	$.get("../server/approver-approved-requests.php",function(data,status){
		requests = JSON.parse(data);
		currentRequestIndex = 0;
		$("#approved-requests").empty();
		for(var i = 0; i < requests.length; i++){
			var request = "<tr>" +
			"<td class=\"text-center\" style=\"text-align: center;vertical-align: middle;\"><img class=\"img-rounded processed-requests-images\"  src =\""+ requests[i].artworkURL + "\"></img> " +
			"</td> " +
			"<td style=\"vertical-align: middle;\">" +
			"<p><b>Request ID: </b>" + requests[i].id +
			"</p>" +
			"<p><b>Request Date: </b>" + requests[i].reqDate +
			"</p>" +
			"<p><b>Requested By: </b>" + requests[i].firstName + " " + requests[i].lastName +
			"</p>" +
			"<p><b>Image: </b>"  + requests[i].artworkName + "." + requests[i].extension +
			"</p>" +
			"</td> " +
			"<td style=\"vertical-align: middle;\">" +
			"<p><b>Approved Date: </b>" + requests[i].approveDate +
			"</p>" +
			"<p><b>Approved By: </b>" + requests[i].approverFirstName + " " + requests[i].approverLastName +
			"</p>" +
			"</td> " +
			"<td class=\"text-center\" style=\"text-align: center;vertical-align: middle;\">" +
			"<span id =\"" + requests[i].id +"\" onclick=\"viewProfile(this)\" class=\"glyphicon glyphicon-user\" data-toggle=\"modal\" data-target=\"#myModal\" style=\"font-size: 35px;padding-right:5%;color:#2D2D2D;\"><br><p style=\"font-size: 14px;\"><b><i>Profile</b></i></p></span>" +
			"<span id =\"" + requests[i].id +"\" onclick=\"cancelRequest(this)\" class=\"glyphicon glyphicon-remove\" style=\"font-size: 35px;padding-left:5%;color:#2D2D2D;\"><br><p style=\"font-size: 14px;\"><b><i>Cancel</b></i></p></span>" +
			"</td> " +
			"</tr>";
			$("#approved-requests").append(request);
			
		}
	});
}

function getDeniedRequests(){
		$.get("../server/approver-denied-requests.php",function(data,status){
		requests = JSON.parse(data);
		currentRequestIndex = 0;
		$("#denied-requests").empty();
		for(var i = 0; i < requests.length; i++){
			var request = "<tr>" +
			"<td class=\"text-center\" style=\"text-align: center;vertical-align: middle;\"><img class=\"img-rounded processed-requests-images\"  src =\""+ requests[i].artworkURL + "\"></img> " +
			"</td> " +
			"<td style=\"vertical-align: middle;\">" +
			"<p><b>Request ID: </b>" + requests[i].id +
			"</p>" +
			"<p><b>Request Date: </b>" + requests[i].reqDate +
			"</p>" +
			"<p><b>Requested By: </b>" + requests[i].firstName + " " + requests[i].lastName +
			"</p>" +
			"<p><b>Image: </b>"  + requests[i].artworkName + "." + requests[i].extension +
			"</p>" +
			"</td> " +
			"<td style=\"vertical-align: middle;\">" +
			"<p><b>Denied Date: </b>" + requests[i].deniedDate +
			"</p>" +
			"<p><b>Denied By: </b>" + requests[i].approverFirstName + " " + requests[i].approverLastName +
			"</p>" +
			"<p><b>Comments: </b>" + requests[i].comments +
			"</p>" +
			"</td> " +
			"<td class=\"text-center\" style=\"text-align: center;vertical-align: middle;\">" +
			"<span id =\"" + requests[i].id +"\" onclick=\"viewProfile(this)\" class=\"glyphicon glyphicon-user\" data-toggle=\"modal\" data-target=\"#myModal\" style=\"font-size: 35px;color:#2D2D2D;\"><br><p style=\"font-size: 14px;\"><b><i>Profile</b></i></p></span>" +
			"</td> " +
			"</tr>";
			$("#denied-requests").append(request);
			
		}
	});
}

function getCancelledRequests(){
		$.get("../server/approver-cancelled-requests.php",function(data,status){
		requests = JSON.parse(data);
		currentRequestIndex = 0;
		$("#cancelled-requests").empty();
		for(var i = 0; i < requests.length; i++){
			var request = "<tr>" +
			"<td class=\"text-center\" style=\"text-align: center;vertical-align: middle;\"><img class=\"img-rounded processed-requests-images\"  src =\""+ requests[i].artworkURL + "\"></img> " +
			"</td> " +
			"<td style=\"vertical-align: middle;\">" +
			"<p><b>Request ID: </b>" + requests[i].id +
			"</p>" +
			"<p><b>Request Date: </b>" + requests[i].reqDate +
			"</div>" +
			"<p><b>Requested By: </b>" + requests[i].firstName + " " + requests[i].lastName +
			"</p>" +
			"<p><b>Image: </b>" + requests[i].artworkName + "." + requests[i].extension +
			"</p>" +
			"</td> " +
			"<td style=\"vertical-align: middle;\">" +
			"<p><b>Cancelled Date: </b>" + requests[i].deniedDate +
			"</p>" +
			"<p><b>Cancelled By: </b>" + requests[i].approverFirstName + " " + requests[i].approverLastName +
			"</p>" +
			"<p><b>Comments: </b>" + requests[i].comments +
			"</p>" +
			"</td> " +
			"<td class=\"text-center\" style=\"text-align: center;vertical-align: middle;\">" +
			"<span id =\"" + requests[i].id +"\" onclick=\"viewProfile(this)\" class=\"glyphicon glyphicon-user\" data-toggle=\"modal\" data-target=\"#myModal\" style=\"font-size: 35px;color:#2D2D2D;\"><br><p style=\"font-size: 14px;\"><b><i>Profile</b></i></p></span>" +
			"</td> " +
			"</tr>";
			$("#cancelled-requests").append(request);
			
		}
	});
} 

function viewProfile(item){
	currentRequestID = $(item).attr("id");
	$.get("../server/approver-view-client-profile.php", {id:currentRequestID}, function(data, status){
		var profile = JSON.parse(data);
		$("#profile-name").text(profile.firstName + " " + profile.lastName);
		$("#profile-email").text(profile.email);
		$("#profile-mobile").text(profile.mobile);
		$("#profile-work").text(profile.work);
		$("#profile-company").text(profile.company);
		$("#profile-address").text(profile.address1 + " " + profile.address2 + " " + profile.city + ", " + profile.state + " " + profile.zipcode);
		$("#profile-url").text(profile.url);
		$("#profile-facebook").attr("href",profile.facebookURL);
		$("#profile-instagram").attr("href",profile.instagramURL);
		$("#profile-twitter").attr("href",profile.twitterURL);
		console.log(profile);
	});
}

function cancelRequest(item){
	currentRequestID = $(item).attr("id");
	console.log(currentRequestID);
	$.post("../server/approver-cancel-request.php",{id:currentRequestID},
		function(data, status){
			if(status === "success"){
				location.reload();
			} else {
				alert("Error cancelling request!");
			}
			console.log(data);
			console.log(status);
		});
}
