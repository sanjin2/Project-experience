function adpMngVerReqCallBack(text, ret)
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
		
		var verinfos = rspData.verinfos;
		var verinfosArr = [];
		for( var i = 0; i < verinfos.length; i++) {
			
				verinfosItem = {
					name           : verinfos[i].modename ,
					versioninfo    : verinfos[i].version,
					status         : verinfos[i].runstate,
				}
				
				if(verinfosItem.status == 0){
					verinfosItem.status = "连接成功";
				}
				if(verinfosItem.status == 1){
					verinfosItem.status = "连接成功，注册失败";
				}
				if(verinfosItem.status == 2){
					verinfosItem.status = "注册成功";
				}
				
				verinfosArr.push(verinfosItem);
				} //forEnd
				
				for(var j = 0; j < verinfosArr.length; j++) {
					var verinfosItems = verinfosArr[j];
					$('#tb_patrol_plan').bootstrapTable('append', verinfosItems);
	
				}
			



		
			
	}
}

function rebootReqCallBack(text, ret)
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
		
		var verinfos = rspData.verinfos;
		var verinfosArr = [];
//		for( var i = 0; i < verinfos.length; i++) {
//				verinfosItem = {
//					name           : verinfos[i].modename ,
//					versioninfo    : verinfos[i].version,
//					status         : verinfos[i].runstate,
//				}
//				verinfosArr.push(verinfosItem);
//				} //forEnd
				
//				for(var j = 0; j < verinfosArr.length; j++) {
//					var verinfosItems = verinfosArr[j];
//					$('#tb_patrol_plan').bootstrapTable('append', verinfosItems);
//	
//				}
			



		
			
	}
}