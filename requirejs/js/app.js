// JavaScript Document
requirejs.config({
	
    baseUrl: './js',
    paths: {
       'zepto' : 'lib/zepto/zepto',
	   'SimpleApp': 'lib/simpleapp/SimpleApp'
    },
	
	shim: {
        zepto: {
          exports: '$'
        },
		SimpleApp:{
		  exports : 'SimpleApp'	
		}
	 }
	
});

require(['home'],function(homeController) {
	homeController.show();
	SimpleApp.Global.checkRoute();
});



