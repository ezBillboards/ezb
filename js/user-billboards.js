var billboards;
var startingDate;
var packages;
var currentBillboardID;
var currentSelectedPackage = null;
var files;
var img;
var fd;
var index;

$(document).ready(function(){

  $("#search").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("tbody#billboards tr").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
  });

  var start = moment();  
  getBillboards();

  $("table").on("click", "tr .information", function(){
  	var billboardID = $(this).attr("id");
	$.get("../server/user-billboardInfo.php", {id: billboardID}, function(data, status){
  		var info = JSON.parse(data);
		console.log("Info: " + data);
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
		$("#extensions").empty();
		var extensions = info.extensions.split(":");
		var i;
		for(i = 0; i < extensions.length; i++){
			$("#extensions").append(extensions[i]);
			if(i < extensions.length - 1){
				$("#extensions").append(", ");
			}
		}
		$("#ratios").empty();
		var ratios = info.ratios.split(",");
                for(i = 0; i < ratios.length; i++){
                        $("#ratios").append(ratios[i]);
                        if(i < ratios.length - 1){
                                $("#ratios").append(", ");
                        }
                }
	});
  });
  
  $("table").on("click", "tr.clickable-package", function(){
	if($(this).attr("class").includes("open")) {
		if(currentSelectedPackage != null) currentSelectedPackage.removeClass("selected-package");
		currentSelectedPackage = $(this);
		console.log(currentSelectedPackage);
		$(this).addClass("selected-package");
	}
  });

  $("table").on("click", "tr .request-action", function(){
	$('#reportrange').data('daterangepicker').setStartDate(moment());
	$('#reportrange').data('daterangepicker').setEndDate(moment());
	index = $(this).attr("id");
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
                        package += "<tr id=\"" + i + "\" class=\"clickable-package " + ((packages[i].availability) ? "open" : "") + "\">" +
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
     if(sessionStorage.getItem('ID') != null){
	if(currentSelectedPackage != null && $("#upload-image").val() != ""){
	   console.log(index);
	   console.log(img.width + " >= ? " + billboards[index].minWidth);
           console.log(img.height + " >= ? " + billboards[index].minHeight);
           console.log(files.type.substring(6) + " == ? " + billboards[index].extensions);
           console.log(getAspectRatio(img.width, img.height) + " == ? " + billboards[index].ratios);
	   console.log(sessionStorage.getItem('ID'));
	   var fileNameREGEX = /^(\d|\w)+$/;
	   if(fileNameREGEX.test(files.name.split(".")[0]) &&
		img.width >= billboards[index].minWidth &&
		img.height >= billboards[index].minHeight &&
		billboards[index].extensions.indexOf(files.type.substring(6)) != -1 &&
		billboards[index].ratios.indexOf(getAspectRatio(img.width, img.height)) != -1)
		{
		fd.append('billboardID', parseInt(currentBillboardID));
		fd.append('userID', sessionStorage.getItem('ID'));
		fd.append('userEmail', sessionStorage.getItem('email'));
		fd.append('sDate', startingDate);
		fd.append('packetID', packages[parseInt(currentSelectedPackage.attr("id"))].id);
		fd.append('duration', packages[parseInt(currentSelectedPackage.attr("id"))].duration);
		fd.append('frequency', packages[parseInt(currentSelectedPackage.attr("id"))].frequency);
		fd.append('price', packages[parseInt(currentSelectedPackage.attr("id"))].price);
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
		$("#requestModal").modal("hide");
	  } else {
	  	alert("The image doesn't meet the requirements of this billboard.");
	  }
	} else {
		alert("Make sure to pick all fields.");
	}
     } else {
	//alert("You must be logged in to make a request.");
	$("#loginModal").modal("show");	
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
	minDate: start,
	maxDate: moment().add(3,'months'),
	singleDatePicker:true,
	opens: 'center'
  }, updateDate);

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
                        package += "<tr id=\"" + i + "\" class=\"clickable-package " + ((packages[i].availability) ? "open" : "") + "\">" +
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
		console.log(billboards);
		var billboard = "";
		for (var i = 0; i < billboards.length; i++) {
			billboard += "<tr>" +
			"<td class=\"text-center\" style=\"width: 33.33%;text-align: center;vertical-align: middle;\">" +
				"<img class=\"img-rounded\ billboard-images\" src=\""+ billboards[i].img + "\"></img>" +
			"</td>" +
			"<td class=\"text-center\" style=\"width: 33.33%;text-align: center;vertical-align: middle;\">" +
				"<h4>" + billboards[i].name + "</h4><h5>" + billboards[i].description + "</h5>" +
			"</td>" +
			"<td class=\"text-center\" style=\"vertical-align: middle;width: 33.33%;\">" +
				"<span id=\"" + billboards[i].id + "\" class=\"glyphicon glyphicon-info-sign actions information\" data-toggle=\"modal\" data-target=\"#infoModal1\"><br><p style=\"font-size: 14px;\"><b><i>Information</b></i></p></span>" +
				"<span id=\"" + i + "\" class=\"glyphicon glyphicon-shopping-cart actions request-action\" data-toggle=\"modal\" data-target=\"#requestModal\"><br><p style=\"font-size: 14px;\"><b><i>Request</b></i></p></span>" +
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
