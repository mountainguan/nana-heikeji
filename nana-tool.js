// ==UserScript==
// @name         小工具面板
// @namespace    http://your.homepage/
// @version      0.1
// @description  enter something useful
// @author       You
// @match        http://nana.dgut.edu.cn/*
// @match        http://nana.hdq.me/*
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @require      http://nana.dgut.edu.cn/res/js/dev/jquery.js?v=20141223
// ==/UserScript==

var $ = window.$;
//设置window对象
var window = unsafeWindow;

//=====================================预设方法=====================================
//添加css
function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

//获取get参数
function getPar(par){
    //获取当前URL
    var local_url = document.location.href; 
    //获取要取得的get参数位置
    var get = local_url.indexOf(par +"=");
    if(get == -1){
        return false;   
    }   
    //截取字符串
    var get_par = local_url.slice(par.length + get + 1);    
    //判断截取后的字符串是否还有其他get参数
    var nextPar = get_par.indexOf("&");
    if(nextPar != -1){
        get_par = get_par.slice(0, nextPar);
    }
    return get_par;
}


/*//写cookies
function setCookie(name,value)
{
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + 5*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString() + ";domain=.dgut.edu.cn";
}

//读取cookies
function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
 
    if(arr=document.cookie.match(reg))
        return (arr[2]);
    else
        return null;
}*/


//====================================需要预设的存储值=================================
//导航背景色
if(!localStorage.getItem("lcg_ui_dh_backcolor"))
    localStorage.setItem("lcg_ui_dh_backcolor","#000000");
//顶部距离
if(!localStorage.getItem("lcg_ui_top_y"))
    localStorage.setItem("lcg_ui_top_y",0);
//背景颜色
if(!localStorage.getItem("lcg_ui_backcolor"))
    localStorage.setItem("lcg_ui_backcolor","#f4f4f4");
//板块标题背景
if(!localStorage.getItem("lcg_ui_title_back"))
    localStorage.setItem("lcg_ui_title_back","#ffffff");
//内容透明度
if(!localStorage.getItem("lcg_ui_main_opacity"))
    localStorage.setItem("lcg_ui_main_opacity","1");
//每月流量限额
if(!localStorage.getItem("lcg_ll_max"))
    localStorage.setItem("lcg_ll_max","9");


//=================================================开启额外表情================================================
//加入面板
$(".wrap").append('<div id="nana_tool_face" lcg-height="60px" class="nana_tool_menu_item" style="color:#fff;"><div class="nana_tool_item_z">\
是否开启附加表情<input onclick="lcg_tool.change_value(\'lcg_face_open\',$(this).attr(\'checked\'));" type="checkbox" '+((localStorage.getItem("lcg_face_open") == "checked")?"checked":"")+'/>\
qq表情<input onclick="lcg_tool.change_value(\'lcg_face_1\',$(this).attr(\'checked\'));" type="checkbox" '+((localStorage.getItem("lcg_face_1") == "checked")?"checked":"")+'/>\
贴吧表情<input onclick="lcg_tool.change_value(\'lcg_face_2\',$(this).attr(\'checked\'));" type="checkbox" '+((localStorage.getItem("lcg_face_2") == "checked")?"checked":"")+'/>\
老贴吧表情<input onclick="lcg_tool.change_value(\'lcg_face_3\',$(this).attr(\'checked\'));" type="checkbox" '+((localStorage.getItem("lcg_face_3") == "checked")?"checked":"")+'/>\
颜表情<input onclick="lcg_tool.change_value(\'lcg_face_4\',$(this).attr(\'checked\'));" type="checkbox" '+((localStorage.getItem("lcg_face_4") == "checked")?"checked":"")+'/>\
</div></div>');

