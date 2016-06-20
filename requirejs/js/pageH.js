// JavaScript Document

define(['zepto','SimpleApp'],function($,SimpleApp){
	
	
	
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
	
	//由网址直接导入页面的时候，SimpleApp.Global.checkRoute会自动调用的控制器方法。
	pageHController.dirShow = function(obj){
		//为什么用延时：是考虑到连续的show函数的情况下啊，由于show函数的执行有动画效果的延迟，如果不延时会导致两个show函数出现时间线上的冲突。
		setTimeout(function(){
			pageHController.show('reload',function(){
				pageHController.setData(obj);
			})
		},0);
	}
	
	
	window.Global.pageHController = pageHController;
    return pageHController;
})