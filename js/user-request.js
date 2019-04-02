var requests;
var tab = 'Pending';
var currentRequestIndex;
var currentRequestID;

getPendingRequests();

$(document).ready(function(){
  $(".nav-tabs a").click(function(){
    $(this).tab('show');
	tab = $(this).text();
	if(tab === 'Pending')
		getPendingRequests();
	else if(tab === 'Approved')
		getApprovedRequests();
	else if(tab === 'Denied')
		getDeniedRequests();
	else if(tab === 'Cancelled')
		getCancelledRequests();
	else if(tab === 'Paid')
		getPaidRequests();
	else
		getPublishedRequests();
  });
  
  $("#search").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#"+ tab +" tbody tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
  
});

function getPendingRequests(){
        $.get("../server/user-pending-requests.php",function(data,status){
                requests = JSON.parse(data);
		console.log(requests);
                currentRequestIndex = 0;
                $("#pending-requests").empty();
		var request = "";
                for(var i = 0; i < requests.length; i++){
                        request += "<tr>" +
                        "<td class=\"text-center\" style=\"width: 33.33%;text-align: center;\">" +
                        "<div class=\"row\">" +
                                "<div class=\"col-lg-3\" style=\"padding-right: 0;\">" +
                                        "<img class=\"img-rounded request-images\" src=\""+ requests[i].img + "\"></img>" +
                                "</div>" +
                                "<div class=\"col-lg-6 text-left\" style=\"padding-left: 0;\">" +
                                        "<h4>" + requests[i].name + "</h4><h5>" + requests[i].description + "</h5>" +
                                "</div>" +
                        "</div></td>" +
			"<td class=\"text-center\" style=\"width: 33.33%;text-align: center;\">" +
                        "<div>Request ID:" + requests[i].id +
                        "</div>" +
                        "<div>Request Date: " + requests[i].date +
                        "</div>" +
                        "<div>Duration: " + requests[i].duration +
                        "</div>" +
			"<div>Frequency: " + requests[i].frequency +
                        "</div>" +
			"<div>Starting Date: " + requests[i].startingDate +
                        "</div>" +
                        "<div>Image: "  + requests[i].artworkName + "." + requests[i].extension +
                        "</div>" +
                        "</td> " +
                        "<td class=\"text-center\" style=\"vertical-align: middle;width: 33.33%;\">" +
			"<button type=\"button\" onclick=\"cancelRequest(this)\" id =\"" + requests[i].id +"\" class=\"btn btn-danger\">Cancel Request" +
                        "</td>" +
                        "</tr>";
                }
                $("#pending-requests").append(request);
        });
}


