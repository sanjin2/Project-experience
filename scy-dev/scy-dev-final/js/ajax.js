var Try = {
	these: function() {
		var returnValue;
		for (var i = 0, length = arguments.length; i < length; i++)
		{
			var lambda = arguments[i];
			try
			{
				returnValue = lambda();
				break;
			} catch (e) {}
		}
		return returnValue;
	}
}

function GetAjaxObj()
{
	return Try.these(
		function() {return new XMLHttpRequest()},
		function() {return new ActiveXObject('Msxml2.XMLHTTP')},
		function() {return new ActiveXObject('Microsoft.XMLHTTP')}
	) || false;
}

function PostAjaxReq(szURI, sztext, fCall, timeout)
{
	if(!arguments[3])
	{
		timeout = 15000;
	}
	if(timeout < 1000)
	{
		timeout = 1000;
	}
	var reqData = sztext;
	if("/kedacomxmldata" == szURI){
		reqData = "<command>json</command><session>gt</session><ret>0</ret><jsoncontent>";
		reqData += sztext;
		reqData += "</jsoncontent>";
	}
	var url = szURI;
	htmlobj = $.ajax({
		type : "POST",
		url : url,
		global : false,
		scriptCharset: "utf-8" ,
		data : reqData,
		async:true,
		contentType: "text/xml; charset=UTF-8",
		success : function(xmlData, textStatus, jqXHR) {
			if("/kedacomxmldata" == szURI){
				var xmlDoc = xmlData.documentElement;
				var elmRet = xmlDoc.getElementsByTagName("jsoncontent");
				if(elmRet.length <= 0){
					fCall("", true);
				}else{
					fCall(elmRet[0].childNodes[0].nodeValue, true);
				}
			}
			
			
			xmlData = null;
		},
		error : function (XMLHttpRequest, textStatus, errorThrown) {
			fCall("失败", false);
		},
		complete: function (XHR, TS){
			try{
 					XHR.onreadystatechange = null;
 					XHR.abort = null;
 					XHR = null;
 					CollectGarbage();
 				}catch(e){}
		},
		dataType : "xml",
		processData: false,
		cache : false,
		timeout : timeout
	});

	return ;
	
	var obj = GetAjaxObj();
	obj.onreadystatechange = function()
	{
		if(obj.readyState==4)
		{
			if(obj.status==200)
			{
				fCall(obj.responseText, true);
			}
			else
			{
				fCall(obj.responseText, false);
			}
			obj.onreadystatechange = function(){};
			obj = null;
		}
	}
	obj.open('POST',szURI,true);
	obj.send(sztext);
}

function PostAjaxSyncReq(szURI, sztext, fCall, timeout)
{
	if(!arguments[3])
	{
		timeout = 10000;
	}
	if(timeout < 1000)
	{
		timeout = 1000;
	}
	var url = szURI;
	htmlobj = $.ajax({
		type : "POST",
		url : url,
		global : false,
		scriptCharset: "utf-8" ,
		data : sztext,
		async:false,
		contentType: "text/xml; charset=UTF-8",
		success : function(xmlData, textStatus, jqXHR) {
			fCall(xmlData, true);
			xmlData = null;
		},
		error : function (XMLHttpRequest, textStatus, errorThrown) {
			fCall("失败", false);
		},
		complete: function (XHR, TS){
			try{
 					XHR.onreadystatechange = null;
 					XHR.abort = null;
 					XHR = null;
 					CollectGarbage();
 				}catch(e){}
		},
		dataType : "xml",
		processData: false,
		cache : false,
		timeout : timeout
	});
	return ;
}

function GetAjaxReq(reqData, fCall, timeout)
{
	if(!arguments[2])
	{
		timeout = 5000;
	}
	if(timeout < 1000)
	{
		timeout = 1000;
	}
	var url = reqData;
	htmlobj = $.ajax({
		type : "POST",
		url : reqData,
		global : false,
		scriptCharset: "utf-8" ,
		data : null,
		async:true,
		contentType: "text/xml; charset=UTF-8",
		success : function(xmlData, textStatus, jqXHR) {
		},
		error : function (XMLHttpRequest, textStatus, errorThrown) {
		},
		complete: function (XHR, TS){
			try{
 				XHR.onreadystatechange = null;
 				XHR.abort = null;
 				XHR = null;
 				CollectGarbage();
 			}catch(e){}
		},
		dataType : "text",
		processData: false,
		cache : false,
		timeout : timeout
	});

	return;
	var obj = GetAjaxObj();
   
	var timeOut = 3000;//超时时间为3秒
	var timer = setTimeout(function(){
		obj.abort();  
	    obj.onreadystatechange = function(){};
		obj = null;
		alert("超时");
	},timeOut);
    obj.onreadystatechange = function()
    {   
		if(obj.readyState==4)
		{
			clearTimeout(timer);
			if(obj.status==200)
			{
				fCall(obj.responseText, true);
			}
			else
			{
				fCall(obj.responseText, false);
			}
			obj.onreadystatechange = function(){};
			obj = null;
		}
	}
	var sendData = reqData + "?" + Math.random();
	obj.open('GET',reqData,true);
	obj.send(null);
}
