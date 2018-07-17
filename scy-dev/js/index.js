
var g_bSupport = 1;

var g_session = "";		// session号
var g_user = "";
var g_pass = "";
var g_bOpenSysCrtl = 0;	// 系统维护是否已展开
var g_nSelectBlock = 0;	// 当前选择的tab页  0:许可证管理  1:设备授权管理  2:系统维护  3:系统维护-版本控制  4:系统维护-黑名单管理  5:日志管理
function webindextest(text)
{
	setCookie(cookie_session, text);
}

function HidePassAndShowText()
{
	var pass = document.getElementById("id_inputpass");
	if(pass.value != "")
	{
		return;
	}
	var passtmp = document.getElementById("id_inputpasstmp");
	pass.style.display = 'none';
	passtmp.style.display = 'block';
}

function HideTextAndShowPass()
{
	var pass = document.getElementById("id_inputpass");
	var passtmp = document.getElementById("id_inputpasstmp");
	passtmp.style.display = 'none';
	pass.style.display = 'block';
	pass.focus();
}
function clickbtnlicensectrl()
{
	g_nSelectBlock = 0;
	var ele1 = document.getElementById("id_iframelicensectrl");
	var ele2 = document.getElementById("id_iframedevctrl");
	var ele3 = document.getElementById("id_iframelogctrl");
	var ele4 = document.getElementById("id_iframeverctrl");
	var ele5 = document.getElementById("id_iframeblackctrl");
	ele1.style.display = "block";
	if(ele2.style.display != "none")ele2.style.display = "none";
	if(ele3.style.display != "none")ele3.style.display = "none";
	if(ele4.style.display != "none")ele4.style.display = "none";
	if(ele5.style.display != "none")ele5.style.display = "none";
	
	// 改变按钮颜色
	var btnlicense = document.getElementById("id_btnlicensectrl");
	var btndevice = document.getElementById("id_btndevctrl");
	var btnver = document.getElementById("id_btnverctrl");
	var btnblack = document.getElementById("id_btnblackctrl");
	var btnlog = document.getElementById("id_btnlogctrl");
	btnlicense.style.background = color_btnmainselected;
	btnlicense.style.color = color_btnnormal;
	btndevice.style.background = color_btnnormal;
	btndevice.style.color = color_btnmainselected;
	btnver.style.background = color_btnnormal;
	btnver.style.color = color_btnmainselected;
	btnblack.style.background = color_btnnormal;
	btnblack.style.color = color_btnmainselected;
	btnlog.style.background = color_btnnormal;
	btnlog.style.color = color_btnmainselected;
}
function clickbtndevctrl()
{
	g_nSelectBlock = 1;
	var ele1 = document.getElementById("id_iframelicensectrl");
	var ele2 = document.getElementById("id_iframedevctrl");
	var ele3 = document.getElementById("id_iframelogctrl");
	var ele4 = document.getElementById("id_iframeverctrl");
	var ele5 = document.getElementById("id_iframeblackctrl");
	if(ele1.style.display != "none")ele1.style.display = "none";
	ele2.style.display = "block";
	if(ele3.style.display != "none")ele3.style.display = "none";
	if(ele4.style.display != "none")ele4.style.display = "none";
	if(ele5.style.display != "none")ele5.style.display = "none";
	
	// 改变按钮颜色
	var btnlicense = document.getElementById("id_btnlicensectrl");
	var btndevice = document.getElementById("id_btndevctrl");
	var btnver = document.getElementById("id_btnverctrl");
	var btnblack = document.getElementById("id_btnblackctrl");
	var btnlog = document.getElementById("id_btnlogctrl");
	btnlicense.style.background = color_btnnormal;
	btnlicense.style.color = color_btnmainselected;
	btndevice.style.background = color_btnmainselected;
	btndevice.style.color = color_btnnormal;
	btnver.style.background = color_btnnormal;
	btnver.style.color = color_btnmainselected;
	btnblack.style.background = color_btnnormal;
	btnblack.style.color = color_btnmainselected;
	btnlog.style.background = color_btnnormal;
	btnlog.style.color = color_btnmainselected;
}

