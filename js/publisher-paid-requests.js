/*Publisher paid requests JavaScript*/
var requests;
var currentRequestID;

getPaidRequests();

function getPaidRequests(){
	$.get("../server/publisher-paid-requests.php",function(data,status){
		requests = JSON.parse(data);
		$("#paid-requests").empty();
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
			"<button type=\"button\" class=\"btn btn-info\" href= \"" + requests[i].artworkURL+"\" download =\"" + requests[i].artworkName + "\".\"" + requests[i].extension + "\"><span class=\"glyphicon glyphicon-user\"></span>Download Image" +
			"</button>" +
			"<button type=\"button\" onclick=\"publishRequest(this)\" id =\"" + requests[i].id +"\" class=\"btn btn-success\">Publish Request" +
			"</button>" +
			"</td> " +
			"</tr>";
			$("#paid-requests").append(request);
			
		}
	});
}

function publishRequest(item){
	currentRequestID = $(item).attr("id");
	console.log(currentRequestID);
	$.post("../server/publisher-paid-requests.php",{id:currentRequestID},
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
