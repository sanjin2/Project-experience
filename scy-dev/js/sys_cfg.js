function adpMngServerInfoReqCallBack(text, ret)
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
		myAlert("添加服务器，错误:" + rspData.errordes);
	}else{
//		if(rspData.errorno == 0){
//			 layer.alert("添加成功！");
//						}
		
		
		var serverinfos = rspData.serverinfos;
		var serverinfosArr = [];
		if(serverinfos != null){
		for( var i = 0; i < serverinfos.length; i++) {
				serverinfosItem = {
					serverip           : serverinfos[i].serverip ,
					serverport         : serverinfos[i].serverport,
					contrltype         : serverinfos[i].contrltype,
					connectstates      : serverinfos[i].connectstates,
					serverdec          : serverinfos[i].serverdec,
				}
				if(serverinfosItem.contrltype == 0){
					serverinfosItem.contrltype = "辅控";
				}
				if(serverinfosItem.contrltype == 1){
					serverinfosItem.contrltype = "主控";
				}
				if(serverinfosItem.connectstates == 0){
					serverinfosItem.connectstates = "未连接";
				}
				if(serverinfosItem.connectstates == 1){
					serverinfosItem.connectstates = "正常连接";
				}
				serverinfosArr.push(serverinfosItem);
				} //forEnd
				
				for(var j = 0; j < serverinfosArr.length; j++) {
					var serverinfosItems = serverinfosArr[j];
					$('#serverconfig').bootstrapTable('append', serverinfosItems);
	
				}
			}
	}
}
function addServerInfoReqCallBack(text, ret)
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
		myAlert("添加服务器，错误:" + rspData.errordes);
	}else{
		if(rspData.errorno == 0){
			 layer.alert("添加成功！");
						}
		
		
//		var serverinfos = rspData.serverinfos;
//		var serverinfosArr = [];
//		if(serverinfos != null){
//		for( var i = 0; i < serverinfos.length; i++) {
//				serverinfosItem = {
//					serverip           : serverinfos[i].serverip ,
//					serverport         : serverinfos[i].serverport,
//					contrltype         : serverinfos[i].contrltype,
//					connectstates      : serverinfos[i].connectstates,
//					serverdec          : serverinfos[i].serverdec,
//				}
//				serverinfosArr.push(serverinfosItem);
//				} //forEnd
//				
//				for(var j = 0; j < serverinfosArr.length; j++) {
//					var serverinfosItems = serverinfosArr[j];
//					$('#serverconfig').bootstrapTable('append', serverinfosItems);
//	
//				}
//			}
	}
}

function modifyServerReqCallBack(text, ret)
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
		myAlert("添加服务器，错误:" + rspData.errordes);
	}else{
		
		var serverinfos = rspData.serverinfos;
		var serverinfosArr = [];
		if(serverinfos != null){
//		for( var i = 0; i < serverinfos.length; i++) {
//				serverinfosItem = {
//					serverip           : serverinfos[i].serverip ,
//					serverport         : serverinfos[i].serverport,
//					contrltype         : serverinfos[i].contrltype,
//					connectstates      : serverinfos[i].connectstates,
//					serverdec          : serverinfos[i].serverdec,
//				}
//				serverinfosArr.push(serverinfosItem);
//				} //forEnd
				
//				for(var j = 0; j < serverinfosArr.length; j++) {
//					var serverinfosItems = serverinfosArr[j];
//					$('#serverconfig').bootstrapTable('append', serverinfosItems);
//	
//				}
			}
	}
}

function deleteServerReqCallBack(text, ret)
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
		myAlert("添加服务器，错误:" + rspData.errordes);
	}else{
		
		var serverinfos = rspData.serverinfos;
		var serverinfosArr = [];
		if(serverinfos != null){

			}
	}
}

function netCardInfoReqCallBack(text, ret)
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
		myAlert("添加服务器，错误:" + rspData.errordes);
	}else{
		
		var netinfocfgs = rspData.netinfocfgs;
		if(netinfocfgs != null){
			$("#netname").empty();
			for(var i = 0;i<netinfocfgs.length;i++){
				var netname = $("<option value="+i+">"+netinfocfgs[i].netname+"</option>");
			netname.appendTo("#netname");
			}
			$("#netip").val(netinfocfgs[0].netip);
			$("#subnetip").val(netinfocfgs[0].subnetip);
			$("#gateIp").val(netinfocfgs[0].gateIp);
			
			$(document).off('change', '#netname').on("change", '#netname', function() {
				var index = parseInt($(this).find("option:selected").val());
				$("#netip").val(netinfocfgs[index].netip);
				$("#subnetip").val(netinfocfgs[index].subnetip);
				$("#gateIp").val(netinfocfgs[index].gateIp);
				
			});
			
			
//			$("#netname").val(netinfocfgs[0].netname);
//			$("#netip").val(netinfocfgs[0].netip);
//			$("#subnetip").val(netinfocfgs[0].subnetip);
//			$("#gateIp").val(netinfocfgs[0].gateIp);
		}
	}
}


function modifyCfgReqCallBack(text, ret)
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
		myAlert("添加服务器，错误:" + rspData.errordes);
	}else{
		
		var serverinfos = rspData.serverinfos;
		var serverinfosArr = [];
		if(serverinfos != null){
//		for( var i = 0; i < serverinfos.length; i++) {
//				serverinfosItem = {
//					serverip           : serverinfos[i].serverip ,
//					serverport         : serverinfos[i].serverport,
//					contrltype         : serverinfos[i].contrltype,
//					connectstates      : serverinfos[i].connectstates,
//					serverdec          : serverinfos[i].serverdec,
//				}
//				serverinfosArr.push(serverinfosItem);
//				} //forEnd
				
//				for(var j = 0; j < serverinfosArr.length; j++) {
//					var serverinfosItems = serverinfosArr[j];
//					$('#serverconfig').bootstrapTable('append', serverinfosItems);
//	
//				}
			}
	}
}