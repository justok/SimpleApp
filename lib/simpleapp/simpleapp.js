// JavaScript Document
var SimpleApp = {};
SimpleApp.Global = {
	routeHistory : [],    //路由数组
	tplPageCls : 'page',  //每个页面的标识css class, 框架利用这个class来识别一级页面
	switchMode : 'fade',  //页面间切换的模式 fade | slide
	idxName : 'home',  //首页的控制器名字 默认为home
	
	//对外的接口，可控制一些全局属性。只能在初始化的时候执行一次
	init : function(obj){
		this.tplPageCls = obj.tplPageCls ? obj.tplPageCls : 'page';   
		this.switchMode = obj.switchMode ? obj.switchMode : 'fade';
		this.idxName = obj.idxName ? obj.idxName : 'home';  
	},
	
	//全局垃圾回收机制
	GC : function(arr){
		var self = this;
		var extArr = [self.idxName];    //保留页面，目前只是首页
		if(arr && arr.length > 0){
			for(var i=0;i<arr.length;i++){
				if($.inArray(arr[i], extArr) == -1){
					extArr.push(arr[i]);	
				}
			}
		}
		var pages = $(document.body).children('div.' + self.tplPageCls);
		var tempArr = [];	
		for(var i=0;i<pages.length;i++){
			var itm = pages[i];
			if(itm.getAttribute('id')){
				var pageId = itm.getAttribute('id');
				if($.inArray(pageId,extArr) == -1){
					if(window[pageId + 'Controller']){
						if(	$('#' + pageId).length >0 && window[pageId + 'Controller'].destroy){
							window[pageId + 'Controller'].destroy(true);
							tempArr.push(pageId);	
						}
					}
				}
			}
		}
		SimpleApp.Global.routeHistory = [];
		console.log('SimpleApp.Global.GC销毁页面', tempArr);
	},
	
	//获取当前显示的一级页面[class=page] self.tplPageCls默认为page
	getActivePage :function(){
		var self = this;
		var pages = $(document.body).children('div.' + self.tplPageCls);
		var arr = [];
		for(var i=0;i<pages.length;i++){
			if(pages[i].style.display != 'none'){
				arr.push(pages[i]);
			}
		}
		return arr;
	},
	
	//页面间以fadeIn,fadeOut方式切换
	pageSwitch:function(pageIn,pageOut){
		var self = this;
		if(pageOut.length > 1){
			$(pageOut).hide();
			$(pageIn).show();
		}else{
			$(pageOut).fadeOut('fast');
	 		$(pageIn).fadeIn('fast'); 
		}
		setTimeout(function(){
			//防止点击过快产生的动画异常效果	
			var pages = self.getActivePage();
			if(pages.length > 0){
				for(var i=0;i<pages.length;i++){
					$(pages[i]).css({'transform':''})   
				}
			}else{
				self.GC();
				window[self.idxName+'Controller'].show('reload');
			}
		},400)
	},
	
	//页面slide切换
	pageSlide:function(pageIn,pageOut){
		var id_out = pageOut.attr('id');
		var id_in = pageIn.attr('id');
		var outObj = window[id_out + 'Controller'];
		var inObj = window[id_in + 'Controller'];
		var back = false;
		if(!pageOut){
			back = true;	
		}
		if(back){
			pageIn.css({'display':'block' , '-webkit-transform':'translate3d(-100%,0,0)'});
		}else{
			pageIn.css({'display':'block' , '-webkit-transform':'translate3d(100%,0,0)'});	
		}
		
		setTimeout(function(){ 
		   if(back){
		   	  pageOut.css({'-webkit-transform':'translate3d(100%,0,0)','-webkit-transition':'-webkit-transform 100ms ease-out 0ms'});
		   }else{
			  pageOut.css({'-webkit-transform':'translate3d(-100%,0,0)','-webkit-transition':'-webkit-transform 100ms ease-out 0ms'});
		   }
		   pageIn.css({'-webkit-transform' : 'translate3d(0,0,0)' , '-webkit-transition' : '-webkit-transform 300ms ease-out 0ms'});
         }, 20); 

		//滑动发生后重置样式
		setTimeout(function(){ 
		  pageIn.css({'-webkit-transform' : '' , '-webkit-transition' : ''});
		  pageOut.css({'display' : 'none' , '-webkit-transform' : '' , '-webkit-transition' : ''});
		}, 400);   
		
	},
	
	//根据特定网址直接跳转到相应页面
	checkRoute:function(){
		var self = this;
		if(location.href.indexOf('?') != -1 ){  //特定网址
			var arr = location.href.split('?');
			var paramObj = {};
			if(arr[1]){
				var paramArr = arr[1].split('&');
				for(var i=0,len=paramArr.length;i<len;i++){
					var itm = paramArr[i];
					var key = itm.split('=')[0];
					var value = itm.split('=')[1];
					paramObj[key] = value;
				}
				console.log(paramObj);
			}
			
			if(paramObj.pageName){
				var page  = paramObj.pageName;
				if(window[page+'Controller']){
					var func = function(){
						window[page+'Controller'].dirShow(paramObj);  //直接从网址导入显示 ，需要可以直接跳转的页面配置dirShow函数	
					}
				}	
			}else{
				window[self.idxName+'Controller'].show('reload');	
			}
		}else{
			window[self.idxName+'Controller'].show('reload');	
		}
		
	},	
}


