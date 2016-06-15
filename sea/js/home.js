// JavaScript Document
define(function(require, exports, module) {
	
	var $ = require('zepto');
	var SimpleApp = require('SimpleApp');
	var routeController = require('js/route');
	var pageEController = require('js/pageE');
		
	var homeController = new SimpleApp.PageController({
		name: 'home',
		tpl : 'template/home.html'
	})
	
	
	homeController.initEvent = function(){
		$('#home_link1').tap(function(){
			routeController.show('reload');
		})
		$('#home_link2').tap(function(){
			pageEController.show('reload');
		})
	}
	
	homeController.init = function(){
		this.initEvent();	
	}
	
	module.exports = homeController;
	window.Global.homeController = homeController;
	
})