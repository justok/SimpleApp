// JavaScript Document

	
define(['zepto','SimpleApp','route','pageE'],function($,SimpleApp,routeController,pageEController){
		
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
	
	window.Global.homeController = homeController;
    return homeController;
	
})
