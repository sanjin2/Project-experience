var ismp = ismp || {};
/**
 * html5专用方法，将当前访问地址推送到浏览器地址栏，用于实现浏览器的前进后退功能
 */
ismp.pushHistory = function(stateObject, title, url) {
	if(window.applicationCache){
		//支持html5
		history.pushState(stateObject,title,url);
	}
}
/**
 * 
 */
ismp.getHistory = function(event) {
	//TODO 只能拿到当前location的url，不能拿到新的目标地址
	var dsturl = event.target.location.pathname;
	//alert("newurl:"+ dsturl );
}

/**
 * 清除掉对应标签中不容易清除的信息，特别是iframe信息
 */
ismp.clearGarbageById = function(eleId){
	var iframes = $("#" + eleId).find('iframe');
	//console.log("iframe len:"+iframes.length);
	for(var i= iframes.length; i>0 ; --i){
		$(iframes[i-1]).remove();
	}
	
	//清除里面的内容
	$("#" + eleId).empty();
}


ismp.encodeUrl = function(url){
	var newUrl = encodeURI(url);
	if(newUrl.indexOf("?") == -1) {
		newUrl += "?asyncload=true";
	} else {
		newUrl += "&asyncload=true";
	}
	
	return newUrl;
}
/**
 * 刷新box的配置
 */
ismp.refreshBox = function(){
	if($('div').hasClass('comm_box')){
		var boxs = $('.comm_box');
		//console.log(boxs.length);
		if(boxs.length >0){
			boxs.each(function(i, box) { 
				var boxBodyHeight = $(box).height()-$(box).find('.box_header').outerHeight();
				//console.log(boxBodyHeight);
				$(box).find('.box_body').css('height', boxBodyHeight); 
			});
		}
	}
}

/**
 * 刷新部分样式
 */
ismp.refreshStyle= function(){
	//更新样式
	if($('div').hasClass('cont_l') && $('div').hasClass('cont_r')){
		var negx = $('.main_header').outerHeight()+ $('.manu_main_nav').outerHeight()+
			$('.main_footer').outerHeight();
		if($("#manu_sub_nav").is(':visible')){
			negx += $('#manu_sub_nav').outerHeight();
		}else{
			negx += 16;
		}
		
		$(".cont_l").css('height', $(window).height() - negx);
		$(".cont_r").css('height', $(window).height() - negx);
		
	}
	
	ismp.refreshBox();
	
}
/**
 * 向指定容器内加载从后台获取到的html内容，用于页面局部的动态加载
 * @param eleId	要填充的容器
 * @param url		访问的服务器地址
 * @param filter	从服务器获取到的html内容过滤id，只会加载filter内的html数据
 * @param refuseHistory	是否不推送地址栏，为true时不更改地址栏的内容
 */
ismp.loadPath = function(eleId, url, filter, refuseHistory) {
	//超链接没加url或url为js函数调用，不进行拦截
	if(!url || url.indexOf("javascript") == 0) return;
	ismp.clearGarbageById(eleId);
	$("#" + eleId).empty();
	$("#" + eleId).html($("#loadingsec").html());
	var newUrl = encodeURI(url);
	if(newUrl.indexOf("?") == -1) {
		newUrl += "?asyncload=true";
	} else {
		newUrl += "&asyncload=true";
	}
	$.ajax({
		type: "GET",
		url: newUrl,
		dataType: 'html',
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("页面加载失败！error=" + XMLHttpRequest.status);
//			layer.alert("页面加载失败！error=" + XMLHttpRequest.status);
		},
		success: function(data) {
			var $html = $(data);
			if($html.filter("title") && $html.filter("title").text()) {
				document.title = $html.filter("title").text();
			}
			var oldurl = window.location.pathname + window.location.search;
			if(!refuseHistory) {
				ismp.pushHistory(oldurl, document.title, url);
			}
			//			ismp.pushHistory(oldurl, document.title, url);
			//$("#loadingsec").hide();
			if(filter) {
				var newHtml = "";
				if($html.find("#" + filter).length > 0) {
					newHtml = $html.find("#" + filter).html();
				} else if($html.filter("#" + filter).length > 0) {
					newHtml = $html.filter("#" + filter).html();
				} else {
					newHtml = data;
				}
				$("#" + eleId).empty();
				$("#" + eleId).html(newHtml);
			} else {
				$("#" + eleId).empty();
				$("#" + eleId).html(data);
			}
			
			ismp.refreshStyle();
		}
	});
}
/**
 * 向内容区填充数据，并在填充完毕后更新菜单栏
 * 内容区为菜单栏下的区域
 */
