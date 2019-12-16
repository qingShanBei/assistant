var PsnMgrToken = ''; //token
var PsnMgrMainServerAddr = ''; //基础平台地址
var PsnMgrLgAssistantAddr = ''; //小助手平台地址
var laAssistantOnlineTimer = ''; //离线定时器

AgassitantInfoCeter();
//消息中心独立版核心代码
function AgassitantInfoCeter() {
	// 开发环境的PsnMgrToken ,PsnMgrMainServerAddr，PsnMgrLgAssistantAddr获取
	// 	sessionStorage.setItem('PsnMgrToken', '5150eb2f-a39f-44dd-bf57-270dde2458e5');
	// 	sessionStorage.setItem('PsnMgrMainServerAddr', 'http://192.168.129.130:10102/');
	// 	sessionStorage.setItem('PsnMgrLgAssistantAddr', 'http://192.168.129.130:1111/');



	//参数非空判断
	if (!sessionStorage.getItem('PsnMgrToken') || !sessionStorage.getItem('PsnMgrMainServerAddr') || !sessionStorage.getItem(
			'PsnMgrLgAssistantAddr')) {
		alert('没数据啊！');
		return;
	}

	//生生产环境的token获取

	PsnMgrToken = sessionStorage.getItem('PsnMgrToken');
	PsnMgrMainServerAddr = sessionStorage.getItem('PsnMgrMainServerAddr');
	PsnMgrLgAssistantAddr = sessionStorage.getItem('PsnMgrLgAssistantAddr');



	// 开发环境的基础平台地址url


	// 生产环境的基础平台地址url





	//用户信息获取

	//开发环境的用户信息获取

	// var assistantData = {
	// 	"UserID": "lcq",
	// 	"UserName": "%E9%99%86%E8%80%81%E5%B8%88",
	// 	"Gender": "%E4%BF%9D%E5%AF%86",
	// 	"GradeID": "",
	// 	"GradeName": "",
	// 	"GroupID": "dd82e4ea-5074-459b-aa58-4c821ae10d0b",
	// 	"GroupName": "%E4%B8%AA%E4%BA%BA%E4%B8%AD%E5%BF%83",
	// 	"UserType": "1",
	// 	"UserClass": "101000",
	// 	"PhotoPath": "http%3A%2F%2F192.168.129.130%3A10101%2Fhttp_basic%2FUserInfo%2FPhoto%2FDefault%2FNopic.jpg",
	// 	"PreLoginTime": "2019/9/26 20:56:42",
	// 	"PreLoginIP": "192.168.0.167",
	// 	"ShortName": "",
	// 	"Sign": "",
	// 	"SchoolID": "S15-130-7C54",
	// 	"UpdateTime": "",
	// 	"SubjectIDs": "S1-English",
	// 	"SubjectNames": "%E8%8B%B1%E8%AF%AD",
	// 	"LoginInfo": "0%7Cb5476beb-f561-4e32-9106-187444427582%7C2",
	// 	"SchoolName": "%E6%B8%85%E5%8D%8E%E5%A4%A7%E5%AD%A6",
	// 	"GlobalGrade": "",
	// 	"StudyLevel": "",
	// 	"LockerState": "1"
	// }

	// AgassitantCallbackFunction();

	// $.ajax({
	// 	url: PsnMgrMainServerAddr + 'UserMgr/Login/Api/Login.ashx', //地址
	// 	// dataType: 'json', //数据类型
	// 	type: 'post', //类型
	// 	timeout: 4000, //超时
	// 	async: false,
	// 	data: {
	// 		method: 'GetUserInfo',
	// 		params: '000',
	// 		token: 
	// 	},
	// 	//请求成功
	// 	success: function(data, status) {
	// 		// //DOM解析器
	// 		// var parser = new DOMParser();
	// 		// //读取返回字符串
	// 		// var _xml = parser.parseFromString(data, "text/xml");
	// 		// //获取节点内容
	// 		// URL = _xml.getElementsByTagName("string")[3].innerHTML;
	// 		console.log(data);
	// 		messageURL = data.Data;
	// 	},
	// 	//失败/超时
	// 	error: function(XMLHttpRequest, textStatus, errorThrown) {
	// 		if (textStatus === 'timeout') {
	// 			// alert('請求超時');
	// 			setTimeout(function() {
	// 				// alert('重新请求');
	// 			}, 4000);
	// 		}
	// 	}
	// })
	// 生产环境的用户信息的获取
	$.getScript(PsnMgrMainServerAddr + 'UserMgr/Login/Api/Login.ashx?method=GetUserInfo&params=000&token=' + PsnMgrToken +
		'&jsoncallback=AgassitantCallbackFunction');
	// $ajaxN('UserMgr/Login/Api/Login.ashx','get',{
	// 	method:'GetUserInfo',
	// 	params: '000',
	// },function(data){
	// 	  
	// })
}

