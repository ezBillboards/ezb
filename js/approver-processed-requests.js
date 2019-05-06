/*approver processes requests JavaScript*/
var requests;
var tab = 'Approved';
var currentRequestIndex;
var currentRequestID;


/**************
*Sleep Setter
***************/
setTimeout(function(){
	getApprovedRequests();
},100);


/***************************************
*Check which Request is the HTML looking for
*Approved
*Denied
*Cancelled
****************************************/
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

/**************
*Get EZB logos
***************/
  $.get("../server/get-image-path.php", function(data, status){
	$("#tab-logo").attr("href", data + "img/ezb/EZBillboardsLeftLogo.png");
  	$("#ezb-logo").attr("src", data + "img/ezb/EZBillboardsLogo.png");
  });
  
/**************************************************
*Search bar takes the approved artwork and performs
*toLowerCase method and looks
*for the result on the DB
***************************************************/
  $("#searchApproved").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#approved-requests tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

/**************************************************
*Search bar takes the denied artwork and performs
*toLowerCase method and looks
*for the result on the DB
***************************************************/
  $("#searchDenied").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#denied-requests tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

/**************************************************
*Search bar takes the cancelled artwork and performs
*toLowerCase method and looks
*for the result on the DB
***************************************************/
  $("#searchCancelled").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#cancelled-requests tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
  
});


/*************************
*Approved Request Getter
*Takes JSON from de DB
*And appends information
*as an HTML to the view
*************************/
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
			"<p><b>Requested By: </b>" + decrypt(requests[i].firstName) + " " +decrypt(requests[i].lastName) +
			"</p>" +
			"<p><b>Image: </b>"  + requests[i].artworkName + "." + requests[i].extension +
			"</p>" +
			"</td> " +
			"<td style=\"vertical-align: middle;\">" +
			"<p><b>Approved Date: </b>" + requests[i].approveDate +
			"</p>" +
			"<p><b>Approved By: </b>" + decrypt(requests[i].approverFirstName) + " " + decrypt(requests[i].approverLastName) +
			"</p>" +
			"</td> " +
			"<td class=\"text-center\" style=\"text-align: center;vertical-align: middle;\">" +
			"<span id =\"" + requests[i].id +"\" onclick=\"viewProfile(this)\" class=\"clickable glyphicon glyphicon-user\" data-toggle=\"modal\" data-target=\"#myModal\" style=\"font-size: 35px;padding-right:5%;color:#2D2D2D;\"><br><p style=\"font-size: 14px;\"><b><i>Profile</b></i></p></span>" +
			"<span id =\"" + requests[i].id +"\" onclick=\"cancelling(this)\" class=\"clickable glyphicon glyphicon-remove\" style=\"font-size: 35px;padding-left:5%;color:#2D2D2D;\"><br><p style=\"font-size: 14px;\"><b><i>Cancel</b></i></p></span>" +
			"</td> " +
			"</tr>";
			$("#approved-requests").append(request);
			
		}
	});
}

/*************************
*Denied Request Getter
*Takes JSON from de DB
*And appends information
*as an HTML to the view
*************************/
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
			"<p><b>Requested By: </b>" + decrypt(requests[i].firstName) + " " + decrypt(requests[i].lastName) +
			"</p>" +
			"<p><b>Image: </b>"  + requests[i].artworkName + "." + requests[i].extension +
			"</p>" +
			"</td> " +
			"<td style=\"vertical-align: middle;\">" +
			"<p><b>Denied Date: </b>" + requests[i].deniedDate +
			"</p>" +
			"<p><b>Denied By: </b>" + decrypt(requests[i].approverFirstName) + " " + decrypt(requests[i].approverLastName) +
			"</p>" +
			"<p><b>Comments: </b>" + ((requests[i].comments != "" && requests[i].comments != null) ? requests[i].comments : "No comments") +
			"</p>" +
			"</td> " +
			"<td class=\"text-center\" style=\"text-align: center;vertical-align: middle;\">" +
			"<span id =\"" + requests[i].id +"\" onclick=\"viewProfile(this)\" class=\"clickable glyphicon glyphicon-user\" data-toggle=\"modal\" data-target=\"#myModal\" style=\"font-size: 35px;color:#2D2D2D;\"><br><p style=\"font-size: 14px;\"><b><i>Profile</b></i></p></span>" +
			"</td> " +
			"</tr>";
			$("#denied-requests").append(request);
			
		}
	});
}

