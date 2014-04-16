function Controller() {
    function construct() {
        Ti.App.fireEvent("app:PosParam", {
            session: Ti.App.Properties.getString("session"),
            url: Ti.API.ADDPOS,
            state: Ti.API.GETSTATE,
            product: Ti.API.GETPRODUCT
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "dealer_pos";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.dealer_pos = Ti.UI.createWindow({
        backgroundColor: "white",
        navBarHidden: true,
        id: "dealer_pos"
    });
    $.__views.dealer_pos && $.addTopLevelView($.__views.dealer_pos);
    $.__views.__alloyId26 = Alloy.createController("_header", {
        id: "__alloyId26",
        __parentSymbol: $.__views.dealer_pos
    });
    $.__views.__alloyId26.setParent($.__views.dealer_pos);
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
    $.__views.dealer_pos.add($.__views.content);
    $.__views.__alloyId27 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        color: "#e02222",
        font: {
            fontSize: "18dp"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        text: "DEALER - POS FORM",
        id: "__alloyId27"
    });
    $.__views.content.add($.__views.__alloyId27);
    $.__views.__alloyId28 = Ti.UI.createImageView({
        width: "100%",
        height: 1,
        backgroundColor: "#9d0404",
        id: "__alloyId28"
    });
    $.__views.content.add($.__views.__alloyId28);
    $.__views.__alloyId29 = Ti.UI.createView({
        layout: "vertical",
        width: "100%",
        bottom: 2,
        height: "75%",
        top: "90",
        id: "__alloyId29"
    });
    $.__views.dealer_pos.add($.__views.__alloyId29);
    $.__views.posview = Ti.UI.createWebView({
        id: "posview",
        disableBounce: "true",
        url: "/html/dealer_pos.html"
    });
    $.__views.__alloyId29.add($.__views.posview);
    construct ? $.__views.posview.addEventListener("load", construct) : __defers["$.__views.posview!load!construct"] = true;
    $.__views.footer = Alloy.createController("_dealer_footer", {
        height: Titanium.UI.SIZE,
        bottom: 0,
        backgroundColor: "#e02222",
        id: "footer",
        __parentSymbol: $.__views.dealer_pos
    });
    $.__views.footer.setParent($.__views.dealer_pos);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var newpost = $.footer.getView("pos");
    newpost.image = "/images/icons/icon-pos-active.png";
    Ti.App.Properties.setString("module", "dealer_pos");
    Ti.App.fireEvent("getSession", {
        session: Ti.App.Properties.getString("session")
    });
    var addOrderComplete = function() {
        $.dealer_pos.close();
        var roles = Ti.App.Properties.getString("roles");
        page = roles + "_summary";
        var summary = Alloy.createController(page).getView();
        summary.open();
        Ti.App.removeEventListener("addOrderComplete", addOrderComplete);
    };
    Ti.App.addEventListener("addOrderComplete", addOrderComplete);
    $.posview.addEventListener("load", function() {
        Ti.App.fireEvent("app:PosParam", {
            session: Ti.App.Properties.getString("session"),
            url: Ti.API.ADDPOS,
            state: Ti.API.GETSTATE,
            product: Ti.API.GETPRODUCT
        });
    });
    var triggerAlert = function(e) {
        createAlert(e.tt, e.msg);
        Ti.App.removeEventListener("app:triggerAlert", triggerAlert);
    };
    Ti.App.addEventListener("app:triggerAlert", triggerAlert);
    __defers["$.__views.posview!load!construct"] && $.__views.posview.addEventListener("load", construct);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;