function AgassitantCallbackFunction(result) {
	var assistantData = result.data;
	if (!assistantData.UserID) {
		alert('用户信息错误,请重新登录！');
		return;
	}
	var UserID = assistantData.UserID; //用户ID
	var UserType = assistantData.UserType; //用户类型
	var SchoolID = assistantData.SchoolID; //用户学校ID
	var UserClass = assistantData.UserClass; //用户教师类型的判定（班主任、教师、主任等）
	var UserName = decodeURIComponent(assistantData.UserName); //用户名称
	var sysIPArr = {}; //存放各个平台iP；
	var SubjectIDArr = decodeURIComponent(assistantData.SubjectIDs).split(','); //用户名称
	var SubjectID = SubjectIDArr[0];
	$.getScript(PsnMgrMainServerAddr + 'UserMgr/Login/Api/Login.ashx?method=IsOnline&params=' + UserID +
		'&token=' +
		PsnMgrToken +
		'&jsoncallback=AgassitantCallbackFn');
	// 生产环境平台地址URl
	var messageURL = '';
	getSysIP('400', function(data) {
		messageURL = data;
	});


	function getSysIP(sysid, successFunction) {
		var SubjectIDs = SubjectID;
		if (sysid == 400) {
			SubjectIDs = '';
		}
		$.ajax({
			url: PsnMgrLgAssistantAddr + 'PsnMgr/InfoCentre/GetSystemWS', //地址
			// dataType: 'json', //数据类型
			type: 'get', //类型
			timeout: 4000, //超时
			headers: {
				Authorization: "X-Token=" + PsnMgrToken
			},
			data: {
				SchoolID: SchoolID,
				sysID: sysid,
				subjectID: SubjectIDs,
				Token: PsnMgrToken,
				SecretKey: '',
				BackUpOne: '',
				BackUpTwo: ''
			},
			//请求成功
			success: function(data, status) {
				// //DOM解析器
				// var parser = new DOMParser();
				// //读取返回字符串
				// var _xml = parser.parseFromString(data, "text/xml");
				// //获取节点内容
				// URL = _xml.getElementsByTagName("string")[3].innerHTML;
				// console.log(URL);
				successFunction(data.Data);
				sysIPArr[sysid] = data.Data;

			},
			//失败/超时
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				if (textStatus === 'timeout') {
					// alert('請求超時');
					setTimeout(function() {
						// alert('重新请求');
					}, 4000);
				} else {
					$('.infoCenter-empty').show();
					return;
				}
			}
		})

	}

	var assistantpopuptimer = '';

	//ajax请求封装，没有错误返回函数 url为请求地址，submitType为请求方法，param为参数，请求成功回调
	function ajaxN(url, submitType, param, successFunction) {
		// var load = $.mloading();
		if (!param.SchoolID) {
			param.SchoolID = SchoolID;
		}
		if (!param.UserID) {
			param.UserID = UserID;
		}
		if (!param.UserType) {
			param.UserType = UserType;
		}
		if (!param.Token) {
			param.Token = PsnMgrToken;
		}
		if (!param.SecretKey) {
			param.SecretKey = '';
		}

		if (!param.BackUpOne) {
			param.BackUpOne = '';
		}
		if (!param.BackUpTwo) {
			param.BackUpTwo = '';
		}
		if (!param.URL) {
			param.URL = PsnMgrLgAssistantAddr;
		}
		$.ajax({
			url: param.URL + url,
			type: submitType,
			dataType: "json",
			data: param,
			headers: {
				Authorization: "X-Token=" + PsnMgrToken
			},
			success: function(data) {

				successFunction(data);
			},
			error: function(data) {
				assistantTipsFn('接口请求错误!');

				// 				if ($('.info-active').eq(0).attr('name') == 2) {
				// 					$('.infoCenter-empty').show();
				// 					$('.infoCenter-empty-text').text($('.info-active').eq(1).text());
				// 				}
				// 				if ($('.info-active').eq(0).attr('name') == 1) {
				// 					$('.infoCenter-empty').show();
				// 					$('.infoCenter-empty-text').text($('.info-active').eq(0).text());
				// 				}
				// 				if ($('.info-active').eq(0).attr('name') == 4) {
				// 					$('.infoCenter-empty').show();
				// 					$('.infoCenter-empty-text').text($('.info-active').eq(2).text());
				// 
				// 				}
				$('.assistant-popup-loading').hide();
			}
		})
	};


	//弹出小成功函数 参数为提醒语
	function assistantSmallSuccessFn(str) {
		clearTimeout(assistantpopuptimer);
		$('.assistant-small-success').hide();
		$('.assistant-tips').hide();
		$('.assistant-big-success').hide();
		$('.assistant-remind').hide();
		$('.assistant-small-success').show();

		if (!str) {
			$('.assistant-small-text').text('操作成功');
		} else {
			$('.assistant-small-text').text(str);
		}
		assistantpopuptimer = setTimeout(function() {
			$('.assistant-small-success').hide();
			clearTimeout(assistantpopuptimer);
		}, 1500);

	};
	//弹出提示函数 参数为提示语
	function assistantTipsFn(str) {
		$('.assistant-small-success').hide();
		$('.assistant-tips').hide();
		$('.assistant-big-success').hide();
		$('.assistant-remind').hide();
		$('.assistant-tips').show();
		clearTimeout(assistantpopuptimer);
		if (!str) {
			$('.assistant-tips-text').text('操作成功');
		} else {
			$('.assistant-tips-text').text(str);
		}
		assistantpopuptimer = setTimeout(function() {
			$('.assistant-tips').hide();
			clearTimeout(assistantpopuptimer);
		}, 1500);

	};

	//弹出大成功函数 参数为提醒语
	function assistantBigSuccessFn(str) {
		$('.assistant-small-success').hide();
		$('.assistant-tips').hide();
		$('.assistant-big-success').hide();
		$('.assistant-remind').hide();
		clearTimeout(assistantpopuptimer);
		$('.assistant-big-success').show();
		if (!str) {
			$('.assistant-big-text').text('操作成功');
		} else {
			$('.assistant-big-text').text(str);
		}
		assistantpopuptimer = setTimeout(function() {
			$('.assistant-big-success').hide();
			clearTimeout(assistantpopuptimer);
		}, 1500);

	};

	//弹出提醒函数 参数为长度为3的数组和回调函数，数组第一个为提示语，二为确定按钮文字，三为取消按钮文字
	function assistantRemindFn(arr, remindFunction) {
		$('.assistant-small-success').hide();
		$('.assistant-tips').hide();
		$('.assistant-big-success').hide();
		$('.assistant-remind').hide();
		clearTimeout(assistantpopuptimer);
		$('.assistant-remind').show();
		if (arr) {
			if (!arr[0]) {
				$('.assistant-remind-text').text('是否执行当前操作');
			} else {
				$('.assistant-remind-text').text(arr[0]);
			}
			if (!arr[1]) {
				$('.assistant-remind-true').text('确定执行');
			} else {
				$('.assistant-remind-true').text(arr[1]);
			}
			if (!arr[2]) {
				$('.assistant-remind-false').text('再想想');
			} else {
				$('.assistant-remind-false').text(arr[2]);
			}
		};

		$('.assistant-remind-true').click(function() {
			$('.assistant-remind').hide();
			remindFunction(true);

		});
		$('.assistant-remind-false').click(function() {
			$('.assistant-remind').hide();
			remindFunction(false);
		});
		$('.assistant-remind-close').click(function() {
			$('.assistant-remind').hide();
			remindFunction(false);
		});
	};
	//添加css规则
	function addCSSRule(sheet, selector, rules, index) {
		if ("insertRule" in sheet) {
			sheet.insertRule(selector + "{" + rules + "}", index);
		} else if ("addRule" in sheet) {
			sheet.addRule(selector, rules, index);
		}
	}
	//删除CSS规则
	function delCSSRule(sheet) {
		sheet.deleteRule(0)
	}




	//日期时间处理 补全两位
	function conver(s) {
		return s < 10 ? '0' + s : s;
	};
	//时间天数加减； dateTime为目标时间格式为2017-02-02 num为加减的天数
	function dateChangeFn(dateTime, num) {
		dateTime = new Date(Date.parse(dateTime))
		dateTime = dateTime.setDate(dateTime.getDate() + num);
		dateTime = new Date(dateTime);
		var year = dateTime.getFullYear();

		//获取当前月
		var month = conver(dateTime.getMonth() + 1);

		//获取当前日
		var date = conver(dateTime.getDate());
		return year + '-' + month + '-' + date;
	};

	//时间加减多少分钟  
	//参数 date 为目标时间格式为"2018/01/01 01:01" num为变换的分钟
	function dateChangeMinutes(date, num) {
		var _d = new Date(date);
		_d = new Date(_d.valueOf() + 60 * 1000 * num); // 当前时间加上1分钟
		var _d_year = conver(_d.getFullYear()); //年
		var _d_month = conver(_d.getMonth() + 1); //月        
		var _d_day = conver(_d.getDate()); //日
		var _d_hours = conver(_d.getHours()); //时
		var _d_minutes = conver(_d.getMinutes()); //分

		var _date = _d_year + "-" + _d_month.toString() + "-" + _d_day + " " + _d_hours + ":" + _d_minutes;
		return _date;
	};


	//接口返回值转码输出
	function htmlEncode(s) {
		if (s.length == 0) return "";
		s = s.replace(/&/g, "&amp;");
		s = s.replace(/</g, "&lt;");
		s = s.replace(/>/g, "&gt;");
		s = s.replace(/ /g, "&nbsp;");
		s = s.replace(/\'/g, "&#39;");
		s = s.replace(/\"/g, "&quot;");
		s = s.replace(/\r\n/g, "<br />");
		s = s.replace(/\n/g, "<br />");
		return s;
	};

	// 获取url?后面的参数的值  name为参数的名称 返回值为参数的值
	function getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	};

	// 将2011-01-01的格式转换成2011-1-1的格式 layui的时间插件用的上；用于限制选择时间的范围（mix，max）
	function formatDatechange(date) {
		console.log(date);
		var dateArr = date.split('-');
		if (dateArr[1] < 10) {
			dateArr[1] = dateArr[1].slice(1, 2);
		}
		if (dateArr[2] < 10) {
			dateArr[2] = dateArr[2].slice(1, 2);
		}
		// console.log(dateArr[0] + '-' + dateArr[1] + '-' + dateArr[2]);
		return dateArr[0] + '-' + dateArr[1] + '-' + dateArr[2];
	}
	//打开exe客户端
	//initFunc为初始化后的回调函数，成功返回操作对象;失败返回false，表明基础插件不存在
	//操作对象可以调用start(proName, moduleName, url, exeName, exeParam)方法，启动exe
	//操作对象在谷歌火狐及ie10以上浏览器可调用sendmessage(proName, moduleName, msgData)方法，向指定模块发送消息；
	//也可在谷歌火狐及ie10以上浏览器实现reciveExeMessageFunc(msg)函数接收消息
	//当websocket被断开时，将触发reConnectFunc回调函数，此时，可重新建立对象并连接
	function BsToCsFuncAssistantInfoCenter(initFunc, reciveExeMessageFunc, reConnectFunc) {
		this.checkBase = false;
		this._Socket = null;
		this.objState = 0;
		this.objConnect = false;
		this.socketArrayLength = 5;
		this.activexObj = null;

		var maxPort = 15326;
		var browser = getBrowserInfo();
		if (browser != null && browser[0] == "firefox") {
			//this.socketArrayLength = 2;
			//maxPort = 15323;
		}

		var socketArray = new Array();
		var thisObj = this;
		for (var i = 15321; i < maxPort; ++i) {
			try {
				var tmpSocket = new WebSocket("ws://127.0.0.1:" + i);
				//tmpSocket.CONNECTING
				socketArray.push(tmpSocket);
				tmpSocket.onclose = function() {
					if (!thisObj.checkBase) {
						--thisObj.socketArrayLength;
						if (thisObj.socketArrayLength <= 0) {
							if (typeof initFunc == 'function') {
								initFunc(false);
							}
						}
					} else {
						//说明本来连接到了socket服务器，但是突然断开了，最有可能是因为服务被停止了，以及卸载或重装了基础插件
						if (typeof reConnectFunc == 'function') {
							reConnectFunc();
						}
					}
				};
				tmpSocket.onopen = function() {
					switch (this.readyState) {
						case 0:
						case 2:
						case 3:
							break;
						case 1:
							thisObj.objState = 0;
							thisObj.objConnect = true;
							thisObj._Socket = this;
							thisObj.checkBase = true;
							if (typeof initFunc == 'function') {
								initFunc(thisObj);
							}
							if (typeof reciveExeMessageFunc == 'function') {
								this.onmessage = function(e) {
									reciveExeMessageFunc(e.data);
								}
							}

							break;
					}
				}
			} catch (e) {
				try {
					thisObj.objState = 1;
					thisObj.objConnect = true;
					createActivexObj("B94EBF17-D4AB-4A91-A298-008DDA8AEFB3", "LgClientStart", "", 1, 1);
					thisObj.activexObj = document.getElementById("LgClientStart");
					if (thisObj.activexObj.CheckOcx() == "ok") {
						thisObj.objConnect = true;
						thisObj.checkBase = true;
						if (typeof initFunc == 'function') {
							initFunc(thisObj);
						}
					} else {
						if (typeof initFunc == 'function') {
							initFunc(false);
						}
					}
				} catch (e) {
					if (typeof initFunc == 'function') {
						initFunc(false);
					}
				}
				break;
			}
		}

	}

	BsToCsFuncAssistantInfoCenter.prototype.start = function(proName, moduleName, url, exeName, exeParam) {
		if (this.objState == 0) {
			if (this.objConnect) {
				var char1 = String.fromCharCode(1);
				var char2 = String.fromCharCode(2);
				//连接成功后
				this._Socket.send(proName + char1 + moduleName + char1 + "001" + char2 + url + char2 + exeName + char2 + exeParam);
				return true;
			} else {
				return false;
			}
		} else {
			if (this.objConnect) {
				this.activexObj.NotifyService("5$" + url + "," + proName + "," + moduleName + "," + exeName + "#" + exeParam);
				return true;
			} else {
				return false;
			}
		}
	}

	//如果页面需要接收exe发送的消息，则需要在initFunc函数内调用此函数
	BsToCsFuncAssistantInfoCenter.prototype.willReciveMessage = function(proName, moduleName) {
		if (this.objState == 0) {
			if (this.objConnect) {
				var char1 = String.fromCharCode(1);
				var char2 = String.fromCharCode(2);
				this._Socket.send(proName + char1 + moduleName);
				return true;
			}
		}
		return false;
	}

	BsToCsFuncAssistantInfoCenter.prototype.sendMessage = function(proName, moduleName, msgData) {
		if (this.objState == 0) {
			if (this.objConnect) {
				var char1 = String.fromCharCode(1);
				var char2 = String.fromCharCode(2);
				//给exe发信息
				this._Socket.send(proName + char1 + moduleName + char1 + "000" + char2 + msgData);
				return true;
			}
		}
		return false;
	}

	//如果页面需要获取本机mac地址，则需要在initFunc函数内调用此函数，将在reciveExeMessageFunc内接收到{LocalMacIDs:[mac1,mac2,...,macN]}的json字符串
	BsToCsFuncAssistantInfoCenter.prototype.GetMacIDs = function(proName, moduleName) {
		if (this.objState == 0) {
			if (this.objConnect) {
				var char1 = String.fromCharCode(1);
				var char2 = String.fromCharCode(2);
				//给服务发信息
				this._Socket.send(proName + char1 + moduleName + char1 + "002" + char2 + "");
				return true;
			}
		}
		return false;
	}

	//检测浏览器类型及版本
	function getBrowserInfo() {
		var Sys = {};
		var ua = navigator.userAgent.toLowerCase();
		var s;
		var res = new Array();
		(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1]:
			(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
			(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
			(s = ua.match(/opera\/([\d.]+)/)) ? Sys.opera = s[1] :
			(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

		if (Sys.ie) {
			res[0] = "ie";
			res[1] = Sys.ie;
		} else if (!!window.ActiveXObject || "ActiveXObject" in window) {
			res[0] = "ie";
			res[1] = "11.0";
		} else if (Sys.firefox) {
			res[0] = "firefox";
			res[1] = Sys.firefox;
		} else if (Sys.chrome) {
			res[0] = "chrome";
			res[1] = Sys.chrome;
		} else if (Sys.safari) {
			res[0] = "safari";
			res[1] = Sys.safari;
		} else if (Sys.opera) {
			res[0] = "opera";
			res[1] = Sys.opera;
		} else {
			res = null;
		}
		return res;
	}

	//---------------------浏览器兼容Begin-----------------------------//
	//创建ActiveX控件实例
	function createActivexObj(clsid, objID, evtArr, width, height) {
		if (document.getElementById(objID) == null) {
			var browserInfo = getBrowserInfo();
			var AcXobj;
			if (browserInfo[0] == "ie") {
				AcXobj = document.createElement("OBJECT");
				AcXobj.setAttribute("classid", "clsid:{" + clsid + "}");
				if (evtArr) {
					for (var i = 0; i < evtArr.length; i++) {
						var evts = evtArr[i].split(":");
						document.body.innerHTML += ('<script for="' + objID +
							'" event="' + evts[0] + '(' + setArgs(evts[2]) + ')">' +
							evts[1] + '(' + setArgs(evts[2]) + ');</script>');
					}
				}
			}
			AcXobj.setAttribute("id", objID);
			if (width == null || height == null || width == 0 || height == 0) {
				AcXobj.setAttribute("height", 0);
				AcXobj.setAttribute("width", 0);
				if (browserInfo[0] == "ie" && (browserInfo[1] == "6.0" || browserInfo[1] == "7.0")) {
					AcXobj.style.display = "none";
				}
			} else {
				AcXobj.setAttribute("height", height);
				AcXobj.setAttribute("width", width);
			}
			document.body.appendChild(AcXobj);
		}

		function setArgs(alenght) {
			if (alenght == null)
				return "";
			var res = "";
			for (var ai = 0; ai < alenght; ai++) {
				res += "acxArg_" + ai + ",";
			}
			res = res.substr(0, res.length - 1);
			return res;
		}
	}
	//---------------------浏览器兼容End-----------------------------//


	var _clientObj = new BsToCsFuncAssistantInfoCenter(InitFunc);
	var _clientFlag = true;

	function InitFunc(param) {
		if (!param) {
			_clientFlag = false;
		}
	}

	function commonOpenClient(porotol) {
		if (!_clientFlag) {
			// cpMsgbox({
			// 	type: 2,
			// 	content: "启动失败，如未安装基础插件包，请点击<a href=\"http://" + pageParamObj.SetupWsSvrAddr +
			// 		"/soft/LgCpClientInstall.exe\" style=\"text-decoration: underline;color: blue !important;\">下载安装</a>；<br>如已安装，请尝试刷新浏览器。"
			// });
		} else {
			var proName = "FSCModule"; //产品名称
			var moduleName = "FSCModule"; //模块名称
			var exeName = "FSCModule\\FSCModule.exe"; //启动程序
			setTimeout(function() {
				_clientObj.start(proName, moduleName, PsnMgrMainServerAddr, exeName, porotol); //"http://192.168.129.130:10103/"
			}, 100);
		}
	};


	//消息中心独立版动态生成
	$('#Assistant_infoCenter').append($(
		'<b></b><i></i><div class="lgAssistant-infoCenter-main"><div class="assistant-box"><div class="assistant-popup"><div class="popup-main"><div class="assistant-small-success"><span><i></i><b class="assistant-small-text">操作成功！</b></span></div><div class="assistant-tips"><span><i></i><b class="assistant-tips-text">未找到相关联系人！</b></span></div><div class="assistant-big-success"><span><i></i><b class="assistant-big-text">操作成功!</b></span></div><div class="assistant-remind"><span><i class="assistant-remind-close"></i><p><i></i><span class="assistant-remind-text">操作询操作询问操作询问问</span></p><span class="assistant-remind-true">确定删除</span><span class="assistant-remind-false">再想想</span></span></div><div class="assistant-outline"><span><p><i></i><span class="assistant-outline-text">您已经掉线，请重新登录！</span></p><span class="assistant-outline-true">重新登录</span></span></div><div class="popup-main-nav popup-main1"><div class="infoCenter-title"><p>消息中心</p></div><ul><li class="info-active" name="1"><p class="info-active">待办事项<i></i></p></li><li name="2"><p>通知<i></i></p></li><li name="4"><p>系统消息<i></i></p></li></ul><div class="infoCenter-setting"><i></i><span>设置</span></div><div class="infoCenter-empty"><i></i><p>暂时还没有<span class="infoCenter-empty-text">待办事项</span>哦~</p></div><div class="lgAssistant-clear"></div><div class="setting-popup"><div></div><div><div class="setting-close"><i></i><span>设置</span><i class="lgAssistant-close"></i></div><ul><li class="setting-active" name="setting-option1"><p class="setting-active">系统消息接收设置</p></li></ul><div class="lgAssistant-clear"></div><div></div><div class="setting-option setting-option1"></div><div class="setting-option setting-option2"></div><div class="setting-option setting-option3"></div></div><div></div></div><div class="infoCenter-option todo"><span class="todo-type-span" data-name="0"> 全部内容(共<strong>0</strong>项)<b></b><p></p><ul class="todo-type-ul"></ul></span><span> 期限 </span><div class="infoCenter-option-box todo-box"></div></div><div class="infoCenter-option message"><span> 标题(有<strong>0</strong>个未读通知)</span><span> 发布时间 </span><span> 发布人 </span><div class="infoCenter-option-box message-box"></div></div><div class="infoCenter-option chat"><span> 共有<strong>0</strong>条新消息</span><div class="infoCenter-option-box chat-box"><div class="chat-clear"><span><b></b>清除交流信息</span></div></div></div><div class="infoCenter-option notice"><span> 消息内容(有<strong>0</strong>条新消息)</span><span> 来源 </span><span> 时间 </span><div class="infoCenter-option-box notice-box"><div class="notice-clear"><span><b></b>清空系统信息</span></div></div></div><div class="infoCenter-option news"><div class="news-box"></div></div></div><div class="assistant-popup-loading"><div class="frame_point_loading_container"><div class="point_container"><span class="point1 point"></span><span class="point2 point"></span><span class="point3 point"></span><span class="point4 point"></span></div></div></div></div></div></div></div>'
	));
	$('#Assistant_infoCenter').attr('title', '');
	var infoCenterBoxRight = -122 - $('#Assistant_infoCenter').css('width').slice(0, -2) / 3 + 'px';
	$('.lgAssistant-infoCenter-main').css('right', -122 - $('#Assistant_infoCenter').css('width').slice(0, -2) / 3 + 'px');
	$('#Assistant_infoCenter b').eq(0).css('transform', 'scale(' + $("#Assistant_infoCenter").css("width").slice(0, -2) /
		24 + ')');
	$('#Assistant_infoCenter i').eq(0).css('transform', 'scale(' + $("#Assistant_infoCenter").css("width").slice(0, -2) /
		24 + ')');
	var isPopupShow = false; //弹窗是否出现
	$('#Assistant_infoCenter').click(function() {
		console.log($('.lgAssistant-infoCenter-main').css('opacity'));
		if ($('.lgAssistant-infoCenter-main').css('opacity') == '0') {
			isPopupShow = true;
			if ($('.info-active').eq(0).attr('name') == 1) {
				todoFn(0);
			} else if ($('.info-active').eq(0).attr('name') == 2) {
				messageFn(0);
			} else if ($('.info-active').eq(0).attr('name') == 3) {
				chatFn();
			} else if ($('.info-active').eq(0).attr('name') == 4) {
				noticeFn(0);
			} else if ($('.info-active').eq(0).attr('name') == 5) {
				newsFn();
			}

			$('.lgAssistant-infoCenter-main').css('right', infoCenterBoxRight);
			$('.lgAssistant-infoCenter-main').css('top', '554px');
			$('.lgAssistant-infoCenter-main').css('transform', 'scale(1)');
			$('.lgAssistant-infoCenter-main').css('opacity', '1');
			$('.lgAssistant-infoCenter-main').css('transition', 'all 0.25s ease-in-out');
		}
		if ($('.Assistant_infoCenter_popup') && $('.Assistant_infoCenter_popup').length == 0) {
			$('#Assistant_infoCenter i').eq(0).attr('class', '');
			$('#Assistant_infoCenter b').eq(0).attr('class', '');
			if (isPopupShow) {
				GetNewRemindCountFn();
				isPopupShow = false;
			}
			$('#Assistant_infoCenter').append($('<div class="Assistant_infoCenter_popup"></div>'));
			$('.Assistant_infoCenter_popup').off().click(function() {
				GetNewRemindCountFn();
				$('.lgAssistant-infoCenter-main').css('right', '-1px');
				$('.lgAssistant-infoCenter-main').css('top', '9px');
				$('.lgAssistant-infoCenter-main').css('transform', 'scale(0)');
				$('.lgAssistant-infoCenter-main').css('opacity', '0');
				$('.lgAssistant-infoCenter-main').css('transition', 'all 0.3s');
				$('.Assistant_infoCenter_popup').remove();

				if (event.stopPropagation) {
					// 针对 Mozilla 和 Opera
					event.stopPropagation();
				} else if (window.event) {
					// 针对 IE
					window.event.cancelBubble = true;
				}
			})
		}



	});
	//消息中心参数
	var infoCenterOption = '1'; //消息中心的选项卡上一次的选项（防止重复请求）
	var todoDiv = ''; //消息中心下待办事项的div动态生成
	var messageDiv = ''; //消息中心下通知的div动态生成
	var chatDiv = ''; //消息中心下交流信息的div动态生成
	var noticeDiv = ''; //消息中心下系统消息的div动态生成
	var newsdiv = ''; //消息中心下新闻资讯的div动态生成
	var settingOption2Span = ''; //消息中心下设置选项卡2的span动态生成
	var settingOption3Span = ''; //消息中心下设置选项卡3的span动态生成
	var assistantRemindArr = []; //未读信息存放
	var serverTime = ''; //服务器时间
	var todoLsit = ''; //待办事项数据
	var messageLsit = ''; //通知数据
	var noticeLsit = ''; //系统消息数据
	var settingOption = ''; //消息中心模块选择

	todoFn(0); //初始化待办事项
	//消息中心子模块的选择
	$('.popup-main1>ul li').click(function() {
		$('.assistant-tips').hide();
		if ($(this).attr('name') != infoCenterOption) {
			GetNewRemindCountFn();
			$('.isassistant-message-reminder').remove();
		}
		if ($(this).attr('name') == '1' && infoCenterOption != '1') {
			todoFn(0);
			infoCenterOption = 1;
			$('.popup-main1>ul li').attr('class', '');
			$('.infoCenter-option').hide();
			$(this).attr('class', 'info-active');
			$('.popup-main1>ul li p').attr('class', '');
			$(this).children('p').attr('class', 'info-active');
			$(this).children('p').children().attr('class', '');

		};
		if ($(this).attr('name') == '2' && infoCenterOption != '2') {
			messageFn(0);
			infoCenterOption = 2;
			$('.popup-main1>ul li').attr('class', '');
			$('.infoCenter-option').hide();
			$(this).attr('class', 'info-active');
			$('.popup-main1>ul li p').attr('class', '');
			$(this).children('p').attr('class', 'info-active');
			$(this).children('p').children().attr('class', '');
		};
		if ($(this).attr('name') == '3' && infoCenterOption != '3') {
			chatFn();
			infoCenterOption = 3;
			$('.popup-main1>ul li').attr('class', '');
			$('.infoCenter-option').hide();
			$(this).attr('class', 'info-active');
			$('.popup-main1>ul li p').attr('class', '');
			$(this).children('p').attr('class', 'info-active');
			$(this).children('p').children().attr('class', '');

		};
		if ($(this).attr('name') == '4' && infoCenterOption != '4') {
			noticeFn(0);
			infoCenterOption = 4;
			$('.popup-main1>ul li').attr('class', '');
			$('.infoCenter-option').hide();
			$(this).attr('class', 'info-active');
			$('.popup-main1>ul li p').attr('class', '');
			$(this).children('p').attr('class', 'info-active');
			$(this).children('p').children().attr('class', '');

		};
		if ($(this).attr('name') == '5' && infoCenterOption != '5') {
			newsFn();
			infoCenterOption = 5;
			$('.popup-main1>ul li').attr('class', '');
			$('.infoCenter-option').hide();
			$(this).attr('class', 'info-active');
			$('.popup-main1>ul li p').attr('class', '');
			$(this).children('p').attr('class', 'info-active');
			$(this).children('p').children().attr('class', '');
		};
		//未读消息获取


	});
	//消息中心设置按钮hover
	$('.infoCenter-setting').hover(function() {
		$('.infoCenter-setting').children('span').css('color', '#FF6600');
		// console.log($('.assistant-popupclose'))
	}, function() {
		$('.infoCenter-setting').children('span').css('color', '#0099ff');
	});
	$('.infoCenter-setting').click(function() {
		settingOption1Fn();
	});

	//消息中心 设置窗口关闭
	$('.setting-close .lgAssistant-close').click(function() {
		$('.setting-popup  div').eq(0).hide();
		$('.setting-popup div').eq(1).animate({
			right: '-680px'
		}, 'slow', function() {
			$('.setting-popup').hide();
		});
	});
	$('.setting-popup  div').eq(0).click(function() {
		$('.setting-popup  div').eq(0).hide();
		$('.setting-popup div').eq(1).animate({
			right: '-680px'
		}, 'slow', function() {
			$('.setting-popup').hide();
		});
	});

	//消息中心设置子模块的选择
	$('.setting-popup>div>ul li').click(function() {
		$('.setting-popup>div>ul li').attr('class', '');
		$(this).attr('class', 'setting-active');
		$('.setting-popup>div>ul li p').attr('class', '');
		$(this).children('p').attr('class', 'setting-active');
		settingOption = $(this).attr('name');
		$('.setting-option1').css('display', 'none');
		$('.setting-option2').css('display', 'none');
		$('.setting-option3').css('display', 'none');
		$('.' + settingOption).css('display', 'block');

		//消息中心设置在线交流模块动态生成
		if (settingOption == 'setting-option2') {
			settingOption2Fn();
		};
		//消息中心设置屏蔽群消息模块动态生成
		if (settingOption == 'setting-option3') {
			settingOption3Fn();

		};

	});
	
	$('.todo-type-span').hover(function() {
		$('.todo-type-ul').show();
	}, function() {
		$('.todo-type-ul').hide();
	})
	
	//待办事项分类选择
	$('.todo-type-span').on('click', ' .todo-type-ul li', function() {
		// if($('.todo-type-span').attr('data-name')==$(this).attr('data-name')){
		// 	return;
		// }else{
		// 	$('.todo-type-span').attr('data-name',$(this).attr('data-name'));
		// }
		$('.todo-type-span').html($(this).attr('name') + $('.todo-type-span').html().slice($('.todo-type-span').html().indexOf(
			'('), $('.todo-type-span').html().length));
		$('.todo-type-ul').hide();
		todoFn(0, $(this).attr('data-id'));
	})
	
	//新消息提醒
	$('.popup-main').on('click', '.isassistant-message-reminder', function() {
		if ($(this).attr('name') == 1) {
			todoFn(0);
			$('.popup-main1 ul li').eq(0).children().children().attr('class', '');
		} else if ($(this).attr('name') == 2) {
			messageFn(0);
			$('.popup-main1 ul li').eq(1).children().children().attr('class', '');
		} else if ($(this).attr('name') == 3) {
			chatFn();
		} else if ($(this).attr('name') == 4) {
			noticeFn(0);
			$('.popup-main1 ul li').eq(2).children().children().attr('class', '');
		} else if ($(this).attr('name') == 5) {
			newsFn();
		}
		$('.isassistant-message-reminder').remove();
	})







	// 轮询模式 未读消息和日程提醒
	function GetNewRemindCountFn() {
		ajaxN('PsnMgr/InfoCentre/GetNewRemindCount', 'get', {}, function(data) {
			if (data.Data.TotalCount != 0) {
				//待办事项
				if (data.Data.TodoListCount == 0) {
					$('.popup-main1 ul li').eq(0).children().children().attr('class', '');
				} else {

					$('.popup-main1 ul li').eq(0).children().children().attr('class', 'info-unread4');
				}
				//通知
				if (data.Data.NoticeCount == 0) {
					$('.popup-main1 ul li').eq(1).children().children().attr('class', '');
				} else {
					$('.popup-main1 ul li').eq(1).children().children().attr('class', 'info-unread2');
				}
				//聊天
				if (data.Data.ChatCount == 0) {
					$('.popup-main1 ul li').eq(3).children().children().attr('class', '');
				} else {
					$('.popup-main1 ul li').eq(3).children().children().attr('class', 'info-unread4');
				}
				//系统消息
				if (data.Data.MessageCount == 0) {
					$('.popup-main1 ul li').eq(2).children().children().attr('class', '');
				} else {
					$('.popup-main1 ul li').eq(2).children().children().attr('class', 'info-unread4');
				}
				//新闻资讯
				if (data.Data.NewsCount == 0) {
					$('.popup-main1 ul li').eq(4).children().children().attr('class', '');
				} else {
					$('.popup-main1 ul li').eq(4).children().children().attr('class', 'info-unread4');
				}

				if ($('.Assistant_infoCenter_popup') && $('.Assistant_infoCenter_popup').length == 0) {
					if ($('#Assistant_infoCenter').css('width').slice(0, -2) <= 20) {
						$('#Assistant_infoCenter i').eq(0).attr('class', 'Assistant_infoCenter_sprite_start16');
					} else {
						$('#Assistant_infoCenter i').eq(0).attr('class', 'Assistant_infoCenter_sprite_start');
					}
					setTimeout(function() {
						if ($('#Assistant_infoCenter').css('width').slice(0, -2) <= 20) {
							$('#Assistant_infoCenter i').eq(0).attr('class', 'Assistant_infoCenter_sprite_i16');
						} else {
							$('#Assistant_infoCenter i').eq(0).attr('class', 'Assistant_infoCenter_sprite_i');
						}
					}, 2400)
					$('#Assistant_infoCenter b').eq(0).attr('class', 'Assistant_infoCenter_sprite_b');
				}

			} else {
				$('.popup-main1 ul li').children().children().attr('class', '');
				$('#Assistant_infoCenter i').eq(0).attr('class', '');
				$('#Assistant_infoCenter b').eq(0).attr('class', '');
			}

		})
	}
	// 	setInterval(function() {
	// 		ajaxN('PsnMgr/InfoCentre/GetNewRemindCount', 'get', {}, function(data) {
	// 			console.log(data.Data.TotalCount);
	// 			if (data.Data.TotalCount != 0) {
	// 				if (data.Data.TodoListCount == 0) {
	// 					$('.popup-main1 ul li').eq(0).children().children().attr('class', '');
	// 				} else {
	// 					if ($('.info-active').eq(0).attr('name') == 1 && $('.lgAssistant-infoCenter-main').css('display') != 'none') {
	// 						$('.popup-main').append($('<div class="isassistant-message-reminder" name ="1">您有新的待办事件啦！</div>'));
	// 						$('.isassistant-message-reminder').animate({
	// 							width: '120px'
	// 						}, 'slow');
	// 					}
	// 					$('.popup-main1 ul li').eq(0).children().children().attr('class', 'info-unread4');
	// 				}
	// 				if (data.Data.NoticeCount == 0) {
	// 					$('.popup-main1 ul li').eq(1).children().children().attr('class', '');
	// 				} else {
	// 					if ($('.info-active').eq(0).attr('name') == 2 && $('.lgAssistant-infoCenter-main').css('display') != 'none') {
	// 						$('.popup-main').append($('<div class="isassistant-message-reminder" name ="2">您有新的通知啦！</div>'));
	// 						$('.isassistant-message-reminder').animate({
	// 							width: '120px'
	// 						}, 'slow');
	// 					}
	// 					$('.popup-main1 ul li').eq(1).children().children().attr('class', 'info-unread2');
	// 				}
	// 				if (data.Data.ChatCount == 0) {
	// 					$('.popup-main1 ul li').eq(3).children().children().attr('class', '');
	// 				} else {
	// 					if ($('.info-active').eq(0).attr('name') == 3 && $('.lgAssistant-infoCenter-main').css('display') != 'none') {
	// 						$('.popup-main').append($('<div class="isassistant-message-reminder" name ="3">您有新的聊天信息啦！</div>'));
	// 						$('.isassistant-message-reminder').animate({
	// 							width: '120px'
	// 						}, 'slow');
	// 					}
	// 					$('.popup-main1 ul li').eq(3).children().children().attr('class', 'info-unread4');
	// 				}
	// 				if (data.Data.MessageCount == 0) {
	// 					$('.popup-main1 ul li').eq(2).children().children().attr('class', '');
	// 				} else {
	// 					if ($('.info-active').eq(0).attr('name') == 4 && $('.lgAssistant-infoCenter-main').css('display') != 'none') {
	// 						$('.popup-main').append($('<div class="isassistant-message-reminder" name ="4">您有新的系统消息啦！</div>'));
	// 						$('.isassistant-message-reminder').animate({
	// 							width: '120px'
	// 						}, 'slow');
	// 					}
	// 					$('.popup-main1 ul li').eq(2).children().children().attr('class', 'info-unread4');
	// 				}
	// 				if (data.Data.NewsCount == 0) {
	// 					$('.popup-main1 ul li').eq(4).children().children().attr('class', '');
	// 				} else {
	// 					if ($('.info-active').eq(0).attr('name') == 5 && $('.lgAssistant-infoCenter-main').css('display') != 'none') {
	// 						$('.popup-main').append($('<div class="isassistant-message-reminder" name ="5">您有新的新闻资讯啦！</div>'));
	// 						$('.isassistant-message-reminder').animate({
	// 							width: '120px'
	// 						}, 'slow');
	// 					}
	// 					$('.popup-main1 ul li').eq(4).children().children().attr('class', 'info-unread4');
	// 				}
	// 				if ($('.lgAssistant-infoCenter-main').css('display') == 'none') {
	// 					$('.setting-popup div').eq(0).hide();
	// 					$('.setting-popup div').eq(1).css('right', '-680px');
	// 					$('.setting-popup').hide();
	// 					infoCenterOption = 1;
	// 					$('.popup-main1>ul li').attr('class', '');
	// 					$('.infoCenter-option').hide();
	// 					$('.popup-main1>ul li').eq(0).attr('class', 'info-active');
	// 					$('.popup-main1>ul li p').attr('class', '');
	// 					$('.popup-main1>ul li').eq(0).children('p').attr('class', 'info-active');
	// 					todoFn(0);
	// 					if ($('#Assistant_infoCenter').css('width').slice(0, -2) <= 20) {
	// 						$('#Assistant_infoCenter i').eq(0).attr('class', 'Assistant_infoCenter_sprite_start16');
	// 					} else {
	// 						$('#Assistant_infoCenter i').eq(0).attr('class', 'Assistant_infoCenter_sprite_start');
	// 					}
	// 					setTimeout(function() {
	// 						if ($('#Assistant_infoCenter').css('width').slice(0, -2) <= 20) {
	// 							$('#Assistant_infoCenter i').eq(0).attr('class', 'Assistant_infoCenter_sprite_i16');
	// 						} else {
	// 							$('#Assistant_infoCenter i').eq(0).attr('class', 'Assistant_infoCenter_sprite_i');
	// 						}
	// 					}, 2400)
	// 					$('#Assistant_infoCenter b').eq(0).attr('class', 'Assistant_infoCenter_sprite_b');
	// 				}
	// 
	// 
	// 			}
	// 		})
	// 
	// 	}, 5000)
	// 
	//未读消息查询
	GetNewRemindCountFn();
	setTimeout(function() {
		ajaxN('PsnMgr/InfoCentre/GetWebSocketInfo', 'get', {}, function(data) {
			if (data.StatusCode == 200 || data.StatusCode == 201) {
				if (!window.WebSocket) {
					alert('您的浏览器不支持WebSocket，请选择其他的浏览器再尝试连接服务器');
				}
				var wsClient;
				var lockReconnect = false;
				var wsPushUrl = data.Data;
				if (!wsPushUrl) {
					wsPushUrl = 'ws://192.168.129.129:10248';
				}
				$(function() {
					createPushWebSocket(wsPushUrl);
				})
				//创建连接
				function createPushWebSocket(url) {
					try {
						wsClient = new WebSocket(url);
						initEventHandle();
					} catch (e) {
						reconnectpush(url);
					}
				}
				//初始化生命周期
				/*  
				readyState: 
				CONNECTING：值为0，表示正在连接。
				OPEN：值为1，表示连接成功，可以通信了。
				CLOSING：值为2，表示连接正在关闭。
				CLOSED：值为3，表示连接已经关闭，或者打开连接失败。
				*/
				function initEventHandle() {
					wsClient.onopen = function(e) {
						wsClient.send(JSON.stringify(new Object({
							MessageType: 1,
							ClientUserID: UserID,
							ClientType: 0,
							PUshType: 0,
							ReceiveIDType: 0,
							ReceiveID: ''
						})));
						heartCheck.reset().start();
					}
					wsClient.onclose = function(e) {
						reconnectpush(wsPushUrl);
					}
					wsClient.onmessage = function(e) {
						try {
							var result = JSON.parse(e.data);
							// if(result.code == "1001"){
							// 	wsClient.send(JSON.stringify(new Object({
							// 		MessageType: 1,
							// 		ClientUserID: UserID,
							// 		ClientType: 0,
							// 		PUshType: '1',
							// 		ReceiveIDType: 1,
							// 		ReceiveID: ''
							// 	})));
							// }
							if (result.code == "1004") {
								//刷新
								var assistantRemindArr1 = [];
								if (result.pushtype == '1' || result.pushtype == '3' || result.pushtype == '4') {
									// ajaxN('PsnMgr/InfoCentre/GetNewRemindCount', 'get', {}, function(data) {
									// if (data.Data.TotalCount != 0) {
									console.log(result);
									var data = result.msgdata;

									if (data.TodoListCount == 0) {
										$('.popup-main1 ul li').eq(0).children().children().attr('class', '');
									} else {
										if ($('.info-active').eq(0).attr('name') == 1 && $('.lgAssistant-infoCenter-main').css('opacity') !=
											'0') {
											$('.popup-main').append($('<div class="isassistant-message-reminder" name ="1">您有新的待办事件啦！</div>'));
											$('.isassistant-message-reminder').animate({
												width: '120px'
											}, 'slow');
										}
										$('.popup-main1 ul li').eq(0).children().children().attr('class', 'info-unread4');
									}
									if (data.NoticeCount == 0) {
										$('.popup-main1 ul li').eq(1).children().children().attr('class', '');
									} else {
										if ($('.info-active').eq(0).attr('name') == 2 && $('.lgAssistant-infoCenter-main').css('opacity') !=
											'0') {
											$('.popup-main').append($('<div class="isassistant-message-reminder" name ="2">您有新的通知啦！</div>'));
											$('.isassistant-message-reminder').animate({
												width: '120px'
											}, 'slow');
										}
										$('.popup-main1 ul li').eq(1).children().children().attr('class', 'info-unread2');
									}
									if (data.ChatCount == 0) {
										$('.popup-main1 ul li').eq(3).children().children().attr('class', '');
									} else {
										if ($('.info-active').eq(0).attr('name') == 3 && $('.lgAssistant-infoCenter-main').css('opacity') !=
											'0') {
											$('.popup-main').append($('<div class="isassistant-message-reminder" name ="3">您有新的聊天信息啦！</div>'));
											$('.isassistant-message-reminder').animate({
												width: '120px'
											}, 'slow');
										}
										$('.popup-main1 ul li').eq(3).children().children().attr('class', 'info-unread4');
									}
									if (data.MessageCount == 0) {
										$('.popup-main1 ul li').eq(2).children().children().attr('class', '');
									} else {
										if ($('.info-active').eq(0).attr('name') == 4 && $('.lgAssistant-infoCenter-main').css('opacity') !=
											'0') {
											$('.popup-main').append($('<div class="isassistant-message-reminder" name ="4">您有新的系统消息啦！</div>'));
											$('.isassistant-message-reminder').animate({
												width: '120px'
											}, 'slow');
										}
										$('.popup-main1 ul li').eq(2).children().children().attr('class', 'info-unread4');
									}
									if (data.NewsCount == 0) {
										$('.popup-main1 ul li').eq(4).children().children().attr('class', '');
									} else {
										if ($('.info-active').eq(0).attr('name') == 5 && $('.lgAssistant-infoCenter-main').css('opacity') !=
											'0') {
											$('.popup-main').append($('<div class="isassistant-message-reminder" name ="5">您有新的新闻资讯啦！</div>'));
											$('.isassistant-message-reminder').animate({
												width: '120px'
											}, 'slow');
										}
										$('.popup-main1 ul li').eq(4).children().children().attr('class', 'info-unread4');
									}
									if ($('.lgAssistant-infoCenter-main').css('opacity') == '0') {
										$('.setting-popup div').eq(0).hide();
										$('.setting-popup div').eq(1).css('right', '-680px');
										$('.setting-popup').hide();
										infoCenterOption = 1;
										$('.popup-main1>ul li').attr('class', '');
										$('.infoCenter-option').hide();
										$('.popup-main1>ul li').eq(0).attr('class', 'info-active');
										$('.popup-main1>ul li p').attr('class', '');
										$('.popup-main1>ul li').eq(0).children('p').attr('class', 'info-active');
										todoFn(0);
										if ($('#Assistant_infoCenter').css('width').slice(0, -2) <= 20) {
											$('#Assistant_infoCenter i').eq(0).attr('class', 'Assistant_infoCenter_sprite_start16');
										} else {
											$('#Assistant_infoCenter i').eq(0).attr('class', 'Assistant_infoCenter_sprite_start');
										}
										setTimeout(function() {
											if ($('#Assistant_infoCenter').css('width').slice(0, -2) <= 20) {
												$('#Assistant_infoCenter i').eq(0).attr('class', 'Assistant_infoCenter_sprite_i16');
											} else {
												$('#Assistant_infoCenter i').eq(0).attr('class', 'Assistant_infoCenter_sprite_i');
											}
										}, 2400)
										$('#Assistant_infoCenter b').eq(0).attr('class', 'Assistant_infoCenter_sprite_b');
									}
									// 	}
									// })
								}
							}
							heartCheck.reset().start();
						} catch (e) {
							console.log(e);
						}
					}
					wsClient.onerror = function(e) {
						reconnectpush(wsPushUrl);
					}
				}
				//客户端重连
				function reconnectpush(url) {
					if (lockReconnect) {
						return;
					}
					lockReconnect = true;
					setTimeout(function() {
						createPushWebSocket(url);
						lockReconnect = false;
					}, 1000);
				}
				//心跳检测
				var obj1 = new Object({
					MessageType: 2,
					ClientUserID: '',
					ClientType: 0
				});
				var heartCheck = {
					timeout: 60000,
					timeoutObj: null,
					serverTimeoutObj: null,
					reset: function() {
						clearTimeout(this.timeoutObj);
						clearTimeout(this.serverTimeoutObj);
						return this;
					},
					start: function() {
						var self = this;
						this.timeoutObj = setTimeout(function() {
							//这里发送一个心跳，后端收到后，返回一个心跳消息，onmessage拿到返回的心跳就说明连接正常
							//obj.MessageType = 2;
							wsClient.send(JSON.stringify(obj1));
							self.serverTimeoutObj = setTimeout(function() {
								//如果超过一定时间还没重置，说明后端主动断开了
								wsClient.close();
								//如果onclose会执行reconnect，我们执行ws.close()就行了.
								//如果直接执行reconnect 会触发onclose导致重连两次
							}, self.timeout)
						}, this.timeout)
					}
				}
			}
		})
	}, 6000)










	// 分页函数
	// setPager(30, 0);



	// var a = assistantRemindFn();


	//WebSocket
	// 	function handleMessage() {
	// 
	// 		const url = 'ws://192.168.129.129:1112'; //某url
	// 
	// 		// websocket 函数
	// 		var ws = new WebSocket(url);
	// 		console.log(ws);
	// 		ws.onopen = () => {
	// 			console.log('与服务器建立连接。。。。。。');
	// 			ws.send('您好');
	// 		};
	// 		// 接受服务端数据时触发事件
	// 		ws.onmessage = (event) => {
	// 			console.log(event.data);
	// 		};
	// 		ws.onclose = () => {
	// 			console.log('服务器断开连接。。。。。。。。。。');
	// 		};
	// 	}
	// 	handleMessage();







	// var x = 0;
	// var y = 0;
	// var l = 0;
	// var t = 0;
	// var isDown = false;
	// //鼠标按下事件
	// $('#assistant-box').mousedown(function(e) {
	// 	//获取x坐标和y坐标
	// 	x = e.clientX;
	// 	y = e.clientY;
	// 	//获取左部和顶部的偏移量
	// 	l = $('#assistant-box').position().left;
	// 	t = $('#assistant-box').position().top;
	// 	//开关打开
	// 	isDown = true;
	// 	//设置样式  
	// 	$('#assistant-box').css('cursor', 'move');
	// 	console.log(l, t);
	// });
	// //鼠标移动
	// window.onmousemove = function(e) {
	// 	if (isDown == false) {
	// 		return;
	// 	}
	// 	//获取x和y
	// 	var nx = e.clientX;
	// 	var ny = e.clientY;
	// 	//计算移动后的左偏移量和顶部的偏移量
	// 	var nl = nx - (x - l);
	// 	var nt = ny - (y - t);
	// 	if (nl >= windowWidth - 225) {
	// 		nl = windowWidth - 225;
	// 	}
	// 	if (nt >= windowHeight - 150) {
	// 		nt = windowHeight - 150;
	// 	}
	// 	if (nl < 0) {
	// 		nl = 0;
	// 	}
	// 	if (nt < 60) {
	// 		nt = 60;
	// 	}
	// 	$('#assistant-box').css('left', '' + nl + 'px');
	// 	$('#assistant-box').css('top', '' + nt + 'px');
	// 	console.log(nt, window.innerHeight);
	// }
	// //鼠标抬起事件
	// $('#assistant-box').mouseup(function() {
	// 	//开关关闭
	// 	isDown = false;
	// 	$('#assistant-box').css('cursor', 'default')
	// })


	var todoListTotalCount = 0;
	var todoType = '';
	//消息中心模块下的选项卡第一个
	function todoFn(page,type) {
		ajaxN('PsnMgr/InfoCentre/GetTodoListSortCount', 'get', {}, function(data) {
			$('.todo-type-ul li').remove();
			if (data.Data.length > 1) {
				data.Data.map(function(item) {
					$('.todo-type-ul').append($('<li name=' + item.InfoSourceName + ' data-id=' + item.InfoSourceID + ' data-num=' +
						item.InfoSourceID + ' >' + item.InfoSourceName + '<b>(' + item.AllCount + ')</b></li>'))
				})
			}
		})
		todoType = type;
		var todoData = {};
		var todoUrl = '';
		if (type == 'All') {
			type = '';
		}
		if (!type) {
			todoUrl = 'PsnMgr/InfoCentre/GetTodoList';
			todoData = {
				PageIndex: page + 1,
				PageSize: 15,
			}
		} else {
		
			todoUrl = 'PsnMgr/InfoCentre/GetTodoListByInfoSourceID';
			todoData = {
				PageIndex: page + 1,
				PageSize: 15,
				InfoSourceID: type
			}
		}
		todoListTotalCount = 0;
		$('.pager1').remove();
		$('.pager2').remove();
		$('.pager3').remove();
		$('.infoCenter-empty').hide();
		$("div").remove(".todo-div");
		$('.assistant-popup-loading').show();
		ajaxN(todoUrl, 'get', todoData, function(data) {
			if (data.StatusCode == 200) {
				$('.todo strong').text(data.Data.TotalCount);
				todoListTotalCount = data.Data.TotalCount;
				serverTime = data.Data.ServerTime;
				todoLsit = data.Data.Children;
				if (todoLsit && todoLsit.length == 0) {
					$('.infoCenter-empty').show();
					$('.infoCenter-empty-text').text($('.info-active').eq(1).text());
					$('.assistant-popup-loading').hide();
					return;
				}
				$('.todo').css('display', 'block');
				
				ajaxN('PsnMgr/InfoCentre/RecordLastReadTime', 'post', {
					ModuleID: 1,
				}, function() {
					GetNewRemindCountFn();
				});
				$('.infoCenter-empty').hide();
				$("div").remove(".todo-div");
				todoLsit.map(function(item, idx) {

					var dateTime = Date.parse(item.ExpireTime) - Date.parse(serverTime);
					dateTime = dateTime / 1000 / 60;
					var todoclass = ''; //是否出现倒计时
					var todoclass1 = 'todo-div-name'; //倒计时出现时样式控制
					if (dateTime <= 2 * 24 * 60 && dateTime > 0) {
						todoclass = 'todo-dead-time';
						todoclass1 = '" todo-div-name todo-div-name1 "'
						if (dateTime > 23 * 60) {
							dateTime = '只剩1天啦~';
						} else {
							if (dateTime / 60 >= 1) {
								dateTime = '只剩' + Math.floor(dateTime / 60) + '小时啦~';
							} else if (dateTime / 60 > 0.5 && dateTime / 60 < 1) {
								dateTime = '只剩不到1小时啦~';
							} else if (dateTime / 60 < 0.5) {
								dateTime = '只剩不到半小时啦~';
							}
						}
					}
					var fontColor = ''; //不同模块的字体颜色改变
					var todoPointerClassname = ' '; //是否有手型，可点击
					if (item.InfoSourceName && item.InfoSourceName.length > 2) {
						if (item.InfoSourceName == '课前预习') {
							fontColor = 'green12';
						} else if (item.InfoSourceName == '课外计划') {
							fontColor = 'blue12';
						} else if (item.InfoSourceName == '课后作业') {
							fontColor = 'orange12';
						} else {
							fontColor = 'pink12';
						};
					} else {
						if (item.InfoSourceName == '巡考') {
							fontColor = 'green26';
						} else if (item.InfoSourceName == '阅卷') {
							fontColor = 'blue26';
						} else if (item.InfoSourceName == '考试') {
							fontColor = 'orange26';
						} else {
							fontColor = 'pink26';
						};
					}
					if (item.ExpireTime.length > 18) {
						item.ExpireTime = item.ExpireTime.slice(0, -3)
					}
					if (item.RemindTime.length > 18) {
						item.RemindTime = item.RemindTime.slice(0, -3)
					}
					if (item.ExpireTime == item.RemindTime) {
						item.timeSlot = item.ExpireTime;
					} else {
						if (item.ExpireTime.slice(0, 4) == item.RemindTime.slice(0, 4)) {
							item.timeSlot = item.RemindTime.slice(5) + '~' + item.ExpireTime.slice(5);
						} else {
							item.timeSlot = item.RemindTime.slice(5) + '~' + item.ExpireTime;
						}
					}
					item.InfoContentTitle = '""';
					if (item.InfoContent && item.InfoContent.length > 70) {
						item.InfoContentTitle = '"' + item.InfoContent + '"';
						item.InfoContent = item.InfoContent.slice(0, 69) + '...';
					}
					item.InfoContent = htmlEncode(item.InfoContent);
					todoDiv = $(
						'<div  class="todo-div" data-PCLinkType=' + item.PCLinkType + ' data-SysID=' + item.SysID + ' data-url=' +
						item
						.PCLink +
						' ><span></span><span class=' +
						fontColor + '>' + item.InfoSourceName +
						'</span><span  class="todo-div-content" title=' + item.InfoContentTitle + ' > ' + item.InfoContent +
						'</span><span></span><span class=' + todoclass1 + '> ' + item.timeSlot +
						'<b class=' + todoclass + '  >(' + dateTime + ')</b></span></div>'
					);
					$('.todo-box ').append(todoDiv);


				})
				if ($('.todo-box .todo-div') && $('.todo-box .todo-div').length > 6 || (page > 0 && $('.todo-box .todo-div') && $(
						'.todo-box .todo-div').length > 5)) {
					$('.infoCenter-option-box').css('overflow-y', 'scroll');
					var scrollPX = 14 - ($('.todo-box')[0].offsetWidth - $('.todo-box')[0].scrollWidth) - 3 + 'px'; //计算滚动条大小
					$('.todo-div-name').css('margin-right', scrollPX);
					// $('.todo-div-content').css('transform','translate(-341px, -50%)');
					// console.log($('.todo-box .todo-div').length);
				} else {
					$('.infoCenter-option-box').css('overflow-y', 'hidden');
					$('.todo-div-name').css('margin-right', '14px');
					// $('.todo-div-content').css('transform','translate(-345px, -50%)');
				}
				// console.log($('.todo-box')[0].offsetWidth);
				// console.log(;
				// if(!$('todo-div-name').Children('b').attr('class')){
				// 	$
				// }
				$('.todo-div').off().click(function() {
					var $this = $(this);
					if ($this.attr('data-PCLinkType') == 1) {
						var url = '';
						if (!sysIPArr[$this.attr('data-SysID')]) {
							getSysIP($this.attr('data-SysID'),
								function(data) {
									url = data + '/' + $this.attr('data-url');
									window.open(url, '_blank');
								});

						} else {
							url = sysIPArr[$this.attr('data-SysID')] + $this.attr('data-url');
							window.open(url, '_blank');
						}

					} else {
						if ($(this).attr('data-SysID') == 621 || $(this).attr('data-SysID') == 622 || $(this).attr('data-SysID') ==
							623) {
							$('.assistant-popup-loading').show();
							commonOpenClient($this.attr('data-url'));
							setTimeout(function() {
								$('.assistant-popup-loading').hide();
							}, 3000)

						}
					}


				})
				if (todoListTotalCount > 15) {
					$('.todo-box ').append($('<div class="frame_pager_center pager1 "></div>'));
					setTodoPager(todoListTotalCount, page)
				}
				$('.todo-box').scrollTop(0);


				$('.message').css('display', 'none');
				$('.chat').css('display', 'none');
				$('.notice').css('display', 'none');
				$('.news').css('display', 'none');

				// console.log(data);



			}
			$('.assistant-popup-loading').hide();
		})



	}

	// 分页函数调用
	function handlePaginationClick1(new_page_index, pagination_container) {
		setTodoPager(todoListTotalCount, new_page_index);
		todoFn(new_page_index);
	};

	function setTodoPager(totalNum, currentNum) {
		$(".pager1").pagination(totalNum, {
			//回调函数，每次点击页面或上下页及跳转按钮的时候执行的函数
			callback: handlePaginationClick1,
			//初始化时，高亮的页码，默认为0，即第一页
			current_page: currentNum,
			//每页项目数，默认为10，这仅仅用于计算分页ui的显示，实际数据的写入需要回调函数完成
			items_per_page: 15,
			//显示可点击页码数量
			num_display_entries: 3,
			prev_text: '<',
			next_text: '>',
			link_to: 'javascript:;'
		})
		$('.pager1 .pagination .pagination_go_button').css('position', 'relative');
		$('.pager1 .pagination .pagination_go_button').append($('<div class="pager-click-shadow1 pager-click-shadow"></div>'))
		$('.pager-click-shadow1').off().click(function() {
			if (isRealNum($(this).parent().parent().children('.pagination_go_input').val()) && $(this).parent().parent().children(
					'.pagination_go_input').val() > 0) {
				var num = 0;
				if (isRealNum($(this).parent().prev().prev().prev().prev().text())) {
					num = $(this).parent().prev().prev().prev().prev().text();
				} else {
					num = $(this).parent().prev().prev().prev().prev().prev().text();
				}

				if (num >= $(this).parent().parent().children('.pagination_go_input').val() * 1) {
					$(this).parent().click();
				} else {
					assistantTipsFn('输入页面超过最大页码!');
					$(this).parent().parent().children('.pagination_go_input').val(' ');
					normal('.pager1 .pagination .pagination_go_input', 3);
				}

			} else {
				$(this).parent().parent().children('.pagination_go_input').val(' ');
				assistantTipsFn('输入的不是有效页码!');
				normal('.pager1 .pagination .pagination_go_input', 3);
			}
			if (event.stopPropagation) {
				// 针对 Mozilla 和 Opera
				event.stopPropagation();
			} else if (window.event) {
				// 针对 IE
				window.event.cancelBubble = true;
			}

		})

	};
	var messageLsitTotal = 0;
	//消息中心模块下的选项卡第二个
	function messageFn(page,state) {
		messageLsitTotal = 0;
		$('.assistant-popup-loading').show();
		$("div").remove(".message-div");
		$('.pager2').remove();
		ajaxN('PublicInfo/Notice/ReceiveNotice/GetNoticeList', 'get', {
			URL: messageURL,
			PageIndex: page + 1,
			PageSize: 15
		}, function(data) {
			if (data.StatusCode == 200) {
				$('.assistant-popup-loading').hide();
				
				if (messageLsit != null) {
					ajaxN('PsnMgr/InfoCentre/RecordLastReadTime', 'post', {
						ModuleID: 2,
					}, function() {
						GetNewRemindCountFn();
					})
					if(state=='1'&&$('.message').css('display')=='none'){
						return;
					}
					messageLsitTotal = data.Data.Item.Total;
					$('.infoCenter-option span strong').text(data.Data.Item.UnReadCount);
					messageLsit = data.Data.Item.NoticeList;
					$('.pager1').remove();
					$(".pager3").remove();
					$('.infoCenter-empty').hide();
					$('.message').css('display', 'block');
					messageLsit.map(function(item, idx) {
						var classname1 = '';
						var classname2 = '';
						if (item.IsRead == '0') {
							classname1 = 'new';
							classname2 = 'newfont';
						};
						var NoticeTitle = '""';
						if (item.NoticeTitle && item.NoticeTitle.length > 29) {
							NoticeTitle = '"' + item.NoticeTitle + '"';
							item.NoticeTitle = item.NoticeTitle.slice(0, 28) + '...';
						}
						item.EffectTime = item.EffectTime.slice(0, -3);

						messageDiv = $(
							'<div class="message-div" data-url=' + item.URL + ' ><span  class=' + classname1 +
							'></span><span title=' +
							NoticeTitle + '  class=' +
							classname2 + ' >' +
							item.NoticeTitle + '<i></i></span><span class="message-div-time" >' + item.EffectTime + '</span><span>' +
							item.PublisherName +
							'</span></div>')
						$('.message-box').append(messageDiv);
					})
					if ($('.message-box .message-div') && $('.message-box .message-div').length > 7 || ($(
							'.message-box .message-div') && $('.message-box .message-div').length > 6 && page > 0)) {
						$('.infoCenter-option-box').css('overflow-y', 'scroll');
						var scrollPX = 17 - ($('.message-box')[0].offsetWidth - $('.message-box')[0].scrollWidth) - 1 + 'px'; //计算滚动条大小
						$('.message-div-time').css('margin-right', scrollPX);
					} else {
						$('.infoCenter-option-box').css('overflow-y', 'hidden');
						$('.message-div-time').css('margin-right', '17px');
					}
					// if (messageLsit && messageLsit.length > 9) {
					// 	$('.message-div-name').css('width', '136px');
					// 	$('.message-div-name').css('margin-right', '25px');
					// 	
					// } else {
					// 	$('.message-div-name').css('width', '143px');
					// 	$('.message-div-name').css('margin-right', '17px');
					// }
					if (messageLsitTotal > 15) {
						$('.message-box ').append($('<div class="frame_pager_center pager3 "></div>'));
						setMessagePager(messageLsitTotal, page)
					}
				} else {
					$('.infoCenter-empty').show();
					$('.infoCenter-empty-text').text($('.info-active').eq(1).text());
					$('.assistant-popup-loading').hide();
				}

				$('.message-box').scrollTop(0);
				$('.message-div').off().click(function() {
					window.open($(this).attr('data-url'), '_blank');
					setTimeout(function() {
						messageFn(page,'1');
					}, 3000)
				})
			} else {
				assistantTipsFn(data.Msg);
			}
			$('.todo').css('display', 'none');
			$('.chat').css('display', 'none');
			$('.notice').css('display', 'none');
			$('.news').css('display', 'none');

		})
	};
	// 分页函数调用
	function handlePaginationClick3(new_page_index, pagination_container) {
		setMessagePager(messageLsitTotal, new_page_index);
		messageFn(new_page_index);
	};

	function setMessagePager(totalNum, currentNum) {
		$(".pager3").pagination(totalNum, {
			//回调函数，每次点击页面或上下页及跳转按钮的时候执行的函数
			callback: handlePaginationClick3,
			//初始化时，高亮的页码，默认为0，即第一页
			current_page: currentNum,
			//每页项目数，默认为10，这仅仅用于计算分页ui的显示，实际数据的写入需要回调函数完成
			items_per_page: 15,
			//显示可点击页码数量
			num_display_entries: 3,
			prev_text: '<',
			next_text: '>',
			link_to: 'javascript:;'
		});
		$('.pager3 .pagination .pagination_go_button').css('position', 'relative');
		$('.pager3 .pagination .pagination_go_button').append($('<div class="pager-click-shadow3 pager-click-shadow"></div>'))
		$('.pager-click-shadow3').off().click(function() {
			if (isRealNum($(this).parent().parent().children('.pagination_go_input').val()) && $(this).parent().parent().children(
					'.pagination_go_input').val() > 0) {
				var num = 0;
				if (isRealNum($(this).parent().prev().prev().prev().prev().text())) {
					num = $(this).parent().prev().prev().prev().prev().text();
				} else {
					num = $(this).parent().prev().prev().prev().prev().prev().text();
				}

				if (num >= $(this).parent().parent().children('.pagination_go_input').val() * 1) {
					$(this).parent().click();
				} else {
					assistantTipsFn('输入页面超过最大页码!');
					$(this).parent().parent().children('.pagination_go_input').val(' ');
					normal('.pager3 .pagination .pagination_go_input', 3);
				}

			} else {
				$(this).parent().parent().children('.pagination_go_input').val(' ');
				assistantTipsFn('输入的不是有效页码!');
				normal('.pager3 .pagination .pagination_go_input', 3);
			}

			if (event.stopPropagation) {
				// 针对 Mozilla 和 Opera
				event.stopPropagation();
			} else if (window.event) {
				// 针对 IE
				window.event.cancelBubble = true;
			}

		})

	};

	// chat();
	//消息中心模块下的选项卡第三个
	function chatFn() {
		$('.infoCenter-empty').hide();
		$("div").remove(".chat-div");
		var chatLsit = [{
			name: '小红',
			id: 'zustu_00600',
			content: '关于2019昨天的作业做完了吗？',
			time: '2019-09-17-11:00',
			number: '1',
			imgurl: PsnMgrLgAssistantAddr + '/PsnMgr/LgAssistant/images/模块图标_教务窗口.png'
		}, {
			name: '小红',
			id: 'zustu_00600',
			content: '关于2019昨天的作业做完了吗？',
			time: '2019-08-16-11:00',
			number: '12',
			imgurl: PsnMgrLgAssistantAddr + '/PsnMgr/LgAssistant/images/模块图标_教务窗口.png'
		}, {
			name: '小红',
			id: 'zustu_00600',
			content: '关于2019昨天的作业做完了吗？',
			time: '2019-09-16-11:00',
			number: '122',
			imgurl: PsnMgrLgAssistantAddr + '/PsnMgr/LgAssistant/images/模块图标_教务窗口.png'
		}, {
			name: '小红',
			id: 'zustu_00600',
			content: '关于2019昨天的作业做完了吗？',
			time: '2019-09-17-11:00',
			number: '1',
			imgurl: PsnMgrLgAssistantAddr + '/PsnMgr/LgAssistant/images/模块图标_教务窗口.png'
		}, {
			name: '小红',
			id: 'zustu_00600',
			content: '关于2019昨天的作业做完了吗？',
			time: '2019-09-17-11:00',
			number: '1',
			imgurl: PsnMgrLgAssistantAddr + '/PsnMgr/LgAssistant/images/模块图标_教务窗口.png'
		}, {
			name: '小红',
			id: 'zustu_00600',
			content: '关于2019昨天的作业做完了吗？',
			time: '2019-09-17-11:00',
			number: '1',
			imgurl: PsnMgrLgAssistantAddr + '/PsnMgr/LgAssistant/images/模块图标_教务窗口.png'
		}, {
			name: '小红',
			id: 'zustu_00600',
			content: '关于2019昨天的作业做完了吗？',
			time: '2019-09-17-11:00',
			number: '1',
			imgurl: PsnMgrLgAssistantAddr + '/PsnMgr/LgAssistant/images/模块图标_教务窗口.png'
		}];
		chatLsit.map(function(item) {
			var newtime = '';
			var date = new Date();
			var year = date.getFullYear(); //年
			var month = date.getMonth() + 1; //月
			var day = date.getDate(); //日
			var arrtime = item.time.split('-');
			if (arrtime[0] == year && arrtime[1] == month && arrtime[2] == day) {
				newtime = '[' + arrtime[3] + '] ';
			} else {
				newtime = arrtime[0] + '-' + arrtime[1] + '-' + arrtime[2] + ' [' + arrtime[3] + '] ';
			};
			if (item.number == 1) {
				chatDiv = $(
					'<div class="chat-div"><i style="background-image:url(' + item.imgurl + ') ;" > </i><span>' +
					item.name + '<i>(' + item.id + ')</i><i >' + newtime + '' + item.content +
					'</i></span><span><i><b> </b>加入常用联系人</i><i><b> </b>屏蔽此人</i><i><b> </b>清除信息</i></span></div>'
				);
			} else {
				if (item.number >= 99) {
					item.number = '99+';
				};
				chatDiv = $(
					'<div class="chat-div"><i style="background-image:url(' + item.imgurl + ') ;" > </i><span>' +
					item.name + '<i>(' + item.id + ')</i><i>' + newtime + '' + item.content + '</i><b>' + item.number +
					'</b></span><span><i><b> </b>加入常用联系人</i><i><b> </b>屏蔽此人</i><i><b> </b>清除信息</i></span></div>'
				);
			};
			$('.chat-box').append(chatDiv);
		});
		$('.message').css('display', 'none');
		$('.todo').css('display', 'none');
		$('.notice').css('display', 'none');
		$('.news').css('display', 'none');
		$('.chat').css('display', 'block');
		if ($('.chat-div') && $('.chat-div').length == 0) {
			$('.infoCenter-empty').show();
			$('.infoCenter-empty-text').text($('.info-active').eq(1).text());
			$('.assistant-popup-loading').hide();
		}
	};
	// notice();
	var noticeLsitTotalCount = 0;
	//消息中心模块下的选项卡第四个
	function noticeFn(page) {
		noticeLsitTotalCount = 0;
		$('.notice-clear').show();
		$('.infoCenter-empty').hide();
		$('.assistant-popup-loading').show();
		$("div").remove(".notice-div");
		$('.pager1').remove();
		$('.pager2').remove();
		$(".pager3").remove();
		ajaxN('PsnMgr/InfoCentre/GetMessageList', 'get', {
			PageIndex: page + 1,
			PageSize: 15
		}, function(data) {
			$('.assistant-popup-loading').hide();
			if (data.StatusCode == 200) {
				noticeLsit = data.Data.Children;
				if (noticeLsit.length == 0) {
					$('.notice-clear').hide();
					$('.infoCenter-empty').show();
					$('.infoCenter-empty-text').text($('.info-active').eq(1).text());
					$('.assistant-popup-loading').hide();
					return;
				}
				noticeLsitTotalCount = data.Data.TotalCount;
				ajaxN('PsnMgr/InfoCentre/GetNewRemindCount', 'get', {}, function(data) {
					$('.notice strong').text(data.Data.MessageCount);
					ajaxN('PsnMgr/InfoCentre/RecordLastReadTime', 'post', {
						ModuleID: 4,
					}, function() {
						GetNewRemindCountFn();
					})
				
				
				$('.infoCenter-empty').hide();
				$("div").remove(".notice-div");
				noticeLsit.map(function(item, idx) {
					item.InfoContentAll = '""';
					if (item.InfoContent && item.InfoContent.length > 70) {
						item.InfoContentAll = '"' + item.InfoContent + '"';
						item.InfoContent = item.InfoContent.slice(0, 69) + '...';
					}
					item.InfoContent = htmlEncode(item.InfoContent);
					item.InfoSourceName = htmlEncode(item.InfoSourceName);
					var classname6 = '';
					if (!item.SortID) {
						classname6 = 'notice-unshield';
					}
					noticeDiv = $(
						'<div class="notice-div lgAssistantClearfix" data-SysID="' + item.SysID + '" data-type="' + item.PCLinkType +
						'" data-url=' +
						item.PCLink +
						'><span></span><span title=' + item.InfoContentAll +
						' >' + item.InfoContent +
						'</span><span  class="notice-div-time" >' + item.RemindTime +
						'</span><span>' + item.InfoSourceName +
						'</span><span class=' + classname6 + '><i class="notice-shield"  data-SortID="' + item.SortID +
						' "data-id=' + item.InfoID +
						'  ><b> </b>屏蔽此类消息</i><i class="notice-del" data-id=' + item.InfoID +
						'  ><b></b>删除</i></span></div>'
					);
					$('.notice-box').append(noticeDiv);

				});
				$('.message').css('display', 'none');
				$('.chat').css('display', 'none');
				$('.todo').css('display', 'none');
				$('.news').css('display', 'none');
				$('.notice').css('display', 'block');
				//系统消息点击跳转
				$('.notice-div').off().click(function() {

					if ($(this).attr('data-type') == 1) {
						if (!sysIPArr[$(this).attr('data-SysID')]) {
							getSysIP($(this).attr('data-SysID'),
								function(data) {
									var url = data + '/' + $(this).attr('data-url');
									window.open(url, '_blank');
								});
						} else {
							var url = sysIPArr[$(this).attr('data-SysID')] + $(this).attr('data-url');
							window.open(url, '_blank');
						}
					} else {
						if ($(this).attr('data-SysID') == 621 || $(this).attr('data-SysID') == 622 || $(this).attr('data-SysID') ==
							623) {
							$('.assistant-popup-loading').show();
							commonOpenClient($this.attr('data-url'));
							setTimeout(function() {
								$('.assistant-popup-loading').hide();
							}, 3000)

						}
					}
				})
				//系统消息删除
				$('.notice-del').off().click(function() {
					var $this = $(this);
					assistantRemindFn(['确定删除该系统消息？', '确定', '取消'], function(data) {
						if (data) {
							ajaxN('PsnMgr/InfoCentre/OperateMessage', 'post', {
								"OperateFlag": -1,
								"InfoID": $this.attr('data-id')
							}, function(data) {
								if (data.StatusCode == 200) {
									assistantSmallSuccessFn('删除成功！');
									noticeFn(page);
								} else {
									assistantTipsFn(data.Msg);
								}
							})
						}
					})
					if (event.stopPropagation) {
						// 针对 Mozilla 和 Opera
						event.stopPropagation();
					} else if (window.event) {
						// 针对 IE
						window.event.cancelBubble = true;
					}
				})
				$('.notice-shield').off().click(function() {
					var $this = $(this);
					ajaxN('PsnMgr/InfoCentre/ReceiveSetting', 'post', {
						"SortIDStr": $(this).attr('data-SortID'), // 消息类型字符串 以 ,号分割
						"FlagStr": "1",
					}, function(data) {
						if (data.StatusCode == 200) {
							ajaxN('PsnMgr/InfoCentre/OperateMessage', 'post', {
								"OperateFlag": -1,
								"InfoID": $this.attr('data-id'),
							}, function(data1) {
								if (data1.StatusCode == 200) {
									assistantSmallSuccessFn('屏蔽此类消息成功！');
									noticeFn(page);
								} else {
									assistantTipsFn(data.Msg);
								}
							})
						} else {
							assistantTipsFn(data.Msg);
						}
					})
					if (event.stopPropagation) {
						// 针对 Mozilla 和 Opera
						event.stopPropagation();
					} else if (window.event) {
						// 针对 IE
						window.event.cancelBubble = true;
					}
				})
				$('.notice-clear span').off().click(function() {
					assistantRemindFn(['确认清空所有的系统消息？', '确定', '取消'], function(data) {
						if (data) {
							ajaxN('PsnMgr/InfoCentre/OperateMessage', 'post', {
								"OperateFlag": -2,
								"InfoID": '',
							}, function(data) {
								if (data.StatusCode == 200) {
									$('.notice-div').remove();
									assistantSmallSuccessFn('清空成功！');
									$('.notice-clear').hide();
									$('.infoCenter-empty').show();
									$('.infoCenter-empty-text').text($('.info-active').eq(1).text());
									$('.pager2').remove();
									$('.notice-clear').hide();
								} else {
									assistantTipsFn(data.Msg);

								}
							})

						}
					})
				})
				// if ($('.notice-div').length == 0) {
				// 	$('.infoCenter-empty').show();
				// 	$('.infoCenter-empty-text').text($('.info-active').eq(1).text());
				// }
				// if ($('.notice-box .notice-div') && $('.notice-box .notice-div').length > 5 || ($('.notice-box .notice-div') &&
				// 		$('.notice-box .notice-div').length > 4 && noticeLsit && noticeLsit.length > 15)) {
				// 	$('.infoCenter-option-box').css('overflow-y', 'scroll');
				// 	var scrollPX = 11 - ($('.notice-box')[0].offsetWidth - $('.notice-box')[0].scrollWidth) + 'px'; //计算滚动条大小
				// 	$('.notice-div-time').css('margin-right', scrollPX);
				// } else {
				// 	$('.infoCenter-option-box').css('overflow-y', 'hidden');
				// 	$('.notice-div-time').css('margin-right', '12px');
				// }
				// if (noticeLsit && noticeLsit.length > 9) {
				// 	// $('.notice-div-name').css('margin-left', '499px');
				// } else {
				// 	// $('.notice-div-name').css('margin-left', '490px');
				// }
				if (noticeLsitTotalCount > 15) {
					$('.notice-box').append($('<div class="frame_pager_center pager2 "></div>'));
					setNoticePager(noticeLsitTotalCount, page);
				}
				$('.notice-box').scrollTop(0);
				// document.getElementByclassName('notice-box').scrollTop = 0;
				if (page > 0 && $('.notice-box .notice-div') && $('.notice-box .notice-div').length == 0) {
					noticeFn(page - 1);
				}
				})
			} else {
				assistantTipsFn(data.Msg);
				$('.infoCenter-empty').show();
			}
		})



	};

	// 分页函数调用
	function handlePaginationClick2(new_page_index, pagination_container) {
		setNoticePager(noticeLsitTotalCount, new_page_index);
		noticeFn(new_page_index);
	};

	function setNoticePager(totalNum, currentNum) {
		$('.pager2').pagination(totalNum, {
			//回调函数，每次点击页面或上下页及跳转按钮的时候执行的函数
			callback: handlePaginationClick2,
			//初始化时，高亮的页码，默认为0，即第一页
			current_page: currentNum,
			//每页项目数，默认为10，这仅仅用于计算分页ui的显示，实际数据的写入需要回调函数完成
			items_per_page: 15,
			//显示可点击页码数量
			num_display_entries: 3,
			prev_text: '<',
			next_text: '>',
			link_to: 'javascript:;'
		});
		$('.pager2 .pagination .pagination_go_button').css('position', 'relative');
		$('.pager2 .pagination .pagination_go_button').append($('<div class="pager-click-shadow2 pager-click-shadow"></div>'))
		$('.pager-click-shadow2').off().click(function() {
			if (isRealNum($(this).parent().parent().children('.pagination_go_input').val()) && $(this).parent().parent().children(
					'.pagination_go_input').val() > 0) {
				var num = 0;
				if (isRealNum($(this).parent().prev().prev().prev().prev().text())) {
					num = $(this).parent().prev().prev().prev().prev().text();
				} else {
					num = $(this).parent().prev().prev().prev().prev().prev().text();
				}

				if (num >= $(this).parent().parent().children('.pagination_go_input').val() * 1) {
					$(this).parent().click();
				} else {
					assistantTipsFn('输入页面超过最大页码!');
					$(this).parent().parent().children('.pagination_go_input').val(' ');
					normal('.pager2 .pagination .pagination_go_input', 3);
				}

			} else {
				$(this).parent().parent().children('.pagination_go_input').val(' ');
				assistantTipsFn('输入的不是有效页码!');
				normal('.pager2 .pagination .pagination_go_input', 3);
			}

			if (event.stopPropagation) {
				// 针对 Mozilla 和 Opera
				event.stopPropagation();
			} else if (window.event) {
				// 针对 IE
				window.event.cancelBubble = true;
			}

		})

	};

	// news();
	//消息中心模块下的选项卡第五个
	function newsFn() {
		$('.infoCenter-empty').hide();
		$("div").remove(".news-div");
		var newslsit = [{
			title: '我校召开2017年本科教学工作会议',
			content: '9月1日，学校2在堂召开。校领导张、徐华蕊、曹辉景、钟平出席会议徐华蕊、曹辉景、钟平出席会议徐华蕊、曹辉景、钟平出席会议',
			time: '2019-09-17-11:00',
			imgurl: PsnMgrLgAssistantAddr + '/PsnMgr/LgAssistant/images/个人报告_更换.png'
		}, {
			title: '我校召开2017年本校召开2017年本科教学科教学工作会议',
			content: '9月1日，学校2在堂召开。校领导张、徐华蕊、曹辉景、钟平出席会议徐华蕊、曹辉景、钟平出席会议徐华蕊、曹辉景、钟平出席会议',
			time: '2019-09-17-11:00',
			imgurl: PsnMgrLgAssistantAddr + '/PsnMgr/LgAssistant/images/个人报告_更换.png'
		}, {
			title: '我校召开2017年本科教学工作会议',
			content: '9月1日，学校2在堂召开。校领导张、徐华蕊、曹辉景、月1日，学校2在堂召开。校领导钟平出席会议徐华蕊、曹辉景、钟平出席会议徐华蕊、曹辉景、钟平出席会议',
			time: '2019-09-17-11:00',
			imgurl: PsnMgrLgAssistantAddr + '/PsnMgr/LgAssistant/images/个人报告_更换.png'
		}, {
			title: '我校召开2017年本科教学工作会议',
			content: '9月1日，学校2在堂召开。校领导张、徐华蕊、曹辉景、钟平出席会议徐华蕊、曹辉景、钟平出席会议徐华蕊、曹辉景、钟平出席会议',
			time: '2019-09-17-11:00',
			imgurl: PsnMgrLgAssistantAddr + '/PsnMgr/LgAssistant/images/个人报告_更换.png'
		}, {
			title: '我校召开2017年本科教学工作会议',
			content: '议徐华蕊、曹辉景、钟平出席会议徐华蕊、曹辉景、钟平出席会议',
			time: '2019-09-17-11:00',
			imgurl: PsnMgrLgAssistantAddr + '/PsnMgr/LgAssistant/images/个人报告_更换.png'
		}];
		newslsit.map(function(item) {
			if (item.content && item.content.length > 62) {
				// console.log(item.content.length);
				item.content = item.content.substring(0, 61) + '...';
			};
			newsDiv = $(
				'<div class="news-div"><span style="background-image:url(' + item.imgurl + ') "></span><span><h6>' +
				item.title + '</h6><p>' + item.content + '</p><p>' + item.time + '</p></span><div class="clear"></div></div>'
			);

			$('.news-box').append(newsDiv);
		})
		$('.message').css('display', 'none');
		$('.chat').css('display', 'none');
		$('.notice').css('display', 'none');
		$('.todo').css('display', 'none');
		$('.news').css('display', 'block');
		if ($('.news-div') && $('.news-div').length == 0) {
			$('.infoCenter-empty').show();
			$('.infoCenter-empty-text').text($('.info-active').eq(1).text());
		}
	};



	//消息中心设置系统消息接收设置
	function settingOption1Fn() {
		$('.setting-option3').hide();
		$('.setting-option2').hide();
		$(".setting-option1 div").remove();
		var shieldList = '';
		$('.assistant-popup-loading').show();
		ajaxN('PsnMgr/InfoCentre/GetMessageSettingList', 'get', {
			UserClass: 0
		}, function(data) {
			$('.assistant-popup-loading').hide();
			if (data.StatusCode == 200) {
				shieldList = data.Data;
				shieldList.map(function(item, idx) {
					var settingClassName = ' ';
					settingClassName = item.Children.some(function(ite) {
						return ite.IsUnPush == 0;
					});
					if (settingClassName) {
						settingClassName = 'choosetrue';
					} else {
						settingClassName = ' ';
					}
					item.InfoSourceName.replace(new RegExp('（', 'g'), '(');
					item.InfoSourceName.replace(new RegExp('）', 'g'), ')');
					var settingOption1Div = '<div> <p>' + item.InfoSourceName + ' <b name=' + idx + ' class=' + settingClassName +
						' ></b> </p> ';

					item.Children.map(function(it) {
						settingClassName = ' ';
						if (it.IsUnPush == 0) {
							settingClassName = 'choosetrue';
						}
						it.SortDescription.replace(new RegExp('（', 'g'), '(');
						it.SortDescription.replace(new RegExp('）', 'g'), ')');
						it.SortDescriptionTitle = '"' + it.SortDescription + '"';
						it.SortDescription = htmlEncode(it.SortDescription);
						if (it.SortDescription.indexOf('(') > -1) {
							it.SortDescription = it.SortDescription.slice(0, it.SortDescription.indexOf('(')) +
								'(<b class = "setting-sortDescription">' + it.SortDescription.slice(it.SortDescription.indexOf('(') * 1 +
									1, -1) + ')</b>';
						}
						settingOption1Div += '<span title=' + it.SortDescriptionTitle + ' ><i class="triangle"   ></i> ' + it.SortDescription +
							' <b data-SortID =' + it.SortID + ' class=' +
							settingClassName + ' ></b> <i></i></span>';
					})
					settingOption1Div += '</div>';
					$('.setting-option1').append($(settingOption1Div));
				})
			}
			//消息中心的设置的系统消息接收设置模块的总开关变换
			$('.setting-option1 p>b').off().click(function() {
				var SortIDStr = '';
				var FlagStr = '';
				if ($(this).attr('class')) {
					$(this).attr('class', '');
					$(this).parent().parent().children('span').children('b').attr('class', '');
					shieldList[$(this).attr('name')].Children.map(function(item) {
						SortIDStr += item.SortID + ',';
						FlagStr += 1 + ',';
					})
				} else {
					$(this).attr('class', 'choosetrue');
					$(this).parent().parent().children('span').children('b').attr('class', 'choosetrue');
					shieldList[$(this).attr('name')].Children.map(function(item) {
						SortIDStr += item.SortID + ',';
						FlagStr += 0 + ',';
					})
				};
				SortIDStr = SortIDStr.slice(0, SortIDStr.length - 1);
				FlagStr = FlagStr.slice(0, FlagStr.length - 1);
				console.log(SortIDStr);
				ajaxN('PsnMgr/InfoCentre/ReceiveSetting', 'post', {
					"SortIDStr": SortIDStr, // 消息类型字符串 以 ,号分割
					"FlagStr": FlagStr, //  屏蔽或接收设置字符串，与SortIDStr一一对应 以 ,号分割;  0--取消屏蔽   1--屏蔽
				}, function(data) {
					if (data.StatusCode == 200) {
						// console.log(data.Msg);
						// assistantSmallSuccessFn('设置成功')
					}
				})

			});
			//消息中心的设置的系统消息接收设置模块的开关变换
			$('.setting-option1 span>b').off().click(function() {
				var SortIDStr = '';
				var FlagStr = '';
				if ($(this).attr('class')) {
					$(this).attr('class', '');
					if ($(this).parent().parent().children('span').children('.choosetrue') && $(this).parent().parent().children(
							'span').children('.choosetrue').length == 0) {
						$(this).parent().parent().children('p').children('b').attr('class', '');
					}

					SortIDStr = $(this).attr('data-SortID');
					FlagStr = '1';
				} else {
					$(this).attr('class', 'choosetrue');
					$(this).parent().parent().children('p').children('b').attr('class', 'choosetrue');
					SortIDStr = $(this).attr('data-sortID');
					FlagStr = '0';
				};
				// $('.assistant-popup-loading').show();
				console.log(SortIDStr);
				ajaxN('PsnMgr/InfoCentre/ReceiveSetting', 'post', {
					"SortIDStr": SortIDStr, // 消息类型字符串 以 ,号分割
					"FlagStr": FlagStr, //  屏蔽或接收设置字符串，与SortIDStr一一对应 以 ,号分割;  0--取消屏蔽   1--屏蔽
				}, function(data) {
					// $('.assistant-popup-loading').hide();
					if (data.StatusCode == 200) {

						// assistantSmallSuccessFn('设置成功')
					} else {
						assistantTipsFn('请求出错!');
					}
				})
			});
			$('.setting-popup').show();
			// $('.setting-popup div').eq(1).css('transition', 'all 0.8s');
			// setTimeout(function() {
			// 	$('.setting-popup div').eq(1).css('transform', 'scale(1)');
			// 	$('.setting-popup div').eq(1).css('right', '0');
			// 	$('.setting-popup div').eq(1).css('top', '0');
			// 	$('.setting-popup div').eq(1).css('opacity', '1');
			// 	$('.setting-popup  div').eq(0).show();
			// }, 800)
			$('.setting-popup div').eq(1).animate({
				right: '0'
			}, 'slow', function() {
				$('.setting-popup  div').eq(0).show();
			});

		})
	};

	//消息中心设置在线交流模块动态生成
	function settingOption2Fn() {
		$("span").remove(".setting-option-span");
		var shieldList = [{
			name: '小米',
			tel: '1313123213'
		}, {
			name: '小米',
			tel: '1313123213'
		}, {
			name: '小米',
			tel: '1313123213'
		}, {
			name: '小米',
			tel: '1313123213'
		}, {
			name: '小米',
			tel: '1313123213'
		}, {
			name: '小米小',
			tel: '1313123213'
		}, {
			name: '小米小米',
			tel: '1313123213'
		}];
		shieldList.map(function(item) {
			var settingOption2Span = $("<span class='setting-option-span'><i></i><b>" + item.name +
				"<i>(" +
				item.tel +
				")</i></b><a>移除</a><i></i>" + "</span>")
			$('.setting-option2 ').append(settingOption2Span);
		});
		//消息中心的设置的在线交流屏蔽名单模块的移除
		$('.setting-option2 a').click(function() {
			$(this).parent().remove();

			if ($('.setting-option2 ').children() && $('.setting-option2 ').children().length == 0) {
				var div = $("<div>没有屏蔽名单的数据哦</div>")
				$('.setting-option2').append(div);
			};
		});
	};

	//消息中心设置屏蔽群消息模块动态生成
	function settingOption3Fn() {
		$("span").remove(".setting-option-span");
		var groupList = [{
			name: '中考英语写作能力速成班',
			open: 'true'
		}, {
			name: '中考英语口语速成班',
			open: 'true'
		}, {
			name: '中考现代汉语写作专项训练班',
			open: 'false'
		}, {
			name: '中考数学一元二次方程专项训练班',
			open: 'true'
		}, {
			name: '九年级17001班',
			open: 'true'
		}, {
			name: '111111111111',
			open: 'true'
		}, {
			name: '111111111111',
			open: 'true'
		}, {
			name: '111111111111',
			open: 'false'
		}, {
			name: '111111111111',
			open: 'false'
		}];
		groupList.map(function(item) {
			var settingOption3Span = '';
			if (item.open == 'true') {
				settingOption3Span = $("<span class='setting-option-span'> <i></i><b>" + item.name +
					"</b><a class='choosetrue'></a><i></i></span>");
			} else {
				settingOption3Span = $("<span class='setting-option-span'>  <i></i><b>" + item.name +
					"</b><a></a><i></i></span>");
			};
			$('.setting-option3 ').append(settingOption3Span);
		});

		$('.setting-option3 a').click(function() {
			if ($(this).attr('class')) {
				$(this).attr('class', '');
			} else {
				$(this).attr('class', 'choosetrue');
			};
		});
	};


	$('.assistant-outline-true').click(function() {
		history.go(0);
	})

	// laAssistantOnlineTimer = setInterval(function() {
	// 	$.getScript(PsnMgrMainServerAddr + 'UserMgr/Login/Api/Login.ashx?method=IsOnline&params=' + UserID +
	// 		'&token=' +
	// 		PsnMgrToken +
	// 		'&jsoncallback=AgassitantCallbackFn');
	// }, 30001);
};
//离线判断函数
function AgassitantCallbackFn(result) {
	console.log(result);
	if (result.error == 0) {
		if (result.data.result.charAt(result.data.result.length - 1) == 0) {
			$('.assistant-outline').show();
			clearInterval(laAssistantOnlineTimer);
			$('.assistant-hover-box').off().click(function() {
				history.go(0);
			});
		}
	}
	if (result.error == 3) {
		$('.assistant-outline').show();
		clearInterval(laAssistantOnlineTimer);
		$('.assistant-hover-box').off().click(function() {
			history.go(0);
		});
	}

}
