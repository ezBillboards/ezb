/*Administrator billboards JavaScript*/
var billboardInfo_ID;
var packages;
var regulations;
var rejections;
var files;
var path;
var img;
var imgedit;
var fd = new FormData();

var tab = 'Add';

$(document).ready(function(){
/*************************
*Choose add or edit tabs
*************************/	
	$(".nav-tabs a").click(function(){
		$(this).tab('show');
		tab = $(this).text();
	});

/**************
*Get EZB logos
***************/
	$.get("../server/get-image-path.php", function(data, status){
		path = data;
		$("#tab-logo").attr("href", data + "img/ezb/EZBillboardsLeftLogo.png");
                $("#ezb-logo").attr("src", data + "img/ezb/EZBillboardsLogo.png");
        });	

	getBillboards();

/*****************
*Creates package
*****************/
	$('#btnaddpackage').click(function(){
		var newPackage = "<tr>" +
		"<td class=\"text-center\" style=\"width: 25%;text-align: center;vertical-align: middle;\"><input id=\"Duration\" type=\"number\" class=\"form-control\" name=\"Duration\" placeholder=\"Duration\"></td>" +
		"<td class=\"text-center\" style=\"width: 25%;text-align: center;vertical-align: middle;\"><input id=\"Frequency\" type=\"number\" class=\"form-control\" name=\"Frequency\" placeholder=\"Frequency\"></td>" +
		"<td class=\"text-center\" style=\"width: 25%;text-align: center;vertical-align: middle;\"><input id=\"Price\" type=\"number\" step=\"0.01\" class=\"form-control\" name=\"Price\" placeholder=\"Price\"></td>" +
		"<td class=\"text-center\" style=\"width: 25%;text-align: center;vertical-align: middle;\">" +
		"<span class=\"clickable glyphicon glyphicon-trash actions remove\" style=\"font-size: 35px;padding-left:5%;color:#2D2D2D;\"><br><p style=\"font-size: 14px;\"><b><i>Delete</i></b></p></span>" +
		"</td>";
		$("#add-package").append(newPackage);
	});
	
/*******************
*Creates regulation
*******************/
	$('#btnaddregulation').click(function(){
		var newRegulation = "<tr>" +
		"<td class=\"text-center\" style=\"width: 50%;text-align: center;vertical-align: middle;\"><input id=\"Regulation\" type=\"text\" class=\"form-control\" name=\"Regulation\" placeholder=\"Regulation Description\"></td>" +
		"<td class=\"text-center\" style=\"width: 50%;text-align: center;vertical-align: middle;\">" +
		"<span class=\"clickable glyphicon glyphicon-trash actions remove\" style=\"font-size: 35px;padding-left:5%;color:#2D2D2D;\"><br><p style=\"font-size: 14px;\"><b><i>Delete</i></b></p></span>" +
		"</td>";
		$("#add-regulation").append(newRegulation);
	});

/*******************
*Creates rejections
*******************/
	$('#btnaddrejection').click(function(){
		var newRejection = "<tr>" +
		"<td class=\"text-center\" style=\"width: 50%;text-align: center;vertical-align: middle;\"><input id=\"Rejection\" type=\"text\" class=\"form-control\" name=\"Rejection\" placeholder=\"Rejection Description\"></td>" +
		"<td class=\"text-center\" style=\"width: 50%;text-align: center;vertical-align: middle;\">" +
		"<span class=\"clickable glyphicon glyphicon-trash actions remove\" style=\"font-size: 35px;padding-left:5%;color:#2D2D2D;\"><br><p style=\"font-size: 14px;\"><b><i>Delete</i></b></p></span>" +
		"</td>";
		$("#add-rejection").append(newRejection);
	});
	
/***************************
*Deletes current billboard 
*and closes the modal
*fron the front end
****************************/
	$("table").on("click", "tr .remove", function(){
		$("#myModal").modal("show");
		 $(this).closest('tr').remove();
	});
	
/***************************
*Add new billboard
*fron the DB
****************************/

	$('#btnnewbillboard').click(function(){
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
/***************************
*Add new packages
*fron the DB
****************************/		
		$("#add-package tr").each(function() {
			var i = 1;
			$(this).find('td').find('input').each(function(){
				if(this.value == ""){
					emptyPack = true;
					//i = i +1;
				}else if(this.value <= 0){
					errZero = true;
				}else if(!this.value){
					errPrice = true;
				}else{
					if (i % 3 == 0){
						var price = this.value.split(".");
						var strPrice = this.value.toString();
						if(this.value.toString().charAt(0) == "."){
							if(price[0].length > 2){
								errPrice = true;
							}
						}else{
							if(price.length == 2){
								if(price[1].length > 2){
									errPrice = true;
								}
								else if(price[0].length > 12){
									errPrice = true;
								}
							}else if(price.length == 1){
								if(price[0].length > 12){
									errPrice = true;
								}
							}else{
								errPrice = true;
							}
						}
					}else{
						var intValue = this.value.split(".");
						if(this.value - Math.floor(this.value) != 0){
							errNumber = true;
						}else if(!this.value){
							errNumber = true;
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
		

/***************************
*Add new regulation
*fron the DB
****************************/
		$("#add-regulation tr").each(function() {
			$(this).find('td').find('input').each(function(){
				if(this.value == ""){
					emptyReg = true;
				}else{
					regulations.push(this.value);
				}
			});
		});

/***************************
*Add new rejection
*fron the DB
****************************/		
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

		if(validateBillboard()){
			alert('Missing billboard information');
		}else if(!$("#addwidth").val()){
			alert("Insert billboard width");
		}else if($("#addwidth").val() <=0){
			alert("Width can't be equal or less than zero");
		}else if($("#addwidth").val() - Math.floor($("#addwidth").val()) != 0){
			alert("Width has to be an integer");
		}else if(!$("#addheight").val()){
			alert("Insert billboard height");
		}else if($("#addheight").val() <=0){
			alert("Height can't be equal or less than zero");
		}else if($("#addheight").val() - Math.floor($("#addheight").val()) != 0){
			alert("Height has to be an integer");
		}else if(!$("#addminwidth").val()){
			alert("Insert image minimum width");
		}else if($("#addminwidth").val() <=0){
			alert("Minimum width can't be equal or less than zero");
		}else if($("#addminwidth").val() - Math.floor($("#addminwidth").val()) != 0){
			alert("Minimum width has to be an integer");
		}else if(!$("#addminheight").val()){
			alert("Insert image minimum height");
		}else if($("#addminheight").val() <=0){
			alert("Minimum height can't be equal or less than zero");
		}else if($("#addminheight").val() - Math.floor($("#addminheight").val()) != 0){
			alert("Minimum height has to be an integer");
		}else if(!$("#addmaxwidth").val()){
			alert("Insert image maximum width");
		}else if($("#addmaxwidth").val() <=0){
			alert("Maximum width can't be equal or less than zero");
		}else if($("#addmaxwidth").val() - Math.floor($("#addmaxwidth").val()) != 0){
			alert("Maximum width has to be an integer");
		}else if(!$("#addmaxheight").val()){
			alert("Insert image maximum height");
		}else if($("#addmaxheight").val() <=0){
			alert("Maximum height can't be equal or less than zero");
		}else if($("#addmaxheight").val() - Math.floor($("#addmaxheight").val()) != 0){
			alert("Maximum height has to be an integer");
		}else if($("#addmaxheight").val() < $("#addminheight").val()){
			alert("Maximum height can't be less than minimum height ");
		}else if($("#addmaxwidth").val() < $("#addminwidth").val()){
			alert("Maximum width can't be less than minimum width ");
		}else if(!$("#addlatitude").val()){
			alert("Insert billboard latitude");
		}else if($("#addlatitude").val() <=0){
			alert("Latitude can't be equal or less than zero");
		}else if(!$("#addlongitude").val()){
			alert("Insert billboard longitude");
		}else if($("#addlongitude").val() <=0){
			alert("Longitude can't be equal or less than zero");
		}else if(!$("#addimpressions").val()){
			alert("Insert billboard impressions");
		}else if($("#addimpressions").val() <=0){
			alert("Impressions can't be equal or less than zero");
		}else if($("#addimpressions").val() - Math.floor($("#addimpressions").val()) != 0){
			alert("Impressions has to be an integer");
		}else if(!$("#addtraffic").val()){
			alert("Insert traffic");
		}else if($("#addtraffic").val() <=0){
			alert("Traffic can't be equal or less than zero");
		}else if($("#addtraffic").val() - Math.floor($("#addtraffic").val()) != 0){
			alert("Traffic has to be an integer");
		}else if(!$("#addtolerance").val()){
			alert("Insert image tolerance");
		}else if($("#addtolerance").val() <=0){
			alert("Tolerance can't be equal or less than zero");
		}else if($("#addtolerance").val() - Math.floor($("#addtolerance").val()) != 0){
			alert("Tolerance has to be an integer");
		}else if(!$("#addcycle").val()){
			alert("Insert billboard cycle");
		}else if($("#addcycle").val() <=0){
			alert("Cycle can't be equal or less than zero");
		}else if($("#addcycle").val() - Math.floor($("#addcycle").val()) != 0){
			alert("Cycle has to be an integer");
		}else if(!$("#addreadtime").val()){
			alert("Insert billboard read time");
		}else if($("#addreadtime").val() <=0){
			alert("Read time can't be equal or less than zero");
		}else if($("#addreadtime").val() - Math.floor($("#addreadtime").val()) != 0){
			alert("Read time has to be an integer");
		}else if($("#addcycle").val()*60 % $("#addreadtime").val() != 0 ){
			alert("Cycle*60 % ReadTime must be equal to zero");
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
			alert("Fill out all package fields or verify numeric values");
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
			newBillboard(packages,regulations,rejections,ratios,extensions);
		}
	});

/***************************
*Update billboard
*fron the DB
****************************/
$('#btnupdatebillboard').click(function(){
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
		var existingpackages = [];
		var existingregulations = [];
		var existingrejections = [];
		var packages = [];
		var regulations = [];
		var rejections = [];
		var ratios = "";
		var extensions = "";

/***************************
*Edit package information
*fron the DB
****************************/
		$("#edit-package tr").each(function() {
			var i = 1;
			if($(this).attr("id") == null){
				$(this).find('td').find('input').each(function(){
					if(this.value == ""){
						emptyPack = true;
					}else if(this.value <= 0){
						errZero = true;
					}else if(!this.value){
						errPrice = true;
					}else{
						if (i % 3 == 0){
							var price = this.value.split(".");
							var strPrice = this.value.toString();
							if(this.value.toString().charAt(0) == "."){
								if(price[0].length > 2){
									errPrice = true;
								}
							}else{
								if(price.length == 2){
									if(price[1].length > 2){
										errPrice = true;
									}
									else if(price[0].length > 12){
										errPrice = true;
									}
								}else if(price.length == 1){
									if(price[0].length > 12){
										errPrice = true;
									}
								}else{
									errPrice = true;
								}
							}
						}else{
							var intValue = this.value.split(".");
							if(this.value - Math.floor(this.value) != 0){
								errNumber = true;
							}else if(!this.value){
								errNumber = true;
							}
							if(i % 3 == 2){
								if(this.value > $("#cycle").val()){
									errCycle = true;
								}
							}
						}

					}
					i = i + 1;
					packages.push(this.value);
				});
			}else{
				existingpackages.push(($(this).attr("id")));
				$(this).find('td').find('input').each(function(){
					if(this.value == ""){
						emptyPack = true;
					}else if(this.value <= 0){
						errZero = true;
					}else if(!this.value){
						errPrice = true;
					}else{
						if (i % 3 == 0){
							var price = this.value.split(".");
							var strPrice = this.value.toString();
							if(this.value.toString().charAt(0) == "."){
								if(price[0].length > 2){
									errPrice = true;
								}
							}else{
								if(price.length == 2){
									if(price[1].length > 2){
										errPrice = true;
									}
									else if(price[0].length > 12){
										errPrice = true;
									}
								}else if(price.length == 1){
									if(price[0].length > 12){
										errPrice = true;
									}
								}else{
									errPrice = true;
								}
							}
						}else{
							var intValue = this.value.split(".");
							if(this.value - Math.floor(this.value) != 0){
								errNumber = true;
							}else if(!this.value){
								errNumber = true;
							}
							if(i % 3 == 2){
								if(this.value > $("#cycle").val()){
									errCycle = true;
								}
							}
						}

					}
					i = i + 1;
					existingpackages.push(this.value);
				});
			}
		});
	
/***************************
*Edit regulation information
*fron the DB
****************************/
		$("#edit-regulation tr").each(function() {
			if($(this).attr("id") == null){
				$(this).find('td').find('input').each(function(){
					if(this.value == ""){
						emptyReg = true;
					}else{
						regulations.push(this.value);
					}
				});
			}else{
				existingregulations.push(($(this).attr("id")));
				$(this).find('td').find('input').each(function(){
					if(this.value == ""){
						emptyReg = true;
					}else{
						existingregulations.push(this.value);
					}
				});
			}
		});


		
/***************************
*Edit rejection information
*fron the DB
****************************/
		$("#edit-rejection tr").each(function() {
			if($(this).attr("id") == null){
				$(this).find('td').find('input').each(function(){
					if(this.value == ""){
						emptyRej = true;
					}else{
						rejections.push(this.value);
					}
				});
			}else{
				existingrejections.push(($(this).attr("id")));
				$(this).find('td').find('input').each(function(){
					if(this.value == ""){
						emptyRej = true;
					}else{
						existingrejections.push(this.value);
					}
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
		
		if(validateEditBillboard()){
			alert('Missing billboard information');
		}else if(!$("#width").val()){
			alert("Insert billboard width");
		}else if($("#width").val() <=0){
			alert("Width can't be equal or less than zero");
		}else if($("#width").val() - Math.floor($("#width").val()) != 0){
			alert("Width has to be an integer");
		}else if(!$("#height").val()){
			alert("Insert billboard height");
		}else if($("#height").val() <=0){
			alert("height can't be equal or less than zero");
		}else if($("#height").val() - Math.floor($("#height").val()) != 0){
			alert("Height has to be an integer");
		}else if(!$("#min-wid").val()){
			alert("Insert image minimum width");
		}else if($("#min-wid").val() <=0){
			alert("Minimum width can't be equal or less than zero");
		}else if($("#min-wid").val() - Math.floor($("#min-wid").val()) != 0){
			alert("Minimum width has to be an integer");
		}else if(!$("#min-hei").val()){
			alert("Insert image minimum height");
		}else if($("#min-hei").val() <=0){
			alert("Minimum height can't be equal or less than zero");
		}else if($("#min-hei").val() - Math.floor($("#min-hei").val()) != 0){
			alert("Minimum height has to be an integer");
		}else if(!$("#max-wid").val()){
			alert("Insert image maximum width");
		}else if($("#max-wid").val() <=0){
			alert("Maximum width can't be equal or less than zero");
		}else if($("#max-wid").val() - Math.floor($("#max-wid").val()) != 0){
			alert("Maximum width has to be an integer");
		}else if(!$("#max-hei").val()){
			alert("Insert image maximum height");
		}else if($("#max-hei").val() <=0){
			alert("Maximum height can't be equal or less than zero");
		}else if($("#max-hei").val() - Math.floor($("#max-hei").val()) != 0){
			alert("Maximum height has to be an integer");
		}else if($("#max-hei").val() - $("#min-hei").val() < 0){
			alert("Maximum height can't be less than minimum height ");
		}else if($("#max-wid").val() - $("#min-wid").val() < 0){
			alert("Maximum width can't be less than minimum width ");
		}else if(!$("#latitude").val()){
			alert("Insert billboard latitude");
		}else if($("#latitude").val() <=0){
			alert("Latitude can't be equal or less than zero");
		}else if(!$("#longitude").val()){
			alert("Insert billboard longitude");
		}else if($("#longitude").val() <=0){
			alert("Longitude can't be equal or less than zero");
		}else if(!$("#impressions").val()){
			alert("Insert billboard impressions");
		}else if($("#impressions").val() <=0){
			alert("Impressions can't be equal or less than zero");
		}else if($("#impressions").val() - Math.floor($("#impressions").val()) != 0){
			alert("Impressions has to be an integer");
		}else if(!$("#traffic").val()){
			alert("Insert traffic");
		}else if($("#traffic").val() <=0){
			alert("Traffic can't be equal or less than zero");
		}else if($("#traffic").val() - Math.floor($("#traffic").val()) != 0){
			alert("Traffic has to be an integer");
		}else if(!$("#imageTolerance").val()){
			alert("Insert image tolerance");
		}else if($("#imageTolerance").val() <=0){
			alert("Tolerance can't be equal or less than zero");
		}else if($("#imageTolerance").val() - Math.floor($("#imageTolerance").val()) != 0){
			alert("Tolerance has to be an integer");
		}else if(!$("#cycle").val()){
			alert("Insert billboard cycle");
		}else if($("#cycle").val() <=0){
			alert("Cycle can't be equal or less than zero");
		}else if($("#cycle").val() - Math.floor($("#cycle").val()) != 0){
			alert("Cycle has to be an integer");
		}else if(!$("#read-time").val()){
			alert("Insert billboard read time");
		}else if($("#read-time").val() <=0){
			alert("Read time can't be equal or less than zero");
		}else if($("#read-time").val() - Math.floor($("#read-time").val()) != 0){
			alert("Read time has to be an integer");
		}else if(extensions.length == 0){
			alert("Add at least one extension");
		}else if(ratios.length == 0){
			alert("Add at least one ratio");
		}else if(packages.length + existingpackages.length == 0){
			alert("Add at least one package");
		}else if(regulations.length + existingregulations.length == 0){
			alert("Add at least one regulation");
		}else if(rejections.length + existingrejections.length == 0){
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
			updateBillboard(packages,regulations,rejections,existingpackages,existingregulations,existingrejections,ratios,extensions);
		}
		
		//updateBillboard(packages,regulations,rejections,existingpackages,existingregulations,existingrejections,ratios,extensions);
	});
	

/***************************
*Choose image for billboard
****************************/
	$("#billboard-img").change(function(){
	        readURL(this);
	});

/***************************
*Edit image for billboard
****************************/	
	$("#billboard-edit-img").change(function(){
	        readURL(this);
	});
	
/*******************
*Billboard Getter
*******************/
	$("table").on("click", "tr .information", function(){
		fd = new FormData();
		var editratio;
		var editextension;
		billboardInfo_ID = $(this).attr("id");
		$.get("../server/administrator-billboardInfo.php", 
			{id: billboardInfo_ID},
			function(data, status){
			var info = JSON.parse(data);
			$("#editBillboardname").attr('value',info.name);
			$("#billboard-edit-img-tag").attr('src',path + info.img);
			$("#editdescription").val(info.description);
			$("#width").attr('value',info.width);
			$("#height").attr('value',info.height);
			$("#latitude").attr('value',info.latitude);
			$("#longitude").attr('value',info.longitude);
			$("#read-time").attr('value',info.readTime);
			$("#impressions").attr('value',info.impressions);
			$("#imageTolerance").attr('value',info.tolerance);
			$("#traffic").attr('value',info.traffic);
			$("#min-wid").attr('value',info.minWidth);
			$("#min-hei").attr('value',info.minHeight);
			$("#max-wid").attr('value',info.maxWidth);
			$("#max-hei").attr('value',info.maxHeight);
			$("#cycle").attr('value',info.cycle);
			editextension = info.imageExtension.split(":");
			editratio = info.imageRatio.split(",");
		});	

/***************
*Sleep function
***************/		
		setTimeout(function() {
			$.each($("input[name='edit-image-ratio']"), function(){
				var x = $.inArray(String($(this).val()), editratio);
				if(x != -1){
					$(this).prop('checked', true);
				}
			});
		
			$.each($("input[name='edit-image-extensions']"), function(){            
				var x = $.inArray(String($(this).val()), editextension);
				if(x != -1){
					$(this).prop('checked', true);
				}
			});
		}, 500);

/***************************
*HTML package created 
*taking info from the DB
****************************/		
		$.get("../server/administrator-billboard-packages.php", 
			{id: billboardInfo_ID}, 
			function(data, status){
			if(data == "No results"){

			}else{
				packages = JSON.parse(data);
                var package = "";
                for (var i = 0; i < packages.length; i++) {
					package += "<tr id=\"" + packages[i].id + "\">" +
					"<td class=\"text-center\" style=\"width: 25%;text-align: center;vertical-align: middle;\"><input id=\"duration\" value =\""+packages[i].duration + "\" type=\"number\" class=\"form-control\" name=\"duration\"></td>" +
					"<td class=\"text-center\" style=\"width: 25%;text-align: center;vertical-align: middle;\"><input id=\"frequency\" value =\""+packages[i].frequency +"\" type=\"number\" class=\"form-control\" name=\"frequency\"></td>" +
					"<td class=\"text-center\" style=\"width: 25%;text-align: center;vertical-align: middle;\"><input id=\"price\" value =\""+packages[i].price +"\" type=\"number\" class=\"form-control\" name=\"Price\"></td>" +
					"<td class=\"text-center\" style=\"width: 25%;text-align: center;vertical-align: middle;\">" +
					"<span class=\"clickable glyphicon glyphicon-trash actions deletepackage\" style=\"font-size: 35px;padding-left:5%;color:#2D2D2D;\"><br><p style=\"font-size: 14px;\"><b><i>Delete</i></b></p></span>" +
					"</td>";
                }
				$("#edit-package").empty();
		        $("#edit-package").append(package);
			}
			
		});

/***************************
*HTML regulation created
*taking info from the DB
****************************/

		$.get("../server/administrator-billboard-regulations.php", 
			{id: billboardInfo_ID}, 
			function(data, status){
			if(data == "No results"){
			}else{
				regulations = JSON.parse(data);
                var regulation = "";
                for (var i = 0; i < regulations.length; i++) {
					regulation +=  "<tr id=\"" + regulations[i].id + "\">" +
					"<td class=\"text-center\" style=\"width: 50%;text-align: center;vertical-align: middle;\"><input id=\"Regulation\" value =\"" + regulations[i].regulation + "\" type=\"text\" class=\"form-control\" name=\"Regulation\" placeholder=\"Regulation Description\"></td>" +
					"<td class=\"text-center\" style=\"width: 50%;text-align: center;vertical-align: middle;\">" +
					"<span class=\"clickable glyphicon glyphicon-trash actions deleteregulation\" style=\"font-size: 35px;padding-left:5%;color:#2D2D2D;\"><br><p style=\"font-size: 14px;\"><b><i>Delete</i></b></p></span>" +
					"</td>";
                }
				$("#edit-regulation").empty();
		        $("#edit-regulation").append(regulation);
			}

/***************************
*HTML rejection created
*taking info from the DB
****************************/
	
		});
		$.get("../server/administrator-billboard-rejections.php", 
			{id: billboardInfo_ID}, 
			function(data, status){
			if(data == "No results"){
			}else{
				rejections = JSON.parse(data);
                var rejection = "";
                for (var i = 0; i < rejections.length; i++) {
					rejection += "<tr id=\"" + rejections[i].id + "\">" +
					"<td class=\"text-center\" style=\"width: 50%;text-align: center;vertical-align: middle;\"><input id=\"Rejection\" value =\"" + rejections[i].rejection + "\" type=\"text\" class=\"form-control\" name=\"Rejection\" placeholder=\"Rejection Description\"></td>" +
					"<td class=\"text-center\" style=\"width: 50%;text-align: center;vertical-align: middle;\">" +
					"<span class=\"clickable glyphicon glyphicon-trash actions deleterejection\" style=\"font-size: 35px;padding-left:5%;color:#2D2D2D;\"><br><p style=\"font-size: 14px;\"><b><i>Delete</i></b></p></span>" +
					"</td>";
               	}
				$("#edit-rejection").empty();
		        $("#edit-rejection").append(rejection);
			}
			
		});
	});


/***************************
*HTML package edition
*taking info from the DB
****************************/

	$('#btneditpackage').click(function(){
		var newPackage = "<tr>" +
		"<td class=\"text-center\" style=\"width: 25%;text-align: center;vertical-align: middle;\"><input id=\"Duration\" type=\"number\" class=\"form-control\" name=\"Duration\" placeholder=\"Duration\"></td>" +
		"<td class=\"text-center\" style=\"width: 25%;text-align: center;vertical-align: middle;\"><input id=\"Frequency\" type=\"number\" class=\"form-control\" name=\"Frequency\" placeholder=\"Frequency\"></td>" +
		"<td class=\"text-center\" style=\"width: 25%;text-align: center;vertical-align: middle;\"><input id=\"Price\" type=\"number\" class=\"form-control\" name=\"Price\" placeholder=\"Price\"></td>" +
		"<td class=\"text-center\" style=\"width: 25%;text-align: center;vertical-align: middle;\">" +
		"<span class=\"clickable glyphicon glyphicon-trash actions remove\" style=\"font-size: 35px;padding-left:5%;color:#2D2D2D;\"><br><p style=\"font-size: 14px;\"><b><i>Delete</i></b></p></span>" +
		"</td>";
		$("#edit-package").append(newPackage);
	});

/***************************
*HTML regulation edition
*taking info from the DB
****************************/
	
	$('#btneditregulation').click(function(){
		var newRegulation = "<tr>" +
		"<td class=\"text-center\" style=\"width: 50%;text-align: center;vertical-align: middle;\"><input id=\"Regulation\" type=\"text\" class=\"form-control\" name=\"Regulation\" placeholder=\"Regulation Description\"></td>" +
		"<td class=\"text-center\" style=\"width: 50%;text-align: center;vertical-align: middle;\">" +
		"<span class=\"clickable glyphicon glyphicon-trash actions remove\" style=\"font-size: 35px;padding-left:5%;color:#2D2D2D;\"><br><p style=\"font-size: 14px;\"><b><i>Delete</i></b></p></span>" +
		"</td>";
		$("#edit-regulation").append(newRegulation);
	});
	
/***************************
*HTML rejection edition
*taking info from the DB
****************************/
	$('#btneditrejection').click(function(){
		var newRejection = "<tr>" +
		"<td class=\"text-center\" style=\"width: 50%;text-align: center;vertical-align: middle;\"><input id=\"Rejection\" type=\"text\" class=\"form-control\" name=\"Rejection\" placeholder=\"Rejection Description\"></td>" +
		"<td class=\"text-center\" style=\"width: 50%;text-align: center;vertical-align: middle;\">" +
		"<span class=\"clickable glyphicon glyphicon-trash actions remove\" style=\"font-size: 35px;padding-left:5%;color:#2D2D2D;\"><br><p style=\"font-size: 14px;\"><b><i>Delete</i></b></p></span>" +
		"</td>";
		$("#edit-rejection").append(newRejection);
	});

/***************************
*Delete Billboard from
*front end
****************************/
	$("table").on("click", "tr .deleteBillboard", function(){
		var billboardID = $(this).closest('span').attr("id");
		var tr = $(this).closest('tr');
		$.post("../server/administrator-delete-billboard.php",
			{
				id:billboardID,
				email:decrypt(sessionStorage.getItem('email'))
			},function(data,status){
				if(status === "success"){
					tr.remove();
				}else{
				}
		});		
	});

/***************************
*Delete package from
*front end
****************************/
	$("table").on("click", "tr .deletepackage", function(){
		var packageID = $(this).closest('tr').attr("id");
		var tr = $(this).closest('tr');
		$.post("../server/administrator-delete-package.php",
			{
				id:packageID
			},function(data,status){
				if(status === "success"){
					tr.remove();
				}else{
				}
		});
	});

/***************************
*Delete Regulation from
*front end
****************************/
	$("table").on("click", "tr .deleteregulation", function(){
		var regulationID = $(this).closest('tr').attr("id");
		var tr = $(this).closest('tr');
		$.post("../server/administrator-delete-regulation.php",
			{
				id:regulationID
			},function(data,status){
				if(status === "success"){
					tr.remove();
				}else{
				}
		});
	});
	

/***************************
*Delete Rejection from
*front end
****************************/
	$("table").on("click", "tr .deleterejection", function(){
		var rejectionID = $(this).closest('tr').attr("id");
		var tr = $(this).closest('tr');
		$.post("../server/administrator-delete-rejection.php",
			{
				id:rejectionID
			},function(data,status){
				if(status === "success"){
					tr.remove();
				}else{
				}
		});
	});
});


/*************************
*Billboards Getter
*Takes JSON from de DB
*And appends information
*as an HTMLto the view
*************************/
function getBillboards(){
	$.get("../server/user-billboards.php", function(data, status){
		billboards = JSON.parse(data);
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
			 "<span id=\"" + billboards[i].id + "\" class=\"clickable glyphicon glyphicon-pencil information\" data-toggle=\"modal\" data-target=\"#EditModal\" style=\"font-size: 35px;padding-right:5%;color:#2D2D2D;\"><br><p style=\"font-size: 14px;\"><b><i>Edit</b></i></p></span>" +
                         "<span id=\"" + billboards[i].id + "\" class=\"clickable glyphicon glyphicon-trash deleteBillboard\" style=\"font-size: 35px;padding-left:5%;color:#2D2D2D;\"><br><p style=\"font-size: 14px;\"><b><i>Delete</i></b></p></span>" +
			"</td>" +
			"</tr>";
		}
		$("#billboards").empty();
		$("#billboards").append(billboard);
	});
}
 
/*************************
*Reads file from computer 
*************************/ 
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


/*********************************
*Creates new billboard
*with the package, regulation,
*rejections, ratio and extencions
*********************************/
function newBillboard(packages_in,regulations_in,rejections_in,ratio_in,extension_in){
	var cycle = $("#addcycle").val();
	var readTime = $("#addreadtime").val();
	var totalTime = 60*cycle;
	var slots = totalTime/readTime;
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
	fd.append('tolerance',$("#addtolerance").val());
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
	fd.append('email',decrypt(sessionStorage.getItem('email')));
	
	$.ajax({
		url:"../server/administrator-add-billboard.php",
		type: 'POST',
		data: fd,
		mimeType:"multipart/form-data",
		contentType: false,
		processData: false,
		success: function(response){
			alert("Billboard created successfully");
			location.reload();
		}
	});

}


/*************************
*Validates Billboards
*properties
*
* @return {Boolean}
*************************/
function validateBillboard(){
	var billboardName = true;
	var billboardDescription = true;
	var billboardRGEX = /[^A-Za-z0-9\s@&#]/;
	if ($("#addBillboardname").val() == ""){
	}
	else{
		billboardName = false;
		billboardName = billboardRGEX.test($("#addBillboardname").val());
		billboardDescription = billboardRGEX.test($("#adddescription").val());
	}
	
	return billboardName || billboardDescription;
}


/***************************
*Validates new information
*properties from billboard
*
* @return {Boolean}
****************************/
function validateEditBillboard(){
	var billboardName = true;
	var billboardDescription = true;
	var billboardRGEX = /[^A-Za-z0-9\s@&#]/;
	if ($("#editBillboardname").val() == ""){
	}
	else{
		billboardName = false;
		billboardName = billboardRGEX.test($("#editBillboardname").val());
		billboardDescription = billboardRGEX.test($("#editdescription").val());
	}
	
	return billboardName || billboardDescription;
}


/***************************
*Takes new information and
*updates the billboard
****************************/
function updateBillboard(packages_in,regulations_in,rejections_in,existingpackages_in,existingregulations_in,existingrejections_in,ratio_in,extension_in){
	if(files != null){
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
	fd.append('tolerance',$("#imageTolerance").val());
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
	fd.append('email',decrypt(sessionStorage.getItem('email')));
	$.ajax({
		url:"../server/administrator-update-billboard.php",
		type: 'POST',
		data: fd,
		mimeType:"multipart/form-data",
		contentType: false,
		processData: false,
		success: function(response){
			alert("Billboard updated successfully");
		}
	});
}
/***************************
Verify double numbers
****************************/
function isNumeric(val) {
	var validChars = '0123456789.';


	for(var i = 0; i < val.length; i++) {
		if(validChars.indexOf(val.charAt(i)) == -1)
			return false;
	}


	return true;
}
/***************************
*Numbers from spinners 
*in the front end
****************************/
(function ($) {
$('.spinner .btn:first-of-type').on('click', function() {
  $('.spinner input').val( parseInt($('.spinner input').val(), 10) + 1);
});
$('.spinner .btn:last-of-type').on('click', function() {
  $('.spinner input').val( parseInt($('.spinner input').val(), 10) - 1);
});
})(jQuery);
  
  
  
