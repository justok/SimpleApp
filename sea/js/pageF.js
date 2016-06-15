// JavaScript Document
define(function(require, exports, module) {
	
	var SimpleApp = require('SimpleApp');
	var pageGController = require('js/pageG');
	
	var pageFController = new SimpleApp.PageController({
		name: 'pageF',
		tpl : 'template/pageF.html',
		circleRoute: true
	})
	
	pageFController.initEvent = function(){
		var self = this;
		$('#pageF_back').tap(function(){
			self.goBack();
		})
		$('#pageF_toPageG').tap(function(){
			pageGController.show('reload');	
		})
	}
	
	pageFController.init = function(){
		this.initEvent();	
	}
	
	//重置本页面controller的变量值
	pageFController.setDefConfig = function(){
		
	}
	
	module.exports = pageFController;
	window.Global.pageFController = pageFController;

})