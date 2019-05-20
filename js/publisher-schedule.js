/*Publisher Schedule JavaScript*/

$(document).ready(function(){
	
	var start = moment();  
	
	/**************
	*Get EZB logos
	***************/	
	$.get("../server/get-image-path.php", function(data, status){
		$("#tab-logo").attr("href", data + "img/ezb/EZBillboardsLeftLogo.png");
        $("#ezb-logo").attr("src", data + "img/ezb/EZBillboardsLogo.png");
	});

	/************
	*Date picker
	************/
  $('#reportrange').daterangepicker({
	startDate: start,
	minDate: start,
	maxDate: moment().add(3,'months'),
	singleDatePicker:true,
	opens: 'center'
  }, updateDate);

});