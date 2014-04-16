var args = arguments[0] || {};
var o_id = args.o_id || '';
Ti.App.Properties.setString('current_oid', o_id), 

function goBack(){
	 $.orderdetail_win.close({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});
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
		state: Ti.API.GETSTATE,  
		product :Ti.API.GETPRODUCT,
		url: Ti.API.ADDTRACKING
	});
});
	
function construct() {
	Ti.App.fireEvent('app:orderDetailsParam', { 
		o_id   : o_id,
		session: Ti.App.Properties.getString('session'), 
		update: Ti.API.UPDATEORDER + Ti.App.Properties.getString('session'), 
		details: Ti.API.GETORDDETAILS + Ti.App.Properties.getString('session')+"&o_id=" + o_id,
		state: Ti.API.GETSTATE,  
		product :Ti.API.GETPRODUCT,
		url: Ti.API.ADDTRACKING
	});
	
}
