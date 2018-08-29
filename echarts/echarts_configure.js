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
//				color: ['#ffffff', '#8ecc59', '#ffffff', '#ce9839'],
				color: ['#8ecc59', '#FF4500', '#4cabce', '#e5323e'],
				tooltip: {
					trigger: 'axis',
					axisPointer: {
//						type: 'shadow'
					}
				},
				legend: {
					data: ['在线数', '离线数']
				},

				calculable: true,
				xAxis: [{
					type: 'category',
					axisTick: {
						show: false
					},
					data: ['2012年', '2013年', '2014年', '2015年', '2016年']
				}],
				yAxis: [{
					type: 'value'
				}],
				grid: {
							top: 50,
							bottom: 8,
							left:8,
							right:8,
							containLabel: true
						},
				series: [{
						name: '在线数',
						type: 'bar',
						barGap: 0,
						label: labelOption,
						barWidth : 40,
						data: [320, 332, 301, 334, 390]
					},
					{
						name: '离线数',
						type: 'bar',
						label: labelOption,
						barWidth : 40,
						data: [220, 182, 191, 234, 290]
					},

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
			
			
			//堆叠柱状图
					var app_warning = echarts.init(document.getElementById('warning'));

//			app.title = '堆叠柱状图';

			option2 = {
				tooltip: {
					trigger: 'axis',
					axisPointer: { // 坐标轴指示器，坐标轴触发有效
						type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				legend: {
					data: ['告警1', '告警2', '告警3']
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
						name: '告警1',
						type: 'bar',
						stack: '告警',
						barWidth : 40,
						data: [120, 132, 101, 134, 90, 230, 210]
					},
					{
						name: '告警2',
						type: 'bar',
						stack: '告警',
						data: [220, 182, 191, 234, 290, 330, 310]
					},
					{
						name: '告警3',
						type: 'bar',
						stack: '告警',
						data: [150, 232, 201, 154, 190, 330, 410]
					}
				]
			};

			// 使用刚指定的配置项和数据显示图表。
			app_warning.setOption(option2);
			
//})





//彩环图
					//<![CDATA[
					//echarts图标相关配置与初始化
					// 基于准备好的dom，初始化echarts实例
					// 每日报警对应图表
					var option_ate = {
						grid: {
							top: 10,bottom: 8, left: 8,right: 8, containLabel: true
						},
						// x轴
						xAxis: {
							data: ["1:00","2:00","3:00","4:00","5:00", "6:00",
							       "7:00", "8:00", "9:00","10:00", "11:00", "12:00", 
							       "13:00", "14:00", "15:00","16:00", "17:00", "18:00",
							       "19:00", "20:00","21:00","22:00", "23:00","24:00"]
						},
						yAxis: {},
						// 数据
						series: [{
							name: '报警统计',
							type: 'bar',
							itemStyle: {
								normal: {
									color: function(params) {
										var colorList = [
											'#4c84ff', '#4c84ff', '#4c84ff', '#4c84ff', '#4c84ff','#4c84ff',
											'#4c84ff', '#4c84ff', '#4c84ff', '#4c84ff', '#4c84ff','#4c84ff',
											'#4c84ff', '#4c84ff', '#4c84ff', '#4c84ff', '#4c84ff','#4c84ff',
											'#4c84ff', '#4c84ff', '#4c84ff', '#4c84ff', '#4c84ff','#4c84ff'
										];
										return colorList[params.dataIndex]
									},
									　　　　　　　　　　　　　
								}
							},
							barWidth : 5,
							data: [14,25, 20, 16, 30, 20, 15, 20, 35, 14, 22,24,
							       14,25, 20, 16, 30, 20, 15, 20, 35, 14, 22,24]
						}]
					};

					// 报警分布对应的图表
					var option_distribution = {
						tooltip: {
							trigger: 'item',
							formatter: "{a} <br/>{b}: {c} ({d}%)"
						},
						graphic: {
							type: 'text',
							left: 'center',
							top: 'center',
							align:'center',
							style: {
								text: '总数\n85479',
								textAlign: 'center',
								fill: '#000',
								width: 30,
								height: 30,
								fontWeight: 'bold',
								fontSize: '18',
								fontFamily: '宋体'
								

							}
						},
						series: [{
							name: '报警分布',
							type: 'pie',
							radius: ['50%', '70%'],
							selectedMode: 'single',
							data: [{value: 1548,name: '巡更'},
								   {value: 535, name: '报警'},
								   {value: 510, name: '门禁'},
								   {value: 634, name: '传感器'},
								   {value: 735, name: '智能门禁'}],
							itemStyle: {
								emphasis: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								},
								emphasis: {
									show: true,
									textStyle: {
										fontSize: '10',
										fontWeight: 'bold'
									}
								},
								//'#91c7ae', '#d48265', '#61a0a8', '#2f4554', '#ff4306'
								normal: {
									color: function(params) {
										var colorList = [
											'#E34F27', '#39D02B', '#F3C420', '#10D9B9', '#0AAFE1'
										];
										return colorList[params.dataIndex]
									},
									　　　　　　　　　　　　　
								}
							},
							labelLine: {
								normal: {
									show: true,
									length: 4,
									length2: 2,
								}
							},

						}]
					};

					//报警趋势
					trend_option = {
						grid: {
							top: 10,bottom: 8, left: 8,right: 8, containLabel: true
						},
					   /* title: {
					       text: "趋势图",
					       x: "center"
					   },
					   tooltip: {
					       trigger: "item",
					       formatter: "{a} <br/>{b} : {c}"
					   },
					   legend: {
					       x: 'left',
					       data: ["按月份"]
					   }, */
					   xAxis: [
					       {
					           type: "category",
					          /*  name: "x", */
					            boundaryGap : false,
					           data: ["1", "2", "3", "4", "5", "6", "7", "8", "9","10","11","12"]
					       }
					   ],
					   yAxis: [{type: "value"/* ,name: "y" */}],
					   /* toolbox: {
					      show: true,
					      feature: {
					         mark: {show: true},
					         dataView: {show: true,readOnly: true},
					         restore: {show: true},
					         saveAsImage: {show: true}
					      }
					   }, */
					   /* calculable: true, */
					   series: [
					      {name: "按月份",type: "line",
					       data: [6, 4, 12, 27, 33, 16, 15, 8, 7]
					       }
					   ]
					};
					
					var myChart1 = echarts.init($('#alarm_total_excel').get(0));
					myChart1.setOption(option_ate);
					var myChart2 = echarts.init($('#alarm_distribution_excel').get(0));
					myChart2.setOption(option_distribution);
					//var myChart3 = echarts.init($('#alarm_trend_excel').get(0));
					//myChart3.setOption(trend_option);
					
					//重新刷一下数据
					setTimeout(function() {
						myChart1.resize();
						myChart2.resize();
						//myChart3.resize();
					}, 200);
					
					//浏览器大小改变时重置大小
					window.onresize = function() {
						myChart1.resize();
						myChart2.resize();
						//myChart3.resize();
					}

					//]]>
				
			
			
			
