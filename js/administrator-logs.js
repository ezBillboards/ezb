var requests;
var currentRequestIndex;

$(document).ready(function(){

	$.get("../server/get-image-path.php", function(data, status){
		$("#tab-logo").attr("href", data + "img/ezb/EZBillboardsLeftLogo.png");
                $("#ezb-logo").attr("src", data + "img/ezb/EZBillboardsLogo.png");
        });

    $("#mySearchEmail").on("keyup", function() {
		var value = $(this).val().toLowerCase();
		$("tbody tr .emailCol").filter(function() {
			$(this).parent().toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	}); 


  $("#mySearchAction").on("keyup", function() {
                var value = $(this).val().toLowerCase();
                $("tbody tr .actionCol").filter(function() {
                        $(this).parent().toggle($(this).text().toLowerCase().indexOf(value) > -1)
                });
        });

	$(function() {

    		var start = moment().startOf('month');
    		var end = moment().endOf('month');

    		function updateDate(start, end) {
			var startStr = start.format('MMMM D, YYYY');
			var endStr = end.format('MMMM D, YYYY');
        		$("#reportrange span").html(startStr + " to " + endStr);
			getLogs(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'));
    		}

    		$('#reportrange').daterangepicker({
        		startDate: start,
        		endDate: end,
			minDate: "01/01/2019",
			maxDate: moment(),
        		ranges: {
           			'Today': [moment(), moment()],
           			'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           			'Last 7 Days': [moment().subtract(6, 'days'), moment()],
           			'Last 30 Days': [moment().subtract(29, 'days'), moment()],
           			'This Month': [moment().startOf('month'), moment().endOf('month')],
           			'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
	   			'All': ["01/01/2019",moment()]
        		}
    		}, updateDate);

    		updateDate(start, end);

	});
});


function getLogs(startStr, endStr){
	$("#logs").empty();
	$.get("../server/administrator-logs.php",
		{
			start: startStr,
			end: endStr
		}, 
		function(data, status){
		console.log(data);
		log = JSON.parse(data);
		for (var i = 0; i < log.length; i++) {

		var logs = "<tr>" +
			"<td style=\"vertical-align: middle;text-align: center;\">" +log[i].date +
			"</td>" +
			"<td style=\"vertical-align: middle;text-align: center;\">" + log[i].time +
			"</td>" +
			"<td style=\"vertical-align: middle;text-align: center;\" class = \"emailCol\"> " + log[i].email +
			"</td>" +
			"<td style=\"vertical-align: middle;text-align: center;\" class = \"actionCol\"> " + log[i].action +
			"</td>" +
		        "<td style=\"vertical-align: middle;text-align: center;\">" + log[i].detailedAction +
                        "</td>" +
			"</tr>";

			$("#logs").append(logs);
		}
	});
}
