function Controller() {
    function orderCancel() {
        var dialog = Ti.UI.createAlertDialog({
            cancel: 1,
            buttonNames: [ "No", "Yes" ],
            message: "Are you sure want to cancel?",
            title: "Order Delivery Status"
        });
        dialog.addEventListener("click", function(e) {
            e.index === e.source.cancel;
            1 === e.index && callOrderAction(Ti.API.CANCELORDER);
        });
        dialog.show();
    }
    function orderComplete() {
        var dialog = Ti.UI.createAlertDialog({
            cancel: 1,
            buttonNames: [ "Cancel", "Completed" ],
            message: "Mission Accomplished?",
            title: "Order Delivery Status"
        });
        dialog.addEventListener("click", function(e) {
            e.index === e.source.cancel;
            1 === e.index && callOrderAction(Ti.API.COMPLETEORDER);
        });
        dialog.show();
    }
    function callOrderAction(action) {
        var url = action + Ti.App.Properties.getString("session") + "&o_id=" + o_id;
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                var res = JSON.parse(this.responseText);
                "success" == res.status ? goBack() : alert("An known error occur. Please try again.");
            },
            onerror: function() {
                alert("An known error occur. Please try again.");
            },
            timeout: 5e3
        });
        client.open("GET", url);
        client.send();
    }
    function construct() {
        Ti.App.fireEvent("app:orderDetailsParam", {
            o_id: o_id,
            session: Ti.App.Properties.getString("session"),
            update: Ti.API.UPDATEORDER + Ti.App.Properties.getString("session"),
            details: Ti.API.GETORDDETAILS + Ti.App.Properties.getString("session") + "&o_id=" + o_id,
            complete: Ti.API.COMPLETEORDER + Ti.App.Properties.getString("session") + "&o_id=" + o_id,
            cancel: Ti.API.CANCELORDER + Ti.App.Properties.getString("session") + "&o_id=" + o_id,
            state: Ti.API.GETSTATE,
            product: Ti.API.GETPRODUCT
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "dispatcher_orderdetail";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.dis_orderdetail_win = Ti.UI.createWindow({
        backgroundColor: "white",
        navBarHidden: true,
        id: "dis_orderdetail_win"
    });
    $.__views.dis_orderdetail_win && $.addTopLevelView($.__views.dis_orderdetail_win);
    $.__views.__alloyId66 = Alloy.createController("_orderdetailheader", {
        id: "__alloyId66",
        __parentSymbol: $.__views.dis_orderdetail_win
    });
    $.__views.__alloyId66.setParent($.__views.dis_orderdetail_win);
    $.__views.content = Ti.UI.createView({
        top: "60dp",
        font: {
            fontSize: "16dp"
        },
        color: "#e02222",
        layout: "vertical",
        left: "5dp",
        right: "5dp",
        id: "content"
    });
    $.__views.dis_orderdetail_win.add($.__views.content);
    $.__views.__alloyId67 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        color: "#e02222",
        font: {
            fontSize: "18dp"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        text: "ORDER DETAILS",
        id: "__alloyId67"
    });
    $.__views.content.add($.__views.__alloyId67);
    $.__views.__alloyId68 = Ti.UI.createImageView({
        width: "100%",
        height: 1,
        backgroundColor: "#9d0404",
        id: "__alloyId68"
    });
    $.__views.content.add($.__views.__alloyId68);
    $.__views.__alloyId69 = Ti.UI.createView({
        layout: "vertical",
        width: "100%",
        bottom: 2,
        height: "70%",
        top: "90",
        id: "__alloyId69"
    });
    $.__views.dis_orderdetail_win.add($.__views.__alloyId69);
    $.__views.orderdetailview = Ti.UI.createWebView({
        id: "orderdetailview",
        disableBounce: "true",
        url: "/html/dispatcher_orderdetail.html"
    });
    $.__views.__alloyId69.add($.__views.orderdetailview);
    construct ? $.__views.orderdetailview.addEventListener("load", construct) : __defers["$.__views.orderdetailview!load!construct"] = true;
    $.__views.footer = Ti.UI.createView({
        height: "62",
        bottom: 0,
        backgroundColor: "#e02222",
        id: "footer"
    });
    $.__views.dis_orderdetail_win.add($.__views.footer);
    $.__views.btncomplete = Ti.UI.createLabel({
        width: "50%",
        color: "#fff",
        left: "0%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: Titanium.UI.FILL,
        text: "COMPLETE",
        id: "btncomplete"
    });
    $.__views.footer.add($.__views.btncomplete);
    orderComplete ? $.__views.btncomplete.addEventListener("touchend", orderComplete) : __defers["$.__views.btncomplete!touchend!orderComplete"] = true;
    $.__views.__alloyId70 = Ti.UI.createView({
        backgroundColor: "#e8e8e8",
        width: 1,
        height: Titanium.UI.FILL,
        left: "50%",
        top: "0%",
        id: "__alloyId70"
    });
    $.__views.footer.add($.__views.__alloyId70);
    $.__views.btncancel = Ti.UI.createLabel({
        width: "50%",
        color: "#fff",
        left: "50%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: Titanium.UI.FILL,
        text: "CANCEL",
        id: "btncancel"
    });
    $.__views.footer.add($.__views.btncancel);
    orderCancel ? $.__views.btncancel.addEventListener("touchend", orderCancel) : __defers["$.__views.btncancel!touchend!orderCancel"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var o_id = args.o_id || "";
    Ti.App.Properties.setString("current_oid", o_id), function goBack() {
        $.dis_orderdetail_win.close({
            transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
        });
    };
    Ti.App.fireEvent("getSession", {
        session: Ti.App.Properties.getString("session")
    });
    Ti.App.addEventListener("addOrderComplete", function() {
        var roles = Ti.App.Properties.getString("roles");
        page = roles + "_summary";
        var summary = Alloy.createController(page).getView();
        summary.open();
    });
    $.orderdetailview.addEventListener("load", function() {
        Ti.App.fireEvent("app:orderDetailsParam", {
            session: Ti.App.Properties.getString("session"),
            update: Ti.API.UPDATEORDER + Ti.App.Properties.getString("session"),
            details: Ti.API.GETORDDETAILS + Ti.App.Properties.getString("session") + "&o_id=" + o_id,
            complete: Ti.API.COMPLETEORDER + Ti.App.Properties.getString("session") + "&o_id=" + o_id,
            cancel: Ti.API.CANCELORDER + Ti.App.Properties.getString("session") + "&o_id=" + o_id,
            state: Ti.API.GETSTATE,
            product: Ti.API.GETPRODUCT
        });
    });
    $.btncancel.addEventListener("touchstart", function() {
        this.setBackgroundColor("#fff");
        this.setColor("#e02222");
    });
    $.btncancel.addEventListener("touchend", function() {
        this.setBackgroundColor("transparent");
        this.setColor("#fff");
    });
    $.btncomplete.addEventListener("touchstart", function() {
        this.setBackgroundColor("#fff");
        this.setColor("#e02222");
    });
    $.btncomplete.addEventListener("touchend", function() {
        this.setBackgroundColor("transparent");
        this.setColor("#fff");
    });
    __defers["$.__views.orderdetailview!load!construct"] && $.__views.orderdetailview.addEventListener("load", construct);
    __defers["$.__views.btncomplete!touchend!orderComplete"] && $.__views.btncomplete.addEventListener("touchend", orderComplete);
    __defers["$.__views.btncancel!touchend!orderCancel"] && $.__views.btncancel.addEventListener("touchend", orderCancel);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;