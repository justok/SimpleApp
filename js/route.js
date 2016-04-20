// JavaScript Document

var routeController = new SimpleApp.PageController({
	name: 'route',
	tpl : 'template/route.html'
})

routeController.initEvent = function(){
	$('#route_link1').tap(function(){
		pageAController.show('reload');
	})
	$('#route_link2').tap(function(){
		pageCController.show('reload');
	})
	
	$('#route_link3').tap(function(){
		pageCController.show('reload',function(){
			$('#pageC_toPageD').hide();	
		});
	})
	
	$('#route_back').tap(function(){
		routeController.goBack();
	})
}

routeController.init = function(){
	this.initEvent();	
}