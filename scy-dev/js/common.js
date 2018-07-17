
var G100_COMMAND={
    COMMAND_BASE : 0,
    COMMAND_ERROR :				 0,
    COMMAND_LOGION:				 1,
    COMMAND_CHANGEPASSWORD:		 2
};
// 定时器间隔
var timerout_min = 1000;
var timerout_short = 10000;
var timerout_normal = 30000;
var timerout_long = 60000;
var timerout_long_long = 120000;
// 页大小
var page_size_licenselist = 10;
var page_size_devicelist = 10;
var page_size_blacklist = 10;
// 空字符串
var null_str = "空";
// 请求url类型
var req_cgiUrl = "/kedacomxmldata";
var req_cgiFile = "/kedacomfile";
// 上传文件保存文件夹名
var file_download_dir = "download";
// 上传文件名称
var file_devicelicense = ".key";
var file_serverlicense = ".key";
var file_systembak = "klms_sysbak";
var file_upgrade = "klms_upgrade";
// xml节点名称
var xml_command = "command";
var xml_user = "user";
var xml_pass = "pass";
var xml_session = "session";
var xml_ret = "ret";
var xml_errdesc = "errdesc";

var xml_TKlmsLoginReq = "TKlmsLoginReq";
var xml_TKlmsNormalRsp = "TKlmsNormalRsp";

// cookie名称
var cookie_session = "klms_session";
var cookie_remember = "klms_remember"
var cookie_user = "klms_user";
var cookie_pass = "klms_pass";
var cookie_needindex = "needindex";		// 是否需要跳转套登陆页面
var cookie_clicktab = "clicktab";	// 是否点击了tab选项
// 工具栏按钮颜色
var color_btnnormal = "#EEEEEE";
var color_btndown = "#1683DA";
var color_btnover = "#1683DA";
var color_btnmainselected = "#1683DA";

// 通用按钮颜色
var color_btnmainnormal = "#FFFFFF";
var color_btnmaindown = "#28A3E2";
var color_btnmainover = "#1683DA";

// License管理颜色
var color_licensetitle = "#F3F3F3";

// 设备管理颜色
var color_devicetitle = "#E0E0E0";

// 日志管理颜色
var color_logtitle = "E0E0E0";

// 黑名单管理颜色
var color_blacktitle = "E0E0E0";

function getCookie(name)
{
	var cookies = document.cookie.split(name+"=");
	if(cookies.length>1)
	{
		var values=cookies[1].split(";");
		return unescape(values[0]);
	}
	return null;
}

