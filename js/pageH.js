// JavaScript Document

var pageHController = new SimpleApp.PageController({
	name: 'pageH',
	tpl : 'template/pageH.html',
	circleRoute: true
})

pageHController.initEvent = function(){
	var self = this;
	$('#pageH_back').tap(function(){
		self.goBack();
	})
	$('#pageH_toUser').tap(function(){
		var obj = {
			'pageId' : $(this).attr('data-pageId')	
		}
		pageHController.show('reload',function(){
			pageHController.setData(obj);	
		});	
	})
}

pageHController.setData = function(obj){
	this.pageId = obj.pageId;
	$('#pageH_desc').html('pageId='+ this.pageId);
	var topageId = this.pageId == 2 ? 1 : 2;
	$('#pageH_toUser').attr('data-pageId',topageId).html('pageH?pageId=' + topageId);
}

pageHController.init = function(){
	this.initEvent();	
}

//重置本页面controller的变量值
pageHController.setDefConfig = function(){
	this.pageId = '';
}