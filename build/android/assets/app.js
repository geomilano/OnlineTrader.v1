function goNav(event) {
    if (goNav.__isExecuting) return;
    goNav.__isExecuting = true;
    var page = event.source.mod;
    var module = Ti.App.Properties.getString("module");
    var roles = Ti.App.Properties.getString("roles");
    page = roles + "_" + page;
    if (module != page) {
        var navigate = Alloy.createController(page).getView();
        navigate.open({
            transition: Ti.UI.iPhone.AnimationStyle.CURL_DOWN
        });
        "" != Ti.App.CURRENTWINDOW && removeWindowRelationship();
        setWindowRelationship(navigate);
    }
    setTimeout(function() {
        goNav.__isExecuting = false;
    }, 200);
}

function goBack() {
    var windowtree = Ti.App.WindowCabinet;
    windowtree.length - 1 >= 0 && removeWindowRelationship();
}

function popup(event) {
    var page = event.source.mod;
    var module = Ti.App.Properties.getString("module");
    var roles = Ti.App.Properties.getString("roles");
    page = roles + "_" + page;
    if (module != page) {
        var navigate = Alloy.createController(page).getView();
        navigate.open({
            transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
        });
        setWindowRelationship(navigate);
    }
}

function removeWindowRelationship() {
    Ti.App.CURRENTWINDOW.close({
        transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
    });
    var tempArr = Ti.App.WindowCabinet;
    tempArr.splice(tempArr.length - 1, 1);
    Ti.App.WindowCabinet = tempArr;
    Ti.App.CURRENTWINDOW = tempArr[tempArr.length - 1];
}

function setWindowRelationship(current) {
    Ti.App.CURRENTWINDOW = current;
    var tempArr = Ti.App.WindowCabinet;
    tempArr.push(current);
    Ti.App.WindowCabinet = tempArr;
}

function slideEffect() {
    var effect = Ti.UI.createAnimation({
        top: "0",
        left: "0",
        height: Titanium.Platform.displayCaps.platformHeight,
        width: Titanium.Platform.displayCaps.platformWidth,
        duration: 100
    });
    return effect;
}

function goHome() {
    var roles = Ti.App.Properties.getString("roles");
    var module = Ti.App.Properties.getString("module");
    var home = "dispatcher_home";
    if ("dealer" == roles) var home = "dealer_summary";
    if (module != home) {
        var naviHome = Alloy.createController(home).getView();
        naviHome.open();
    }
}

function createAlert(tt, msg) {
    var box = Titanium.UI.createAlertDialog({
        title: tt,
        message: msg
    });
    box.show();
}

function isiOS7Plus() {
    return true;
}

function doLogout() {
    var dialog = Ti.UI.createAlertDialog({
        cancel: 1,
        buttonNames: [ "Cancel", "Confirm" ],
        message: "Would you like to logout?",
        title: "Logout Online Trader"
    });
    dialog.addEventListener("click", function(e) {
        e.index === e.source.cancel;
        if (1 === e.index) {
            var url = Ti.API.LOGOUT + Ti.App.Properties.getString("session");
            var client = Ti.Network.createHTTPClient({
                onload: function() {
                    JSON.parse(this.responseText);
                    Ti.App.Properties.removeProperty("session");
                    var login = Alloy.createController("index").getView();
                    login.open({
                        transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
                    });
                },
                onerror: function() {
                    createAlert("Network declined", "Failed to contact with server. Please make sure your device are connected to internet.");
                },
                timeout: 5e3
            });
            client.open("GET", url);
            client.send();
        }
    });
    dialog.show();
}

function deviceTokenSuccess(e) {
    Ti.API.info("Device Token: " + e.deviceToken);
    Ti.App.Properties.setString("deviceToken", e.deviceToken);
}

function subscribeDeviceToken(deviceToken, channel) {
    Cloud.Users.login({
        login: "geomilano",
        password: "123456"
    }, function(e) {
        e.success ? Cloud.PushNotifications.subscribe({
            channel: channel,
            device_token: deviceToken,
            type: "gcm"
        }, function(e) {
            e.success || alert("Subscribe error:" + (e.error + ": " + e.message || JSON.stringify(e)));
        }) : alert("Error: " + (e.error + " : " + e.message || JSON.stringify(e)));
    });
}

function deviceTokenError(e) {
    alert("Failed to register for push! " + e.error);
}

var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Ti.API.API_DOMAIN = "onlinetrader.com.my";

Ti.API.USER = "biomas";

Ti.API.KEY = "06b53047cf294f7207789ff5293ad2dc";

Ti.API.CHECKSESSION = "http://" + Ti.API.API_DOMAIN + "/api/checkSession?user=" + Ti.API.USER + "&key=" + Ti.API.KEY + "&session=";

Ti.API.LOGIN = "http://" + Ti.API.API_DOMAIN + "/api/loginUser?user=" + Ti.API.USER + "&key=" + Ti.API.KEY;

