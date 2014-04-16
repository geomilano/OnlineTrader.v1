function Controller() {
    function loadTableRow(data) {
        var tableData = [];
        for (var i = 0; data.length > i; i++) {
            var row = Ti.UI.createTableViewRow({
                className: "forumEvent",
                rowIndex: i,
                selectionStyle: 0,
                separatorColor: "#ccc",
                width: "100%"
            });
            var lblField = Ti.UI.createLabel({
                text: data[i]["date"],
                color: "#222",
                top: "10dp",
                left: "10dp"
            });
            var lblField2 = Ti.UI.createLabel({
                realValue: "Value",
                textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                top: "10dp",
                width: "20%",
                left: "80%",
                text: data[i]["value"],
                color: "#222"
            });
            var separator = Ti.UI.createView({
                top: 49,
                backgroundColor: "#9d0404",
                height: 1
            });
            row.add(lblField);
            row.add(lblField2);
            row.add(separator);
            tableData.push(row);
        }
        $.tableView.setData(tableData);
    }
    function getSummary() {
        var url = Ti.API.GETSUMMARY + Ti.App.Properties.getString("session");
        var data = [];
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                var res = JSON.parse(this.responseText);
                if ("Success" == res.status) {
                    var currentTime = new Date();
                    var month = currentTime.getMonth() + 1;
                    var day = currentTime.getDate();
                    var year = currentTime.getFullYear();
                    10 > month && (month = "0" + month);
                    var date = "";
                    for (var i = 1; day >= i; i++) {
                        var exist = "N";
                        10 > i && (i = "0" + i);
                        date = year + "-" + month + "-" + i;
                        for (var key in res.data) {
                            var obj = res.data[key];
                            if (obj.created == date) {
                                data.push({
                                    date: date,
                                    value: obj.commission
                                });
                                exist = "Y";
                            }
                        }
                        "Y" != exist && data.push({
                            date: date,
                            value: 0
                        });
                    }
                    loadTableRow(data);
                } else {
                    alert(res.status);
                    createAlert("Error", res.status);
                }
            },
            onerror: function() {
                createAlert("Network declined", "Failed to contact with server. Please make sure your device are connected to internet.");
            },
            timeout: 1e4
        });
        client.open("GET", url);
        client.send();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "dealer_monthly_commission";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.dealer_monthly_commission = Ti.UI.createWindow({
        backgroundColor: "white",
        navBarHidden: true,
        id: "dealer_monthly_commission"
    });
    $.__views.dealer_monthly_commission && $.addTopLevelView($.__views.dealer_monthly_commission);
    $.__views.footer = Alloy.createController("_subheader", {
        height: Titanium.UI.SIZE,
        bottom: 0,
        backgroundColor: "#e02222",
        id: "footer",
        __parentSymbol: $.__views.dealer_monthly_commission
    });
    $.__views.footer.setParent($.__views.dealer_monthly_commission);
    $.__views.__alloyId9 = Ti.UI.createView({
        top: "60dp",
        font: {
            fontSize: "14dp",
            fontFamily: "sans-serif"
        },
        color: "#525252",
        layout: "vertical",
        left: "5dp",
        right: "5dp",
        height: "78%",
        id: "__alloyId9"
    });
    $.__views.dealer_monthly_commission.add($.__views.__alloyId9);
    $.__views.__alloyId10 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        color: "#e02222",
        font: {
            fontSize: "18dp"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        text: "DEALER - MONTHLY COMMISSION",
        id: "__alloyId10"
    });
    $.__views.__alloyId9.add($.__views.__alloyId10);
    $.__views.__alloyId11 = Ti.UI.createImageView({
        width: "100%",
        height: 1,
        backgroundColor: "#9d0404",
        id: "__alloyId11"
    });
    $.__views.__alloyId9.add($.__views.__alloyId11);
    $.__views.tableView = Ti.UI.createTableView({
        width: "100%",
        id: "tableView"
    });
    $.__views.__alloyId9.add($.__views.tableView);
    $.__views.footer = Alloy.createController("_dealer_footer", {
        height: Titanium.UI.SIZE,
        bottom: 0,
        backgroundColor: "#e02222",
        id: "footer",
        __parentSymbol: $.__views.dealer_monthly_commission
    });
    $.__views.footer.setParent($.__views.dealer_monthly_commission);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    getSummary();
    var summary = $.footer.getView("summary");
    summary.image = "/images/icons/icon-summary-active.png";
    Ti.App.Properties.setString("module", "dealer_summary");
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;