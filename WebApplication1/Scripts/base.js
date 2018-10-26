;
(function ($) {
    $.extend({
        //TEXT文本框搜索功能(全局对象,支持回调函数)
        "searchExt":
                function (_option) {//文本框对象，按钮对象
                    _option = $.extend({
                        textselector: "", //文本框选择器
                        btnselector: "", //按钮选择器
                        url: "#",
                        paramname: "id", //URL后参数名
                        ispost: false, //是否是POST回调函数，默认GET
                        callback: function (data) {
                            if (data.result) {
                                alert("操作成功")
                            } else {
                                alert(data.info)
                            }
                        }, //AJAX成功后回调函数
                        errorcallback: function (XMLHttpRequest, textStatus, errorThrown) {
                            alert("eror");
                        }, //AJAX失败后回调函数
                        isredirect: true//是否跳转页面 默认跳转，若需AJAX则设为FALSE
                    }, _option);
                    $(_option.textselector).blur(function () {
                        if ($.trim($(this).val()) == '')
                            $(this).val($(this).attr("title"));
                    }).focus(function () {
                        if ($.trim($(this).val()) == $(this).attr("title"))
                            $(this).val('');
                    });
                    $(_option.btnselector).click(function () {
                        var txt = $.trim($(_option.textselector).val());
                        if (txt == $(_option.textselector).attr("title") || txt == "") {
                            $(_option.textselector).focus();
                            return false;
                        }
                        if (!_option.isredirect) {
                            if (_option.ispost) {
                                var paraname = _option.paramname;
                                $.ajax({
                                    url: _option.url,
                                    data: {paraname: txt},
                                    dataType: "json",
                                    type: "post",
                                    success: _option.callback,
                                    error: _option.errorcallback
                                });
                            } else {
                                var paraname = _option.paramname;
                                $.ajax({
                                    url: _option.url,
                                    data: {paraname: txt},
                                    dataType: "json",
                                    type: "get",
                                    success: _option.callback,
                                    error: _option.errorcallback
                                });
                            }
                        } else {
                            window.location.href = _option.url + "?" + _option.paramname + "=" + txt;
                        }
                    });
                    $(_option.textselector).focus();
                    //处理回车搜索功能
                    $(_option.textselector).keyup(function (event) {
                        if (event.which == 13) {
                            $(_option.btnselector).click();
                        }
                    });
                },
        //图片4：3缩放处理
        "imageresizeExt":
                //图片4：3缩放处理
                        function resize_image(_option) {
                            _option = $.extend({
                                target: "", //图片选择器
                                max_width: 400, //最大宽度
                                max_heigth: 300//最大高度
                            }, _option);
                            var image = new Image();
                            image.src = $(_option.target).attr("src");
                            var image_width = image.width;
                            var image_height = image.height;
                            //当实际图片小于了指定的宽高就不做任何处理
                            if (image_width < _option.max_width && image_height < _option.max_height)
                                return false;
                            if (image_width > 0 && image_height > 0) {
                                //当图片高度宽度相等的时候 
                                if (image_width == image_height) {
                                    if (_option.max_width > image_width)
                                        return false;
                                    else
                                        $(_option.target).attr("width", _option.max_width);
                                }
                                //当图片宽度大于图片高度的时候
                                if (image_width > image_height) {
                                    var iwidth = parseInt((image_width * _option.max_height) / image_height);
                                    if (iwidth < _option.max_width)
                                        $(_option.target).attr("width", _option.max_width);
                                    else
                                        $(_option.target).attr("height", _option.max_height);
                                }
                                //当图片宽度小于于图片高度的时候
                                if (image_width < image_height) {
                                    var iheight = parseInt((image_height * _option.max_width) / image_width);
                                    if (iheight < _option.max_height)
                                        $(_option.target).attr("height", _option.max_height);
                                    else
                                        $(_option.target).attr("width", _option.max_width);
                                }
                            }
                            return false;
                        },
                //计算时间差值，返回天数 (日期参数格式为YY-MM-DD)
                "formatDateExt":
                        function (d) {
                            if (d == null || "")
                                return null;
                            var date = new Date(parseInt(d.replace("/Date(", "").replace(")/", ""), 10));
                            return date.format("yyyy-MM-dd hh:mm:ss");
                        },
                ////日期处理(算出两个时段的的差返回单位为天)
                "datadiffExt":
                        function (begin, end) {
                            var ipt1 = begin
                            var ipt2 = end;
                            var arr1 = ipt1.split("-");
                            var arr2 = ipt2.split("-");
                            var dt1 = new Date();
                            dt1.setFullYear(arr1[0]);
                            dt1.setMonth(arr1[1] - 1);
                            dt1.setDate(arr1[2]);
                            var dt2 = new Date();
                            dt2.setFullYear(arr2[0]);
                            dt2.setMonth(arr2[1] - 1);
                            dt2.setDate(arr2[2]);
                            var dif = dt2.getTime() - dt1.getTime();
                            var days = dif / (24 * 60 * 60 * 1000);
                            return days;
                        },
                "datediffExt1":
                        function (begin, end) {
                            var dif = end.getTime() - begin.getTime();
                            var days = dif / (24 * 60 * 60 * 1000);
                            return days;
                        },
                //获取URL中的参数以及其值并unescape
                "getUrlExt":
                        function (FieldName) {
                            if (location.href.indexOf("?") == -1 || location.href.indexOf(FieldName + "=") == -1) {
                                return "";
                            }
                            var QueryString = window.location.href.substring(window.location.href.indexOf("?") + 1);
                            var Parameters = QueryString.split("&");
                            var Position, ObjName, ObjValue;
                            for (var i = 0; i < Parameters.length; i++) {
                                Position = Parameters[i].indexOf("=");
                                if (Position == -1) {
                                    continue;
                                }
                                ObjName = Parameters[i].substring(0, Position);
                                ObjValue = Parameters[i].substring(Position + 1);
                                if (ObjName == FieldName) {
                                    return unescape(ObjValue.replace(/\+/g, " "));
                                }
                            }
                            return "";
                        },
                //延迟刷新当前页面(会按照指定的秒数，定时循环执行)
                "DelayReloadExt":
                        function (t) {
                            function Delay() {
                                t--;
                                if (t == 0) {
                                    window.location.reload();
                                } else {
                                    window.setTimeout(function () {
                                        Delay();
                                    }, 1000);
                                }
                            }
                            Delay();
                        },
                //格式化日期可返回星期数
                "dateTimeExt":
                        function (ID, Type) {
                            function Year_Month() {
                                var now = new Date();
                                var yy = now.getFullYear();
                                var mm = now.getMonth();
                                var mmm = new Array();
                                mmm[0] = "1";
                                mmm[1] = "2";
                                mmm[2] = "3";
                                mmm[3] = "4";
                                mmm[4] = "5";
                                mmm[5] = "6";
                                mmm[6] = "7";
                                mmm[7] = "8";
                                mmm[8] = "9";
                                mmm[9] = "10";
                                mmm[10] = "11";
                                mmm[11] = "12";
                                mm = mmm[mm];
                                return (mm);
                            }
                            function thisYear() {
                                var now = new Date();
                                var yy = now.getFullYear();
                                return (yy);
                            }
                            function Date_of_Today() {
                                var now = new Date();
                                return (now.getDate());
                            }
                            function Date_of_Week() {
                                var now = new Date();
                                var week = now.getDay();
                                var week_day
                                if (week == 1) {
                                    week_day = "星期一"
                                }
                                ;
                                if (week == 2) {
                                    week_day = "星期二"
                                }
                                ;
                                if (week == 3) {
                                    week_day = "星期三"
                                }
                                ;
                                if (week == 4) {
                                    week_day = "星期四"
                                }
                                ;
                                if (week == 5) {
                                    week_day = "星期五"
                                }
                                ;
                                if (week == 6) {
                                    week_day = "星期六"
                                }
                                ;
                                if (week == 0) {
                                    week_day = "星期日"
                                }
                                ;
                                return (week_day);
                            }
                            function CurentTime() {
                                var now = new Date();
                                var hh = now.getHours();
                                var mm = now.getMinutes();
                                var ss = now.getTime() % 60000;
                                ss = (ss - (ss % 1000)) / 1000;
                                var clock = hh + ':';
                                if (mm < 10)
                                    clock += '0';
                                clock += mm + ':';
                                if (ss < 10)
                                    clock += '0';
                                clock += ss;
                                return (clock);
                            }
                            if (Type == 1) {
                                document.getElementById(ID).innerHTML = thisYear() + "年" + Year_Month() + "月" + Date_of_Today() + "日 " + Date_of_Week();
                            } else if (Type == 2) {
                                document.getElementById(ID).innerHTML = thisYear() + "年" + Year_Month() + "月" + Date_of_Today() + "日 " + Date_of_Week() + CurentTime();
                                setInterval('comm.GetDate(\'' + ID + '\',' + Type + ')', 1000);
                            }
                        },
                //保存扩展
                saveExt: function (_option) {
                    var option = $.extend(true, {url: undefined, data: null, callback: function () { }, onBefor: function () {
                            return true;
                        }}, _option);
                    if (option.onBefor()) {
                        if (option.url == undefined) {
                            top.$.messager.alert("系统提示", "不明确请求地址！", "info");
                            return false;
                        }
                        $.post(option.url, option.data, function (data) {
                            if (data.result) {
                                top.$.messager.alert("系统提示", data.info == "" || null ? "已成功处理您的请求。" : data.info, "info");
                                option.callback(data);
                            } else {
                                top.$.messager.alert("系统提示", data.info == "" || null ? "操作失败，对此抱歉！" : data.info, "error");
                            }
                        });
                    }
                    return false;
                },
                //保存扩展2
                savecustomExt: function (_option) {
                    var option = $.extend(
                            true,
                            {
                                url: undefined,
                                data: null,
                                callback: function () { },
                                onBefor: function () {
                                    return true;
                                },
                                type: 'post',
                                dataType: 'json',
                                success: function (data) {
                                    if (data) {
                                        if (data.result) {
                                            top.$.messager.alert("系统提示", data.info == "" || null ? "已成功处理您的请求。" : data.info, "info");
                                            option.callback(data);
                                        } else {
                                            top.$.messager.alert("系统提示", data.info == "" || null ? "操作失败，对此抱歉！" : data.info, "error");
                                        }
                                    } else {
                                        top.$.messager.alert("系统提示", data.info == "" || null ? "操作失败，对此抱歉！" : data.info, "error");
                                    }
                                }
                            },
                            _option);
                    if (option.url == undefined) {
                        top.$.messager.alert("系统提示", "不明确请求地址！", "info");
                        return false;
                    } else {
                        $.ajax(option);
                        return true;
                    }
                },
                PostExt: function (option) {
                    $.post(option.url, option.param, function (data) {
                        option.callback(data);
                    });
                },
                //dialog扩展，，默认提交FORM的ACTION，自动序列化表单值
                dialogExt: function (_option) {
                    var win = $("<div/>");
                    _option = $.extend({
                        isClose: false,
                        callback: function () {
                            if (_option.isClose) {
                                win.dialog("close");
                                $(win).remove();
                            }
                            if (_option.onBack)
                                _option.onBack();
                        }
                    }, _option);
                    var option = $.extend({
                        title: '标题',
                        width: 400,
                        height: 300,
                        closed: false,
                        cache: false,
                        maximizable: true,
                        collapsible: true,
                        resizable: true,
                        href: '',
                        modal: true,
                        onLoad: function () { },
                        onClose: function () {
                            $(win).remove();
                        },
                        buttons: [{
                                text: "保存", iconCls: "icon-save", handler: function () {
                                    if (win.form("validate")) {
                                        var saveurl = '';
                                        if (_option.saveurl) {
                                            saveurl = _option.saveurl;
                                        } else {
                                            saveurl = win.find("form").attr("action");
                                        }
                                        $.saveExt($.extend({
                                            url: saveurl,
                                            data: win.find("form input,textarea,select").serializeArray(),
                                            callback: _option.callback
                                        }, _option));
                                    }
                                }
                            }, {
                                text: "关闭", iconCls: "icon-cancel",
                                handler: function () {
                                    win.dialog("close");
                                    $(win).remove();
                                }
                            }]
                    }, _option);
                    win.dialog(option);
                },
                ///下载扩展(传值到指定连接，请求下载)
                downloadExt: function (url, params) {
                    try {
                        $('body').append("<iframe id='iframeDow' name='iframeDow' style='display:none'></iframe>");
                        var form = $("<form>");
                        form.attr('style', 'display:none');
                        form.attr("target", "iframeDow");
                        form.attr("method", "post");
                        form.attr("id", "iframefrom");
                        form.attr('action', url);
                        for (var key in params) {
                            if (typeof (params[key]) == "object") {
                                $.each(params[key], function (i, item) {
                                    var input = $("<input>");
                                    input.attr("name", key + "[" + i + "]");
                                    input.attr("value", item);
                                    form.append(input);
                                });
                            } else {
                                var input = $("<input>");
                                input.attr("name", key);
                                input.attr("value", params[key]);
                                form.append(input);
                            }
                        }
                        $("body").append(form);
                        form.submit();
                        $("#iframefrom").remove();
                        $("#iframeDow").remove();
                    } catch (e) {
                    }
                    return false;
                },
                //JSON扩展
                toJSONExt: function (object) {
                    var type = typeof object;
                    if ('object' == type) {
                        if (Array == object.constructor)
                            type = 'array';
                        else if (RegExp == object.constructor)
                            type = 'regexp';
                        else
                            type = 'object';
                    }
                    switch (type) {
                        case 'undefined':
                        case 'unknown':
                            return;
                        case 'function':
                        case 'boolean':
                        case 'regexp':
                            return object.toString();
                        case 'number':
                            return isFinite(object) ? object.toString() : 'null';
                        case 'string':
                            return '"' + object.replace(/(|")/g, "$1").replace(/n|r|t/g, function () {
                                var a = arguments[0];
                                return (a == 'n') ? 'n' : (a == 'r') ? 'r' : (a == 't') ? 't' : ""
                            }) + '"';
                        case 'object':
                            if (object === null)
                                return 'null';
                            var results = [];
                            for (var property in object) {
                                var value = jQuery.toJSON(object[property]);
                                if (value !== undefined)
                                    results.push(jQuery.toJSON(property) + ':' + value);
                            }
                            return '{' + results.join(',') + '}';
                        case 'array':
                            var results = [];
                            for (var i = 0; i < object.length; i++) {
                                var value = jQuery.toJSON(object[i]);
                                if (value !== undefined)
                                    results.push(value);
                            }
                            return '[' + results.join(',') + ']';
                    }
                },
                //数据加载提示框
                loadingExt: function (_option) {
                    var temp = $("<div/>");
                    var msg = $("<div/>");
                    _option = $.extend({
                        appendObj: "body", //追加的对象
                        msgText: "数据加载中,请稍后....", //消息中提示文字
                        isFullScreen: false//是否全屏默认不全屏
                    }, _option);
                    temp.attr("id", "WindowLoading").addClass("window-mask");
                    temp.css({width: $(_option.appendObj).width() + 400, height: $(_option.appendObj).height() + 400});
                    msg.attr("id", "WindowLodingMsg").html(_option.msgText).addClass("loading").css({top: ($(_option.appendObj).height() - msg.height()) / 2, left: ($(_option.appendObj).width() - msg.width()) / 2});
                    if (_option.isFullScreen) {
                        temp.css("z-index", "9000")
                    }
                    msg.css("z-index", "90001")
                    $(_option.appendObj).prepend(msg).prepend(temp);
                },
                loadedExt: function () {
                    if ($("#WindowLoading").length > 0) {
                        $("#WindowLoading").remove();
                    }
                    if ($("#WindowLodingMsg").length > 0) {
                        $("#WindowLodingMsg").remove();
                    }
                }
            });
    ///对象扩展 
    $.fn.extend({
        ///格式化日期(YY-MM-DD)
        "formatDateExt":
                function (d) {
                    if (d == null || "")
                        return null;
                    var date = new Date(parseInt(d.replace("/Date(", "").replace(")/", ""), 10));
                    return date.format("yyyy-MM-dd hh:mm:ss");
                },
        //追加扩展,可以设置一个新对象的ATTR以及注册这个对象的CLICK事件,最后追加到对象后面
        //params:对象数组，包含其text,html,handler，其他属性默认遍历添加
        //obj:要追加的新对象
        "AppendExt":
                function (_options) {
                    _options = $.extend({
                        obj: "div",
                        attrparams: {"id": "3"}, //属性对象
                        html: "", //对象的HTML
                        func: {"click": function () { }}, //事件对象 
                        trihandler: {"val": null}//需要执行的事件对象
                    }, _options);
                    var d = $("<" + _options.obj + ">");
                    //绑定属性
                    for (var key in _options.attrparams) {
                        d.attr(key, _options.attrparams[key]);
                    }
                    //绑定事件
                    for (var key1 in _options.func) {
                        d.bind(key1, _options.func[key1]);
                    }
                    //执行事件,
                    for (var key2 in _options.trihandler) {
                        if (_options.trihandler[key2] != null) {
                            d.triggerHandler(key2, _options.trihandler[key2]);
                        }
                    }
                    d.html(_options.html);
                    $(this).append(d);
                },
        //文本框提示扩展，带CSS样式，无参数 
        "toolTipExt":
                function () {
                    var _this = this;
                    this.focus(function () {
                        $(this).css("color", "#999");
                        if ($(this).val() == this.title) {
                            $(this).val("");
                            $(this).css("color", "#000");
                        }
                    });
                    this.blur(function () {
                        $(this).css("color", "#000");
                        if ($(this).val() == "") {
                            $(this).css("color", "#999");
                            $(this).val(this.title);
                        }
                    });
                    this.blur();
                },
        ///JQUER表单序列化扩展，去掉文本框含有默认值的情况，
        "formSerializeAllExt":
                function () {
                    var endarray = [];
                    var a = $(this).serializeArray();
                    $.each(a, function (i) {
                        var o = {name: '', value: ''};
                        if ($("input[name=" + a[i].name + "]").val() == $("input[name=" + a[i].name + "]").attr("title"))
                        {

                        } else
                        {
                            o.name = a[i].name;
                            o.value = a[i].value || "";
                            endarray.push(o);
                        }
                    });
                    var array = $(this);
                    $.each(array, function (index, item) {
                        if (item.disabled)
                        {
                            if (item.name.length > 0)
                            {
                                var o = {name: '', value: ''};
                                o.name = item.name;
                                o.value = item.value || "";
                                endarray.push(o);
                            }
                        }
                    })
                    return  endarray;
                },
        "formSerializeescapeAllExt":
                function () {

                    var endarray = [];
                    var a = $(this).serializeArray();
                    $.each(a, function (i) {
                        var o = {name: '', value: ''};
                        if ($("input[name=" + a[i].name + "]").val() == $("input[name=" + a[i].name + "]").attr("title"))
                        {

                        } else
                        {
                            o.name = a[i].name;
                            o.value = escape(a[i].value) || "";
                            endarray.push(o);
                        }
                    });
                    var array = $(this);
                    $.each(array, function (index, item) {
                        if (item.disabled)
                        {
                            if (item.name.length > 0)
                            {
                                var o = {name: '', value: ''};
                                o.name = item.name;
                                o.value = escape(item.value) || "";
                                endarray.push(o);
                            }
                        }
                    })
                    return  endarray;
                },
        ///JQUER表单序列化扩展，去掉文本框含有默认值的情况，
        "formSerializeExt":
                function () {
                    var o = {};
                    var a = $(this).serializeArray();
                    $.each(a, function (i) {
                        if ($("input[name=" + a[i].name + "]").val() == $("input[name=" + a[i].name + "]").attr("title"))
                            ;
                        else
                            o[a[i].name] = a[i].value || "";
                    });
                    return o;
                },
        ////薛丽华文本 
        "formSerializeEscapeExt":
                function () {
                    var o = {};
                    var a = $(this).serializeArray();
                    $.each(a, function (i) {
                        if ($("input[name=" + a[i].name + "]").val() == $("input[name=" + a[i].name + "]").attr("title"))
                            ;
                        else
                            o[a[i].name] = escape(a[i].value) || '';
                    });
                    return o;
                },
        //获取文本框的值，去掉空格，并escape
        "getValExt":
                function () {
                    return escape($.trim($(this).val()));
                },
        //获取复选框，单选框的值，去空格并编码
        "getCheckedValExt":
                function (name) {
                    return escape($.trim($("input:[name='" + name + "']:checked").val()));
                },
        ///EASYUI 扩展
        ///DATAGRID扩展
        extGrid: function (option) {
            var _this = $(this);
            var tool = null;
            //判断是否有TOOL，默认为NULL 
            if (option.hastool) {
                if (option.toolbar) {
                    tool = option.toolbar;
                } else {
                    var tool1 = {};
                    var tooldiv = $("<div/>");
                    tooldiv.attr('id', "tool_div");
                    var toolform = $("<form/>")
                    toolform.attr("id", "search_form");
                    var outdiv = $("<div/>");
                    outdiv.attr("id", "out_div");
                    var removebtn = {
                        obj: 'a',
                        html: '删除',
                        attrparams: {"id": "remove_btn", "href": "#", "class": "easyui-linkbutton", "data-options": "iconCls: 'icon-remove',plain: true"},
                        func: {
                            click: function () {
                                var option1 = new Object();
                                option1.idField = option.idField;
                                if (option.removeurl) {
                                    option1.removeurl = option.removeurl;
                                } else {
                                    option1.removeurl = _this.attr("removeurl");
                                }
                                
                                if (option1.removeurl != undefined) {
                                    _this.gridRemove(option1);
                                }
                            }
                        }
                    };
                    var addbtn = {
                        obj: 'a',
                        html: '新增',
                        attrparams: {"id": "add_btn", "href": "#", "class": "easyui-linkbutton", "data-options": "iconCls: 'icon-add',plain: true"},
                        func: {
                            click: function () {
                                var options = {isadd: true, idField: option.idField, title: "新增", isClose: true};
                                if (option.editurl) {
                                    options.editurl = option.editurl;
                                } else {
                                    options.editurl = _this.attr("editurl");
                                }
                                if (option.saveurl) {
                                    options.saveurl = option.saveurl;
                                }
                                if (option.onBefor) {
                                    options.onBefor = option.onBefor;
                                }
                                if (option.onBack) {
                                    options.onBack = option.onBack
                                }
                                if (option.dwidth) {
                                    options.width = option.dwidth;
                                }
                                if (option.dheight) {
                                    options.height = option.dheight;
                                }
                                _this.datagrid('unselectAll');
                                _this.gridEdit(options);
                            }
                        }
                    };
                    var editbtn = {
                        obj: 'a',
                        html: '编辑',
                        attrparams: {"id": "edit_btn", "href": "#", "class": "easyui-linkbutton", "data-options": "iconCls: 'icon-edit',plain: true"},
                        func: {
                            click: function () {
                                var options = {isadd: false, idField: option.idField, title: "编辑", isClose: true};
                                if (option.editurl) {
                                    options.editurl = option.editurl;
                                } else {
                                    options.editurl = _this.attr("editurl");
                                }
                                if (option.saveurl) {
                                    options.saveurl = option.saveurl;
                                }
                                if (option.onBack) {
                                    options.onBack = option.onBack
                                }
                                if (option.onBefor) {
                                    options.onBefor = option.onBefor;
                                }
                                _this.gridEdit(options);
                            }
                        }
                    };
                    var refrshbtn = {
                        obj: 'a',
                        html: '刷新',
                        attrparams: {"id": "refrsh_btn", "href": "#", "class": "easyui-linkbutton", "data-options": "iconCls: 'icon-reload',plain: true"},
                        func: {
                            click: function () {
                                _this.datagrid('reload');
                            }
                        }
                    };
                    var detailsbtn = {
                        obj: 'a',
                        html: '查看详细',
                        attrparams: {"id": "details_btn", "href": "#", "class": "easyui-linkbutton", "data-options": "iconCls: 'icon-help',plain: true"},
                        func: {
                            click: function () {
                                _this.datagrid('reload');
                            }
                        }
                    };
                    var searc6hbtn = {
                        obj: 'a',
                        html: '搜索',
                        attrparams: {"id": "search_btn", "href": "#", "class": "easyui-linkbutton", "data-options": "iconCls: 'icon-search',plain: true"},
                        func: {
                            click: function () {
                                _this.onSreach("#search_form");
                            }
                        }
                    };
                    var searchtext = {
                        obj: 'input',
                        attrparams: {"id": "search_text", "name": "search_text", "style": "width:100px;padding-right:20px;margin-right:20px", "title": "请输入", "type": "text"}
                    };
                    if (option.selectitem) {
                        var splitarray = option.selectitem.split(',');
                        $.each(splitarray, function (index, item) {
                            if (item == 'add') {
                                toolform.AppendExt(addbtn);
                            }
                            if (item == 'edit') {
                                toolform.AppendExt(editbtn);
                            }
                            if (item == 'del') {
                                toolform.AppendExt(removebtn);
                            }
                            if (item == 'ref') {
                                toolform.AppendExt(refrshbtn);
                            }
                            if (item == 'detail') {
                                toolform.AppendExt(detailsbtn);
                            }
                            if (item == 'sea') {
                                var otherdiv = $("<div/>");
                                otherdiv.AppendExt(searchtext);
                                otherdiv.AppendExt(searc6hbtn);
                                toolform.append(otherdiv);
                            }
                            if (item == 'none') {

                            }
                        });
                    } else {
                        toolform.AppendExt(addbtn);
                        toolform.AppendExt(editbtn);
                        toolform.AppendExt(removebtn);
                        toolform.AppendExt(refrshbtn);
                        toolform.AppendExt(detailsbtn);
                        var otherdiv = $("<div/>");
                        otherdiv.AppendExt(searchtext);
                        otherdiv.AppendExt(searc6hbtn);
                        toolform.append(otherdiv);
                    }
                    //额外工具
                    if (option.othertool) {
                        var otherdiv = $("<div/>");
                        otherdiv.append(option.othertool);
                        toolform.append(otherdiv);
                    }
                    _this.append(outdiv.append(tooldiv.append(toolform)));
                    $.parser.parse('#out_div');
                    tool = $("#tool_div");
                }
            }
            ;
            var _option = $.extend({
                toolbar: tool, fit: true, url: $(this).attr("url"), sortName: "RM",
                sortOrder: "ASC", rownumbers: true, striped: true,
                singleSelect: false, pagination: true, loadMsg: "数据加载中……", pageNumber: 1,
                pageSize: 20, pageList: [20, 40, 60, 80, 100],
                frozenColumns: [option.singleSelect ? [] : [{field: "ck", title: "序号", checkbox: true}]],
                columns: [],
                onLoadError: function () {
                    alert("加载数据出错……");
                }
            }, option);
            $(this).datagrid(_option);
            $("#search_text").toolTipExt();
            //移除空DIV
            $("#out_div").remove();
        },
        //搜索扩展，obj为搜索框的表单,直接序列化
        onSreach: function (obj) {
            $(this).datagrid("clearSelections");
            $(this).datagrid("options").pageNumber = 1;
            $(this).datagrid("getPager").pagination({pageNumber: 1});
            $(this).datagrid("reload", $(obj).find("input,select").formSerializeEscapeExt());
        },
        //搜索扩展，obj为搜索框的表单,回传JSON字符串
        onSreach2: function (obj) {
            $(this).datagrid("clearSelections");
            $(this).datagrid("options").pageNumber = 1;
            $(this).datagrid("getPager").pagination({pageNumber: 1});
            var fromdata = $(obj).find("input,select").formSerializeEscapeExt();
            var json = JSON.stringify(fromdata);
            $(this).datagrid("reload", {jsonString: json});
        },
        //搜索扩展，obj为搜索框的表单,回传字符串集合
        onSreach3: function (obj) {
            $(this).datagrid("clearSelections");
            $(this).datagrid("options").pageNumber = 1;
            $(this).datagrid("getPager").pagination({pageNumber: 1});
            var fromdata = $(obj).find("input,select").serializeArray();
            var whereString = {};
            $.each(fromdata, function (index, item) {
                whereString["whereString[" + index + "]"] = item.value;
            });
            $(this).datagrid("reload", whereString);
        },
        //对话框扩展，参数为对象
        gridEdit: function (_option) {
            debugger;
            var _this = this;
            var linkSign = "?";
            if (_option.param) {
                _option.href = _option.href + linkSign + $.param(_option.param);
            }
            if (_option.idField) {
                if (_option.href) {
                    linkSign = _option.href.indexOf("?") == -1 ? "?" : "&";
                }
                var rows = _this.datagrid("getSelections");
                if (rows.length == 0 && !_option.isadd) {
                    top.$.messager.alert("系统提示", "请选择一条记录进行操作!", "warning");
                    return;
                }
                if (rows.length <= 1) {
                    if (rows.length == 1) {
                        if (typeof (_option.idField) == "string") {
                            var val = rows[0][_option.idField];
                            if (_option.href == undefined)
                                _option.href = $(_this).attr("editurl");
                            if (linkSign == "&")
                                _option.href = _option.href + linkSign + _option.idField + "=" + rows[0][_option.idField];
                            else
                                _option.href += "?id=" + val;
                        } else {
                            var param = {};
                            $.each(_option.idField, function (i, item) {
                                param[item] = rows[item];
                            });
                            if (_option.href)
                                _option.href += linkSign + $.param(param);
                            else
                                _option.href = $(_this).attr("editurl") + linkSign + $.param(param);
                        }
                    } else {
                        _option.href = $(_this).attr("editurl");
                    }
                } else {
                    {
                        top.$.messager.alert("系统提示", "一次只能编辑一条记录!", "warning");
                        return;
                    }
                }
            }
            _option = $.extend({
                isClose: false,
                callback: function () {
                    _this.datagrid("clearSelections");
                    _this.datagrid("reload");
                    if (_option.isClose) {
                        win.dialog("close");
                        $(win).remove();
                    }
                    if (_option.onBack)
                        _option.onBack();
                }
            }, _option);
            var win = $("<div/>");
            var option = $.extend({
                href: $(_this).attr("editurl"),
                title: "系统提示",
                width: 800,
                height: 600,
                minimizable: false,
                maximizable: true,
                collapsible: true,
                resizable: true,
                modal: true,
                iconCls: "icon-add",
                onClose: function () {
                    $(win).remove();
                },
                buttons: [{
                        text: "保存", iconCls: "icon-save", handler: function () {
                            if (win.form("validate")) {
                                var saveurl = '';
                                if (_option.saveurl) {
                                    saveurl = _option.saveurl;
                                } else {
                                    saveurl = win.find("form").attr("action");
                                }
                                $.saveExt($.extend({
                                    url: saveurl,
                                    data: win.find("form input,textarea,select").serializeArray(),
                                    callback: _option.callback
                                }, _option));
                            }
                        }
                    }, {
                        text: "关闭", iconCls: "icon-cancel",
                        handler: function () {
                            win.dialog("close");
                            $(win).remove();
                        }
                    }]
            }, _option);
            win.dialog(option);
        },
        //对话框扩展,针对TREEGRID，参数为对象
        gridTreeEdit: function (_option) {
            var _this = this;
            var linkSign = "?";
            if (_option.param) {
                _option.href = _option.href + linkSign + $.param(_option.param);
            }
            if (_option.idField) {
                if (_option.href) {
                    linkSign = _option.href.indexOf("?") == -1 ? "?" : "&";
                }
                var rows = _this.treegrid("getSelections");
                if (rows.length == 0 && !_option.isadd) {
                    top.$.messager.alert("系统提示", "请选择一条记录进行操作!", "warning");
                    return;
                }
                if (rows.length <= 1) {
                    if (rows.length == 1 && !_option.isadd) {
                        if (typeof (_option.idField) == "string") {
                            var val = rows[0][_option.idField];
                            if (_option.href == undefined)
                                _option.href = $(_this).attr("editurl");
                            if (linkSign == "&")
                                _option.href = _option.href + linkSign + _option.idField + "=" + rows[0][_option.idField];
                            else
                                _option.href += "?id=" + val;
                        } else {
                            var param = {};
                            $.each(_option.idField, function (i, item) {
                                param[item] = rows[item];
                            });
                            if (_option.href)
                                _option.href += linkSign + $.param(param);
                            else
                                _option.href = $(_this).attr("editurl") + linkSign + $.param(param);
                        }
                    } else {
                        _option.href = $(_this).attr("editurl");
                    }
                } else {
                    {
                        top.$.messager.alert("系统提示", "一次只能编辑一条记录!", "warning");
                        return;
                    }
                }
            }
            _option = $.extend({
                isClose: false,
                callback: function () {
                    _this.treegrid("clearSelections");
                    _this.treegrid("reload");
                    if (option.isClose) {
                        win.dialog("close");
                        $(win).remove();
                    }
                    if (option.onBack)
                        option.onBack();
                }
            }, _option);
            var win = $("<div/>");
            var option = $.extend({
                href: $(_this).attr("editurl"),
                title: "系统提示",
                width: 400,
                height: 300,
                minimizable: false,
                maximizable: true,
                collapsible: true,
                resizable: true,
                modal: true,
                iconCls: "icon-add",
                onClose: function () {
                    $(win).remove();
                },
                buttons: [{
                        text: "保存", iconCls: "icon-save", handler: function () {
                            if (win.form("validate")) {
                                var saveurl = '';
                                if (_option.saveurl) {
                                    saveurl = _option.saveurl;
                                } else {
                                    saveurl = win.find("form").attr("action");
                                }
                                $.saveExt($.extend({
                                    url: saveurl,
                                    data: win.find("form input,textarea,select").serializeArray(),
                                    callback: _option.callback
                                }, _option));
                            }
                        }
                    }, {
                        text: "关闭", iconCls: "icon-cancel",
                        handler: function () {
                            win.dialog("close");
                            $(win).remove();
                        }
                    }]
            }, _option);
            win.dialog(option);
        },
        ///删除扩展扩展
        gridRemove: function (_option) {
            var param = {};
            var _this = this;
            var sltRow;
            if (_option.idField) {
                if (typeof (_option.idField) == "string") {
                    sltRow = _this.getSelected(_option.idField);
                    if (sltRow == null) {
                        top.$.messager.alert("系统提示", "请选择一条记录进行操作!", "warning");
                        return;
                    }
                    $.each(sltRow, function (i, value) {
                        param["param[" + i + "]"] = '\'' + value + '\'';
                    });
                } else {
                    sltRow = $(_this).datagrid("getSelections");
                    if (sltRow == null) {
                        top.$.messager.alert("系统提示", "请选择一条记录进行操作!", "warning");
                        return;
                    }
                    $.each(sltRow, function (i, item) {
                        var arr = {};
                        $.each(_option.idField, function (index, value) {
                            param["param[" + i + "]." + value] = '\'' + item[value] + '\'';
                        });
                    });
                }
            }
            var option = $.extend({
                url: _option.removeurl,
                data: param, msg: "",
                callback: function (data) {
                    $(_this).datagrid("clearSelections");
                    $(_this).datagrid("reload");
                }
            }, _option);
            if (sltRow.length > 0) {
                $.messager.confirm("系统提示", option.msg == "" ? "确认要执行 " + sltRow.length + " 条记录删除操作吗？" : option.msg,
                        function (r) {
                            if (!r)
                                return;
                            $.saveExt(option);
                        });
            } else {
                top.$.messager.alert("系统提示", "请您选择要删除的数据！", "warning");
            }
        },
        ///删除扩展扩展,针对TREEGRID
        gridTreeRemove: function (_option) {
            var param = {};
            var _this = this;
            var sltRow;
            if (_option.idField) {
                if (typeof (_option.idField) == "string") {
                    sltRow = _this.getSelected(_option.idField);
                    if (sltRow == null) {
                        top.$.messager.alert("系统提示", "请选择一条记录进行操作!", "warning");
                        return;
                    }
                    $.each(sltRow, function (i, value) {
                        param["param[" + i + "]"] = '\'' + value + '\'';
                    });
                } else {
                    sltRow = $(_this).datagrid("getSelections");
                    ;
                    if (sltRow == null) {
                        top.$.messager.alert("系统提示", "请选择一条记录进行操作!", "warning");
                        return;
                    }
                    $.each(sltRow, function (i, item) {
                        var arr = {};
                        $.each(_option.idField, function (index, value) {
                            param["param[" + i + "]." + value] = '\'' + item[value] + '\'';
                        });
                    });
                }
            }
            var option = $.extend({
                url: _option.removeurl,
                data: param, msg: "",
                callback: function (data) {
                    $(_this).treegrid("clearSelections");
                    $(_this).treegrid("reload");
                }
            }, _option);
            if (sltRow.length > 0) {
                $.messager.confirm("系统提示", option.msg == "" ? "确认要执行 " + sltRow.length + " 条记录删除操作吗？" : option.msg,
                        function (r) {
                            if (!r)
                                return;
                            $.saveExt(option);
                        });
            } else {
                top.$.messager.alert("系统提示", "请您选择要删除的数据！", "warning");
            }
        },
        //获取指定字段的数组
        getSelected: function (idField) {
            var ids = [];
            var rows = $(this).datagrid("getSelections");
            for (var i = 0; i < rows.length; i++) {
                ids.push(rows[i][idField]);
            }
            return ids;
        },
        //
        extTreegrid: function (option) {
            var _this = $(this);
            var tool = null;
            //判断是否有TOOL，默认为NULL 
            if (option.hastool) {
                if (option.toolbar) {
                    tool = option.toolbar;
                } else {
                    var tool1 = {};
                    var tooldiv = $("<div/>");
                    tooldiv.attr('id', "tree_tool_div");
                    var toolform = $("<form/>")
                    toolform.attr("id", "tree_search_form");
                    var outdiv = $("<div/>");
                    outdiv.attr("id", "tree_out_div");
                    var removebtn = {
                        obj: 'a',
                        html: '删除',
                        attrparams: {"id": "tree_remove_btn", "href": "#", "class": "easyui-linkbutton", "data-options": "iconCls: 'icon-remove',plain: true"},
                        func: {
                            click: function () {
                                var option1 = new Object();
                                option1.idField = option.idField;
                                if (option.removeurl) {
                                    option1.removeurl = option.removeurl;
                                } else {
                                    option1.removeurl = _this.attr("removeurl");
                                }
                                if (option1.removeurl != undefined) {
                                    _this.gridTreeRemove(option1);
                                }
                            }
                        }
                    };
                    var addbtn = {
                        obj: 'a',
                        html: '新增',
                        attrparams: {"id": "tree_add_btn", "href": "#", "class": "easyui-linkbutton", "data-options": "iconCls: 'icon-add',plain: true"},
                        func: {
                            click: function () {
                                var options = {isadd: true, idField: option.idField, title: "新增", isClose: true};
                                if (option.editurl) {
                                    options.editurl = option.editurl;
                                } else {
                                    options.editurl = _this.attr("editurl");
                                }
                                if (option.saveurl) {
                                    options.saveurl = option.saveurl;
                                }
                                _this.gridTreeEdit(options);
                            }
                        }
                    };
                    var editbtn = {
                        obj: 'a',
                        html: '编辑',
                        attrparams: {"id": "tree_edit_btn", "href": "#", "class": "easyui-linkbutton", "data-options": "iconCls: 'icon-edit',plain: true"},
                        func: {
                            click: function () {
                                var options = {isadd: false, idField: option.idField, title: "编辑", isClose: true};
                                if (option.editurl) {
                                    options.editurl = option.editurl;
                                } else {
                                    options.editurl = _this.attr("editurl");
                                }
                                if (option.saveurl) {
                                    options.saveurl = option.saveurl;
                                }
                                _this.gridTreeEdit(options);
                            }
                        }
                    };
                    var refrshbtn = {
                        obj: 'a',
                        html: '刷新',
                        attrparams: {"id": "tree_refrsh_btn", "href": "#", "class": "easyui-linkbutton", "data-options": "iconCls: 'icon-reload',plain: true"},
                        func: {
                            click: function () {
                                _this.treegrid('reload');
                            }
                        }
                    };
                    var detailsbtn = {
                        obj: 'a',
                        html: '查看详细',
                        attrparams: {"id": "tree_details_btn", "href": "#", "class": "easyui-linkbutton", "data-options": "iconCls: 'icon-help',plain: true"},
                        func: {
                            click: function () {
                                _this.treegrid('reload');
                            }
                        }
                    };
                    var searc6hbtn = {
                        obj: 'a',
                        html: '搜索',
                        attrparams: {"id": "tree_search_btn", "href": "#", "class": "easyui-linkbutton", "data-options": "iconCls: 'icon-search',plain: true"},
                        func: {
                            click: function () {
                                _this.onSreach("#tree_search_form");
                            }
                        }
                    };
                    var searchtext = {
                        obj: 'input',
                        attrparams: {"id": "tree_search_text", "name": "search_text", "style": "width:100px;padding-right:20px;margin-right:20px", "title": "请输入", "type": "text"}
                    };
                    if (option.selectitem) {
                        var splitarray = option.selectitem.split(',');
                        $.each(splitarray, function (index, item) {
                            if (item == '1') {
                                toolform.AppendExt(addbtn);
                            }
                            if (item == '2') {
                                toolform.AppendExt(editbtn);
                            }
                            if (item == '3') {
                                toolform.AppendExt(removebtn);
                            }
                            if (item == '4') {
                                toolform.AppendExt(refrshbtn);
                            }
                            if (item == '5') {
                                toolform.AppendExt(detailsbtn);
                            }
                            if (item == '6') {
                                var otherdiv = $("<div/>");
                                otherdiv.AppendExt(searchtext);
                                otherdiv.AppendExt(searc6hbtn);
                                toolform.append(otherdiv);
                            }
                        });
                    } else {
                        toolform.AppendExt(addbtn);
                        toolform.AppendExt(editbtn);
                        toolform.AppendExt(removebtn);
                        toolform.AppendExt(refrshbtn);
                        toolform.AppendExt(detailsbtn);
                        var otherdiv = $("<div/>");
                        otherdiv.AppendExt(searchtext);
                        otherdiv.AppendExt(searc6hbtn);
                        toolform.append(otherdiv);
                    }
                    //额外工具
                    if (option.othertool) {
                        var otherdiv = $("<div/>");
                        otherdiv.AppendExt(option.othertool);
                        toolform.append(otherdiv);
                    }
                    //是否启用右键菜单
                    if (option.hasrightbtn) {
                        var menudiv = $("<div/>");
                        menudiv.attr("id", "tree_menu_div").addClass("easyui-menu").attr("style", "width:120px;");
                        var addDiv = {
                            obj: 'div',
                            attrparams: {"data-options": "iconCls:'icon-add'"},
                            html: '新增',
                            func: {
                                click: function () {
                                    var node = _this.treegrid('getSelected');
                                    if (node) {
                                        var options = {};
                                        options = {isadd: true, title: "新增"}
                                        if (option.editurl) {
                                            options.editurl = option.editurl;
                                        } else {
                                            options.editurl = _this.attr("editurl");
                                        }
                                        if (option.saveurl) {
                                            options.saveurl = option.saveurl;
                                        }
                                        _this.gridTreeEdit(options);
                                    }
                                }
                            }
                        };
                        var editDiv = {
                            obj: 'div',
                            html: '编辑',
                            attrparams: {"data-options": "iconCls:'icon-edit'"},
                            func: {
                                click: function () {
                                    var node = _this.treegrid('getSelected');
                                    if (node) {
                                        var options = {};
                                        options = {isadd: false, title: "新增", idField: option.idField};
                                        if (option.editurl) {
                                            options.editurl = option.editurl;
                                        } else {
                                            options.editurl = _this.attr("editurl");
                                        }
                                        if (option.saveurl) {
                                            options.saveurl = option.saveurl;
                                        }
                                        _this.gridTreeEdit(options);
                                    }
                                }
                            }

                        };
                        var removeDiv = {
                            obj: 'div',
                            html: '删除',
                            attrparams: {"data-options": "iconCls:'icon-remove'"},
                            func: {
                                click: function () {
                                    var option1 = new Object();
                                    option1.idField = option.idField;
                                    if (option.removeurl) {
                                        option1.removeurl = option.removeurl;
                                    } else {
                                        option1.removeurl = _this.attr("removeurl");
                                    }
                                    if (option1.removeurl != undefined) {
                                        _this.gridTreeRemove(option1);
                                    }
                                }
                            }
                        };
                        var expendDiv = {
                            obj: 'div',
                            html: '展开所有',
                            func: {
                                click: function () {
                                    _this.treegrid('collapseAll');
                                }
                            }
                        };
                        var collapseDiv = {
                            obj: 'div',
                            html: '展开所有',
                            func: {
                                click: function () {
                                    _this.treegrid('expandAll');
                                }
                            }
                        };
                        menudiv.AppendExt(addDiv);
                        menudiv.AppendExt(editDiv);
                        menudiv.AppendExt(removeDiv);
                        menudiv.AppendExt(collapseDiv);
                        menudiv.AppendExt(expendDiv);
                        toolform.append(menudiv);
                        option.onContextMenu = onContextMenu;
                    }
                    _this.append(outdiv.append(tooldiv.append(toolform)));
                    $.parser.parse('#tree_out_div');
                    tool = $("#tree_tool_div");
                }
            }
            ;
            _this.treegrid(option = $.extend({
                idField: 'id',
                toolbar: tool,
                columns: null,
                url: $(_this).attr("url"),
                treeField: 'name',
                animate: true,
                title: "",
                iconCls: 'icon-nav',
                rownumbers: true,
                fitColumns: false,
                fit: true,
                singleSelect: true,
                loadMsg: "数据加载中……",
                animate: true,
                        onDblClickRow: function () { }
            }, option));
            $("#tree_search_text").toolTipExt();
            //移除空DIV
            $("#tree_out_div").remove();
        },
        treeSearch: function (obj) {
            $(this).treegrid('clearSelections');
            $(this).treegrid("reload", $(obj).find("input,select").formSerializeEscapeExt());
        },
        treeEdit: function (_option) {
            var _this = this;
            var linkSign = "?";
            if (_option.linkSign) {
                linkSign = _option.linkSign;
            }
            if (_option.param) {
                _option.href = _option.href + linkSign + $.param(_option.param);
            }
            if (true) {
                if (_option.href) {
                    linkSign = _option.href.indexOf("?") == -1 ? "?" : "&";
                }
                var rows = _this.tree("getSelected");
                if (rows == null && !_option.isadd) {
                    top.$.messager.alert("系统提示", "请选择一条记录进行操作!", "warning");
                    return;
                }
                if (rows != null) {
                    if (rows != null && !_option.isadd) {
                        if (true) {
                            var val = rows.id;
                            if (_option.href == undefined)
                                _option.href = $(_this).attr("editurl");
                            if (linkSign == "&")
                                _option.href = _option.href + linkSign + "id" + "=" + val;
                            else
                                _option.href += "?id=" + val;
                        }
                    } else {
                        _option.href = $(_this).attr("editurl");
                    }
                } else {
                    {
                        top.$.messager.alert("系统提示", "一次只能编辑一条记录!", "warning");
                        return;
                    }
                }
            }
            var win = $("<div/>");
            var option = $.extend({
                title: '标题',
                width: 330,
                height: 250,
                closed: false,
                cache: false,
                href: '',
                modal: true,
                onLoad: function () { },
                onClose: function () {
                    $(win).remove();
                },
                buttons: [{
                        text: "保存", iconCls: "icon-save", handler: function () {
                            if (win.form("validate")) {
                                $.saveExt({
                                    url: win.find("form").attr("action"),
                                    data: win.find("form input,textarea,select").serializeArray(),
                                    callback: _option.callback
                                });
                            }
                        }
                    }, {
                        text: "关闭", iconCls: "icon-cancel",
                        handler: function () {
                            win.dialog("close");
                            $(win).remove();
                        }
                    }]
            }, _option)
            win.dialog(option);
        },
        treeRemove: function (_option) {
            var param = {};
            var nodes = this.tree('getChecked');
            _option = $.extend({
                callback: function () {
                    this.tree('reload');
                    if (_option.onBack)
                        _option.onBack(nodes);
                }
            }, _option);
            if (nodes.length == 0) {
                $.messager.alert("系统提示", "请选择一条记录进行操作!", "warning");
                return;
            }
            if (nodes.length > 0) {
                var _this = this;
                top.$.messager.confirm("系统提示", "确认要执行 " + nodes.length + " 条记录删除操作吗？",
                        function (r) {
                            if (!r) {
                                $.each(nodes, function (index, item) {
                                    _this.tree("uncheck", item.target);
                                });
                                return;
                            }
                            $.each(nodes, function (i, item) {
                                param["param[" + i + "]"] = item.id;
                            });
                            $.saveExt({
                                url: _this.attr("removeurl"),
                                data: param,
                                callback: _option.callback
                            })
                        });
            } else {
                $.messager.alert("系统提示", "请您选择要删除的数据！", "warning");
            }
        },
        extComboboxBind: function (option) {
            $.post(option.url, "", function (data) {
                if (data != null) {
                    var datas = "[";
                    $(data).each(function (n) {
                        datas += "{value:'" + data[n].value + "',text:'" + data[n].text + "'},";
                    });
                    datas = datas.substring(0, datas.length - 1);
                    datas += ",{value:'',text:'全部',selected:true}]";
                    var _option = $.extend({
                        width: 75,
                        editable: false,
                        panelHeight: 102,
                        valueField: "value", value: "text",
                        data: eval("(" + datas + ")")
                    }, option);
                    $(_this).combobox(_option);
                } else {
                    $.messager.alert("系统提示", "加载失败...", "error");
                }
            });
        },
        ///禁用
        disable: function () {
            return this.each(function () {
                $(this).addClass("disable").attr({
                    disabled: true
                });
            });
        },
        //启用
        enable: function () {
            return this.each(function () {
                $(this).removeClass("disable").removeAttr('disabled');
            });
        },
        //纯HTML 下拉框扩展
        comboxExt: function (_option) {
            var _this = this;
            var option = $.extend(true, {type: "POST", url: "", data: null, defaultVal: "0", defaultText: "请选择...", isDefault: true, isClear: true}, _option);
            $.post(option.url, option.data, function (success) {
                if (option.isClear)
                    $(_this).find("option").remove();
                if (option.isDefault) {
                    $(_this).append("<option value='" + option.defaultVal + "'>" + option.defaultText + "</option>");
                }
                for (var i = 0; i < success.length; i++) {
                    $(_this).append("<option value='" + success[i].value + "'>" + success[i].text + "</option>");
                }
            });
        },
        exportFile: function (obj) {
            var form = $("<form>");
            form.attr('style', 'display:none');
            form.attr('method', 'post');
            form.attr('action', $(this).attr("url"));
            form.append(obj);
            $('body').append(form);
            form.submit();
            form.remove();
            return false;
        },
        formValidate: function () {
            var isValidate = true;
            $("input[required=true]").each(function () {
                if ($(this).val() == "") {
                    $(this).ExtFocus();
                    isValidate = false;
                    return false;
                } else {
                    $(this).addClass("txt");
                }
            });
            return isValidate;
        },
        //为对象中的值进行编码(Esacpe)
        extEscape: function () {
            for (var key in this) {
                this[key] = escape(this[key]);
            }
            return this;
        }
    });
})(jQuery);