Ti.API.LOGOUT = "http://" + Ti.API.API_DOMAIN + "/api/logoutUser?user=" + Ti.API.USER + "&key=" + Ti.API.KEY + "&session=";

Ti.API.GETSUMMARY = "http://" + Ti.API.API_DOMAIN + "/api/getSummaryByDealer?user=" + Ti.API.USER + "&key=" + Ti.API.KEY + "&session=";

Ti.API.GETINVENTORY = "http://" + Ti.API.API_DOMAIN + "/webview/summaryInventory?user=" + Ti.API.USER + "&key=" + Ti.API.KEY + "&session=";

Ti.API.GETUSER = "http://" + Ti.API.API_DOMAIN + "/api/getUser?user=" + Ti.API.USER + "&key=" + Ti.API.KEY + "&session=";

Ti.API.GETORDDETAILS = "http://" + Ti.API.API_DOMAIN + "/api/getOrderDetails?user=" + Ti.API.USER + "&key=" + Ti.API.KEY + "&session=";

Ti.API.UPDATEUSER = "http://" + Ti.API.API_DOMAIN + "/api/updateUser?user=" + Ti.API.USER + "&key=" + Ti.API.KEY + "&session=";

Ti.API.UPDATEORDER = "http://" + Ti.API.API_DOMAIN + "/api/updateOrder?user=" + Ti.API.USER + "&key=" + Ti.API.KEY + "&session=";

Ti.API.ADDORDER = "http://" + Ti.API.API_DOMAIN + "/api/addOrder?user=" + Ti.API.USER + "&key=" + Ti.API.KEY + "&session=";

Ti.API.ADDPOS = "http://" + Ti.API.API_DOMAIN + "/api/addPos?user=" + Ti.API.USER + "&key=" + Ti.API.KEY + "&session=";

Ti.API.PICKORDER = "http://" + Ti.API.API_DOMAIN + "/api/pickOrder?user=" + Ti.API.USER + "&key=" + Ti.API.KEY + "&session=";

Ti.API.CANCELORDER = "http://" + Ti.API.API_DOMAIN + "/api/cancelOrder?user=" + Ti.API.USER + "&key=" + Ti.API.KEY + "&session=";

Ti.API.COMPLETEORDER = "http://" + Ti.API.API_DOMAIN + "/api/completeOrder?user=" + Ti.API.USER + "&key=" + Ti.API.KEY + "&session=";

Ti.API.GETDEALERORD = "http://" + Ti.API.API_DOMAIN + "/api/getOrder?user=" + Ti.API.USER + "&key=" + Ti.API.KEY + "&type=dealer_id&session=";

Ti.API.GETDISPATCHORD = "http://" + Ti.API.API_DOMAIN + "/api/getOrder?user=" + Ti.API.USER + "&key=" + Ti.API.KEY + "&type=dispatch_id&session=";

Ti.API.GETPNDORDER = "http://" + Ti.API.API_DOMAIN + "/api/getOrder?user=" + Ti.API.USER + "&key=" + Ti.API.KEY + "&type=status&value=1&session=";

Ti.API.GETSTATISTIC = "http://" + Ti.API.API_DOMAIN + "/api/getStatisticByDate?user=" + Ti.API.USER + "&key=" + Ti.API.KEY + "&session=";

Ti.API.GETSTATE = "http://" + Ti.API.API_DOMAIN + "/api/getState?user=" + Ti.API.USER + "&key=" + Ti.API.KEY + "&session=";

Ti.API.GETPRODUCT = "http://" + Ti.API.API_DOMAIN + "/api/getProduct?user=" + Ti.API.USER + "&key=" + Ti.API.KEY + "&session=";

Ti.API.ADDTRACKING = "http://" + Ti.API.API_DOMAIN + "/api/addTrackingLog?user=" + Ti.API.USER + "&key=" + Ti.API.KEY + "&session=";

Ti.API.GETTRACKING = "http://" + Ti.API.API_DOMAIN + "/api/getOrderTracking?user=" + Ti.API.USER + "&key=" + Ti.API.KEY + "&session=";

Ti.CURRENTWINDOW = "";

Ti.App.CURRENTWINDOW = "";

Ti.App.WindowCabinet = [];

Alloy.Globals.deviceHeight = Ti.Platform.displayCaps.platformHeight;

Alloy.Globals.osname = "android";

if ("android" == Alloy.Globals.osname) {
    var CloudPush = require("ti.cloudpush");
    var Cloud = require("ti.cloud");
    CloudPush.addEventListener("callback", function(evt) {
        alert(evt.payload);
    });
    CloudPush.addEventListener("trayClickLaunchedApp", function() {
        Ti.API.info("Tray Click Launched App (app was not running)");
    });
    CloudPush.addEventListener("trayClickFocusedApp", function() {
        Ti.API.info("Tray Click Focused App (app was already running)");
    });
    CloudPush.retrieveDeviceToken({
        success: deviceTokenSuccess,
        error: deviceTokenError
    });
}

Alloy.createController("index");