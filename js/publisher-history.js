/*Publisher paid requests JavaScript*/
var requests;
var currentRequestID;

getHistory();

$(document).ready(function(){
	$("#mySearch").on("keyup", function() {
		var value = $(this).val().toLowerCase();
		$("#history tr").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	});
});

function getHistory(){
	$.get("../server/publisher-history.php",function(data,status){
		requests = JSON.parse(data);
		$("#history").empty();
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
                        "</td> " +
			"<td class=\"text-center\" style=\"text-align: center;vertical-align: middle;\">" +
			"<a style=\"color:#2D2D2D;\" href= \"" + requests[i].artworkURL+"\" download =\"" + requests[i].artworkName + "\".\"" + requests[i].extension + "\">" +
			"<span class=\"glyphicon glyphicon-cloud-download\" style=\"font-size: 35px;\"><br><p style=\"font-size: 14px;\"><b><i>Download</b></i></p></span>" +
                        "</a>" +
			"</td> " +
			"</tr>";
			$("#history").append(request);
			
		}
	});
}
