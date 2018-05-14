var goal = ".ip-input";
// ip输入框的最大值
var ip_max = 255;

// 监听键盘输入事件
$(goal).bind("keydown", function(event){
	
//console.log($(this).attr("id"))
var code = event.keyCode;
// 只能输入数字键、删除键、小数点，tab键，其他的都不能输入
if((code < 48 && 8 != code && 37 != code && 39 != code && 9 != code)
|| (code > 57 && code < 96)
|| (code > 105 && 110 != code && 190 != code))
{ 
return false;
}
// 如果输入了点 (.)，则直接跳转到下一个输入框
if(code == 110 || code == 190) {
$(this).next().focus();
return false;
}
})
// 监听键盘离开事件
$(goal).bind("keyup", function(event){
// 判断当前输入框的值
var value = $(this).val();
// 如果输入的值大于ip最大值，则去掉最后一位数字
if(value != null && value != '' && parseInt(value) > ip_max) {
value = value.substring(0, value.length-1);
$(this).val(value);
return false;
}
// 如果输入框的值大于100，并且符合规则，则跳转到下一个输入框
if(value != null && value != '' && parseInt(value) > 100 && parseInt(value) <= ip_max) {
$(this).next().focus();
return false;
}
// 判断是否是0开头的不规范数字
if(value != null && value != '' && parseInt(value) != 0) {
// 如果当前输入的是0开头，则把0去掉,方法是直接转数字即可
value = parseInt(value);
if(isNaN(value)){
$(this).val("");
}else {
$(this).val(""+value);
}
}
})
// 失去焦点事件
$(goal).bind("blur", function(){
//	alert("1");
var value = $(this).val();
// 如果失去焦点，当前的值为0，则加上红色边框，否则去掉红色边框
if(value == null || value == '' || value == undefined) {
$(this).css("border-color", "#F08080");
}else {
$(this).css("border-color", "");
}
})
