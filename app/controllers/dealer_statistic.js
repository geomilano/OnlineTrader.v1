var args = arguments[0] || {};

//Active icon displayed

var more = $.footer.getView('more'); 
more.image = "/images/icons/icon-more-active.png";
var stat = $.footer.getView('statistic'); 
stat.image = "/images/icons/icon-ranking-active.png";

Ti.App.Properties.setString('module', 'dealer_statistic');


var goToDetails = function(e){
	var roles = Ti.App.Properties.getString('roles');
	var param = {
        o_id: e.o_id,
    };
	var orderdetail = Alloy.createController(roles + "_orderdetail",param).getView();
	orderdetail.open();
	//Ti.App.removeEventListener('app:viewOrderDetail',goToDetails);		//cannot put removeEventListener here, bcos it cannot fire second time to other detail page
};
Ti.App.addEventListener("app:viewOrderDetail", goToDetails);

	        
$.salessatisticview.addEventListener('load', function(data) { 
   Ti.App.fireEvent('app:getStatistic', { 
		session: Ti.App.Properties.getString('session'), 
		url: Ti.API.GETSTATISTIC + Ti.App.Properties.getString('session'),
	});
});
	
$.dealer_statistic.addEventListener('close', function(e){				// when this window close, trigger this event to remove the event.
	Ti.App.removeEventListener('app:viewOrderDetail',goToDetails);
});


function construct() {
	Ti.App.fireEvent('app:getStatistic', { 
		session: Ti.App.Properties.getString('session'), 
		url: Ti.API.GETSTATISTIC + Ti.App.Properties.getString('session'),
	});
	
}