//将表情加入面板
if(localStorage.getItem("lcg_face_open") == "checked")
{
    $(".icon_face.J_insert_emotions").click(
        function(e)
        {
            setTimeout("lcg_tool.add_face_start()",500);
            window.lcg_tool.add_face_start = function()
            {
                var mb = $("#J_emotions_menu").find("div").find("ul");
                if(mb.length > 0 && !mb.attr("lcg"))
                {
                    mb.attr("lcg","true");
                    $("#J_emotions_menu").parent().css("width","700px");
                    var add_img = function(url,size,end)
                    {
                        var str = "";
                        for(var i = 0;i < size;i++)
                            str += '<li><a href="#" class="J_emotions_item" data-sign="[img]'+url+(i+1)+'.'+end+'[/img]"><img data-src="'+url+(i+1)+'.'+end+'" src="'+url+(i+1)+'.'+end+'"></a></li>';
                        return str;
                    }
                    var add_class = function(name,url,size,end)
                    {
                        mb.append("<li class><a href>"+name+"</a></li>");
                        $("#J_emotions_pl").append('<div style="display: none;"><ul class="cc lcg_tool_talk_list" style="max-height:270px;overflow-y:auto;">'+add_img(url,size,end)+'</ul></div>');
                    }
                    if(localStorage.getItem("lcg_face_1") == "checked")
                    	add_class("qq表情","http://172.27.51.27/bq/a",165,"png");
                    if(localStorage.getItem("lcg_face_2") == "checked")
                    	add_class("贴吧表情","http://172.27.51.27/bq/b",107,"png");
                    if(localStorage.getItem("lcg_face_3") == "checked")
                    	add_class("老贴吧表情","http://172.27.51.27/bq/c",308,"png");
                    if(localStorage.getItem("lcg_face_4") == "checked")
                    	add_class("颜表情","http://172.27.51.27/bq/d",44,"png");
                    //$("#J_emotions_pl").append('<div style="display: none;"><ul class="cc"><li><a href="#" class="J_emotions_item" data-sign="[s:45555]"><img data-src="http://nana.dgut.edu.cn/res/images/emotion/yct/967339c1.gif" src="http://172.27.51.27/bq/"></a></li></ul></div>');
                }
            }
        });
}

//==================================================工具栏=============================================
//加入工具列表
$(".wrap").append('<div id="nana_tool_menu" style="position:fixed;left:0px;bottom:0px;width:0px;height:50px;background-color:#555;-webkit-transition:width 1s,height 1s;opacity:0.85;overflow:hidden;z-index:12;">\
<div style="margin-left:100px;height:100%">\
<div onclick="lcg_tool.autoreply();" class="nana_tool_button">一键水贴</div>\
<div onclick="window.location.href=\'http://nana.dgut.edu.cn/read.php?tid='+parseInt(10000*Math.random() + 100)+'\'" class="nana_tool_button">试试手气</div>\
<div onclick="lcg_tool.open_menu_item(\'set\');" class="nana_tool_button">基本设置</div>\
<div onclick="lcg_tool.open_menu_item(\'ui\');" class="nana_tool_button">界面美化</div>\
<div onclick="lcg_tool.open_menu_item(\'ll\');" class="nana_tool_button">流量监控</div>\
<div onclick="lcg_tool.open_menu_item(\'face\');" class="nana_tool_button">附加表情</div>\
<div onclick="lcg_tool.open_menu_item(\'talk\');" class="nana_tool_button">版聊设置</div>\
<!-- <div onclick="lcg_tool.open_menu_item(\'user\');" class="nana_tool_button">马甲切换</div> -->\
</div></div>');
//加入工具按钮
$(".wrap").append('<div id="nana_tool_button" onclick="window.lcg_tool.open_menu();" style="position:fixed;left:-50px;bottom:-50px;width:100px;height:100px;background-color:#555;border-radius:50px;cursor:pointer;z-index:12;">\
<font style="position:absolute;left:55px;bottom:60px;font-size:15px;font-weight: 700;color:#fff">工具</font>\
</div>');

