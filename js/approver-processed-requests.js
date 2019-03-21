/*approver processes requests JavaScript*/
var requests;
var tab = 'Approved';
getApprovedRequests();
getDeniedRequests();
getCancelledRequests();

$(document).ready(function(){
  $(".nav-tabs a").click(function(){
    $(this).tab('show');
	tab = $(this).text();
  });
  
  $("#mySearch").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#"+ tab +" tbody tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});


function getApprovedRequests(){
	$.get("../server/approver-approved-requests.php",function(data,status){
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
			"<div>Approved Date: " + requests[i].approveDate +"" +
			"</div>" +
			"<div>Approved by: " + requests[i].approverFirstName + " " + requests[i].approverLastName +"" +
			"</div>" +
			"</td> " +
			"<td>" +
			"<button type=\"button\" class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-user\"></span>View client profile" +
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
			"<button type=\"button\" class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-user\"></span>View client profile" +
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
			"<button type=\"button\" class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-user\"></span>View client profile" +
			"</button>" +
			"</td> " +
			"</tr>";
			$("#denied-requests").append(request);
			
		}
	});
} 

