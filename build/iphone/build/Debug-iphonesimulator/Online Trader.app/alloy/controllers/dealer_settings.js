function Controller() {
    function chooseState() {
        dialog = Titanium.UI.createOptionDialog({
            destructive: 0,
            options: stateArr,
            title: "Please choose your preferred state"
        });
        dialog.addEventListener("click", function(e) {
            $.prefer_state.value = stateArr[e.index];
        });
        dialog.show();
    }
    function doUpdates() {
        var fullname = $.fullname.value;
        var mobile = $.mobile.value;
        var prefer_state = $.prefer_state.value;
        var new_password = $.new_password.value;
        var confirm_password = $.confirm_password.value;
        if ("" == fullname) {
            createAlert("Request Rejected", "Full name cannot be empty.");
            return;
        }
        if ("" == mobile) {
            createAlert("Request Rejected", "Mobile number cannot be empty.");
            return;
        }
        if ("" != new_password && new_password != confirm_password) {
            createAlert("Request Rejected", "Both password must be match.");
            return;
        }
        var url = Ti.API.UPDATEUSER + Ti.App.Properties.getString("session") + "&fullname=" + fullname + "&mobile=" + mobile + "&prefer_state=" + prefer_state + "&password=" + new_password;
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                var res = JSON.parse(this.responseText);
                "success" == res.status && createAlert("Profile Updates", "Your changes successfully saved.");
            },
            onerror: function() {
                createAlert("Network declined", "Failed to contact with server. Please make sure your device are connected to internet.");
            },
            timeout: 5e3
        });
        client.open("GET", url);
        client.send();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "dealer_settings";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.dealer_settings = Ti.UI.createWindow({
        backgroundColor: "white",
        navBarHidden: true,
        id: "dealer_settings"
    });
    $.__views.dealer_settings && $.addTopLevelView($.__views.dealer_settings);
    $.__views.footer = Alloy.createController("_header", {
        height: Titanium.UI.SIZE,
        bottom: 0,
        backgroundColor: "#e02222",
        id: "footer",
        __parentSymbol: $.__views.dealer_settings
    });
    $.__views.footer.setParent($.__views.dealer_settings);
    $.__views.content = Ti.UI.createView({
        top: "60dp",
        font: {
            fontSize: "14dp",
            fontFamily: "sans-serif"
        },
        color: "#525252",
        layout: "vertical",
        left: "5dp",
        right: "5dp",
        id: "content"
    });
    $.__views.dealer_settings.add($.__views.content);
    $.__views.__alloyId30 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        color: "#e02222",
        font: {
            fontSize: "18dp"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        text: "SETTINGS",
        id: "__alloyId30"
    });
    $.__views.content.add($.__views.__alloyId30);
    $.__views.__alloyId31 = Ti.UI.createImageView({
        width: "100%",
        height: 1,
        backgroundColor: "#9d0404",
        bottom: "5",
        id: "__alloyId31"
    });
    $.__views.content.add($.__views.__alloyId31);
    $.__views.__alloyId32 = Ti.UI.createScrollView({
        layout: "vertical",
        height: "78%",
        width: "100%",
        id: "__alloyId32"
    });
    $.__views.content.add($.__views.__alloyId32);
    $.__views.__alloyId33 = Ti.UI.createView({
        backgroundColor: "white",
        navBarHidden: true,
        layout: "horizontal",
        top: "5",
        height: "60",
        id: "__alloyId33"
    });
    $.__views.__alloyId32.add($.__views.__alloyId33);
    $.__views.__alloyId34 = Ti.UI.createLabel({
        width: "auto",
        color: "#e02222",
        left: 10,
        text: "Dealer name",
        title: "Name",
        id: "__alloyId34"
    });
    $.__views.__alloyId33.add($.__views.__alloyId34);
    $.__views.fullname = Ti.UI.createTextField({
        height: "35dp",
        left: 10,
        font: {
            fontSize: "14dp"
        },
        width: "90%",
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType: Titanium.UI.RETURNKEY_NEXT,
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "fullname",
        value: "",
        hintText: "Enter Fullname"
    });
    $.__views.__alloyId33.add($.__views.fullname);
    $.__views.__alloyId35 = Ti.UI.createView({
        backgroundColor: "white",
        navBarHidden: true,
        layout: "horizontal",
        height: "60",
        id: "__alloyId35"
    });
    $.__views.__alloyId32.add($.__views.__alloyId35);
    $.__views.__alloyId36 = Ti.UI.createLabel({
        width: "auto",
        color: "#e02222",
        left: 10,
        text: "Contact Number",
        title: "Contact",
        id: "__alloyId36"
    });
    $.__views.__alloyId35.add($.__views.__alloyId36);
    $.__views.mobile = Ti.UI.createTextField({
        hintText: "Enter Mobile Number",
        height: "35dp",
        font: {
            fontSize: "14dp"
        },
        left: 10,
        width: "90%",
        keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD,
        returnKeyType: Titanium.UI.RETURNKEY_NEXT,
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        clearButtonMode: Titanium.UI.INPUT_BUTTONMODE_ONFOCUS,
        id: "mobile",
        value: ""
    });
    $.__views.__alloyId35.add($.__views.mobile);
    $.__views.__alloyId37 = Ti.UI.createView({
        backgroundColor: "white",
        navBarHidden: true,
        layout: "horizontal",
        height: "60",
        id: "__alloyId37"
    });
    $.__views.__alloyId32.add($.__views.__alloyId37);
    $.__views.__alloyId38 = Ti.UI.createLabel({
        width: "auto",
        color: "#e02222",
        left: 10,
        text: "Preferred State",
        title: "Contact",
        id: "__alloyId38"
    });
    $.__views.__alloyId37.add($.__views.__alloyId38);
    $.__views.prefer_state = Ti.UI.createTextField({
        height: "35dp",
        left: 10,
        font: {
            fontSize: "14dp"
        },
        width: "90%",
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType: Titanium.UI.RETURNKEY_NEXT,
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "prefer_state",
        editable: "false",
        hintText: "Choose state"
    });
    $.__views.__alloyId37.add($.__views.prefer_state);
    chooseState ? $.__views.prefer_state.addEventListener("click", chooseState) : __defers["$.__views.prefer_state!click!chooseState"] = true;
    $.__views.__alloyId39 = Ti.UI.createView({
        backgroundColor: "white",
        navBarHidden: true,
        layout: "horizontal",
        height: "60",
        id: "__alloyId39"
    });
    $.__views.__alloyId32.add($.__views.__alloyId39);
    $.__views.__alloyId40 = Ti.UI.createLabel({
        width: "auto",
        color: "#e02222",
        left: 10,
        text: "New Password",
        title: "Email",
        id: "__alloyId40"
    });
    $.__views.__alloyId39.add($.__views.__alloyId40);
    $.__views.new_password = Ti.UI.createTextField({
        passwordMask: true,
        height: "35dp",
        font: {
            fontSize: "14dp"
        },
        left: 10,
        width: "90%",
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType: Titanium.UI.RETURNKEY_NEXT,
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "new_password",
        hintText: "Enter New Password",
        value: ""
    });
    $.__views.__alloyId39.add($.__views.new_password);
    $.__views.__alloyId41 = Ti.UI.createView({
        backgroundColor: "white",
        navBarHidden: true,
        layout: "horizontal",
        height: "60",
        id: "__alloyId41"
    });
    $.__views.__alloyId32.add($.__views.__alloyId41);
    $.__views.__alloyId42 = Ti.UI.createLabel({
        width: "auto",
        color: "#e02222",
        left: 10,
        text: "Confirm Password",
        title: "Email",
        id: "__alloyId42"
    });
    $.__views.__alloyId41.add($.__views.__alloyId42);
    $.__views.confirm_password = Ti.UI.createTextField({
        passwordMask: true,
        height: "35dp",
        font: {
            fontSize: "14dp"
        },
        left: 10,
        width: "90%",
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType: Titanium.UI.RETURNKEY_NEXT,
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "confirm_password",
        hintText: "Enter Confirm Password",
        value: ""
    });
    $.__views.__alloyId41.add($.__views.confirm_password);
    $.__views.updateButton = Ti.UI.createButton({
        id: "updateButton",
        backgroundImage: "/images/btn-update.png",
        top: "20",
        width: "90%"
    });
    $.__views.__alloyId32.add($.__views.updateButton);
    doUpdates ? $.__views.updateButton.addEventListener("click", doUpdates) : __defers["$.__views.updateButton!click!doUpdates"] = true;
    $.__views.r_sub_footer = Alloy.createController("_dealer_subfooter", {
        id: "r_sub_footer",
        __parentSymbol: $.__views.dealer_settings
    });
    $.__views.r_sub_footer.setParent($.__views.dealer_settings);
    $.__views.footer = Alloy.createController("_dealer_footer", {
        height: Titanium.UI.SIZE,
        bottom: 0,
        backgroundColor: "#e02222",
        id: "footer",
        __parentSymbol: $.__views.dealer_settings
    });
    $.__views.footer.setParent($.__views.dealer_settings);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var more = $.footer.getView("more");
    more.image = "/images/icons/icon-more-active.png";
    var settings = $.footer.getView("settings");
    settings.image = "/images/icons/icon-setting-active.png";
    Ti.App.Properties.setString("module", "dealer_settings");
    var url = Ti.API.GETUSER + Ti.App.Properties.getString("session");
    stateArr = [];
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var res = JSON.parse(this.responseText);
            $.fullname.value = res.data.fullname;
            $.mobile.value = res.data.mobile;
            $.prefer_state.value = res.data.userState;
            stateArr = res.data.stateList;
        },
        onerror: function() {
            createAlert("Network declined", "Failed to contact with server. Please make sure your device are connected to internet.");
        },
        timeout: 1e4
    });
    client.open("GET", url);
    client.send();
    __defers["$.__views.prefer_state!click!chooseState"] && $.__views.prefer_state.addEventListener("click", chooseState);
    __defers["$.__views.updateButton!click!doUpdates"] && $.__views.updateButton.addEventListener("click", doUpdates);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;