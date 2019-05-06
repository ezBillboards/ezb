var requests;
var currentRequestIndex;

$(document).ready(function(){
	$("#left").hide();
        $("#right").hide();

/**************
*Get EZB logos
***************/	
	$.get("../server/get-image-path.php", function(data, status){
		$("#tab-logo").attr("href", data + "img/ezb/EZBillboardsLeftLogo.png");
        	$("#ezb-logo").attr("src", data + "img/ezb/EZBillboardsLogo.png");
	});


/**************
*Search for
*profile info on modal
***************/
	$("#view-profile").click(function(){
		$.get("../server/approver-view-client-profile.php", {id:requests[currentRequestIndex].id}, function(data, status){
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
	});

/********************
*View request image
*as a slide show
*******************/
	$("#request-image").mouseenter(function(){
		$("#left").fadeIn("slow");
		$("#right").fadeIn("slow");
  	});


	$("#request-image").mouseleave(function(){
		$("#left").fadeOut("slow");
                $("#right").fadeOut("slow");
        });

/*******************************
*Get Rejections, get Regulations
*and image parameters
***************/	
	$("#request-queue").on("click",".clickable-image",function(){
		$("#" + currentRequestIndex + "request").removeClass("activated");
		$("#" + currentRequestIndex + "request").find(".list-group-item-heading").css("color","black");
		currentRequestIndex = parseInt($(this).attr("id"));
		getRegulations();
		getRejections();
		$("#" + currentRequestIndex + "request").addClass("activated");
		$("#" + currentRequestIndex + "request").find(".list-group-item-heading").css("color","white");
		$("#request-image").carousel(currentRequestIndex);
		$("#download-btn").attr("href",requests[currentRequestIndex].artworkURL);
		$("#download-btn").attr("download",requests[currentRequestIndex].artworkName + "." + requests[currentRequestIndex].extension);
		$("#image-name").html("<b>Image: </b>" + requests[currentRequestIndex].artworkName + "." + requests[currentRequestIndex].extension);
		$("#image-resolution").html("<b>Resolution: </b>" + requests[currentRequestIndex].width + " X " + requests[currentRequestIndex].height + " pixels");
		$("#image-extension").html("<b>Item Type: </b>" + requests[currentRequestIndex].extension + " File");
		$("#image-size").html("<b>Size: </b>" + decimals(requests[currentRequestIndex].size/1048576,3) + " MB");
	});

	$(".left").click(function(){
		if(currentRequestIndex != 0) {
			$("#" + currentRequestIndex + "request").removeClass("activated");
			$("#" + currentRequestIndex + "request").find(".list-group-item-heading").css("color","black");
			currentRequestIndex--;
			getRegulations();
			getRejections();
			$("#" + currentRequestIndex + "request").find(".list-group-item-heading").css("color","white");
			$("#" + currentRequestIndex + "request").addClass("activated");
			$("#request-image").carousel(currentRequestIndex);
			$("#download-btn").attr("href",requests[currentRequestIndex].artworkURL);
			$("#download-btn").attr("download",requests[currentRequestIndex].artworkName + "." + requests[currentRequestIndex].extension);
			$("#image-name").html("<b>Image: </b>" + requests[currentRequestIndex].artworkName + "." + requests[currentRequestIndex].extension);
			$("#image-resolution").html("<b>Resolution: </b>" + requests[currentRequestIndex].width + " X " + requests[currentRequestIndex].height + " pixels");
			$("#image-extension").html("<b>Item Type: </b>" + requests[currentRequestIndex].extension + " File");
			$("#image-size").html("<b>Size: </b>" + decimals(requests[currentRequestIndex].size/1048576,3) + " MB");
		}
	});
	$(".right").click(function(){
		if(currentRequestIndex != requests.length - 1) {
			$("#" + currentRequestIndex + "request").removeClass("activated");
			$("#" + currentRequestIndex + "request").find(".list-group-item-heading").css("color","black");
			currentRequestIndex++;
			getRegulations();
			getRejections();
			$("#" + currentRequestIndex + "request").addClass("activated");
			$("#" + currentRequestIndex + "request").find(".list-group-item-heading").css("color","white");
			$("#request-image").carousel(currentRequestIndex);
			$("#download-btn").attr("href",requests[currentRequestIndex].artworkURL);
			$("#download-btn").attr("download",requests[currentRequestIndex].artworkName + "." + requests[currentRequestIndex].extension);
			$("#image-name").html("<b>Image: </b>" + requests[currentRequestIndex].artworkName + "." + requests[currentRequestIndex].extension);
			$("#image-resolution").html("<b>Resolution: </b>" + requests[currentRequestIndex].width + " X " + requests[currentRequestIndex].height + " pixels");
			$("#image-extension").html("<b>Item Type: </b>" + requests[currentRequestIndex].extension + " File");
			$("#image-size").html("<b>Size: </b>" + decimals(requests[currentRequestIndex].size/1048576,3) + " MB");
		}
	});

	$("#rejections").on("click", ".rejections", function(){
		$("#comment").val($(this).text());
		$("#no").removeClass("disabled");
		$("#no").prop("disabled",false);
	});

	$('#comment').bind('input propertychange', function() {
		if(this.value.length){
			$("#no").removeClass("disabled");
			$("#no").prop("disabled",false);
		} else{
			$("#no").addClass("disabled");
			$("#no").prop("disabled",true);
		}
	});

	$("#regulations").on("click", ".regulations", function(){
		if ($("input[type='checkbox']:checked").length == $("input[type='checkbox']").length) {
			$("#yes").removeClass("disabled");
			$("#yes").prop("disabled",false);
		} else{
			$("#yes").addClass("disabled");
			$("#yes").prop("disabled",true);
		}
	});

	$(".decision").click(function(){
		var decision;
		if($(this).attr("id") === "yes"){
			decision = 2;
		} else{
			decision = 3;
		}
		$.post("../server/approver-decision.php",
		{
			id:requests[currentRequestIndex].id,
			approverID: decrypt(sessionStorage.getItem('ID')),
			status:decision,
			comments:$("#comment").val()
		},
		function(data, status){
			if(status === "success"){
				if(decision == 2){
                        		alert("The request has been successfully approved.");
                		} else{
                        		alert("The request has been successfully denied.");
                		}
			} else {
				if(decision == 2){
                                        alert("Error while trying to approve the request.");
                                } else{
                                        alert("Error while trying to deny the request.");
                                }
			}
			location.reload();
		});
	});

	$(function() {

    		var start = moment().startOf('month');
    		var end = moment().endOf('month');

    		function updateDate(start, end) {
			var startStr = start.format('YYYY-MM-DD');
			var endStr = end.format('YYYY-MM-DD');
			var startDisplay = start.format('MMMM D, YYYY');
			var endDisplay = end.format('MMMM D, YYYY');
	        	$("#reportrange span").html(startDisplay + " to " + endDisplay);
			getRequests(startStr, endStr);
    		}

    		$('#reportrange').daterangepicker({
        		startDate: start,
        		endDate: end,
        		ranges: {
           			'Today': [moment(), moment()],
           			'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           			'Last 7 Days': [moment().subtract(6, 'days'), moment()],
           			'Last 30 Days': [moment().subtract(29, 'days'), moment()],
           			'This Month': [moment().startOf('month'), moment().endOf('month')],
           			'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
	   			'All': [moment().subtract(3,'month'), moment()]
        		}
    		}, updateDate);

    		updateDate(start, end);

	});
});



/*************************
*Request Getter
*Takes JSON from de DB
*And appends information
*as an HTMLto the view
*
*@param {string} startStr
*@param {string} endStr
*************************/
function getRequests(startStr, endStr){
	$("#request-queue").empty();
	$("#request-images").empty();
	$.get("../server/approver-requests.php",
		{
			start: startStr,
			end: endStr
		}, 
		function(data, status){
		console.log(data);
		requests = JSON.parse(data);
		currentRequestIndex = 0;
		getRegulations();
		getRejections();
		for (var i = 0; i < requests.length; i++) {
			var request = "<a id=\"" + i + "request\" class=\"list-group-item clickable-image clickable " + ((i == 0) ? "activated":"") + "\">" +
			"<div class=\"row request-queue-info\">" +
			"<div class=\"col-lg-3\">" +
			"<img src=\"" + requests[i].artworkURL + "\" class=\"img-rounded request-queue-images\" alt=\"" + requests[i].artworkName + "\">" +
			"</div>" +
			"<div class=\"col-lg-9\">" +
			"<div class=\"row request-queue-info\">" +
			"<div class=\"col-lg-6\"  style=\"padding-right: 0.5%;\">" +
			"<h4 class=\"list-group-item-heading text-right\" style=\"font-weight:bold;" + ((i == 0) ? "color:white;":"") + "\">Request ID: </h4>" +
			"</div>" +
			"<div class=\"col-lg-6 text-left\" style=\"padding-left: 0.5%;\">" +
			"<h4 class=\"list-group-item-heading checkbox-text\" style=\"font-weight:normal;" + ((i == 0) ? "color:white;":"") + "\">" + requests[i].id + "</h4>" +
			"</div>" +
			"</div>" +
			"<div class=\"row\">" +
			"<div class=\"col-lg-7\">" +
			"<p class=\"list-group-item-text\">" + requests[i].billboard + "</p>" +
			"<p class=\"list-group-item-text\">" + decrypt(requests[i].firstName) + " " + decrypt(requests[i].lastName) + "</p>" +
			"</div>" +
			"<div class=\"col-lg-5\">" +
			"<p class=\"list-group-item-text\">" + requests[i].displayPerCycle + " Display / Cycle</p>" +
			"<p class=\"list-group-item-text\">" + requests[i].date + "</p>" +
			"</div>" +
			"</div>" +
			"</div>" +
			"</div>" +
			"</a>";
			var requestImages = "<div class=\"item " + i + "image " + ((i == 0) ? "active":"") + "\">" +
			"<img src=\"" + requests[i].artworkURL + "\" alt=\"" + requests[i].artworkName + "\" style=\"display: block;margin-left: auto;margin-right: auto;height:" + $("#request-image").height() + "px;background-color:white;\">" +
			"</div>";
			$("#request-queue").append(request);
			$("#request-images").append(requestImages);	
		}

		$("#download-btn").attr("href",requests[0].artworkURL);
		$("#download-btn").attr("download",requests[0].artworkName + "." + requests[0].extension);
		$("#image-name").html("<b>Image: </b>" + requests[0].artworkName + "." + requests[0].extension);
		$("#image-resolution").html("<b>Resolution: </b>" + requests[0].width + " X " + requests[0].height + " pixels");
		$("#image-extension").html("<b>Item Type: </b>" + requests[0].extension + " File");
		$("#image-size").html("<b>Size: </b>" + decimals(requests[0].size/1048576,3) + " MB");

		console.log(requests);
	});
}

/*************************
*Regulations Getter
*Takes JSON from de DB
*And appends information
*as an HTMLto the view
*************************/
function getRegulations(){
	$.get("../server/approver-regulations.php",{billboard_ID:requests[currentRequestIndex].billboard_ID}, function(data, status){
		var regulations = JSON.parse(data);
		var regulation = "";
		for (var i = 0; i < regulations.length; i++) {
			regulation += "<div class=\"form-check regulations\">" +
			"<label class=\"form-check-label checkbox-text\">" +
			"<input type=\"checkbox\" class=\"clickable form-check-input\"> " + regulations[i] +
			"</label>" +
			"</div>";
		}
		$("#regulations").empty();
		$("#regulations").append(regulation);
		console.log(regulations);
	});
}

/*************************
*Rejections Getter
*Takes JSON from de DB
*And appends information
*as an HTMLto the view
*************************/
function getRejections(){
	$.get("../server/approver-rejections.php",{billboard_ID:requests[currentRequestIndex].billboard_ID}, function(data, status){
		var rejections = JSON.parse(data);
		var rejection = "";
		for (var i = 0; i < rejections.length; i++) {
			rejection += "<li><a class=\"rejections\">" + rejections[i] + "</a></li>";
		}
		$("#rejections").empty();
		$("#rejections").append(rejection);
		console.log(rejections);
	});
}


/*************************
*Decimal format parser
*
* @param {number} n
* @param {number} name
*************************/
function decimals(n, d) {
	if ((typeof n !== 'number') || (typeof d !== 'number')) return 0.000;
    	n = parseFloat(n) || 0;
	return n.toFixed(d);
}