function clickbtnsysctrl()
{
	g_nSelectBlock = 2;
	if(g_bOpenSysCrtl == 0)
	{
		var eleVer = document.getElementById("id_btnverctrl");
		var eleBlack = document.getElementById("id_btnblackctrl");
		if(eleVer)eleVer.style.display = "block";
		if(eleBlack)eleBlack.style.display = "block";
		g_bOpenSysCrtl = 1;
	}
	else
	{
		var eleVer = document.getElementById("id_btnverctrl");
		var eleBlack = document.getElementById("id_btnblackctrl");
		if(eleVer)eleVer.style.display = "none";
		if(eleBlack)eleBlack.style.display = "none";
		g_bOpenSysCrtl = 0;
	}
	// 改变按钮颜色
	var btnlicense = document.getElementById("id_btnlicensectrl");
	var btndevice = document.getElementById("id_btndevctrl");
	var btnver = document.getElementById("id_btnverctrl");
	var btnblack = document.getElementById("id_btnblackctrl");
	var btnlog = document.getElementById("id_btnlogctrl");
	btnlicense.style.background = color_btnnormal;
	btnlicense.style.color = color_btnmainselected;
	btndevice.style.background = color_btnnormal;
	btndevice.style.color = color_btnmainselected;
	btnver.style.background = color_btnnormal;
	btnver.style.color = color_btnmainselected;
	btnblack.style.background = color_btnnormal;
	btnblack.style.color = color_btnmainselected;
	btnlog.style.background = color_btnnormal;
	btnlog.style.color = color_btnmainselected;
	
	return ;
	/* 点击系统维护暂不切换页面
	var ele1 = document.getElementById("id_iframelicensectrl");
	var ele2 = document.getElementById("id_iframedevctrl");
	var ele3 = document.getElementById("id_iframelogctrl");
	var ele4 = document.getElementById("id_iframeverctrl");
	var ele5 = document.getElementById("id_iframeblackctrl");
	if(ele1.style.display != "none")ele1.style.display = "none";
	if(ele2.style.display != "none")ele2.style.display = "none";
	if(ele3.style.display != "none")ele3.style.display = "none";
	ele4.style.display = "block";
	if(ele5.style.display != "none")ele5.style.display = "none";
	*/
}
function clickbtnverctrl()
{
	g_nSelectBlock = 3;
	var ele1 = document.getElementById("id_iframelicensectrl");
	var ele2 = document.getElementById("id_iframedevctrl");
	var ele3 = document.getElementById("id_iframelogctrl");
	var ele4 = document.getElementById("id_iframeverctrl");
	var ele5 = document.getElementById("id_iframeblackctrl");
	if(ele1.style.display != "none")ele1.style.display = "none";
	if(ele2.style.display != "none")ele2.style.display = "none";
	if(ele3.style.display != "none")ele3.style.display = "none";
	ele4.style.display = "block";
	if(ele5.style.display != "none")ele5.style.display = "none";
	
	// 改变按钮颜色
	var btnlicense = document.getElementById("id_btnlicensectrl");
	var btndevice = document.getElementById("id_btndevctrl");
	var btnver = document.getElementById("id_btnverctrl");
	var btnblack = document.getElementById("id_btnblackctrl");
	var btnlog = document.getElementById("id_btnlogctrl");
	btnlicense.style.background = color_btnnormal;
	btnlicense.style.color = color_btnmainselected;
	btndevice.style.background = color_btnnormal;
	btndevice.style.color = color_btnmainselected;
	btnver.style.background = color_btnmainselected;
	btnver.style.color = color_btnnormal;
	btnblack.style.background = color_btnnormal;
	btnblack.style.color = color_btnmainselected;
	btnlog.style.background = color_btnnormal;
	btnlog.style.color = color_btnmainselected;
}
function clickbtnblackctrl()
{
	g_nSelectBlock = 4;
	var ele1 = document.getElementById("id_iframelicensectrl");
	var ele2 = document.getElementById("id_iframedevctrl");
	var ele3 = document.getElementById("id_iframelogctrl");
	var ele4 = document.getElementById("id_iframeverctrl");
	var ele5 = document.getElementById("id_iframeblackctrl");
	if(ele1.style.display != "none")ele1.style.display = "none";
	if(ele2.style.display != "none")ele2.style.display = "none";
	if(ele3.style.display != "none")ele3.style.display = "none";
	if(ele4.style.display != "none")ele4.style.display = "none";
	ele5.style.display = "block";
	
	// 改变按钮颜色
	var btnlicense = document.getElementById("id_btnlicensectrl");
	var btndevice = document.getElementById("id_btndevctrl");
	var btnver = document.getElementById("id_btnverctrl");
	var btnblack = document.getElementById("id_btnblackctrl");
	var btnlog = document.getElementById("id_btnlogctrl");
	btnlicense.style.background = color_btnnormal;
	btnlicense.style.color = color_btnmainselected;
	btndevice.style.background = color_btnnormal;
	btndevice.style.color = color_btnmainselected;
	btnver.style.background = color_btnnormal;
	btnver.style.color = color_btnmainselected;
	btnblack.style.background = color_btnmainselected;
	btnblack.style.color = color_btnnormal;
	btnlog.style.background = color_btnnormal;
	btnlog.style.color = color_btnmainselected;
}
function clickbtnlogctrl()
{
	g_nSelectBlock = 5;
	var ele1 = document.getElementById("id_iframelicensectrl");
	var ele2 = document.getElementById("id_iframedevctrl");
	var ele3 = document.getElementById("id_iframelogctrl");
	var ele4 = document.getElementById("id_iframeverctrl");
	var ele5 = document.getElementById("id_iframeblackctrl");
	if(ele1.style.display != "none")ele1.style.display = "none";
	if(ele2.style.display != "none")ele2.style.display = "none";
	ele3.style.display = "block";
	if(ele4.style.display != "none")ele4.style.display = "none";
	if(ele5.style.display != "none")ele5.style.display = "none";
	
	// 改变按钮颜色
	var btnlicense = document.getElementById("id_btnlicensectrl");
	var btndevice = document.getElementById("id_btndevctrl");
	var btnver = document.getElementById("id_btnverctrl");
	var btnblack = document.getElementById("id_btnblackctrl");
	var btnlog = document.getElementById("id_btnlogctrl");
	btnlicense.style.background = color_btnnormal;
	btnlicense.style.color = color_btnmainselected;
	btndevice.style.background = color_btnnormal;
	btndevice.style.color = color_btnmainselected;
	btnver.style.background = color_btnnormal;
	btnver.style.color = color_btnmainselected;
	btnblack.style.background = color_btnnormal;
	btnblack.style.color = color_btnmainselected;
	btnlog.style.background = color_btnmainselected;
	btnlog.style.color = color_btnnormal;
}
function loadCookie(type)
{
	var remember = getCookie(cookie_remember);
	if(remember == "yes")
	{
		var user = getCookie(xml_user);
		if(user)
		{
			document.getElementById("id_inputuser").value = user;
		}
		var psw = getCookie(xml_pass);
		if (psw)
		{
			document.getElementById("id_inputpass").value = psw;
		}
		document.getElementById("id_inputcheckbox").checked = 1;
	}
}

