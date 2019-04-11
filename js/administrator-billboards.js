/*Administrator billboards JavaScript*/
var packages;
var regulations;
var rejections;
var files;
var img;
var imgedit;
var fd;

$(document).ready(function(){
	
	getBillboards();
	  
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
		var packages = [];
		var regulations = [];
		var rejections = [];
		$("#add-package tr").each(function() {
			$(this).find('td').find('input').each(function(){
				packages.push(this.value);
			});
		});
		
		$("#add-regulation tr").each(function() {
			$(this).find('td').find('input').each(function(){
				regulations.push(this.value);
			});
		});
		
		$("#add-rejection tr").each(function() {
			$(this).find('td').find('input').each(function(){
				rejections.push(this.value);
			});
		});
		
		console.log(packages);	
		console.log(regulations);
		console.log(rejections);
		newBillboard(packages,regulations,rejections);
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
		var billboardID = $(this).attr("id");
		$.get("../server/user-billboardInfo.php", 
			{id: billboardID},
			function(data, status){
			console.log(data);
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
	
		
		$.get("../server/administrator-billboard-packages.php", 
			{id: billboardID}, 
			function(data, status){
			console.log(data);
			if(data == "No results"){
				console.log('No pacakages found!!');
			}else{
				packages = JSON.parse(data);
                var package = "";
                for (var i = 0; i < packages.length; i++) {
					package += "<tr id=\"" + packages[i].id + "\">" +
					"<td>"+packages[i].duration + "Day</td>" +
					"<td>"+packages[i].frequency + "</td>" +
					"<td>"+packages[i].price + "</td>" +
					"<td>" +
					"<div class=\"column\">" +
					"<div class=\"row\">" +
					"<div class=\"col-lg-6\">" +
					"<a href=\"#\"><span class=\"glyphicon glyphicon-trash actions delete\"><br></span></a>" +
					"</div>" +
					"</div>" +
					"</td>";
                		}
				$("#edit-packages").empty();
		        $("#edit-packages").append(package);
			}
			
		});
		
		$.get("../server/administrator-billboard-regulations.php", 
			{id: billboardID}, 
			function(data, status){
			console.log(data);
			if(data == "No results"){
				console.log('No regulations found!!');
			}else{
				regulations = JSON.parse(data);
                var package = "";
                for (var i = 0; i < regulations.length; i++) {
					package +=  "<tr id=\"" + regulations[i].id + "\">" +
					"<td><input id=\"Regulation\" value =\"" + regulation[i].regulation + "\" type=\"text\" class=\"form-control\" name=\"Regulation\" placeholder=\"Regulation Description\"></td>" +
					"<td>" +
					"<div class=\"column\">" +
					"<div class=\"row\">" +
					"<div class=\"col-lg-6\">" +
					"<a href=\"#\"><span class=\"glyphicon glyphicon-trash actions remove\"><br></span></a>" +
					"</div>" +
					"</div>" +
					"</td>";
                }
				$("#edit-regulations").empty();
		        $("#edit-regulations").append(package);
			}
			
		});
		$.get("../server/administrator-billboard-rejections.php", 
			{id: billboardID}, 
			function(data, status){
			console.log(data);
			if(data == "No results"){
				console.log('No rejections found!!');
			}else{
				rejections = JSON.parse(data);
                var package = "";
                for (var i = 0; i < rejections.length; i++) {
					package += "<tr> id=\"" + rejections[i].id + "\"" +
					"<td><input id=\"Rejection\" value =\"" + rejections[i].rejection + "\" type=\"text\" class=\"form-control\" name=\"Rejection\" placeholder=\"Rejection Description\"></td>" +
					"<td>" +
					"<div class=\"column\">" +
					"<div class=\"row\">" +
					"<div class=\"col-lg-6\">" +
					"<a href=\"#\"><span class=\"glyphicon glyphicon-trash actions remove\"><br></span></a>" +
					"</div>" +
					"</div>" +
					"</td>";
               	}
				$("#edit-rejections").empty();
		        $("#edit-rejections").append(package);
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

	
	$("table").on("click", "tr .delete", function(){
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
				img = new Image;
				imgedit = new Image;
               			img.src = reader.result;

				img.onload = function() {
				};				
				}else{
				$('#billboard-edit-img-tag').attr('src', e.target.result);
				imgedit = new Image;
               			imgedit.src = reader.result;

				imgedit.onload = function() {
				};				
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
	fd.append('fileName',files.name.split(".")[0]);
	fd.append('extension',files.type.substring(6));
	//cycle:$("#addBillboardname").val()
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
  
  
  
