/*Publisher paid requests JavaScript*/
var requests;
var currentRequestID;

getPaidRequests();

$(document).ready(function(){
	$.get("../server/get-image-path.php", function(data, status){
		$("#tab-logo").attr("href", data + "img/ezb/EZBillboardsLeftLogo.png");
                $("#ezb-logo").attr("src", data + "img/ezb/EZBillboardsLogo.png");
        });

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
			"<td class=\"text-center\" style=\"text-align: center;vertical-align: middle;\"><img class=\"img-rounded processed-requests-images\"  src =\""+ requests[i].artworkURL + "\"></img> " +
			"</td> " +
			"<td style=\"vertical-align: middle;\">" +
			"<p><b>Billboard Name: </b>" + requests[i].billboard +
			"</p>" +
			"<p><b>Display Per Cycle: </b>" + requests[i].displayPerCycle +
			"</p>" +
			"<p><b>Start Date: </b>" + requests[i].startDate +
			"</p>" +
			"<p><b>End Date: </b>" + requests[i].endDate +
			"</p>" +
			"</td>" +
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
			"<p><b>Payment Date: </b>"  + requests[i].paymentDate +
			"</p>" +
			"</td> " +
			"<td class=\"text-center\" style=\"text-align: center;vertical-align: middle;\">" +
			"<a style=\"color:#2D2D2D;\" href= \"" + requests[i].artworkURL+"\" download =\"" + requests[i].artworkName + "\".\"" + requests[i].extension + "\">" +
			"<span class=\"glyphicon glyphicon-cloud-download\" style=\"font-size: 35px;padding-right:5%;\"><br><p style=\"font-size: 14px;\"><b><i>Download</b></i></p></span>" +
			"</a>" +
			"<span id =\"" + requests[i].id +"\" onclick=\"publishRequest(this)\" class=\"glyphicon glyphicon-ok\" style=\"font-size: 35px;padding-left:5%;color:#2D2D2D;\"><br><p style=\"font-size: 14px;\"><b><i>Publish</b></i></p></span>" +
			"</td> " +
			"</tr>";
			$("#paid-requests").append(request);
			
		}
	});
}

function publishRequest(item){
	currentRequestID = $(item).attr("id");
	console.log(currentRequestID);
	$.post("../server/publisher-publish-request.php",
	{
		id:currentRequestID,
		publisherID:sessionStorage.getItem('ID'),
		publisherEmail:sessionStorage.getItem('email')
	},
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