SimpleApp.PageController = function(obj){
	
		this.name = obj.name; //页面名字 必选项
		this.tpl = obj.tpl;   //模板路径 必选项
		this.initScrollTop = obj.initScrollTop ? obj.initScrollTop : true;   //页面初始化是否滑动到头部
		this.backRemove = typeof obj.backRemove != 'undefined' ? obj.backRemove : true;   //回退时候是否删除本页面
		this.backGC = typeof obj.backGC != 'undefined' ? obj.backGC : false;    //回退时候是否需要删除全部不用的页面
		this.backCallback = typeof obj.backCallback != 'undefined' ? obj.backCallback : ''; //回退时候的回调函数
		this.circleRoute = typeof obj.circleRoute != 'undefined' ? obj.circleRoute : '';   //是否支持环形路由 A->B->A->B
		this.backScroll = typeof obj.backScroll != 'undefined' ? obj.backScroll : false;   //是否支持返回到页面相应的位置,多用于列表页
}
		
//每个控制器的变量重置方法,在每个控制器里自由重写
SimpleApp.PageController.prototype.setDefConfig = function(){
			
}
		
//每个控制器的初始化方法,在每个控制器里自由重写
SimpleApp.PageController.prototype.init = function(){
			
}
		
//show函数处理路由
SimpleApp.PageController.prototype.handleRoute = function(){
	var self = this;
	if(SimpleApp.Global.routeHistory.length > 0){
	 var arr = SimpleApp.Global.routeHistory;
	 var isIn = false;
	 for(var i=0;i<arr.length;i++){
		if(arr[i].name == self.name){
			isIn = true;	
		}
	 }
	 if(!isIn){
		arr.push({'name':self.name,'backRemove':self.backRemove,'backGC':self.backGC });
	 }else{
		if(self.circleRoute){
			if(self.name != arr[arr.length -1].name){  //routeHistory目前不支持连续的2个相同页面
				arr.push({'name':self.name,'backRemove':self.backRemove,'backGC':self.backGC });
			}
		}
	 }
  }else{
	  SimpleApp.Global.routeHistory.push({'name':self.name,'backRemove':self.backRemove,'backGC':self.backGC }); 
  }
}
		
//isReload 是否需要页面重新加载
//callback 页面回调函数
SimpleApp.PageController.prototype.show = function(isReload ,callback){
  var self = this;
  if(self.initScrollTop){
	window.scrollTo(0,0);
  }
  self.handleRoute();  //添加本页路由
  var pageDom = $('#' + self.name);
  var activePage = SimpleApp.Global.getActivePage();
  if(pageDom.length == 0 || isReload){
	  if(isReload){
		if($('#' + self.name).length > 0) $('#' + self.name).remove();
	  }
	  $.ajax({
		 url:self.tpl,
		 data:'t=' +new Date().getTime(),
		 dataType:'text',
		 success:function(obj){
			 var rx = /<body[^>]*>([\s\S]+?)<\/body>/i
			 var m = rx.exec(obj);
			 if (m) m = m[1];
			 if(pageDom.length > 0){
				pageDom.remove(); 
			 }
			 var tplHtml = '<div class="'+ SimpleApp.Global.tplPageCls +'" style="display:none" id="'+ self.name +'">' + m + '</div>';
			 $(document.body).append(tplHtml);
			 if(SimpleApp.Global.switchMode == 'slide'){
				SimpleApp.Global.pageSlide($('#' + self.name), $(activePage)); 
			 }else{
				SimpleApp.Global.pageSwitch($('#' + self.name), $(activePage));
			 }
			 self.init();
			 if(callback) callback();
		 }
	  })
  }else{
	 SimpleApp.Global.pageSwitch($('#' + self.name), $(activePage)); 
	 if(self.backScroll){     //常用场景: 由详情页回到列表页面的特定位置
		if(self.scrollTop > 0){
			window.scrollTo(0,self.scrollTop);	
		}
	 }
  }	
}
	
//用于网址的直接导向 例如 loction.href = 'http://xx.com/?pageName=pageA' 框架会自动调用pageAController.dirShow方法	
SimpleApp.PageController.prototype.dirShow = function(){
	this.show();
}

//页面的销毁方法	
//force 是否强制删除
SimpleApp.PageController.prototype.destroy = function(force){
	var self = this;
	if(force){ //本身是否需要销毁
		self.setDefConfig();
		$('#' + self.name).html('').remove();
	}
	SimpleApp.Global.routeHistory.pop();
}

//页面的回退方法	
//page是特定页面的名字,正常情况下goBack是返回routeHistory的前一个页面. 设置page则可以回到特定页面
SimpleApp.PageController.prototype.goBack = function(page,reload){
	var self = this;
	if(self.backRemove){ //不仅仅是从路由，还从dom上删除这个页面
		self.destroy(true);	
	}else{  //只是在路由上去掉这个页面
		self.destroy();	
	}
	if(self.backGC){
		SimpleApp.Global.GC();
	}
	
	if(SimpleApp.Global.routeHistory.length > 0){
		var rt = SimpleApp.Global.routeHistory;
		if(page){
			var idx = -1;
			for(var k=rt.length-1;k>=0;k--){
				if(rt[k].name == page) idx = k;	
			}
			for(var i=idx+1;i<rt.length;i++){  //删除page页面之后的页面和路由
				if(rt[i]){
					var name = rt[i]['name'];
					window[name + 'Controller'].destroy();
				}
			}
		}
		var len = rt.length;
		var name = rt[len-1].name;
		var pageObj = window[name + 'Controller'];
		if(pageObj){
			pageObj.show((reload ? reload : ''));
			if(self.backCallback){
				self.backCallback();	
			}
		}
	}else{
		window[SimpleApp.Global.idxName+'Controller'].show('reload');	
	}
	console.log(SimpleApp.Global.routeHistory);
}
	
	

	
	
	
	
	