function getApprovedRequests(){
	$.get("../server/user-approved-requests.php",function(data,status){
		requests = JSON.parse(data);
		currentRequestIndex = 0;
		$("#approved-requests").empty();
		var request = "";
		for(var i = 0; i < requests.length; i++){
			request += "<tr>" +
                        "<td class=\"text-center\" style=\"width: 33.33%;text-align: center;\">" +
                        "<div class=\"row\">" +
                                "<div class=\"col-lg-3\" style=\"padding-right: 0;\">" +
                                        "<img class=\"img-rounded request-images\" src=\""+ requests[i].img + "\"></img>" +
                                "</div>" +
                                "<div class=\"col-lg-6 text-left\" style=\"padding-left: 0;\">" +
                                        "<h4>" + requests[i].name + "</h4><h5>" + requests[i].description + "</h5>" +
                                "</div>" +
                        "</div></td>" +
                        "<td class=\"text-center\" style=\"width: 33.33%;text-align: center;\">" +
                        "<div>Request ID:" + requests[i].id +
                        "</div>" +
                        "<div>Request Date: " + requests[i].date +
                        "</div>" +
			"<div>Approved Date: " + requests[i].approvedDate +
                        "</div>" +
                        "<div>Duration: " + requests[i].duration +
                        "</div>" +
                        "<div>Frequency: " + requests[i].frequency +
                        "</div>" +
                        "<div>Starting Date: " + requests[i].startingDate +
                        "</div>" +
                        "<div>Image: "  + requests[i].artworkName + "." + requests[i].extension +
                        "</div>" +
			"<div>Comments: " + requests[i].comments +
                        "</div>" +
                        "</td> " +
                        "<td class=\"text-center\" style=\"vertical-align: middle;width: 33.33%;\">" +
                        "<button type=\"button\" onclick=\"payment(this)\" id =\"" + requests[i].id +"\" class=\"btn btn-success\">Pay" +
                        "<button type=\"button\" onclick=\"cancelRequest(this)\" id =\"" + requests[i].id +"\" class=\"btn btn-danger\">Cancel Request" +
			"</td>" +
                        "</tr>";
		}
		$("#approved-requests").append(request);			
	});
}
1
function getDeniedRequests(){
		$.get("../server/user-denied-requests.php",function(data,status){
		requests = JSON.parse(data);
		currentRequestIndex = 0;
		$("#denied-requests").empty();
		var request = "";
		for(var i = 0; i < requests.length; i++){
			request += "<tr>" +
                        "<td class=\"text-center\" style=\"width: 50%;text-align: center;\">" +
                        "<div class=\"row\">" +
                                "<div class=\"col-lg-3\" style=\"padding-right: 0;\">" +
                                        "<img class=\"img-rounded request-images\" src=\""+ requests[i].img + "\"></img>" +
                                "</div>" +
                                "<div class=\"col-lg-6 text-left\" style=\"padding-left: 0;\">" +
                                        "<h4>" + requests[i].name + "</h4><h5>" + requests[i].description + "</h5>" +
                                "</div>" +
                        "</div></td>" +
                        "<td class=\"text-center\" style=\"width: 50%;text-align: center;\">" +
                        "<div>Request ID:" + requests[i].id +
                        "</div>" +
                        "<div>Request Date: " + requests[i].date +
                        "</div>" +
                        "<div>Denial Date: " + requests[i].denialDate +
                        "</div>" +
                        "<div>Duration: " + requests[i].duration +
                        "</div>" +
                        "<div>Frequency: " + requests[i].frequency +
                        "</div>" +
                        "<div>Starting Date: " + requests[i].startingDate +
                        "</div>" +
                        "<div>Image: "  + requests[i].artworkName + "." + requests[i].extension +
                        "</div>" +
                        "<div>Comments: " + requests[i].comments +
                        "</div>" +
                        "</td> " +
			"</tr>";
		}
		$("#denied-requests").append(request);
	});
}

function getCancelledRequests(){
		$.get("../server/user-cancelled-requests.php",function(data,status){
		requests = JSON.parse(data);
		currentRequestIndex = 0;
		$("#cancelled-requests").empty();
		var request = "";
		for(var i = 0; i < requests.length; i++){
			request += "<tr>" +
                        "<td class=\"text-center\" style=\"width: 50%;text-align: center;\">" +
                        "<div class=\"row\">" +
                                "<div class=\"col-lg-3\" style=\"padding-right: 0;\">" +
                                        "<img class=\"img-rounded request-images\" src=\""+ requests[i].img + "\"></img>" +
                                "</div>" +
                                "<div class=\"col-lg-6 text-left\" style=\"padding-left: 0;\">" +
                                        "<h4>" + requests[i].name + "</h4><h5>" + requests[i].description + "</h5>" +
                                "</div>" +
                        "</div></td>" +
                        "<td class=\"text-center\" style=\"width: 50%;text-align: center;\">" +
                        "<div>Request ID:" + requests[i].id +
                        "</div>" +
                        "<div>Request Date: " + requests[i].date +
                        "</div>" +
                        "<div>Cancelled Date: " + requests[i].cancelledDate +
                        "</div>" +
			"<div>Cancelled By: " + requests[i].canceller +
                        "</div>" +
                        "<div>Duration: " + requests[i].duration +
                        "</div>" +
                        "<div>Frequency: " + requests[i].frequency +
                        "</div>" +
                        "<div>Starting Date: " + requests[i].startingDate +
                        "</div>" +
                        "<div>Image: "  + requests[i].artworkName + "." + requests[i].extension +
                        "</div>" +
                        "<div>Comments: " + requests[i].comments +
                        "</div>" +
                        "</td> " +
                        "</tr>";
		}
		$("#cancelled-requests").append(request);
	});
} 