function LoginCallBack(text, ret)
{
	
	console.log("ret:"+ret);
	console.log("text"+text);
	
	if(!ret)
	{
		alert("服务器异常，登录失败");
		return ;
	}
	if(ret == false){
		elmErrinfo.innerHTML = "登录失败，链接服务器异常";
		return ;
	}
	
	if(0 == text.length){
		myAlert("登录失败，服务器返回数据异常");
		return ;
	}
	
	var rspData = JSON.parse(text);
	console.log("rspData",rspData);
	if(0 != rspData.errorno){
		myAlert("登录失败，错误:" + rspData.errordes);
	}else{
//		setCookie(cookie_session, g_session);
//		setCookie(cookie_needindex, "no");
		location="dev_mes.html";
	}
}

function LoginCallBack(text, ret)
{
	
	console.log("ret:"+ret);
	console.log("text"+text);
	
	if(!ret)
	{
		alert("服务器异常，登录失败");
		return ;
	}
	if(ret == false){
		elmErrinfo.innerHTML = "登录失败，链接服务器异常";
		return ;
	}
	
	if(0 == text.length){
		myAlert("登录失败，服务器返回数据异常");
		return ;
	}
	
	var rspData = JSON.parse(text);
	console.log("rspData",rspData);
	if(0 != rspData.errorno){
		myAlert("登录失败，错误:" + rspData.errordes);
	}else{
//		setCookie(cookie_session, g_session);
//		setCookie(cookie_needindex, "no");
		location="dev_mes.html";
	}
}

function ClickLogin()
{

	var User = $("#username");
	var Pass = $("#password");
	var UserValue = $("#username").val();
	var PassValue = $("#password").val();
	if(User && Pass)
	{
		if(User.value == "" || Pass.value == "")
		{
			alert("用户名或密码不能为空");
			return ;
		}
		var reqData = {};
		reqData.name = UserValue;
		reqData.password = PassValue;
		reqData.eventcode = 1;
		reqData.eventname = "LoginReq";
		var reqdata = JSON.stringify(reqData);       //转为JSON字符串 
		console.log(reqdata );
		PostAjaxReq(req_cgiUrl, reqdata, LoginCallBack);
	}
}

// 登录按钮
function OverBtnLogin()
{
	var btn = document.getElementById("id_btnlogin");
	if(btn)
	{
		btn.style.background = "#73BDF9";
	}
}

