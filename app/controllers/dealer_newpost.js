var args = arguments[0] || {};

//Active icon displayed
var newpost = $.footer.getView('newpost'); 
newpost.image = "/images/icons/icon-neworder-active.png";
Ti.App.Properties.setString('module', 'dealer_newpost');
/**Experiment**/
Ti.App.fireEvent("getSession", {session:Ti.App.Properties.getString("session")});

var addOrderComplete = function(e) {
	$.dealer_newpost.close();
	//createAlert("Congratulations",e.msg);
	var roles = Ti.App.Properties.getString('roles');
	page = roles + "_orderlist";
    var orderlist = Alloy.createController(page).getView();
    orderlist.open();
	Ti.App.removeEventListener('addOrderComplete',addOrderComplete);
};
Ti.App.addEventListener('addOrderComplete', addOrderComplete);
/**End**/

$.newpostview.addEventListener('load', function(data) { 
	//$.newpostview.evalJS("var message='George Milano';");
	
   Ti.App.fireEvent('app:newPostParam', { 
		session: Ti.App.Properties.getString('session'), 
		url: Ti.API.ADDORDER, 
		state: Ti.API.GETSTATE,  
		product :Ti.API.GETPRODUCT
	});
});
	
function construct() {
	Ti.App.fireEvent('app:newPostParam', { 
		session: Ti.App.Properties.getString('session'), 
		url: Ti.API.ADDORDER, 
		state: Ti.API.GETSTATE,  
		product :Ti.API.GETPRODUCT
	});
	
}

var triggerAlert = function(e) {
	createAlert(e.tt,e.msg);
	Ti.App.removeEventListener('app:triggerAlert',triggerAlert);
};
Ti.App.addEventListener('app:triggerAlert', triggerAlert);