//在设置Cookie之前必须删除以前的Cookie
function delCookie(name)
{
	 var exp = new Date();
	 exp.setTime(exp.getTime() - 1);
	 var cval = getCookie(name);
	 if(cval != null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

//设置cookie，有效期一年
function setCookie(name,value)
{
	delCookie(name);
	var now=new Date();
	now.setFullYear(now.getFullYear()+1);
	var expires="; expires=" + now.toGMTString();
	document.cookie=name+"=" + escape(value) + expires + '; path=/;';
}

function getXMLDOC()
{
	return new ActiveXObject("Microsoft.XMLDOM");
}

function myConfirm(text)
{
	var r=confirm(text);
	if (r==false)
	{
		return false;
	}
	return true;
}
function myAlert(text)
{
	alert(text);
	//$.messager.alert("操作提示",text);
	return;
	var eleMessageBox = document.getElementById("id_divmessagebox");
	if(eleMessageBox)
	{
		var msgInfo = document.getElementById("id_divmessageinfo");
		msgInfo.innerHTML = text;
		eleMessageBox.style.display = "block";
		return ;
	}
	var eleBody = document.getElementById("id_body");
	var szHtml =
		"<div id=\"id_divmessagebox\" style=\"height:130px;width:210px;background-color:#EEEEEE;border:solid 1px #262626;position:absolute;top:150px;left:30%;\" align=\"center\"><div id=\"id_divmessagetitle\" style=\"height:30px;width:100%;margin-bottom:15px;background-color:#212426;color:#CDCDCD;font-size:16px;line-height:30px;\">提 示</div><div id=\"id_divmessageinfo\" style=\"height:15px;width:100%;margin-bottom:15px;font-size:15px;font-family:黑体;\">" + text + "</div><button id=\"id_btnmessageconfirm\" style=\"height:25px;px;width:80px;background:#E0E0E0;border:none;\" onclick=\"var div = document.getElementById('id_divmessagebox');div.style.display = 'none';\" onmouseover=\"var btn = document.getElementById('id_btnmessageconfirm');btn.style.background = color_btnmainover;\" onmouseout=\"var btn = document.getElementById('id_btnmessageconfirm');btn.style.background = color_btnmainnormal;\" onmousedown=\"var btn = document.getElementById('id_btnmessageconfirm');btn.style.background = color_btnmaindown;\" onmouseup=\"var btn = document.getElementById('id_btnmessageconfirm');btn.style.background = color_btnmainnormal;\">确 定</button></div>";
	eleBody.innerHTML += szHtml;
}
//封装ajax,上传文件(暂不用)
var ResourceLoader = {
	uploadFile:function(formName,cgiFile,handler){
		var url = cgiFile;
		Ext.Ajax.request({
			url:url,
			method:'POST',
			success:function(response,opts){
				handler(true);
			},
			failure:function(response,opts){
				handle(false);
			},
			form:formName,
			isUpload:true
		});
	}
};

// 是否是数字
function CheckInputNum(e)
{
	var k = window.event ? e.keyCode : e.which;
	if ( k >= 48 && k <= 57 )
	{
	}
	else
	{
		if (window.event) 
		{                    
		window.event.returnValue = false;
		}                
		else
		{
			e.preventDefault();
		}            
	}
}
// 获得浏览器版本
function getBrowserVersion()
{
	var userAgent = navigator.userAgent,   
        rMsie = /(msie\s|trident.*rv:)([\w.]+)/,   
        rFirefox = /(firefox)\/([\w.]+)/,   
        rOpera = /(opera).+version\/([\w.]+)/,   
        rChrome = /(chrome)\/([\w.]+)/,   
        rSafari = /version\/([\w.]+).*(safari)/;  
        var ua = userAgent.toLowerCase();  
        function uaMatch(ua) {  
            var match = rMsie.exec(ua);  
            if (match != null) {  
                return { browser : "IE", version : match[2] || "0" };  
            }  
            var match = rFirefox.exec(ua);  
            if (match != null) {  
                return { browser : match[1] || "", version : match[2] || "0" };  
            }  
            var match = rOpera.exec(ua);  
            if (match != null) {  
                return { browser : match[1] || "", version : match[2] || "0" };  
            }  
            var match = rChrome.exec(ua);  
            if (match != null) { 
			return { browser : match[1] || "", version : match[2] || "0" };  
            }  
            var match = rSafari.exec(ua);  
            if (match != null) {  
                return { browser : match[2] || "", version : match[1] || "0" };  
            }  
            if (match != null) {  
                return { browser : "", version : "0" };  
            }  
        }  
        return uaMatch(userAgent.toLowerCase());          
}
function CheckBrowserCanUpload()
{
	var browserVer = getBrowserVersion();
	var nBrowserVersion = parseInt(browserVer.version,10);
	if("IE"!= browserVer.browser || ("IE"== browserVer.browser && (nBrowserVersion < 6 || nBrowserVersion > 110)))
	{
//		return false;
	}
	return true;
}
function getFileName(o){
    var pos=o.lastIndexOf("\\");
    return o.substring(pos+1);  
}

function IsPasswordStr(str)
{
	var reg = /^[0-9_a-zA-Z~!@#$%^&*()-+=.]{8,16}$/;
	if(reg.test(str) == false)
	{
		// 密码非法，不能包含< > / \ ?特殊字符，且为6-20长度
		return 1;
	}
	reg = /^[0-9]{6,16}$/;
	if(reg.test(str) == true)
	{
		// 不能纯数字，至少包含数字、字母、特殊字符中的两种
		return 2;
	}
	reg = /^[a-zA-Z]{6,16}$/;
	if(reg.test(str) == true)
	{
		// 不能纯字母，至少包含数字、字母、特殊字符中的两种
		return 2;
	}
	reg = /^[~!@#$%^&*()-+=.]{6,16}$/;
	if(reg.test(str) == true)
	{
		// 不能纯特殊字符，至少包含数字、字母、特殊字符中的两种
		return 4;
	}
	return 0;
}
function IsDeviceNameStr(str)
{
	var reg = /[^?<>\/\\;:"|&]{1,128}$/;
	return reg.test(str);
}
function html_encode(str)
{
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/</g, "&lt;");
    s = s.replace(/>/g, "&gt;");
	s = s.replace(/ /g, "&nbsp;");
    return s;
 }
  
// 是否有特殊字符
function CheckInputNum(e)
{
	var k = window.event ? e.keyCode : e.which;
	// 去除\ / : * ? " < > | &
	if ( k == 92 || k == 47 || k == 58 || k == 42 ||
			k == 63 || k == 34 || k == 60 || k == 62 ||
			k == 124 || k == 38)
	{
		if (window.event) 
		{                    
		window.event.returnValue = false;
		}                
		else
		{
			e.preventDefault();
		}            
	}
}
// 检测密码强度等级
function CheckPasswordLevel(pass)
{
	var eleLabel = document.getElementById("id_labelcheckpass");
	if(eleLabel == null)
	{
		return ;
	}
	// 密码强度弱，仅包含数字和字母
	// 密码强度中，仅包含数字和一个特殊字符、含字母和一个特殊字符
	// 密码强度强，包含数字、字母、多个特殊字符
}
// 修改密码
function clickchangepass()
{
	var div = document.getElementById("id_divchangepass");
	var divHide = document.getElementById("id_divhidemain");
	div.style.display = "block";
	divHide.style.display = "block";
}
function clickBtnCancelChangePass()
{
	var div = document.getElementById("id_divchangepass");
	var divHide = document.getElementById("id_divhidemain");
	div.style.display = "none";
	divHide.style.display = "none";
}
// 注销
function LogoutCallBack(text, ret)
{
	// 注销必定成功
	location = "index.html";
}
function clicklogout(type)
{
    if(0 == type)
	{
		var r=myConfirm("确认注销");
		if (r==false)
		{
			return false;
		}
	}

	
	if(null == g_session || "" == g_session){
		return true;
	}
	
	var reqData =
		"<TKlmsLogoutReq>" +
			"<command>2</command>" +
			"<session>" + g_session + "</session>" +
		"</TKlmsLogoutReq>";
	PostAjaxSyncReq(req_cgiUrl, reqData, LogoutCallBack);
	return true;
	//var r=myConfirm("确认注销");
	//if (r==false)
	//{
	//	return false;
	//}
	
	//$.messager.confirm("操作提示", "确认注销", function (data) {  
	//		if (data) {
	//			var reqData =
	//			"<TKlmsLogoutReq>" +
	//				"<command>2</command>" +
	//				"<session>" + g_session + "</session>" +
	//			"</TKlmsLogoutReq>";
	//		PostAjaxSyncReq(req_cgiUrl, reqData, LogoutCallBack);
	//		}
	//    });
	//return true;
}
// 修改密码确定
function ChangePassCallBack(text, ret)
{
	var xmlDoc = text.documentElement;
//	xmlDoc = getXMLDOC();
//	xmlDoc.loadXML(text);
	var eleRet = xmlDoc.getElementsByTagName(xml_ret);
	if(eleRet.length > 0)
	{
		if(eleRet[0].childNodes[0].nodeValue == 0)
		{
			myAlert("修改密码成功，请重新登录");
			var reqData =
				"<TKlmsLogoutReq>" +
					"<command>2</command>" +
					"<session>" + g_session + "</session>" +
				"</TKlmsLogoutReq>";
			PostAjaxReq(req_cgiUrl, reqData, LogoutCallBack);
			location.href = "";
			return;
		}
	}
	var eleErr = xmlDoc.getElementsByTagName(xml_errdesc);
	myAlert("修改密码失败，错误:"+ eleErr[0].childNodes[0].nodeValue);
}
function clickBtnComfirmChangePass()
{
	var inputOldPass = document.getElementById("id_inputoldpass");
	var inputNewPass = document.getElementById("id_inputnewpass");
	var inputNewPass2 = document.getElementById("id_inputnewpass2");
	var divChangePass = document.getElementById("id_divchangepass");
	
	var olduser = getCookie(xml_user);
	var oldpass = getCookie(xml_pass);
	var oldpass2 = inputOldPass.value;
	var newpass = inputNewPass.value;
	var newpass2 = inputNewPass2.value;
	if(oldpass == "" || newpass == "" || newpass2 == "")
	{
		myAlert("用户名或密码不能为空");
		return ;
	}
	if(oldpass != oldpass2)
	{
		myAlert("原密码错误");
		return ;
	}
	
	if(oldpass == newpass)
	{
		myAlert("新密码和旧密码相同");
		return ;
	}
	var nRet = IsPasswordStr(newpass);
	if(nRet != 0)
	{
		switch(nRet)
		{
		case 1:
			alert("密码非法，密码包含数字、字母、特殊字符等，且为8-16长度");
			break;
		case 2:
			alert("不能纯数字，至少包含数字、字母、特殊字符中的两种");
			break;
		case 3:
			alert("不能纯字母，至少包含数字、字母、特殊字符中的两种");
			break;
		case 4:
			alert("不能纯特殊字符，至少包含数字、字母、特殊字符中的两种");
			break;
		default:
			alert("密码非法，密码包含数字、字母、特殊字符等，且为8-16长度");
			break;
		}
		return;
	}
	if(newpass != newpass2)
	{
		myAlert("新密码输入不一致");
		return ;
	}
	var reqData =
		"<TKlmsModPassReq>" +
			"<command>3</command>" +
			"<session>" + g_session + "</session>" +
			"<olduser>" + olduser + "</olduser>" +
			"<oldpass>" + oldpass + "</oldpass>" +
			"<newuser>" + newpass + "</newuser>" +
			"<newpass>" + newpass2 + "</newpass>" +
		"</TKlmsModPassReq>";
	PostAjaxReq(req_cgiUrl, reqData, ChangePassCallBack);
	
	// 清空数据
	inputOldPass.value = "";
	inputNewPass.value = "";
	inputNewPass2.value = "";
	divChangePass.style.display = "none";
}

// 心跳
var g_nSession = "";
function getSession()
{
	if(g_nSession != "")
	{
		return ;
	}
	g_nSession = getCookie(cookie_session);
}
var g_nFailAliveCount = 0;
function CheckHeartAliveCallBack(text, ret)
{
	if(ret == false)
	{
		return ;
	}
	var xmlDoc = text.documentElement;
	var eleRet = xmlDoc.getElementsByTagName(xml_ret);
	if(eleRet[0].childNodes[0].nodeValue != 0)
	{
		var eleErr = xmlDoc.getElementsByTagName(xml_errdesc);
		var desc = (eleErr.length > 0 && eleErr[0].childNodes.length > 0) ? eleErr[0].childNodes[0].nodeValue : "未知";
		alert("用户已被强制登出:" + desc);
		location = "./index.html";
		return;
	}
	g_nFailAliveCount = 0;
}
function CheckHeartAlive()
{
	getSession();
	g_nFailAliveCount++;
	if(g_nFailAliveCount > 6)
	{
		return ;
	}
	if(g_nFailAliveCount == 6)
	{
		alert("服务器未响应");
		location = "./index.html";
		return ;
	}
	var reqData =
		"<TKlmsHeartAliveReq>" +
			"<command>17</command>" +
			"<session>" + g_nSession + "</session>" +
		"</TKlmsHeartAliveReq>";
	PostAjaxReq(req_cgiUrl, reqData, CheckHeartAliveCallBack);
	//setTimeout("CheckHeartAlive()", timerout_short);
}













