/*Administrator billboards JavaScript*/

$(document).ready(function(){
	
	  getBillboards();
	  
    $(".nav-tabs a").click(function(){
      $(this).tab('show');
    });
	
	$('#btnaddpackage').click(function(){
		console.log('btnaddpackage clicked!');
		var newPackage = "<tr>" +
		"<td>1 Day</td>" +
		"<td>Every 4 min.</td>" +
		"<td>$15.45</td>" +
		"<td>" +
		"<div class=\"column\">" +
		"<div class=\"row\">" +
		"<div class=\"col-lg-6\">" +
		"<a href=\"#\"><span class=\"glyphicon glyphicon-pencil\"><br></span></a></div>" +
		"<div class=\"col-lg-6\">" +
		"<a href=\"#\"><span class=\"glyphicon glyphicon-trash\"><br></span></a>" +
		"</div>" +
		"</div>" +
		"</td>";
		$("#add-package").append(newPackage);
	});
	
	$("#billboard-img").change(function(){
	        readURL(this);
        	console.log('reading URL of image');
	});
	
	$("table").on("click", "tr .information", function(){
  	var billboardID = $(this).attr("id");
	$.get("../server/user-billboardInfo.php", {id: billboardID}, function(data, status){
  		var info = JSON.parse(data);
		$("#editBillboardname").attr('value',info.name);
  		$("#billboard-edit-img-tag").attr('src',info.img);
  		//$("#info-image").attr("alt",info.name);
  		$("#width").attr('value',info.width);
  		$("#height").attr('value',info.height);
  		$("#latitude").attr('value',info.latitude);
  		$("#longitude").attr('value',info.longitude);
  		$("#read-time").attr('value',info.readTime);
  		$("#impressions").attr('value',info.impressions);
  		$("#traffic").attr('value',info.traffic);
  		$("#min-wid").attr('value',info.minWidth);
		$("#min-hei").attr('value',info.minHeight);
  		$("#max-wid").attr('value',info.maxWidth);
		$("#max-hei").attr('value',info.maxHeight);
	});
  });
});

function getBillboards(){
	$.get("../server/user-billboards.php", function(data, status){
		billboards = JSON.parse(data);
		var billboard = "";
		for (var i = 0; i < billboards.length; i++) {
			billboard += "<tr>" +
			"<td class=\"text-center\" style=\"width: 50%;text-align: center;\">" +
			"<div class=\"row\">" +
				"<div class=\"col-lg-3\" style=\"padding-right: 0;\">" +
					"<img class=\"img-rounded\ billboard-images\" src=\""+ billboards[i].img + "\"></img>" +
				"</div>" +
				"<div class=\"col-lg-6 text-left\" style=\"padding-left: 0;\">" +
					"<h4>" + billboards[i].name + "</h4><h5>" + billboards[i].description + "</h5>" +
				"</div>" +
			"</div></td>" +
			/*"<td class=\"text-center\" style=\"vertical-align: middle;width: 50%;\"><span class=\"glyphicon glyphicon-info-sign actions information\" data-toggle=\"modal\" data-target=\"#infoModal1\"><br><p>Information</p></span>" +
			"<span id=\"" + i + "\" class=\"glyphicon glyphicon-shopping-cart actions request-action\" data-toggle=\"modal\" data-target=\"#requestModal\"><br><p>Request</p></span>" +*/
			"<td class=\"text-center\" style=\"width: 50%;text-align: center;\"><a href=\"#\"><span id=\"" + billboards[i].id + "\"  class=\"glyphicon glyphicon-pencil actions information\" data-toggle=\"modal\" data-target=\"#EditModal\"><br></span></a>" +
			"<a href=\"#\"><span class=\"glyphicon glyphicon-trash\"><br></span></a>" +
			
			"</td>" +
			"</tr>";
		}
		$("#billboards").empty();
		$("#billboards").append(billboard);
	});
}
  
function readURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		
		reader.onload = function (e) {
			$('#billboard-img-tag').attr('src', e.target.result);
		}
		reader.readAsDataURL(input.files[0]);
	}
}

(function ($) {
$('.spinner .btn:first-of-type').on('click', function() {
  $('.spinner input').val( parseInt($('.spinner input').val(), 10) + 1);
});
$('.spinner .btn:last-of-type').on('click', function() {
  $('.spinner input').val( parseInt($('.spinner input').val(), 10) - 1);
});
})(jQuery);
  
  
  