//加入按钮css
addGlobalStyle(".nana_tool_button{width:60px;height:30px;background-color:#fff;margin-top:5px;border-radius:10px;float:left;margin-left:20px;text-align:center;padding-top:10px;cursor:pointer;z-index:12;}");

//初始化工具栏主对象
window.lcg_tool = {};
var lcg_tool = window.lcg_tool;

//工具栏的开关
window.lcg_tool.open_menu = function()
{
	if($("#nana_tool_menu")[0].isopen)
    {
    	$("#nana_tool_menu")[0].isopen = false;
        $("#nana_tool_menu").css("width","0px");
        window.lcg_tool.hide_all_menu_item();
    }
    else
    {
    	$("#nana_tool_menu")[0].isopen = true;
        $("#nana_tool_menu").css("width","100%");
    }
};

//=====================================限时分享功能(需要服务器)=======================================
//加入样式
addGlobalStyle('.lcg_tool_talk_list::-webkit-scrollbar{width: 8px;height: 16px;background-color: #F5F5F5;}\
.lcg_tool_talk_list::-webkit-scrollbar-track{\-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);border-radius: 10px;background-color: #F5F5F5;}\
.lcg_tool_talk_list::-webkit-scrollbar-thumb{border-radius: 10px;-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);background-color: #555;}');
//加入话题窗
window.lcg_tool.talk_add = function()
{
    $("#J_ava_ie6").parent().parent().parent().append('<div style="height:350px;background-color:#fff;margin-top:20px;"><div class="box_title" style="color:'+localStorage.getItem("lcg_ui_title_text")+';font-size:14px;padding:10px">限时分享</div>\
    <div style="max-height:290px;overflow:hidden;">\
    <ul class="lcg_tool_talk_list" style="max-height:290px;overflow-y:auto;"><li>aa</li><li>aa</li><li>aa</li><li>aa</li><li>aa</li><li>aa</li><li>aa</li><li>aa</li><li>aa</li><li>aa</li><li>aa</li><li>aa</li><li>aa</li><li>aa</li><li>aa</li><li>aa</li><li>aa</li><li>cc</li></ul>\
    </div></div>');
};
//window.lcg_tool.talk_add();

//====================================M站信息实时=================================================
//将M站信息加入板块
window.lcg_tool.add_mz_class = function(list,list1)
{
    var str = "";
    for(var i = 0;i < list.length;i++)
    {
        str += '<div style="padding:10px;border-top:1px solid #bbb;"><a style="color:#000" href="'+list1[i].substr(1)+'">'+list[i]+'</a></div>';
    }
    window.lcg_tool.mz_ser_start = function()
    {
        if($("#lcg_tool_mz_ser").attr("value"))
    		window.location.href='http://mountainguan.coding.io/?s='+ $("#lcg_tool_mz_ser").attr("value");
    }
    $(".bbs_info_box").parent().append('<div class="box_wrap"><div class="forum_group" style="background-color:#fff;"><div class="box_title"><div class="fr"></div><h2 class="cname"><a href="http://mountainguan.coding.io/"style="color:#fff">ˋ( ° ▽° ) M站最新帖子</a></h2></div>\
<table><tr><td style="width:600px;">'+str+'</td><td width="235px;"style="text-align:center;"><img style="width:200px;height:100px;" src="http://172.27.51.27/logo.png"><br/><input style="width:195px;" type="text" id="lcg_tool_mz_ser"/><br/><br/><input onclick="window.lcg_tool.mz_ser_start();" class="btn btn_submit" type="button" value="(ง •̀_•́)ง M站搜索"/></td></tr></table></div></div>');
    window.lcg_tool.ref_view();
}

