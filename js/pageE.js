// JavaScript Document

var pageEController = new SimpleApp.PageController({
	name: 'pageE',
	tpl : 'template/pageE.html'
})

pageEController.initEvent = function(){
	var self = this;
	$('#pageE_back').tap(function(){
		self.goBack();
	})
	$('#pageE_fade').tap(function(){
		SimpleApp.Global.switchMode = 'fade';
		pageBController.show('reload');	
	})
	$('#pageE_slide').tap(function(){
		SimpleApp.Global.switchMode = 'slide';
		pageBController.show('reload');	
	})
}

pageEController.init = function(){
	this.initEvent();	
}

//重置本页面controller的变量值
pageEController.setDefConfig = function(){
	
}