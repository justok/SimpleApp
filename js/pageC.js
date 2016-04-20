// JavaScript Document

var pageCController = new SimpleApp.PageController({
	name: 'pageC',
	tpl : 'template/pageC.html',
	backGC : true
})

pageCController.initEvent = function(){
	var self = this;
	$('#pageC_back').tap(function(){
		self.goBack();
	})
	$('#pageC_toPageD').tap(function(){
		pageDController.show('reload');	
	})
}

pageCController.init = function(){
	this.initEvent();	
}

//重置本页面controller的变量值
pageCController.setDefConfig = function(){
	
}