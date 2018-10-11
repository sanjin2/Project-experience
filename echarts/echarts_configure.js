//;$(function(){
	

// 基于准备好的dom，初始化echarts实例
			var app = echarts.init(document.getElementById('online'));
			var posList = [
				'left', 'right', 'top', 'bottom',
				'inside',
				'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
				'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
			];

			app.configParameters = {
				
				rotate: {
					min: -90,
					max: 90
				},
				align: {
					options: {
						left: 'left',
						center: 'center',
						right: 'right'
					}
				},
				verticalAlign: {
					options: {
						top: 'top',
						middle: 'middle',
						bottom: 'bottom'
					}
				},
				position: {
					options: echarts.util.reduce(posList, function(map, pos) {
						map[pos] = pos;
						return map;
					}, {})
				},
				distance: {
					min: 0,
					max: 100
				}
			};

			app.config = {
				rotate: 90,
				align: 'left',
				verticalAlign: 'middle',
				position: 'insideBottom',
				distance: 15,
				onChange: function() {
					var labelOption = {
						normal: {
							rotate: app.config.rotate,
							align: app.config.align,
							verticalAlign: app.config.verticalAlign,
							position: app.config.position,
							distance: app.config.distance
						}
					};
					myChart.setOption({
						series: [{
							label: labelOption
						}, {
							label: labelOption
						}, {
							label: labelOption
						}, {
							label: labelOption
						}]
					});
				}
			};

			var labelOption = {
				normal: {
					show: true,
					position: app.config.position,
					distance: app.config.distance,
					align: app.config.align,
					verticalAlign: app.config.verticalAlign,
					rotate: app.config.rotate,
					formatter: '{c}  {name|{a}}',
					fontSize: 16,
					rich: {
						name: {
							textBorderColor: '#fff'
						}
					}
				}
			};

			option = {
//				color: ['#8ecc59', '#FF4500', '#4cabce', '#e5323e'],
//				tooltip: {
//					trigger: 'axis',
//					axisPointer: {
////						type: 'shadow'
//					}
//				},
//				legend: {
//					data: ['在线数', '离线数']
//				},
//
//				calculable: true,
//				xAxis: [{
//					type: 'category',
//					axisTick: {
//						show: false
//					},
//					data: ['4月', '5月', '6月', '7月', '8月']
//				}],
//				yAxis: [{
//					type: 'value'
//				}],
//				grid: {
//							top: 50,
//							bottom: 8,
//							left:8,
//							right:8,
//							containLabel: true
//						},
//				series: [{
//						name: '在线数',
//						type: 'bar',
//						barGap: 0,
//						label: labelOption,
//						barWidth : 40,
//						data: [32, 32, 30, 33, 39]
//					},
//					{
//						name: '离线数',
//						type: 'bar',
//						label: labelOption,
//						barWidth : 40,
//						data: [10, 8, 9, 13, 12]
//					},
//
//				]




    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data:['在线数','离线数']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['周一','周二','周三','周四','周五','周六','周日']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'在线数',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
            name:'离线数',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:[220, 182, 191, 234, 290, 330, 310]
        }
       
        
    ]
			};
			// 使用刚指定的配置项和数据显示图表。
			app.setOption(option);
			
			
			//饼图
					var app_auto_check = echarts.init(document.getElementById('auto_check'));

			option1 = {
			
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				color:['#8ecc59', '#FF4500'],
				legend: {
					left: 'center',
					data: ['在线数', '离线数']
				},
				grid: {
							top: 50,
							bottom: 8,
							left:8,
							right:8,
							containLabel: true
						},
				series: [{
					name: '访问来源',
					type: 'pie',
					radius: '55%',
					center: ['50%', '60%'],
					data: [{
							value: 25,
							name: '在线数'
						},
						{
							value: 95,
							name: '离线数'
						},

					],

					itemStyle: {
						emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}]
			};

			// 使用刚指定的配置项和数据显示图表。
			app_auto_check.setOption(option1);
			
			
			//堆叠柱状图(设备实时告警)
		

//			app.title = '堆叠柱状图';

			option2 = {
				tooltip: {
					trigger: 'axis',
					axisPointer: { // 坐标轴指示器，坐标轴触发有效
						type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				legend: {
					data: ['告警x', '告警2', '告警3']
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				grid: {
							top: 50,
							bottom: 8,
							left:8,
							right:8,
							containLabel: true
						},
				xAxis: [{
					type: 'category',
					data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
				}],
				yAxis: [{
					type: 'value'
				}],
				series: [
					{
						name: '报警主机',
						type: 'bar',
						stack: '告警',
						barWidth : 40,
						data: [120, 132, 101, 134, 90, 230, 210]
					},
					{
						name: '门禁主机',
						type: 'bar',
						stack: '告警',
						barWidth : 40,
						data: [220, 182, 191, 234, 290, 330, 310]
					},
					{
						name: '巡更主机',
						type: 'bar',
						stack: '告警',
						barWidth : 40,
						data: [150, 232, 201, 154, 190, 330, 410]
					},
					{
						name: '短信猫',
						type: 'bar',
						stack: '告警',
						barWidth : 40,
						data: [150, 232, 201, 154, 190, 330, 410]
					},
					{
						name: '传感器',
						type: 'bar',
						stack: '告警',
						barWidth : 40,
						data: [150, 232, 201, 154, 190, 330, 410]
					},
					{
						name: '智能终端',
						type: 'bar',
						stack: '告警',
						barWidth : 40,
						data: [150, 232, 201, 154, 190, 330, 410]
					},
					{
						name: '车辆道闸',
						type: 'bar',
						stack: '告警',
						barWidth : 40,
						data: [150, 232, 201, 154, 190, 330, 410]
					},
					{
						name: '智能NVR',
						type: 'bar',
						stack: '告警',
						barWidth : 40,
						data: [150, 232, 201, 154, 190, 330, 410]
					},
					
				]

//  color: ['#3398DB'],
//  tooltip : {
//      trigger: 'axis',
//      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
//          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
//      }
//  },
//  grid: {
//      left: '3%',
//      right: '4%',
//      bottom: '3%',
//      containLabel: true
//  },
//
//  xAxis : [
//      {
//          type : 'category',
//          data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun','xxx'],
//          axisTick: {
//              alignWithLabel: true
//          }
//      }
//  ],
//  yAxis : [
//      {
//          type : 'value'
//      }
//  ],
//  series : [
//      {
//          name:'直接访问',
//          type:'bar',
//          barWidth: '60%',
//          data:[10, 52, 200, 334, 390, 330, 220,10]
//      }
//  ]
			};
			var app_warning = echarts.init(document.getElementById('warning'));
			// 使用刚指定的配置项和数据显示图表。
			app_warning.setOption(option2);
			
			
					function devWarning(){
						$.jsonAjax({
							//http://172.16.248.78/rms/devtypes
							url: "/rms/devtypes", // 
							type: 'get',
							success: function(data) {
								console.log("app_warn", data);
								var deviceWarningData = data.rows;
								//返回设备类型码
								var devTypeCode = $.map(deviceWarningData,function(ele,dom){
									return ele.devTypeCode;
								});
								console.log("devTypeCode",devTypeCode)
								//返回告警设备类型名称
								var deviceWarningTypeName = $.map(deviceWarningData,function(ele,dom){
									return ele.devTypeName ;
								});
								
								
								if(data.retCode == 0) {
									var seriesArray = [];
									var seriesObject = {
										name: '',
										type: 'bar',
										stack: '告警',
										barWidth : 40,
										data: []
									};
//									seriesArray.push()
//									
//								$.map(array, function() {
//									
//								});
									var aaa = [];
									var alarmNumber = [];
									$.each(devTypeCode, function(index,value) {
										
										$.jsonAjax({
											url: "/aps/stat/week/"+value, // 
											type: 'get',
											async: false,
											success: function(data) {
											console.log("devTypeCode", data.rows);
											var devTypeData = data.rows;
											//value 值的数组集合 (报警数量集合)
												var devTypeDataArray = $.map(devTypeData,function(ele,dom){
													return ele.value ;
												});
												 var alarmNumberArray = alarmNumber.push(devTypeDataArray);
												console.log("devTypeDataArray",devTypeDataArray);
												
											if(data.retCode == 0) {
												// 填入数据
											} else {
												console.log("每日报警查询失败，err="+data.retCode);
											}
										},
										error: function(XMLHttpRequest, textStatus, errorThrown) {
											console.log("每日报警查询失败！error=" + XMLHttpRequest.status);
										},
											
											
										})	
										
										
									});
									for(var i=0;i<alarmNumber.length;i++){
										var obj = {
											name:deviceWarningTypeName[i],
											type: 'bar',
											stack: '告警',
											barWidth : 40,
											data: alarmNumber[i]
										};
										aaa.push(obj);
									}
								console.log("aaa:",aaa);
//									
//								
									
									
									
									console.log("alarmNumberArray里面的告警数量",alarmNumber);
									console.log("deviceWarningTypeName告警类型名称",deviceWarningTypeName);
									
									
									// 填入数据
								    app_warning.setOption({
								    	legend: {
											data: deviceWarningTypeName
										},
//								    	xAxis:[{
//								    		data:deviceWarningType
//								    	}],
								        series:aaa
								    });
								} else {
									console.log("每日报警查询失败，err="+data.retCode);
								}
							},
							error: function(XMLHttpRequest, textStatus, errorThrown) {
								console.log("每日报警查询失败！error=" + XMLHttpRequest.status);
							},
						}); //ajax over
						
					}
					
					devWarning();
			
			
			
			
			
			
//})			
			
			
			
