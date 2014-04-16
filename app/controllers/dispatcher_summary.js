var args = arguments[0] || {};
getSummary();

//Active icon displayed
var summary = $.footer.getView('summary'); 
summary.image = "/images/icons/icon-summary-active.png";
Ti.App.Properties.setString('module', 'dispatcher_summary');

//$.mySession.text = model;
function getSummary(e) {

	var url = Ti.API.GETSUMMARY + Ti.App.Properties.getString('session');
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	         var res = JSON.parse(this.responseText);
	         
	         if(res.status == "Success"){
	         	var currentTime = new Date();
				var monthCommission = 0;
				
				var month = currentTime.getMonth() + 1;
				var day = currentTime.getDate();
				var year = currentTime.getFullYear();
				
				if (month < 10) month = '0' + month;
				if (day < 10) day = '0' + day;
	
				var today = year+'-'+month+'-'+day;
				for (var key in res.data){
					var obj = res.data[key];

					if(obj.created == today){
		       			$.todayCommission.html = obj.commission;
		       		}
		       		monthCommission += parseFloat(obj.commission);
				}
				$.monthCommission.html = monthCommission;
	         }else{
	         	alert(res.status);
	         }
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	         alert('error');
	     },
	     timeout : 5000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("GET", url);
	 // Send the request.
	 client.send(); 
  
}
