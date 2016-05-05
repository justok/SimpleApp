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
	
	$('#route_link4').tap(function(){
		pageFController.show('reload');
	})
	
	$('#route_link5').tap(function(){
		var obj = {
			'pageId' : $(this).attr('data-pageId')
		}
		pageHController.show('reload',function(){
			pageHController.setData(obj); 
		});
	})
	
	$('#route_link6').tap(function(){
		location.href="?pageName=pageH&pageId=1";
	})
	
	
	$('#route_back').tap(function(){
		routeController.goBack();
	})
}

routeController.init = function(){
	this.initEvent();	
}