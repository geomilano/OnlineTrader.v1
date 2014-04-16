var args = arguments[0] || {};

//Active icon displayed
var orderlist = $.footer.getView('orderlist'); 
orderlist.image = "/images/icons/icon-listing-active.png";

Ti.App.Properties.setString('module', 'dealer_orderlist');
/**Experiment**/
Ti.App.fireEvent("getSession", {session:Ti.App.Properties.getString("session")});
/**End**/

var goToDetails = function(e){
	
	var roles = Ti.App.Properties.getString('roles');
	var param = {
        o_id: e.o_id,
    };
	var orderdetail = Alloy.createController(roles + "_orderdetail",param).getView();
    orderdetail.open({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
    
    setWindowRelationship(orderdetail);
	//Ti.App.removeEventListener('app:viewOrderDetail',goToDetails);		//cannot 	put removeEventListener here, bcos it cannot fire second time to other detail page
};
Ti.App.addEventListener("app:viewOrderDetail", goToDetails);

	        
$.orderlistview.addEventListener('load', function(data) { 
   Ti.App.fireEvent('app:orderListParam', { 
		session: Ti.App.Properties.getString('session'), 
		url: Ti.API.GETDEALERORD + Ti.App.Properties.getString('session'),
	});
});

if(Alloy.Globals.deviceHeight <= "480"){
	$.list_form.height="67%";
}
	
$.dealer_orderlist.addEventListener('close', function(e){				// when this window close, trigger this event to remove the event.
	Ti.App.removeEventListener('app:viewOrderDetail',goToDetails);
});

$.dealer_orderlist.addEventListener('androidback', function(e){				// when this window close, trigger this event to remove the event.
	Ti.App.removeEventListener('app:viewOrderDetail',goToDetails);
});

function construct() {
	Ti.App.fireEvent('app:orderListParam', { 
		session: Ti.App.Properties.getString('session'), 
		url: Ti.API.GETDEALERORD + Ti.App.Properties.getString('session'),
	});
	
}