/*************************
*Cancelled Request Getter
*Takes JSON from de DB
*And appends information
*as an HTML to the view
*************************/
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
			"<p><b>Requested By: </b>" + decrypt(requests[i].firstName) + " " + decrypt(requests[i].lastName) +
			"</p>" +
			"<p><b>Image: </b>" + requests[i].artworkName + "." + requests[i].extension +
			"</p>" +
			"</td> " +
			"<td style=\"vertical-align: middle;\">" +
			"<p><b>Cancelled Date: </b>" + requests[i].cancelledDate +
			"</p>" +
			"<p><b>Cancelled By: </b>" + decrypt(requests[i].cancelFirstName) + " " + decrypt(requests[i].cancelLastName) +
			"</p>" +
			"<p><b>Comments: </b>" + ((requests[i].comments != "" && requests[i].comments != null) ? requests[i].comments : "No comments") +
			"</p>" +
			"</td> " +
			"<td class=\"text-center\" style=\"text-align: center;vertical-align: middle;\">" +
			"<span id =\"" + requests[i].id +"\" onclick=\"viewProfile(this)\" class=\"clickable glyphicon glyphicon-user\" data-toggle=\"modal\" data-target=\"#myModal\" style=\"font-size: 35px;color:#2D2D2D;\"><br><p style=\"font-size: 14px;\"><b><i>Profile</b></i></p></span>" +
			"</td> " +
			"</tr>";
			$("#cancelled-requests").append(request);
			
		}
	});
} 


/*************************
*Get profile infomation
*receive by the parameter
*on the function
*************************/
function viewProfile(item){
	currentRequestID = $(item).attr("id");
	$.get("../server/approver-view-client-profile.php", {id:currentRequestID}, function(data, status){
		var profile = JSON.parse(data);
                        $("#profile-name").text((decrypt(profile.firstName) != "" && decrypt(profile.firstName) != null) ? decrypt(profile.firstName) + " " + decrypt(profile.lastName) : "N/A");
                        $("#profile-email-modal").text((profile.email != "" && profile.email != null) ? profile.email : "N/A");
                        $("#profile-mobile").text((decrypt(profile.mobile) != "" && decrypt(profile.mobile) != null) ? decrypt(profile.mobile) : "N/A");
                        $("#profile-work").text((decrypt(profile.work) != "" && decrypt(profile.work) != null) ? decrypt(profile.work) : "N/A");
                        $("#profile-company").text((decrypt(profile.company) != "" && decrypt(profile.company) != null) ? decrypt(profile.company) : "N/A");
                        $("#profile-address").text(((decrypt(profile.address1) == "" && decrypt(profile.address2) == "" && decrypt(profile.city) == "" && decrypt(profile.state) == "" && decrypt(profile.zipcode) == "") || (decrypt(profile.address1) == null && decrypt(profile.address2) == null && decrypt(profile.city) == null && decrypt(profile.state) == null && decrypt(profile.zipcode) == null)) ? decrypt(profile.address1) + " " + decrypt(profile.address2) + " " + decrypt(profile.city) + " " + decrypt(profile.state) + " " + decrypt(profile.zipcode) : "N/A");
                        $("#profile-url").text((decrypt(profile.url) != "" && decrypt(profile.url) != null) ? decrypt(profile.url) : "N/A");
                        $("#profile-facebook").attr("href",decrypt(profile.facebookURL));
                        $("#profile-instagram").attr("href",decrypt(profile.instagramURL));
                        $("#profile-twitter").attr("href",decrypt(profile.twitterURL));
	});
}

/****************************
*Delete request  infomation
*receive by the item parameter
*on the function
*
*@param {string}
****************************/
function cancelling(item){
        currentRequestID = $(item).attr("id");
        console.log('this is the id');
	console.log(currentRequestID);
        $("#cancelModal").modal("show");
}




/************************************************
*Funtion that will delete it from the front end
*and disables the request on the DB
************************************************/
function cancelRequest(){
	console.log(currentRequestID);
	$.post("../server/approver-cancel-request.php",
	{id:currentRequestID,
	cancelId:decrypt(sessionStorage.getItem('ID')),
	emailAddress:decrypt(sessionStorage.getItem('email'))},
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