ismp.loadContent = function(url) {
	//超链接没加url或url为js函数调用，不进行拦截
	if(!url || url.indexOf("javascript") == 0) return;
	ismp.clearGarbageById("content");
	$("#content").empty();
	$("#content").html($("#loadingsec").html());
	var newUrl = encodeURI(url);
	if(newUrl.indexOf("?") == -1) {
		newUrl += "?asyncload=true";
	} else {
		newUrl += "&asyncload=true";
	}
	$.ajax({
		type: "GET",
		url: newUrl,
		dataType: 'html',
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("页面加载失败！error=" + XMLHttpRequest.status);
//			layer.alert("页面加载失败！error=" + XMLHttpRequest.status);
		},
		success: function(data) {
			var $html = $(data);
			if($html.filter("title") && $html.filter("title").text()) {
				document.title = $html.filter("title").text();
			}
			var oldurl = window.location.pathname + window.location.search;
			ismp.pushHistory(oldurl, document.title, url);
			var newHtml = "";
			if($html.find("#content").length > 0) {
				newHtml = $html.find("#content").html();
			} else if($html.filter("#content").length > 0) {
				newHtml = $html.filter("#content").html();
			} else {
				newHtml = data;
			}
			$("#content").empty();
			$("#content").html(newHtml);
			//加载内容完成后加载菜单区域
			ismp.loadManu();
			
			//刷新样式，放到loadManu更好
			//ismp.refreshStyle();
		}
	});
}
/**
 * 加载头部区域(网站logo及用户信息、告警记录推送区域)
 */
ismp.loadHeader = function() {
	$.ajax({
		type: "GET",
		url: "/header",
		dataType: 'html',
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("header加载失败！error=" + XMLHttpRequest.status);
			loadHeader();
		},
		success: function(data) {
			var $html = $(data);
			$("#head_sec").empty();
			$("#head_sec").html($html.filter("#header_div").html());
		}
	});
}
/**
 * 加载菜单区域
 * 需要保证内容区加载完毕，并且内容区内存在标识当前菜单所属id的belong_option_id隐藏框
 */
ismp.loadManu = function() {
	if($("#belong_option_id").length == 0) {
		//alert("页面没有维护对应的manuid!");
		return false;
	}
	$.ajax({
		type: "GET",
		url: "/manu/" + $("#belong_option_id").val(),
		dataType: 'json',
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("菜单加载失败！error=" + XMLHttpRequest.status);
		},
		success: function(data) {
			ismp.setManu(data);
			
			//更新样式
			ismp.refreshStyle();
		}
	});
}
//菜单处理部分函数
/**
 * 根据菜单对象的属性(二级菜单数据)拼接菜单实际的html字符串
 */
