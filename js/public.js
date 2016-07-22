(function(window){
	var tool = {
		/**
		 * @param {Object} 需要打开的URL地址
		 * @param {Object} 传递到下一个页面的参数
		 * @param {Object} 页面交互的动画
		 * @param {Object} 页面交互的时候的动画时间
		 */
		openWindow: function(url, param, ani, time, createNew){
			var snum, id;
			var animationType = ani || 'slide-in-right';
			var animationTime = time || 300;
			param = param || {};
			createNew = createNew ? createNew : false;
			var pnum = url.indexOf('.html');
			if (url.indexOf('page') != -1) {
				snum = url.indexOf('e/') + 1;
			} else {
				snum = url.indexOf('/');
			}
			id = url.substring(snum + 1, pnum)
			if (window.plus) {
				mui.openWindow({
					id: id,
					url: url,
					extras: param,
					show: {
						autoShow: true,
						aniShow: animationType,
						duration: animationTime
					},
					createNew: false,
					waiting: {
						autoShow: false,
						title: '正在加载...',
						options: {
							background: '#d1d1d1'
						}
					}
				})
			} else {
				alert('system is not ready')
			}
		},
		/**
		 * 
		 * @param {Object} 发送请求所需要传递的参数
		 * @param {Object} 成功回调函数
		 * @param {Object} 失败回调函数
		 * @param {Object} 网络有问题时，回调的函数
		 */
		Ajax : function (options, successcb, errorcb, nonetworkcb) {
			var net = plus.networkinfo.getCurrentType();
			if (net != 0 && net != 1) {
				innerAjax(options, successcb, errorcb)
			} else {
				if (nonetworkcb) {
					nonetworkcb()
				} else {
					mui.toast('未连接网络,请链接网络');
				}
			}
			
			
		}
	}
	
	//  内部执行函数
	function innerAjax(options, successcb, errorcb) {
		var op = {
			type: 'post',
			url: '',
			data: {},
			wait: false,
			loadingMask : true
		};
		copyobj(options, op);
		mui.ajax(BASEURL + op.url, {
			type: op.type,
			data: op.data,
			timeout : 20000,
			success: function(data) {
				if (op.wait) {
					plus.nativeUI.closeWaiting();
				}
				successcb(data);
			},
			error: function(xhr, type) {
				if (op.wait) {
					plus.nativeUI.closeWaiting();
				}
				errorcb(xhr,type)
			}
		})
	}
	//  对象clone
	function copyobj(from, to) {
		for (var i in from) {
			if (typeof from[i] == 'object') {
				copyobj(from[i], to[i])
			} else {
				to[i] = from[i];
			}
		}
	}
	
	window.Tools = tool;
})(window)
