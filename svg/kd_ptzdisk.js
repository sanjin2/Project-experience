if(typeof PtzCmd == "undefined"){
	var PtzCmd={
		emMoveLeft: 0,        //向左
　　　	emMoveRight:1,        //向右
　　　　　　emMoveUp: 2,          //向上
　　　　　　emMoveDown: 3,        //向下
      	emMoveLeftUp: 4,      //左上
      	emMoveLeftDown: 5     //左下
　　　}
}

function drawPtzDisk(tagId, paper, aroundCtrls, resetCtrl, swidth) {
	var params ={fill:"write","fill-opacity":"0", stroke: "#000000", "stroke-opacity":"1", "stroke-width": swidth};
	var paramOvers ={fill:"#E0E0E0","fill-opacity":"1", stroke: "#write", "stroke-opacity":"0","stroke-width": 1};
	var paramdowns ={fill:"#FFFFFF","fill-opacity":"1", stroke: "#write", "stroke-opacity":"0","stroke-width": 1};
	var plgParamOvers ={fill:"#1486C7","fill-opacity":"1", stroke: "#write", "stroke-opacity":"0","stroke-width": 1};
	var plgParamdowns ={fill:"#1479B3","fill-opacity":"1", stroke: "#write", "stroke-opacity":"0","stroke-width": 1};
	var ptzSet=function(tagId, pos,plgPoints, upFunc, downFunc){
		var p = paper.path(pos).attr(params);
		var plg = paper.polygon(plgPoints).attr(params);
		p.mouseover(function () {
			if($("#"+tagId).prop("disabled")){return;}
			p.attr(paramOvers);
			plg.attr(plgParamOvers);
        }).mouseout(function () {
			if($("#"+tagId).prop("disabled")){return;}
			p.attr(params);
			plg.attr(params);
        }).mouseup(function () {
			if($("#"+tagId).prop("disabled")){return;}
			p.attr(paramOvers);
			plg.attr(plgParamOvers);
			upFunc();
        }).mousedown(function () {
			if($("#"+tagId).prop("disabled")){return;}
			p.attr(paramdowns);
			plg.attr(plgParamdowns);
			downFunc();
        });
		plg.mouseover(function () {
			if($("#"+tagId).prop("disabled")){return;}
			p.attr(paramOvers);
			plg.attr(plgParamOvers);
        }).mouseout(function () {
			if($("#"+tagId).prop("disabled")){return;}
			p.attr(params);
			plg.attr(params);
        }).mouseup(function () {
			if($("#"+tagId).prop("disabled")){return;}
			p.attr(paramOvers);
			plg.attr(plgParamOvers);
			upFunc();
        }).mousedown(function () {
			if($("#"+tagId).prop("disabled")){return;}
			p.attr(paramdowns);
			plg.attr(plgParamdowns);
			downFunc();
        });
	};
	
	//设置周边按钮
	for (var i = 0, ii = aroundCtrls.length; i < ii; i++) {
       ptzSet(tagId, aroundCtrls[i].pos, aroundCtrls[i].plgPoints, aroundCtrls[i].upFunc, aroundCtrls[i].downFunc);
    }
	
	//设置中间重置按钮
	var p = paper.circle(resetCtrl.r*2).move(resetCtrl.x-resetCtrl.r, resetCtrl.y-resetCtrl.r);
	p.attr(params);
	var rPlg = paper.polygon(resetCtrl.plgPoints).attr(params);
	p.mouseover(function () {
		if($("#"+tagId).prop("disabled")){return;}
		p.attr(paramOvers);
		rPlg.attr(plgParamOvers);
    }).mouseout(function () {
		if($("#"+tagId).prop("disabled")){return;}
		p.attr(params);
		rPlg.attr(params);
    }).mouseup(function () {
		if($("#"+tagId).prop("disabled")){return;}
		p.attr(paramOvers);
		rPlg.attr(plgParamOvers);
		resetCtrl.upFunc();
    }).mousedown(function () {
		if($("#"+tagId).prop("disabled")){return;}
		p.attr(paramdowns);
		rPlg.attr(plgParamdowns);
		resetCtrl.downFunc();
    });
	rPlg.mouseover(function () {
		if($("#"+tagId).prop("disabled")){return;}
		p.attr(paramOvers);
		rPlg.attr(plgParamOvers);
    }).mouseout(function () {
		if($("#"+tagId).prop("disabled")){return;}
		p.attr(params);
		rPlg.attr(params);
    }).mouseup(function () {
		if($("#"+tagId).prop("disabled")){return;}
		p.attr(paramOvers);
		rPlg.attr(plgParamOvers);
		resetCtrl.upFunc();
    }).mousedown(function () {
		if($("#"+tagId).prop("disabled")){return;}
		p.attr(paramdowns);
		rPlg.attr(plgParamdowns);
		resetCtrl.downFunc();
    });
}

