//获取嵌入iframe的window
function getWindow(id) {
	var iframe = window.frames[id];
	var commonWindow = {};
	if (iframe != null) {
		if (iframe.window) {
			commonWindow = iframe.window;
		} else if (iframe.contentWindow) {
			commonWindow = iframe.contentWindow;
		}
	}
	return commonWindow;
}
//模板函数,专门针对iframe加载延时设计
function execLoadSuccessForIframe(iframeId,fn,params){
	var win = getWindow(iframeId);
	if(win&&win[fn]){
		var func = win[fn];
		func(params);
	}else{
		window.setTimeout(function(){
			execLoadSuccessForIframe(iframeId,fn,params);
		},200);
	}
}

//父页面里面使用

execLoadSuccessForIframe("emap_iframe","loadRouteByList",obj);