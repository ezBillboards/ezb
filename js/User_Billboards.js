var billboards;

$(document).ready(function(){
  getBillboards();

  var date_input=$('input[name="date"]'); //our date input has the name "date"
  var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
  var options={
    format: 'mm/dd/yyyy',
    container: container,
    todayHighlight: true,
    autoclose: true,
  };
  date_input.datepicker(options);

  $("table").on("click", "tr .information", function(){
  	var billboardID = $(this).attr("id");
	$.get("../server/user-billboardInfo.php", {id: billboardID}, function(data, status){
  		var info = JSON.parse(data);
		console.log(info);
		$("#info-header").text(info.name);
  		$("#info-image").attr("src",info.img);
  		$("#info-image").attr("alt",info.name);
  		$("#width").text(info.width + " ft");
  		$("#height").text(info.height + " ft");
  		$("#latitude").text(info.latitude);
  		$("#longitude").text(info.longitude);
  		$("#read-time").text(info.readTime + " seconds");
  		$("#impressions").text(info.impressions + " daily");
  		$("#traffic").text(info.traffic + " daily");
  		$("#min-res").text(info.minWidth + "x" + info.minHeight);
  		$("#max-res").text(info.maxWidth + "x" + info.maxHeight);
	});
  });
  
});

// Add the following code if you want the name of the file appear on select
$(".custom-file-input").on("change", function() {
  var fileName = $(this).val().split("\\").pop();
  $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
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
			"<td class=\"text-center\" style=\"vertical-align: middle;width: 50%;\"><span id=\"" + billboards[i].id + "\" class=\"glyphicon glyphicon-info-sign actions information\" data-toggle=\"modal\" data-target=\"#infoModal1\"><br><p>Information</p></span>" +
			"<span id=\"" + billboards[i].id + "\" class=\"glyphicon glyphicon-shopping-cart actions\" data-toggle=\"modal\" data-target=\"#requestModal1\"><br><p>Request</p></span>" +
			"</td>" +
			"</tr>";
			console.log(billboard);
		}
		$("#billboards").empty();
		$("#billboards").append(billboard);
		console.log(billboards);
	});
}