//解析已用流量
window.lcg_tool.ap_mz_ser = function()
{
    //如果是板块页
    if($(".bbs_info_box").length > 0)
    {
        GM_xmlhttpRequest({
            method: 'GET',
            url: "http://mountainguan.coding.io/wp-admin/edit.php?post_type=post&paged=1",
            onload: function(data) {
                try{
                    var str = data.responseText;
                    var list = str.match(/\<strong([\s\S]*?)\<\/strong\>/g).splice(5,5);
                    var list1 = str.match(/\"http:\/\/mountainguan\.coding\.io[^\"]+/g).splice(20,5);
                    window.lcg_tool.add_mz_class(list,list1);
                }catch(e){}
            }
        });
    }
};
if(localStorage.getItem("lcg_mz_open") == "checked")
	window.lcg_tool.ap_mz_ser();

//====================================流量监控功能===================================================
//加入面板
$(".wrap").append('<div id="nana_tool_ll" lcg-height="60px" class="nana_tool_menu_item" style="color:#fff;"><div class="nana_tool_item_z">\
是否开启流量统计<input onclick="lcg_tool.change_value(\'lcg_ll_open\',$(this).attr(\'checked\'));" type="checkbox" '+((localStorage.getItem("lcg_ll_open") == "checked")?"checked":"")+'/>\
每月流量限额(GByte)<input type="number" min="0" max="50" step="0.5" style="width:50px" onchange="lcg_tool.change_value(\'lcg_ll_max\',$(this).attr(\'value\'));" value="'+localStorage.getItem("lcg_ll_max")+'"/>\
</div></div>');

//解析已用流量
window.lcg_tool.ap_ll_ser = function(callback)
{
    callback = callback || window.lcg_tool.ll_menu_add;
    GM_xmlhttpRequest({
        method: 'GET',
        url: "http://192.168.252.8/",
        onload: function(data) {
            var str = data.responseText;
            $("html").append(str.match(/\<script([\s\S]*?)\<\/script\>/g)[0]);
            if(callback)
            	callback("已使用流量: "+flow1/1024+flow3+flow0/1024+" MByte");
        }
	});
};

//加入流量监控窗
window.lcg_tool.ll_menu_add = function(ll)
{
    //流量限额
    var max = localStorage.getItem("lcg_ll_max") * 1024;
    //剩余流量
    var sy = Math.round((max - ll.match(/[\d\.]+/g)) * 100)/100;
    //日均流量
    var day_ll = Math.round((max-sy)/(new Date()).getDate()*100)/100;
    if(sy < 0)
        sy = 0;
    $("#J_ava_ie6").parent().parent().parent().append('<div style="height:200px;background-color:#fff;margin-top:20px;"><div class="box_title" style="color:'+localStorage.getItem("lcg_ui_title_text")+';font-size:14px;padding:10px;background-color:'+localStorage.getItem("lcg_ui_title_back")+'">流量统计</div>\
<div style="padding:10px;"><p style="font-size:14px;">剩余流量'+sy+'MByte</p>\
<div style="width:245px;background-color:#555;height:10px;"><div style="width:'+(sy/max*245)+'px;height:100%;background-color:rgb(255,155,100);"></div></div>\
<p style="font-size:14px;text-align:right;">'+ll+'</p><br/>\
<p style="font-size:14px;">日平均流量：<font style="font-size:22px;font-weight:800px;color:#3a3;">'+day_ll+'</font>MByte</p>\
</div>\
	</div>');
};
if(localStorage.getItem("lcg_ll_open") == "checked")
	window.lcg_tool.ap_ll_ser();

//=====================================基本设置========================================
//加入面板
$(".wrap").append('<div id="nana_tool_set" lcg-height="100px" class="nana_tool_menu_item" style="color:#fff;"><div class="nana_tool_item_z">\
是否屏蔽广告<input onclick="lcg_tool.change_value(\'lcg_set_ad\',$(this).attr(\'checked\'));" type="checkbox" '+((localStorage.getItem("lcg_set_ad") == "checked")?"checked":"")+'/>\
是否自动打卡以及代签<input onclick="lcg_tool.change_value(\'lcg_set_card\',$(this).attr(\'checked\'));" type="checkbox" '+((localStorage.getItem("lcg_set_card") == "checked")?"checked":"")+'/>\
是否开启小尾巴回复按钮<input onclick="lcg_tool.change_value(\'lcg_set_addf\',$(this).attr(\'checked\'));" type="checkbox" '+((localStorage.getItem("lcg_set_addf") == "checked")?"checked":"")+'/><br/>\
是否开启M站板块(需要外网且在M站选择记住登录状态)<input onclick="lcg_tool.change_value(\'lcg_mz_open\',$(this).attr(\'checked\'));" type="checkbox" '+((localStorage.getItem("lcg_mz_open") == "checked")?"checked":"")+'/>\
<br/><br/>注：所有内容需刷新生效</div><div class="nana_tool_item_z">\
小尾巴内容<textarea style="resize: none;width:500px;" onchange="lcg_tool.change_value(\'lcg_set_addf_val\',$(this).attr(\'value\'));">'+localStorage.getItem("lcg_set_addf_val")+'</textarea>\
</div></div>');

//改变某预设值
window.lcg_tool.change_value = function(key,value)
{
    //alert(key + ":" + value);
	localStorage.setItem(key,value);
    window.lcg_tool.ref_view();
};

//加入面板css
addGlobalStyle(".nana_tool_menu_item{position:fixed;left:0px;bottom:50px;width:100%;height:0px;background-color:#555;-webkit-transition:width 1s,height 0.3s;opacity:0.85;overflow:hidden;z-index:12;}");
addGlobalStyle(".nana_tool_item_z{padding:10px;float:left;}");
addGlobalStyle(".nana_tool_item_z input{margin-right:40px;}");

//内容栏的开关
window.lcg_tool.open_menu_item = function(name)
{
    name = "#nana_tool_" + name;
    if($(name)[0].isopen || !$("#nana_tool_menu")[0].isopen)
    {
    	$(name)[0].isopen = false;
        $(name).css("height","0px");
    }
    else
    {
        window.lcg_tool.hide_all_menu_item();
    	$(name)[0].isopen = true;
        $(name).css("height",$(name).attr("lcg-height"));
    }
};

//隐藏所有面板
window.lcg_tool.hide_all_menu_item = function()
{
    var names = ["set","ui","user","ll","face","talk"];
    for(var i = 0;i < names.length ;i++)
    {
        $("#nana_tool_"+names[i])[0].isopen = false;
        $("#nana_tool_"+names[i]).css("height","0px");
    }
};

//=====================================界面美化=======================================
//加入面板
$(".wrap").append('<div id="nana_tool_ui" lcg-height="130px" class="nana_tool_menu_item" style="color:#fff;"><div class="nana_tool_item_z">\
导航文字颜色<input type="color" onchange="lcg_tool.change_value(\'lcg_ui_dh_text\',$(this).attr(\'value\'));" value="'+localStorage.getItem("lcg_ui_dh_text")+'"/>\
开启导航文字背景<input onclick="lcg_tool.change_value(\'lcg_ui_dh_back\',$(this).attr(\'checked\'));" type="checkbox" '+((localStorage.getItem("lcg_ui_dh_back") == "checked")?"checked":"")+'/>\
导航背景颜色<input type="color" onchange="lcg_tool.change_value(\'lcg_ui_dh_backcolor\',$(this).attr(\'value\'));" value="'+localStorage.getItem("lcg_ui_dh_backcolor")+'"/>\
顶部空余距离<input type="number" min="0" max="300" style="width:50px" onchange="lcg_tool.change_value(\'lcg_ui_top_y\',$(this).attr(\'value\'));" value="'+localStorage.getItem("lcg_ui_top_y")+'"/>\
开启背景图<input onclick="lcg_tool.change_value(\'lcg_ui_back_open\',$(this).attr(\'checked\'));" type="checkbox" '+((localStorage.getItem("lcg_ui_back_open") == "checked")?"checked":"")+'/>\
背景图链接<input style="width:400px;" type="text" style="width:50px" onchange="lcg_tool.change_value(\'lcg_ui_back_url\',$(this).attr(\'value\'));" value="'+localStorage.getItem("lcg_ui_back_url")+'"/><br/>\
背景颜色（打开背景图将覆盖背景色）<input type="color" onchange="lcg_tool.change_value(\'lcg_ui_backcolor\',$(this).attr(\'value\'));" value="'+localStorage.getItem("lcg_ui_backcolor")+'"/>\
板块标题背景色<input type="color" onchange="lcg_tool.change_value(\'lcg_ui_title_back\',$(this).attr(\'value\'));" value="'+localStorage.getItem("lcg_ui_title_back")+'"/>\
板块标题文字色<input type="color" onchange="lcg_tool.change_value(\'lcg_ui_title_text\',$(this).attr(\'value\'));" value="'+localStorage.getItem("lcg_ui_title_text")+'"/>\
修改顶栏背景图<input onclick="lcg_tool.change_value(\'lcg_ui_top_back_open\',$(this).attr(\'checked\'));" type="checkbox" '+((localStorage.getItem("lcg_ui_top_back_open") == "checked")?"checked":"")+'/>\
顶栏背景图链接<input style="width:400px;" type="text" style="width:50px" onchange="lcg_tool.change_value(\'lcg_ui_top_back_url\',$(this).attr(\'value\'));" value="'+localStorage.getItem("lcg_ui_top_back_url")+'"/><br/>\
内容透明度(0-1)<input type="number" min="0" max="1" style="width:50px" step="0.02" onchange="lcg_tool.change_value(\'lcg_ui_main_opacity\',$(this).attr(\'value\'));" value="'+localStorage.getItem("lcg_ui_main_opacity")+'"/>\
搜索结果背景色<input type="color" onchange="lcg_tool.change_value(\'lcg_ui_sec_back\',$(this).attr(\'value\'));" value="'+localStorage.getItem("lcg_ui_sec_back")+'"/>\
隐藏签名档<input onclick="lcg_tool.change_value(\'lcg_ui_talkbut_hide\',$(this).attr(\'checked\'));" type="checkbox" '+((localStorage.getItem("lcg_ui_talkbut_hide") == "checked")?"checked":"")+'/>\
</div></div>');

window.lcg_tool.ref_view = function()

{
    //======替换界面======
    //导航文字
    $(".bread_crumb").find("a").css("color",localStorage.getItem("lcg_ui_dh_text"));
    //如果开启导航背景
    if(localStorage.getItem("lcg_ui_dh_back") == "checked")
    {
        $(".bread_crumb").find("a").css("background-color",localStorage.getItem("lcg_ui_dh_backcolor"));
        $(".bread_crumb").find("a").css("border-radius","5px");
        $(".bread_crumb").find("a").css("padding-right","5px");
    }
    //顶部距离
    $(".main_wrap").css("padding-top",localStorage.getItem("lcg_ui_top_y")+"px");
    //背景颜色
    $("#LoR").css("background-color",localStorage.getItem("lcg_ui_backcolor"));
    //板块标题背景
    $(".box_title").css("background-color",localStorage.getItem("lcg_ui_title_back"));
    //板块标题颜色
    $(".cname").find("a").css("color",localStorage.getItem("lcg_ui_title_text"));
    //顶栏背景
    if(localStorage.getItem("lcg_ui_top_back_open") == "checked")
        $(".header_wrap").css("background","url("+localStorage.getItem("lcg_ui_top_back_url")+") 50% 0 no-repeat");
    //内容透明度
    $(".main_wrap").css("opacity",localStorage.getItem("lcg_ui_main_opacity"));
    $(".space_page").css("opacity",localStorage.getItem("lcg_ui_main_opacity"));
    //搜索栏背景
    $("#searchlist_top").parent().css("background-color",localStorage.getItem("lcg_ui_sec_back"));
    
    //调整body
    $("body").css("padding","0px");
    
    //隐藏签名档
    if(localStorage.getItem("lcg_ui_talkbut_hide") == "checked")
    	$(".box_wrap.floor_bottom").remove();
}
window.lcg_tool.ref_view();

//固定附件框
setInterval(function(){
    $(".edit_menu").css("top","100px");
},500);


//=====================================马甲切换(暂时作废)======================================
//加入面板
$(".wrap").append('<div id="nana_tool_user" lcg-height="100px" class="nana_tool_menu_item" style="color:#fff;"><div class="nana_tool_item_z">\
马甲列表<select id="nana_tool_user_list" style="width:300px;"></select>\
<button onclick="lcg_tool.save_user();">保存当前帐号到马甲</button>\
<button onclick="lcg_tool.del_user();">删除所选马甲</button>\
<button onclick="lcg_tool.change_user();">切换到所选马甲</button>\
</div></div>');

//读取马甲
window.lcg_tool.read_user = function()
{
	for(var i = 0;i < localStorage.length;i++)
    {
    	if(localStorage.key(i).substr(0,9) == "lcg_user_")
        {
            var key = localStorage.key(i).substr(9);
        	$("#nana_tool_user_list").append("<option value='"+key+"' id='nana_tool_user_list_item_"+key+"' >"+key+"</option>");
        }
    }
}
window.lcg_tool.read_user();

//切换马甲
window.lcg_tool.change_user = function()
{
    var list = localStorage.getItem("lcg_user_"+$("#nana_tool_user_list").attr("value")).split(";");
    setCookie("Hvb_winduser",list[0]);
    setCookie("Hvb_Pw_verify_code",list[1]);
}


//删除马甲
window.lcg_tool.del_user = function()
{
	localStorage.removeItem("lcg_user_" + $("#nana_tool_user_list").attr("value"));
    $("#nana_tool_user_list_item_"+GV.U_NAME).remove();
}

//保存马甲
window.lcg_tool.save_user = function()
{
    var key = GV.U_NAME;
    if($("#nana_tool_user_list_item_"+GV.U_NAME).length == 0)
    	$("#nana_tool_user_list").append("<option value='"+key+"' id='nana_tool_user_list_item_"+key+"' >"+key+"</option>");
	localStorage.setItem("lcg_user_"+GV.U_NAME,getCookie("Hvb_winduser") + ";" + getCookie("Hvb_Pw_verify_code"));
};

//=====================================版聊===========================================
//数据列表
window.lcg_tool.talk_class_list={"28":"休闲茶楼","14":"求资源区","47":"悬赏问答","6":"电影欣赏","7":"连续剧集","8":"综艺节目","49":"动漫专区","10":"体育赛事","11":"娱乐短片","46":"图像大全","20":"软件专区","55":"微电影","16":"原创写作","12":"学习资料","30":"跳蚤市场"};

//选项加入
var lcg_tool_talk_list_append = function()
{
    var str = "";
    var i = 0;
    for(var key in window.lcg_tool.talk_class_list)
    {
    	str += window.lcg_tool.talk_class_list[key] + '<input onclick="lcg_tool.change_value(\'lcg_talk_class_'+key+'\',$(this).attr(\'checked\'));" type="checkbox" '+((localStorage.getItem("lcg_talk_class_"+key) == "checked")?"checked":"")+'/>';
    	if(i%9 == 8)
        {
        	str += "<br/>";
        }
        i++;
    }
	return str;
}

//加入面板
$(".wrap").append('<div id="nana_tool_talk" lcg-height="100px" class="nana_tool_menu_item" style="color:#fff;"><div class="nana_tool_item_z">请选择要开启版聊的板块<br/>'+lcg_tool_talk_list_append()+'</div></div>');

//添加版聊模块
if(getPar("fid") && localStorage.getItem("lcg_talk_class_"+getPar("fid")) == "checked")
{
	$("#J_ava_ie6").parent().parent().parent().append('<div style="background-color:#fff;margin-top:20px;"><div class="box_title" style="color:'+localStorage.getItem("lcg_ui_title_text")+';font-size:14px;padding:10px;background-color:'+localStorage.getItem("lcg_ui_title_back")+'">版聊——'+window.lcg_tool.talk_class_list[getPar("fid")]+'</div>\
<iframe style="border:0px;width:100%;height:480px;" scrolling="no" src="http://172.27.51.27:3000/"/>\
	</div>');
}

//绑定监听
window.addEventListener("message",function(e)
{
	switch(e.data.type)
    {
    	case "start":
            e.source.postMessage({type:"value",name:window.GV.U_NAME,head:window.GV.U_AVATAR,room:getPar("fid")},"*");
        	break;
    }
});

//=====================================功能===========================================
//添加自动回复
window.lcg_tool.autoreply = function()
{
    //预设组
    var str = ["爱生活，爱分享","楼主太给力了！","呵呵呵","[s:帅][s:帅]","助人为快乐之本~","支持哦"];
    //发送回复
    $("#J_reply_quick_ta").attr("value",str[Math.floor(Math.random()*str.length)]);
    setTimeout('$("#J_reply_quick_ta").focus();$("#J_reply_quick_btn").trigger("click")',1000); 
};


//屏蔽广告
window.lcg_tool.ap_end_ad = function()
{
	$(".banner").remove();
    $("#J_mod_236").remove();
};
if(localStorage.getItem("lcg_set_ad") == "checked")
	window.lcg_tool.ap_end_ad();

//自动打卡
window.lcg_tool.ap_card = function()
{
	//先代签
    if ($(".cont").find("a").text().substr(0,2) != "连续") 
	{
		setTimeout('$("#J_punch_friend").trigger("click");',100);
     	setTimeout('window.lcg_tool.ap_card.start();',500);
        window.lcg_tool.ap_card.start = function()
        {
            if($("#J_punch_friend_form").length!=0)
            {
                var list = $(".J_friend_item");
                for(var i = 0; i < list.length; i++)
                {
                    $(list[i]).trigger("click");
                }
                setTimeout('$("#J_punch_friend_sub").trigger("click")',100);
            }
            setTimeout('$("#J_punch_friend_sub").next().trigger("click");',300);
        }
	}
	//后打卡
	if($(".cont").find("a").length > 0 && $(".cont").find("a").text().substr(0,2) != "连续")
    {
        setTimeout('$(".cont").find("a").trigger("click");',100);
    }
}
if(localStorage.getItem("lcg_set_card") == "checked")
	window.lcg_tool.ap_card();

//加入小尾巴按钮
window.lcg_tool.ap_addf = function()
{
	$("#J_reply_ft").append("<button onclick='lcg_tool.ap_addf_addvalue()' class='btn btn_submit'>小尾巴回复</button>");
};
if(localStorage.getItem("lcg_set_addf") == "checked")
	window.lcg_tool.ap_addf();

//加入小尾巴内容
window.lcg_tool.ap_addf_addvalue = function()
{
	$("#J_reply_quick_ta").attr("value",$("#J_reply_quick_ta").attr("value")+"\n\n"+localStorage.getItem("lcg_set_addf_val"));
    $("#J_reply_quick_btn").trigger("click");
};



//背景切换为图片
window.lcg_tool.ap_back_image = function()
{
    $("#LoR").css("background-image","url("+localStorage.getItem("lcg_ui_back_url")+")");
    $("#LoR").css("background-attachment","fixed");
    $("#LoR").css("background-repeat","no-repeat");
    $("#LoR").css("background-position","50% 0px");
    $(".space_header.cc").css("background-color","#fff");
};
if(localStorage.getItem("lcg_ui_back_open") == "checked")
    window.lcg_tool.ap_back_image();
