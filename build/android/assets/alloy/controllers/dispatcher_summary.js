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
    this.__controllerPath = "dispatcher_summary";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.dispatcher_summary = Ti.UI.createWindow({
        backgroundColor: "white",
        navBarHidden: true,
        id: "dispatcher_summary"
    });
    $.__views.dispatcher_summary && $.addTopLevelView($.__views.dispatcher_summary);
    $.__views.footer = Alloy.createController("_header", {
        height: Titanium.UI.SIZE,
        bottom: 0,
        backgroundColor: "#e02222",
        id: "footer",
        __parentSymbol: $.__views.dispatcher_summary
    });
    $.__views.footer.setParent($.__views.dispatcher_summary);
    $.__views.__alloyId89 = Ti.UI.createView({
        top: "60dp",
        font: {
            fontSize: "14dp",
            fontFamily: "sans-serif"
        },
        color: "#525252",
        layout: "vertical",
        left: "5dp",
        right: "5dp",
        height: "500",
        id: "__alloyId89"
    });
    $.__views.dispatcher_summary.add($.__views.__alloyId89);
    $.__views.__alloyId90 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        color: "#e02222",
        font: {
            fontSize: "18dp"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        text: "DISPATCHER - SUMMARY",
        id: "__alloyId90"
    });
    $.__views.__alloyId89.add($.__views.__alloyId90);
    $.__views.__alloyId91 = Ti.UI.createImageView({
        width: "100%",
        height: 1,
        backgroundColor: "#9d0404",
        id: "__alloyId91"
    });
    $.__views.__alloyId89.add($.__views.__alloyId91);
    $.__views.__alloyId92 = Ti.UI.createView({
        height: "40",
        id: "__alloyId92"
    });
    $.__views.__alloyId89.add($.__views.__alloyId92);
    $.__views.__alloyId93 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        color: "#e02222",
        text: "Today Commission",
        top: "10dp",
        left: "10dp",
        id: "__alloyId93"
    });
    $.__views.__alloyId92.add($.__views.__alloyId93);
    $.__views.todayCommission = Ti.UI.createLabel({
        width: "20%",
        color: "#e02222",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        top: "10dp",
        left: "80%",
        text: "0",
        id: "todayCommission"
    });
    $.__views.__alloyId92.add($.__views.todayCommission);
    $.__views.testing = Ti.UI.createView({
        height: "40",
        id: "testing"
    });
    $.__views.__alloyId89.add($.__views.testing);
    $.__views.__alloyId94 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        color: "#e02222",
        text: "Monthly Commission",
        mod: "monthly_commission",
        top: "10dp",
        left: "10dp",
        id: "__alloyId94"
    });
    $.__views.testing.add($.__views.__alloyId94);
    goNav ? $.__views.__alloyId94.addEventListener("click", goNav) : __defers["$.__views.__alloyId94!click!goNav"] = true;
    $.__views.monthCommission = Ti.UI.createLabel({
        width: "20%",
        color: "#e02222",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        top: "10dp",
        left: "80%",
        text: "0",
        id: "monthCommission"
    });
    $.__views.testing.add($.__views.monthCommission);
    $.__views.__alloyId95 = Ti.UI.createImageView({
        width: "100%",
        height: 1,
        backgroundColor: "#9d0404",
        id: "__alloyId95"
    });
    $.__views.__alloyId89.add($.__views.__alloyId95);
    $.__views.footer = Alloy.createController("_dispatcher_footer", {
        height: Titanium.UI.SIZE,
        bottom: 0,
        backgroundColor: "#e02222",
        id: "footer",
        __parentSymbol: $.__views.dispatcher_summary
    });
    $.__views.footer.setParent($.__views.dispatcher_summary);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    getSummary();
    var summary = $.footer.getView("summary");
    summary.image = "/images/icons/icon-summary-active.png";
    Ti.App.Properties.setString("module", "dispatcher_summary");
    __defers["$.__views.__alloyId94!click!goNav"] && $.__views.__alloyId94.addEventListener("click", goNav);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;