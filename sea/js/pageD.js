// JavaScript Document
define(function(require, exports, module) {
	
	var SimpleApp = require('SimpleApp');
	
	var pageDController = new SimpleApp.PageController({
		name: 'pageD',
		tpl : 'template/pageD.html',
		backRemove: false
	})
	
	pageDController.initEvent = function(){
		var self = this;
		$('#pageD_back').tap(function(){
			self.goBack();
		})
	}
	
	pageDController.init = function(){
		this.initEvent();	
	}
	
	//重置本页面controller的变量值
	pageDController.setDefConfig = function(){
		
	}

    module.exports = pageDController;
	window.Global.pageDController = pageDController;
})