//ptz转盘初始化
function ptzDiskInit(tagId, callbacks){
	var ptzCtrls=[];
	//up
	var ptzUpCtrl = new Object(); 
	ptzUpCtrl.name ='up';
	ptzUpCtrl.pos='M67.165,46.834c3.822,0,7.396,1.038,10.483,2.822l23.32-40.111c-9.943-5.816-21.499-9.164-33.84-9.164'+
			'c-12.7,0-24.575,3.533-34.71,9.666l23.597,40.014C59.249,48.028,63.063,46.834,67.165,46.834z';
	ptzUpCtrl.plgPoints='56.707,27.134 67.501,13.293 78.293,27.134 ';
	ptzUpCtrl.downFunc=callbacks.ptzUp;
	ptzUpCtrl.upFunc=callbacks.ptzStop;
	ptzCtrls.push(ptzUpCtrl);
	//down
	var ptzDownCtrl = new Object(); 
	ptzDownCtrl.name ='down';
	ptzDownCtrl.pos='M67.165,88.834c-3.875,0-7.493-1.068-10.609-2.898l-23.382,40.217c9.97,5.857,21.566,9.229,33.955,9.229'+
			'c12.328,0,23.872-3.341,33.81-9.146L77.331,86.205C74.317,87.876,70.854,88.834,67.165,88.834z';
	ptzDownCtrl.plgPoints='78.127,107.626 67.333,121.467 56.54,107.626 ';
	ptzDownCtrl.downFunc=callbacks.ptzDown;
	ptzDownCtrl.upFunc=callbacks.ptzStop;
	ptzCtrls.push(ptzDownCtrl);
	//right
	var ptzRightCtrl = new Object(); 
	ptzRightCtrl.name ='right';
	ptzRightCtrl.pos='M125.331,34.013L85.328,57.327c1.794,3.093,2.837,6.675,2.837,10.507c0,3.851-1.054,7.447-2.862,10.549'+
			'l40.075,23.284c5.743-9.938,9.047-21.472,9.047-33.786C134.425,55.534,131.104,43.971,125.331,34.013z';
	ptzRightCtrl.plgPoints='107.413,56.42 121.254,67.462 107.413,78.503 ';
	ptzRightCtrl.downFunc=callbacks.ptzRight;
	ptzRightCtrl.upFunc=callbacks.ptzStop;
	ptzCtrls.push(ptzRightCtrl);
	//left
	var ptzLeftCtrl = new Object(); 
	ptzLeftCtrl.name ='left';
	ptzLeftCtrl.pos='M46.165,67.834c0-3.843,1.05-7.434,2.853-10.533L8.929,34.009c-5.773,9.958-9.096,21.523-9.096,33.873'+
			'c0,12.38,3.338,23.972,9.138,33.946l40.101-23.371C47.236,75.338,46.165,71.716,46.165,67.834z';
	ptzLeftCtrl.plgPoints='27.255,78.341 13.414,67.546 27.255,56.753 ';
	ptzLeftCtrl.downFunc=callbacks.ptzLeft;
	ptzLeftCtrl.upFunc=callbacks.ptzStop;
	ptzCtrls.push(ptzLeftCtrl);
	//rightup
	var ptzRightUpCtrl = new Object(); 
	ptzRightUpCtrl.name ='rightup';
	ptzRightUpCtrl.pos='M85.328,57.327l40.003-23.314c-5.867-10.123-14.278-18.57-24.362-24.468l-23.32,40.111'+
			'C80.833,51.498,83.483,54.146,85.328,57.327z';
	ptzRightUpCtrl.plgPoints='100,35.023 92.917,35.023 92.917,33.023 101.916,33.023 101.916,41.023 100,41.023 ';
	ptzRightUpCtrl.downFunc=callbacks.ptzRightUp;
	ptzRightUpCtrl.upFunc=callbacks.ptzStop;
	ptzCtrls.push(ptzRightUpCtrl);
	//rightdown
	var ptzRightDownCtrl = new Object(); 
	ptzRightDownCtrl.name ='rightup';
	ptzRightDownCtrl.pos='M77.331,86.205l23.607,40.031c10.124-5.915,18.564-14.398,24.439-24.568L85.303,78.384'+
			'C83.396,81.654,80.645,84.367,77.331,86.205z';
	ptzRightDownCtrl.plgPoints='92.917,100.107 99.833,100.107 99.833,94.024 101.916,94.024 101.916,102.023 92.917,102.023 ';
	ptzRightDownCtrl.downFunc=callbacks.ptzRightDown;
	ptzRightDownCtrl.upFunc=callbacks.ptzStop;
	ptzCtrls.push(ptzRightDownCtrl);
	//leftup
	var ptzLeftUpCtrl = new Object(); 
	ptzLeftUpCtrl.name ='leftup';
	ptzLeftUpCtrl.pos='M56.016,50.062L32.418,10.047c-9.7,5.87-17.791,14.131-23.49,23.962l40.089,23.292'+
			'C50.731,54.356,53.136,51.872,56.016,50.062z';
	ptzLeftUpCtrl.plgPoints='41.917,34.939 35,34.939 35,41.023 32.917,41.023 32.917,33.023 41.917,33.023 ';
	ptzLeftUpCtrl.downFunc=callbacks.ptzLeftUp;
	ptzLeftUpCtrl.upFunc=callbacks.ptzStop;
	ptzCtrls.push(ptzLeftUpCtrl);
	//leftdown
	var ptzLeftDownCtrl = new Object(); 
	ptzLeftDownCtrl.name ='leftdown';
	ptzLeftDownCtrl.pos='M49.072,78.457L8.971,101.828c5.844,10.051,14.195,18.444,24.203,24.324l23.382-40.217'+
			'C53.467,84.121,50.889,81.545,49.072,78.457z';
	ptzLeftDownCtrl.plgPoints='34.833,100.106 41.916,100.106 41.916,102.106 32.917,102.106 32.917,94.107 34.833,94.107 ';
	ptzLeftDownCtrl.downFunc=callbacks.ptzLeftDown;
	ptzLeftDownCtrl.upFunc=callbacks.ptzStop;
	ptzCtrls.push(ptzLeftDownCtrl);
	//reset
	var ptzResetCtrl = new Object(); 
	ptzResetCtrl.name ='leftdown';
	ptzResetCtrl.x=67.165;
	ptzResetCtrl.y=67.834;
	ptzResetCtrl.r=20;
	ptzResetCtrl.plgPoints='74.917,72.856 74.917,65.106 73.917,65.106 73.917,64.106 73,64.106 73,63.19 72.083,63.19   '+
		'72.083,62.023 70.75,62.023 70.167,62.023 70.167,61.023 66.167,61.023 66.167,61.94 65,62.106 64,62.106 64,63.023 62.917,63.023   '+
		'62.917,63.94 62,64.023 62,65.023 61,64.94 61,64.106 60.083,64.106 60.083,63.106 59,63.106 59,71.023 66.958,71.023   '+
		'66.958,70.023 66,69.939 66,69.023 65,69.023 65,68.023 65.833,68.023 65.833,66.939 66.958,66.939 66.958,66.106 68.917,65.94   '+
		'71.917,66.106 72,66.939 72.833,66.939 73,67.94 74,69.023 74,72.856 ';
	ptzResetCtrl.downFunc=callbacks.ptzReset;
	ptzResetCtrl.upFunc=callbacks.ptzStop;
	
	var draw = SVG(tagId).size(136, 136);
	drawPtzDisk(tagId, draw, ptzCtrls, ptzResetCtrl, 0);
}


