// JavaScript Document

var pageBController = new SimpleApp.PageController({
	name: 'pageB',
	tpl : 'template/pageB.html'
})

pageBController.initEvent = function(){
	var self = this;
	$('#pageB_back').tap(function(){
		self.goBack();
	})
}

pageBController.init = function(){
	this.initEvent();	
}

//重置本页面controller的变量值
pageBController.setDefConfig = function(){
	
}