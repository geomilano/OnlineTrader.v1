function Controller() {
    function construct() {
        Ti.App.fireEvent("app:orderDetailsParam", {
            o_id: o_id,
            session: Ti.App.Properties.getString("session"),
            update: Ti.API.UPDATEORDER + Ti.App.Properties.getString("session"),
            details: Ti.API.GETORDDETAILS + Ti.App.Properties.getString("session") + "&o_id=" + o_id,
            state: Ti.API.GETSTATE,
            product: Ti.API.GETPRODUCT,
            url: Ti.API.ADDTRACKING
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "dealer_orderdetail";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.orderdetail_win = Ti.UI.createWindow({
        backgroundColor: "white",
        navBarHidden: true,
        id: "orderdetail_win"
    });
    $.__views.orderdetail_win && $.addTopLevelView($.__views.orderdetail_win);
    $.__views.__alloyId16 = Alloy.createController("_orderdetailheader", {
        id: "__alloyId16",
        __parentSymbol: $.__views.orderdetail_win
    });
    $.__views.__alloyId16.setParent($.__views.orderdetail_win);
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
    $.__views.orderdetail_win.add($.__views.content);
    $.__views.__alloyId17 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        color: "#e02222",
        font: {
            fontSize: "18dp"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        text: "ORDER DETAILS",
        id: "__alloyId17"
    });
    $.__views.content.add($.__views.__alloyId17);
    $.__views.__alloyId18 = Ti.UI.createImageView({
        width: "100%",
        height: 1,
        backgroundColor: "#9d0404",
        id: "__alloyId18"
    });
    $.__views.content.add($.__views.__alloyId18);
    $.__views.__alloyId19 = Ti.UI.createView({
        layout: "vertical",
        width: "100%",
        bottom: 2,
        height: "90%",
        top: "90",
        id: "__alloyId19"
    });
    $.__views.orderdetail_win.add($.__views.__alloyId19);
    $.__views.orderdetailview = Ti.UI.createWebView({
        id: "orderdetailview",
        disableBounce: "true",
        url: "/html/dealer_orderdetail.html"
    });
    $.__views.__alloyId19.add($.__views.orderdetailview);
    construct ? $.__views.orderdetailview.addEventListener("load", construct) : __defers["$.__views.orderdetailview!load!construct"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var o_id = args.o_id || "";
    Ti.App.Properties.setString("current_oid", o_id), function() {
        $.orderdetail_win.close({
            transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
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
            state: Ti.API.GETSTATE,
            product: Ti.API.GETPRODUCT,
            url: Ti.API.ADDTRACKING
        });
    });
    __defers["$.__views.orderdetailview!load!construct"] && $.__views.orderdetailview.addEventListener("load", construct);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;