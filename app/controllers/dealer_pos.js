var args = arguments[0] || {};

//Active icon displayed
var newpost = $.footer.getView('pos'); 
newpost.image = "/images/icons/icon-pos-active.png";
Ti.App.Properties.setString('module', 'dealer_pos');
/**Experiment**/
Ti.App.fireEvent("getSession", {session:Ti.App.Properties.getString("session")});

var addOrderComplete = function(e) {
	$.dealer_pos.close();
	//createAlert("Congratulations",e.msg);
	var roles = Ti.App.Properties.getString('roles');
	page = roles + "_summary";
   var summary = Alloy.createController(page).getView();
   summary.open();
	Ti.App.removeEventListener('addOrderComplete',addOrderComplete);
};
Ti.App.addEventListener('addOrderComplete', addOrderComplete);
/**End**/

$.posview.addEventListener('load', function(data) { 
	//$.newpostview.evalJS("var message='George Milano';");
	
   Ti.App.fireEvent('app:PosParam', { 
		session: Ti.App.Properties.getString('session'), 
		url: Ti.API.ADDPOS, 
		state: Ti.API.GETSTATE,  
		product :Ti.API.GETPRODUCT
	});
});
	
function construct() {
	Ti.App.fireEvent('app:PosParam', { 
		session: Ti.App.Properties.getString('session'), 
		url: Ti.API.ADDPOS, 
		state: Ti.API.GETSTATE,  
		product :Ti.API.GETPRODUCT
	});
	
}

var triggerAlert = function(e) {
	createAlert(e.tt,e.msg);
	Ti.App.removeEventListener('app:triggerAlert',triggerAlert);
};
Ti.App.addEventListener('app:triggerAlert', triggerAlert);
