var requests;
var currentRequestIndex;

$(document).ready(function(){

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
			var startStr = start.format('YYYY-MM-DD');
			var endStr = end.format('YYYY-MM-DD');
			console.log(startStr);
			console.log(endStr);
			if(startStr == "Invalid date" && endStr == "Invalid date"){
				$("#reportrange span").html("All");
			} else{
	        		$("#reportrange span").html(startStr + " to " + endStr);
			}
			getLogs(startStr, endStr);
    		}

    		$('#reportrange').daterangepicker({
        		startDate: start,
        		endDate: end,
        		ranges: {
           			'Today': [moment(), moment()],
           			'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           			'Last 7 Days': [moment().subtract(6, 'days'), moment()],
           			'Last 30 Days': [moment().subtract(29, 'days'), moment()],
           			'This Month': [moment().startOf('month'), moment().endOf('month')],
           			'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
	   			'All': 'All'
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
			"<td style=\"vertical-align: middle;text-align: center;\">" + log[i].timeStamp +
			"</td>" +
			"<td style=\"vertical-align: middle;text-align: center;\" class = \"emailCol\"> " + log[i].email +
			"</td>" +
			"<td style=\"vertical-align: middle;text-align: center;\" class = \"actionCol\"> " + log[i].action +
			"</td>" +
		        "<td style=\"vertical-align: middle;text-align: center;\">" + log[i].detailedAction +
                        "</td>" 
			"</tr>";

			$("#logs").append(logs);
		}
	});
}
