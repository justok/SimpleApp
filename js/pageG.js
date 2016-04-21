// JavaScript Document

var pageGController = new SimpleApp.PageController({
	name: 'pageG',
	tpl : 'template/pageG.html',
	circleRoute: true
})

pageGController.initEvent = function(){
	var self = this;
	$('#pageG_back').tap(function(){
		self.goBack();
	})
	$('#pageG_toPageF').tap(function(){
		pageFController.show('reload');	
	})
}

pageGController.init = function(){
	this.initEvent();	
}

//重置本页面controller的变量值
pageGController.setDefConfig = function(){
	
}