function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function findTotalQty() {
    var arr = document.getElementsByClassName("productQty");
    var tot = 0;
    for (var i = 0; arr.length > i; i++) parseInt(arr[i].value) && (tot += parseInt(arr[i].value));
    return tot;
}

function findTotalPrice() {
    var arr = document.getElementsByClassName("productPrice");
    var qty = document.getElementsByClassName("productQty");
    var tot = 0;
    for (var i = 0; arr.length > i; i++) if (parseFloat(arr[i].value)) {
        grand_total = parseInt(qty[i].value) * parseFloat(arr[i].value);
        tot += parseFloat(grand_total);
    }
    return tot;
}

function todayDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    10 > dd && (dd = "0" + dd);
    10 > mm && (mm = "0" + mm);
    today = dd + "/" + mm + "/" + yyyy;
    return today;
}

function validateForm() {
    var name = $('input[name="name"]').val();
    var mobile = $('input[name="mobile"]').val();
    var location = $('input[name="location"]').val();
    var area = $("#selector_area").val();
    var prod = $(".productName").length;
    if ("" == name) {
        alert("Customer name cannot be empty");
        return false;
    }
    if ("" == mobile) {
        alert("Mobile number cannot be empty");
        return false;
    }
    if ("" == location) {
        alert("Location cannot be empty");
        return false;
    }
    if ("" == area) {
        alert("Area cannot be empty");
        return false;
    }
    if (0 == prod) {
        alert("Product cannot be empty");
        return false;
    }
    return true;
}

function validatePosForm() {
    var s_name = $('input[name="sender_name"]').val();
    var s_mobile = $('input[name="sender_mobile"]').val();
    var s_address = $('input[name="sender_address"]').val();
    var s_city = $('input[name="sender_city"]').val();
    var s_poscode = $('input[name="sender_postcode"]').val();
    var s_state = $('input[name="sender_state"]').val();
    var r_name = $('input[name="receiver_name"]').val();
    var r_mobile = $('input[name="receiver_mobile"]').val();
    var r_address = $('input[name="receiver_address"]').val();
    var r_city = $('input[name="receiver_city"]').val();
    var r_poscode = $('input[name="receiver_postcode"]').val();
    var r_state = $('input[name="receiver_state"]').val();
    var prod = $(".productName").length;
    if ("" == s_name) {
        alert("Sender name cannot be empty");
        return false;
    }
    if ("" == r_name) {
        alert("Receiver name cannot be empty");
        return false;
    }
    if ("" == s_mobile) {
        alert("Sender mobile number cannot be empty");
        return false;
    }
    if ("" == r_mobile) {
        alert("Receiver mobile number cannot be empty");
        return false;
    }
    if ("" == s_address) {
        alert("Sender address cannot be empty");
        return false;
    }
    if ("" == r_address) {
        alert("Receiver address cannot be empty");
        return false;
    }
    if ("" == s_city) {
        alert("Sender city cannot be empty");
        return false;
    }
    if ("" == r_city) {
        alert("Receiver city cannot be empty");
        return false;
    }
    if ("" == s_poscode) {
        alert("Sender postcode cannot be empty");
        return false;
    }
    if ("" == r_poscode) {
        alert("Receiver postcode cannot be empty");
        return false;
    }
    if ("" == s_state) {
        alert("Sender state cannot be empty");
        return false;
    }
    if ("" == r_state) {
        alert("Receiver state cannot be empty");
        return false;
    }
    if (0 == prod) {
        alert("Product cannot be empty");
        return false;
    }
    return true;
}

function orderDetailListener(titanium_bridge) {
    Ti.App.addEventListener(titanium_bridge, function(e) {
        if ("app:getPendingList" == titanium_bridge) getStateSelector(e, ""); else if ("app:PosParam" == titanium_bridge) {
            getStateSelector(e, "pos");
            getProductelector(e);
            "app:orderDetailsParam" == titanium_bridge && setTimeout(function() {
                loadDetails(e);
            }, 1500);
        } else {
            getStateSelector(e, "");
            getProductelector(e);
            "app:orderDetailsParam" == titanium_bridge && setTimeout(function() {
                loadDetails(e);
            }, 1500);
        }
    });
}

function getStateSelector(e, seltype) {
    $.getJSON(e.state + e.session, function(data) {
        if ("error" == data.status) {
            getStateSelector(e);
            return false;
        }
        var preferred = data.selected_state;
        localStorage.setItem("stateArea", JSON.stringify(data.area));
        if ("pos" == seltype) {
            var sender = '<select name="sender_state" class="selector" id="sender_state" onChange="loadArea();" style="float:left;width:100%; ">';
            sender += '<option value="">State</option>';
            $.each(data.state, function(key, val) {
                sender += "<option value=" + key + ">" + val + "</option>";
            });
            sender += "</select>";
            var receiver = '<select name="receiver_state" class="selector" id="receiver_state" onChange="loadArea();" style="float:left;width:100%; ">';
            receiver += '<option value="">State</option>';
            $.each(data.state, function(key, val) {
                receiver += "<option value=" + key + ">" + val + "</option>";
            });
            receiver += "</select>";
            $("#sender_country_selector").html(sender);
            $("#receiver_country_selector").html(receiver);
        } else {
            var item = '<select name="area" class="selector" id="selector_area" onChange="loadArea();" style="float:left;width:100%; ">';
            item += '<option value="">State</option>';
            $.each(data.state, function(key, val) {
                var is_selected = "";
                preferred == key && (is_selected = "selected");
                item += "<option value=" + key + " " + is_selected + ">" + val + "</option>";
            });
            item += "</select>";
            $("#country_selector").html(item);
            if (data.area[preferred]) {
                var item2 = '<select name="area2" class="selector" id="selector_area2" onChange="loadArea2();" style="float:left;width:100%; ">';
                item2 += '<option value="">Area</option>';
                $.each(data.area[preferred], function(area_id, area_name) {
                    item2 += "<option value=" + area_id + ">" + area_name + "</option>";
                });
                item2 += "</select>";
                $(".staticBar").css("height", "70px");
                $("#pending_order_list").css("padding-top", "75px");
                $("#area_selector").show();
                $("#area_selector").html(item2);
            }
        }
        return true;
    });
}

function getProductelector(e) {
    $.getJSON(e.product + e.session, function(data) {
        if ("error" == data.status) getProductelector(e); else {
            var item = '<select name="sel_product" class="selector" id="sel_product" style="width:100%;" onChange="onLoadPrice();">';
            item += '<option value="">-- Product--</option>';
            $.each(data, function(key, val) {
                localStorage.setItem("prodName" + val.p_id, val.name);
                localStorage.setItem("prodQty" + val.p_id, val.quantity);
                localStorage.setItem("prodPrice" + val.p_id, val.price);
                item += "<option value=" + val.p_id + ">" + val.name + "</option>";
            });
            item += "</select>";
            $("#product_selector").html(item);
        }
    });
}

function onLoadPrice() {
    var pid = $("#sel_product").val();
    $("#price").val(localStorage.getItem("prodPrice" + pid));
}