function onContextMenu(e, row) {
    e.preventDefault();
    $(this).treegrid('select', row.id);
    $('#tree_menu_div').menu('show', {
        left: e.pageX,
        top: e.pageY
    });
}
;
///格式化日期(YY-MM-DD)
function formatDateExt(d) {
    if (d == null || "")
        return null;
    var date = new Date(parseInt(d.replace("/Date(", "").replace(")/", ""), 10));
    return date.format("yyyy-MM-dd hh:mm:ss");
}
;
///格式化日期(YY-MM-DD)
function formatDateTable(value,row,index) {
    if (value == null || "")
        return '';
    var date =value.replace('.0','');
    return date;
}
;
///格式化日期(YY-MM-DD)
function formatDateMonth(value,row,index) {
    if (value == null || "")
        return '';
    var date =value.substring(0,10);
    return date;
}
;
///格式化日期(YY-MM-DD)
function formatDateMinute(value,row,index) {
    if (value == null || "")
        return '';
    var date =value.substring(0,16);
    return date;
}
;
//文本框默认提示字
function ToolTip(obj) {
    var tbx = $(obj).find("input");
    $.each(tbx, function () {
        if ($(this).attr("title") != "") {
            $(this).toolTipExt();
        }
    });
}
//回车键提交
function enterExt(obj, clk) {
    $(obj).keydown(function (e) {
        var curKey = e.which;
        if (curKey == 13) {
            $(clk).click();
            return false;
        }
    });
}
//日期处理(算出两个时段的的差返回单位为天)
function datadiffExt(begin, end) {
    var ipt1 = begin
    var ipt2 = end;
    var arr1 = ipt1.split("-");
    var arr2 = ipt2.split("-");
    var dt1 = new Date();
    dt1.setFullYear(arr1[0]);
    dt1.setMonth(arr1[1] - 1);
    dt1.setDate(arr1[2]);
    var dt2 = new Date();
    dt2.setFullYear(arr2[0]);
    dt2.setMonth(arr2[1] - 1);
    dt2.setDate(arr2[2]);
    var dif = dt2.getTime() - dt1.getTime();
    var days = dif / (24 * 60 * 60 * 1000);
    return days;
}
String.prototype.format = function (args) {
    if (arguments.length > 0) {
        var result = this;
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                var reg = new RegExp("({" + key + "})", "g");
                result = result.replace(reg, args[key]);
            }
        } else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] == undefined) {
                    return "";
                } else {
                    var reg = new RegExp("({[" + i + "]})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
        return result;
    } else {
        return this;
    }
}
Date.prototype.formatter = function (format) {
    var o = {
        "M+": this.getMonth() + 1, "d+": this.getDate(), "h+": this.getHours(), "m+": this.getMinutes(),
        "s+": this.getSeconds(), "q+": Math.floor((this.getMonth() + 3) / 3), "S": this.getMilliseconds()
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

/////EASYUI验证扩展
$.extend(
        $.fn.validatebox.defaults.rules, {
            minLength: {
                validator: function (value, param) {
                    return value.length >= param[0];
                },
                message: '最小长度必须为{0}位！'
            },
            equals: {
                validator: function (value, param) {
                    return (value != undefined && value != '' && value == $(param[0]).val());
                },
                message: '两次输入的密码不一致！'
            },
            isnumber: {
                validator: function (value, param) {
                    var reg = /~[0-9]*$/;
                    return reg.test(value);
                },
                message: '必须输入数字!'
            }
        }

);
//统一后台弹出层
var ManageOutDiv = function (_options) {
    var option = $.extend({
        width: 400,
        height: 300,
        href: '',
        onCollapse: function () {
            alert('折叠');
        },
        onBeforeCollapse: function () {
            alert('折叠之前')
        },
        onClose: function () {
            $(top.$.find('body')).find('#CommOutDiv').remove();
        },
        onMaximize: function () {
            alert('点了最大化');
        },
        collapsible: false, minimizable: false, maximizable: false, closable: true, hasbutton: true, buttons: null

    }, _options);
    var text = "";
    text += '<div id="CommOutDiv"><style type="text/css">#OutDivGg{background-color: #999;position:absolute;z-index: 800;top:0px;left:0px;opacity: 0.6;-moz-opacity: 0.6;-khtml-opacity: 0.6;filter:alpha(Opacity=60);display:none;}#OutDivTable{ width:100%; z-index:899;  position:absolute; display:none;top:100px;}#OutDivIframe{overflow-x:hidden;overflow-y:atuo;width:100%;top:100px;}</style><div id="OutDivGg"></div>';
    text += '<div id="OutDivTable" style="cursor:move;"><table width="' + option.width + '" border="0" cellspacing="0" align="center" cellpadding="0" style="border:4px solid #999;"><tr><td height="' + option.height + '" valign="top" bgcolor="#FFFFFF"><div style=" position:absolute; width:40px; height:40px; margin:-10px 0px 0px -10px; cursor:pointer;"></div>';
    text += '<div id="OutDivIframe"></div></td></tr></table></div></div>';
    $("#CommOutDiv").remove();
    $(top.$.find('body')).append(text);
    $(top.$.find('body')).find('#OutDivTable').css('display', 'block');
    $(top.$.find('body')).find('#OutDivGg').css({'display': 'block', 'width': '100%', 'height': 800 + "px"});
    var outidiv = $(top.$.find('body')).find("#OutDivIframe");
    if (option.buttons == null) {
        if (option.hasbutton) {
            var savebtn = {
                obj: 'a',
                html: '保存',
                attrparams: {"id": "save_btn1", "href": "#", "class": "easyui-linkbutton", "data-options": "iconCls: 'icon-save'", "style": "padding-right:10px;margin-right:10px;"},
                func: {
                    click: function () {
                        if (outidiv.form("validate")) {
                            var saveurl = '';
                            if (_options.saveurl) {
                                saveurl = _options.saveurl;
                            } else {
                                saveurl = outidiv.find("form").attr("action");
                            }
                            var saveoption = $.extend({
                                url: saveurl,
                                data: outidiv.find("form input,textarea,select").serializeArray(),
                                callback: function () {
                                    $(top.$.find('body')).find('#CommOutDiv').remove();
                                    if (_options.onBack)
                                        _option.onBack();
                                }
                            }, _options);
                            var saveoption = $.extend(true, {url: undefined, data: null, callback: function () { }, onBefor: function () {
                                    return true;
                                }}, saveoption);
                            if (saveoption.onBefor()) {
                                if (saveoption.url == undefined) {
                                    top.$.messager.alert("系统提示", "不明确请求地址！", "info");
                                    return false;
                                }
                                $.post(saveoption.url, saveoption.data, function (data) {
                                    if (data.result) {
                                        top.$.messager.alert("系统提示", data.info == "" || null ? "已成功处理您的请求。" : data.info, "info");
                                        saveoption.callback(data);
                                    } else {
                                        top.$.messager.alert("系统提示", data.info == "" || null ? "操作失败，对此抱歉！" : data.info, "error");
                                    }
                                });
                            }
                            return false;
                        }
                    }
                }
            };
            var closebtn = {
                obj: 'a',
                html: '关闭',
                attrparams: {"href": "#", "class": "easyui-linkbutton", "data-options": "iconCls: 'icon-cancel'"},
                func: {
                    click: function () {
                        $(top.$.find('body')).find('#CommOutDiv').remove();
                    }
                }
            };
            var tooldiv = $("<div/>");
            tooldiv.attr("style", "z-index:10000;position:absolute;bottom:0px;width:" + option.width + "px;height:30px;background-color:#f5f5f5;text-align:right;")
            tooldiv.AppendExt(savebtn);
            tooldiv.AppendExt(closebtn);
            option = $.extend(true, option, {
                onLoad: function () {
                    outidiv.append(tooldiv);
                    $.parser.parse(tooldiv);
                }
            });
        }
    } else {
        option = $.extend(true, option, {
            onLoad: function () {
                outidiv.append(option.buttons);
                $.parser.parse(outidiv);
            }
        });

    }
    $(top.$.find('body')).find("#OutDivIframe").panel(option);
};
//判断数组中是否包含某元素，同类型
Array.prototype.contains = function (needle) {
    for (i in this) {
        if (this[i] == needle)
            return true;
    }
    return false;
}
//计算身份证年龄
function GetAgeByCard(identityCard) {
    var len = (identityCard + "").length;
    if (len == 0) {
        return 0;
    } else {
        if ((len != 15) && (len != 18))//身份证号码只能为15位或18位其它不合法
        {
            return 0;
        }
    }
    var strBirthday = "";
    if (len == 18)//处理18位的身份证号码从号码中得到生日和性别代码
    {
        strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2);
    }
    if (len == 15) {
        strBirthday = "19" + identityCard.substr(6, 2) + "/" + identityCard.substr(8, 2) + "/" + identityCard.substr(10, 2);
    }
    //时间字符串里，必须是“/”
    var birthDate = new Date(strBirthday);
    var nowDateTime = new Date();
    var age = nowDateTime.getFullYear() - birthDate.getFullYear();
    //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
    if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
function basicageFormatter(value, row, index) {
    return GetAgeByCard(row.per_idcard);
}