ismp.appendManu = function(optionObj) {
	var inner = '<li class="manu" ><a ';
	if($("#belong_option_id").length == 0) {
		//alert("页面没有维护对应的manuid!");
		return false;
	}
	if($("#belong_option_id").val().indexOf(optionObj.optionId) == 0) {
		inner = '<li class="manu active current" ><a ';
		inner += 'style="color: #0770D5;" ';
		if(optionObj.subOptions && $.isArray(optionObj.subOptions)) {
			$("#option_ul").empty();
			for(idx = 0; idx < optionObj.subOptions.length; ++idx) {
				var subObj = optionObj.subOptions[idx];
				var innerOptHtml = '<li class="manu_opt" ><a ';
				if($("#belong_option_id").val().indexOf(subObj.optionId) == 0) {
					innerOptHtml += 'style="color: #0770D5;" ';
				}
				
				innerOptHtml += 'href="' + subObj.url + '"> ' + subObj.name + '</a></li>';
				$("#option_ul").append(innerOptHtml);
			}
			
			if(optionObj.subOptions.length >0){
				$("#manu_sub_nav").show();
			}
			
			
		}else{
			//暂时使没有二级菜单的，也显示对应的线
			$("#option_ul").empty();
			//$("#manu_sub_nav").show();
		}
	}
	/*if(typeof(optionObj.img) != "undefined" && "" != optionObj.img ){
		inner += 'href="' + optionObj.url + '"><img src="'+optionObj.img+
			'" class="option_img"></img>' + optionObj.name + '</a></li>';
	}else*/ {
		inner += 'href="' + optionObj.url + '">' + optionObj.name + '</a></li>';
	}
	
	$("#manu_ul").append(inner);
}
/**
 * 根据后台获取到的菜单区json对象设置菜单区域的显示内容
 * @param manuInfo 后台获取到的菜单信息json对象
 */
ismp.setManu = function(manuInfo) {
	$("#main_sub_nav").show();
	$("#manu_sub_nav").hide();
	if(manuInfo && manuInfo.optionList && manuInfo.optionList.length) {
		$("#manu_ul").empty();
		//先添加首页链接
		var hpHtml = '<li class="first" ><a href="';
		hpHtml += '/allview';
		/*if('opt' == manuInfo.type) {
			hpHtml += '/optionclient';
		} else {
			hpHtml += '/appclient';
		}*/
		hpHtml += '" class="homepage index"><span class="home_img"></span>首页<span class="line">|</span></a></li>';
		$("#manu_ul").append(hpHtml);
		for(index = 0; index < manuInfo.optionList.length; ++index) {
			ismp.appendManu(manuInfo.optionList[index]);
		}
	}
}
//manu area over
/** 
 * 判断form的内容是否有改变
 * @method    isFormChanged
 * @param    {element}    el            form对象
 * @param    {string}    filter    (Optional)    过滤函数,会被循环调用传递给item作参数要求返回布尔值判断是否过滤
 * 								是为了应对“某些元素值就算是变了，也当作未变”的需求
 * @return    {bool}                    是否改变
 */
ismp.isFormChanged= function (el, filter) {
     filter = filter || function (el) { return false; };
     var els = el.elements, l = els.length, i = 0, j = 0, el, opts;
     for (; i < l ; ++ i, j = 0) {
         el = els[i];
         switch (el.type) {
             case "text":
             case "hidden":
             case "password":
             case "textarea":
                 if (filter(el)) break;
                 if (el.defaultValue != el.value) return true;
                 break;
             case "radio":
             case "checkbox":
                 if (filter(el)) break;
                 if (el.defaultChecked != el.checked) return true;
                 break;
             case "select-one":
                 j = 1;
             case "select-multiple":
                 if (filter(el)) break;
                 opts = el.options;
                 for (; j < opts.length ; ++ j) {
                     if (opts[j].defaultSelected != opts[j].selected) return true;
                 }
                 break;
         }
     }
     return false;
 };
 /**
  * jquery扩展函数，将选中的对象(多为FORM)序列化成json
  */
 (function($){
	$.fn.serializeJson=function(){
		var serializeObj={};
		var array=this.serializeArray();
		var str=this.serialize();
		$(array).each(function(){
			if(serializeObj[this.name]){
				if($.isArray(serializeObj[this.name])){
					//对于复选框/单选框等多项值的对象，序列化为数组
					serializeObj[this.name].push(this.value);
				}else{
					serializeObj[this.name]=[serializeObj[this.name],this.value];
				}
			}else{
				serializeObj[this.name]=this.value;
			}
		});
		return serializeObj;
	};
})(jQuery);
