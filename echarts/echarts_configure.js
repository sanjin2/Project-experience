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
			
			
			
