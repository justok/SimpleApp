// JavaScript Document
define(['zepto','SimpleApp','pageB'],function($,SimpleApp,pageBController){
	
	var pageAController = new SimpleApp.PageController({
		name: 'pageA',
		tpl : 'template/pageA.html'
	})
	
	pageAController.initEvent = function(){
		var self = this;
		$('#pageA_back').tap(function(){
			self.goBack();
		})
		$('#pageA_toPageB').tap(function(){
			pageBController.show('reload');	
		})
	}
	
	pageAController.init = function(){
		this.initEvent();	
	}
	
	//重置本页面controller的变量值
	pageAController.setDefConfig = function(){
		
	}
	
	
	window.Global.pageAController = pageAController;
	return pageAController;
})