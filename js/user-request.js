var requests;
var tab = 'Pending';
var currentRequestIndex;
var currentRequestID;

getPendingRequests();

$(document).ready(function(){

/***************************************
*Checks which tab the user is looking
*Denied
*Approved
*Cancelledr 
*Publised
****************************************/	
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

/*******************************************
*Search bar takes the pending search
*and performs toLowerCase method and looks
*for the result on the DB
********************************************/
  $("#pendingSearch").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("tbody#pending-requests tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

/*******************************************
*Search bar takes the approved search
*and performs toLowerCase method and looks
*for the result on the DB
********************************************/
  $("#approvedSearch").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("tbody#approved-requests tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

/*******************************************
*Search bar takes the denied search
*and performs toLowerCase method and looks
*for the result on the DB
********************************************/
  $("#deniedSearch").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("tbody#denied-requests tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

/*******************************************
*Search bar takes the cancelled search
*and performs toLowerCase method and looks
*for the result on the DB
********************************************/
  $("#cancelledSearch").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("tbody#cancelled-requests tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

/*******************************************
*Search bar takes the paid search
*and performs toLowerCase method and looks
*for the result on the DB
********************************************/
  $("#paidSearch").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("tbody#paid-requests tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

/*******************************************
*Search bar takes the published search
*and performs toLowerCase method and looks
*for the result on the DB
********************************************/
  $("#publishedSearch").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("tbody#publishedcss-requests tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
  
});



/*************************
*Pending request Getter
*Takes JSON from de DB
*And appends information
* as an HTMLto the view
*************************/
function getPendingRequests(){
        $("#pending-requests").empty();
		setTimeout(function(){
			$.get("../server/user-pending-requests.php",{id:decrypt(sessionStorage.getItem('ID'))},function(data,status){
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
						"<span id=\"" + requests[i].id + "\" onclick=\"cancelling(this)\" class=\"clickable glyphicon glyphicon-remove\" style=\"font-size: 35px;color:#2D2D2D;\"><br><p style=\"font-size: 14px;\"><b><i>Cancel</b></i></p></span>" +
                        "</td>" +
                        "</tr>";
                }
                $("#pending-requests").append(request);
			});
		},250);
        
}


/*************************
*Approved Request Getter
*Takes JSON from de DB
*And appends information
* as an HTMLto the view
*************************/
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
					"<input type=\"hidden\" name=\"requestFirstName\" value=\"" + decrypt(requests[i].requestFirstName) + "\">" +
					"<input type=\"hidden\" name=\"requestLastName\" value=\"" + decrypt(requests[i].requestLastName) + "\">" +
					"<input type=\"hidden\" name=\"email\" value=\"" + decrypt(sessionStorage.getItem('email')) + "\">" +
					"<button id=\"pay-btn\" type=\"submit\" class=\"btn\"><span class=\"glyphicon glyphicon-usd\" style=\"font-size: 35px;color:#2D2D2D;\"><br><p style=\"font-size: 14px;\"><b><i>Pay</b></i></p></span></button>"  +
					"</form>" +
				"</div>" +
				"<div class=\"col-lg-4\">" +
					"<span id=\"" + requests[i].id + "\" onclick=\"cancelling(this)\" class=\"clickable glyphicon glyphicon-remove\" style=\"font-size: 35px;color:#2D2D2D;\"><br><p style=\"font-size: 14px;\"><b><i>Cancel</b></i></p></span>" +
				"</div>" +
			"</div>" +
			"</td>" +
                        "</tr>";
		}
		$("#approved-requests").append(request);			
	});
}

/*************************
*Denied Request Getter
*Takes JSON from de DB
*And appends information
* as an HTMLto the view
*************************/
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

/*************************
*Cancelled Getter
*Takes JSON from de DB
*And appends information
* as an HTMLto the view
*************************/
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

/*************************
*Paid Requests Getter
*Takes JSON from de DB
*And appends information
* as an HTMLto the view
*************************/
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

/*************************
*Published Request Getter
*Takes JSON from de DB
*And appends information
* as an HTMLto the view
*************************/
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


/************************************************
*Funtion that will delete it from the front end
*and disables the request on the DB
************************************************/
function cancelRequest(){
	$.post("../server/approver-cancel-request.php",{id:currentRequestID,cancelId:decrypt(sessionStorage.getItem('ID'))},
		function(data, status){
			if(status === "success"){
				location.reload();
			} else {
				alert("Error cancelling request!");
			}
		});
}

/****************************
*Delete request  infomation
*receive by the item parameter
*on the function
*
*@param {string} item
****************************/
function cancelling(item){
	currentRequestID = $(item).attr("id");
	$("#myModal").modal("show");
}

/************************************************
*Funtion that will post the current price 
*for the requested billboard on the PHP
*
*@param {string} item
************************************************/

function payment(item){
        currentRequestID = $(item).attr("id");
        $.post("../server/user-pay-request.php",{requestID:currentRequestID},
                function(data, status){
                        if(status === "success"){
				location.reload();
                        } else {
                                alert("Error payment request!");
                        }
        });
}

