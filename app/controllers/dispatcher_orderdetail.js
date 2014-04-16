var args = arguments[0] || {};
var o_id = args.o_id || '';
Ti.App.Properties.setString('current_oid', o_id), 
function goBack(){
	$.dis_orderdetail_win.close({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
}

function orderCancel(){
	var dialog = Ti.UI.createAlertDialog({
		cancel: 1,
		buttonNames: ['No','Yes'],
		message: 'Are you sure want to cancel?',
		title: 'Order Delivery Status'
	});
	
	dialog.addEventListener('click', function(e){
		if (e.index === e.source.cancel){
		  //Do nothing
		}
		if (e.index === 1){
			callOrderAction(Ti.API.CANCELORDER);
		}
	});
	
	dialog.show();
}

function orderComplete(){
	var dialog = Ti.UI.createAlertDialog({
		cancel: 1,
		buttonNames: ['Cancel','Completed'],
		message: 'Mission Accomplished?',
		title: 'Order Delivery Status'
	});
	
	dialog.addEventListener('click', function(e){
		if (e.index === e.source.cancel){
		  //Do nothing
		}
		if (e.index === 1){
			callOrderAction(Ti.API.COMPLETEORDER);
		}
	});
	
	dialog.show();
}

function callOrderAction(action){
	var url = action + Ti.App.Properties.getString('session')+"&o_id=" + o_id;
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	         var res = JSON.parse(this.responseText);
	         
	         if(res.status == "success"){
	         	goBack();
	         }else{
	         	alert("An known error occur. Please try again.");
	         }
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	         alert("An known error occur. Please try again.");
	     },
	     timeout : 5000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("GET", url);
	 // Send the request.
	 client.send(); 
}

/**Experiment**/
Ti.App.fireEvent("getSession", {session:Ti.App.Properties.getString("session")});
Ti.App.addEventListener('addOrderComplete', function(e) {
	
	var roles = Ti.App.Properties.getString('roles');
	page = roles + "_summary";
   var summary = Alloy.createController(page).getView();
   summary.open();
});
/**End**/

$.orderdetailview.addEventListener('load', function(data) { 
   Ti.App.fireEvent('app:orderDetailsParam', { 
		session: Ti.App.Properties.getString('session'), 
		update: Ti.API.UPDATEORDER + Ti.App.Properties.getString('session'),
		details: Ti.API.GETORDDETAILS + Ti.App.Properties.getString('session')+"&o_id=" + o_id,
		complete: Ti.API.COMPLETEORDER + Ti.App.Properties.getString('session')+"&o_id=" + o_id,
		cancel: Ti.API.CANCELORDER + Ti.App.Properties.getString('session')+"&o_id=" + o_id,
		state: Ti.API.GETSTATE,  
		product :Ti.API.GETPRODUCT
	});
});
	
function construct() {
	Ti.App.fireEvent('app:orderDetailsParam', { 
		o_id   : o_id,
		session: Ti.App.Properties.getString('session'), 
		update: Ti.API.UPDATEORDER + Ti.App.Properties.getString('session'), 
		details: Ti.API.GETORDDETAILS + Ti.App.Properties.getString('session')+"&o_id=" + o_id,
		complete: Ti.API.COMPLETEORDER + Ti.App.Properties.getString('session')+"&o_id=" + o_id,
		cancel: Ti.API.CANCELORDER + Ti.App.Properties.getString('session')+"&o_id=" + o_id,
		state: Ti.API.GETSTATE,  
		product :Ti.API.GETPRODUCT
	});
	
}

/**button effect for complete and cancel**/

$.btncancel.addEventListener("touchstart", function(e){
	this.setBackgroundColor("#fff");
	this.setColor("#e02222");
});

$.btncancel.addEventListener("touchend", function(e){
	this.setBackgroundColor("transparent");
	this.setColor("#fff");
});

$.btncomplete.addEventListener("touchstart", function(e){
	this.setBackgroundColor("#fff");
	this.setColor("#e02222");
});

$.btncomplete.addEventListener("touchend", function(e){
	this.setBackgroundColor("transparent");
	this.setColor("#fff");
});