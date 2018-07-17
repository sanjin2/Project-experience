function alarm() {
		var reqData = {};
		reqData.eventcode = 7;
		reqData.eventname = "GetAdpMngReq";
		reqData.type = "alarm";
		var reqdata = JSON.stringify(reqData); //转为JSON字符串 
		console.log(reqdata);
		PostAjaxReq(req_cgiUrl, reqdata, alarmCallBack);
	
}

function devMesCallBack(text, ret)
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
//		location="dev_mes.html";
		var admin = rspData.name;
		var username = rspData.adpname;
		var adpid = rspData.adpid;
		if(rspData.errorno == 0){
			 alarm();
						}
		console.log('admin',admin);
		$("#curUserName").text(admin);
		$("#curUserId").text(adpid);
		$("#adpid").val(adpid);
		$("#adpname").val(username);
	}
}



function alarmCallBack(text, ret)
{
	
	console.log("ret:"+ret);
	console.log("text"+text);
	
	if(!ret)
	{
		alert("服务器异常，获取设备失败");
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
//		location="dev_mes.html";
		
			
	}
}

function modifyPasswordCallBack(text, ret)
{
	
	console.log("ret:"+ret);
	console.log("text"+text);
	
	if(!ret)
	{
		alert("服务器异常，获取设备失败");
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
		myAlert("修改密码失败！" + rspData.errordes);
	}else{
		myAlert("修改密码成功！" + rspData.errordes);
//		setCookie(cookie_session, g_session);
//		setCookie(cookie_needindex, "no");
//		location="dev_mes.html";
		
			
	}
}

function modifyCfgMesCallBack(text, ret)
{
	
	console.log("ret:"+ret);
	console.log("text"+text);
	
	if(!ret)
	{
		alert("服务器异常，获取设备失败");
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
		myAlert("修改失败！" + rspData.errordes);
	}else{
	myAlert("修改成功！" + rspData.errordes);
		
			
	}
}

function devInfoCallBack(text, ret)
{
	
	console.log("ret:"+ret);
	console.log("text"+text);
	
	if(!ret)
	{
		alert("服务器异常，获取设备失败");
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
		
		var devinfos = rspData.devinfos;
		var devinfosArr = [];
		if(devinfos != null){
			
		
		for( var i = 0; i < devinfos.length; i++) {
				devinfosItem = {
					devid           : devinfos[i].devid ,
					devname         : devinfos[i].devname,
					manufacId          : devinfos[i].manufacId,
					modelId           : devinfos[i].modelId ,
					contype         : devinfos[i].contype,
					isonline          : devinfos[i].isonline,
					advcfg          : devinfos[i].advcfg,
				}
				if(devinfosItem.contype == 1){
					devinfosItem.contype = "TCP";
				}
				if(devinfosItem.contype == 2){
					devinfosItem.contype = "UDP";
				}
				if(devinfosItem.contype == 3){
					devinfosItem.contype = "COM";
				}
				if(devinfosItem.contype == 4){
					devinfosItem.contype = "TCPSERVER";
				}
				
				
				if(devinfosItem.isonline == -1){
					devinfosItem.isonline = "未知";
				}
				if(devinfosItem.isonline == 0){
					devinfosItem.isonline = "禁用";
				}
				if(devinfosItem.isonline == 1){
					devinfosItem.isonline = "在线";
				}
				if(devinfosItem.isonline == 2){
					devinfosItem.isonline = "离线";
				}
				
				
				
				devinfosArr.push(devinfosItem);
				} //forEnd
				
				for(var j = 0; j < devinfosArr.length; j++) {
					var devinfosItems = devinfosArr[j];
					$('#alarmHost').bootstrapTable('append', devinfosItems);
	
				}
		}   //end if
			
	}
}
