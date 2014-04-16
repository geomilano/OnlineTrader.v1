function Controller() {
    function construct() {
        Ti.App.fireEvent("app:orderListParam", {
            session: Ti.App.Properties.getString("session"),
            url: Ti.API.GETDISPATCHORD + Ti.App.Properties.getString("session")
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "dispatcher_orderlist";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.dealer_orderlist = Ti.UI.createWindow({
        backgroundColor: "white",
        navBarHidden: true,
        id: "dealer_orderlist"
    });
    $.__views.dealer_orderlist && $.addTopLevelView($.__views.dealer_orderlist);
    $.__views.__alloyId71 = Alloy.createController("_header", {
        id: "__alloyId71",
        __parentSymbol: $.__views.dealer_orderlist
    });
    $.__views.__alloyId71.setParent($.__views.dealer_orderlist);
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
    $.__views.dealer_orderlist.add($.__views.content);
    $.__views.__alloyId72 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        color: "#e02222",
        font: {
            fontSize: "18dp"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        text: "DISPATCHER - ORDER LIST",
        id: "__alloyId72"
    });
    $.__views.content.add($.__views.__alloyId72);
    $.__views.__alloyId73 = Ti.UI.createImageView({
        width: "100%",
        height: 1,
        backgroundColor: "#9d0404",
        id: "__alloyId73"
    });
    $.__views.content.add($.__views.__alloyId73);
    $.__views.list_form = Ti.UI.createView({
        layout: "vertical",
        width: "100%",
        bottom: 2,
        height: "72%",
        top: "90",
        id: "list_form"
    });
    $.__views.dealer_orderlist.add($.__views.list_form);
    $.__views.orderlistview = Ti.UI.createWebView({
        id: "orderlistview",
        disableBounce: "true",
        url: "/html/dispatcher_orderlist.html"
    });
    $.__views.list_form.add($.__views.orderlistview);
    construct ? $.__views.orderlistview.addEventListener("load", construct) : __defers["$.__views.orderlistview!load!construct"] = true;
    $.__views.footer = Alloy.createController("_dispatcher_footer", {
        height: Titanium.UI.SIZE,
        bottom: 0,
        backgroundColor: "#e02222",
        id: "footer",
        __parentSymbol: $.__views.dealer_orderlist
    });
    $.__views.footer.setParent($.__views.dealer_orderlist);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var orderlist = $.footer.getView("orderlist");
    orderlist.image = "/images/icons/icon-dispatcher-mytask-active.png";
    Ti.App.Properties.setString("module", "dispatcher_orderlist");
    Ti.App.fireEvent("getSession", {
        session: Ti.App.Properties.getString("session")
    });
    var goToDetails = function(e) {
        var roles = Ti.App.Properties.getString("roles");
        var param = {
            o_id: e.o_id
        };
        var orderdetail = Alloy.createController(roles + "_orderdetail", param).getView();
        orderdetail.open({
            transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
        });
        setWindowRelationship(orderdetail);
    };
    Ti.App.addEventListener("app:viewOrderDetail", goToDetails);
    $.orderlistview.addEventListener("load", function() {
        Ti.App.fireEvent("app:orderListParam", {
            session: Ti.App.Properties.getString("session"),
            url: Ti.API.GETDISPATCHORD + Ti.App.Properties.getString("session")
        });
    });
    $.dealer_orderlist.addEventListener("close", function() {
        Ti.App.removeEventListener("app:viewOrderDetail", goToDetails);
    });
    "480" >= Alloy.Globals.deviceHeight && ($.list_form.height = "67%");
    __defers["$.__views.orderlistview!load!construct"] && $.__views.orderlistview.addEventListener("load", construct);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;