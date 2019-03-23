/*approver processes requests JavaScript*/
var requests;
var tab = 'Approved';
var currentRequestIndex;

getApprovedRequests();



$(document).ready(function(){
  $(".nav-tabs a").click(function(){
    $(this).tab('show');
	tab = $(this).text();
	if(tab == 'Approved')
		getApprovedRequests();
	else if(tab == 'Denied')
		getDeniedRequests();
	else
		getCancelledRequests();
  });
  
  $("#mySearch").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#"+ tab +" tbody tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
  
  $("#view-profile").click(function(){
		$.get("../server/approver-view-client-profile.php", {id:requests[currentRequestIndex].id}, function(data, status){
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


function getApprovedRequests(){
	$.get("../server/approver-approved-requests.php",function(data,status){
		requests = JSON.parse(data);
		currentRequestIndex = 0;
		$("#approved-requests").empty();
		for(var i = 0; i < requests.length; i++){
			var request = "<tr>" +
			"<td><img class=\"img-rounded processed-requests-images\"  src =\""+ requests[i].artworkURL + "\"></img> " +
			"</td> " +
			"<td>" +
			"<div>Request ID:" + requests[i].id + "" +
			"</div>" +
			"<div>Request Date: " + requests[i].reqDate +"" +
			"</div>" +
			"<div>Requested by: " + requests[i].firstName + " " + requests[i].lastName +"" +
			"</div>" +
			"<div>Image: "  + requests[i].artworkName + "." + requests[i].extension + ""+
			"</div>" +
			"</td> " +
			"<td>" +
			"<div>Approved Date: " + requests[i].approveDate +"" +
			"</div>" +
			"<div>Approved by: " + requests[i].approverFirstName + " " + requests[i].approverLastName +"" +
			"</div>" +
			"</td> " +
			"<td>" +
			"<button type=\"button\" id=\"view-profile\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#myModal\"><span class=\"glyphicon glyphicon-user\"></span>View client profile" +
			"</button>" +
			"<button type=\"button\" class=\"btn btn-danger\">Cancel Request" +
			"</button>" +
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
		for(var i = 0; i < requests.length; i++){
			var request = "<tr>" +
			"<td><img class=\"img-rounded processed-requests-images\"  src =\""+ requests[i].artworkURL + "\"></img> " +
			"</td> " +
			"<td>" +
			"<div>Request ID:" + requests[i].id + "" +
			"</div>" +
			"<div>Request Date: " + requests[i].reqDate +"" +
			"</div>" +
			"<div>Requested by: " + requests[i].firstName + " " + requests[i].lastName +"" +
			"</div>" +
			"<div>Image: "  + requests[i].artworkName + "." + requests[i].extension + ""+
			"</div>" +
			"</td> " +
			"<td>" +
			"<div>Denied Date: " + requests[i].deniedDate +"" +
			"</div>" +
			"<div>Denied by: " + requests[i].approverFirstName + " " + requests[i].approverLastName +"" +
			"</div>" +
			"<div>Comments: " + requests[i].comments +"" +
			"</div>" +
			"</td> " +
			"<td>" +
			"<button type=\"button\" id=\"view-profile\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#myModal\"><span class=\"glyphicon glyphicon-user\"></span>View client profile" +
			"</button>" +
			"</td> " +
			"</tr>";
			$("#denied-requests").append(request);
			
		}
	});
}

function getCancelledRequests(){
		$.get("../server/approver-denied-requests.php",function(data,status){
		requests = JSON.parse(data);
		currentRequestIndex = 0;
		for(var i = 0; i < requests.length; i++){
			var request = "<tr>" +
			"<td><img class=\"img-rounded processed-requests-images\"  src =\""+ requests[i].artworkURL + "\"></img> " +
			"</td> " +
			"<td>" +
			"<div>Request ID:" + requests[i].id + "" +
			"</div>" +
			"<div>Request Date: " + requests[i].reqDate +"" +
			"</div>" +
			"<div>Requested by: " + requests[i].firstName + " " + requests[i].lastName +"" +
			"</div>" +
			"<div>Image: "  + requests[i].artworkName + "." + requests[i].extension + ""+
			"</div>" +
			"</td> " +
			"<td>" +
			"<div>Denied Date: " + requests[i].deniedDate +"" +
			"</div>" +
			"<div>Denied by: " + requests[i].approverFirstName + " " + requests[i].approverLastName +"" +
			"</div>" +
			"<div>Comments: " + requests[i].comments +"" +
			"</div>" +
			"</td> " +
			"<td>" +
			"<button type=\"button\" id=\"view-profile\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#myModal\"><span class=\"glyphicon glyphicon-user\"></span>View client profile" +
			"</button>" +
			"</td> " +
			"</tr>";
			$("#denied-requests").append(request);
			
		}
	});
} 

