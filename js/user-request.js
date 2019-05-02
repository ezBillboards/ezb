var requests;
var tab = 'Pending';
var currentRequestIndex;
var currentRequestID;

//getPendingRequests(sessionStorage.getItem('ID'));

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

  $("#pendingSearch").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("tbody#pending-requests tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

  $("#approvedSearch").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("tbody#approved-requests tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

  $("#deniedSearch").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("tbody#denied-requests tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

  $("#cancelledSearch").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("tbody#cancelled-requests tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

  $("#paidSearch").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("tbody#paid-requests tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

  $("#publishedSearch").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("tbody#publishedcss-requests tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
  
});

function getPendingRequests(){
        $("#pending-requests").empty();
		setTimeout(function(){
			$.get("../server/user-pending-requests.php",{id:decrypt(sessionStorage.getItem('ID'))},function(data,status){
                requests = JSON.parse(data);
				console.log(requests);
                currentRequestIndex = 0;
				var request = "";
                for(var i = 0; i < requests.length; i++){
                        request += "<tr>" +
                        "<td class=\"text-center\" style=\"width: 25%;vertical-align: middle;text-align: center;\">" +
	                        "<img class=\"img-rounded request-images\" src=\""+ requests[i].img + "\"></img>" +
                        "</td>" +
						"<td class=\"text-center\" style=\"width: 25%;vertical-align: middle;text-align: center;\">" +
                                "<h4>" + requests[i].name + "</h4><h5>" + requests[i].description + "</h5>" +
                        "</td>" +
						"<td class=\"text-left\" style=\"width: 25%;vertical-align: middle;text-align: left;\">" +
                        "<div><b>Request ID: </b>" + requests[i].id +
                        "</div>" +
                        "<div><b>Request Date: </b>" + requests[i].date +
                        "</div>" +
                        "<div><b>Duration: </b>" + requests[i].duration + " Day(s)" +
                        "</div>" +
						"<div><b>Frequency: </b>" + requests[i].frequency + " Display Per Cycle" +
                        "</div>" +
						"<div><b>Starting Date: </b>" + requests[i].startingDate +
                        "</div>" +
						"<div><b>End Date: </b>" + requests[i].endDate +
                        "</div>" +
                        "<div><b>Image: </b>"  + requests[i].artworkName + "." + requests[i].extension +
                        "</div>" +
                        "</td> " +
                        "<td class=\"text-center\" style=\"vertical-align: middle;text-align: center;width: 25%;\">" +
						"<span id=\"" + requests[i].id + "\" onclick=\"cancelling(this)\" class=\"glyphicon glyphicon-remove\" style=\"font-size: 35px;color:#2D2D2D;\"><br><p style=\"font-size: 14px;\"><b><i>Cancel</b></i></p></span>" +
                        "</td>" +
                        "</tr>";
                }
                $("#pending-requests").append(request);
			});
		},250);
        
}


function getApprovedRequests(){
	$("#approved-requests").empty();
	$.get("../server/user-approved-requests.php",{id:decrypt(sessionStorage.getItem('ID'))},function(data,status){
		requests = JSON.parse(data);
		currentRequestIndex = 0;
		var request = "";
		for(var i = 0; i < requests.length; i++){
			request += "<tr>" +
                        "<td class=\"text-center\" style=\"width: 25%;vertical-align: middle;text-align: center;\">" +
                                "<img class=\"img-rounded request-images\" src=\""+ requests[i].img + "\"></img>" +
                        "</td>" +
                        "<td class=\"text-center\" style=\"width: 25%;vertical-align: middle;text-align: center;\">" +
                                "<h4>" + requests[i].name + "</h4><h5>" + requests[i].description + "</h5>" +
                        "</td>" +
                        "<td class=\"text-left\" style=\"width: 25%;vertical-align: middle;text-align: left;\">" +
                        "<div><b>Request ID: </b>" + requests[i].id +
                        "</div>" +
                        "<div><b>Request Date: </b>" + requests[i].date +
                        "</div>" +
			"<div><b>Approved Date: </b>" + requests[i].approvedDate +
                        "</div>" +
                        "<div><b>Duration: </b>" + requests[i].duration + " Day(s)" +
                        "</div>" +
                        "<div><b>Frequency: </b>" + requests[i].frequency + " Display Per Cycle" +
                        "</div>" +
                        "<div><b>Starting Date: </b>" + requests[i].startingDate +
                        "</div>" +
			"<div><b>End Date: </b>" + requests[i].endDate +
                        "</div>" +
                        "<div><b>Image: </b>"  + requests[i].artworkName + "." + requests[i].extension +
                        "</div>" +
			"<div><b>Comments: </b>" + ((requests[i].comments != "" && requests[i].comments != null) ? requests[i].comments : "No comments") +
                        "</div>" +
                        "</td> " +
                        "<td class=\"text-center\" style=\"vertical-align: middle;width: 22%;vertical-align: middle;\">" +
			"<div class=\"row align\" style=\"margin-left: 22%;\">" +
				"<div class=\"col-lg-4\">" +
                        		"<form action=\"../server/venta.php\"  method=\"post\" name=\"forma\" target=\"_blank\">" +
					"<input type=\"hidden\" name=\"requestID\" value=\"" + requests[i].id + "\">" +
					"<button id=\"pay-btn\" type=\"submit\" class=\"btn\"><span class=\"glyphicon glyphicon-usd\" style=\"font-size: 35px;color:#2D2D2D;\"><br><p style=\"font-size: 14px;\"><b><i>Pay</b></i></p></span></button>"  +
					"</form>" +
				"</div>" +
				"<div class=\"col-lg-4\">" +
					"<span id=\"" + requests[i].id + "\" onclick=\"cancelling(this)\" class=\"glyphicon glyphicon-remove\" style=\"font-size: 35px;color:#2D2D2D;\"><br><p style=\"font-size: 14px;\"><b><i>Cancel</b></i></p></span>" +
				"</div>" +
			"</div>" +
			"</td>" +
                        "</tr>";
		}
		$("#approved-requests").append(request);			
	});
}

function getDeniedRequests(){
		$("#denied-requests").empty();
		$.get("../server/user-denied-requests.php",{id:decrypt(sessionStorage.getItem('ID'))},function(data,status){
		requests = JSON.parse(data);
		currentRequestIndex = 0;
		var request = "";
		for(var i = 0; i < requests.length; i++){
			request += "<tr>" +
                        "<td class=\"text-center\" style=\"width: 33.33%;text-align: center;vertical-align: middle;\">" +
                                "<img class=\"img-rounded request-images\" src=\""+ requests[i].img + "\"></img>" +
                        "</td>" +
			"<td class=\"text-center\" style=\"width: 33.33%;text-align: center;vertical-align: middle;\">" +
                                "<h4>" + requests[i].name + "</h4><h5>" + requests[i].description + "</h5>" +
                        "</td>" +
			"<td class=\"text-left\" style=\"width: 33.33%;text-align: left;vertical-align: middle;\">" +
                        "<div><b>Request ID: </b>" + requests[i].id +
                        "</div>" +
                        "<div><b>Request Date: </b>" + requests[i].date +
                        "</div>" +
                        "<div><b>Denied Date: </b>" + requests[i].denialDate +
                        "</div>" +
                        "<div><b>Image: </b>"  + requests[i].artworkName + "." + requests[i].extension +
                        "</div>" +
			"<div><b>Comments: </b>" + ((requests[i].comments != "" && requests[i].comments != null) ? requests[i].comments : "No comments") +
                        "</div>" +
                        "</td> " +
			"</tr>";
		}
		$("#denied-requests").append(request);
	});
}

function getCancelledRequests(){
		$("#cancelled-requests").empty();
		$.get("../server/user-cancelled-requests.php",{id:decrypt(sessionStorage.getItem('ID'))},function(data,status){
		requests = JSON.parse(data);
		currentRequestIndex = 0;
		var request = "";
		for(var i = 0; i < requests.length; i++){
			request += "<tr>" +
                        "<td class=\"text-center\" style=\"width: 33.33%;text-align: center;vertical-align: middle;\">" +
                                "<img class=\"img-rounded request-images\" src=\""+ requests[i].img + "\"></img>" +
                        "</td>" +
                        "<td class=\"text-center\" style=\"width: 33.33%;text-align: center;vertical-align: middle;\">" +
				"<h4>" + requests[i].name + "</h4><h5>" + requests[i].description + "</h5>" +
                        "</td>" +
			"<td class=\"text-left\" style=\"width: 33.33%;text-align: left;vertical-align: middle;\">" +
                        "<div><b>Request ID: </b>" + requests[i].id +
                        "</div>" +
                        "<div><b>Request Date: </b>" + requests[i].date +
                        "</div>" +
			"<div><b>Approved Date: </b>" + ((requests[i].approvedDate != "" && requests[i].approvedDate != null) ? requests[i].approvedDate : "N/A") +
                        "</div>" +
			"<div><b>Cancelled Date: </b>" + requests[i].cancelledDate +
                        "</div>" +
			"<div><b>Cancelled By: </b>" + requests[i].canceller +
                        "</div>" +
                        "<div><b>Image: </b>"  + requests[i].artworkName + "." + requests[i].extension +
                        "</div>" +
			"<div><b>Comments: </b>" + ((requests[i].comments != "" && requests[i].comments != null) ? requests[i].comments : "No comments") +
                        "</div>" +
                        "</td> " +
                        "</tr>";
		}
		$("#cancelled-requests").append(request);
	});
} 

function getPaidRequests(){
                $("#paid-requests").empty();
                $.get("../server/user-paid-requests.php",{id:decrypt(sessionStorage.getItem('ID'))},function(data,status){
                requests = JSON.parse(data);
                currentRequestIndex = 0;
                var request = "";
		for(var i = 0; i < requests.length; i++){
                        request += "<tr>" +
			"<td class=\"text-center\" style=\"width: 33.33%;text-align: center;vertical-align: middle;\">" +
                                "<img class=\"img-rounded request-images\" src=\""+ requests[i].img + "\"></img>" +
                        "</td>" +
			"<td class=\"text-center\" style=\"width: 33.33%;text-align: center;vertical-align: middle;\">" +	
                                "<h4>" + requests[i].name + "</h4><h5>" + requests[i].description + "</h5>" +
                        "</td>" +
			"<td class=\"text-left\" style=\"width: 33.33%;text-align: left;vertical-align: middle;\">" +
                        "<div><b>Request ID: </b>" + requests[i].id +
                        "</div>" +
                        "<div><b>Request Date: </b>" + requests[i].date +
                        "</div>" +
			"<div><b>Approved Date: </b>" + requests[i].approvedDate +
                        "</div>" +
                        "<div><b>Payment Date: </b>" + requests[i].paymentDate +
                        "</div>" +
                        "<div><b>Duration: </b>" + requests[i].duration + " Day(s)" +
                        "</div>" +
                        "<div><b>Frequency: </b>" + requests[i].frequency + " Display Per Cycle" +
                        "</div>" +
                        "<div><b>Starting Date: </b>" + requests[i].startingDate +
                        "</div>" +
			"<div><b>End Date: </b>" + requests[i].endDate +
                        "</div>" +
			"<div><b>Image: </b>"  + requests[i].artworkName + "." + requests[i].extension +
                        "</div>" +
			"<div><b>Comments: </b>" + ((requests[i].comments != "" && requests[i].comments != null) ? requests[i].comments : "No comments") +
                        "</div>" +
                        "</td> " +
                        "</tr>";
                }
		$("#paid-requests").append(request);
        });
}

function getPublishedRequests(){
                $("#published-requests").empty();
                $.get("../server/user-published-requests.php",{id:decrypt(sessionStorage.getItem('ID'))},function(data,status){
                requests = JSON.parse(data);
                currentRequestIndex = 0;
                var request = "";
		for(var i = 0; i < requests.length; i++){
			request += "<tr>" +
			"<td class=\"text-center\" style=\"width: 25%;text-align: center;vertical-align: middle;\">" +
                                "<img class=\"img-rounded request-images\" src=\""+ requests[i].img + "\"></img>" +
                        "</td>" +
			"<td class=\"text-center\" style=\"width: 25%;text-align: center;vertical-align: middle;\">" +
                                "<h4>" + requests[i].name + "</h4><h5>" + requests[i].description + "</h5>" +
                        "</td>" +
			"<td class=\"text-left\" style=\"width: 25%;text-align: left;vertical-align: middle;\">" +
                        "<div><b>Request ID: </b>" + requests[i].id +
                        "</div>" +
                        "<div><b>Request Date: </b>" + requests[i].date +
                        "</div>" +
			"<div><b>Approved Date: </b>" + requests[i].approvedDate +
                        "</div>" +
                        "<div><b>Payment Date: </b>" + requests[i].paymentDate +
                        "</div>" +
                        "<div><b>Published Date: </b>" + requests[i].publishedDate +
                        "</div>" +
                        "<div><b>Duration: </b>" + requests[i].duration + " Day(s)" +
                        "</div>" +
                        "<div><b>Frequency: </b>" + requests[i].frequency + " Display Per Cycle" +
                        "</div>" +
                        "<div><b>Starting Date: </b>" + requests[i].startingDate +
                        "</div>" +
			"<div><b>End Date: </b>" + requests[i].endDate +
                        "</div>" +
                        "<div><b>Image: </b>"  + requests[i].artworkName + "." + requests[i].extension +
                        "</div>" +
			"<div><b>Comments: </b>" + ((requests[i].comments != "" && requests[i].comments != null) ? requests[i].comments : "No comments") +
                        "</div>" +
                        "</td> " +
			"<td class=\"text-center\" style=\"width: 25%;text-align: center;vertical-align: middle;\">" +
			"<div>" + requests[i].status +
                        "</div>" +
                        "</td>" +
                        "</tr>";
                }
                $("#published-requests").append(request);
        });
}


function cancelRequest(){
	console.log(currentRequestID);
	$.post("../server/approver-cancel-request.php",{id:currentRequestID,cancelId:decrypt(sessionStorage.getItem('ID'))},
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

function cancelling(item){
	currentRequestID = $(item).attr("id");
	console.log('User id = ' + currentRequestID);
	$("#myModal").modal("show");
}

function payment(item){
        currentRequestID = $(item).attr("id");
        console.log(currentRequestID);
        //$.post("../server/venta.php",{requestID:currentRequestID},
        $.post("../server/user-pay-request.php",{requestID:currentRequestID},
                function(data, status){
                        if(status === "success"){
				location.reload();
                        } else {
                                alert("Error payment request!");
                        }
                        console.log(data);
                        console.log(status);
        });
}

