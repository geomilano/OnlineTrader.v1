var args = arguments[0] || {};
o_id = Ti.App.Properties.getString('current_oid');

function closeTracking(){
	
	$.tracking.close({transition:Ti.UI.iPhone.AnimationStyle.CURL_DOWN});
}

function construct() {
	Ti.App.fireEvent('app:trackingParam', { 
		o_id: o_id,
		tracking: Ti.API.GETTRACKING + Ti.App.Properties.getString('session')+"&o_id=" + o_id,
	});
	
}