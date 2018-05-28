/**
 * kadacom ajaxtojson
 * @param $
 */
(function($) {
	$.jsonAjax = function(obj) {
		if(!obj.type) {
			obj.type = "post";
		}

		var data = null;
		if("post" == obj.type || "POST" == obj.type) {
			if(null == obj.data) throw "data is null ！";
			try {
				obj.data = JSON.stringify(obj.data);
			} catch(err) {
				throw "不支持该数据类型！";
			}
		}

		if(null == obj.url) throw "url is null ！";
		if(!obj.dataType) {
			obj.dataType = "json";
		}
		if(typeof(obj.global) == "undefined") {
			obj.global = true;
		}
		if(typeof(obj.processData) == "undefined") {
			obj.processData = true;
		}
		obj.contentType = "application/json;charset=utf-8";

		return $.ajax(obj);
	}
})(jQuery);