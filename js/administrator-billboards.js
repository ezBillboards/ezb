/*Administrator billboards JavaScript*/
var billboardInfo_ID;
var packages;
var regulations;
var rejections;
var files;
var img;
var imgedit;
var fd = new FormData();

var tab = 'Add';

$(document).ready(function(){
	
	$(".nav-tabs a").click(function(){
		$(this).tab('show');
		tab = $(this).text();
		if(tab === 'Add')
			console.log('add');
		else if(tab === 'Edit')
			console.log('Edit');
	});
	
	$.get("../server/get-image-path.php", function(data, status){
		$("#tab-logo").attr("href", data + "img/ezb/EZBillboardsLeftLogo.png");
                $("#ezb-logo").attr("src", data + "img/ezb/EZBillboardsLogo.png");
        });	

	getBillboards();
	
	$('#btnaddpackage').click(function(){
		console.log('btnaddpackage clicked!');
		var newPackage = "<tr>" +
		"<td><input id=\"Duration\" type=\"number\" class=\"form-control\" name=\"Duration\" placeholder=\"Duration\"></td>" +
		"<td><input id=\"Frequency\" type=\"number\" class=\"form-control\" name=\"Frequency\" placeholder=\"Frequency\"></td>" +
		"<td><input id=\"Price\" type=\"number\" step=\"0.01\" class=\"form-control\" name=\"Price\" placeholder=\"Price\"></td>" +
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
		//console.log('btnnewbillboard clicked!');
		var emptyPack = false;
		var emptyReg = false;
		var emptyRej = false;
		var errPack = false;
		var errReg = false;
		var errRej = false;
		var errZero = false;
		var errCycle = false;
		var errNumber = false;
		var errPrice = false;
		var packages = [];
		var regulations = [];
		var rejections = [];
		var extensions = "";
		var ratios = "";
		
		$("#add-package tr").each(function() {
			var i = 1;
			$(this).find('td').find('input').each(function(){
				if(this.value == ""){
					emptyPack = true;
					//i = i +1;
				}else if(this.value <= 0){
					errZero = true;
				}else{
					if (i % 3 == 0){
						var price = this.value.split(".");
						var strPrice = this.value.toString();
						console.log(price);
						if(this.value.toString().charAt(0) == "."){
							if(price[0].length > 2){
								console.log('char at 0');
								errPrice = true;
							}
						}else{
							if(price.length == 2){
								if(price[1].length > 2){
									console.log('Decimal > 2');
									errPrice = true;
								}
								else if(price[0].length > 12){
									console.log('Integer > 12');
									errPrice = true;
								}
							}else if(price.length == 1){
								if(price[0].length > 12){
									console.log('Integer > 12');
									errPrice = true;
								}
							}else{
								errPrice = true;
							}
						}
					}else{
						var intValue = this.value.split(".");
						if(this.value.toString().charAt(0) == "."){
							errNumber = true;
							console.log("Not an integer");
						}else if(intValue.length > 1){
							errNumber = true;
							console.log("Not an integer");
						}
						if(i % 3 == 2){
							if(this.value > $("#addcycle").val()){
								errCycle = true;
							}
						}
					}

				}
				i = i + 1;
				packages.push(this.value);
			});
		});
		
		$("#add-regulation tr").each(function() {
			$(this).find('td').find('input').each(function(){
				if(this.value == ""){
					emptyReg = true;
				}else{
					regulations.push(this.value);
				}
			});
		});
		
		$("#add-rejection tr").each(function() {
			$(this).find('td').find('input').each(function(){
				if(this.value == ""){
					emptyRej = true;
				}else{
					rejections.push(this.value);
				}
			});
		});
		
		$.each($("input[name='image-ratio']:checked"), function(){            
                ratios += $(this).val() + ",";
        });
		
		$.each($("input[name='image-extensions']:checked"), function(){            
                extensions += $(this).val() + ":";
        });
		
		ratios = ratios.substring(0, ratios.length-1);
		extensions = extensions.substring(0, extensions.length-1);
		//console.log(packages);	
		//console.log(regulations);
		//console.log(rejections);
		//console.log(extensions);
		//console.log(ratios);
		if(validateBillboard()){
			alert('Missing billboard information');
		}else if(!$("#addwidth").val()){
			alert("Insert width");
		}else if(!$("#addheight").val()){
			alert("Insert height");
		}else if(!$("#addminwidth").val()){
			alert("Insert minimum width");
		}else if(!$("#addminheight").val()){
			alert("Insert minimum height");
		}else if(!$("#addmaxwidth").val()){
			alert("Insert maximum width");
		}else if(!$("#addmaxheight").val()){
			alert("Insert maximum height");
		}else if(extensions.length == 0){
			alert("Add at least one extension");
		}else if(ratios.length == 0){
			alert("Add at least one ratio");
		}else if(packages.length == 0){
			alert("Add at least one package");
		}else if(regulations.length == 0){
			alert("Add at least one regulation");
		}else if(rejections.length == 0){
			alert("Add at least one Rejection");
		}else if(emptyPack){
			alert("Fill out all package fields!");
		}else if(errZero){
			alert("Duration, cycle and price cannot be less or equal to zero");
		}else if(errNumber){
			alert("Not a valid integer for duration or cycle");
		}else if(errCycle){
			alert("Display per cycle larger than billboard cycle");
		}else if(errPrice){
			alert("Not a valid price number");
		}else if(emptyReg){
			alert("Fill out all regulations fields!");
		}else if(emptyRej){
			alert("Fill out all rejections fields!");
		}else{
			alert("Validated information");
			//newBillboard(packages,regulations,rejections,ratios,extensions);
		}
	});
	
	$('#btnupdatebillboard').click(function(){
		console.log('btnupdatebillboard clicked!');
		var existingpackages = [];
		var existingregulations = [];
		var existingrejections = [];
		var packages = [];
		var regulations = [];
		var rejections = [];
		var ratios = "";
		var extensions = "";
		$("#edit-package tr").each(function() {
			if($(this).attr("id") == null){
				$(this).find('td').find('input').each(function(){
					packages.push(this.value);
				});
			}else{
				existingpackages.push(($(this).attr("id")));
				$(this).find('td').find('input').each(function(){
					existingpackages.push(this.value);
				});
			}
		});
		
		$("#edit-regulation tr").each(function() {
			if($(this).attr("id") == null){
				$(this).find('td').find('input').each(function(){
					regulations.push(this.value);
				});
			}else{
				existingregulations.push(($(this).attr("id")));
				$(this).find('td').find('input').each(function(){
					existingregulations.push(this.value);
				});
			}
		});
		
		$("#edit-rejection tr").each(function() {
			if($(this).attr("id") == null){
				$(this).find('td').find('input').each(function(){
					rejections.push(this.value);
				});
			}else{
				existingrejections.push(($(this).attr("id")));
				$(this).find('td').find('input').each(function(){
					existingregulations.push(this.value);
				});
			}
		});
		
		$.each($("input[name='edit-image-ratio']:checked"), function(){            
                ratios += $(this).val() + ",";
        });
		
		$.each($("input[name='edit-image-extensions']:checked"), function(){            
                extensions += $(this).val() + ":";
        });
		
		ratios = ratios.substring(0, ratios.length-1);
		extensions = extensions.substring(0, extensions.length-1);
		console.log(ratios);
		console.log(extensions);
		console.log(packages);	
		console.log(regulations);
		console.log(rejections);
		console.log(existingpackages);
		console.log(existingregulations);
		console.log(existingrejections);
		updateBillboard(packages,regulations,rejections,existingpackages,existingregulations,existingrejections,ratios,extensions);
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
		var editratio;
		var editextension;
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
			$("#cycle").attr('value',info.cycle);
			editextension = info.imageExtension.split(":");
			editratio = info.imageRatio.split(",");
			console.log(editextension);
			console.log(editratio);
		});	
		
		setTimeout(function() {
			$.each($("input[name='edit-image-ratio']"), function(){
				console.log($(this).val());
				var x = $.inArray(String($(this).val()), editratio);
				console.log(x);
				if(x != -1){
					$(this).prop('checked', true);
				}
			});
		
			$.each($("input[name='edit-image-extensions']"), function(){            
				console.log($(this).val());
				var x = $.inArray(String($(this).val()), editextension);
				console.log(x);
				if(x != -1){
					$(this).prop('checked', true);
				}
			});
		}, 500);

		
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
					"<td><input id=\"duration\" value =\""+packages[i].duration + "\" type=\"number\" class=\"form-control\" name=\"duration\"></td>" +
					"<td><input id=\"frequency\" value =\""+packages[i].frequency +"\" type=\"number\" class=\"form-control\" name=\"frequency\"></td>" +
					"<td><input id=\"price\" value =\""+packages[i].price +"\" type=\"number\" class=\"form-control\" name=\"Price\"></td>" +
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

function newBillboard(packages_in,regulations_in,rejections_in,ratio_in,extension_in){
	var cycle = $("#addcycle").val();
	var readTime = $("#addreadtime").val();
	var totalTime = 60*cycle;
	var slots = totalTime/readTime;
	console.log(totalTime);
	console.log(slots);
	console.log(extension_in);
	console.log(ratio_in);
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
	fd.append('readtime',readTime);
	fd.append('cycle',cycle);
	fd.append('slots',slots);
	fd.append('impressions',$("#addimpressions").val());
	fd.append('traffic',$("#addtraffic").val());
	fd.append('imageRatio',ratio_in);
	fd.append('imageExtension',extension_in);
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
			alert("Billboard created successfully");
			location.reload();
		}
	});

}

function validateBillboard(){
	var billboardName = true;
	var billboardDescription = true;
	var billboardRGEX = /[^A-Za-z0-9\s@&#]/;
	if ($("#addBillboardname").val() == ""){
		console.log("Missing billboard name!");
	}
	else{
		billboardName = false;
		billboardName = billboardRGEX.test($("#addBillboardname").val());
		billboardDescription = billboardRGEX.test($("#adddescription").val());
		console.log("Billboard name found");
	}
	
	console.log( billboardName || billboardDescription);
	return billboardName || billboardDescription;
}

function updateBillboard(packages_in,regulations_in,rejections_in,existingpackages_in,existingregulations_in,existingrejections_in,ratio_in,extension_in){
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
	fd.append('existingpackages',JSON.stringify(existingpackages_in));
	fd.append('existingregulations',JSON.stringify(existingregulations_in));
	fd.append('existingrejections',JSON.stringify(existingrejections_in));
	fd.append('cycle',$("#cycle").val());
	fd.append('imageRatio',ratio_in);
	fd.append('imageExtension',extension_in);
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
  
  
  
