var args = arguments[0] || {};
getSummary();

//Active icon displayed
var summary = $.footer.getView('summary'); 
summary.image = "/images/icons/icon-summary-active.png";
Ti.App.Properties.setString('module', 'dispatcher_summary');

function loadTableRow(data){
	var tableData = [];
	for (var i = 0; i<data.length; i++){
        var row = Ti.UI.createTableViewRow({
            className:'forumEvent', // used to improve table performance
            rowIndex:i, // custom property, useful for determining the row during events
            selectionStyle:0,
            separatorColor:'#ccc',
            width: '100%',
        });

        var lblField = Ti.UI.createLabel({
                text: data[i]['date'],
                color:'#222',
                top:'10dp',
                left:'10dp'
            });
            
       var lblField2 = Ti.UI.createLabel({
                realValue: 'Value',
                textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
				top :"10dp",
				width: "20%",
				left :"80%",
                text: data[i]['value'],
                color:'#222'
            });
	  var separator = Ti.UI.createView({top:49, backgroundColor:'#9d0404', height:1});

      row.add(lblField);
      row.add(lblField2);
      row.add(separator);
      tableData.push(row);     
    }
	
	$.tableView.setData(tableData);
}

function getSummary(e) {

	var url = Ti.API.GETSUMMARY + Ti.App.Properties.getString('session');
	var data = [];
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
				//if (month < 10) month = '0' + month;
				//if (day < 10) day = '0' + day;
	
				//var today = year+'-'+month+'-'+day;
				var date = '';
				
				for (var i = 1; i <= day; i++){
					var exist = 'N';
					
					if (i < 10) i = '0' + i;
					date = year+"-"+month+"-"+i;
					for (var key in res.data){
						var obj = res.data[key];
						if(obj.created == date){
							data.push({date: date, value: obj.commission });
							exist = 'Y';
			       		}
					}
					if(exist != 'Y'){
						data.push({date: date, value: 0 });
					}
				}
				loadTableRow(data);
	         }else{
	         	alert(res.status);
	         	createAlert('Error',res.status);
	         }
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	         createAlert('Network declined','Failed to contact with server. Please make sure your device are connected to internet.');
	     },
	     timeout : 10000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("GET", url);
	 // Send the request.
	 client.send();
}