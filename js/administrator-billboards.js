/*Administrator billboards JavaScript*/
var billboardInfo_ID;
var packages;
var regulations;
var rejections;
var files;
var img;
var imgedit;
var fd = new FormData();
var format = [];

$(document).ready(function(){
	
	getBillboards();
	  
	$('#image-extensions').multiSelect({
		afterSelect: function(values){
			format.push(values[0]);
		},
		afterDeselect: function(values){
			format.splice(format.indexOf(values[0]), 1);
		}
	});
	
    $(".nav-tabs a").click(function(){
      $(this).tab('show');
    });
	
	$('#btnaddpackage').click(function(){
		console.log('btnaddpackage clicked!');
		var newPackage = "<tr>" +
		"<td><input id=\"Duration\" type=\"number\" class=\"form-control\" name=\"Duration\" placeholder=\"Duration\"></td>" +
		"<td><input id=\"Frequency\" type=\"number\" class=\"form-control\" name=\"Frequency\" placeholder=\"Frequency\"></td>" +
		"<td><input id=\"Price\" type=\"number\" class=\"form-control\" name=\"Price\" placeholder=\"Price\"></td>" +
		"<td>" +
		"<div class=\"column\">" +
		"<div class=\"row\">" +
		"<div class=\"col-lg-6\">" +
		"<a href=\"#\"><span class=\"glyphicon glyphicon-trash actions remove\"><br></span></a>" +
		"</div>" +
		"</div>" +
		"</td>";
		$("#add-package").append(newPackage);
	});
	
	$('#btnaddregulation').click(function(){
		console.log('btnaddregulation clicked!');
		var newRegulation = "<tr>" +
		"<td><input id=\"Regulation\" type=\"text\" class=\"form-control\" name=\"Regulation\" placeholder=\"Regulation Description\"></td>" +
		"<td>" +
		"<div class=\"column\">" +
		"<div class=\"row\">" +
		"<div class=\"col-lg-6\">" +
		"<a href=\"#\"><span class=\"glyphicon glyphicon-trash actions remove\"><br></span></a>" +
		"</div>" +
		"</div>" +
		"</td>";
		$("#add-regulation").append(newRegulation);
	});
	
	$('#btnaddrejection').click(function(){
		console.log('btnaddrejection clicked!');
		var newRejection = "<tr>" +
		"<td><input id=\"Rejection\" type=\"text\" class=\"form-control\" name=\"Rejection\" placeholder=\"Rejection Description\"></td>" +
		"<td>" +
		"<div class=\"column\">" +
		"<div class=\"row\">" +
		"<div class=\"col-lg-6\">" +
		"<a href=\"#\"><span class=\"glyphicon glyphicon-trash actions remove\"><br></span></a>" +
		"</div>" +
		"</div>" +
		"</td>";
		$("#add-rejection").append(newRejection);
	});
	
	$("table").on("click", "tr .remove", function(){
		 $(this).closest('tr').remove();
	});
	
	$('#btnnewbillboard').click(function(){
		console.log('btnnewbillboard clicked!');
		var empty = false;
		var packages = [];
		var regulations = [];
		var rejections = [];
		var extensions = "";
		$("#add-package tr").each(function() {
			$(this).find('td').find('input').each(function(){
				if(this.value == ""){
					empty = true;
				}else{
					packages.push(this.value);
				}
			});
		});
		
		$("#add-regulation tr").each(function() {
			$(this).find('td').find('input').each(function(){
				if(this.value == ""){
					empty = true;
				}else{
					regulations.push(this.value);
				}
			});
		});
		
		$("#add-rejection tr").each(function() {
			$(this).find('td').find('input').each(function(){
				if(this.value == ""){
					empty = true;
				}else{
					rejections.push(this.value);
				}
			});
		});
		
		$.each(format,function(key,value){
			console.log(value);
			extensions += format.value + ":";
		});
		
		console.log(packages);	
		console.log(regulations);
		console.log(rejections);
		console.log(extensions);
		if(empty){
			alert("Fill out all added fields!");	
		}else if(validateBillboard()){
		alert('Missing billboard information');
		}else{
			//newBillboard(packages,regulations,rejections);
		}
	});
	
	$('#btnupdatebillboard').click(function(){
		console.log('btnupdatebillboard clicked!');
		var packages = [];
		var regulations = [];
		var rejections = [];
		$("#edit-package tr").each(function() {
			if($(this).attr("id") == null){
				$(this).find('td').find('input').each(function(){
					packages.push(this.value);
				});
			}
		});
		
		$("#edit-regulation tr").each(function() {
			if($(this).attr("id") == null){
				$(this).find('td').find('input').each(function(){
					regulations.push(this.value);
				});
			}
		});
		
		$("#edit-rejection tr").each(function() {
			if($(this).attr("id") == null){
				$(this).find('td').find('input').each(function(){
					rejections.push(this.value);
				});
			}
		});
		
		console.log(packages);	
		console.log(regulations);
		console.log(rejections);
		updateBillboard(packages,regulations,rejections);
	});
	
	$("#billboard-img").change(function(){
	        readURL(this);
        	console.log(this.id);
	});
	
	$("#billboard-edit-img").change(function(){
	        readURL(this);
        	console.log(this.id);
	});
	
	$("table").on("click", "tr .information", function(){
		fd = new FormData();
		billboardInfo_ID = $(this).attr("id");
		$.get("../server/administrator-billboardInfo.php", 
			{id: billboardInfo_ID},
			function(data, status){
			console.log(data);
			var info = JSON.parse(data);
			$("#editBillboardname").attr('value',info.name);
			$("#billboard-edit-img-tag").attr('src',info.img);
			$("#editdescription").val(info.description);
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
	
		
		$.get("../server/administrator-billboard-packages.php", 
			{id: billboardInfo_ID}, 
			function(data, status){
			console.log(data);
			if(data == "No results"){
				console.log('No pacakages found!!');
			}else{
				packages = JSON.parse(data);
                var package = "";
                for (var i = 0; i < packages.length; i++) {
					package += "<tr id=\"" + packages[i].id + "\">" +
					"<td>"+packages[i].duration + " Day(s)</td>" +
					"<td>"+packages[i].frequency + "</td>" +
					"<td>$"+packages[i].price + "</td>" +
					"<td>" +
					"<div class=\"column\">" +
					"<div class=\"row\">" +
					"<div class=\"col-lg-6\">" +
					"<a href=\"#\"><span class=\"glyphicon glyphicon-trash actions deletepackage\"><br></span></a>" +
					"</div>" +
					"</div>" +
					"</td>";
                		}
				$("#edit-package").empty();
		        $("#edit-package").append(package);
			}
			
		});
		
		$.get("../server/administrator-billboard-regulations.php", 
			{id: billboardInfo_ID}, 
			function(data, status){
			console.log(data);
			if(data == "No results"){
				console.log('No regulations found!!');
			}else{
				regulations = JSON.parse(data);
                var regulation = "";
                for (var i = 0; i < regulations.length; i++) {
					regulation +=  "<tr id=\"" + regulations[i].id + "\">" +
					"<td><input id=\"Regulation\" value =\"" + regulations[i].regulation + "\" type=\"text\" class=\"form-control\" name=\"Regulation\" placeholder=\"Regulation Description\"></td>" +
					"<td>" +
					"<div class=\"column\">" +
					"<div class=\"row\">" +
					"<div class=\"col-lg-6\">" +
					"<a href=\"#\"><span class=\"glyphicon glyphicon-trash actions deleteregulation\"><br></span></a>" +
					"</div>" +
					"</div>" +
					"</td>";
                }
				$("#edit-regulation").empty();
		        $("#edit-regulation").append(regulation);
			}
			
		});
		$.get("../server/administrator-billboard-rejections.php", 
			{id: billboardInfo_ID}, 
			function(data, status){
			console.log(data);
			if(data == "No results"){
				console.log('No rejections found!!');
			}else{
				rejections = JSON.parse(data);
                var rejection = "";
                for (var i = 0; i < rejections.length; i++) {
					rejection += "<tr id=\"" + rejections[i].id + "\">" +
					"<td><input id=\"Rejection\" value =\"" + rejections[i].rejection + "\" type=\"text\" class=\"form-control\" name=\"Rejection\" placeholder=\"Rejection Description\"></td>" +
					"<td>" +
					"<div class=\"column\">" +
					"<div class=\"row\">" +
					"<div class=\"col-lg-6\">" +
					"<a href=\"#\"><span class=\"glyphicon glyphicon-trash actions deleterejection\"><br></span></a>" +
					"</div>" +
					"</div>" +
					"</td>";
               	}
				$("#edit-rejection").empty();
		        $("#edit-rejection").append(rejection);
			}
			
		});
	});
	
	$('#btneditpackage').click(function(){
		console.log('btnaddpackage clicked!');
		var newPackage = "<tr>" +
		"<td><input id=\"Duration\" type=\"number\" class=\"form-control\" name=\"Duration\" placeholder=\"Duration\"></td>" +
		"<td><input id=\"Frequency\" type=\"number\" class=\"form-control\" name=\"Frequency\" placeholder=\"Frequency\"></td>" +
		"<td><input id=\"Price\" type=\"number\" class=\"form-control\" name=\"Price\" placeholder=\"Price\"></td>" +
		"<td>" +
		"<div class=\"column\">" +
		"<div class=\"row\">" +
		"<div class=\"col-lg-6\">" +
		"<a href=\"#\"><span class=\"glyphicon glyphicon-trash actions remove\"><br></span></a>" +
		"</div>" +
		"</div>" +
		"</td>";
		$("#edit-package").append(newPackage);
	});
	
	$('#btneditregulation').click(function(){
		console.log('btnaddregulation clicked!');
		var newRegulation = "<tr>" +
		"<td><input id=\"Regulation\" type=\"text\" class=\"form-control\" name=\"Regulation\" placeholder=\"Regulation Description\"></td>" +
		"<td>" +
		"<div class=\"column\">" +
		"<div class=\"row\">" +
		"<div class=\"col-lg-6\">" +
		"<a href=\"#\"><span class=\"glyphicon glyphicon-trash actions remove\"><br></span></a>" +
		"</div>" +
		"</div>" +
		"</td>";
		$("#edit-regulation").append(newRegulation);
	});
	
	$('#btneditrejection').click(function(){
		console.log('btnaddrejection clicked!');
		var newRejection = "<tr>" +
		"<td><input id=\"Rejection\" type=\"text\" class=\"form-control\" name=\"Rejection\" placeholder=\"Rejection Description\"></td>" +
		"<td>" +
		"<div class=\"column\">" +
		"<div class=\"row\">" +
		"<div class=\"col-lg-6\">" +
		"<a href=\"#\"><span class=\"glyphicon glyphicon-trash actions remove\"><br></span></a>" +
		"</div>" +
		"</div>" +
		"</td>";
		$("#edit-rejection").append(newRejection);
	});
		
	$("table").on("click", "tr .deleteBillboard", function(){
		console.log('deleteBillboard clicked');
		var billboardID = $(this).closest('span').attr("id");
		console.log(billboardID);
		var tr = $(this).closest('tr');
		$.post("../server/administrator-delete-billboard.php",
			{
				id:billboardID
			},function(data,status){
				if(status === "success"){
					console.log(data);
					console.log(status);
					tr.remove();
				}else{
					console.log('Error deleting billboard!!');
				}
		});		
	});

	
	$("table").on("click", "tr .deletepackage", function(){
		var packageID = $(this).closest('tr').attr("id");
		var tr = $(this).closest('tr');
		$.post("../server/administrator-delete-package.php",
			{
				id:packageID
			},function(data,status){
				if(status === "success"){
					console.log(status);
					tr.remove();
				}else{
					console.log('Error deleting pacakge!!');
				}
		});
	});
	$("table").on("click", "tr .deleteregulation", function(){
		var regulationID = $(this).closest('tr').attr("id");
		var tr = $(this).closest('tr');
		$.post("../server/administrator-delete-regulation.php",
			{
				id:regulationID
			},function(data,status){
				if(status === "success"){
					console.log(status);
					tr.remove();
				}else{
					console.log('Error deleting regulation!!');
				}
		});
	});
	
	$("table").on("click", "tr .deleterejection", function(){
		var rejectionID = $(this).closest('tr').attr("id");
		var tr = $(this).closest('tr');
		$.post("../server/administrator-delete-rejection.php",
			{
				id:rejectionID
			},function(data,status){
				if(status === "success"){
					console.log(status);
					tr.remove();
				}else{
					console.log('Error deleting rejection!!');
				}
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
			"<td class=\"text-center\" style=\"width: 50%;text-align: center;\"><a href=\"#\"><span id=\"" + billboards[i].id + "\"  class=\"glyphicon glyphicon-pencil actions information\" data-toggle=\"modal\" data-target=\"#EditModal\"><br></span></a>" +
			"<a href=\"#\"><span id=\"" + billboards[i].id + "\" class=\"glyphicon glyphicon-trash actions deleteBillboard\"><br></span></a>" +
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
		files = input.files[0];
		fd = new FormData();
		fd.append('uploadimage',files);
		reader.readAsDataURL(input.files[0]);
		
		reader.onload = function (e) {
			if(input.id == 'billboard-img'){
				$('#billboard-img-tag').attr('src', e.target.result);
				}else{
				$('#billboard-edit-img-tag').attr('src', e.target.result);			
			}
		}
		
	}
}

function newBillboard(packages_in,regulations_in,rejections_in){
	fd.append('name',$("#addBillboardname").val());
	fd.append('description',$("#adddescription").val());
	fd.append('width',$("#addwidth").val());
	fd.append('height',$("#addheight").val());
	fd.append('latitude',$("#addlatitude").val());
	fd.append('longitude',$("#addlongitude").val());
	fd.append('minwidth',$("#addminwidth").val());
	fd.append('maxwidth',$("#addmaxwidth").val());
	fd.append('minheight',$("#addminheight").val());
	fd.append('maxheight',$("#addmaxheight").val());
	fd.append('readtime',$("#addreadtime").val());
	fd.append('impressions',$("#addimpressions").val());
	fd.append('traffic',$("#addtraffic").val());
	if(files != null){
		fd.append('fileName',files.name.split(".")[0]);
		fd.append('extension',files.type.substring(6));
	}
	fd.append('packages',JSON.stringify(packages_in));
	fd.append('regulations',JSON.stringify(regulations_in));
	fd.append('rejections',JSON.stringify(rejections_in));
	$.ajax({
		url:"../server/administrator-add-billboard.php",
		type: 'POST',
		data: fd,
		mimeType:"multipart/form-data",
		contentType: false,
		processData: false,
		success: function(response){
			console.log(response);
			location.reload();
		}
	});

}

function validateBillboard(){
	var billboardName = true;
	var billboardDescription = true;
	var billboardRGEX = /[^A-Za-z0-9\s@&#]/;
	if ($("#addBillboardname").val() == ""){
		billboardName = false;
		alert("Missing billboard name!");
	}
	else if(format.length == 0){
		billboardName = false;
		alert("Missing billboard images format!");
	}
	else{
		billboardName = billboardRGEX.test($("#addBillboardname").val());
		billboardDescription = billboardRGEX.test($("#adddescription").val());
	}
	return billboardName && billboardDescription;
}

function updateBillboard(packages_in,regulations_in,rejections_in){
	if(files != null){
		console.log('changed image');
		fd.append('fileName',files.name.split(".")[0]);
		fd.append('extension',files.type.substring(6));
	}
	fd.append('id',billboardInfo_ID);
	fd.append('name',$("#editBillboardname").val());
	fd.append('description',$("#editdescription").val());
	fd.append('width',$("#width").val());
	fd.append('height',$("#height").val());
	fd.append('latitude',$("#latitude").val());
	fd.append('longitude',$("#longitude").val());
	fd.append('minwidth',$("#min-wid").val());
	fd.append('maxwidth',$("#max-wid").val());
	fd.append('minheight',$("#min-hei").val());
	fd.append('maxheight',$("#max-hei").val());
	fd.append('readtime',$("#read-time").val());
	fd.append('impressions',$("#impressions").val());
	fd.append('traffic',$("#traffic").val());
	fd.append('packages',JSON.stringify(packages_in));
	fd.append('regulations',JSON.stringify(regulations_in));
	fd.append('rejections',JSON.stringify(rejections_in));
	$.ajax({
		url:"../server/administrator-update-billboard.php",
		type: 'POST',
		data: fd,
		mimeType:"multipart/form-data",
		contentType: false,
		processData: false,
		success: function(response){
			console.log(response);
		}
	});
}

(function ($) {
$('.spinner .btn:first-of-type').on('click', function() {
  $('.spinner input').val( parseInt($('.spinner input').val(), 10) + 1);
});
$('.spinner .btn:last-of-type').on('click', function() {
  $('.spinner input').val( parseInt($('.spinner input').val(), 10) - 1);
});
})(jQuery);
  
  
  
