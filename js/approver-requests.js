var requests;
var currentRequestIndex;

$(document).ready(function(){
	$("#left").hide();
        $("#right").hide();
	
	$.get("../server/get-image-path.php", function(data, status){
		$("#tab-logo").attr("href", data + "img/ezb/EZBillboardsLeftLogo.png");
        	$("#ezb-logo").attr("src", data + "img/ezb/EZBillboardsLogo.png");
	});

	$("#view-profile").click(function(){
		$.get("../server/approver-view-client-profile.php", {id:requests[currentRequestIndex].id}, function(data, status){
			var profile = JSON.parse(data);
			$("#profile-name").text(profile.firstName + " " + profile.lastName);
			$("#profile-email").text(profile.email);
			$("#profile-mobile").text(profile.mobile);
			$("#profile-work").text(profile.work);
			$("#profile-company").text(profile.company);
			$("#profile-address1").text(profile.address1);
			$("#profile-address2").text(profile.address2);
			$("#profile-city-state-zipcode").text(profile.city + ", " + profile.state + " " + profile.zipcode);
			$("#profile-url").text(profile.url);
			$("#profile-facebook").attr("href",profile.facebookURL);
			$("#profile-instagram").attr("href",profile.instagramURL);
			$("#profile-twitter").attr("href",profile.twitterURL);
		});
	});
	
	$("#request-image").mouseenter(function(){
		$("#left").fadeIn("slow");
		$("#right").fadeIn("slow");
  	});

	$("#request-image").mouseleave(function(){
		$("#left").fadeOut("slow");
                $("#right").fadeOut("slow");
        });
	
	$("#request-queue").on("click",".clickable-image",function(){
		$("#" + currentRequestIndex + "request").removeClass("active");
		currentRequestIndex = parseInt($(this).attr("id"));
		getRegulations();
		getRejections();
		$("#" + currentRequestIndex + "request").addClass("active");
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
			$("#" + currentRequestIndex + "request").removeClass("active");
			currentRequestIndex--;
			getRegulations();
			getRejections();
			$("#" + currentRequestIndex + "request").addClass("active");
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
			$("#" + currentRequestIndex + "request").removeClass("active");
			currentRequestIndex++;
			getRegulations();
			getRejections();
			$("#" + currentRequestIndex + "request").addClass("active");
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
		console.log("change");
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
			approverID: sessionStorage.getItem('ID'),
			status:decision,
			comments:$("#comment").val()
		},
		function(data, status){
			if(status === "success"){
				location.reload();
			} else {
				alert("Error in the decision!");
			}
			console.log(data);
			console.log(status);
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
			console.log(startStr);
			console.log(endStr);
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
			var request = "<a id=\"" + i + "request\" class=\"list-group-item clickable-image " + ((i == 0) ? "active":"") + "\">" +
			"<div class=\"row request-queue-info\">" +
			"<div class=\"col-lg-3\">" +
			"<img src=\"" + requests[i].artworkURL + "\" class=\"img-rounded request-queue-images\" alt=\"" + requests[i].artworkName + "\">" +
			"</div>" +
			"<div class=\"col-lg-9\">" +
			"<div class=\"row request-queue-info\">" +
			"<div class=\"col-lg-6\"  style=\"padding-right: 0.5%;\">" +
			"<h4 class=\"list-group-item-heading text-right\" style=\"font-weight:bold;\">Request ID: </h4>" +
			"</div>" +
			"<div class=\"col-lg-6 text-left\" style=\"padding-left: 0.5%;\">" +
			"<h4 class=\"list-group-item-heading checkbox-text\" style=\"font-weight:normal;\"> " + requests[i].id + "</h4>" +
			"</div>" +
			"</div>" +
			"<div class=\"row\">" +
			"<div class=\"col-lg-7\">" +
			"<p class=\"list-group-item-text\">" + requests[i].billboard + "</p>" +
			"<p class=\"list-group-item-text\">" + requests[i].firstName + " " + requests[i].lastName + "</p>" +
			"</div>" +
			"<div class=\"col-lg-5\">" +
			"<p class=\"list-group-item-text\">" + requests[i].displayPerCycle + "</p>" +
			"<p class=\"list-group-item-text\">" + requests[i].date + "</p>" +
			"</div>" +
			"</div>" +
			"</div>" +
			"</div>" +
			"</a>";

			var requestImages = "<div class=\"item " + i + "image " + ((i == 0) ? "active":"") + "\">" +
			"<img src=\"" + requests[i].artworkURL + "\" alt=\"" + requests[i].artworkName + "\" style=\"width:100%;background-color:white;\">" +
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

function getRegulations(){
	$.get("../server/approver-regulations.php",{billboard_ID:requests[currentRequestIndex].billboard_ID}, function(data, status){
		var regulations = JSON.parse(data);
		var regulation = "";
		for (var i = 0; i < regulations.length; i++) {
			regulation += "<div class=\"form-check regulations\">" +
			"<label class=\"form-check-label checkbox-text\">" +
			"<input type=\"checkbox\" class=\"form-check-input\"> " + regulations[i] +
			"</label>" +
			"</div>";
		}
		$("#regulations").empty();
		$("#regulations").append(regulation);
		console.log(regulations);
	});
}

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

function decimals(n, d) {
	if ((typeof n !== 'number') || (typeof d !== 'number')) return 0.000;
    	n = parseFloat(n) || 0;
	return n.toFixed(d);
}
