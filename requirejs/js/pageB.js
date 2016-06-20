// JavaScript Document
define(['zepto','SimpleApp'],function($,SimpleApp){
	
	var SimpleApp = require('SimpleApp');
	
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
	
	
	window.Global.pageBController = pageBController;
	return pageBController;
})