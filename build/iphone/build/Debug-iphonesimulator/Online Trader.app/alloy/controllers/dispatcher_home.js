function Controller() {
    function construct() {
        Ti.App.fireEvent("app:getPendingList", {
            session: Ti.App.Properties.getString("session"),
            url: Ti.API.GETPNDORDER + Ti.App.Properties.getString("session"),
            state: Ti.API.GETSTATE
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "dispatcher_home";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.dispatcher_home = Ti.UI.createWindow({
        backgroundColor: "white",
        navBarHidden: true,
        id: "dispatcher_home"
    });
    $.__views.dispatcher_home && $.addTopLevelView($.__views.dispatcher_home);
    $.__views.__alloyId60 = Alloy.createController("_header", {
        id: "__alloyId60",
        __parentSymbol: $.__views.dispatcher_home
    });
    $.__views.__alloyId60.setParent($.__views.dispatcher_home);
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
    $.__views.dispatcher_home.add($.__views.content);
    $.__views.__alloyId61 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        color: "#e02222",
        font: {
            fontSize: "18dp"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        text: "HOME",
        id: "__alloyId61"
    });
    $.__views.content.add($.__views.__alloyId61);
    $.__views.__alloyId62 = Ti.UI.createImageView({
        width: "100%",
        height: 1,
        backgroundColor: "#9d0404",
        id: "__alloyId62"
    });
    $.__views.content.add($.__views.__alloyId62);
    $.__views.home_form = Ti.UI.createView({
        layout: "vertical",
        width: "100%",
        bottom: 2,
        height: "72%",
        top: "90",
        id: "home_form"
    });
    $.__views.dispatcher_home.add($.__views.home_form);
    $.__views.dis_home = Ti.UI.createWebView({
        id: "dis_home",
        disableBounce: "true",
        url: "/html/dispatcher_home.html"
    });
    $.__views.home_form.add($.__views.dis_home);
    construct ? $.__views.dis_home.addEventListener("load", construct) : __defers["$.__views.dis_home!load!construct"] = true;
    $.__views.footer = Alloy.createController("_dispatcher_footer", {
        height: Titanium.UI.SIZE,
        bottom: 0,
        backgroundColor: "#e02222",
        id: "footer",
        __parentSymbol: $.__views.dispatcher_home
    });
    $.__views.footer.setParent($.__views.dispatcher_home);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var home = $.footer.getView("home");
    home.image = "/images/icons/icon-dispatcher-task-active.png";
    Ti.App.Properties.setString("module", "dispatcher_home");
    $.dis_home.addEventListener("load", function() {
        Ti.App.fireEvent("app:getPendingList", {
            session: Ti.App.Properties.getString("session"),
            url: Ti.API.GETPNDORDER + Ti.App.Properties.getString("session"),
            pick: Ti.API.PICKORDER + Ti.App.Properties.getString("session")
        });
    });
    "480" >= Alloy.Globals.deviceHeight && ($.home_form.height = "67%");
    __defers["$.__views.dis_home!load!construct"] && $.__views.dis_home.addEventListener("load", construct);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;