function getPaidRequests(){
                $.get("../server/user-paid-requests.php",function(data,status){
                requests = JSON.parse(data);
                currentRequestIndex = 0;
                $("#paid-requests").empty();
                var request = "";
		for(var i = 0; i < requests.length; i++){
                        request += "<tr>" +
                        "<td class=\"text-center\" style=\"width: 50%;text-align: center;\">" +
                        "<div class=\"row\">" +
                                "<div class=\"col-lg-3\" style=\"padding-right: 0;\">" +
                                        "<img class=\"img-rounded request-images\" src=\""+ requests[i].img + "\"></img>" +
                                "</div>" +
                                "<div class=\"col-lg-6 text-left\" style=\"padding-left: 0;\">" +
                                        "<h4>" + requests[i].name + "</h4><h5>" + requests[i].description + "</h5>" +
                                "</div>" +
                        "</div></td>" +
                        "<td class=\"text-center\" style=\"width: 50%;text-align: center;\">" +
                        "<div>Request ID:" + requests[i].id +
                        "</div>" +
                        "<div>Request Date: " + requests[i].date +
                        "</div>" +
                        "<div>Payment Date: " + requests[i].paymentDate +
                        "</div>" +
                        "<div>Duration: " + requests[i].duration +
                        "</div>" +
                        "<div>Frequency: " + requests[i].frequency +
                        "</div>" +
                        "<div>Starting Date: " + requests[i].startingDate +
                        "</div>" +
			"<div>Image: "  + requests[i].artworkName + "." + requests[i].extension +
                        "</div>" +
                        "<div>Comments: " + requests[i].comments +
                        "</div>" +
                        "</td> " +
                        "</tr>";
                }
		$("#paid-requests").append(request);
        });
}

function getPublishedRequests(){
                $.get("../server/user-published-requests.php",function(data,status){
                requests = JSON.parse(data);
                currentRequestIndex = 0;
                $("#published-requests").empty();
                var request = "";
		for(var i = 0; i < requests.length; i++){
			request += "<tr>" +
                        "<td class=\"text-center\" style=\"width: 33.33%;text-align: center;\">" +
                        "<div class=\"row\">" +
                                "<div class=\"col-lg-3\" style=\"padding-right: 0;\">" +
                                        "<img class=\"img-rounded request-images\" src=\""+ requests[i].img + "\"></img>" +
                                "</div>" +
                                "<div class=\"col-lg-6 text-left\" style=\"padding-left: 0;\">" +
                                        "<h4>" + requests[i].name + "</h4><h5>" + requests[i].description + "</h5>" +
                                "</div>" +
                        "</div></td>" +
                        "<td class=\"text-center\" style=\"width: 33.33%;text-align: center;\">" +
                        "<div>Request ID:" + requests[i].id +
                        "</div>" +
                        "<div>Request Date: " + requests[i].date +
                        "</div>" +
                        "<div>Published Date: " + requests[i].publishedDate +
                        "</div>" +
                        "<div>Duration: " + requests[i].duration +
                        "</div>" +
                        "<div>Frequency: " + requests[i].frequency +
                        "</div>" +
                        "<div>Starting Date: " + requests[i].startingDate +
                        "</div>" +
                        "<div>Image: "  + requests[i].artworkName + "." + requests[i].extension +
                        "</div>" +
                        "<div>Comments: " + requests[i].comments +
                        "</div>" +
                        "</td> " +
                        "<td class=\"text-center\" style=\"vertical-align: middle;width: 33.33%;\">" +
			"<div>" + requests[i].status +
                        "</div>" +
                        "</td>" +
                        "</tr>";
                }
                $("#published-requests").append(request);
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