function OutBtnLogin()
{
	var btn = document.getElementById("id_btnlogin");
	if(btn)
	{
		btn.style.background = "#4EA0E5";
	}
}

function DownBtnLogin()
{
	var btn = document.getElementById("id_btnlogin");
	if(btn)
	{
		btn.style.background = "#317EBD";
	}
}

function UpBtnLogin()
{
	var btn = document.getElementById("id_btnlogin");
	if(btn)
	{
		btn.style.background = "#73BDF9";
	}
}
// License管理按钮
function OverBtnLicenseCtrl()
{
	var btn = document.getElementById("id_btnlicensectrl");
	if(btn)
	{
		btn.style.background = color_btnover;
	}
}
function OutBtnLicenseCtrl()
{
	var btn = document.getElementById("id_btnlicensectrl");
	if(btn)
	{
		if(g_nSelectBlock != 0)
		{
			btn.style.background = color_btnnormal;
			btn.style.color = color_btnmainselected;
		}
		else
		{
			btn.style.background = color_btnmainselected;
			btn.style.color = color_btnnormal;
		}
	}
}
function DownBtnLicenseCtrl()
{
	var btn = document.getElementById("id_btnlicensectrl");
	if(btn)
	{
		btn.style.background = color_btndown;
		btn.style.color = color_btnnormal;
	}
}
function UpBtnLicenseCtrl()
{
	var btn = document.getElementById("id_btnlicensectrl");
	if(btn)
	{
		btn.style.background = color_btnover;
	}
}
// 设备授权维护按钮
function OverBtnDevCtrl()
{
	var btn = document.getElementById("id_btndevctrl");
	if(btn)
	{
		btn.style.background = color_btnover;
	}
}
function OutBtnDevCtrl()
{
	var btn = document.getElementById("id_btndevctrl");
	if(btn)
	{
		if(g_nSelectBlock != 1)
		{
			btn.style.background = color_btnnormal;
			btn.style.color = color_btnmainselected;
		}
		else
		{
			btn.style.background = color_btnmainselected;
			btn.style.color = color_btnnormal;
		}
	}
}
function DownBtnDevCtrl()
{
	var btn = document.getElementById("id_btndevctrl");
	if(btn)
	{
		btn.style.background = color_btndown;
		btn.style.color = color_btnnormal;
	}
}
function UpBtnDevCtrl()
{
	var btn = document.getElementById("id_btndevctrl");
	if(btn)
	{
		btn.style.background = color_btnover;
	}
}
// 系统维护按钮
function OverBtnSysCtrl()
{
	var btn = document.getElementById("id_btnsysctrl");
	if(btn)
	{
		btn.style.background = color_btnover;
	}
}
function OutBtnSysCtrl()
{
	var btn = document.getElementById("id_btnsysctrl");
	if(btn)
	{
		btn.style.background = color_btnnormal;
		btn.style.color = color_btnmainselected;
	}
}
function DownBtnSysCtrl()
{
	var btn = document.getElementById("id_btnsysctrl");
	if(btn)
	{
		btn.style.background = color_btndown;
		btn.style.color = color_btnnormal;
	}
}
function UpBtnSysCtrl()
{
	var btn = document.getElementById("id_btnsysctrl");
	if(btn)
	{
		btn.style.background = color_btnover;
	}
}
// 版本控制按钮
function OverBtnVerCtrl()
{
	var btn = document.getElementById("id_btnverctrl");
	if(btn)
	{
		btn.style.background = color_btnover;
	}
}
function OutBtnVerCtrl()
{
	var btn = document.getElementById("id_btnverctrl");
	if(btn)
	{
		if(g_nSelectBlock != 3)
		{
			btn.style.background = color_btnnormal;
			btn.style.color = color_btnmainselected;
		}
		else
		{
			btn.style.background = color_btnmainselected;
			btn.style.color = color_btnnormal;
		}
	}
}
function DownBtnVerCtrl()
{
	var btn = document.getElementById("id_btnverctrl");
	if(btn)
	{
		btn.style.background = color_btndown;
		btn.style.color = color_btnnormal;
	}
}
function UpBtnVerCtrl()
{
	var btn = document.getElementById("id_btnverctrl");
	if(btn)
	{
		btn.style.background = color_btnover;
	}
}
// 黑名单管理按钮
function OverBtnBlackCtrl()
{
	var btn = document.getElementById("id_btnblackctrl");
	if(btn)
	{
		btn.style.background = color_btnover;
	}
}
function OutBtnBlackCtrl()
{
	var btn = document.getElementById("id_btnblackctrl");
	if(btn)
	{
		if(g_nSelectBlock != 4)
		{
			btn.style.background = color_btnnormal;
			btn.style.color = color_btnmainselected;
		}
		else
		{
			btn.style.background = color_btnmainselected;
			btn.style.color = color_btnnormal;
		}
	}
}
function DownBtnBlackCtrl()
{
	var btn = document.getElementById("id_btnblackctrl");
	if(btn)
	{
		btn.style.background = color_btndown;
		btn.style.color = color_btnnormal;
	}
}
function UpBtnBlackCtrl()
{
	var btn = document.getElementById("id_btnblackctrl");
	if(btn)
	{
		btn.style.background = color_btnover;
	}
}
// 日志搜索按钮
function OverBtnLogCtrl()
{
	var btn = document.getElementById("id_btnlogctrl");
	if(btn)
	{
		btn.style.background = color_btnover;
	}
}
function OutBtnLogCtrl()
{
	var btn = document.getElementById("id_btnlogctrl");
	if(btn)
	{
		if(g_nSelectBlock != 5)
		{
			btn.style.background = color_btnnormal;
			btn.style.color = color_btnmainselected;
		}
		else
		{
			btn.style.background = color_btnmainselected;
			btn.style.color = color_btnnormal;
		}
	}
}
function DownBtnLogCtrl()
{
	var btn = document.getElementById("id_btnlogctrl");
	if(btn)
	{
		btn.style.background = color_btndown;
		btn.style.color = color_btnnormal;
	}
}
function UpBtnLogCtrl()
{
	var btn = document.getElementById("id_btnlogctrl");
	if(btn)
	{
		btn.style.background = color_btnover;
	}
}
// 修改密码
function clickchangepass()
{
	var div = document.getElementById("id_divchangepass");
	div.style.display = "block";
}
function clickBtnCancelChangePass()
{
	var div = document.getElementById("id_divchangepass");
	div.style.display = "none";
}
// 注销
function LogoutCallBack(text, ret)
{
	// 注销必定成功
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
function OverBtnComfirmChangePass()
{
	var btn = document.getElementById("id_btncomfirmchangepass");
	if(btn)
	{
		btn.style.background = color_btnover;
	}
}
function OutBtnComfirmChangePass()
{
	var btn = document.getElementById("id_btncomfirmchangepass");
	if(btn)
	{
		btn.style.background = "#E0E0E0";
	}
}
function DownBtnComfirmChangePass()
{
	var btn = document.getElementById("id_btncomfirmchangepass");
	if(btn)
	{
		btn.style.background = "#317EBD";
	}
}
function UpBtnComfirmChangePass()
{
	var btn = document.getElementById("id_btncomfirmchangepass");
	if(btn)
	{
		btn.style.background = "#73BDF9";
	}
}
// 修改密码取消
function clickBtnCancelChangePass()
{
	// 清空数据
	var inputOldUser = document.getElementById("id_inputolduser");
	var inputOldPass = document.getElementById("id_inputoldpass");
	var inputNewPass = document.getElementById("id_inputnewpass");
	var inputNewPass2 = document.getElementById("id_inputnewpass2");
	var divChangePass = document.getElementById("id_divchangepass");
	inputOldUser.value = "";
	inputOldPass.value = "";
	inputNewPass.value = "";
	inputNewPass2.value = "";
	divChangePass.style.display = "none";
}
function OverBtnCancelChangePass()
{
	var btn = document.getElementById("id_btncancelchangepass");
	if(btn)
	{
		btn.style.background = color_btnover;
	}
}
function OutBtnCancelChangePass()
{
	var btn = document.getElementById("id_btncancelchangepass");
	if(btn)
	{
		btn.style.background = "#E0E0E0";
	}
}
function DownBtnCancelChangePass()
{
	var btn = document.getElementById("id_btncancelchangepass");
	if(btn)
	{
		btn.style.background = "#317EBD";
	}
}
function UpBtnCancelChangePass()
{
	var btn = document.getElementById("id_btncancelchangepass");
	if(btn)
	{
		btn.style.background = "#73BDF9";
	}
}
// 检测浏览器版本
function CheckBrowserVersion()
{
	var browserVer = getBrowserVersion();
	var nBrowserVersion = parseInt(browserVer.version,10);
	if("IE"!= browserVer.browser || ("IE"== browserVer.browser && nBrowserVersion < 6))
	{
		alert("请使用IE内核的浏览器，并尽量使用IE6以上版本");
		return false;
	}
	g_bSupport = 1;
	return true;
}








