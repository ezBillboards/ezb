/*Publisher paid requests JavaScript*/
var requests;
var currentRequestID;

getPaidRequests();
//console.log(sessionStorage.getItem('ID'));
//console.log(sessionStorage.getItem('email'));
$(document).ready(function(){
	$("#mySearch").on("keyup", function() {
		var value = $(this).val().toLowerCase();
		$("#paid-requests tr").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	});
});

  
function getPaidRequests(){
	$.get("../server/publisher-paid-requests.php",function(data,status){
		requests = JSON.parse(data);
		$("#paid-requests").empty();
		for(var i = 0; i < requests.length; i++){
			var request = "<tr>" +
			"<td><img class=\"img-rounded processed-requests-images\"  src =\""+ requests[i].artworkURL + "\"></img> " +
			"</td> " +
			"<td>" +
			"<div>Billboard Name:" + requests[i].billboard + "" +
			"</div>" +
			"<div>Display Per Cycle:" + requests[i].displayPerCycle + "" +
			"</div>" +
			"<div>Start Date: " + requests[i].startDate +"" +
			"</div>" +
			"<div>End Date: " + requests[i].endDate +"" +
			"</div>" +
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
			"<a href= \"" + requests[i].artworkURL+"\" download =\"" + requests[i].artworkName + "\".\"" + requests[i].extension + "\">" +
			"<button type=\"button\" class=\"btn btn-info\" ><span class=\"glyphicon glyphicon-user\"></span>Download Image" +
			"</button> </a>" +
			"<button type=\"button\" onclick=\"publishRequest(this)\" id =\"" + requests[i].id +"\" class=\"btn btn-success\">Publish Request" +
			"</button>"
			"</td> " +
			"</tr>";
			$("#paid-requests").append(request);
			
		}
	});
}

function publishRequest(item){
	currentRequestID = $(item).attr("id");
	console.log(currentRequestID);
	$.post("../server/publisher-publish-request.php",{id:currentRequestID},
		function(data, status){
			if(status === "success"){
				location.reload();
			} else {
				alert("Error publishing request!!");
			}
			console.log(data);
			console.log(status);
		});
}
