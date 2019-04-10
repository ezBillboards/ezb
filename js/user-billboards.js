var billboards;
var startingDate;
var packages;
var currentBillboardID;
var currentSelectedPackage = null;
var files;
var img;
var fd;

$(document).ready(function(){
  var start = moment();  
  getBillboards();

  $("table").on("click", "tr .information", function(){
  	var billboardID = $(this).attr("id");
	$.get("../server/user-billboardInfo.php", {id: billboardID}, function(data, status){
  		var info = JSON.parse(data);
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
  
  $("table").on("click", "tr.clickable-package", function(){
	if($(this).attr("class").includes("open")) {
		if(currentSelectedPackage != null) currentSelectedPackage.removeClass("selected-package");
		currentSelectedPackage = $(this);
		$(this).addClass("selected-package");
	}
  });

  $("table").on("click", "tr .request-action", function(){	
	var index = $(this).attr("id");
	currentBillboardID = billboards[index].id;
	$("#request-modal-header").text(billboards[index].name);
	$("#request-image-header").attr("src", billboards[index].img);
	$("#upload-image").val("");
	files = null;
	img = null;
	fd = new FormData();
	if(currentSelectedPackage != null){
		currentSelectedPackage.removeClass("selected-package");
		currentSelectedPackage = null;
	}
	start = moment();
	$('#reportrange span').html(start.format('MMMM D, YYYY'));
        startingDate = start.format('YYYY-MM-DD');
        $.get("../server/user-billboard-packages.php",
		{
                        billboardID: currentBillboardID,
                        date: startingDate
                }, function(data, status){
                packages = JSON.parse(data);
                var package = "";
                for (var i = 0; i < packages.length; i++) {
                        package += "<tr id=\"" + packages[i].id + "\" class=\"clickable-package " + ((packages[i].availability) ? "open" : "") + "\">" +
                        "<td class=\"text-center\" style=\"vertical-align: middle;width: 33.33%;\">" +
                                packages[i].duration + " Day(s)" +
                        "</td>" +
                        "<td class=\"text-center\" style=\"vertical-align: middle;width: 33.33%;\">" +
                                packages[i].frequency + " Display Per Cycle" +
                        "</td>" +
                        "<td class=\"text-center\" style=\"vertical-align: middle;width: 33.33%;\">" +
                                "$" + packages[i].price +
                        "</td>" +
                        "</tr>";
                }
                $("#billboard-packages").empty();
                $("#billboard-packages").append(package);
        });
  });

  $("#request-btn").click(function(){
	if(currentSelectedPackage != null && $("#upload-image").val() != ""){
		fd.append('billboardID', parseInt(currentBillboardID));
		fd.append('userID', 1); //Change later.
		fd.append('sDate', startingDate);
		fd.append('packetID', parseInt(currentSelectedPackage.attr("id")));
		fd.append('fileName', files.name.split(".")[0]);
		fd.append('extension', files.type.substring(6));
		fd.append('size', files.size);
		fd.append('width', img.width);
		fd.append('height', img.height);
		fd.append('ratio', getAspectRatio(img.width, img.height));
		$.ajax({
			url: '../server/user-make-request.php',
            		type: 'POST',
            		data: fd,
            		mimeType:"multipart/form-data",
            		contentType: false,
            		processData: false,
            		success: function(response){
	                    	console.log(response);
            		}
		});
	} else {
		alert("Make sure to pick all fields.");
	}
  });
  
  $("#upload-image").bind('change', function() {
        files = this.files[0];
        fd.append('upload-image',files);

	var fr = new FileReader;
    	fr.readAsDataURL(this.files[0]);
    
    	fr.onload = function() {
        	img = new Image;
               	img.src = fr.result;

        	img.onload = function() {
        	};
        
    	};    
  });
  
  $('#reportrange').daterangepicker({
	startDate: start,
	singleDatePicker:true,
	opens: 'center'
  }, updateDate);

  //updateDate(start);  

});

function updateDate(start) {
	$('#reportrange span').html(start.format('MMMM D, YYYY'));
	startingDate = start.format('YYYY-MM-DD');
	$.get("../server/user-billboard-packages.php",
		{
			billboardID: currentBillboardID,
			date: startingDate	
		}, function(data, status){
                packages = JSON.parse(data);
                var package = "";
                for (var i = 0; i < packages.length; i++) {
                        package += "<tr id=\"" + packages[i].id + "\" class=\"clickable-package " + ((packages[i].availability) ? "open" : "") + "\">" +
                        "<td class=\"text-center\" style=\"vertical-align: middle;width: 33.33%;\">" +
                        	packages[i].duration + " Day(s)" +
			"</td>" +
                        "<td class=\"text-center\" style=\"vertical-align: middle;width: 33.33%;\">" +
                        	packages[i].frequency + " Display Per Cycle" +
			"</td>" +
                        "<td class=\"text-center\" style=\"vertical-align: middle;width: 33.33%;\">" +
                        	"$" + packages[i].price +
			"</td>" +
                        "</tr>";
                }
                $("#billboard-packages").empty();
                $("#billboard-packages").append(package);
        });
}

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
			"<span id=\"" + i + "\" class=\"glyphicon glyphicon-shopping-cart actions request-action\" data-toggle=\"modal\" data-target=\"#requestModal\"><br><p>Request</p></span>" +
			"</td>" +
			"</tr>";
		}
		$("#billboards").empty();
		$("#billboards").append(billboard);
	});
}

function getAspectRatio(width, height){
	var remainder;
	var a = width;
	var b = height;
	while ((a % b) > 0)  {
    		remainder = a % b;
    		a = b;
    		b = remainder;
  	}

	return Math.floor(width/b) + ":" + Math.floor(height/b);
}
