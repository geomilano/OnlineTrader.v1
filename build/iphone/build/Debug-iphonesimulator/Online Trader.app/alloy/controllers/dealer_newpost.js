function Controller() {
    function construct() {
        Ti.App.fireEvent("app:newPostParam", {
            session: Ti.App.Properties.getString("session"),
            url: Ti.API.ADDORDER,
            state: Ti.API.GETSTATE,
            product: Ti.API.GETPRODUCT
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "dealer_newpost";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.dealer_newpost = Ti.UI.createWindow({
        backgroundColor: "white",
        navBarHidden: true,
        id: "dealer_newpost"
    });
    $.__views.dealer_newpost && $.addTopLevelView($.__views.dealer_newpost);
    $.__views.__alloyId12 = Alloy.createController("_header", {
        id: "__alloyId12",
        __parentSymbol: $.__views.dealer_newpost
    });
    $.__views.__alloyId12.setParent($.__views.dealer_newpost);
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
    $.__views.dealer_newpost.add($.__views.content);
    $.__views.__alloyId13 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        color: "#e02222",
        font: {
            fontSize: "18dp"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        text: "NEW POST",
        id: "__alloyId13"
    });
    $.__views.content.add($.__views.__alloyId13);
    $.__views.__alloyId14 = Ti.UI.createImageView({
        width: "100%",
        height: 1,
        backgroundColor: "#9d0404",
        id: "__alloyId14"
    });
    $.__views.content.add($.__views.__alloyId14);
    $.__views.__alloyId15 = Ti.UI.createView({
        layout: "vertical",
        width: "100%",
        bottom: 2,
        height: "75%",
        top: "90",
        id: "__alloyId15"
    });
    $.__views.dealer_newpost.add($.__views.__alloyId15);
    $.__views.newpostview = Ti.UI.createWebView({
        id: "newpostview",
        disableBounce: "true",
        url: "/html/dealer_newpost.html"
    });
    $.__views.__alloyId15.add($.__views.newpostview);
    construct ? $.__views.newpostview.addEventListener("load", construct) : __defers["$.__views.newpostview!load!construct"] = true;
    $.__views.footer = Alloy.createController("_dealer_footer", {
        height: Titanium.UI.SIZE,
        bottom: 0,
        backgroundColor: "#e02222",
        id: "footer",
        __parentSymbol: $.__views.dealer_newpost
    });
    $.__views.footer.setParent($.__views.dealer_newpost);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var newpost = $.footer.getView("newpost");
    newpost.image = "/images/icons/icon-neworder-active.png";
    Ti.App.Properties.setString("module", "dealer_newpost");
    Ti.App.fireEvent("getSession", {
        session: Ti.App.Properties.getString("session")
    });
    var addOrderComplete = function() {
        $.dealer_newpost.close();
        var roles = Ti.App.Properties.getString("roles");
        page = roles + "_orderlist";
        var orderlist = Alloy.createController(page).getView();
        orderlist.open();
        Ti.App.removeEventListener("addOrderComplete", addOrderComplete);
    };
    Ti.App.addEventListener("addOrderComplete", addOrderComplete);
    $.newpostview.addEventListener("load", function() {
        Ti.App.fireEvent("app:newPostParam", {
            session: Ti.App.Properties.getString("session"),
            url: Ti.API.ADDORDER,
            state: Ti.API.GETSTATE,
            product: Ti.API.GETPRODUCT
        });
    });
    var triggerAlert = function(e) {
        createAlert(e.tt, e.msg);
        Ti.App.removeEventListener("app:triggerAlert", triggerAlert);
    };
    Ti.App.addEventListener("app:triggerAlert", triggerAlert);
    __defers["$.__views.newpostview!load!construct"] && $.__views.newpostview.addEventListener("load", construct);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;