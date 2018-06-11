//保存按钮	页面数据提交	
$("#save_all").on("click", function(e) {
	e.preventDefault();

	//				$("#alarm_class_cont p input:checked").each(function(index,){
	//					
	//				})

	if($("#alarm_class_cont").has('p').length > 0) {

		//				var getid           = $("#leftTreeJsonData").attr("id"); 
		var getlayertype = parseInt($("#select option:selected").attr("aid"));
		var getlayernodeid = $("#leftTreeJsonData").attr("getlayernodeid");
		var getlayerdevid = $("#leftTreeJsonData").attr("getlayerdevid");
		console.log("getlayernodeid " + getlayernodeid);
		var alarmtype = [];
		$.each($('input[name="check"]:checked'), function() {
			alarmtype.push(parseInt($(this).val()));
		});

		console.log(alarmtype);
		//联动数据 对应ApsAlarmLinkTime结构体
		var LinkData = {};
		//  左边部分
		LinkData.isArming = 1;
		LinkData.devId = getlayerdevid;
		LinkData.nodeId = getlayernodeid;
		LinkData.alarmType = getlayertype;
		LinkData.alarmTypeArr = alarmtype;

		// /左边部分

		// 联动视频源
		var devInfoArr = new Array();
		var linkViewData = {};
		var getSelectRowsView = $("#tb_history_alarms").bootstrapTable('getData');
		if(getSelectRowsView.length > 0) {
			LinkData.isView = 1;
		} else {
			LinkData.isView = 0;
		}
		LinkData.isTvPlan = 0;

		for(var index = 0; index < getSelectRowsView.length; ++index) {
			var LinkView = {};
			LinkView.nodeId = getSelectRowsView[index].chnId;
			LinkView.devId = getSelectRowsView[index].puId;
			LinkView.platId = getSelectRowsView[index].platId;
			LinkView.tvWallId = getSelectRowsView[index].tvWallId;
			LinkView.decoderId = getSelectRowsView[index].decoderId;
			LinkView.tvId = getSelectRowsView[index].tvId;
			LinkView.tvDivId = getSelectRowsView[index].viewNum;

			//						alert(LinkView.nodeId);
			//						alert(LinkView.devId);
			//						alert(LinkView.platId);
			devInfoArr.push(LinkView);
		}

		LinkData.devInfoArr = devInfoArr;

		// /联动视频源

		//联动时间
		var linkTimeData = {};
		var alarmTimeArr = new Array();
		var getSelectRows = $("#tb_history_alarms4").bootstrapTable('getData');
		if(getSelectRows.length > 0) {
			LinkData.isTime = 1;
		} else {
			LinkData.isTime = 0;
		}
		//					alert("isTime" +getSelectRows.length);
		//					alert("LinkData.isTime " + LinkData.isTime);
		//					console.log(getSelectRows);
		for(var index = 0; index < getSelectRows.length; ++index) {
			var LinkTime = {};
			LinkTime.specTimeStr = getSelectRows[index].specTime;
			LinkTime.startTimeStr = getSelectRows[index].startTime;
			LinkTime.endTimeStr = getSelectRows[index].endTime;
			//						alert(getSelectRows[index].specTime);
			//						alert(getSelectRows[index].startTime);
			//						alert(getSelectRows[index].endTime);
			alarmTimeArr.push(LinkTime);
		}
		console.log(getSelectRows);

		LinkData.alarmTimeArr = alarmTimeArr;
		//linkTimeData.alarmTimeArr = alarmTimeArr;
		// /联动时间

		//联动门禁
		//var doorData = {};
		var doorIdArr = new Array();
		var getSelectRows2 = $("#tb_history_alarms5").bootstrapTable('getData');
		console.log(getSelectRows2);
		for(var index = 0; index < getSelectRows2.length; ++index) {
			var LinkDoor = {};
			LinkDoor.nodeId = getSelectRows2[index].id;
			LinkDoor.parentId = getSelectRows2[index].parentId;
			LinkDoor.devId = getSelectRows2[index].devId;
			LinkDoor.layerType = getSelectRows2[index].layerType;
			doorIdArr.push(LinkDoor);
		}
		//doorData.doorIdArr = doorIdArr;
		if(getSelectRows2.length > 0) {
			LinkData.isDoor = 1;
		} else {
			LinkData.isDoor = 0;
		}
		var getoperType = parseInt($("input[name='radio']:checked").val());
		//					alert("getoperType "+ getoperType);
		LinkData.operType = getoperType;

		LinkData.doorIdArr = doorIdArr;
		// /联动门禁

		//设备类型
		var getcurType = $("#curType").text();
		//					alert(getcurType);
		LinkData.devType = getcurType;
		// /设备类型

		// 联动短信
		var getselect_message = $("#select_message option:selected").val();
		var getmessage_phone = $("#message_phone").val();
		var getmsgcontent = $("#getMsgContent").val();
		var get_select_option = $("#select_message").has("option").length;
		if(get_select_option > 0) {
			LinkData.isSms = 1;
		} else {
			LinkData.isSms = 0;
		}
		//					alert(LinkData.isSms);
		LinkData.smsMouldId = getselect_message;
		LinkData.smsPhone = getmessage_phone;
		LinkData.smsContent = getmsgcontent;

		// /联动短信

		console.log(LinkData);

		//					         	/*
		$.jsonAjax({
			url: "/aps/setlinks",
			data: LinkData,
			//				
			success: function(data) {
				console.log(data);
				if(data.ret == true) {
					layer.alert("设置联动成功！");
				} else {
					layer.alert("设置联动失败！请重新提交！");
				}
			},
			error: function(XMLHttpRequest, textStatus,
				errorThrown) {
				alert("告警联动保存失败!code=" + XMLHttpRequest.status);
			}
		});
		//					*/

	} else {
		layer.alert("请选中需要设置的节点！", {
			time: 3000
		});
	} //if else判断

})