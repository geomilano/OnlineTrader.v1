function Controller() {
    function getSummary() {
        var url = Ti.API.GETSUMMARY + Ti.App.Properties.getString("session");
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                var res = JSON.parse(this.responseText);
                if ("Success" == res.status) {
                    var currentTime = new Date();
                    var monthCommission = 0;
                    var month = currentTime.getMonth() + 1;
                    var day = currentTime.getDate();
                    var year = currentTime.getFullYear();
                    10 > month && (month = "0" + month);
                    10 > day && (day = "0" + day);
                    var today = year + "-" + month + "-" + day;
                    for (var key in res.data) {
                        var obj = res.data[key];
                        obj.created == today && ($.todayCommission.html = obj.commission);
                        monthCommission += parseFloat(obj.commission);
                    }
                    $.monthCommission.html = monthCommission;
                } else alert(res.status);
            },
            onerror: function() {
                alert("error");
            },
            timeout: 5e3
        });
        client.open("GET", url);
        client.send();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "dealer_summary";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.dealer_summary = Ti.UI.createWindow({
        backgroundColor: "white",
        navBarHidden: true,
        id: "dealer_summary"
    });
    $.__views.dealer_summary && $.addTopLevelView($.__views.dealer_summary);
    $.__views.header = Alloy.createController("_header", {
        height: "50dp",
        top: 0,
        backgroundColor: "#e02222",
        id: "header",
        __parentSymbol: $.__views.dealer_summary
    });
    $.__views.header.setParent($.__views.dealer_summary);
    $.__views.__alloyId46 = Ti.UI.createView({
        top: "60dp",
        font: {
            fontSize: "14dp",
            fontFamily: "sans-serif"
        },
        color: "#525252",
        layout: "vertical",
        left: "5dp",
        right: "5dp",
        height: "380dp",
        id: "__alloyId46"
    });
    $.__views.dealer_summary.add($.__views.__alloyId46);
    $.__views.__alloyId47 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        color: "#e02222",
        font: {
            fontSize: "18dp"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        text: "DEALER - SUMMARY",
        id: "__alloyId47"
    });
    $.__views.__alloyId46.add($.__views.__alloyId47);
    $.__views.__alloyId48 = Ti.UI.createImageView({
        width: "100%",
        height: 1,
        backgroundColor: "#9d0404",
        id: "__alloyId48"
    });
    $.__views.__alloyId46.add($.__views.__alloyId48);
    $.__views.__alloyId49 = Ti.UI.createView({
        height: "30",
        id: "__alloyId49"
    });
    $.__views.__alloyId46.add($.__views.__alloyId49);
    $.__views.__alloyId50 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        color: "#000",
        font: {
            fontSize: "12dp",
            fontFamily: "sans-serif"
        },
        text: "Today Commission",
        top: "10dp",
        left: "10dp",
        id: "__alloyId50"
    });
    $.__views.__alloyId49.add($.__views.__alloyId50);
    $.__views.todayCommission = Ti.UI.createLabel({
        width: "20%",
        color: "#000",
        font: {
            fontSize: "12dp",
            fontFamily: "sans-serif"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        top: "10dp",
        left: "80%",
        text: "0",
        id: "todayCommission"
    });
    $.__views.__alloyId49.add($.__views.todayCommission);
    $.__views.__alloyId51 = Ti.UI.createView({
        height: "30",
        id: "__alloyId51"
    });
    $.__views.__alloyId46.add($.__views.__alloyId51);
    $.__views.__alloyId52 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        color: "#000",
        font: {
            fontSize: "12dp",
            fontFamily: "sans-serif"
        },
        text: "Monthly Commission",
        mod: "monthly_commission",
        top: "10dp",
        left: "10dp",
        id: "__alloyId52"
    });
    $.__views.__alloyId51.add($.__views.__alloyId52);
    popup ? $.__views.__alloyId52.addEventListener("click", popup) : __defers["$.__views.__alloyId52!click!popup"] = true;
    $.__views.monthCommission = Ti.UI.createLabel({
        width: "20%",
        color: "#000",
        font: {
            fontSize: "12dp",
            fontFamily: "sans-serif"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        top: "10dp",
        left: "80%",
        text: "0",
        id: "monthCommission"
    });
    $.__views.__alloyId51.add($.__views.monthCommission);
    $.__views.__alloyId53 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        color: "#e02222",
        font: {
            fontSize: "18dp"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        text: "INVENTORY",
        id: "__alloyId53"
    });
    $.__views.__alloyId46.add($.__views.__alloyId53);
    $.__views.__alloyId54 = Ti.UI.createImageView({
        width: "100%",
        height: 1,
        backgroundColor: "#9d0404",
        id: "__alloyId54"
    });
    $.__views.__alloyId46.add($.__views.__alloyId54);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        color: "#888",
        id: "activityIndicator",
        message: "Loading..."
    });
    $.__views.__alloyId46.add($.__views.activityIndicator);
    $.__views.webview = Ti.UI.createWebView({
        top: 0,
        id: "webview",
        loading: "true",
        width: "100%",
        url: "/html/dealer_summary_inventory.html"
    });
    $.__views.__alloyId46.add($.__views.webview);
    $.__views.footer = Alloy.createController("_dealer_footer", {
        height: Titanium.UI.SIZE,
        bottom: 0,
        backgroundColor: "#e02222",
        id: "footer",
        __parentSymbol: $.__views.dealer_summary
    });
    $.__views.footer.setParent($.__views.dealer_summary);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    getSummary();
    var summary = $.footer.getView("summary");
    summary.image = "/images/icons/icon-summary-active.png";
    Ti.App.Properties.setString("module", "dealer_summary");
    $.webview.addEventListener("load", function() {
        $.activityIndicator.show();
        var url = Ti.API.GETINVENTORY + Ti.App.Properties.getString("session");
        Ti.App.fireEvent("app:urlFromApp", {
            url: url
        });
    });
    var removeLoading = function() {
        $.activityIndicator.hide();
        Ti.App.removeEventListener("app:removeLoading", removeLoading);
    };
    Ti.App.addEventListener("app:removeLoading", removeLoading);
    __defers["$.__views.__alloyId52!click!popup"] && $.__views.__alloyId52.addEventListener("click", popup);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;