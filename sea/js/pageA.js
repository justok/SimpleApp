// JavaScript Document
define(function(require, exports, module) {
	
	var SimpleApp = require('SimpleApp');
	var pageBController = require('js/pageB');
	
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
	
	module.exports = pageAController;
	window.Global.pageAController = pageAController;
})