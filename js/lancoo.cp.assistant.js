var PsnMgrToken = ''; //token
var PsnMgrMainServerAddr = ''; //基础平台地址
var PsnMgrLgAssistantAddr = ''; //小助手平台地址
var laAssistantOnlineTimer = ''; //离线定时器

//关闭小助手页面
function closeAssistantFn() {
	if ($('.assistant-popup').css('opacity') == 1) {
		$('.assistant-hover-box').click();
	}
}


//小助手核心代码
function Agassitant() {
	// 开发环境的PsnMgrToken ,PsnMgrMainServerAddr，PsnMgrLgAssistantAddr获取
	// 	sessionStorage.setItem('PsnMgrToken', '5150eb2f-a39f-44dd-bf57-270dde2458e5');
	// 	sessionStorage.setItem('PsnMgrMainServerAddr', 'http://192.168.129.130:10102/');
	// 	sessionStorage.setItem('PsnMgrLgAssistantAddr', 'http://192.168.129.130:1111/');

	//参数非空判断
	if (!sessionStorage.getItem('PsnMgrToken') || !sessionStorage.getItem('PsnMgrMainServerAddr') || !sessionStorage.getItem(
			'PsnMgrLgAssistantAddr')) {
		alert('无sessionStorage数据~');
		return;
	}

	//生生产环境的token获取

	PsnMgrToken = sessionStorage.getItem('PsnMgrToken');
	PsnMgrMainServerAddr = sessionStorage.getItem('PsnMgrMainServerAddr');
	PsnMgrLgAssistantAddr = sessionStorage.getItem('PsnMgrLgAssistantAddr');
	// PsnMgrLgAssistantAddr = 'http://192.168.129.75:1111/'; //开发环境
	//缓存动画图片
	$('body').append(
		'<div class="assistant-photo-loading"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>'
	);

	var imgUrl1 = PsnMgrLgAssistantAddr + "/PsnMgr/LgAssistant/images/assistant/入场.png";
	var imgUrl2 = PsnMgrLgAssistantAddr + "/PsnMgr/LgAssistant/images/assistant/打招呼.png";
	var imgUrl3 = PsnMgrLgAssistantAddr + "/PsnMgr/LgAssistant/images/assistant/待机动作一.png";
	var imgUrl4 = PsnMgrLgAssistantAddr + "/PsnMgr/LgAssistant/images/assistant/待机动作二.png";
	var imgUrl5 = PsnMgrLgAssistantAddr + "/PsnMgr/LgAssistant/images/assistant/应激.png";
	var imgUrl6 = PsnMgrLgAssistantAddr + "/PsnMgr/LgAssistant/images/assistant/台历.png";
	var imgUrl7 = PsnMgrLgAssistantAddr + "/PsnMgr/LgAssistant/images/assistant/摇铃.png";
	var imgUrl8 = PsnMgrLgAssistantAddr + "/PsnMgr/LgAssistant/images/assistant/眨眼.png";
	var imgUrl9 = PsnMgrLgAssistantAddr + "/PsnMgr/LgAssistant/images/assistant/唤醒.png";
	var imgUrl0 = PsnMgrLgAssistantAddr + "/PsnMgr/LgAssistant/images/assistant/睡觉.png";
	var imgUrl11 = PsnMgrLgAssistantAddr + "/PsnMgr/LgAssistant/images/assistant/待机动作三.png";
	var imgUrl12 = PsnMgrLgAssistantAddr + "/PsnMgr/LgAssistant/images/assistant/待机动作四.png";
	$('.assistant-photo-loading i').eq(0).css('background', 'url( ' + imgUrl1 + ') no-repeat 0px 0px');
	$('.assistant-photo-loading i').eq(1).css('background', 'url( ' + imgUrl2 + ') no-repeat 0px 0px');
	$('.assistant-photo-loading i').eq(2).css('background', 'url( ' + imgUrl3 + ') no-repeat 0px 0px');
	$('.assistant-photo-loading i').eq(3).css('background', 'url( ' + imgUrl4 + ') no-repeat 0px 0px');
	$('.assistant-photo-loading i').eq(4).css('background', 'url( ' + imgUrl5 + ') no-repeat 0px 0px');
	$('.assistant-photo-loading i').eq(5).css('background', 'url( ' + imgUrl6 + ') no-repeat 0px 0px');
	$('.assistant-photo-loading i').eq(6).css('background', 'url( ' + imgUrl7 + ') no-repeat 0px 0px');
	$('.assistant-photo-loading i').eq(7).css('background', 'url( ' + imgUrl8 + ') no-repeat 0px 0px');
	$('.assistant-photo-loading i').eq(8).css('background', 'url( ' + imgUrl9 + ') no-repeat 0px 0px');
	$('.assistant-photo-loading i').eq(9).css('background', 'url( ' + imgUrl0 + ') no-repeat 0px 0px');
	$('.assistant-photo-loading i').eq(10).css('background', 'url( ' + imgUrl11 + ') no-repeat 0px 0px');
	$('.assistant-photo-loading i').eq(11).css('background', 'url( ' + imgUrl12 + ') no-repeat 0px 0px');


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


	// 生产环境的用户信息的获取
	$.getScript(PsnMgrMainServerAddr + 'UserMgr/Login/Api/Login.ashx?method=GetUserInfo&params=000&token=' + PsnMgrToken +
		'&jsoncallback=AgassitantCallbackFunction');
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
	var SubjectIDArr = decodeURIComponent(assistantData.SubjectIDs).split(','); //用户名称
	var SubjectNameArr = decodeURIComponent(assistantData.SubjectNames).split(','); //用户名称
	var termEndDate = ''; //学期日程选择结束时间
	var termStartDate = ''; //学期日程选择开始时间
	var termName = ''; //学期名
	var sysIPArr = {}; //存放各个平台iP；
	var sysWebArr = {}; //存放各个平台跳转地址前缀；
	var serverTime = '';
	var summaryStartTime = ''; //学情总结开始时间
	var summaryEndTime = ''; //学情总结结束时间
	if (SubjectNameArr[0] == "") {
		SubjectNameArr = ['语文', '数学'];
	}
	var SubjectID = SubjectIDArr[0];
	



	// 通知模块平台地址
	var messageURL = '';
	// 学情总结平台地址
	var summaryURL = '';
	// 成绩管理平台地址
	var gradeManageURL = '';
	var initialization = false;

	//未读信息参数
	var assistantRemindArr = []; //未读信息类型存放
	var assistantRemindArrOld = []; //未读信息正在轮播的类型存放
	var scheduleRemindList = []; //未读日程消息内容存放
	var allRemindCount = 0; //总提醒总数
	var scheduleRemindCount = 0; //日程提醒总数
	var TodoRemindCount = 0; //待办事项提醒总数
	var NoticeRemindCount = 0; //通知提醒总数
	var ChatRemindCount = 0; //聊天消息提醒总数
	var MessageRemindCount = 0; //系统消息提醒总数
	var NewsRemindCount = 0; //新闻资讯提醒总数
	var onlyRemindType = 1; //只有一种类型提醒消息判断参数 1为是， 0为不是
	var assistantTimeUpdata = true; //提醒消息的数据是否已更新
	//获取学期信息和服务器时间
	ajaxN('PsnMgr/Schedule/GetTermInformation', 'get', {}, function (data) {
		if (data.StatusCode == 200 && data.ErrCode == 0) {
			termEndDate = data.Data.TermEndDate;
			termStartDate = data.Data.TermStartDate;
			termName = data.Data.TermName;
			serverTime = data.Data.ServerTime;
			$('.schedule-choose-date').text(serverTime.slice(0, 10));
			$('.schedule-choose-week').text(dataChangeTerm(termStartDate, serverTime.slice(0, 10)));
			$('.assistant-remind-count').attr('name', '-1');
			// 初始化获取未读消息和日程提醒
			ajaxN('PsnMgr/Schedule/GetScheduleRemindList', 'get', {
				ScheduleDate: serverTime.slice(0, 10)
			}, function (data) {
				if (data.StatusCode == 200 && data.ErrCode == 0) {
					if (data.Data.length > 0) {
						assistantRemindArr.push('0005');
						scheduleRemindCount = data.Data.length;
						// $('.popup-main1 ul li').eq(2).children().children().attr('class', 'info-unread4');
						scheduleRemindList = data.Data;
						$('.popup-nav-ul li').eq(0).children('b').attr('class', 'info-unread');
					}
				} else {
					scheduleRemindCount = 0;
				}
				ajaxN('PsnMgr/InfoCentre/GetNewRemindCount', 'get', {}, function (data) {
					if (data.StatusCode == 200 && data.ErrCode == 0) {
						if (data.Data.TotalCount != 0) {
							if (data.Data.TodoListCount != 0) {
								assistantRemindArr.push('0000');
								TodoRemindCount = data.Data.TodoListCount;
								if (data.Data.TodoListCount > 99) {
									data.Data.TodoListCount = '...';
								}
								$('.popup-main1 ul li').eq(0).children().children().attr('class', 'info-unread2');
								$('.popup-main1 ul li').eq(0).children().children().children().children().text(data.Data.TodoListCount);
							}
							if (data.Data.NoticeCount != 0) {
								NoticeRemindCount = data.Data.NoticeCount;
								if (data.Data.NoticeCount > 99) {
									data.Data.NoticeCount = '...';
								}
								$('.popup-main1 ul li').eq(1).children().children().children().children().text(data.Data.NoticeCount);
								$('.popup-main1 ul li').eq(1).children().children().attr('class', 'info-unread2');
								assistantRemindArr.push('0001');

							}
							if (data.Data.ChatCount != 0) {
								ChatRemindCount = data.Data.ChatCount;
								if (data.Data.ChatCount > 99) {
									data.Data.ChatCount = '...';
								}
								$('.popup-main1 ul li').eq(3).children().children().children().children().text(data.Data.ChatCount);
								$('.popup-main1 ul li').eq(3).children().children().attr('class', 'info-unread4');
								assistantRemindArr.push('0002');

							}

							if (data.Data.MessageCount - scheduleRemindCount > 0) {
								$('.popup-main1 ul li').eq(2).children().children().attr('class', 'info-unread4');
								assistantRemindArr.push('0003');
								MessageRemindCount = data.Data.MessageCount - scheduleRemindCount;
							}
							if (data.Data.MessageCount != 0) {
								if (data.Data.MessageCount > 99) {
									data.Data.MessageCount = '...';
								}
								// console.log(data.Data.MessageCount, 'data.Data.MessageCount');
								$('.popup-main1 ul li').eq(2).children().children().children().children().text(data.Data.MessageCount);
								$('.popup-main1 ul li').eq(2).children().children().attr('class', 'info-unread4');
							}
							if (data.Data.NewsCount != 0) {
								NewsRemindCount = data.Data.NewsCount;
								if (data.Data.NewsCount > 99) {
									data.Data.NewsCount = '...';
								}
								$('.popup-main1 ul li').eq(4).children().children().children().children().text(data.Data.NewsCount);
								$('.popup-main1 ul li').eq(4).children().children().attr('class', 'info-unread4');
								assistantRemindArr.push('0004');

							}
							if (data.Data.TotalCount == TodoRemindCount || data.Data.TotalCount == NoticeRemindCount ||
								data.Data.TotalCount == ChatRemindCount || data.Data.TotalCount == MessageRemindCount-scheduleRemindCount || data.Data
								.TotalCount == NewsRemindCount|| data.Data
								.TotalCount == scheduleRemindCount) {
								onlyRemindType = 1;
							} else {
								onlyRemindType = 0;
							}
							$('.popup-nav-ul li').eq(0).children('b').attr('class', 'info-unread');
						}
					} else {
						assistantTipsFn(data.Msg);
					}
					allRemindCount = TodoRemindCount + NoticeRemindCount + ChatRemindCount + MessageRemindCount +
						NewsRemindCount + scheduleRemindCount; //日程提醒总数
					if (allRemindCount == 0) {
						return;
					}
					var allRemindCount1 = allRemindCount
					if (allRemindCount > 99) {
						allRemindCount1 = '...';
					}
					$('.assistant-remind-count ul li').text(allRemindCount1);
					if (scheduleRemindCount > 0) {
						$('.assistant-remind-count').attr('name', '5');
					} else if (TodoRemindCount > 0) {
						$('.assistant-remind-count').attr('name', '0');
					} else if (NoticeRemindCount > 0) {
						$('.assistant-remind-count').attr('name', '1');
					} else if (MessageRemindCount > 0) {
						$('.assistant-remind-count').attr('name', '2');
					} else if (ChatRemindCount > 0) {
						$('.assistant-remind-count').attr('name', '3');
					} else if (NewsRemindCount > 0) {
						$('.assistant-remind-count').attr('name', '4');
					}
				})
			})
		} else {
			assistantTipsFn(data.Msg);
		}
	});

	function initializationFn(name) {
		initialization = true;
		//初始化消息中心
		todoFn(0);
		getSysIP('400', function (data) {
			messageURL = data;
			console.log(name);
			if (name == 'message') {
				noticeFn(0);
			}
		});
		getSysIP('810', function (data) {
			gradeManageURL = data;
			// gradeManageURL = 'http://172.16.41.111:10103/WS_CJZP/';
			summaryStartTime = dateChangeFn(serverTime.slice(0, 10), -6) + ' 00:00:00'; // 学情总结开始时间
			summaryEndTime = serverTime.slice(0, 10) + ' 00:00:00'; //学情总结结束时间
			getSysIP('844', function (data) {
				summaryURL = data;
				summaryTableFn();
			});
			ajaxN('/PsnMgr/Schedule/GetScheduleDateList', 'get', {
				EndDate: termEndDate,
				StartDate: termStartDate,
				// Token:'74e35f13-9179-4c6f-b61f-f713c7dbe3f2',
				// UserID:'T0003',
				// SchoolID:'S15-130-773A',
				// UserType:'1',
				// URL:'http://192.168.129.1:10103/',
			}, function (data) {
				var dateArr = data.Data.split(',');
				var mark = {};
				dateArr.map(function (item) {
					mark[item] = '';
				})
				layui.use('laydate', function () {
					var laydate = layui.laydate;
					laydate.render({
						elem: '#lgAssistant-next3', //指定元素
						format: 'yyyy-MM-dd',
						min: serverTime.slice(0, 10),
						max: termEndDate,
						btns: ['now'],
						trigger: 'click',
						showBottom: false,
						position: 'fixed',
						value: serverTime.slice(0, 10),
						isInitValue: false,
						done: function (value, date, endDate) {
							// console.log(value); //得到日期生成的值，如：2017-08-18
							// console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
							// console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
						}
					});
				});
				layui.use('laydate', function () {
					var laydate = layui.laydate;
					laydate.render({
						elem: '#lgAssistant-next2', //指定元素
						format: 'yyyy-MM-dd',
						min: termStartDate,
						max: termEndDate,
						btns: ['now'],
						position: 'fixed',
						value: serverTime.slice(0, 10),
						isInitValue: false,
						mark: mark,
						trigger: 'click',
						done: function (value, date, endDate) {
							// console.log( $('#lgAssistant-next2').attr('lay-key'));
							// console.log('#layui-laydate' + $('#lgAssistant-next2').attr('lay-key') +
							// ' .layui-laydate-main .layui-laydate-content .layui-this .laydate-day-mark').css();
							$('#lgAssistant-next2').css('font-size', '0');
							$('.personal-schedule-ul1').hide();
							$('.personal-schedule-ul2').hide();
							$('.personal-schedule-ul3').hide();
							personalScheduleDate = value;
							$('.schedule-choose-date').text(value);
							$('.schedule-choose-week').text(dataChangeTerm(termStartDate, value));
							personalScheduleFn(personalScheduleDate);
							if (value == dateChangeFn(serverTime.slice(0, 10), 1)) {
								$('.schedule-choose-day i:eq(1)').css('background', 'url(' + PsnMgrLgAssistantAddr +
									'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_4.png)');
								$('.schedule-choose-day i:eq(2)').css('background', 'url(' + PsnMgrLgAssistantAddr +
									'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_5.png)');
								$('.schedule-choose-day i').css('color', '#0e95ed');
								$('.schedule-choose-day i:eq(0)').css('background', 'url(' + PsnMgrLgAssistantAddr +
									'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_1.png)');
								$('.schedule-choose-day i:eq(1)').css('color', '#fff');
							} else if (value == dateChangeFn(serverTime.slice(0, 10), 2)) {
								$('.schedule-choose-day i:eq(1)').css('background', 'url(' + PsnMgrLgAssistantAddr +
									'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_3.png)');
								$('.schedule-choose-day i:eq(2)').css('background', 'url(' + PsnMgrLgAssistantAddr +
									'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_6.png)');
								$('.schedule-choose-day i').css('color', '#0e95ed');
								$('.schedule-choose-day i:eq(0)').css('background', 'url(' + PsnMgrLgAssistantAddr +
									'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_1.png)');
								$('.schedule-choose-day i:eq(2)').css('color', '#fff');
							} else if (value == serverTime.slice(0, 10)) {
								$('.schedule-choose-day i:eq(1)').css('background', 'url(' + PsnMgrLgAssistantAddr +
									'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_3.png)');
								$('.schedule-choose-day i:eq(2)').css('background', 'url(' + PsnMgrLgAssistantAddr +
									'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_5.png)');
								$('.schedule-choose-day i').css('color', '#0e95ed');
								$('.schedule-choose-day i:eq(0)').css('background', 'url(' + PsnMgrLgAssistantAddr +
									'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_2.png)');
								$('.schedule-choose-day i:eq(0)').css('color', '#fff');
							} else {
								$('.schedule-choose-day i:eq(1)').css('background', 'url(' + PsnMgrLgAssistantAddr +
									'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_3.png)');
								$('.schedule-choose-day i:eq(2)').css('background', 'url(' + PsnMgrLgAssistantAddr +
									'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_5.png)');
								$('.schedule-choose-day i').css('color', '#0e95ed');
								$('.schedule-choose-day i:eq(0)').css('background', 'url(' + PsnMgrLgAssistantAddr +
									'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_1.png)');
							}
							// console.log(value); //得到日期生成的值，如：2017-08-18
							// console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
							// console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
						}
					});
					$('#layui-laydate' + $('#lgAssistant-next2').attr('lay-key') +
						' .layui-laydate-main  .layui-laydate-content .layui-this .laydate-day-mark').css({
						background: '#0099ff',
						borderRadius: ' 8px',
						color: ' #fff',
						width: '28px',
						height: '18px',
						display: ' inline-block',
						margin: ' 5px 0 0 0',
						position: 'static',
					});
				});
			}, function (data) {
				// var dateArr = data.Data.split(',');
				// var mark = {};
				// dateArr.map(function(item){
				// 	mark[item]='';
				// })
				layui.use('laydate', function () {
					var laydate = layui.laydate;
					laydate.render({
						elem: '#lgAssistant-next3', //指定元素
						format: 'yyyy-MM-dd',
						min: getDate('03'),
						max: termEndDate,
						btns: ['now'],
						showBottom: false,
						position: 'fixed',
						value: serverTime.slice(0, 10),
						isInitValue: false,
						done: function (value, date, endDate) {
							// console.log(value); //得到日期生成的值，如：2017-08-18
							// console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
							// console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
						}
					});
				});
				layui.use('laydate', function () {
					var laydate = layui.laydate;
					laydate.render({
						elem: '#lgAssistant-next2', //指定元素
						format: 'yyyy-MM-dd',
						min: termStartDate,
						max: termEndDate,
						btns: ['now'],
						position: 'fixed',
						value: serverTime.slice(0, 10),
						isInitValue: false,
						trigger: 'click',
						done: function (value, date, endDate) {
							$('#lgAssistant-next2').css('font-size', '0');
							$('.personal-schedule-ul1').hide();
							$('.personal-schedule-ul2').hide();
							$('.personal-schedule-ul3').hide();
							personalScheduleDate = value;
							$('.schedule-choose-date').text(value);
							$('.schedule-choose-week').text(dataChangeTerm(termStartDate, $('.schedule-choose-date').text()));
							personalScheduleFn(personalScheduleDate);
							console.log(value);
							if (value == dateChangeFn(serverTime.slice(0, 10), 1)) {
								$('.schedule-choose-day i:eq(1)').css('background', 'url(' + PsnMgrLgAssistantAddr +
									'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_4.png)');
								$('.schedule-choose-day i:eq(2)').css('background', 'url(' + PsnMgrLgAssistantAddr +
									'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_5.png)');
								$('.schedule-choose-day i').css('color', '#0e95ed');
								$('.schedule-choose-day i:eq(0)').css('background', 'url(' + PsnMgrLgAssistantAddr +
									'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_1.png)');
								$('.schedule-choose-day i:eq(1)').css('color', '#fff');
							} else if (value == dateChangeFn(serverTime.slice(0, 10), 2)) {
								$('.schedule-choose-day i:eq(1)').css('background', 'url(' + PsnMgrLgAssistantAddr +
									'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_3.png)');
								$('.schedule-choose-day i:eq(2)').css('background', 'url(' + PsnMgrLgAssistantAddr +
									'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_6.png)');
								$('.schedule-choose-day i').css('color', '#0e95ed');
								$('.schedule-choose-day i:eq(0)').css('background', 'url(' + PsnMgrLgAssistantAddr +
									'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_1.png)');
								$('.schedule-choose-day i:eq(2)').css('color', '#fff');
							} else {
								$('.schedule-choose-day i:eq(1)').css('background', 'url(' + PsnMgrLgAssistantAddr +
									'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_3.png)');
								$('.schedule-choose-day i:eq(2)').css('background', 'url(' + PsnMgrLgAssistantAddr +
									'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_5.png)');
								$('.schedule-choose-day i').css('color', '#0e95ed');
								$('.schedule-choose-day i:eq(0)').css('background', 'url(' + PsnMgrLgAssistantAddr +
									'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_2.png)');
								$('.schedule-choose-day i:eq(0)').css('color', '#fff');
							}
							// console.log(value); //得到日期生成的值，如：2017-08-18
							// console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
							// console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
						}
					});

				});

			})
			// mark: {
			// 	'0-10-14': '生日',
			// 	'0-12-31': '跨年' ,//每年的日期
			// 	'0-0-10': '工资', //每月某天
			// 	'0-0-15': '月中',
			// 	'2017-8-15': '', //如果为空字符，则默认显示数字+徽章
			// 	'2099-10-14': '呵呵',
			// },
			// done: function(value, date) {
			// 	if (date.year === 2017 && date.month === 8 && date.date === 15) { //点击2017年8月15日，弹出提示语
			// 		alert('这一天是：中国人民抗日战争胜利72周年');
			// 	}
			// },
			var summaryBoxCount = ''; //成绩管理盒子
			var startDate = layui.use('laydate', function () {
				var laydate = layui.laydate;
				laydate.render({
					elem: '#lgAssistant-next4', //指定元素
					format: 'yyyy-MM-dd',
					min: termStartDate,
					max: serverTime.slice(0, 10),
					btns: ['now'],
					position: 'fixed',
					value: serverTime.slice(0, 10),
					isInitValue: false,
					done: function (value, dates) {
						if (Date.parse($('#lgAssistant-next4').val()) > Date.parse($('#lgAssistant-next5').val())) {
							assistantTipsFn('开始时间不能大于结束时间');
						}
						// endDate.config.min = {
						// 	year: dates.year,
						// 	month: dates.month - 1, //关键
						// 	date: dates.date,
						// 	hours: 0,
						// 	minutes: 0,
						// 	seconds: 0
						// };


						// console.log(date);
						// console.log(value); //得到日期生成的值，如：2017-08-18
						// console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
						// console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。


					}
				});

			});
			var endDate = layui.use('laydate', function () {
				var laydate = layui.laydate;
				laydate.render({
					elem: '#lgAssistant-next5', //指定元素
					format: 'yyyy-MM-dd',
					min: termStartDate,
					max: serverTime.slice(0, 10),
					btns: ['now'],
					position: 'fixed',
					value: serverTime.slice(0, 10),
					isInitValue: false,
					done: function (value, dates) {
						if ($('#lgAssistant-next5').val()) {
							if (Date.parse($('#lgAssistant-next4').val()) > Date.parse($('#lgAssistant-next5').val())) {
								assistantTipsFn('开始时间不能大于结束时间');
								normal('#lgAssistant-next5', 3);
							}
						}
						// startDate.config.max = {
						// 	year: dates.year,
						// 	month: dates.month - 1, //关键 
						// 	date: dates.date,
						// 	hours: 0,
						// 	minutes: 0,
						// 	seconds: 0
						// }
					}
				});

			});
			if (UserClass[2] == 1) {
				ajaxM('/api/CJZPPushOut/GetTutorData', 'get', {
					URL: gradeManageURL,
					TeacherID: UserID,
					SchoolID: SchoolID,
					Term: termName,
				}, function (data) {
					if (data.data) {
						summaryBoxCount = data.data.length;
						$('.assistant-empty2').hide();
						$('.summary-grade-main').show();
						$('.summary-title p').eq(0).children('span').show();
						data.data.map(function (item, idx) {

							var nowClass = 'summary-grade-classes' + idx;
							var nowClass1 = '.' + nowClass;
							var class1 = ' summary-grade-classes clearfix ' + nowClass;
							item.CourseName = item.GradeName + '成绩数据';
							var CourseNameAll = '""';
							if (item.CourseName.length > 15) {
								CourseNameAll = '"' + item.CourseName + '"';
								item.CourseName = item.CourseName.slice(0, 13) + '..';
							}
							$('.summary-grade-main').append($(
								'<div class="summary-grade-box clearfix" ><ul class="summary-grade-classes clearfix"></ul><span class="summary-grade-all"><p title =' +
								CourseNameAll + '>' + item.CourseName +
								'</p><ul class="summary-marks-ul"><li class="summary-marks-li">平均分: <b class="orange" >' +
								keepTwoDecimal(item.AvgScore) +
								'</b>分<i></i></li><li class="summary-marks-li">优秀分: <b class="green" >' + keepTwoDecimal(item.GoodScore) +
								'</b>分<i></i></li><li class="summary-marks-li">最低分: <b class="red" >' + keepTwoDecimal(item.MinScore) +
								'</b>分<i></i></li><li class="summary-marks-li">最高分: <b class="green" >' + keepTwoDecimal(item.MaxScore) +
								'</b>分<i></i></li></ul></span></div>'));
							item.ClassList.map(function (it) {
								if (keepTwoDecimal(it.ChangeScore) < 0) {
									var text = '-';
									it.ChangeScore = -it.ChangeScore;
								} else if (keepTwoDecimal(it.ChangeScore) == 0) {
									var text = '';
								} else {
									var text = '+';
								}
								var ClassNameAll = '""';
								if (it.ClassName.length > 8) {
									ClassNameAll = '"' + it.ClassName + '"';
									it.ClassName = it.ClassName.slice(0, 6) + '..';
								}
								$('.summary-grade-box').eq(idx).children('.summary-grade-classes').append($(
									'<li class="summary-grade-class" data-url=' + it.PCurl +
									' ><span class="summary-class-name" title=' + ClassNameAll + ' >' +
									it.ClassName + '</span><span class="summary-class-marks">' + text + '<b>' + keepTwoDecimal(it.ChangeScore) +
									'</b>分</span><span class="summary-class-change">较上月变化</span><ul class="summary-marks-ul"><li class="summary-marks-li">平均分: <b class="orange" >' +
									keepTwoDecimal(it.AvgScore) +
									'</b>分<i></i></li><li class="summary-marks-li">优秀分: <b class="green" >' + keepTwoDecimal(it.GoodScore) +
									'</b>分<i></i></li><li class="summary-marks-li">最低分: <b class="red" >' + keepTwoDecimal(it.MinScore) +
									'</b>分<i></i></li><li class="summary-marks-li">最高分: <b class="green" >' + keepTwoDecimal(it.MaxScore) +
									'</b>分<i></i></li></ul></li>'))
							})


						})

					} else {
						summaryBoxCount = 0;
					}
					ajaxM('/api/CJZPPushOut/GetTeacherData', 'get', {
						URL: gradeManageURL,
						TeacherID: UserID,
						SchoolID: SchoolID,
						Term: termName,
					}, function (data) {
						if (data.data && summaryBoxCount == 0) {
							$('.assistant-empty2').show();
							$('.summary-grade-main').hide();
							$('.summary-title p span').hide();
							return;
						}
						if (data.data) {
							if (data.data.length == 0 && summaryBoxCount == 0) {
								$('.assistant-empty2').show();
								$('.summary-grade-main').hide();
								$('.summary-title p span').hide();
								return;
							}

							data.data.map(function (item, idx) {
								var nowClass = 'summary-grade-classes' + idx;
								var nowClass1 = '.' + nowClass;
								var class1 = ' summary-grade-classes clearfix ' + nowClass;
								item.CourseName = item.CourseName + '成绩数据';
								var CourseNameAll = '""';
								if (item.CourseName.length > 15) {
									CourseNameAll = '"' + item.CourseName + '"';
									item.CourseName = item.CourseName.slice(0, 13) + '..';
								}
								$('.summary-grade-main').append($(
									'<div class="summary-grade-box clearfix" ><ul class="summary-grade-classes clearfix"></ul><span class="summary-grade-all"><p title =' +
									CourseNameAll + '>' + item.CourseName +
									'</p><ul class="summary-marks-ul"><li class="summary-marks-li">平均分: <b class="orange" >' +
									keepTwoDecimal(item.AvgScore) +
									'</b>分<i></i></li><li class="summary-marks-li">优秀分: <b class="green" >' + keepTwoDecimal(item.GoodScore) +
									'</b>分<i></i></li><li class="summary-marks-li">最低分: <b class="red" >' + keepTwoDecimal(item.MinScore) +
									'</b>分<i></i></li><li class="summary-marks-li">最高分: <b class="green" >' + keepTwoDecimal(item.MaxScore) +
									'</b>分<i></i></li></ul></span></div>'));
								item.ClassList.map(function (it) {
									if (keepTwoDecimal(it.ChangeScore) < 0) {
										var text = '-';
										it.ChangeScore = -it.ChangeScore;
									} else if (keepTwoDecimal(it.ChangeScore) == 0) {
										var text = '';
									} else {
										var text = '+';
									}
									var ClassNameAll = '""';
									if (it.ClassName.length > 8) {
										ClassNameAll = '"' + it.ClassName + '"';
										it.ClassName = it.ClassName.slice(0, 6) + '..';
									}
									$('.summary-grade-box').eq(summaryBoxCount + idx).children('.summary-grade-classes').append($(
										'<li class="summary-grade-class" data-url=' + it.PCurl +
										' ><span class="summary-class-name" title=' + ClassNameAll + ' >' +
										it.ClassName + '</span><span class="summary-class-marks">' + text + '<b>' + keepTwoDecimal(it.ChangeScore) +
										'</b>分</span><span class="summary-class-change">较上月变化</span><ul class="summary-marks-ul"><li class="summary-marks-li">平均分: <b class="orange" >' +
										keepTwoDecimal(it.AvgScore) +
										'</b>分<i></i></li><li class="summary-marks-li">优秀分: <b class="green" >' + keepTwoDecimal(it.GoodScore) +
										'</b>分<i></i></li><li class="summary-marks-li">最低分: <b class="red" >' + keepTwoDecimal(it.MinScore) +
										'</b>分<i></i></li><li class="summary-marks-li">最高分: <b class="green" >' + keepTwoDecimal(it.MaxScore) +
										'</b>分<i></i></li></ul></li>'))
								})

							})
							for (var i = 0; i < $('.summary-grade-class').length; i++) {
								if (i % 4 == 1) {
									$('.summary-grade-class').eq(i).attr('class', 'summary-grade-class summary-grade-class1');
								} else if (i % 4 == 2) {
									$('.summary-grade-class').eq(i).attr('class', 'summary-grade-class summary-grade-class2');
								} else if (i % 4 == 3) {
									$('.summary-grade-class').eq(i).attr('class', 'summary-grade-class summary-grade-class3');
								}
							}
						} else {
							if (summaryBoxCount == 0) {
								$('.assistant-empty2').show();
								$('.summary-grade-main').hide();
								$('.summary-title p span').hide();
								return;
							}
						}

					}, function () {
						var data = [{
								"GradeID": null,
								"GradeName": null,
								"CourseNO": "27DA94C1-02A0-4B28-BDD3-0D201BB9F93F",
								"CourseName": "高中一年级英语",
								"AvgScore": 61.05375,
								"GoodScore": 81.72833333333333333333333333,
								"MaxScore": 90.58,
								"MinScore": 29.18,
								"ClassList": [{
										"ClassID": "3E1369B6-ABE3-4121-8BE3-082D355B2A28",
										"ClassName": "英语高一总评1班",
										"AvgScore": 63.968,
										"GoodScore": 84.57166666666666666666666667,
										"MaxScore": 89.96,
										"MinScore": 32.00,
										"ChangeScore": -0.0125,
										"PCurl": "/Student/Index#/PreviewSubject",
										"Androidurl": "/Student/Index#/PreviewSubject",
										"IOSurl": "/Student/Index#/PreviewSubject"
									},
									{
										"ClassID": "3E1369B6-ABE3-4121-8BE3-082D355B2A28",
										"ClassName": "英语高一总评2班",
										"AvgScore": 63.968,
										"GoodScore": 84.57166666666666666666666667,
										"MaxScore": 89.96,
										"MinScore": 32.85,
										"ChangeScore": +0.0125,
										"PCurl": "/Student/Index#/PreviewSubject",
										"Androidurl": "/Student/Index#/PreviewSubject",
										"IOSurl": "/Student/Index#/PreviewSubject"
									},
									{
										"ClassID": "533D34D2-F159-4047-AE46-2F5A217F33EE",
										"ClassName": "英语高一总评3班",
										"AvgScore": 58.1395,
										"GoodScore": 78.885,
										"MaxScore": 90.58,
										"MinScore": 29.18,
										"ChangeScore": -0.005,
										"PCurl": "/Student/Index#/PreviewSubject",
										"Androidurl": "/Student/Index#/PreviewSubject",
										"IOSurl": "/Student/Index#/PreviewSubject"
									}
								]
							},
							{
								"GradeID": null,
								"GradeName": null,
								"CourseNO": "89DYH1-02A0-4B28-BDD3-0D201BB9F93F",
								"CourseName": "高中二年级英语",
								"AvgScore": 61.05375,
								"GoodScore": 81.72833333333333333333333333,
								"MaxScore": 90.58,
								"MinScore": 29.18,
								"ClassList": [{
										"ClassID": "3E1369B6-ABE3-4121-8BE3-082D355B2A28",
										"ClassName": "英语高二总评2班",
										"AvgScore": 63.968,
										"GoodScore": 84.57166666666666666666666667,
										"MaxScore": 89.96,
										"MinScore": 32.85,
										"ChangeScore": -0.0125,
										"PCurl": "/Student/Index#/PreviewSubject",
										"Androidurl": "/Student/Index#/PreviewSubject",
										"IOSurl": "/Student/Index#/PreviewSubject"
									},
									{
										"ClassID": "533D34D2-F159-4047-AE46-2F5A217F33EE",
										"ClassName": "英语高二总评1班",
										"AvgScore": 58.1395,
										"GoodScore": 78.885,
										"MaxScore": 90.58,
										"MinScore": 29.18,
										"ChangeScore": +0.0105,
										"PCurl": "/Student/Index#/PreviewSubject",
										"Androidurl": "/Student/Index#/PreviewSubject",
										"IOSurl": "/Student/Index#/PreviewSubject"
									}
								]
							}
						];
						data.map(function (item, idx) {
							var nowClass = 'summary-grade-classes' + idx;
							var nowClass1 = '.' + nowClass;
							var class1 = ' summary-grade-classes clearfix ' + nowClass;
							item.CourseName = item.CourseName + '成绩数据';
							var CourseNameAll = '""';
							if (item.CourseName.length > 15) {
								CourseNameAll = '"' + item.CourseName + '"';
								item.CourseName = item.CourseName.slice(0, 13) + '..';
							}
							$('.summary-grade-main').append($(
								'<div class="summary-grade-box clearfix" ><ul class="summary-grade-classes clearfix"></ul><span class="summary-grade-all"><p title =' +
								CourseNameAll + '>' + item.CourseName +
								'</p><ul class="summary-marks-ul"><li class="summary-marks-li">平均分: <b class="orange" >' +
								keepTwoDecimal(item.AvgScore) +
								'</b>分<i></i></li><li class="summary-marks-li">优秀分: <b class="green" >' + keepTwoDecimal(item.GoodScore) +
								'</b>分<i></i></li><li class="summary-marks-li">最低分: <b class="red" >' + keepTwoDecimal(item.MinScore) +
								'</b>分<i></i></li><li class="summary-marks-li">最高分: <b class="green" >' + keepTwoDecimal(item.MaxScore) +
								'</b>分<i></i></li></ul></span></div>'));
							item.ClassList.map(function (it) {
								if (keepTwoDecimal(it.ChangeScore) < 0) {
									var text = '-';
									it.ChangeScore = -it.ChangeScore;
								} else if (keepTwoDecimal(it.ChangeScore) == 0) {
									var text = '';
								} else {
									var text = '+';
								}
								var ClassNameAll = '""';
								if (it.ClassName.length > 8) {
									ClassNameAll = '"' + it.ClassName + '"';
									it.ClassName = it.ClassName.slice(0, 6) + '..';
								}
								$('.summary-grade-box').eq(idx).children('.summary-grade-classes').append($(
									'<li class="summary-grade-class" data-url=' + it.PCurl +
									' ><span class="summary-class-name" title=' + ClassNameAll + ' >' +
									it.ClassName + '</span><span class="summary-class-marks">' + text + '<b>' + keepTwoDecimal(it.ChangeScore) +
									'</b>分</span><span class="summary-class-change">较上月变化</span><ul class="summary-marks-ul"><li class="summary-marks-li">平均分: <b class="orange" >' +
									keepTwoDecimal(it.AvgScore) +
									'</b>分<i></i></li><li class="summary-marks-li">优秀分: <b class="green" >' + keepTwoDecimal(it.GoodScore) +
									'</b>分<i></i></li><li class="summary-marks-li">最低分: <b class="red" >' + keepTwoDecimal(it.MinScore) +
									'</b>分<i></i></li><li class="summary-marks-li">最高分: <b class="green" >' + keepTwoDecimal(it.MaxScore) +
									'</b>分<i></i></li></ul></li>'))
							})

						})
						for (var i = 0; i < $('.summary-grade-class').length; i++) {
							if (i % 4 == 1) {
								$('.summary-grade-class').eq(i).attr('class', 'summary-grade-class summary-grade-class1');
							} else if (i % 4 == 2) {
								$('.summary-grade-class').eq(i).attr('class', 'summary-grade-class summary-grade-class2');
							} else if (i % 4 == 3) {
								$('.summary-grade-class').eq(i).attr('class', 'summary-grade-class summary-grade-class3');
							}
						}
					})

					// for (var i = 0; i < $('.summary-grade-class').length; i++) {
					// 	if (i % 4 == 1) {
					// 		$('.summary-grade-class').eq(i).attr('class', 'summary-grade-class summary-grade-class1');
					// 	} else if (i % 4 == 2) {
					// 		$('.summary-grade-class').eq(i).attr('class', 'summary-grade-class summary-grade-class2');
					// 	} else if (i % 4 == 3) {
					// 		$('.summary-grade-class').eq(i).attr('class', 'summary-grade-class summary-grade-class3');
					// 	}
					// }
				}, function () {
					$('.assistant-empty2').show();
					$('.summary-grade-main').hide();
					$('.summary-title p span').hide();
				})
			} else {
				ajaxM('api/CJZPPushOut/GetTeacherData', 'get', {
					URL: gradeManageURL,
					TeacherID: UserID,
					SchoolID: SchoolID,
					Term: termName,
				}, function (data) {
					if (data.data.length == 0) {
						$('.assistant-empty2').show();
						$('.summary-grade-main').hide();
						$('.summary-title p span').hide();
						return;
					}
					data.data.map(function (item, idx) {
						var nowClass = 'summary-grade-classes' + idx;
						var nowClass1 = '.' + nowClass;
						var class1 = ' summary-grade-classes clearfix ' + nowClass;
						item.CourseName = item.CourseName + '成绩数据';
						var CourseNameAll = '""';
						if (item.CourseName.length > 15) {
							CourseNameAll = '"' + item.CourseName + '"';
							item.CourseName = item.CourseName.slice(0, 13) + '..';
						}
						$('.summary-grade-main').append($(
							'<div class="summary-grade-box clearfix" ><ul class="summary-grade-classes clearfix"></ul><span class="summary-grade-all"><p title =' +
							CourseNameAll + '>' + item.CourseName +
							'</p><ul class="summary-marks-ul"><li class="summary-marks-li">平均分: <b class="orange" >' +
							keepTwoDecimal(item.AvgScore) +
							'</b>分<i></i></li><li class="summary-marks-li">优秀分: <b class="green" >' + keepTwoDecimal(item.GoodScore) +
							'</b>分<i></i></li><li class="summary-marks-li">最低分: <b class="red" >' + keepTwoDecimal(item.MinScore) +
							'</b>分<i></i></li><li class="summary-marks-li">最高分: <b class="green" >' + keepTwoDecimal(item.MaxScore) +
							'</b>分<i></i></li></ul></span></div>'));
						item.ClassList.map(function (it) {
							if (keepTwoDecimal(it.ChangeScore) < 0) {
								var text = '-';
								it.ChangeScore = -it.ChangeScore;
							} else if (keepTwoDecimal(it.ChangeScore) == 0) {
								var text = '';
							} else {
								var text = '+';
							}
							var ClassNameAll = '""';
							if (it.ClassName.length > 8) {
								ClassNameAll = '"' + it.ClassName + '"';
								it.ClassName = it.ClassName.slice(0, 6) + '..';
							}
							$('.summary-grade-box').eq(idx).children('.summary-grade-classes').append($(
								'<li class="summary-grade-class" data-url=' + it.PCurl +
								' ><span class="summary-class-name" title=' + ClassNameAll + ' >' +
								it.ClassName + '</span><span class="summary-class-marks">' + text + '<b>' + keepTwoDecimal(it.ChangeScore) +
								'</b>分</span><span class="summary-class-change">较上月变化</span><ul class="summary-marks-ul"><li class="summary-marks-li">平均分: <b class="orange" >' +
								keepTwoDecimal(it.AvgScore) +
								'</b>分<i></i></li><li class="summary-marks-li">优秀分: <b class="green" >' + keepTwoDecimal(it.GoodScore) +
								'</b>分<i></i></li><li class="summary-marks-li">最低分: <b class="red" >' + keepTwoDecimal(it.MinScore) +
								'</b>分<i></i></li><li class="summary-marks-li">最高分: <b class="green" >' + keepTwoDecimal(it.MaxScore) +
								'</b>分<i></i></li></ul></li>'))
						})

					})
					for (var i = 0; i < $('.summary-grade-class').length; i++) {
						if (i % 4 == 1) {
							$('.summary-grade-class').eq(i).attr('class', 'summary-grade-class summary-grade-class1');
						} else if (i % 4 == 2) {
							$('.summary-grade-class').eq(i).attr('class', 'summary-grade-class summary-grade-class2');
						} else if (i % 4 == 3) {
							$('.summary-grade-class').eq(i).attr('class', 'summary-grade-class summary-grade-class3');
						}
					}

				}, function () {
					$('.assistant-empty2').show();
					$('.summary-grade-main').hide();
					$('.summary-title p span').hide();
					return;
					var data = [{
							"GradeID": null,
							"GradeName": null,
							"CourseNO": "27DA94C1-02A0-4B28-BDD3-0D201BB9F93F",
							"CourseName": "高中一年级英语",
							"AvgScore": 61.05375,
							"GoodScore": 81.72833333333333333333333333,
							"MaxScore": 90.58,
							"MinScore": 29.18,
							"ClassList": [{
									"ClassID": "3E1369B6-ABE3-4121-8BE3-082D355B2A28",
									"ClassName": "英语高一总评1班",
									"AvgScore": 63.968,
									"GoodScore": 84.57166666666666666666666667,
									"MaxScore": 89.96,
									"MinScore": 32.00,
									"ChangeScore": -0.0125,
									"PCurl": "/Student/Index#/PreviewSubject",
									"Androidurl": "/Student/Index#/PreviewSubject",
									"IOSurl": "/Student/Index#/PreviewSubject"
								},
								{
									"ClassID": "3E1369B6-ABE3-4121-8BE3-082D355B2A28",
									"ClassName": "英语高一总评2班",
									"AvgScore": 63.968,
									"GoodScore": 84.57166666666666666666666667,
									"MaxScore": 89.96,
									"MinScore": 32.85,
									"ChangeScore": +0.0125,
									"PCurl": "/Student/Index#/PreviewSubject",
									"Androidurl": "/Student/Index#/PreviewSubject",
									"IOSurl": "/Student/Index#/PreviewSubject"
								},
								{
									"ClassID": "533D34D2-F159-4047-AE46-2F5A217F33EE",
									"ClassName": "英语高一总评3班",
									"AvgScore": 58.1395,
									"GoodScore": 78.885,
									"MaxScore": 90.58,
									"MinScore": 29.18,
									"ChangeScore": -0.005,
									"PCurl": "/Student/Index#/PreviewSubject",
									"Androidurl": "/Student/Index#/PreviewSubject",
									"IOSurl": "/Student/Index#/PreviewSubject"
								}
							]
						},
						{
							"GradeID": null,
							"GradeName": null,
							"CourseNO": "89DYH1-02A0-4B28-BDD3-0D201BB9F93F",
							"CourseName": "高中二年级英语",
							"AvgScore": 61.05375,
							"GoodScore": 81.72833333333333333333333333,
							"MaxScore": 90.58,
							"MinScore": 29.18,
							"ClassList": [{
									"ClassID": "3E1369B6-ABE3-4121-8BE3-082D355B2A28",
									"ClassName": "英语高二总评2班",
									"AvgScore": 63.968,
									"GoodScore": 84.57166666666666666666666667,
									"MaxScore": 89.96,
									"MinScore": 32.85,
									"ChangeScore": -0.0125,
									"PCurl": "/Student/Index#/PreviewSubject",
									"Androidurl": "/Student/Index#/PreviewSubject",
									"IOSurl": "/Student/Index#/PreviewSubject"
								},
								{
									"ClassID": "533D34D2-F159-4047-AE46-2F5A217F33EE",
									"ClassName": "英语高二总评1班",
									"AvgScore": 58.1395,
									"GoodScore": 78.885,
									"MaxScore": 90.58,
									"MinScore": 29.18,
									"ChangeScore": +0.0105,
									"PCurl": "/Student/Index#/PreviewSubject",
									"Androidurl": "/Student/Index#/PreviewSubject",
									"IOSurl": "/Student/Index#/PreviewSubject"
								}
							]
						}
					];
					// 	data ={"data":[{"GradeID":null,"GradeName":null,"CourseNO":"5CD6D9EE-8B72-4C07-B6BE-7B816BEEF991","CourseName":"视听说B","AvgScore":0.3869565217391304347826086957,"GoodScore":1.2881578947368421052631578947,"MaxScore":21.95,"MinScore":0.00,"ClassList":[{"ClassID":"4048C45E-2C12-46D6-AE3E-87B21A852098","ClassName":"认知视听说B一3班","AvgScore":0.025,"GoodScore":0.0833,"MaxScore":0.75,"MinScore":0.00,"ChangeScore":0.025,"PCurl":"/Views/Teacher/teacher.html#/?CourseClassID=4048C45E-2C12-46D6-AE3E-87B21A852098&CourseClassName=认知视听说B一3班&SubjectName=英语","Androidurl":null,"IOSurl":null},{"ClassID":"7A4209FD-1EBA-443D-BF61-0994C577A879","ClassName":"认知视听说B一1班","AvgScore":0.0066666666666666666666666667,"GoodScore":0.0222222222222222222222222222,"MaxScore":0.10,"MinScore":0.00,"ChangeScore":0.0066666666666666666666666667,"PCurl":"/Views/Teacher/teacher.html#/?CourseClassID=7A4209FD-1EBA-443D-BF61-0994C577A879&CourseClassName=认知视听说B一1班&SubjectName=英语","Androidurl":null,"IOSurl":null},{"ClassID":"865856BF-22BE-498D-83E1-43AFEF45365E","ClassName":"认知视听说B一2班","AvgScore":1.0753333333333333333333333333,"GoodScore":3.5844444444444444444444444444,"MaxScore":21.95,"MinScore":0.00,"ChangeScore":1.0753333333333333333333333333,"PCurl":"/Views/Teacher/teacher.html#/?CourseClassID=865856BF-22BE-498D-83E1-43AFEF45365E&CourseClassName=认知视听说B一2班&SubjectName=英语","Androidurl":null,"IOSurl":null}]}],"success":true,"message":null};
					// 
					data.map(function (item, idx) {
						var nowClass = 'summary-grade-classes' + idx;
						var nowClass1 = '.' + nowClass;
						var class1 = ' summary-grade-classes clearfix ' + nowClass;
						item.CourseName = item.CourseName + '成绩数据';
						var CourseNameAll = '""';
						if (item.CourseName.length > 15) {
							CourseNameAll = '"' + item.CourseName + '"';
							item.CourseName = item.CourseName.slice(0, 13) + '..';
						}
						$('.summary-grade-main').append($(
							'<div class="summary-grade-box clearfix" ><ul class="summary-grade-classes clearfix"></ul><span class="summary-grade-all"><p title =' +
							CourseNameAll + '>' + item.CourseName +
							'</p><ul class="summary-marks-ul"><li class="summary-marks-li">平均分: <b class="orange" >' +
							keepTwoDecimal(item.AvgScore) +
							'</b>分<i></i></li><li class="summary-marks-li">优秀分: <b class="green" >' + keepTwoDecimal(item.GoodScore) +
							'</b>分<i></i></li><li class="summary-marks-li">最低分: <b class="red" >' + keepTwoDecimal(item.MinScore) +
							'</b>分<i></i></li><li class="summary-marks-li">最高分: <b class="green" >' + keepTwoDecimal(item.MaxScore) +
							'</b>分<i></i></li></ul></span></div>'));
						item.ClassList.map(function (it) {
							if (keepTwoDecimal(it.ChangeScore) < 0) {
								var text = '-';
								it.ChangeScore = -it.ChangeScore;
							} else if (keepTwoDecimal(it.ChangeScore) == 0) {
								var text = '';
							} else {
								var text = '+';
							}
							var ClassNameAll = '""';
							if (it.ClassName.length > 8) {
								ClassNameAll = '"' + it.ClassName + '"';
								it.ClassName = it.ClassName.slice(0, 6) + '..';
							}
							$('.summary-grade-box').eq(idx).children('.summary-grade-classes').append($(
								'<li class="summary-grade-class" data-url=' + it.PCurl +
								' ><span class="summary-class-name" title=' + ClassNameAll + ' >' +
								it.ClassName + '</span><span class="summary-class-marks">' + text + '<b>' + keepTwoDecimal(it.ChangeScore) +
								'</b>分</span><span class="summary-class-change">较上月变化</span><ul class="summary-marks-ul"><li class="summary-marks-li">平均分: <b class="orange" >' +
								keepTwoDecimal(it.AvgScore) +
								'</b>分<i></i></li><li class="summary-marks-li">优秀分: <b class="green" >' + keepTwoDecimal(it.GoodScore) +
								'</b>分<i></i></li><li class="summary-marks-li">最低分: <b class="red" >' + keepTwoDecimal(it.MinScore) +
								'</b>分<i></i></li><li class="summary-marks-li">最高分: <b class="green" >' + keepTwoDecimal(it.MaxScore) +
								'</b>分<i></i></li></ul></li>'))
						})

					})
					for (var i = 0; i < $('.summary-grade-class').length; i++) {
						if (i % 4 == 1) {
							$('.summary-grade-class').eq(i).attr('class', 'summary-grade-class summary-grade-class1');
						} else if (i % 4 == 2) {
							$('.summary-grade-class').eq(i).attr('class', 'summary-grade-class summary-grade-class2');
						} else if (i % 4 == 3) {
							$('.summary-grade-class').eq(i).attr('class', 'summary-grade-class summary-grade-class3');
						}
					}
				})
			}


		});
		// 获取天气
		ajaxN('PsnMgr/Schedule/GetWeatherInformation', 'get', {}, function (data) {
			if (data.StatusCode == 200) {
				$('.assistant-popup-weather').show();
				var data = data.Data;
				$('.assistant-weather1').text(data.Weather);
				$('.assistant-weather1').attr('title', data.Weather);
				$('.assistant-weather2').text(data.Temperature + '°C');
				if (data.Weather == '晴' || data.Weather == '热') {
					$('.assistant-weather3').attr('class', 'assistant-weather31');
				} else if (data.Weather == '多云' || data.Weather == '晴间多云' || data.Weather == '少云') {
					$('.assistant-weather3').attr('class', 'assistant-weather32');
				} else if (data.Weather == '阴' || data.Weather == '冷') {
					$('.assistant-weather3').attr('class', 'assistant-weather33');
				} else if (data.Weather == '有风' || data.Weather == '平静' || data.Weather == '微风' || data.Weather == '和风' || data.Weather ==
					'清风') {
					$('.assistant-weather3').attr('class', 'assistant-weather34');
				} else if (data.Weather == '强风/劲风' || data.Weather == '疾风' || data.Weather == '大风' || data.Weather == '烈风' ||
					data.Weather == '风暴' || data.Weather == '狂暴风' || data.Weather == '飓风' || data.Weather == '热带风暴' || data.Weather ==
					'龙卷风') {
					$('.assistant-weather3').attr('class', 'assistant-weather35');
				} else if (data.Weather == '阵雨' || data.Weather == '雷阵雨' || data.Weather == '雷阵雨并伴有冰雹') {
					$('.assistant-weather3').attr('class', 'assistant-weather36');
				} else if (data.Weather == '雨' || data.Weather == '小雨' || data.Weather == '小雨-中雨' || data.Weather == '冻雨') {
					$('.assistant-weather3').attr('class', 'assistant-weather37');
				} else if (data.Weather == '中雨' || data.Weather == '中雨-大雨') {
					$('.assistant-weather3').attr('class', 'assistant-weather38');
				} else if (data.Weather == '大雨' || data.Weather == '暴雨' || data.Weather == '大暴雨' || data.Weather == '特大暴雨' ||
					data.Weather == '暴雨' || data.Weather == '大暴雨' || data.Weather == '特大暴雨' || data.Weather == '强阵雨' || data.Weather ==
					'极端降雨' || data.Weather == '毛毛细雨/细雨' || data.Weather == '暴雨-大暴雨' || data.Weather == '大暴雨-特大暴雨' || data.Weather ==
					'大雨-暴雨') {
					$('.assistant-weather3').attr('class', 'assistant-weather39');
				} else if (data.Weather == '雪' || data.Weather == '冷' || data.Weather == '雨雪天气' || data.Weather == '雨夹雪' || data
					.Weather ==
					'阵雨夹雪' || data.Weather == '冻雨' || data.Weather == '阵雪' || data.Weather == '小雪' || data.Weather == '中雪' || data.Weather ==
					'大雪' || data.Weather == '暴雪' || data.Weather == '小雨-中雪' || data.Weather == '中雪-大雪' || data.Weather == '大雪-暴雪') {
					$('.assistant-weather3').attr('class', 'assistant-weather3a');
				} else if (data.Weather == '浮尘' || data.Weather == '扬尘' || data.Weather == '沙尘暴' || data.Weather == '强沙尘暴') {
					$('.assistant-weather3').attr('class', 'assistant-weather3b');
				} else if (data.Weather == '雾' || data.Weather == '浓雾' || data.Weather == '强浓雾' || data.Weather == '轻雾' || data.Weather ==
					'大雾' || data.Weather == '特强浓雾' || data.Weather == '霾' || data.Weather == '中度霾' || data.Weather == '重度霾' || data
					.Weather ==
					'严重霾') {
					$('.assistant-weather3').attr('class', 'assistant-weather3c');
				} else {
					$('.assistant-weather3').attr('class', 'assistant-weather3d');
				}

			} else {
				$('.assistant-popup-weather').hide();
				assistantTipsFn('天气接口请求异常~');
			}
		});
		// 获取教务窗口
		workSparceFn();

	}
	//获取系统iP ，sysid为系统id，successFunction为成功的回调，参数为系统iP；
	function getSysIP(sysid, successFunction) {
		if (!sysIPArr[sysid]) {
			var SubjectIDs = SubjectID;
			if (sysid == 400) {
				SubjectIDs = '';
			}
			$.ajax({
				url: PsnMgrLgAssistantAddr + 'PsnMgr/InfoCentre/GetSystemWS', //地址
				// dataType: 'json', //数据类型
				headers: {
					Authorization: "X-Token=" + PsnMgrToken
				},
				type: 'get', //类型
				timeout: 4000, //超时
				data: {
					SchoolID: SchoolID,
					SysID: sysid,
					SubjectID: SubjectIDs,
					Token: PsnMgrToken,
					SecretKey: '',
					BackUpOne: '',
					BackUpTwo: ''
				},
				//请求成功
				success: function (data, status) {
					// //DOM解析器
					// var parser = new DOMParser();
					// //读取返回字符串
					// var _xml = parser.parseFromString(data, "text/xml");
					// //获取节点内容
					// URL = _xml.getElementsByTagName("string")[3].innerHTML;
					// console.log(URL);
					successFunction(data.Data);
					if (!sysIPArr[sysid]) {
						sysIPArr[sysid] = data.Data;
					}


				},
				//失败/超时
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					if (textStatus === 'timeout') {
						// alert('請求超時');
						setTimeout(function () {
							// alert('重新请求');
						}, 8000);
					} else {
						$('.infoCenter-empty').show();
						$('.assistant-popup-loading').hide();

						return;
					}
				}
			})

		} else {
			successFunction(sysIPArr[sysid]);
		}

	}

	function getSysWeb(sysid, successFunction) {
		if (!sysWebArr[sysid]) {
			var SubjectIDs = SubjectID;
			if (sysid == 400) {
				SubjectIDs = '';
			}
			$.ajax({
				url: PsnMgrLgAssistantAddr + 'PsnMgr/InfoCentre/GetSystemWeb', //地址
				// dataType: 'json', //数据类型
				headers: {
					Authorization: "X-Token=" + PsnMgrToken
				},
				type: 'get', //类型
				timeout: 8000, //超时
				data: {
					SchoolID: SchoolID,
					SysID: sysid,
					SubjectID: SubjectIDs,
					Token: PsnMgrToken,
					SecretKey: '',
					BackUpOne: '',
					BackUpTwo: ''
				},
				//请求成功
				success: function (data, status) {
					// //DOM解析器
					// var parser = new DOMParser();
					// //读取返回字符串
					// var _xml = parser.parseFromString(data, "text/xml");
					// //获取节点内容
					// URL = _xml.getElementsByTagName("string")[3].innerHTML;
					// console.log(URL);
					successFunction(data.Data);
					if (!sysWebArr[sysid]) {
						sysWebArr[sysid] = data.Data;
					}


				},
				//失败/超时
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					if (textStatus === 'timeout') {
						// alert('請求超時');
						setTimeout(function () {
							// alert('重新请求');
						}, 8000);
					} else {
						$('.infoCenter-empty').show();
						$('.assistant-popup-loading').hide();

						return;
					}
				}
			})

		} else {
			successFunction(sysWebArr[sysid]);
		}

	}

	//开发版
	// function getSysIP1(sysid, successFunction) {
	// 	if (sysid == '844') {
	// 		var data = 'http://192.168.129.129:10103/Web_ZSP_DCS/';
	// 	}
	// 	if (sysid == '810') {
	// 		var data = 'http://192.168.129.129:10103/Web_CJZP/';
	// 	}
	// 	successFunction(data);
	// 	if (!sysIPArr[sysid]) {
	// 		sysIPArr[sysid] = data;
	// 	}
	// }


	var assistantpopuptimer = '';

	//ajax请求封装，
	//没有错误回调函数 url为请求地址，submitType为请求方法，param为参数，successFunction请求成功回调
	function ajaxN(url, submitType, param, successFunction) {
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
		// if (param.URL == summaryURL) {
		// 	param.Token = '73fd7fef550517630996697579bb8828';
		// 	param.SchoolID = 's14-129-8f41';
		// 	param.SubjectID = 'S1-English';
		// 	param.TeacherGH = 'bktea1';
		// }
		$.ajax({
			url: param.URL + url,
			headers: {
				Authorization: "X-Token=" + PsnMgrToken
			},
			type: submitType,
			timeout: 15000,
			dataType: "json",
			data: param,

			success: function (data) {
				successFunction(data);
			},
			error: function (data) {
				// assistantTipsFn('请求错误~');
				$('.assistant-popup-loading').hide();
				assistantTipsFn(url);
				// if ($('.assistant-active').attr('name') == 1) {
				// 	$('.infoCenter-empty').show();
				// 	$('.infoCenter-empty-text').text($('.info-active').eq(1).text());
				// }
				// if ($('.assistant-active').attr('name') == 1 && $('.info-active').eq(0).attr('name') == 2) {
				// 	assistantTipsFn('数据加载失败~');
				// }
				// if ($('.assistant-active').attr('name') == 2) {
				// 	$('.personal-schedule-box').hide();
				// 	$('.personal-schedule-empty').show();
				// }
			},
			complete: function (XMLHttpRequest, status) {
				if (status == 'timeout') {
					XMLHttpRequest.abort(); // 超时后中断请求
					$('.assistant-popup-loading').hide();
					assistantRemindFn(['网络超时，请刷新'], function () {
						ajaxN(url, submitType, param, successFunction);
					})

				}
			}
		})
	};
	//ajax请求封装，
	// url为请求地址，submitType为请求方法，param为参数，successFunction请求成功回调，errorFunction请求失败回调
	function ajaxM(url, submitType, param, successFunction, errorFunction) {
		$('.assistant-popup-loading').show();
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
		if (param.URL == summaryURL) {
			param.Token = '73fd7fef550517630996697579bb8828';
			// param.SchoolID = 's14-129-8f41';
			// param.SubjectID = 'S1-English';
			// param.TeacherGH = 'bktea1';
		}
		// if (param.URL == gradeManageURL) {
		// 	param.UserID = 'bktea1';
		// 	param.SchoolID = 's14-129-8f41';
		// }
		$.ajax({
			url: param.URL + url,
			type: submitType,
			data: param,
			timeout: 15000, //超时
			success: function (data) {
				$('.assistant-popup-loading').hide();
				successFunction(data);
			},
			error: function (data) {
				$('.assistant-popup-loading').hide();
				errorFunction(data);
				// assistantTipsFn('请求错误~');

			},
			complete: function (XMLHttpRequest, status) {
				if (status == 'timeout') {
					XMLHttpRequest.abort(); // 超时后中断请求
					$('.assistant-popup-loading').hide();
					assistantRemindFn(['网络超时，请刷新'], function () {
						ajaxM(url, submitType, param, successFunction, errorFunction);
					})

				}
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
		assistantpopuptimer = setTimeout(function () {
			$('.assistant-small-success').hide();
			clearTimeout(assistantpopuptimer);
		}, 1500);

	};
	//弹出提示函数 str参数为提示语，name 为特殊样式标记 用于layui遮罩弹窗调整弹窗位置 无按钮
	function assistantTipsFn(str, name) {
		if (name == 1) {
			$('.lgAssistant-main .assistant-tips').css('top', '110px');
		} else if (name == 2) {
			$('.lgAssistant-main .assistant-tips').css('top', '110px');
			$('.lgAssistant-main .assistant-tips').css('left', '62%');
		} else {
			$('.lgAssistant-main .assistant-tips').css('top', '127px');
			$('.lgAssistant-main .assistant-tips').css('left', '50%');
		}
		$('.assistant-small-success').hide();
		$('.assistant-tips').hide();
		$('.assistant-big-success').hide();
		$('.assistant-remind').hide();
		$('.assistant-tips').show();
		clearTimeout(assistantpopuptimer);
		if (!str) {
			$('.assistant-tips-text').text('操作失败，请重试');
		} else {
			$('.assistant-tips-text').text(str);
		}
		assistantpopuptimer = setTimeout(function () {
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
		assistantpopuptimer = setTimeout(function () {
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
				$('.assistant-remind-true').text('确定');
			} else {
				$('.assistant-remind-true').text(arr[1]);
			}
			if (!arr[2]) {
				$('.assistant-remind-false').text('取消');
			} else {
				$('.assistant-remind-false').text(arr[2]);
			}
		};

		$('.assistant-remind-true').off().click(function () {
			$('.assistant-remind').hide();
			remindFunction(true);

		});
		$('.assistant-remind-false').off().click(function () {
			$('.assistant-remind').hide();
			remindFunction(0);
		});
		$('.assistant-remind-close').off().click(function () {
			$('.assistant-remind').hide();
			remindFunction(false);
		});
	};
	//是否是数字
	function isRealNum(val) {
		// isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除
		if (val === "" || val == null) {
			return false;
		}
		if (!isNaN(val)) {
			return true;
		} else {
			return false;
		}
	}
	//四舍五入保留2位小数（若第二位小数为0，则保留一位小数）
	function keepTwoDecimal(num) {
		var result = parseFloat(num);
		if (isNaN(result)) {
			assistantTipsFn('传递参数错误，请检查~');
			return false;
		}
		result = Math.round(num * 100) / 100;
		return result;
	}
	//四舍五入保留2位小数（不够位数，则用0替补）
	function keepTwoDecimalFull(num) {
		var result = parseFloat(num);
		if (isNaN(result)) {
			assistantTipsFn('传递参数错误，请检查~');
			return false;
		}
		result = Math.round(num * 100) / 100;
		var s_x = result.toString();
		var pos_decimal = s_x.indexOf('.');
		if (pos_decimal < 0) {
			pos_decimal = s_x.length;
			s_x += '.';
		}
		while (s_x.length <= pos_decimal + 2) {
			s_x += '0';
		}
		return s_x;
	}

	// 获取客户端当前时间 参数为两位的字符串。如字符串 03 返回值为年月日  13 返回值为月日时 24为日时分秒； 第一为字符串为开始值（年月日时分秒），第二个为开始值后面的几位。
	function getDate(state) {

		var myDate = new Date();

		//获取当前年
		var year = myDate.getFullYear();

		//获取当前月
		var month = conver(myDate.getMonth() + 1);

		//获取当前日
		var date = conver(myDate.getDate());
		var h = conver(myDate.getHours()); //获取当前小时数(0-23)
		var m = conver(myDate.getMinutes()); //获取当前分钟数(0-59)
		var s = conver(myDate.getSeconds());

		//获取当前时间

		var arrDate = [year, month, date, h, m, s];
		var start = state.charAt(0) * 1;
		var num = state.charAt(1) * 1;
		var newDate = '';

		for (var i = start; i < start + num; i++) {
			if (i < 2) {
				newDate += arrDate[i] + '-';
			}
			if (i == 2) {
				newDate += arrDate[i] + ' ';
			}
			if (i > 2) {
				newDate += arrDate[i] + ':';

			}

		};
		newDate = newDate.slice(0, newDate.length - 1);
		return newDate;
	};

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

	// 输入框提醒闪烁
	// 参数 domName为输入框的 # 加上id名,或者是 . 加上唯一的类名;times为闪烁的次数
	var normalObj = ''; //输入的对象
	function normal(domName, times) {
		if (!times && times != 0) {
			times = 3;
		}
		if (normalObj == $(domName)) {
			return;
		}
		normalObj = $(domName);
		normalObj.css("border-color", "#bac7d9");
		if (times < 0) {
			normalObj.focus();
			if (domName == '#schedule-test1') {
				$('#layui-laydate' + $('#schedule-test1').attr('lay-key') +
					' .layui-this').css('cssText', 'background-color: #fff!important;color: #333!important;');
				$('.layui-laydate-list').click(function (e) {
					$('#schedule-test1').val($('.layui-this').text().slice(-6, -4) + '时' + $('.layui-this').text().slice(-4, -2) +
						'分');
					var $e = $(e.target);
					$e.siblings().css('cssText', 'color:#333; background-color:#fff;');
					$e.siblings().attr('data-name', '');
					$e.css('cssText', ' background-color:#0099ff!important;color:#fff!important;');
					$e.attr('data-name', '666');
					var layThis = 0;
					for (var i = 0; i < 4; i++) {
						if ($('#layui-laydate' + $('#schedule-test1').attr('lay-key') +
								' .layui-this').eq(i).attr('data-name') == '666') {
							layThis++;
						}
					}
					if (layThis == 2) {
						$('#layui-laydate' + $('#schedule-test1').attr('lay-key')).remove();
					}
				})

				$('#schedule-test1').blur();
			}
			if (domName == '#lgAssistant-next4' || domName == '#lgAssistant-next5') {
				setTimeout(function () {
					$('.laydate-prev-y').text(' ');
					$('.laydate-prev-m').text(' ');
					$('.laydate-next-y').text(' ');
					$('.laydate-next-m').text(' ');
					$('#layui-laydate' + $(domName).attr('lay-key') +
						' .layui-laydate-main  .layui-laydate-content td ').css({
						padding: ' 0px',
					});
					if ((domName == '#lgAssistant-next4' && !next4LayKey) || (domName == '#lgAssistant-next5' && !next5LayKey)) {
						document.styleSheets[0].addRule('#layui-laydate' + $(domName).attr('lay-key') +
							' .layui-laydate-main  .layui-laydate-content table .layui-this ',
							'background-color:#0099ff !important;;border-radius: 10px;width: 30px;height: 20px;display: inline-block;margin: 5px 0 0 3px;line-height: 20px;'
						);
						document.styleSheets[0].addRule('#layui-laydate' + $(domName).attr('lay-key') +
							' .layui-laydate-main .layui-laydate-content  table tbody .laydate-disabled, ' + '#layui-laydate' + $(
								domName).attr('lay-key') +
							' .layui-laydate .layui-laydate-content  table tbody .laydate-disabled:hover ',
							'background-position: 0 0!important;color: #d2d2d2!important;cursor: not-allowed!important; background-color:#fff!important;'
						);
						document.styleSheets[0].addRule('#layui-laydate' + $(domName).attr('lay-key') +
							' .layui-laydate-main .layui-laydate-content  .laydate-disabled, ' + '#layui-laydate' + $(
								domName).attr('lay-key') + ' .layui-laydate .layui-laydate-content  .laydate-disabled:hover ',
							'background-position: 0 0!important;color: #d2d2d2!important;cursor: not-allowed!important; background-color:#fff!important;'
						);
						document.styleSheets[0].addRule('#layui-laydate' + $(domName).attr('lay-key') +
							' .laydate-footer-btns span', 'background-color: #0099ff;color: #fff; border-radius: 4px;');
						document.styleSheets[0].addRule('#layui-laydate' + $(domName).attr('lay-key') +
							' .laydate-footer-btns span:hover', 'background-color: rgba(0, 153, 255,0.9);color: #fff;');
						document.styleSheets[0].addRule('#layui-laydate' + $(domName).attr('lay-key') +
							' .layui-laydate-content td:hover', 'background-color: #0099ff; color: #fff;');
						document.styleSheets[0].addRule('#layui-laydate' + $(domName).attr('lay-key') +
							' .laydate-set-ym span, .layui-laydate-header i', 'color: #0099ff;');
						document.styleSheets[0].addRule('#layui-laydate' + $(domName).attr('lay-key') +
							' .laydate-set-ym span:hover', 'color: #ff6600;');
						document.styleSheets[0].addRule('#layui-laydate' + $(domName).attr('lay-key') +
							' .layui-this', 'background-color: #0099ff!important;');
						if (domName == '#lgAssistant-next4') {
							next4LayKey = true;
						} else {
							next5LayKey = true;
						}

					}
				}, 1)
			}


			normalObj = '';
			return;

		}
		times = times - 1;
		setTimeout(function () {
			error(domName, times);
		}, 150);
	}

	function error(domName, times) {
		normalObj = $(domName);
		normalObj.css("border-color", "red");

		times = times - 1;
		setTimeout(function () {
			normal(domName, times);
		}, 150);
	}
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
	//判断一个元素是否在可视区域内
	function isInVisibleArea(elem) {
		if (!elem || !elem.getBoundingClientRect) return false;

		var rect = elem.getBoundingClientRect();

		if (rect.top < 330) {
			return true;
		} else {
			return false;
		}
	}
	//获取开始时间到目标时间的周数 startDate为开始时间  targetDate为目标时间 格式都为2011-01-01
	function dataChangeTerm(startDate, targetDate) {
		var Date1 = new Date(startDate);
		var Date2 = new Date(targetDate);
		var Date1Day = "日一二三四五六".charAt(Date1.getDay());
		var Date2Day = "星期" + "日一二三四五六".charAt(Date2.getDay());
		var differDay = (Date2.valueOf() - Date1.valueOf()) / 24 / 60 / 60 / 1000;
		if (isNaN(differDay)) {
			differDay = 1;
		}
		if (Date1Day == '日') {
			return '(第' + parseInt((differDay - 1) / 7 + 2) + '周 ' + Date2Day + ')';
		}
		if (Date1Day == '一') {
			return '(第' + parseInt((differDay - 7) / 7 + 2) + '周 ' + Date2Day + ')';
		}
		if (Date1Day == '二') {
			return '(第' + parseInt((differDay - 6) / 7 + 2) + '周 ' + Date2Day + ')';
		}
		if (Date1Day == '三') {
			return '(第' + parseInt((differDay - 5) / 7 + 2) + '周 ' + Date2Day + ')';
		}
		if (Date1Day == '四') {
			return '(第' + parseInt((differDay - 4) / 7 + 2) + '周 ' + Date2Day + ')';
		}
		if (Date1Day == '五') {
			return '(第' + parseInt((differDay - 3) / 7 + 2) + '周 ' + Date2Day + ')';
		}
		if (Date1Day == '六') {
			return '(第' + parseInt((differDay - 2) / 7 + 2) + '周 ' + Date2Day + ')';
		}

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
		s = s.replace(/\r\n/g, "<br/>");
		s = s.replace(/\n/g, "<br/>");
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
	//短时间判断2016-01-01
	function strDateTime(str) {
		var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
		if (r == null) return false;
		var d = new Date(r[1], r[3] - 1, r[4]);
		return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
	}

	//打开exe客户端
	//initFunc为初始化后的回调函数，成功返回操作对象;失败返回false，表明基础插件不存在
	//操作对象可以调用start(proName, moduleName, url, exeName, exeParam)方法，启动exe
	//操作对象在谷歌火狐及ie10以上浏览器可调用sendmessage(proName, moduleName, msgData)方法，向指定模块发送消息；
	//也可在谷歌火狐及ie10以上浏览器实现reciveExeMessageFunc(msg)函数接收消息
	//当websocket被断开时，将触发reConnectFunc回调函数，此时，可重新建立对象并连接
	function BsToCsFuncAssistant(initFunc, reciveExeMessageFunc, reConnectFunc) {
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
				tmpSocket.onclose = function () {
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
				tmpSocket.onopen = function () {
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
								this.onmessage = function (e) {
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

	BsToCsFuncAssistant.prototype.start = function (proName, moduleName, url, exeName, exeParam) {
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
	BsToCsFuncAssistant.prototype.willReciveMessage = function (proName, moduleName) {
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

	BsToCsFuncAssistant.prototype.sendMessage = function (proName, moduleName, msgData) {
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
	BsToCsFuncAssistant.prototype.GetMacIDs = function (proName, moduleName) {
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
	// ---------------------浏览器兼容End-----------------------------//


	var _clientObj = new BsToCsFuncAssistant(InitFunc);
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
			setTimeout(function () {
				_clientObj.start(proName, moduleName, PsnMgrMainServerAddr, exeName, porotol); //"http://192.168.129.130:10103/"
			}, 100);
		}
	};

	//小助手动态生成
	$('body').append($(
		'<div class="lgAssistant-main"><div class="assistant-box"><div id="assistant-box"><canvas id="assistant-box-canvas" width="225" height="150"></canvas></div><div class="assistant-prompt"><p>金老师</p><p>您好~</p></div><div class="assistant-remind-count"><canvas class="assistant-remind-count " style="position:absolute;left: 0;z-index: -1;margin: -50px 0 0 0; "></canvas><ul><li>0</li></ul></div><div class="assistant-info-prompt"><i></i><div class="assistant-remind-div"><ul class="assistant-remind-ul"></ul></div></div><div class="assistant-schedule-prompt"><span class="schedule-prompt-text">上午，10:30 教学主楼606 “学科教研会”</span><p class="schedule-prompt-close">我知道了</p></div><canvas class="assistant-hover-box"></canvas><div class="assistant-popup"><div class="assistant-popup-nav"><div class="assistant-popup-logo"><ul><li><i></i></li><li>教学小助手</li><li><i class="assistant-popup-close "></i></li></ul><div class="lgAssistant-clear"></div></div><div class="popup-nav-list"><ul class="popup-nav-ul"><li class="assistant-active" name="1"><i></i><b></b><p>消息中心</p></li><li name="2"><i></i><p>日程与课表</p></li><li name="3"><i></i><p>学情总结</p></li><li name="4"><i></i><p>通讯录</p></li><li name="5"><i></i><p>教务窗口</p></li></ul><div class="assistant-popup-weather"><i class="assistant-weather3"></i><div><p class="assistant-weather1">晴转多云</p><p class="assistant-weather2">26°~34°</p></div></div></div></div><div class="popup-main"><p class="popup-main-shadow"></p><p class=" popup-main-shade"></p><div class="assistant-small-success"><span><i></i><b class="assistant-small-text">操作成功！</b></span></div><div class="assistant-tips"><span><i></i><b class="assistant-tips-text">未找到相关联系人！</b></span></div><div class="assistant-big-success"><span><i></i><b class="assistant-big-text">操作成功~</b></span></div><div class="assistant-remind"><span class="assistant-remind-span"  ><i class="assistant-remind-close"></i><p><i></i><span class="assistant-remind-text">操作询操作询问操作询问问</span></p><span class="assistant-remind-true">确定删除</span><span class="assistant-remind-false">再想想</span></span></div><div class="assistant-outline"><span><p><i></i><span class="assistant-outline-text">您已经掉线，请重新登录！</span></p><span class="assistant-outline-true">重新登录</span></span></div><div class="popup-main-nav popup-main1"><ul><li class="info-active" name="1"><p class="info-active">待办事项<i><span><b></b></span></i></p></li><li name="2"><p>通知<i><span><b></b></span></i></p></li><li name="4"><p>系统消息<i><span><b></b></span></i></p></li></ul><div class="infoCenter-setting"><i></i><span>设置</span></div><div class="infoCenter-empty"><i></i><p>暂时还没有<span class="infoCenter-empty-text">待办事项</span>哦~</p></div><div class="lgAssistant-clear"></div><div class="setting-popup"><div></div><div><div class="setting-close"><i></i><span>设置</span><i class="lgAssistant-close"></i></div><ul><li class="setting-active" name="setting-option1"><p class="setting-active">系统消息接收设置</p></li></ul><div class="lgAssistant-clear"></div><div></div><div class="setting-option setting-option1"></div><div class="setting-option setting-option2"></div><div class="setting-option setting-option3"></div></div><div></div></div><div class="infoCenter-option todo"><span class="todo-type-span" data-name="0"> 全部内容(共<strong>0</strong>项)<i></i><p></p><ul class="todo-type-ul"></ul></span><span> 期限 </span><div class="infoCenter-option-box todo-box"></div></div><div class="infoCenter-option message"><span> 标题(有<strong>0</strong>个未读通知)</span><span> 发布人 </span><span> 发布时间 </span><div class="infoCenter-option-box message-box"></div></div><div class="infoCenter-option chat"><span> 共有<strong>0</strong>条新消息</span><div class="infoCenter-option-box chat-box"><div class="chat-clear"><span><b></b>清除交流信息</span></div></div></div><div class="infoCenter-option notice"><span> 消息内容(有<strong>0</strong>条新消息)</span><span> 来源 </span><span> 时间 </span><div class="infoCenter-option-box notice-box"><div class="notice-clear"><span><b></b>清空系统信息</span></div></div></div><div class="infoCenter-option news"><div class="news-box"></div></div></div><div class="popup-main-nav popup-main2"><div class="schedule-setting-popup"><div></div><div class="schedule-setting-main"><p><i></i><b class="schedule-change-type">新建日程</b><i class="schedule-setting-close"></i></p><div><ul><li class="schedule-type"><span>类型:</span><i name="1"></i><b>备课</b><i name="2"></i><b>会议</b><i name="3" class="schedule-type-true"></i><b>重要活动</b><i name="4"></i><b class="schedule-edit-name">自定义</b><input type="text" class="schedule-type-name" placeholder="班级活动" maxlength="4"></li><li><span>日期:</span><div class="schedule-setting-date"><input type="text" autocomplete="off" id="lgAssistant-next3"><i></i></li><li><span>时间:</span><input type="text" id="schedule-test1"><span><i></i><i></i></span><span>到</span><input type="text" id="schedule-test2"><span><i></i><i></i></span></li><li><span>内容:</span><textarea class="schedule-topic" maxlength="50"></textarea><b class="schedule-topic-length">0/50</b></li></ul><div class="schedule-setting-clock"><p>提醒设置:<span><i class="schedule-clocks-setting" name="true"></i>开启提醒</span></p><p class="schedule-clocks-setting1"><i name="1"></i>按开始时间提醒</p><p class="schedule-clocks-setting1"><i class="schedule-input-clocks" name="2"></i>提前提醒<span>计划开始前</span><input class="schedule-clocks-time" type="number" value="30" max="999"  min="1"/><span>分钟提醒</span></p></div></div><div><span class="schedule-setting-true">确定</span><span class="schedule-setting-false">取消</span></div><div class="schedule-edit-popup"></div></div></div><div class="popup-main22"><span class="new-schedule"><i></i>新建日程</span><span class="assistant-mySchedule"><i></i>查看全部课表</span></div><div class="popup-main22"><span class="schedule-choose-day"><i name="1">今天</i><i name="2">明天</i><i name="3">后天</i></span><span><b class="schedule-choose-date">2019-08-21</b><b class="schedule-choose-week">(第11周 星期三)</b></span><div class="chooose-schedule-date"><i id="lgAssistant-next2"></i></div></div><div class="personal-schedule-box popup-main22"><ul class="personal-schedule-ul1"></ul><ul class="personal-schedule-ul2"></ul><ul class="personal-schedule-ul3"></ul></div><div class="personal-schedule-empty popup-main22"><i></i><p>暂时还没有日程安排哦~</p></div></div><div class="popup-main-nav popup-main3"><div class="summary-main"><div class="summary-title"><p class="summary-title1"><i></i>考勤及学习情况</p></div><div><ul class="summary-choose-time clearfix"><li class="summary-time-active" name="1">近一周</li><li name="2">近一月</li><li name="3">本学期</li><li name="4">指定时间 <div class="summary-input-time"><input type="text" class="layui-input" autocomplete="off" id="lgAssistant-next4" placeholder="开始时间"><b> - </b><input type="text" class="layui-input" autocomplete="off" id="lgAssistant-next5" placeholder="结束时间"><span>确定</span></div></li></ul><div class="assistant-empty assistant-empty1"><i></i><p>空空如也，暂时没有可查看的数据~</p></div><table class="summary-table "><tr class="summary-table-header"><th width="176"></th><th width="180">上课/考试出勤率</th><th width="180">作业完成率</th><th width="180">自学计划完成率</th><th width="90">详情</th></tr></table><div class="summary-title"><p><i></i>成绩总览 <span>成绩管理<i></i></span></p></div><div class="assistant-empty assistant-empty2"><i></i><p>空空如也，暂时没有可查看的数据~</p></div><div class="summary-grade-main"></div></div><p class=" popup-main3-padding"></p></div><div class="summary-popup summary-popup0" name="1"><div class="summary-popup-shade" name="1" ></div><div class="summary-popup-main summary-popup0-main"><p><span class="summary-popup0-class">一年级一班</span>的考勤及学习情况 <i class="summary-popup-close" name ="1" ></i></p><p>总体上课考试出勤率<span class="summary-popup0-class1"> 0% </span> 总体作业完成率<span class="summary-popup0-class2"> 0%</span> 总体自学计划完成率: <span class="summary-popup0-class3">0%</span></p><div class="assistant-empty assistant-empty3"><i></i><p>空空如也，暂时没有可查看的数据~</p></div><table class="summary-table1"><thead><tr><th width="75">序号</th><th width="80">姓名</th><th width="120">学号</th><th width="191">上课/考试出勤率</th><th width="154">作业完成率</th><th width="189">自学计划完成率</th></tr></thead><tbody></tbody></table></div></div><div class="summary-popup summary-popup1"><div class="summary-popup-shade"></div><div class="summary-popup-main summary-popup1-main"><p><span class="summary-popup1-name"></span>的上课/考试考勤情况 <i class="summary-popup-close"></i></p><div class="assistant-select-span assistant-select-span1" name="1"><p>全部</p><i></i><b></b><ul class="assistant-select-ul"><li name="1">全部<li><li name="0">缺勤<li></ul></div><span class="summary-popup1-border"></span>总体上课/考试出勤率:<i class="summary-popup1-AllRate"> 0% </i><span class="summary-popup1-AllAttendence">(0/0次)</span> 课堂考勤:<i class="summary-popup1-LessonAttendence green">出勤0</i>/<span class="summary-popup1-LessonAbsence red">缺勤0</span> 考试出勤:<i class=" summary-popup1-ExamAttendence green">出考0</i>/<span class=" summary-popup1-ExamAbsence red">缺考0</span><br/><div class="assistant-empty assistant-empty4"><i></i><p>空空如也，暂时没有可查看的数据~</p></div><table class="summary-table2"><thead><tr><th width="75">序号</th><th width="191">时间<i></i></th><th width="180">学科</th><th width="310">内容</th><th width="80">状态</th><th width="66"></th></tr></thead><tbody></tbody></table></div></div><div class="summary-popup summary-popup2"><div class="summary-popup-shade"></div><div class="summary-popup-main summary-popup2-main"><p><span class="summary-popup2-name"></span>作业完成情况 <i class="summary-popup-close"></i></p><div class="assistant-select-span assistant-select-span21" name="0"><p>全部作业</p><i></i><b></b><ul class="assistant-select-ul"><li name="0">全部作业<li><li name="1">预习作业<li><li name="2">课业作业<li></ul></div><div class="assistant-select-span assistant-select-span22" name="0"><p>全部</p><i></i><b></b><ul class="assistant-select-ul"><li name="0">全部<li><li name="1">未完成<li><li name="2">已完成<li></ul></div><span class="summary-popup1-border"></span>总体作业完成率: <i class="summary-popup2-HomeworkCompleteRate">0%</i><span class="summary-popup2-CompleteHomework">(0/0次) </span><br/><div class="assistant-empty assistant-empty5"><i></i><p>空空如也，暂时没有可查看的数据~</p></div><table class="summary-table3"><thead><tr><th width="75">序号</th><th width="223">标题</th><th width="99">学科</th><th width="80">发布老师</th><th width="187">完成时间</th><th width="53">成绩</th><th width="100">详情</th></tr></thead><tbody></tbody></table></div></div><div class=" summary-popup summary-popup3"><div class="summary-popup-shade"></div><div class="summary-popup-main summary-popup3-main"><p><span class="summary-popup3-name"></span>的自学计划完成情况 <i class="summary-popup-close"></i></p><div class="assistant-select-span assistant-select-span3" name="0"><p>全部</p><i></i><b></b><ul class="assistant-select-ul"><li name="0">全部<li><li name="1">未完成<li></ul></div><span class="summary-popup1-border"></span>总体自学计划完成率: <i class="summary-popup3-PassRate">0%</i><span class="summary-popup3-PassPlan"> (0/0次) </span><div class="assistant-empty assistant-empty6"><i></i><p>空空如也，暂时没有可查看的数据~</p></div><table class="summary-table4"><thead><tr><th width="75">序号</th><th width="200">计划名称<i></i></th><th width="70">学科</th><th width="285">计划时间</th><th width="90">完成情况</th><th width="70">详情</th><th width="23"></th></tr></thead><tbody></tbody></table></div></div></div><div class="popup-main-nav popup-main4"><div class="contact-left"><div class="contact-left-search"><input class="contact-search-input"  type="text" placeholder="请输入姓名/用户编号搜索"/><i class="contact-search-choose"></i><i class="contact-search-clear"></i></div><ul><li class="contact-list-choose" name="最近联系人"><i class="i-middle"></i><span>最近联系人</span><i class="contact-tab"></i></li><li name="常用联系人"><i class="i-middle"></i><span>常用联系人</span><i class="contact-tab"></i></li><li name="我的班级"><i class="i-middle"></i><span>我的班级</span><i class="contact-tab"></i></li><li name="我的教师组"><i class="i-middle"></i><span>我的教师组</span><i class="contact-tab"></i></li><li name="全校师生"><i class="i-middle"></i><span>全校师生</span><i class="contact-tab"></i></li></ul></div><div class="contact-right "><div class="contact-list1"><ul class="contact-type"><li><p class="contact-type-p" data-class="contact-Initialization">最近联系人</p><span>></span></li></ul><span class="contact-type-text" name="1"><i></i>清空</span><ul class="contact-li"></ul><div class="contact-right-empty"><i></i><p>暂时还没有<span class="contact-empty-text">最近联系人</span>信息哦~</p></div></div></div><div class="contact-frequent"><div></div><div><p class="contact-frequent-top"><i></i><span>添加常用联系人</span><i class="contact-frequent-close"></i></p><div class="contact-frequent-search"><span><input type="text" autocomplete="off" class="contact-frequent-input" placeholder="请输入姓名/用户编号搜索"/><i class="contact-frequent-clear"></i></span><button type="button" class="contact-frequent-commit">查找</button></div><p class="contact-search-p">共找到<b class="contact-search-number">0</b>个联系人 </p><ul class="contact-search-ul"></ul><div class="frame_pager_center pager5 clearfix"></div></div></div><div class="contact-info"><div></div><div class="contact-info-main"><div><i class="contact-info-close"></i><i class="contact-info-image"></i><span><span><b>张佳乐的家长</b><i></i></span><b class="contact-info-id">1200430501</b><i></i><b class="contact-info-class">一年级1班</b></span><span class="contact-info-sign"><i></i>含泪播种的人泪播种的人一一定能含笑收获~</span></div><ul class="contact-message-ul"><li><span>电话</span><span><b id="contact-copy-text1">13126011111</b><b name="1" class="contact-info-copy">复制</b></span></li><li><span>QQ</span><span><b id="contact-copy-text2">623226323</b><b name="2" class="contact-info-copy">复制</b></span><a class="lgAssistant-main-QQ"></a></li><li><span>微信</span><span><b id="contact-copy-text3">YT13143sdae</b><b name="3" class="contact-info-copy">复制</b></span><a href="https://wx.qq.com/"  class="lgAssistant-main-WX"></a></li><li><span>微博</span><span><b id="contact-copy-text4">合格王企鹅</b><b name="4" class="contact-info-copy">复制</b></span><a  href="https://weibo.com/login.php"  class="lgAssistant-main-WB"></a></li></ul></div></div><ul class="contact-left-popup"></ul></div><div class="popup-main-nav popup-main5"><ul><li class="assistant-deliver-notice"><i></i><span>发布通知</span></li><li class="assistant-deliver-questionnaire"><i></i><span>发布问卷调查</span></li><li class="assistant-student-admin"><i></i><span>学生档案管理</span></li><li class="assistant-teaClass-admin"><i></i><span>教学班管理</span></li></ul></div><div class="assistant-popup-loading"><div class="frame_point_loading_container"><div class="point_container"><span class="point1 point"></span><span class="point2 point"></span><span class="point3 point"></span><span class="point4 point"></span></div></div></div></div></div></div></div'
	));
	if (SubjectIDArr.length > 1) {
		var summary ='<div class="assistant-select-span assistant-select-span66 " name='+SubjectIDArr[0]+'><p>'+SubjectNameArr[0]+'</p><i></i><b></b><ul class="assistant-select-ul" >';
		
		 SubjectNameArr.map(function (item, idx) {
			summary += '<li name=' + SubjectIDArr[idx] + '>' + item + '</li>'
		})
		$('.summary-title1').append($(
			summary + '</ul></div>'
		))
	} else {
	
	}
	// $('.abcd').hide();
	// $('#assistant-box-canvas1').click(function(){
	// 	
	// 	
	// })
	// $('#assistant-box-canvas1').hover(function(){
	// 	alert(5555);
	// },function(){
	// 
	// })
	//小助手动画参数
	var assistantInitialize = false; //初始化是否完成7777777777777777777777777777777 false 为生产环境  true为开发环境
	var assistantTimer = null; //动画定时器
	var assistantStandby = false; //待机状态
	var assistantStandbyCount = 0; //待机时间计数
	var assistantStandbyassistantTimer = null; //动画待机定时器
	var assistantLastName = ''; //动画的上一个名称
	var assistantPopupActive = true; //打招呼开关
	var assistantRemindCount = 0; //小助手提醒参数 用于遍历提醒动作
	var sleepState = 0; //动画是否在睡觉
	var wakeupState = 0; //动画是否在醒来
	//设置小助手的位置
	var windowWidth = window.innerWidth; //窗口宽
	var windowHeight = window.innerHeight; //窗口高
	var backgroundImgHeight = windowWidth / 1440 * 900;



	//消息中心参数
	var infoCenterOption = '1'; //消息中心的选项卡上一次的选项（防止重复请求）
	var todoDiv = ''; //消息中心下待办事项的div动态生成
	var messageDiv = ''; //消息中心下通知的div动态生成
	var chatDiv = ''; //消息中心下交流信息的div动态生成
	var noticeDiv = ''; //消息中心下系统消息的div动态生成
	var newsdiv = ''; //消息中心下新闻资讯的div动态生成
	var settingOption2Span = ''; //消息中心下设置选项卡2的span动态生成
	var settingOption3Span = ''; //消息中心下设置选项卡3的span动态生成
	// 个人日程参数
	var personalScheduleOption = '1'; //个人日程上一次时间的选项（防止重复请求）
	var personalScheduleUl1 = ''; //个人日程早上日程的ul动态生成
	var personalScheduleUl2 = ''; //个人日程下午日程的ul动态生成
	var personalScheduleUl3 = ''; //个人日程晚上日程的ul动态生成
	var recentContactList = []; //日程接口数据
	var personalScheduleDate = ''; //个人日程的日期选择的初始时间


	// if (windowHeight > backgroundImgHeight) {
	// 	$('.assistant-box').css('bottom', windowHeight - backgroundImgHeight + 30 * 1 + 'px');
	// };
	//设置浏览器背景图片的高度
	// $('.lgAssistant-main').css('height', backgroundImgHeight + 'px');

	window.requestAnimFrame = (function () {
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			function (callback) {
				window.setTimeout(callback, 20);
			};
	})();
	var canvas = document.getElementById("assistant-box-canvas");
	//点击可穿透，Through.init("click", document.getElementById("assistant-box-canvas"));
	var Through = (function () {
		var elems = [],
			eName, parent;

		function init(eventName, parentNode) {
			eName = eventName;
			parent = parentNode;
			bindEvents(eName, callback);
		}

		function bindEvents(eventName, callback) {
			var node = parent || document.body;
			if (document.addEventListener) {
				node.addEventListener(eventName, callback, false);
			} else if (document.attachEvent) {
				node.attachEvent("on" + eventName, callback);
			}
		}

		function recurFind(x, y) {
			//check current element
			var ele = document.elementFromPoint(x, y),
				nodeName = ele.tagName.toLowerCase();
			if (nodeName === "body" || nodeName === "html") {
				return;
			}
			elems.push(ele);
			ele.style.display = "none";
			//check back element
			if (document.elementFromPoint(x, y).tagName.toLowerCase() !== "body" && ele.tagName.toLowerCase() !== "html") {
				recurFind(x, y);
			}
			return;
		}

		function callback() {
			var x = event.clientX,
				y = event.clientY;
			//clear old elemnts;
			elems = [];
			//loop over element in current position
			recurFind(x, y);
			elems.map(function (node) {
				node.style.display = "block";
			});
			elems.map(function (node, i) {
				if (i === 0) return; //skip current element to prevent event repeat;
				node[eName]();
			});
		}
		return {
			init: init
		};
	})();
	// Through.init("click", document.getElementById("assistant-box-canvas"));
	var context = canvas.getContext('2d');
	var stop = null; //暂停动画
	var assistantPromptTimer = '';
	var remindtimer = '';
	var remindtimer1 = '';
	var imgLength = 0;
	var imgLengthCount = 1;
	var PromptTimerConut = 0;
	var canvasX = 0;
	var canvasY = 0;

	function canvasFn(imgName) {
		cancelAnimationFrame(stop); //暂停动画
		var animatinSpeedCount = 120; //动画速度计算
		var speed = 60; //动画速度 animatinSpeedCount%speed必须为0;
		var timer = null,
			img = new Image(),
			width = 225,
			height = 150;
		imgLength = 0; //动画图片有多少张
		imgLengthCount = 1; //动画图片切换到第几张
		// if (imgName == '摇摇铃') {
		// 	imgLengthCount = 30;
		// }
		// if (imgName == '喊喇叭') {
		// 	imgLengthCount = 30;
		// }
		$('.assistant-box').css('transition', 'all 0s');
		if (assistantLastName == '边缘探头') {
			$('.assistant-hover-box').css('right', '60px');
			// $('.assistant-box').css('right', '3.5%');
			$('.assistant-box').css('right', '0%');
			$('.assistant-hover-box').css('width', '100px');
			// console.log('上一次是边缘探头');
		};

		if (assistantLastName == '入场') {
			// $('.assistant-box').css('right', '3.5%');
			$('.assistant-box').css('right', '0%');
			// console.log('上一次是入场');
		};
		if (assistantInitialize == true && imgName == '入场') {
			$('.assistant-box').css('right', '0');
			// console.log('2次入场');
		};
		if (imgName == '边缘探头') {
			$('.assistant-box').css('right', '0');
			$('.assistant-hover-box').css('right', 0);
			$('.assistant-hover-box').css('width', '50px');

			// console.log('边缘探头');
		};

		assistantLastName = imgName;
		// if (imgName == '摇摇铃') {
		// 	imgName = '摇铃'
		// }
		if (assistantInitialize == true || imgName == '入场' || imgName == '打招呼' || imgName == '唤醒') {

			var imgUrl = PsnMgrLgAssistantAddr + '/PsnMgr/LgAssistant/images/assistant/' + imgName + '.png'; //动画图片的路径
			if (imgName == '入场') {
				imgLength = 174;
			} else if (imgName == '睡觉') {
				assistantInitialize = false;
				imgLength = 246;
			} else if (imgName == '唤醒') {
				imgLength = 78;
			} else if (imgName == '走路离场') {
				imgLength = 87;
			} else if (imgName == '打招呼') {
				imgLength = 67;
			} else if (imgName == '边缘探头') {
				imgLength = 45;
			} else if (imgName == '眨眼') {
				imgLength = 19;
			} else if (imgName == '待机动作一') {
				imgLength = 50;
			} else if (imgName == '应激' || imgName == '摇头挥手') {
				imgLength = 40;
			} else if (imgName == '喇叭') {
				assistantStandby = false;
				imgLength = 60;
			} else if (imgName == '台历') {
				assistantStandby = false;
				imgLength = 14;
			} else if (imgName == '摇铃') {
				assistantStandby = false;
				imgLength = 72;
			} else if (imgName == '待机动作二') {
				imgLength = 80;
			} else if (imgName == '待机动作三') {
				imgLength = 52;
			} else if (imgName == '待机动作四') {
				imgLength = 52;
			} else if (imgName == '摇历') {
				imgLength = 41;
			} else if (imgName == '绿球') {
				imgLength = 86;
				assistantStandby = false;
			};
			img.src = imgUrl;
		}

		function drawImg() {
			cancelAnimationFrame(stop);
			if (animatinSpeedCount <= 0) {
				animatinSpeedCount = 120;
				context.clearRect(0, 0, width, height);
				imgLengthCount++;
				context.drawImage(img, imgLengthCount * width, 0, width, height, canvasX, canvasY, width, height);
				if (imgName == '入场' && imgLengthCount == 84) {
					$('.assistant-box').css('transition', 'all .6s');
					// $('.assistant-box').css('right', '3.5%');
					// console.log(111)
				};
				//睡觉动画的连续
				if (imgLengthCount == imgLength - 1 && imgName == '睡觉') {
					imgLengthCount = 91;

				}
				if (imgLengthCount == imgLength - 1 && imgName == '待机动作四') {
					imgLengthCount = 1;

				}
				if (imgLengthCount == imgLength - 1 && imgName == '唤醒') {
					cancelAnimationFrame(stop);
					assistantInitialize = true;
					wakeupState = 0;
					canvasFn('待机动作四');
					return;
				}
				if (imgLengthCount >= imgLength) {
					if (imgName == '打招呼' && wakeupState == 0) {
						// canvas.css('width','150px');
						// canvas.css('height','100px');
						$('#assistant-box').css('top', '15px');
						$('#assistant-box').css('left', '40px');
						canvas.height = 138;
						canvas.width = 145;
						canvasX = -40;
						canvasY = -15;
						assistantInitialize = true;
						$('.assistant-hover-box').css('cursor', 'pointer');
					}

					//入场打招呼
					if (imgName == '入场') {
						canvasFn('打招呼');

						sleepState = 0;
						//获取当前时间小时
						var data = new Date();
						var hour = data.getHours();
						if (UserType == 0) {
							$('.assistant-prompt p').eq(0).text(UserName + '管理员');
						} else if (UserType == 1) {
							$('.assistant-prompt p').eq(0).text(UserName + '老师');
						} else {
							$('.assistant-prompt p').eq(0).text(UserName + '同学');
						}
						if (hour >= 5 && hour < 9) {
							if (!UserName) {
								$('.assistant-prompt ').text('早上好~');
							} else {
								$('.assistant-prompt p').eq(1).text('早上好~');
							}

						} else if (hour >= 9 && hour < 12) {
							if (!UserName) {
								$('.assistant-prompt').text('上午好~');
							} else {
								$('.assistant-prompt p').eq(1).text('上午好~');
							}

						} else if (hour >= 12 && hour < 14) {
							if (!UserName) {
								$('.assistant-prompt').text('中午好~');
							} else {
								$('.assistant-prompt p').eq(1).text('中午好~');
							}

						} else if (hour >= 14 && hour < 18) {
							if (!UserName) {
								$('.assistant-prompt').text('下午好~');
							} else {
								$('.assistant-prompt p').eq(1).text('下午好~');
							}

						} else if (hour >= 18 && hour < 24) {
							if (!UserName) {
								$('.assistant-prompt').text('晚上好~');
							} else {
								$('.assistant-prompt p').eq(1).text('晚上好~');
							}

						} else {
							if (!UserName) {
								$('.assistant-prompt').text('您好~');
							} else {
								$('.assistant-prompt p').eq(1).text('早歇哦~');
							}

						};
						if ($('.assistant-popup').css('opacity') == 0) {
							$('.assistant-prompt').css('display', 'block');
							assistantPromptTimer = setInterval(function () {
								if (PromptTimerConut >= 5) {
									clearInterval(assistantPromptTimer);
									return;
								}
								PromptTimerConut++;
								$('.assistant-prompt').css('display', 'none');
								animationRemindFn();
							}, 3000);
						}



						var lastassistantprompt = ''; //小助手提醒的上一个动画
						//小助手提醒定时器
						// setInterval(function() {
						// 	// console.log(assistantRemindArr);
						// 	$('.assistant-info-prompt').hide();
						// 	if(assistantRemindArr && assistantRemindArr.length==0) {
						// 	$('.assistant-info-prompt').show();
						// 	$('.assistant-remind-div').text('暂时没新消息哦~');
						// 	}
						// 	if (assistantRemindArr && assistantRemindArr.length > 0) {
						// 		$('.assistant-info-prompt').show();
						// 		
						// 	}
						// 	lastassistantprompt = assistantRemindArr[assistantRemindCount];
						// 	assistantRemindCount++;
						// 	if (assistantRemindArr && assistantRemindCount >= assistantRemindArr.length) {
						// 		assistantRemindCount = 0;
						// 	}
						// }, 5000);
						//离线监测
						// $.getScript(PsnMgrMainServerAddr + 'UserMgr/Login/Api/Login.ashx?method=IsOnline&params=' + UserID +
						// 	'&token=' +
						// 	PsnMgrToken +
						// 	'&jsoncallback=AgassitantCallbackFn');
						// laAssistantOnlineTimer = setInterval(function() {
						// 	$.getScript(PsnMgrMainServerAddr + 'UserMgr/Login/Api/Login.ashx?method=IsOnline&params=' + UserID +
						// 		'&token=' +
						// 		PsnMgrToken +
						// 		'&jsoncallback=AgassitantCallbackFn');
						// }, 30001);
						return;
					};
					if (imgName != '入场' || imgName != '打招呼') {
						if (imgName != '喇叭') {
							context.drawImage(img, (imgLengthCount - 1) * width, 0, width, height, canvasX,
								canvasY, width, height);
						}

					}
					cancelAnimationFrame(stop);
					var standbyAll = ['待机动作一', '待机动作二', '待机动作三', '眨眼', '打招呼', '应激', '绿球'];
					var standbyAll1 = ['喇叭', '摇铃', '台历'];
					if (standbyAll.indexOf(imgName) != -1) {
						canvasFn('待机动作四');
					} else if (standbyAll1.indexOf(imgName) != -1) {
						assistantStandby = false;
						setTimeout(function () {
							canvasFn('待机动作四');
						}, 400)
					}
				} else {
					stop = window.requestAnimFrame(drawImg);
					animatinSpeedCount = animatinSpeedCount - speed;
				}
			} else {
				stop = window.requestAnimFrame(drawImg);
				animatinSpeedCount = animatinSpeedCount - speed;
			}
		};

		img.onload = function () {
			stop = window.requestAnimFrame(drawImg);
		}
	}
	canvasFn('入场');
	$('.assistant-info-prompt i').click(function (event) {
		$('.assistant-info-prompt').hide();
		if ($('.assistant-popup').css('opacity') == 0) {
			$('.assistant-remind-count').show();
		} else {
			$('.assistant-remind-count').hide();
		}

		event.stopPropagation();
	})

	// $(document).on('click','#assistant-box-canvas',function(e) {
	// 	if (e.offsetX >= 65 && e.offsetX <= 154 && e.offsetY > 34 && e.offsetY < 134) {
	// 		
	// 				if ($('.assistant-remind').css('display') != 'none') {
	// 			normal('.assistant-remind-span');
	// 			return;
	// 		}
	// 		if ($('.assistant-popup').css('opacity') == 1) {
	// 			assistantPopupActive = false;
	// 		} else {
	// 			assistantPopupActive = true;
	// 		}
	// 		assistantStandby = false;
	// 		$('.isassistant-message-reminder').remove();
	// 		if (assistantInitialize && !isassistantOnClick) {
	// 			if (!initialization) {
	// 				initializationFn();
	// 		
	// 			}
	// 			if ($('.assistant-active').attr('name') == 1 && $('.assistant-popup').css('opacity') == '0') {
	// 		
	// 		
	// 				if ($('.info-active').eq(0).attr('name') == 1) {
	// 					todoFn(0);
	// 				}
	// 				if ($('.info-active').eq(0).attr('name') == 2) {
	// 					noticeFn(0);
	// 				}
	// 				if ($('.info-active').eq(0).attr('name') == 3) {
	// 					chatFn();
	// 				}
	// 				if ($('.info-active').eq(0).attr('name') == 4) {
	// 					messageFn(0);
	// 				}
	// 				if ($('.info-active').eq(0).attr('name') == 5) {
	// 					newsFn();
	// 				}
	// 		
	// 			}
	// 			isassistantOnClick = true;
	// 			setTimeout(function() {
	// 				isassistantOnClick = false;
	// 			}, 500)
	// 			cancelAnimationFrame(stop);
	// 			count = 0;
	// 			canvasFn('打招呼');
	// 			if (assistantPopupActive) {
	// 				$('.assistant-popup').css('transition', 'all 0.25s ease-in-out');
	// 				$('.assistant-popup').css('bottom', '49%');
	// 				$('.assistant-popup').css('right', '50%');
	// 				$('.assistant-popup').css('transform', 'scale(1)');
	// 				$('.assistant-popup').css('opacity', '1');
	// 				assistantPopupActive = !assistantPopupActive;
	// 				$('.assistant-remind-count').hide();
	// 				$('.assistant-info-prompt').hide();
	// 			} else {
	// 				$('.assistant-popup').css('transition', 'all 0.3s');
	// 				$('.assistant-popup').css('bottom', '-134%');
	// 				$('.assistant-popup').css('right', '-126%');
	// 				$('.assistant-popup').css('transform', 'scale(0)');
	// 				$('.assistant-popup').css('opacity', '0');
	// 				assistantPopupActive = !assistantPopupActive;
	// 				againCountRemindFn();
	// 		
	// 			};
	// 		} else if (wakeupState == 1 && !isassistantOnClick) {
	// 			if (!initialization) {
	// 				initializationFn();
	// 		
	// 			}
	// 			if ($('.assistant-active').attr('name') == 1 && $('.assistant-popup').css('opacity') == '0') {
	// 				if ($('.info-active').eq(0).attr('name') == 1) {
	// 					todoFn(0);
	// 				}
	// 				if ($('.info-active').eq(0).attr('name') == 2) {
	// 					noticeFn(0);
	// 				}
	// 				if ($('.info-active').eq(0).attr('name') == 3) {
	// 					chatFn();
	// 				}
	// 				if ($('.info-active').eq(0).attr('name') == 4) {
	// 					messageFn(0);
	// 				}
	// 				if ($('.info-active').eq(0).attr('name') == 5) {
	// 					newsFn();
	// 				}
	// 		
	// 			}
	// 			isassistantOnClick = true;
	// 			setTimeout(function() {
	// 				isassistantOnClick = false;
	// 			}, 500)
	// 			count = 0;
	// 			if (assistantPopupActive) {
	// 				$('.assistant-popup').css('transition', 'all 0.25s ease-in-out');
	// 				$('.assistant-popup').css('bottom', '49%');
	// 				$('.assistant-popup').css('right', '50%');
	// 				$('.assistant-popup').css('transform', 'scale(1)');
	// 				$('.assistant-popup').css('opacity', '1');
	// 				assistantPopupActive = !assistantPopupActive;
	// 				$('.assistant-remind-count').hide();
	// 			} else {
	// 				$('.assistant-popup').css('transition', 'all 0.3s');
	// 				$('.assistant-popup').css('bottom', '-134%');
	// 				$('.assistant-popup').css('right', '-126%');
	// 				$('.assistant-popup').css('transform', 'scale(0)');
	// 				$('.assistant-popup').css('opacity', '0');
	// 				assistantPopupActive = !assistantPopupActive;
	// 				againCountRemindFn();
	// 			};
	// 		}
	// 		
	// 		console.log(111111111111111111111111111);
	// 	}
	// })
	var count = 0; //动画待机计数
	var assistantStandbyArr = []; //防止动画重复三次
	//小助手待机函数
	function assistantStandbyFn() {
		// window.requestAnimFrame(assistantStandbyFn);
		clearInterval(assistantStandbyassistantTimer);
		//待机7*8=56秒，随机做一个动作
		assistantStandbyassistantTimer = setInterval(function () {
			if (assistantInitialize == true) {
				if (assistantRemindArr && assistantRemindArr.length > 0) {
					assistantStandby = false;
				} else {
					assistantStandby = true;
				}
				if (assistantStandby) {
					count += 2;
					if (count % 4 == 0) {
						if ($('.assistant-remind-count').css('display') == 'block') {
							canvasFn('绿球');
							return;
						}
						//待机3*8=24秒，小助手进入睡觉状态
						if (count == 20 && $('.assistant-popup').css('opacity') != '1') {
							sleepState = 1;
							cancelAnimationFrame(stop);
							canvasFn('睡觉');
						} else if (count > 20 && $('.assistant-popup').css('opacity') != '1') {

						} else {
							var num = Math.floor(Math.random() * 5);
							//第一个动作不为待机动作三
							if (count == 4 && num == 4) {
								num = 0;
							}
							//防止动画重复3次以上
							assistantStandbyArr.push(num);
							if (assistantStandbyArr.length > 3) {
								if (assistantStandbyArr[0] == assistantStandbyArr[1] == assistantStandbyArr[2] == assistantStandbyArr[3]) {
									num++;
									if (num > 3) {
										num = 0;
									}
									assistantStandbyArr = [];
									assistantStandbyArr.push(num);
								}
							}
							var assistantassistantStandbyarr = ['待机动作一', '眨眼', '待机动作二', '眨眼', '待机动作三'];
							cancelAnimationFrame(stop);
							canvasFn(assistantassistantStandbyarr[num]);
							// console.log(assistantassistantStandbyarr[num]);
							// $('#assistant-box').css('background','url('+PsnMgrLgAssistantAddr+'/PsnMgr/LgAssistant/images/assistant/眨眼2.gif") 0 0 no-repeat');
						};
					}
				}
			}
		}, 4000);

	};
	// window.requestAnimFrame = (function() {
	// 	return window.requestAnimationFrame ||
	// 		window.webkitRequestAnimationFrame ||
	// 		window.mozRequestAnimationFrame ||
	// 		function(callback) {
	// 			window.setTimeout(callback, 5000);
	// 		};
	// })();
	// window.requestAnimFrame(assistantStandbyFn);
	var isassistantOnClick = false;
	//小助手点击事件
	$('.assistant-hover-box').click(function (event) {

		event.stopPropagation();
		if ($('.assistant-remind').css('display') != 'none') {
			normal('.assistant-remind-span');
			return;
		}
		if ($('.assistant-popup').css('opacity') == 1) {
			assistantPopupActive = false;
		} else {
			assistantPopupActive = true;
		}
		assistantStandby = false;
		$('.isassistant-message-reminder').remove();
		if (assistantInitialize && !isassistantOnClick) {
			if (!initialization) {
				initializationFn();

			}
			if ($('.assistant-active').attr('name') == 1 && $('.assistant-popup').css('opacity') == '0') {


				if ($('.info-active').eq(0).attr('name') == 1) {
					todoFn(0);
				}
				if ($('.info-active').eq(0).attr('name') == 2) {
					noticeFn(0);
				}
				if ($('.info-active').eq(0).attr('name') == 3) {
					chatFn();
				}
				if ($('.info-active').eq(0).attr('name') == 4) {
					messageFn(0);
				}
				if ($('.info-active').eq(0).attr('name') == 5) {
					newsFn();
				}

			}
			isassistantOnClick = true;
			setTimeout(function () {
				isassistantOnClick = false;
			}, 500)
			cancelAnimationFrame(stop);
			count = 0;
			canvasFn('打招呼');
			if (assistantPopupActive) {
				$('.assistant-popup').css('transition', 'all 0.25s ease-in-out');
				$('.assistant-popup').css('bottom', '49%');
				$('.assistant-popup').css('right', '50%');
				$('.assistant-popup').css('transform', 'scale(1)');
				$('.assistant-popup').css('opacity', '1');
				assistantPopupActive = !assistantPopupActive;
				$('.assistant-remind-count').hide();
				$('.assistant-info-prompt').hide();
			} else {
				$('.assistant-popup').css('transition', 'all 0.3s');
				$('.assistant-popup').css('bottom', '-134%');
				$('.assistant-popup').css('right', '-126%');
				$('.assistant-popup').css('transform', 'scale(0)');
				$('.assistant-popup').css('opacity', '0');
				assistantPopupActive = !assistantPopupActive;
				againCountRemindFn();
				return;
			};
		} else if (wakeupState == 1 && !isassistantOnClick) {
			if (!initialization) {
				initializationFn();

			}
			if ($('.assistant-active').attr('name') == 1 && $('.assistant-popup').css('opacity') == '0') {
				if ($('.info-active').eq(0).attr('name') == 1) {
					todoFn(0);
				}
				if ($('.info-active').eq(0).attr('name') == 2) {
					noticeFn(0);
				}
				if ($('.info-active').eq(0).attr('name') == 3) {
					chatFn();
				}
				if ($('.info-active').eq(0).attr('name') == 4) {
					messageFn(0);
				}
				if ($('.info-active').eq(0).attr('name') == 5) {
					newsFn();
				}

			}
			isassistantOnClick = true;
			setTimeout(function () {
				isassistantOnClick = false;
			}, 500)
			count = 0;
			if (assistantPopupActive) {
				$('.assistant-popup').css('transition', 'all 0.25s ease-in-out');
				$('.assistant-popup').css('bottom', '49%');
				$('.assistant-popup').css('right', '50%');
				$('.assistant-popup').css('transform', 'scale(1)');
				$('.assistant-popup').css('opacity', '1');
				assistantPopupActive = !assistantPopupActive;
				$('.assistant-remind-count').hide();
			} else {
				$('.assistant-popup').css('transition', 'all 0.3s');
				$('.assistant-popup').css('bottom', '-134%');
				$('.assistant-popup').css('right', '-126%');
				$('.assistant-popup').css('transform', 'scale(0)');
				$('.assistant-popup').css('opacity', '0');
				assistantPopupActive = !assistantPopupActive;
				againCountRemindFn();
			};
		}
		return;

	});
	//小助手鼠标经过事件

	$('.assistant-hover-box').hover(function () {
		assistantStandby = false;
		count = 0;
		if (assistantInitialize) {
			cancelAnimationFrame(stop);
			canvasFn('应激');
			assistantStandbyFn();
		}
		if (sleepState == 1) {
			sleepState = 0;
			wakeupState = 1;
			cancelAnimationFrame(stop);
			canvasFn('唤醒');
		};
	}, function () {});
	$('.assistant-hover-box').blur(function () {
		assistantStandby = false;
		count = 0;
	});
	// 小助手动作变换
	// $('.img-name-btn').click(function() {
	// 	assistantStandby = false;
	// 	var imgName = $(this).text();
	// 	canvasFn(imgName);
	// 	assistantStandbyFn();
	// });
	assistantStandbyFn();
	//小助手待机函数


	//点击小助手主页面关闭按钮
	$('.assistant-popup-close').click(function () {
		$('.assistant-popup').css('transition', 'all 0.3s');
		$('.assistant-popup').css('bottom', '-104%');
		$('.assistant-popup').css('right', '-102%');
		$('.assistant-popup').css('transform', 'scale(0)');
		$('.assistant-popup').css('opacity', '0');
		assistantPopupActive = true;
		assistantStandby = false;
		count = 0;
		$('.isassistant-message-reminder').remove();
		againCountRemindFn();
	});
	//消息中心模块下的选项卡第一个
	var todoLsit = '';
	var messageLsit = '';
	var noticeLsit = '';


	//点击小气泡跳转事件

	$('.assistant-remind-count').click(function () {
		if (!initialization) {
			if ($(this).attr(name) == 1) {
				initializationFn('message');
			} else {
				initializationFn();
			}

		}
		assistantPopupActive = !assistantPopupActive;
		assistantRemindArr = [];
		$('.assistant-remind-count').hide();
		$('.assistant-info-prompt').hide();
		$('.assistant-popup').css('transition', 'all 0.25s ease-in-out');
		$('.assistant-popup').css('bottom', '49%');
		$('.assistant-popup').css('right', '50%');
		$('.assistant-popup').css('transform', 'scale(1)');
		$('.assistant-popup').css('opacity', '1');
		popupNavChoose = 1;
		$('.popup-nav-list ul li').attr('class', '');
		$('.popup-nav-list ul li').eq(0).attr('class', 'assistant-active');
		$('.popup-main-nav').hide();
		$('.popup-main-nav').eq(0).show();
		$('.assistant-popup-loading').hide();
		$('.assistant-tips').hide();
		if ($(this).attr('name') == 0) {
			$('.isassistant-message-reminder').remove();
			$('.isassistant-message-reminder').css('right', '-150px');
			todoFn(0);
			infoCenterOption = 1;
			$('.popup-main1>ul li').attr('class', '');
			$('.infoCenter-option').hide();
			$('.popup-main1>ul li').eq(0).attr('class', 'info-active');
			$('.popup-main1>ul li p').attr('class', '');
			$('.popup-main1>ul li').eq(0).children('p').attr('class', 'info-active');
			$('.popup-main1>ul li').eq(0).children('p').children().attr('class', '');
		};
		if ($(this).attr('name') == 1) {
			$('.isassistant-message-reminder').remove();
			$('.isassistant-message-reminder').css('right', '-150px');
			noticeFn(0);
			infoCenterOption = 2;
			$('.popup-main1>ul li').attr('class', '');
			$('.infoCenter-option').hide();
			$('.popup-main1>ul li').eq(1).attr('class', 'info-active');
			$('.popup-main1>ul li p').attr('class', '');
			$('.popup-main1>ul li').eq(1).children('p').attr('class', 'info-active');
			$('.popup-main1>ul li').eq(1).children('p').children().attr('class', '');
		};
		if ($(this).attr('name') == 3) {
			$('.isassistant-message-reminder').remove();
			$('.isassistant-message-reminder').css('right', '-150px');
			chatFn();
			infoCenterOption = 3;
			$('.popup-main1>ul li').attr('class', '');
			$('.infoCenter-option').hide();
			$('.popup-main1>ul li').eq(3).attr('class', 'info-active');
			$('.popup-main1>ul li p').attr('class', '');
			$('.popup-main1>ul li').eq(3).children('p').attr('class', 'info-active');
			$('.popup-main1>ul li').eq(3).children('p').children().attr('class', '');

		};
		if ($(this).attr('name') == 2 || $(this).attr('name') == 5) {
			$('.isassistant-message-reminder').remove();
			$('.isassistant-message-reminder').css('right', '-150px');
			messageFn(0);
			infoCenterOption = 4;
			$('.popup-main1>ul li').attr('class', '');
			$('.infoCenter-option').hide();
			$('.popup-main1>ul li').eq(2).attr('class', 'info-active');
			$('.popup-main1>ul li p').attr('class', '');
			$('.popup-main1>ul li').eq(2).children('p').attr('class', 'info-active');
			$('.popup-main1>ul li').eq(2).children('p').children().attr('class', '');

		};
		if ($(this).attr('name') == 4) {
			$('.isassistant-message-reminder').remove();
			$('.isassistant-message-reminder').css('right', '-150px');
			newsFn();
			infoCenterOption = 5;
			$('.popup-main1>ul li').attr('class', '');
			$('.infoCenter-option').hide();
			$('.popup-main1>ul li').eq(4).attr('class', 'info-active');
			$('.popup-main1>ul li p').attr('class', '');
			$('.popup-main1>ul li').eq(4).children('p').attr('class', 'info-active');
			$('.popup-main1>ul li').eq(4).children('p').children().attr('class', '');
		};
		$(this).attr('name', '-1');
	})

	//导航栏主模块选择
	var popopMain4Initialize = true;
	var popupNavChoose = 1; //主模块防止多次点击
	var summaryCacheData = []; //学情总结缓存信息
	$('.popup-nav-list ul li').click(function () {
		if (popupNavChoose == $(this).attr('name')) {
			return;
		} else {
			$('.isassistant-message-reminder').remove();
		}
		if (popupNavChoose == 2) {
			$('.schedule-message').attr('class', '');
		}
		popupNavChoose = $(this).attr('name');
		$('.popup-nav-list ul li').attr('class', '');
		$(this).attr('class', 'assistant-active');
		$('.popup-main-nav').hide();
		$('.popup-main-nav').eq($(this).attr('name') - 1).show();
		$('.assistant-popup-loading').hide();
		if ($(this).attr('name') == 4) {
			//初始化通讯录
			$.getScript(PsnMgrMainServerAddr + 'UserMgr/Login/Api/Login.ashx?method=IsOnline&params=' + UserID +
				'&token=' +
				PsnMgrToken +
				'&jsoncallback=AgassitantCallbackFn');
			if (popopMain4Initialize) {
				recentContactType = 1;
				recentContactFn(0, 1, '');
				popopMain4Initialize = false;
			} else {
				var state = $(this).attr('data-state');
				if ($(this).attr('data-state') == '1111') {
					state = {
						ClassID: $(this).attr('data-ClassID'),
						ClassMemberType: $(this).attr('data-ClassMemberType'),
						ClassType: $(this).attr('data-ClassType'),
					}
				} else if ($(this).attr('data-state') == '2222') {
					state = {
						SubjectID: $(this).attr('data-SubjectID'),
					}
				} else if ($(this).attr('data-state') == '3333') {
					state = {
						GradeID: $(this).attr('data-GradeID'),
					}
				}
				recentContactFn($(this).attr('data-page'), $(this).attr('data-name'), state);
			}
			$('.contact-search-li').remove();
			$('.contact-search-number').text('0');
			$('.contact-frequent-input').val('');
			$('.contact-frequent').hide();
			$('.contact-frequent div').eq(0).hide();
			$('.contact-frequent div').eq(1).css('right', '-680px');
			$('.pager5').hide();
		} else if ($(this).attr('name') == 2) {
			personalScheduleFn($('.schedule-choose-date').text());
			if ($('.schedule-setting-true').attr('name') == '22' || $('.schedule-setting-true').attr('name') == '11') {
				$('.schedule-setting-true').attr('name', '');
				$('.schedule-setting-popup div').eq(0).hide();
				$('.schedule-setting-popup div').eq(1).css('right', '-680px');
				$(".schedule-setting-popup").hide();
			}
			// $('.personal-schedule-ul1').hide();
			// $('.personal-schedule-ul2').hide();
			// $('.personal-schedule-ul3').hide();
			// personalScheduleFn(personalScheduleDate);
			// $('.schedule-choose-date').text(personalScheduleDate);
			// $('.schedule-choose-week').text(dataChangeTerm(termStartDate, $('.schedule-choose-date').text()));
			// $('.schedule-choose-day i:eq(1)').css('background', 'url('+PsnMgrLgAssistantAddr+'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_3.png)');
			// $('.schedule-choose-day i:eq(2)').css('background', 'url('+PsnMgrLgAssistantAddr+'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_5.png)');
			// $('.schedule-choose-day i:eq(0)').css('background', 'url('+PsnMgrLgAssistantAddr+'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_2.png)');
			// $('.schedule-choose-day i').css('color', '#0e95ed');
			// $('.schedule-choose-day i:eq(0)').css('color', '#fff');

		} else if ($(this).attr('name') == 5) {
			workSparceFn();
		} else if ($(this).attr('name') == 3) {
			if (summaryCacheData.length == 0) {
				summaryTableFn();
			} else if (summaryCacheData.length == 1) {
				summaryTable0Fn(summaryTable0info, 0);
			} else {
				if (summaryCacheData[1] == 1) {} else if (summaryCacheData[1] == 2) {
					summaryTable2Fn(summaryTable2info, 0);
				} else {
					summaryTable3Fn(summaryTable3info, 0);
				}
			}
		} else if ($(this).attr('name') == 1 && $('.info-active').eq(1).children().attr('class') != '') {
			if ($('.info-active').eq(0).attr('name') == 1) {
				todoFn(0);
			} else if ($('.info-active').eq(0).attr('name') == 2) {
				noticeFn(0);
			} else if ($('.info-active').eq(0).attr('name') == 3) {
				chatFn();
			} else if ($('.info-active').eq(0).attr('name') == 4) {
				messageFn(0);
			} else if ($('.info-active').eq(0).attr('name') == 5) {
				newsFn();
			}

		}
		// else if ($('.popup-main-nav').eq($(this).attr('name') == 1)) {
		// 	// personalScheduleFn(getDate('03'));
		// }



	});
	//消息中心子模块 新消息提醒点击刷新页面
	$('.popup-main').on('click', '.isassistant-message-reminder', function () {
		if ($(this).attr('name') == 1) {
			todoFn(0);
			$('.popup-main1 ul li').eq(0).children().children().attr('class', '');
		} else if ($(this).attr('name') == 2) {
			noticeFn(0);
			$('.popup-main1 ul li').eq(1).children().children().attr('class', '');
		} else if ($(this).attr('name') == 3) {
			chatFn();
			$('.popup-main1 ul li').eq(3).children().children().attr('class', '');
		} else if ($(this).attr('name') == 4) {
			messageFn(0);
			$('.popup-main1 ul li').eq(2).children().children().attr('class', '');
		} else if ($(this).attr('name') == 5) {
			newsFn();
			$('.popup-main1 ul li').eq(4).children().children().attr('class', '');
		}
		$('.isassistant-message-reminder').remove();
	})

	var lastRemindNum = '';
	//消息中心子模块的选择
	$('.popup-main1>ul li').click(function () {
		$('.assistant-tips').hide();
		if ($(this).attr('name') != infoCenterOption) {
			$('.popup-main2').hide();
			$('.assistant-popup-loading').show();
		} else {
			return;
		}

		if (infoCenterOption == 2 && lastRemindNum) {
			$('.popup-main1>ul li').eq(1).children().children().children().children().text(lastRemindNum);
		}
		if ($(this).attr('name') == 2) {
			lastRemindNum = $(this).children().children().children().children().text();
		} else {
			$(this).children().children().children().children().text('');
		}

		if ($(this).attr('name') == '1' && infoCenterOption != '1') {
			$('.isassistant-message-reminder').remove();
			$('.isassistant-message-reminder').css('right', '-150px');
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
			$('.isassistant-message-reminder').remove();
			$('.isassistant-message-reminder').css('right', '-150px');
			noticeFn(0);
			infoCenterOption = 2;
			$('.popup-main1>ul li').attr('class', '');
			$('.infoCenter-option').hide();
			$(this).attr('class', 'info-active');
			$('.popup-main1>ul li p').attr('class', '');
			$(this).children('p').attr('class', 'info-active');
			// $(this).children('p').children().attr('class', '');

		};
		if ($(this).attr('name') == '3' && infoCenterOption != '3') {
			$('.isassistant-message-reminder').remove();
			$('.isassistant-message-reminder').css('right', '-150px');
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
			$('.isassistant-message-reminder').remove();
			$('.isassistant-message-reminder').css('right', '-150px');
			messageFn(0);
			infoCenterOption = 4;
			$('.popup-main1>ul li').attr('class', '');
			$('.infoCenter-option').hide();
			$(this).attr('class', 'info-active');
			$('.popup-main1>ul li p').attr('class', '');
			$(this).children('p').attr('class', 'info-active');
			$(this).children('p').children().attr('class', '');

		};
		if ($(this).attr('name') == '5' && infoCenterOption != '5') {
			$('.isassistant-message-reminder').remove();
			$('.isassistant-message-reminder').css('right', '-150px');
			newsFn();
			infoCenterOption = 5;
			$('.popup-main1>ul li').attr('class', '');
			$('.infoCenter-option').hide();
			$(this).attr('class', 'info-active');
			$('.popup-main1>ul li p').attr('class', '');
			$(this).children('p').attr('class', 'info-active');
			$(this).children('p').children().attr('class', '');
		};
	});


	$('.todo-type-span').hover(function () {
		$('.todo-type-ul').show();
		$('.todo-type-span p').show();
	}, function () {
		$('.todo-type-span p').hide();
		$('.todo-type-ul').hide();
	})
	//待办事项分类
	$('.todo-type-span').on('click', ' .todo-type-ul li', function () {
		// if($('.todo-type-span').attr('data-name')==$(this).attr('data-name')){
		// 	return;
		// }else{
		// 	$('.todo-type-span').attr('data-name',$(this).attr('data-name'));
		// }
		$('.todo-type-span').html($(this).attr('name') + $('.todo-type-span').html().slice($('.todo-type-span').html().indexOf(
			'('), $('.todo-type-span').html().length));
		$('.todo-type-ul').hide();
		$('.todo-type-span p').hide();
		todoFn(0, $(this).attr('data-id'));
	})
	//消息中心设置按钮hover
	$('.infoCenter-setting').hover(function () {
		$('.infoCenter-setting').children('span').css('color', '#FF6600');
		// console.log($('.assistant-popupclose'))
	}, function () {
		$('.infoCenter-setting').children('span').css('color', '#0099ff');
	});
	$('.infoCenter-setting').click(function () {
		$('.setting-popup').show();

		settingOption1Fn();

	});

	//消息中心 设置窗口关闭
	$('.setting-close .lgAssistant-close').click(function () {
		$('.setting-popup  div').eq(0).hide();
		$('.setting-popup div').eq(1).animate({
			right: '-680px'
		}, 'slow', function () {
			$('.setting-popup').hide();
		});
	});
	$('.setting-popup  div').eq(0).click(function () {
		$('.setting-popup  div').eq(0).hide();
		$('.setting-popup div').eq(1).animate({
			right: '-680px'
		}, 'slow', function () {
			$('.setting-popup').hide();
		});
	});
	var settingOption = '';
	//消息中心设置子模块的选择
	$('.setting-popup>div>ul li').click(function () {
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
	//小助手消息提醒点击跳转
	$('.assistant-box').on('click', '.assistant-remind-ul li', function () {
		if (!initialization) {
			if ($(this).children().attr('name') == 1) {
				initializationFn('message');
			} else {
				initializationFn();
			}
		}
		$('.assistant-remind-count').hide();
		$('.assistant-info-prompt').hide();
		$('.assistant-popup').css('transition', 'all 0.25s ease-in-out');
		$('.assistant-popup').css('bottom', '49%');
		$('.assistant-popup').css('right', '50%');
		$('.assistant-popup').css('transform', 'scale(1)');
		$('.assistant-popup').css('opacity', '1');
		popupNavChoose = 1;
		$('.popup-nav-list ul li').attr('class', '');
		$('.popup-nav-list ul li').eq(0).attr('class', 'assistant-active');
		$('.popup-main-nav').hide();
		$('.popup-main-nav').eq(0).show();
		$('.assistant-popup-loading').hide();
		$('.assistant-tips').hide();
		if ($(this).children().attr('name') == 0) {
			$('.isassistant-message-reminder').remove();
			$('.isassistant-message-reminder').css('right', '-150px');
			todoFn(0);
			infoCenterOption = 1;
			$('.popup-main1>ul li').attr('class', '');
			$('.infoCenter-option').hide();
			$('.popup-main1>ul li').eq(0).attr('class', 'info-active');
			$('.popup-main1>ul li p').attr('class', '');
			$('.popup-main1>ul li').eq(0).children('p').attr('class', 'info-active');
			$('.popup-main1>ul li').eq(0).children('p').children().attr('class', '');
		};
		if ($(this).children().attr('name') == 1) {
			$('.isassistant-message-reminder').remove();
			$('.isassistant-message-reminder').css('right', '-150px');
			infoCenterOption = 2;
			$('.popup-main1>ul li').attr('class', '');
			$('.infoCenter-option').hide();
			$('.popup-main1>ul li').eq(1).attr('class', 'info-active');
			$('.popup-main1>ul li p').attr('class', '');
			$('.popup-main1>ul li').eq(1).children('p').attr('class', 'info-active');
			$('.popup-main1>ul li').eq(1).children('p').children().attr('class', '');
		};
		if ($(this).children().attr('name') == 3) {
			$('.isassistant-message-reminder').remove();
			$('.isassistant-message-reminder').css('right', '-150px');
			chatFn();
			infoCenterOption = 3;
			$('.popup-main1>ul li').attr('class', '');
			$('.infoCenter-option').hide();
			$('.popup-main1>ul li').eq(3).attr('class', 'info-active');
			$('.popup-main1>ul li p').attr('class', '');
			$('.popup-main1>ul li').eq(3).children('p').attr('class', 'info-active');
			$('.popup-main1>ul li').eq(3).children('p').children().attr('class', '');

		};
		if ($(this).children().attr('name') == 2) {
			$('.isassistant-message-reminder').remove();
			$('.isassistant-message-reminder').css('right', '-150px');
			messageFn(0);
			infoCenterOption = 4;
			$('.popup-main1>ul li').attr('class', '');
			$('.infoCenter-option').hide();
			$('.popup-main1>ul li').eq(2).attr('class', 'info-active');
			$('.popup-main1>ul li p').attr('class', '');
			$('.popup-main1>ul li').eq(2).children('p').attr('class', 'info-active');
			$('.popup-main1>ul li').eq(2).children('p').children().attr('class', '');

		};
		if ($(this).children().attr('name') == 4) {
			$('.isassistant-message-reminder').remove();
			$('.isassistant-message-reminder').css('right', '-150px');
			newsFn();
			infoCenterOption = 5;
			$('.popup-main1>ul li').attr('class', '');
			$('.infoCenter-option').hide();
			$('.popup-main1>ul li').eq(4).attr('class', 'info-active');
			$('.popup-main1>ul li p').attr('class', '');
			$('.popup-main1>ul li').eq(4).children('p').attr('class', 'info-active');
			$('.popup-main1>ul li').eq(4).children('p').children().attr('class', '');
		};
	})

	//重新计算小气泡的值和跳转目标
	function againCountRemindFn() {
		if (!assistantTimeUpdata) {
			return;
		}
		allRemindCount == 0;

		ajaxN('PsnMgr/InfoCentre/GetNewRemindCount', 'get', {}, function (data) {
			if (data.StatusCode == 200 && data.ErrCode == 0) {
				if (data.Data.TotalCount != 0) {
					$('.popup-nav-ul li').eq(0).children('b').attr('class', 'info-unread');
					if (data.Data.TodoListCount != 0) {
						TodoRemindCount = data.Data.TodoListCount;
						$('.popup-main1 ul li').eq(0).children().children().attr('class', 'info-unread4');
					} else {
						$('.popup-main1 ul li').eq(0).children().children().attr('class', '');
					}
					if (data.Data.NoticeCount != 0) {
						$('.popup-main1 ul li').eq(1).children().children().attr('class', 'info-unread2');
						NoticeRemindCount = data.Data.NoticeCount;
					} else {
						$('.popup-main1 ul li').eq(1).children().children().attr('class', '');
					}
					if (data.Data.ChatCount != 0) {
						$('.popup-main1 ul li').eq(3).children().children().attr('class', 'info-unread4');
						ChatRemindCount = data.Data.ChatCount;
					} else {
						$('.popup-main1 ul li').eq(3).children().children().attr('class', '');
					}
					if (data.Data.MessageCount > 0) {
						$('.popup-main1 ul li').eq(2).children().children().attr('class', 'info-unread4');
						MessageRemindCount = data.Data.MessageCount;
					} else {
						$('.popup-main1 ul li').eq(2).children().children().attr('class', '');
					}
					if (data.Data.NewsCount != 0) {
						$('.popup-main1 ul li').eq(4).children().children().attr('class', 'info-unread4');
						NewsRemindCount = data.Data.NewsCount;
					} else {
						$('.popup-main1 ul li').eq(4).children().children().attr('class', '');
					}

				} else {
					$('.popup-nav-ul li').eq(0).children('b').attr('class', '');
				}
			} else {
				assistantTipsFn(data.Msg);
			}
			allRemindCount = TodoRemindCount + NoticeRemindCount + ChatRemindCount + MessageRemindCount +
				NewsRemindCount; //日程提醒总数
			if (allRemindCount == 0) {
				$('.assistant-remind-count').hide();
				$('.assistant-info-prompt').hide();
				onlyRemindType = 1;
				$('.assistant-remind-count').attr('name', '-1');
				$('.popup-nav-ul li').eq(0).children('b').attr('class', '');
				return;
			}

			if (!assistantPopupActive) {
				return;
			}
			if (data.Data.TotalCount == data.Data.TodoListCount || data.Data.TotalCount == data.Data.NoticeCount ||
				data.Data.TotalCount == data.Data.ChatCount || data.Data.TotalCount == data.Data.MessageCount || data.Data
				.TotalCount == data.Data.NewsCount) {
				onlyRemindType == 1;
			} else {
				onlyRemindType = 0;
			}
			var allRemindCount1 = allRemindCount;
			if (allRemindCount > 99) {
				allRemindCount1 = '...';
			}
			$('.assistant-remind-count ul li').text(allRemindCount1);
			$('.assistant-remind-count').show();
			if (scheduleRemindCount > 0) {
				$('.assistant-remind-count').attr('name', '2');
			} else if (TodoRemindCount > 0) {
				$('.assistant-remind-count').attr('name', '0');
			} else if (NoticeRemindCount > 0) {
				$('.assistant-remind-count').attr('name', '1');
			} else if (MessageRemindCount > 0) {
				$('.assistant-remind-count').attr('name', '2');
			} else if (ChatRemindCount > 0) {
				$('.assistant-remind-count').attr('name', '3');
			} else if (NewsRemindCount > 0) {
				$('.assistant-remind-count').attr('name', '4');
			}
			scheduleRemindCount = 0;
			TodoRemindCount = 0;
			NoticeRemindCount = 0;
			ChatRemindCount = 0;
			MessageRemindCount = 0;
			NewsRemindCount = 0;
		})



	}

	//重新计算未读消息的数量
	function againCountunreadFn() {
		ajaxN('PsnMgr/InfoCentre/GetNewRemindCount', 'get', {}, function (data) {
			if (data.StatusCode == 200 && data.ErrCode == 0) {
				if (data.Data.TotalCount > 0) {
					$('.popup-nav-ul li').eq(0).children('b').attr('class', 'info-unread');
					if (data.Data.TodoListCount > 0) {
						$('.popup-main1 ul li').eq(0).children().children().attr('class', 'info-unread2');
					} else {
						$('.popup-main1 ul li').eq(0).children().children().attr('class', '');
						$('.popup-main1 ul li').eq(0).children().children().children().children().text('');
					}
					if (data.Data.NoticeCount > 0) {

						$('.popup-main1 ul li').eq(1).children().children().attr('class', 'info-unread2');

					} else {
						$('.popup-main1 ul li').eq(1).children().children().attr('class', '');
						$('.popup-main1 ul li').eq(1).children().children().children().children().text('');
					}
					if (data.Data.ChatCount > 0) {
						$('.popup-main1 ul li').eq(3).children().children().attr('class', 'info-unread4');
					} else {
						$('.popup-main1 ul li').eq(3).children().children().attr('class', '');
						$('.popup-main1 ul li').eq(3).children().children().children().children().text('');
					}
					if (data.Data.MessageCount > 0) {
						$('.popup-main1 ul li').eq(2).children().children().attr('class', 'info-unread4');
					} else {
						$('.popup-main1 ul li').eq(2).children().children().attr('class', '');
						$('.popup-main1 ul li').eq(2).children().children().children().children().text('');
					}
					if (data.Data.NewsCount > 0) {
						$('.popup-main1 ul li').eq(4).children().children().attr('class', 'info-unread4');

					} else {
						$('.popup-main1 ul li').eq(4).children().children().attr('class', '');
						$('.popup-main1 ul li').eq(4).children().children().children().children().text('');
					}

				} else {
					$('.popup-main1 ul li').children().children().attr('class', '');
					$('.popup-main1 ul li').children().children().children().children().text('');
					$('.popup-nav-ul li').eq(0).children('b').attr('class', '');
				}
			} else {
				assistantTipsFn(data.Msg);
			}
		})
	}


	// 个人日程
	//日程初始化参数
	//个人日程今明后转换
	$('.schedule-choose-day i').click(function () {
		$('.personal-schedule-ul1').hide();
		$('.personal-schedule-ul2').hide();
		$('.personal-schedule-ul3').hide();
		$('.schedule-choose-day i:eq(0)').css('background', 'url(' + PsnMgrLgAssistantAddr +
			'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_1.png)');
		$('.schedule-choose-day i:eq(1)').css('background', 'url(' + PsnMgrLgAssistantAddr +
			'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_3.png)');
		$('.schedule-choose-day i:eq(2)').css('background', 'url(' + PsnMgrLgAssistantAddr +
			'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_5.png)');
		$('.schedule-choose-day i').css('color', '#0e95ed');
		if ($(this).attr("name") == 1) {
			$(this).css('background', 'url(' + PsnMgrLgAssistantAddr +
				'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_2.png)');
			$(this).css('color', '#fff');
			$('.schedule-choose-date').text(serverTime.slice(0, 10));
			$('.schedule-choose-week').text(dataChangeTerm(termStartDate, $('.schedule-choose-date').text()));
			personalScheduleFn(serverTime.slice(0, 10));
			$('#lgAssistant-next2').text(serverTime.slice(0, 10));
		} else if ($(this).attr("name") == 2) {
			$(this).css('color', '#fff');
			$(this).css('background', 'url(' + PsnMgrLgAssistantAddr +
				'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_4.png)');
			$('.schedule-choose-date').text(dateChangeFn(serverTime.slice(0, 10), 1));
			$('.schedule-choose-week').text(dataChangeTerm(termStartDate, $('.schedule-choose-date').text()));
			personalScheduleFn(dateChangeFn(serverTime.slice(0, 10), 1));
			$('#lgAssistant-next2').text(dateChangeFn(serverTime.slice(0, 10), 1));
		} else if ($(this).attr("name") == 3) {
			$(this).css('color', '#fff');
			$(this).css('background', 'url(' + PsnMgrLgAssistantAddr +
				'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_6.png)');
			$('.schedule-choose-date').text(dateChangeFn(serverTime.slice(0, 10), 2));
			$('.schedule-choose-week').text(dataChangeTerm(termStartDate, $('.schedule-choose-date').text()));
			personalScheduleFn(dateChangeFn(serverTime.slice(0, 10), 2));
			$('#lgAssistant-next2').text(dateChangeFn(serverTime.slice(0, 10), 2));
		}
		// console.log($(this).attr("name"));
	});
	//跳转到我的课表
	$('.assistant-mySchedule').click(function () {
		var tabURL = PsnMgrMainServerAddr + 'html/schedule#/teacher/mine';
		window.open(tabURL, "_blank");
	});
	// 点击日程日期
	var next2LayKey = '';
	$(document).on('click', '#lgAssistant-next2', function () {
		setTimeout(function () {
			$('.laydate-prev-y').text(' ');
			$('.laydate-prev-m').text(' ');
			$('.laydate-next-y').text(' ');
			$('.laydate-next-m').text(' ');
			if (next2LayKey != $('#lgAssistant-next2').attr('lay-key')) {
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next2').attr('lay-key') +
					' .layui-laydate-main  .layui-laydate-content .laydate-day-mark::after',
					'background: #0099ff;top: 24px;color: #fff;right: 15px;');
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next2').attr('lay-key') +
					' .layui-laydate-main .layui-laydate-content  table tbody .laydate-disabled, ' + '#layui-laydate' + $(
						'#lgAssistant-next2').attr('lay-key') +
					' .layui-laydate .layui-laydate-content  table tbody .laydate-disabled:hover ',
					'background-position: 0 0!important;color: #d2d2d2!important;cursor: not-allowed!important;background-color:#fff!important;'
				);
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next2').attr('lay-key') +
					' .layui-laydate-main .layui-laydate-content   .laydate-disabled, ' + '#layui-laydate' + $(
						'#lgAssistant-next2').attr('lay-key') + ' .layui-laydate .layui-laydate-content   .laydate-disabled:hover ',
					'background-position: 0 0!important;color: #d2d2d2!important;cursor: not-allowed!important;background-color:#fff!important;'
				);
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next2').attr('lay-key') +
					' .layui-laydate-main  .layui-laydate-content table .layui-this ',
					'background-color:#0099ff !important;;border-radius: 10px;width: 30px;height: 20px;display: inline-block;margin: 5px 0 0 3px;line-height: 20px;'
				);
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next2').attr('lay-key') +
					' .layui-laydate-main .layui-laydate-content table .layui-this .laydate-day-mark',
					'color: #fff;');
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next2').attr('lay-key') +
					' .layui-laydate-main .layui-laydate-content  .laydate-day-mark',
					'position: static; line-height: 20px;font-size:14px;');
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next2').attr('lay-key') +
					' .laydate-footer-btns span', 'background-color: #0099ff;color: #fff; border-radius: 4px;');
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next2').attr('lay-key') +
					' .laydate-footer-btns span:hover', 'background-color: rgba(0, 153, 255,0.9);color: #fff;');
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next2').attr('lay-key') +
					' .layui-laydate-content td:hover .laydate-day-mark', ' color: #fff;');
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next2').attr('lay-key') +
					' .layui-laydate-content td:hover', 'background-color: #0099ff; color: #fff;');
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next2').attr('lay-key') +
					' .laydate-set-ym span, .layui-laydate-header i', 'color: #0099ff;');
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next2').attr('lay-key') +
					' .laydate-set-ym span:hover', 'color: #ff6600;');
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next2').attr('lay-key') +
					' .layui-this', 'background-color: #0099ff!important;');



				next2LayKey = $('#lgAssistant-next2').attr('lay-key');


			}

			$('#layui-laydate' + $('#lgAssistant-next2').attr('lay-key') +
				' .layui-laydate-main  .layui-laydate-content td ').css({
				padding: ' 0px',
			});

		}, 5)
	})
	var next3LayKey = '';
	$('.schedule-setting-date').click(function () {
		setTimeout(function () {
			$('.laydate-prev-y').text(' ');
			$('.laydate-prev-m').text(' ');
			$('.laydate-next-y').text(' ');
			$('.laydate-next-m').text(' ');

			if (!next3LayKey) {
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next3').attr('lay-key') +
					' .layui-laydate-main  .layui-laydate-content table .layui-this ',
					'background-color:#0099ff !important;;border-radius: 10px;width: 30px;height: 20px;display: inline-block;margin: 5px 0 0 3px;line-height: 20px;'
				);
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next3').attr('lay-key') +
					' .layui-laydate-main .layui-laydate-content  table tbody .laydate-disabled, ' + '#layui-laydate' + $(
						'#lgAssistant-next3').attr('lay-key') +
					' .layui-laydate .layui-laydate-content  table tbody .laydate-disabled:hover ',
					'background-position: 0 0!important;color: #d2d2d2!important;cursor: not-allowed!important;background-color:#fff!important;'
				);
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next3').attr('lay-key') +
					' .layui-laydate-main  .laydate-disabled, ' + '#layui-laydate' + $('#lgAssistant-next3').attr('lay-key') +
					' .layui-laydate .layui-laydate-content .laydate-disabled:hover ',
					'background-position: 0 0!important;color: #d2d2d2!important;cursor: not-allowed!important;background-color:#fff!important;'
				);
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next3').attr('lay-key') +
					' .laydate-footer-btns span', 'background-color: #0099ff;color: #fff; border-radius: 4px;');
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next3').attr('lay-key') +
					' .laydate-footer-btns span:hover', 'background-color: rgba(0, 153, 255,0.9);color: #fff;');
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next3').attr('lay-key') +
					' .layui-laydate-content td:hover', 'background-color: #0099ff; color: #fff;');
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next3').attr('lay-key') +
					' .laydate-set-ym span, .layui-laydate-header i', 'color: #0099ff;');
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next3').attr('lay-key') +
					' .laydate-set-ym span:hover', 'color: #ff6600;');
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next3').attr('lay-key') +
					' .layui-this', 'background-color: #0099ff!important;');


				next3LayKey = true;
			}
			$('#layui-laydate' + $('#lgAssistant-next3').attr('lay-key') +
				' .layui-laydate-main  .layui-laydate-content td ').css({
				padding: ' 0px',
			});
		}, 5)
	});

	var next3LayKey = '';
	$('.schedule-setting-date').click(function () {
		setTimeout(function () {
			$('.laydate-prev-y').text(' ');
			$('.laydate-prev-m').text(' ');
			$('.laydate-next-y').text(' ');
			$('.laydate-next-m').text(' ');

			if (!next3LayKey) {
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next3').attr('lay-key') +
					' .layui-laydate-main  .layui-laydate-content table .layui-this ',
					'background-color:#0099ff !important;;border-radius: 10px;width: 30px;height: 20px;display: inline-block;margin: 5px 0 0 3px;line-height: 20px;'
				);
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next3').attr('lay-key') +
					' .layui-laydate-main .layui-laydate-content  table tbody .laydate-disabled, ' + '#layui-laydate' + $(
						'#lgAssistant-next3').attr('lay-key') +
					' .layui-laydate .layui-laydate-content  table tbody .laydate-disabled:hover ',
					'background-position: 0 0!important;color: #d2d2d2!important;cursor: not-allowed!important;background-color:#fff!important;'
				);
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next3').attr('lay-key') +
					' .layui-laydate-main  .laydate-disabled, ' + '#layui-laydate' + $('#lgAssistant-next3').attr('lay-key') +
					' .layui-laydate .layui-laydate-content .laydate-disabled:hover ',
					'background-position: 0 0!important;color: #d2d2d2!important;cursor: not-allowed!important;background-color:#fff!important;'
				);
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next3').attr('lay-key') +
					' .laydate-footer-btns span', 'background-color: #0099ff;color: #fff; border-radius: 4px;');
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next3').attr('lay-key') +
					' .laydate-footer-btns span:hover', 'background-color: rgba(0, 153, 255,0.9);color: #fff;');
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next3').attr('lay-key') +
					' .layui-laydate-content td:hover', 'background-color: #0099ff; color: #fff;');
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next3').attr('lay-key') +
					' .laydate-set-ym span, .layui-laydate-header i', 'color: #0099ff;');
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next3').attr('lay-key') +
					' .laydate-set-ym span:hover', 'color: #ff6600;');
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next3').attr('lay-key') +
					' .layui-this', 'background-color: #0099ff!important;');
				next3LayKey = true;
			}
			$('#layui-laydate' + $('#lgAssistant-next3').attr('lay-key') +
				' .layui-laydate-main  .layui-laydate-content td ').css({
				padding: ' 0px',
			});
		}, 5)
	})
	var next4LayKey = '';
	$('#lgAssistant-next4').click(function () {
		setTimeout(function () {
			$('.laydate-prev-y').text(' ');
			$('.laydate-prev-m').text(' ');
			$('.laydate-next-y').text(' ');
			$('.laydate-next-m').text(' ');
			if (!next4LayKey) {
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next4').attr('lay-key') +
					' .layui-laydate-main  .layui-laydate-content table .layui-this ',
					'background-color:#0099ff !important;;border-radius: 10px;width: 30px;height: 20px;display: inline-block;margin: 5px 0 0 3px;line-height: 20px;'
				);
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next4').attr('lay-key') +
					' .layui-laydate-main .layui-laydate-content  table tbody .laydate-disabled, ' + '#layui-laydate' + $(
						'#lgAssistant-next4').attr('lay-key') +
					' .layui-laydate .layui-laydate-content  table tbody .laydate-disabled:hover ',
					'background-position: 0 0!important;color: #d2d2d2!important;cursor: not-allowed!important; background-color:#fff!important;'
				);
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next4').attr('lay-key') +
					' .layui-laydate-main .layui-laydate-content  .laydate-disabled, ' + '#layui-laydate' + $(
						'#lgAssistant-next4').attr('lay-key') + ' .layui-laydate .layui-laydate-content  .laydate-disabled:hover ',
					'background-position: 0 0!important;color: #d2d2d2!important;cursor: not-allowed!important; background-color:#fff!important;'
				);
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next4').attr('lay-key') +
					' .laydate-footer-btns span', 'background-color: #0099ff;color: #fff; border-radius: 4px;');
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next4').attr('lay-key') +
					' .laydate-footer-btns span:hover', 'background-color: rgba(0, 153, 255,0.9);color: #fff;');
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next4').attr('lay-key') +
					' .layui-laydate-content td:hover', 'background-color: #0099ff; color: #fff;');
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next4').attr('lay-key') +
					' .laydate-set-ym span, .layui-laydate-header i', 'color: #0099ff;');
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next4').attr('lay-key') +
					' .laydate-set-ym span:hover', 'color: #ff6600;');
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next4').attr('lay-key') +
					' .layui-this', 'background-color: #0099ff!important;');
				next4LayKey = true;
			}
			$('#layui-laydate' + $('#lgAssistant-next4').attr('lay-key') +
				' .layui-laydate-main  .layui-laydate-content td ').css({
				padding: ' 0px',
			});
		}, 5)
	})

	var next5LayKey = '';
	$('#lgAssistant-next5').click(function () {
		setTimeout(function () {
			$('.laydate-prev-y').text(' ');
			$('.laydate-prev-m').text(' ');
			$('.laydate-next-y').text(' ');
			$('.laydate-next-m').text(' ');
			if (!next5LayKey) {
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next5').attr('lay-key') +
					' .layui-laydate-main  .layui-laydate-content table .layui-this ',
					'background-color:#0099ff !important;;border-radius: 10px;width: 30px;height: 20px;display: inline-block;margin: 5px 0 0 3px;line-height: 20px;'
				);
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next5').attr('lay-key') +
					' .layui-laydate-main  .layui-laydate-content  table tbody .laydate-disabled, ' + '#layui-laydate' + $(
						'#lgAssistant-next5').attr('lay-key') +
					' .layui-laydate .layui-laydate-content  table tbody .laydate-disabled:hover ',
					'background-position: 0 0!important;color: #d2d2d2!important;cursor: not-allowed!important;background-color:#fff!important;'
				);
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next5').attr('lay-key') +
					' .layui-laydate-main  .layui-laydate-content  .laydate-disabled, ' + '#layui-laydate' + $(
						'#lgAssistant-next5').attr('lay-key') + ' .layui-laydate .layui-laydate-content  .laydate-disabled:hover ',
					'background-position: 0 0!important;color: #d2d2d2!important;cursor: not-allowed!important;background-color:#fff!important;'
				);
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next5').attr('lay-key') +
					' .laydate-footer-btns span', 'background-color: #0099ff;color: #fff; border-radius: 4px;');
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next5').attr('lay-key') +
					' .laydate-footer-btns span:hover', 'background-color: #ff6600;color: #fff;');

				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next5').attr('lay-key') +
					' .layui-laydate-content td:hover', 'background-color: #0099ff; color: #fff;');
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next5').attr('lay-key') +
					' .laydate-set-ym span, .layui-laydate-header i', 'color: #0099ff;');
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next5').attr('lay-key') +
					' .laydate-set-ym span:hover', 'color: #ff6600;');
				document.styleSheets[0].addRule('#layui-laydate' + $('#lgAssistant-next5').attr('lay-key') +
					' .layui-this', 'background-color: #0099ff!important;');


				next5LayKey = true;
			}
			$('#layui-laydate' + $('#lgAssistant-next5').attr('lay-key') +
				' .layui-laydate-main  .layui-laydate-content td ').css({
				padding: ' 0px',
			});

		}, 5)
	})



	var text1LayKey = '';

	$('#schedule-test1').click(function () {
		if (!text1LayKey) {
			setTimeout(function () {
				document.styleSheets[0].addRule('#layui-laydate' + $('#schedule-test1').attr('lay-key') +
					' .laydate-footer-btns span', 'background-color: #0099ff;color: #fff; border-radius: 4px;');
				document.styleSheets[0].addRule('#layui-laydate' + $('#schedule-test1').attr('lay-key') +
					' .laydate-footer-btns ', 'top: 3px;');
				text1LayKey = true;
			}, 5)
		}
		$('#layui-laydate' + $('#schedule-test1').attr('lay-key') +
			' .layui-this').css('cssText', 'background-color: #fff!important;color: #333!important;');


		$('.layui-laydate-list').click(function (e) {


			$('#schedule-test1').val($('.layui-this').text().slice(-6, -4) + '时' + $('.layui-this').text().slice(-4, -2) +
				'分');
			var $e = $(e.target);
			$e.siblings().css('cssText', 'color:#333; background-color:#fff;');
			$e.siblings().attr('data-name', '');
			$e.css('cssText', ' background-color:#0099ff!important;color:#fff!important;');
			$e.attr('data-name', '666');
			var layThis = 0;
			for (var i = 0; i < 4; i++) {
				if ($('#layui-laydate' + $('#schedule-test1').attr('lay-key') +
						' .layui-this').eq(i).attr('data-name') == '666') {
					layThis++;
				}
			}
			if (layThis == 2) {
				$('#layui-laydate' + $('#schedule-test1').attr('lay-key')).remove();
			}
		})

		$(this).blur();

	});
	$('#schedule-test1').focus(function () {
		$('#layui-laydate' + $('#schedule-test1').attr('lay-key') +
			' .layui-this').css('cssText', 'background-color: #fff!important;color: #333!important;');
		$('.layui-laydate-list').click(function (e) {
			$('#schedule-test1').val($('.layui-this').text().slice(-6, -4) + '时' + $('.layui-this').text().slice(-4, -2) +
				'分');
			var $e = $(e.target);
			$e.siblings().css('cssText', 'color:#333; background-color:#fff;');
			$e.siblings().attr('data-name', '');
			$e.css('cssText', ' background-color:#0099ff!important;color:#fff!important;');
			$e.attr('data-name', '666');
			var layThis = 0;
			for (var i = 0; i < 4; i++) {
				if ($('#layui-laydate' + $('#schedule-test1').attr('lay-key') +
						' .layui-this').eq(i).attr('data-name') == '666') {
					layThis++;
				}
			}
			if (layThis == 2) {
				$('#layui-laydate' + $('#schedule-test1').attr('lay-key')).remove();
			}
		})
		$(this).blur();

	});
	var text2LayKey = '';
	$('#schedule-test2').click(function () {
		if (!text2LayKey) {
			setTimeout(function () {
				document.styleSheets[0].addRule('#layui-laydate' + $('#schedule-test2').attr('lay-key') +
					' .laydate-footer-btns span', 'background-color: #0099ff;color: #fff; border-radius: 4px;');
				document.styleSheets[0].addRule('#layui-laydate' + $('#schedule-test2').attr('lay-key') +
					' .laydate-footer-btns ', 'top: 3px;');
				text2LayKey = true;
			}, 5)
		}
		$('#layui-laydate' + $('#schedule-test2').attr('lay-key') +
			' .layui-this').css('cssText', 'background-color: #fff!important;color: #333!important;');
		if (!$('#schedule-test2').val()) {
			$('#schedule-test2').val($('#schedule-test1').val());
		}

		$('.layui-laydate-list').click(function (e) {
			$('.assistant-tips').hide();
			$('#schedule-test2').val($('.layui-this').text().slice(-6, -4) + '时' + $('.layui-this').text().slice(-4, -2) +
				'分');
			var $e = $(e.target);
			$e.siblings().css('cssText', 'color:#333; background-color:#fff;');
			$e.siblings().attr('data-name', '');
			$e.css('cssText', ' background-color:#0099ff!important;color:#fff!important;');
			$e.attr('data-name', '666');
			var layThis = 0;
			if ($('#schedule-test1').val() && $('#schedule-test2').val()) {
				if ($('#schedule-test2').val().slice(0, 2) < $('#schedule-test1').val().slice(0, 2) || ($('#schedule-test2').val()
						.slice(0, 2) == $('#schedule-test1').val().slice(0, 2) && $('#schedule-test2').val().slice(3, 5) < $(
							'#schedule-test1').val().slice(3, 5))) {
					assistantTipsFn('结束时间不能小于开始时间~', 1);

					return;
				}
			}

			for (var i = 0; i < 4; i++) {
				if ($('#layui-laydate' + $('#schedule-test2').attr('lay-key') +
						' .layui-this').eq(i).attr('data-name') == '666') {
					layThis++;
				}
			}
			if (layThis == 2) {
				$('#layui-laydate' + $('#schedule-test2').attr('lay-key')).remove();
			}



		})
		$(this).blur();
	});

	$('#schedule-test2').focus(function () {
		if (!$('#schedule-test2').val()) {
			$('#schedule-test2').val($('#schedule-test1').val());
		}
		$('#layui-laydate' + $('#schedule-test2').attr('lay-key') +
			' .layui-this').css('cssText', 'background-color: #fff!important;color: #333!important;');
		$('.layui-laydate-list').click(function (e) {
			$('.assistant-tips').hide();
			$('#schedule-test2').val($('.layui-this').text().slice(-6, -4) + '时' + $('.layui-this').text().slice(-4, -2) +
				'分');
			var $e = $(e.target);
			$e.siblings().css('cssText', 'color:#333; background-color:#fff;');
			$e.siblings().attr('data-name', '');
			$e.css('cssText', ' background-color:#0099ff!important;color:#fff!important;');
			$e.attr('data-name', '666');
			var layThis = 0;
			if ($('#schedule-test1').val() && $('#schedule-test2').val()) {
				if ($('#schedule-test2').val().slice(0, 2) < $('#schedule-test1').val().slice(0, 2) || ($('#schedule-test2').val()
						.slice(0, 2) == $('#schedule-test1').val().slice(0, 2) && $('#schedule-test2').val().slice(3, 5) < $(
							'#schedule-test1').val().slice(3, 5))) {
					assistantTipsFn('结束时间不能小于开始时间~', 1);

					return;
				}
			}

			for (var i = 0; i < 4; i++) {
				if ($('#layui-laydate' + $('#schedule-test2').attr('lay-key') +
						' .layui-this').eq(i).attr('data-name') == '666') {
					layThis++;
				}
			}
			if (layThis == 2) {
				$('#layui-laydate' + $('#schedule-test2').attr('lay-key')).remove();
			}
		})

		$(this).blur();
	});

	//打开新建日程的弹窗
	$('.new-schedule').click(function () {

		$('.schedule-edit-popup').hide();
		$('.schedule-type-name').show();
		$('.schedule-edit-name').text('自定义');
		$('.schedule-type-name').val('');
		$('.schedule-type  i').attr('class', '');
		$('.schedule-type i').eq(2).attr('class', 'schedule-type-true');
		$('.schedule-setting-popup').show();
		$('.schedule-clocks-time').val(30);
		$('.schedule-clocks-setting1').children('i').attr('class', '');
		$('.schedule-clocks-setting1').eq(1).children('i').attr('class', 'schedule-input-clocks');
		nowDate = new Date();
		nowHours = conver(nowDate.getHours());
		nowinutes = conver(nowDate.getMinutes());
		date1 = nowHours + '时' + nowinutes + '分';
		$('#schedule-test1').val(date1);
		$('#schedule-test2').val('');
		if (Date.parse($('.schedule-choose-date').text()) - Date.parse(getDate('03')) < 0) {
			$('#lgAssistant-next3').val(serverTime.slice(0, 10));
		} else {
			$('#lgAssistant-next3').val($('.schedule-choose-date').text());
		}

		$('.schedule-topic').val('请输入日程内容...');
		$('.schedule-topic').css('color', '#999');
		$('.schedule-setting-popup div').eq(1).animate({
			right: '0'
		}, 'slow', function () {
			$('.schedule-setting-popup div').eq(0).show();
		});
		$('.schedule-change-type').text('新建日程');
		$('.schedule-topic-length').text('0/50');
	});
	//关闭新建日程的弹窗
	$('.schedule-setting-close').click(function () {
		$('.schedule-message').attr('class', '');
		$('.schedule-setting-popup div').eq(0).hide();
		$('.schedule-setting-popup div').eq(1).animate({
			right: '-680px'
		}, 'slow', function () {
			if ($('.schedule-setting-true').attr('name') != '22' && $('.schedule-setting-true').attr('name') != '11') {

				personalScheduleFn($('.schedule-choose-date').text());
			} else {

				$('.schedule-setting-true').attr('name', '');
			}
			$(".schedule-setting-popup").hide();
		});
	});
	var scheduleCloseTimer = ''; //防止多次点击
	var isscheduleClose = true; //编辑日程是否关闭
	$('.schedule-setting-popup div').eq(0).click(function () {
		$('.schedule-message').attr('class', '');
		if (isscheduleClose == true) {
			$('.schedule-setting-popup div').eq(0).hide();
			$('.schedule-setting-popup div').eq(1).animate({
				right: '-680px'
			}, 'slow', function () {
				if ($('.schedule-setting-true').attr('name') != '22' && $('.schedule-setting-true').attr('name') != '11') {
					personalScheduleFn($('.schedule-choose-date').text());
				} else {
					$('.schedule-setting-true').attr('name', '');
				}
				$(".schedule-setting-popup").hide();
			});
			isscheduleClose = false;
			scheduleCloseTimer = setTimeout(function () {
				isscheduleClose = true;
				clearTimeout(scheduleCloseTimer);
			}, 1000)
		}

	});


	//获取新建日程时间layui方法
	var nowDate = new Date();
	var nowHours = conver(nowDate.getHours());
	var nowinutes = conver(nowDate.getMinutes());
	layui.use('laydate', function () {
		var laydate = layui.laydate;
		var date1 = nowHours + '时' + nowinutes + '分';
		laydate.render({
			elem: '#schedule-test1',
			type: 'time',
			format: 'HH时mm分',
			btns: ['confirm'],
			showBottom: false,
			position: 'fixed',
			value: date1,
			done: function (value, date, endDate) {
				// console.log(value); //得到日期生成的值，如：2017-08-18
				// console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
				// console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
			}
		});
	});
	layui.use('laydate', function () {
		var laydate = layui.laydate;
		laydate.render({
			elem: '#schedule-test2',
			type: 'time',
			format: 'HH时mm分',
			btns: ['confirm'],
			showBottom: false,
			// showBottom: false,
			position: 'fixed',
			done: function (value, date, endDate) {
				// console.log(value);
				// console.log(value); //得到日期生成的值，如：2017-08-18
				// console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
				// console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
			}
		});
	});





	//选择日程类型
	$('.schedule-type i').click(function () {
		$('.schedule-type i').attr('class', '');
		$(this).attr('class', 'schedule-type-true');
	});
	$('.schedule-type b').click(function () {
		$('.schedule-type i').attr('class', '');
		$(this).prev().attr('class', 'schedule-type-true');
	});
	//输入框点击选择日程类型
	$('.schedule-type input').click(function () {
		$('.schedule-type i').attr('class', '');
		$(this).prev().prev().attr('class', 'schedule-type-true');
	});
	//textarea默认值
	$('.schedule-topic').val('请输入日程内容...');
	$('.schedule-topic').focus(function () {
		if ($(this).val() == '请输入日程内容...') {
			$(this).val('');
			$(this).css('color', '#333');
		}
		$(this).css('border', 'solid 1px #5897ed');
	});
	$('.schedule-type-name').focus(function () {
		$(this).css('border', 'solid 1px #5897ed');
	});
	$('.schedule-type-name').blur(function () {
		$(this).css('border', 'solid 1px #bac7d9');
	});
	$('.schedule-clocks-time').focus(function () {
		$(this).css('border', 'solid 1px #5897ed');
	});
	$('.schedule-clocks-time').blur(function () {
		$(this).css('border', 'solid 1px #bac7d9');
	});

	$('.schedule-topic').keyup(function () {
		var num = $(this).val().length;
		$('.schedule-topic-length').text(num + '/50');
		$('.schedule-topic').css('color', '#333');
	})
	$('.schedule-topic').blur(function () {
		if (!$(this).val()) {
			$(this).val('请输入日程内容...');
			$(this).css('color', '#999');

		} else {
			$('.schedule-topic').css('color', '#333');
		}
		$(this).css('border', 'solid 1px #bac7d9');
	});

	$('.schedule-clocks-time').blur(function () {
		if ($('.schedule-clocks-time').val() < 1) {
			$('.schedule-clocks-time').val(1);
		}
		if ($('.schedule-clocks-time').val() > 999) {
			$('.schedule-clocks-time').val(999);
		}
	});
	$('.schedule-clocks-time').keyup(function () {
		if ($('.schedule-clocks-time').val() < 1) {
			$('.schedule-clocks-time').val(1);
		}
		if ($('.schedule-clocks-time').val() > 999) {
			$('.schedule-clocks-time').val(999);
		}
	});
	//设置是否开启入场提醒闹钟
	$('.schedule-setting-clock p span').eq(0).click(function () {
		if ($('.schedule-clocks-setting ').attr('name') == 'true') {
			$('.schedule-clocks-setting ').css('background', 'url(' + PsnMgrLgAssistantAddr +
				'/PsnMgr/LgAssistant/images/复选_1.png) no-repeat');
			$('.schedule-clocks-setting ').attr('name', 'false');
			$('.schedule-clocks-setting1').css('display', 'none')
		} else {
			$('.schedule-clocks-setting ').css('background', 'url(' + PsnMgrLgAssistantAddr +
				'/PsnMgr/LgAssistant/images/复选_2.png) no-repeat');
			$('.schedule-clocks-setting ').attr('name', 'true');
			$('.schedule-clocks-setting1').css('display', 'block');
		}
	})
	$('.schedule-clocks-setting ').click(function (event) {
		if ($(this).attr('name') == 'true') {
			$(this).css('background', 'url(' + PsnMgrLgAssistantAddr + '/PsnMgr/LgAssistant/images/复选_1.png) no-repeat');
			$(this).attr('name', 'false');
			$('.schedule-clocks-setting1').css('display', 'none');
		} else {
			$(this).css('background', 'url(' + PsnMgrLgAssistantAddr + '/PsnMgr/LgAssistant/images/复选_2.png) no-repeat');
			$(this).attr('name', 'true');
			$('.schedule-clocks-setting1').css('display', 'block');
		}
		event.stopPropagation();

	});
	//设置闹钟提醒时间
	$('.schedule-clocks-setting1 i').click(function () {
		$('.schedule-clocks-setting1 i').attr('class', '');
		$(this).attr('class', 'schedule-input-clocks');
	});
	$('.schedule-setting-clock p ').eq(1).click(function () {
		$('.schedule-clocks-setting1 i').eq(1).attr('class', '');
		$('.schedule-clocks-setting1 i').eq(0).attr('class', 'schedule-input-clocks');
	})
	$('.schedule-setting-clock p ').eq(2).click(function () {
		$('.schedule-clocks-setting1 i').eq(0).attr('class', '');
		$('.schedule-clocks-setting1 i').eq(1).attr('class', 'schedule-input-clocks');
	})
	//输入框点击获取选项
	$('.schedule-clocks-setting1 input').click(function () {
		$('.schedule-clocks-setting1 i').eq(0).attr('class', '');
		$('.schedule-clocks-setting1 i').eq(1).attr('class', 'schedule-input-clocks');
	});
	//确定添加日程
	$(".schedule-setting-true").click(function () {
		// console.log($('.schedule-change-type').text());
		if ($('.schedule-change-type').text() == '新建日程') {
			scheduleChangeFn(1);
		} else {
			scheduleChangeFn(0);
		}
	});
	//取消添加日程
	$(".schedule-setting-false").click(function () {
		$('.schedule-message').attr('class', '');
		$('.schedule-setting-popup div').eq(0).hide();
		$('.schedule-setting-popup div').eq(1).animate({
			right: '-680px'
		}, 'slow', function () {
			$(".schedule-setting-popup").hide();
		});
	});

	// 学情总结模块
	var summaryTable0info = ''; //保存班级考勤情况信息
	var summaryTableSelect1 = 1; //个人上课考试考勤Select选择
	var summaryTable1info = ''; //保存个人上课考试考勤信息用于Select选择后，请求数据
	var summaryTableSelect2 = 0; //个人作业情况Select1选择
	var summaryTableSelect3 = 0; //个人作业情况Select2选择
	var summaryTable2info = ''; //保存个人作业情况信息用于Select选择后，请求数据
	var summaryTableSelect4 = 0; //个人课外计划Select1选择
	var summaryTable3info = ''; //保存个人课外计划信息用于Select选择后，请求数据

	//学情总结时间选择
	$('.summary-choose-time li').click(function () {
		$('.summary-choose-time li').attr('class', '');
		$(this).attr('class', 'summary-time-active');
		if ($(this).attr('name') == 1) {
			summaryStartTime = dateChangeFn(serverTime.slice(0, 10), -6); //近一周
			summaryTableFn();
		}
		if ($(this).attr('name') == 2) {
			summaryStartTime = dateChangeFn(serverTime.slice(0, 10), -29); //近一个月
			summaryTableFn();
		}
		if ($(this).attr('name') == 3) {
			//本学期
			summaryStartTime = termStartDate; //学情总结开始时间
			summaryEndTime = termEndDate; //学情总结结束时间
			summaryTableFn();
		}
	})
	//学情总结时间选择的指定时间选择
	$('.summary-input-time span').click(function () {
		if ($('#lgAssistant-next4').val()) {
			if ($('#lgAssistant-next5').val()) {
				if (Date.parse($('#lgAssistant-next4').val()) > Date.parse($('#lgAssistant-next5').val())) {
					assistantTipsFn('开始时间不能大于结束时间');
				} else {
					summaryStartTime = $('#lgAssistant-next4').val(); //学情总结开始时间
					summaryEndTime = $('#lgAssistant-next5').val(); //学情总结结束时间
					summaryTableFn();
				}
			} else {
				normal('#lgAssistant-next5', 3);
			}
		} else {
			normal('#lgAssistant-next4', 3);
		}
	});

	//学情总结第一层弹窗班级学情
	$('.summary-table').on('click',
		'.summary-more',
		function () {
			summaryTable0info = $(this);
			summaryTable0Fn(summaryTable0info, 0,1);
			summaryCacheData.push(1);
		}
	);
	//学情总结关闭弹窗
	$('.summary-popup-close').click(function () {
		summaryCacheData.pop();
		var $this = $(this);
		$(this).parent().parent().animate({
			left: '850px'
		}, 'slow', function () {
			if ($this.attr('name') == 1) {
				summaryTableFn();
			} else {
				summaryTable0Fn(summaryTable0info,$('.summary-popup0-class').attr('data-page')*1);
			}
			$this.parent().parent().parent().hide();
		});
	});
	//学情总结的点击阴影关闭弹窗
	$('.summary-popup-shade').click(function () {
		summaryCacheData.pop();
		var $this = $(this);
		$(this).next().animate({
			left: '850px'
		}, 'slow', function () {
			if ($this.attr('name') == 1) {
				summaryTableFn();
			} else {
				summaryTable0Fn(summaryTable0info, $('.summary-popup0-class').attr('data-page')*1);
			}
			$this.parent().hide();
		});
	});
	//学情总结打开个人上课/考试考勤情况
	$('.popup-main3').on('click',
		'.summary-open-table1',
		function () {
			summaryTable1info = $(this);
			summaryTableSelect1 = 1;
			$('.summary-popup1-name').text($(this).attr('data-name'));
			$('.assistant-select-span1 p').text('全部');
			$('.assistant-select-span1').attr('name', '1');
			// $('.summary-popup1-main select').val('1');
			summaryTable1Fn(summaryTable1info, 0);
			summaryCacheData[1] = 1;

		});
	//学情总结打开个人作业情况
	$('.popup-main3').on('click',
		'.summary-open-table2',
		function () {
			summaryTable2info = $(this);
			summaryTableSelect2 = 0;
			summaryTableSelect3 = 0;
			$('.summary-popup2-name').text($(this).attr('data-name'));
			$('.assistant-select-span21 p').text('全部作业');
			$('.assistant-select-span21').attr('name', '0');
			$('.assistant-select-span22 p').text('全部');
			$('.assistant-select-span22').attr('name', '0');
			// $('.summary-popup2-main select').val('0');
			summaryTable2Fn(summaryTable2info, 0);
			summaryCacheData[1] = 2;

		});
	//学情总结打开个人课外计划情况
	$('.popup-main3').on('click',
		'.summary-open-table3',
		function () {
			summaryTable3info = $(this);
			summaryTableSelect4 = 0;
			$('.summary-popup3-name').text($(this).attr('data-name'));
			$('.assistant-select-span3 p').text('全部');
			$('.assistant-select-span3').attr('name', '0');
			// $('.summary-popup3-main select').val('0');
			summaryTable3Fn(summaryTable3info, 0);
			summaryCacheData[1] = 3;
		});
	//学情总结个人上课/考勤情况select选择
	// $('.summary-popup1-main select').change(function() {
	// 	if (summaryTableSelect1 != $(this).val()) {
	// 		summaryTableSelect1 = $(this).val();
	// 		summaryTable1Fn(summaryTable1info, 0);
	// 		summaryCacheData[1] = 1;
	// 	}
	// });
	$('.summary-popup1-main .assistant-select-span1 .assistant-select-ul li').click(function () {
		if ($(this).attr('name') != $('.assistant-select-span1').attr('name')) {
			$('.assistant-select-span1 p').text($(this).text());
			$('.assistant-select-span1').attr('name', $(this).attr('name'));
			summaryTableSelect1 = $(this).attr('name');
			summaryTable1Fn(summaryTable1info, 0);
			summaryCacheData[1] = 1;
		}
		$('.assistant-select-ul').hide();
	})
	//学情总结个人作业情况select选择
	// 	$('.summary-popup2-select1').change(function() {
	// 
	// 		if (summaryTableSelect2 != $(this).val()) {
	// 			summaryTableSelect2 = $(this).val();
	// 			summaryTable2Fn(summaryTable2info, 0);
	// 			summaryCacheData[1] = 2;
	// 		}
	// 	});
	$('.assistant-select-span').hover(function () {
		$(this).children('.assistant-select-ul').show();

	}, function () {
		$(this).children('.assistant-select-ul').hide();
	})
	$('.assistant-select-span21 .assistant-select-ul li').click(function () {
		if ($(this).attr('name') != $('.assistant-select-span21').attr('name')) {
			$('.assistant-select-span21 p').text($(this).text());
			$('.assistant-select-span21').attr('name', $(this).attr('name'));
			summaryTableSelect2 = $(this).attr('name');
			summaryTable2Fn(summaryTable2info, 0);
			summaryCacheData[1] = 2;
		}
		$('.assistant-select-ul').hide();
	})
	$('.assistant-select-span22 .assistant-select-ul li').click(function () {
		if ($(this).attr('name') != $('.assistant-select-span22').attr('name')) {
			$('.assistant-select-span22 p').text($(this).text());
			$('.assistant-select-span22').attr('name', $(this).attr('name'));
			summaryTableSelect3 = $(this).attr('name');
			summaryTable2Fn(summaryTable2info, 0);
			summaryCacheData[1] = 2;
		}
		$('.assistant-select-ul').hide();
	})
	//学情总结个人作业情况select选择
	// $('.summary-popup2-select2').change(function() {
	// 	console.log($(this).val())
	// 	if (summaryTableSelect3 != $(this).val()) {
	// 		summaryTableSelect3 = $(this).val();
	// 		summaryTable2Fn(summaryTable2info, 0);
	// 		summaryCacheData[1] = 2;
	// 	}
	// });
	//学情总结个人课外情况select选择
	// $('.summary-popup3-select').change(function() {
	// 	console.log($(this).val())
	// 	if (summaryTableSelect4 != $(this).val()) {
	// 		summaryTableSelect4 = $(this).val();
	// 		summaryTable3Fn(summaryTable3info, 0);
	// 		summaryCacheData[1] = 3;
	// 	}
	// });
	$('.assistant-select-span3 .assistant-select-ul li').click(function () {
		if ($(this).attr('name') != $('.assistant-select-span3').attr('name')) {
			$('.assistant-select-span3 p').text($(this).text());
			$('.assistant-select-span3').attr('name', $(this).attr('name'));
			summaryTableSelect4 = $(this).attr('name');
			summaryTable3Fn(summaryTable3info, 0);
			summaryCacheData[1] = 3;
		}
		$('.assistant-select-ul').hide();
	})

	// 	//学情总结个人作业详情跳转
	// 	$('.popup-main3').on('click',
	// 		'.summary-table3-go',
	// 		function() {
	// 			var tabURL = summaryURL + $(this).attr('data-url');
	// 			window.open(tabURL, "_blank");
	// 		});
	// 	//学情总结个人课外详情跳转
	// 	$('.popup-main3').on('click',
	// 		'.summary-table4-go',
	// 		function() {
	// 			var tabURL = summaryURL + $(this).attr('data-url');
	// 			window.open(tabURL, "_blank");
	// 		});
	// 
	// 	//点击成绩面板跳转
	$('.popup-main3').on('click',
		'.summary-grade-class',
		function () {
			var $this = $(this);
			getSysWeb('810', function (data) {
				var tabURL = data + $this.attr('data-url');

				window.open(tabURL, "_blank");
			})

		});

	//学情总结改变科目动态生成教学班的学情
	$('.assistant-select-span66 .assistant-select-ul li').click(function () {
		if ($(this).attr('name') != $('.assistant-select-span66').attr('name')) {
			$('.assistant-select-span66 p').text($(this).text());
			$('.assistant-select-span66').attr('name', $(this).attr('name'));
			summaryTableFn( $(this).attr('name'));
		}
		$('.assistant-select-ul').hide();
	})
	
	$('.summary-title p  span').click(function () {
		getSysWeb('810', function (data) {
			window.open(data + '/cjzp/index', "_blank");
		})

	})
	//学情总结所有班级表动态生成
	function summaryTableFn(SubjectID1) {
		if(!SubjectID1){
			SubjectID1=SubjectID;
		}
		summaryStartTime = summaryStartTime.slice(0, 10) + ' 00:00:00';
		summaryEndTime = summaryEndTime.slice(0, 10) + ' 00:00:00';
		$('.assistant-empty1').hide();
		ajaxM('api/Share/GetRateByTime_Teacher_XGJ', 'get', {
			URL: summaryURL,
			TeacherGH: UserID,
			SchoolID: SchoolID,
			SubjectID: SubjectID1,
			StartTime: summaryStartTime,
			EndTime: summaryEndTime,
		}, function (data) {
			if (data.InfoList.ClassList) {
			} else {
				$('.assistant-empty1').show();
				$('.summary-table').hide();
				return;
			}
			var InfoList = data.InfoList.ClassList;
			$('.summary-table-append').remove();
			if (InfoList.length == 0) {
				$('.assistant-empty1').show();
				$('.summary-table').hide();
				return;
			}
			$('.assistant-empty1').hide();
			$('.summary-table').show();
			InfoList.map(function (item) {
				if (item.LessonAndExamRate >= 0.9) {
					var class1 = 'green';
				} else if (item.LessonAndExamRate >= 0.6) {
					var class1 = 'orange';

				} else {
					var class1 = 'red';
				}
				if (item.HomeworkRate >= 0.9) {
					var class2 = 'green';
				} else if (item.HomeworkRate >= 0.6) {
					var class2 = 'orange';

				} else {
					var class2 = 'red';
				}
				if (item.SelfPlanRate >= 0.9) {
					var class3 = 'green';
				} else if (item.SelfPlanRate >= 0.6) {
					var class3 = 'orange';

				} else {
					var class3 = 'red';
				}
				$('.summary-table tbody').append($('<tr class="summary-table-append" ><td>' + item.ClassName +
					'</td><td><span class=' + class1 + ' >' +
					((item.LessonAndExamRate *
						100).toFixed(2)) * 1 + '% </span>（' + item.LessonAndExamAttendence + '/' +
					item.LessonAndExamTotal + '次）</td><td><span  class=' + class2 + ' >' + ((item.HomeworkRate * 100).toFixed(2)) *
					1 +
					'%</span>（' + item.HomeworkComplete + '/' + item.HomeworkTotal + '次）</td><td><span  class=' + class3 +
					'>' + ((item.SelfPlanRate * 100).toFixed(2)) * 1 + '%</span>（' + item.SelfPlanComplete + '/' + item.SelfPlanTotal +
					'次）</td><td class="summary-more" data-classid= ' + item.ClassID + ' data-ClassType= ' + item.ClassType +
					' ><i></i></td></tr>'));
			})
		}, function (error) {
			$('.assistant-empty1').show();
			$('.summary-table').hide();
			return;

		})
	}
	var table1TotalCount = 0;
	//学情总结每个班级表动态生成
	function summaryTable0Fn($this, page,state) {
		
		summaryStartTime = summaryStartTime.slice(0, 10) + ' 00:00:00';
		summaryEndTime = summaryEndTime.slice(0, 10) + ' 00:00:00';
		$('.assistant-empty3').hide();
		ajaxM('api/Share/GetRateByTime_ClassAllStudent_XGJ', 'get', {
			URL: summaryURL,
			SubjectID: SubjectID,
			SchoolID: SchoolID,
			ClassType: $this.attr('data-classtype'),
			StartTime: summaryStartTime,
			EndTime: summaryEndTime,
			ClassID: $this.attr('data-classid'),
			PageIndex: page + 1,
			PageSize: 10,
		}, function (data) {
			$('.summary-pager1').remove();
			var InfoList = data.InfoList;
			$('.summary-popup0-class').text(InfoList.ClassName);
			var ClassID = InfoList.ClassID;
			var ClassType = InfoList.ClassType;
			table1TotalCount = InfoList.TotalCount;
			if (InfoList.LeesonAndExamRate >= 0.9) {
				$('.summary-popup0-class1').attr('class', 'summary-popup0-class1 green');
			} else if (InfoList.LeesonAndExamRate >= 0.6) {
				$('.summary-popup0-class1').attr('class', 'summary-popup0-class1 orange');
			} else {
				$('.summary-popup0-class1').attr('class', 'summary-popup0-class1 red');
			}
			if (InfoList.HomeworkCompleteRate >= 0.9) {
				$('.summary-popup0-class2').attr('class', 'summary-popup0-class2 green');
			} else if (InfoList.HomeworkCompleteRate >= 0.6) {
				$('.summary-popup0-class2').attr('class', 'summary-popup0-class2 orange');
			} else {
				$('.summary-popup0-class2').attr('class', 'summary-popup0-class2 red');
			}
			if (InfoList.SelfPlanRate >= 0.9) {
				$('.summary-popup0-class3').attr('class', 'summary-popup0-class3 green');
			} else if (InfoList.SelfPlanRate >= 0.6) {
				$('.summary-popup0-class3').attr('class', 'summary-popup0-class3 orange');
			} else {
				$('.summary-popup0-class3').attr('class', 'summary-popup0-class3 red');
			}
			$('.summary-popup0-class1').text(' ' + parseInt(InfoList.LeesonAndExamRate * 100) + '%');
			$('.summary-popup0-class2').text(' ' + parseInt(InfoList.HomeworkCompleteRate * 100) + '%');
			$('.summary-popup0-class3').text(' ' + parseInt(InfoList.SelfPlanRate * 100) + '%');
			$('.summary-table1-append').remove();
			var Table1list = InfoList.List;
			if (Table1list.length == 0) {
				$('.assistant-empty3').show();
				$('.summary-table1').hide();
				$('.summary-popup1').hide();
				$('.summary-popup2').hide();
				$('.summary-popup3').hide();
				$('.summary-popup0').show();
				$('.summary-popup0-main').animate({
					left: '42px'
				}, 'slow', function () {});
				return;
			}
			$('.assistant-empty3').hide();
			$('.summary-table1').show();
			Table1list.map(function (item, idx) {
				if (item.LessonAndExamRate >= 0.9) {
					var class1 = 'green';
				} else if (item.LessonAndExamRate >= 0.6) {
					var class1 = 'orange';
				} else {
					var class1 = 'red';
				}
				if (item.HomeworkRate >= 0.9) {
					var class2 = 'green';
				} else if (item.HomeworkRate >= 0.6) {
					var class2 = 'orange';
				} else {
					var class2 = 'red';
				}
				if (item.SelfPlanRate >= 0.9) {
					var class3 = 'green';
				} else if (item.SelfPlanRate >= 0.6) {
					var class3 = 'orange';
				} else {
					var class3 = 'red';
				}
				idx = conver(idx * 1 + 1 + page * 10);
				$('.summary-table1 tbody').append($('<tr class="summary-table1-append"><td>' + idx + '</td><td>' + item.Name +
					'</td><td>' + item.XH +
					'</td><td  class="summary-open-table1" data-Name=' + item.Name + ' data-ClassID=' + ClassID +
					' data-ClassType=' + ClassType +
					' data-XH=' + item.XH + '  ><span class=' + class1 + '>' + parseInt(item.LessonAndExamRate * 100) +
					'% </span>(' + item.LessonAndExamAttendence +
					'/' + item.LessonAndExamTotal + '次) <i></i> </td><td class="summary-open-table2" data-Name=' + item.Name +
					' data-ClassID=' + ClassID +
					' data-ClassType=' + ClassType +
					' data-XH=' + item.XH + '  ><span class=' + class2 +
					'>' + parseInt(item.HomeworkRate * 100) + '% </span>(' + item.HomeworkComplete + '/' + item.HomeworkTotal +
					'次)  <i ></i> </td><td  class="summary-open-table3" data-Name=' + item.Name + ' data-ClassID=' + ClassID +
					' data-ClassType=' + ClassType +
					' data-XH=' + item.XH + '  ><span class=' + class3 + '>' + parseInt(item.SelfPlanRate *
						100) + '% </span>(' + item.SelfPlanComplete + '/' + item.SelfPlanTotal +
					'次)  <i></i> </td></tr>'))

			})
			if ($('.summary-table1-append') && ($('.summary-table1-append').length > 6 || ($('.summary-table1-append').length >
					5 && page > 0))) {
				$('.summary-table1 tbody').css('overflow-y', 'scroll');
				if (navigator.userAgent.toLowerCase().indexOf("chrome") != -1) {
					$('.summary-table1 thead').css('width', 'calc(100% - 8px)');
				} else {
					$('.summary-table1 thead').css('width', 'calc(100% - 1em)');
				}
				// console.log(navigator.userAgent.toLowerCase());
			} else {
				$('.summary-table1 tbody').css('overflow-y', 'hidden');
				$('.summary-table1 thead').css('width', '100%');
			}
			if(page!=$('.summary-popup0-class').attr('data-page')){
				$('.summary-popup0-class').attr('data-page',page);
			}
			if (table1TotalCount > 10) {
				$('.summary-table1 tbody').append($('<div class="frame_pager_center summary-pager1"></div>'));
				setTable1Pager(table1TotalCount, page);
			}
			$('.summary-popup1').hide();
			$('.summary-popup2').hide();
			$('.summary-popup3').hide();
			$('.summary-popup0').show();
			if(state==1){
				$('.summary-table1 tbody').scrollTop(0);
			}
			$('.summary-popup0-main').animate({
				left: '42px'
			}, 'slow', function () {});
		}, function () {
			assistantTipsFn('数据连接失败,请重试~');
			$('.assistant-empty3').show();
			$('.summary-table1').hide();
			$('.summary-popup1').hide();
			$('.summary-popup2').hide();
			$('.summary-popup3').hide();
			$('.summary-popup0').show();
			$('.summary-popup0-main').animate({
				left: '42px'
			}, 'slow', function () {});
			return;

			// 			$('.summary-pager1').remove();
			// 			var InfoList = {
			// 				"ClassID": "7CFCA0DC-5D2A-4879-9AFF-3A89F1FBD07F",
			// 				"ClassType": "N",
			// 				"ClassName": "高二一班",
			// 				"LessonAndExamRate": 0.99,
			// 				"HomeworkCompleteRate": 0.56,
			// 				"SelfPlanRate": 0.7,
			// 				"PageIndex": 1,
			// 				"PageSize": 10,
			// 				"List": [{
			// 						"XH": "tcstu789",
			// 						"Name": "王小朋",
			// 						"LessonAndExamAttendence": 50,
			// 						"LessonAndExamTotal": 50,
			// 						"LessonAndExamRate": 1,
			// 						"HomeworkComplete": 15,
			// 						"HomeworkTotal": 15,
			// 						"HomeworkRate": 1,
			// 						"SelfPlanComplete": 9,
			// 						"SelfPlanTotal": 10,
			// 						"SelfPlanRate": 0.9
			// 					},
			// 					{
			// 						"XH": "tcstu790",
			// 						"Name": "罗小斌",
			// 						"LessonAndExamAttendence": 40,
			// 						"LessonAndExamTotal": 50,
			// 						"LessonAndExamRate": 0.8,
			// 						"HomeworkComplete": 12,
			// 						"HomeworkTotal": 15,
			// 						"HomeworkRate": 0.8,
			// 						"SelfPlanComplete": 9,
			// 						"SelfPlanTotal": 10,
			// 						"SelfPlanRate": 0.9
			// 					}, {
			// 						"XH": "tcstu789",
			// 						"Name": "王小朋",
			// 						"LessonAndExamAttendence": 50,
			// 						"LessonAndExamTotal": 50,
			// 						"LessonAndExamRate": 1,
			// 						"HomeworkComplete": 15,
			// 						"HomeworkTotal": 15,
			// 						"HomeworkRate": 1,
			// 						"SelfPlanComplete": 9,
			// 						"SelfPlanTotal": 10,
			// 						"SelfPlanRate": 0.0
			// 					},
			// 					{
			// 						"XH": "tcstu790",
			// 						"Name": "罗小斌",
			// 						"LessonAndExamAttendence": 40,
			// 						"LessonAndExamTotal": 50,
			// 						"LessonAndExamRate": 0.8,
			// 						"HomeworkComplete": 12,
			// 						"HomeworkTotal": 15,
			// 						"HomeworkRate": 0.8,
			// 						"SelfPlanComplete": 9,
			// 						"SelfPlanTotal": 10,
			// 						"SelfPlanRate": 0.9
			// 					},
			// 
			// 					{
			// 						"XH": "tcstu790",
			// 						"Name": "罗小斌",
			// 						"LessonAndExamAttendence": 40,
			// 						"LessonAndExamTotal": 50,
			// 						"LessonAndExamRate": 0.8,
			// 						"HomeworkComplete": 12,
			// 						"HomeworkTotal": 15,
			// 						"HomeworkRate": 0.8,
			// 						"SelfPlanComplete": 9,
			// 						"SelfPlanTotal": 10,
			// 						"SelfPlanRate": 0.9
			// 					}, {
			// 						"XH": "tcstu789",
			// 						"Name": "王小朋",
			// 						"LessonAndExamAttendence": 50,
			// 						"LessonAndExamTotal": 50,
			// 						"LessonAndExamRate": 1,
			// 						"HomeworkComplete": 15,
			// 						"HomeworkTotal": 15,
			// 						"HomeworkRate": 1,
			// 						"SelfPlanComplete": 9,
			// 						"SelfPlanTotal": 10,
			// 						"SelfPlanRate": 0.0
			// 					},
			// 					{
			// 						"XH": "tcstu789",
			// 						"Name": "王小朋",
			// 						"LessonAndExamAttendence": 50,
			// 						"LessonAndExamTotal": 50,
			// 						"LessonAndExamRate": 1,
			// 						"HomeworkComplete": 15,
			// 						"HomeworkTotal": 15,
			// 						"HomeworkRate": 1,
			// 						"SelfPlanComplete": 9,
			// 						"SelfPlanTotal": 10,
			// 						"SelfPlanRate": 0.0
			// 					},
			// 					{
			// 						"XH": "tcstu789",
			// 						"Name": "王小朋",
			// 						"LessonAndExamAttendence": 50,
			// 						"LessonAndExamTotal": 50,
			// 						"LessonAndExamRate": 1,
			// 						"HomeworkComplete": 15,
			// 						"HomeworkTotal": 15,
			// 						"HomeworkRate": 1,
			// 						"SelfPlanComplete": 9,
			// 						"SelfPlanTotal": 10,
			// 						"SelfPlanRate": 0.0
			// 					},
			// 					{
			// 						"XH": "tcstu789",
			// 						"Name": "王小朋",
			// 						"LessonAndExamAttendence": 50,
			// 						"LessonAndExamTotal": 50,
			// 						"LessonAndExamRate": 1,
			// 						"HomeworkComplete": 15,
			// 						"HomeworkTotal": 15,
			// 						"HomeworkRate": 1,
			// 						"SelfPlanComplete": 9,
			// 						"SelfPlanTotal": 10,
			// 						"SelfPlanRate": 0.0
			// 					}
			// 				]
			// 			}
			// 			$('.summary-popup0-class').text(InfoList.ClassName);
			// 			var ClassID = InfoList.ClassID;
			// 			var ClassType = InfoList.ClassType;
			// 			if (InfoList.LessonAndExamRate >= 0.9) {
			// 				$('.summary-popup0-class1').attr('class', 'summary-popup0-class1 green');
			// 			} else if (InfoList.LessonAndExamRate >= 0.6) {
			// 				$('.summary-popup0-class1').attr('class', 'summary-popup0-class1 orange');
			// 			} else {
			// 				$('.summary-popup0-class1').attr('class', 'summary-popup0-class1 red');
			// 			}
			// 			if (InfoList.HomeworkCompleteRate >= 0.9) {
			// 				$('.summary-popup0-class2').attr('class', 'summary-popup0-class2 green');
			// 			} else if (InfoList.HomeworkCompleteRate >= 0.6) {
			// 				$('.summary-popup0-class2').attr('class', 'summary-popup0-class2 orange');
			// 			} else {
			// 				$('.summary-popup0-class2').attr('class', 'summary-popup0-class2 red');
			// 			}
			// 			if (InfoList.SelfPlanRate >= 0.9) {
			// 				$('.summary-popup0-class3').attr('class', 'summary-popup0-class3 green');
			// 			} else if (InfoList.SelfPlanRate >= 0.6) {
			// 				$('.summary-popup0-class3').attr('class', 'summary-popup0-class3 orange');
			// 			} else {
			// 				$('.summary-popup0-class3').attr('class', 'summary-popup0-class3 red');
			// 			}
			// 			$('.summary-popup0-class1').text(' ' + parseInt(InfoList.LessonAndExamRate * 100) + '%');
			// 			$('.summary-popup0-class2').text(' ' + parseInt(InfoList.HomeworkCompleteRate * 100) + '%');
			// 			$('.summary-popup0-class3').text(' ' + parseInt(InfoList.SelfPlanRate * 100) + '% ');
			// 			$('.summary-table1-append').remove();
			// 			var Table1list = InfoList.List;
			// 			Table1list.map(function(item, idx) {
			// 				if (idx >= page * 8 && idx < (page + 1) * 8) {
			// 					if (item.LessonAndExamRate >= 0.9) {
			// 						var class1 = 'green';
			// 					} else if (item.LessonAndExamRate >= 0.6) {
			// 						var class1 = 'orange';
			// 					} else {
			// 						var class1 = 'red';
			// 					}
			// 					if (item.HomeworkRate >= 0.9) {
			// 						var class2 = 'green';
			// 					} else if (item.HomeworkRate >= 0.6) {
			// 						var class2 = 'orange';
			// 					} else {
			// 						var class2 = 'red';
			// 					}
			// 					if (item.SelfPlanRate >= 0.9) {
			// 						var class3 = 'green';
			// 					} else if (item.SelfPlanRate >= 0.6) {
			// 						var class3 = 'orange';
			// 					} else {
			// 						var class3 = 'red';
			// 					}
			// 					if (page > 0) {
			// 						idx = conver(idx * 1 + 1 + (page - 1) * 8);
			// 					} else {
			// 						idx = conver(idx * 1 + 1 + page * 8);
			// 					}
			// 					$('.summary-table1 tbody').append($('<tr class="summary-table1-append"><td>' + idx + '</td><td>' + item.Name +
			// 						'</td><td>' + item.XH +
			// 						'</td><td  class="summary-open-table1" data-Name=' + item.Name + ' data-ClassID=' + ClassID +
			// 						' data-ClassType=' + ClassType +
			// 						' data-XH=' + item.XH + '  ><span class=' + class1 + '>' + parseInt(item.LessonAndExamRate * 100) +
			// 						'% </span>(' + item.LessonAndExamAttendence +
			// 						'/' + item.LessonAndExamTotal + '次) <i></i> </td><td class="summary-open-table2" data-Name=' + item.Name +
			// 						' data-ClassID=' + ClassID +
			// 						' data-ClassType=' + ClassType +
			// 						' data-XH=' + item.XH + '  ><span class=' + class2 +
			// 						'>' + parseInt(item.HomeworkRate * 100) + '% </span>(' + item.HomeworkComplete + '/' + item.HomeworkTotal +
			// 						'次)  <i ></i> </td><td  class="summary-open-table3" data-Name=' + item.Name + ' data-ClassID=' + ClassID +
			// 						' data-ClassType=' + ClassType +
			// 						' data-XH=' + item.XH + '  ><span class=' + class3 + '>' + parseInt(item.SelfPlanRate *
			// 							100) + '% </span>(' + item.SelfPlanComplete + '/' + item.SelfPlanTotal +
			// 						'次)  <i></i> </td></tr>'))
			// 				}
			// 			})
			// 			if ($('.summary-table1-append') && ($('.summary-table1-append').length > 6 || ($('.summary-table1-append').length >
			// 					5 && page > 0))) {
			// 				$('.summary-table1 tbody').css('overflow-y', 'scroll');
			// 				if (navigator.userAgent.toLowerCase().indexOf("chrome") != -1) {
			// 					$('.summary-table1 thead').css('width', 'calc(100% - 8px)');
			// 				} else {
			// 					$('.summary-table1 thead').css('width', 'calc(100% - 1em)');
			// 				}
			// 				console.log(navigator.userAgent.toLowerCase());
			// 			} else {
			// 				$('.summary-table1 tbody').css('overflow-y', 'hidden');
			// 				$('.summary-table1 thead').css('width', '100%');
			// 			}
			// 			if (Table1list && Table1list.length > 10) {
			// 				$('.summary-table1 tbody').append($('<div class="frame_pager_center summary-pager1"></div>'));
			// 				setTable1Pager(Table1list.length, page);
			// 			}
			// 			$('.summary-popup1').hide();
			// 			$('.summary-popup2').hide();
			// 			$('.summary-popup3').hide();
			// 			$('.summary-popup0').show();
			// 			$('.summary-popup0-main').animate({
			// 				left: '42px'
			// 			}, 'slow', function() {});
			// 			$('.summary-popup-main tbody').scrollTop(0);
		})
	}
	// 分页函数调用
	function handlePaginationClickTable1(new_page_index, pagination_container) {
		setTable1Pager(table1TotalCount, new_page_index);
		summaryTable0Fn(summaryTable0info, new_page_index);
	};

	function setTable1Pager(totalNum, currentNum) {
		$(".summary-pager1").pagination(totalNum, {
			//回调函数，每次点击页面或上下页及跳转按钮的时候执行的函数
			callback: handlePaginationClickTable1,
			//初始化时，高亮的页码，默认为0，即第一页
			current_page: currentNum,
			//每页项目数，默认为10，这仅仅用于计算分页ui的显示，实际数据的写入需要回调函数完成
			items_per_page: 10,
			//显示可点击页码数量
			num_display_entries: 3,
			prev_text: '<',
			next_text: '>',
			link_to: 'javascript:;'
		});
		$('.summary-pager1 .pagination .pagination_go_button').css('position', 'relative');
		$('.summary-pager1 .pagination .pagination_go_button').append($(
			'<div class="summarypager-click-shadow1 pager-click-shadow"></div>'))
		$('.summarypager-click-shadow1').off().click(function (event) {
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
					assistantTipsFn('输入页面超过最大页码了哦~');
					$(this).parent().parent().children('.pagination_go_input').val(' ');
					normal('.summary-pager1 .pagination .pagination_go_input', 3);
				}

			} else {
				$(this).parent().parent().children('.pagination_go_input').val(' ');
				assistantTipsFn('输入的不是有效页码哦~');
				normal('.summary-pager1 .pagination .pagination_go_input', 3);
			}



			event.stopPropagation();

		})

	};
	var table2TotalCount = 0;
	//学情总结个人上课/考试考勤表动态生成
	function summaryTable1Fn($this, page) {
		$('.summary-popup1-main tbody').scrollTop(0);
		summaryStartTime = summaryStartTime.slice(0, 10) + ' 00:00:00';
		summaryEndTime = summaryEndTime.slice(0, 10) + ' 00:00:00';
		$('.assistant-empty4').hide();
		ajaxM('api/Share/GetLessonAndExamDetails_XH_XGJ', 'get', {
			URL: summaryURL,
			SubjectID: SubjectID,
			SchoolID: SchoolID,
			ClassID: $this.attr('data-ClassID'),
			ClassType: $this.attr('data-ClassType'),
			XH: $this.attr('data-XH'),
			Type: summaryTableSelect1,
			StartTime: summaryStartTime,
			EndTime: summaryEndTime,
			PageIndex: page + 1,
			PageSize: 10
		}, function (data) {
			$('.summary-pager2').remove();
			$('.summary-popup1-name').text($this.attr('data-name'));
			var InfoList = data.InfoList;
			if (InfoList.AllRate >= 0.9) {
				$('.summary-popup1-AllRate').attr('class', 'summary-popup1-AllRate green');
			} else if (InfoList.AllRate >= 0.6) {
				$('.summary-popup1-AllRate').attr('class', 'summary-popup1-AllRate orange');
			} else {
				$('.summary-popup1-AllRate').attr('class', 'summary-popup1-AllRate red');
			}
			$('.summary-table2-append').remove();
			table2TotalCount = InfoList.TotalCount;
			var Table2list = InfoList.List;
			if (Table2list.length == 0) {
				$('.assistant-empty4').show();
				$('.summary-table2').hide();
				$('.summary-popup1-AllRate').text(((InfoList.AllRate * 100).toFixed(2)) * 1 + '%');
				$('.summary-popup1-AllAttendence').text('(' + InfoList.AllAttendence + '/' + InfoList.AllTimes + ')');
				$('.summary-popup1-LessonAttendence').text('出勤' + InfoList.LessonAttendence);
				$('.summary-popup1-LessonAbsence').text('缺勤' + InfoList.LessonAbsence);
				$('.summary-popup1-ExamAttendence').text('出考' + InfoList.ExamAttendence);
				$('.summary-popup1-ExamAbsence').text('缺考' + InfoList.ExamAbsence);
				$('.summary-popup1').show();
				$('.summary-popup1-main').animate({
					left: '62px'
				}, 'slow', function () {});
				return;
			}
			$('.assistant-empty4').hide();
			$('.summary-table2').show();

			Table2list.map(function (item, idx) {
				idx = conver(idx * 1 + 1 + page * 10);
				item.BeginTime = item.BeginTime.slice(0, -3);
				item.EndTime = item.EndTime.slice(0, -3);
				var time1 = item.BeginTime.split(' ');
				var time2 = item.EndTime.split(' ');
				if (time1[0] == time2[0]) {
					var time = item.BeginTime + '~' + time2[1];
				} else {
					var time = item.BeginTime + '~' + item.EndTime;
				}
				if (item.Attendence == 0) {
					var text = '缺勤';
					class1 = 'red';
				} else {
					var text = '出勤';
					class1 = 'green';
				}
				$('.summary-table2').append($('<tr class="summary-table2-append" ><td>' + idx + '</td><td>' + time +
					'</td><td>' + item.SubjectName + '</td><td>' + item.Name + ' </td><td class=' + class1 + ' > ' + text +
					'</td><td></td></tr>'));
			})
			if ($('.summary-table2-append') && ($('.summary-table2-append').length > 6 || ($('.summary-table2-append').length >
					5 && page > 0))) {
				$('.summary-table2 tbody').css('overflow-y', 'scroll');
				if (navigator.userAgent.toLowerCase().indexOf("chrome") != -1) {
					$('.summary-table2 thead').css('width', 'calc(100% - 8px)');
				} else {
					$('.summary-table2 thead').css('width', 'calc(100% - 1em)');
				}
			} else {
				$('.summary-table2 tbody').css('overflow-y', 'hidden');
				$('.summary-table2 thead').css('width', '100%');
			}
			if (table2TotalCount > 10) {
				$('.summary-table2 tbody').append($('<div class="frame_pager_center summary-pager2"></div>'));
				setTable2Pager(table2TotalCount, page);
			}
			$('.summary-popup1-AllRate').text(((InfoList.AllRate * 100).toFixed(2)) * 1 + '%');
			$('.summary-popup1-AllAttendence').text('(' + InfoList.AllAttendence + '/' + InfoList.AllTimes + ')');
			$('.summary-popup1-LessonAttendence').text('出勤' + InfoList.LessonAttendence);
			$('.summary-popup1-LessonAbsence').text('缺勤' + InfoList.LessonAbsence);
			$('.summary-popup1-ExamAttendence').text('出考' + InfoList.ExamAttendence);
			$('.summary-popup1-ExamAbsence').text('缺考' + InfoList.ExamAbsence);
			$('.summary-popup1').show();
			$('.summary-popup1-main').animate({
				left: '62px'
			}, 'slow', function () {});
		}, function (data) {
			assistantTipsFn('数据连接失败,请重试~');
			$('.assistant-empty4').show();
			$('.summary-popup1-AllRate').text('0%');
			$('.summary-popup1-AllAttendence').text('(0/0)');
			$('.summary-popup1-LessonAttendence').text('出勤0');
			$('.summary-popup1-LessonAbsence').text('缺勤0');
			$('.summary-popup1-ExamAttendence').text('出考0');
			$('.summary-popup1-ExamAbsence').text('缺考0');
			$('.summary-table2').hide();
			$('.summary-popup1').show();
			$('.summary-popup1-main').animate({
				left: '62px'
			}, 'slow', function () {});

		})

	}


	// 分页函数调用
	function handlePaginationClickTable2(new_page_index, pagination_container) {
		setTable2Pager(table2TotalCount, new_page_index);
		summaryTable1Fn(summaryTable1info, new_page_index);
	};

	function setTable2Pager(totalNum, currentNum) {
		$(".summary-pager2").pagination(totalNum, {
			//回调函数，每次点击页面或上下页及跳转按钮的时候执行的函数
			callback: handlePaginationClickTable2,
			//初始化时，高亮的页码，默认为0，即第一页
			current_page: currentNum,
			//每页项目数，默认为10，这仅仅用于计算分页ui的显示，实际数据的写入需要回调函数完成
			items_per_page: 8,
			//显示可点击页码数量
			num_display_entries: 3,
			prev_text: '<',
			next_text: '>',
			link_to: 'javascript:;'
		});
		$('.summary-pager2 .pagination .pagination_go_button').css('position', 'relative');
		$('.summary-pager2 .pagination .pagination_go_button').append($(
			'<div class="summarypager-click-shadow2 pager-click-shadow"></div>'))
		$('.summarypager-click-shadow2').off().click(function (event) {
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
					assistantTipsFn('输入页面超过最大页码了哦~');
					$(this).parent().parent().children('.pagination_go_input').val(' ');
					normal('.summary-pager2 .pagination .pagination_go_input', 3);
				}

			} else {
				$(this).parent().parent().children('.pagination_go_input').val(' ');
				assistantTipsFn('输入的不是有效页码哦~');
				normal('.summary-pager2 .pagination .pagination_go_input', 3);
			}




			event.stopPropagation();

		})

	}

	var table3TotalCount = 0;
	//学情总结个人作业情况表动态生成
	function summaryTable2Fn($this, page) {
		$('.summary-popup2-main tbody').scrollTop(0);
		summaryStartTime = summaryStartTime.slice(0, 10) + ' 00:00:00';
		summaryEndTime = summaryEndTime.slice(0, 10) + ' 00:00:00';
		$('.assistant-empty5').hide();
		ajaxM('api/Share/GetHomeworkDetails_XH_XGJ', 'get', {
				URL: summaryURL,
				SubjectID: SubjectID,
				SchoolID: SchoolID,
				ClassID: $this.attr('data-ClassID'),
				ClassType: $this.attr('data-ClassType'),
				XH: $this.attr('data-XH'),
				Type: summaryTableSelect2,
				State: summaryTableSelect3,
				StartTime: summaryStartTime,
				EndTime: summaryEndTime,
				PageIndex: 1 + page,
				PageSize: 10
			}, function (data) {
				$('.summary-pager3').remove();
				$('.summary-popup2-name').text($this.attr('data-name'));
				var InfoList = data.InfoList;
				if (InfoList.HomeworkCompleteRate >= 0.9) {
					$('.summary-popup2-HomeworkCompleteRate').attr('class', 'summary-popup2-HomeworkCompleteRate green');
				} else if (InfoList.HomeworkCompleteRate >= 0.6) {
					$('.summary-popup2-HomeworkCompleteRate').attr('class', 'summary-popup2-HomeworkCompleteRate orange');
				} else {
					$('.summary-popup2-HomeworkCompleteRate').attr('class', 'summary-popup2-HomeworkCompleteRate red');
				}
				$('.summary-table3-append').remove();
				table3TotalCount = InfoList.TotalCount;
				var Table3list = InfoList.HomeworkList;
				if (Table3list.length == 0) {
					$('.assistant-empty5').show();
					$('.summary-table3').hide();
					$('.summary-popup2-HomeworkCompleteRate').text(((InfoList.HomeworkCompleteRate * 100).toFixed(2)) * 1 + '%');
					$('.summary-popup2-CompleteHomework').text('(' + InfoList.CompleteHomework + '/' + InfoList.AllHomework + ')');
					$('.summary-popup2').show();
					$('.summary-popup2-main').animate({
						left: '62px'
					}, 'slow', function () {});
					return;
				}
				$('.assistant-empty5').hide();
				$('.summary-table3').show();
				Table3list.map(function (item, idx) {
					idx = conver(idx * 1 + 1 + page * 10);
					if (item.Score >= 90) {
						class1 = 'green';

					} else if (item.Score >= 70) {
						class1 = 'orange';
					} else {
						class1 = 'red';
					}
					$('.summary-table3').append($('<tr class="summary-table3-append" ><td>' + idx + '</td><td>' + item.HomeworkName +
						'</td><td>' + item.SubjectName + '</td><td>' + item.TeacherName + ' </td><td>' + item.CompleteTime +
						'</td><td class=' + class1 + '>' + item.Score + ' </td><td class="summary-table3-go" data-type=' + item.PCLinkType +
						' data-url=' + item.PCLink +
						' ><i></i></td></tr>'));
				})
				if ($('.summary-table3-append') && ($('.summary-table3-append').length > 6 || ($('.summary-table3-append').length >
						5 && page > 0))) {
					$('.summary-table3 tbody').css('overflow-y', 'scroll');
					if (navigator.userAgent.toLowerCase().indexOf("chrome") != -1) {
						$('.summary-table3 thead').css('width', 'calc(100% - 8px)');
					} else {
						$('.summary-table3 thead').css('width', 'calc(100% - 1em)');
					}
					console.log(navigator.userAgent.toLowerCase());
				} else {
					$('.summary-table3 tbody').css('overflow-y', 'hidden');
					$('.summary-table3 thead').css('width', '100%');
				}
				if (table3TotalCount > 10) {
					$('.summary-table3 tbody').append($('<div class="frame_pager_center summary-pager3"></div>'));
					setTable3Pager(table3TotalCount, page);
				}
				$('.summary-table3-go').off().click(function () {
					if ($(this).attr('data-type') == 1) {
						window.open(summaryURL.slice(0, -1) + (this).attr('data-url'), '_blank');
					} else {

					}
				})
				$('.summary-popup2-HomeworkCompleteRate').text(((InfoList.HomeworkCompleteRate * 100).toFixed(2)) * 1 + '%');
				$('.summary-popup2-CompleteHomework').text('(' + InfoList.CompleteHomework + '/' + InfoList.AllHomework + ')');
				$('.summary-popup2').show();
				$('.summary-popup2-main').animate({
					left: '62px'
				}, 'slow', function () {});
			},
			function (data) {
				assistantTipsFn('数据连接失败,请重试~');
				$('.summary-pager3').remove();
				$('.assistant-empty5').show();
				$('.summary-table3').hide();
				$('.summary-popup2-HomeworkCompleteRate').text('0%');
				$('.summary-popup2-CompleteHomework').text('(0/0)');
				$('.summary-popup2').show();
				$('.summary-popup2-main').animate({
					left: '62px'
				}, 'slow', function () {});
				return;

			})

	}


	// 分页函数调用
	function handlePaginationClickTable3(new_page_index, pagination_container) {
		setTable3Pager(table3TotalCount, new_page_index);
		summaryTable2Fn(summaryTable2info, new_page_index);
	};

	function setTable3Pager(totalNum, currentNum) {
		$(".summary-pager3").pagination(totalNum, {
			//回调函数，每次点击页面或上下页及跳转按钮的时候执行的函数
			callback: handlePaginationClickTable3,
			//初始化时，高亮的页码，默认为0，即第一页
			current_page: currentNum,
			//每页项目数，默认为10，这仅仅用于计算分页ui的显示，实际数据的写入需要回调函数完成
			items_per_page: 10,
			//显示可点击页码数量
			num_display_entries: 3,
			prev_text: '<',
			next_text: '>',
			link_to: 'javascript:;'
		});
		$('.summary-pager3 .pagination .pagination_go_button').css('position', 'relative');
		$('.summary-pager3 .pagination .pagination_go_button').append($(
			'<div class="summarypager-click-shadow3 pager-click-shadow"></div>'))
		$('.summarypager-click-shadow3').off().click(function () {
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
					assistantTipsFn('输入页面超过最大页码了哦~');
					$(this).parent().parent().children('.pagination_go_input').val(' ');
					normal('.summary-pager3 .pagination .pagination_go_input', 3);
				}

			} else {
				$(this).parent().parent().children('.pagination_go_input').val(' ');
				assistantTipsFn('输入的不是有效页码哦~');
				normal('.summary-pager3 .pagination .pagination_go_input', 3);
			}



		})

	}


	var table4TotalCount = 0;
	//学情总结个人课外计划表动态生成
	function summaryTable3Fn($this, page) {
		$('.summary-popup3-main tbody').scrollTop(0);
		summaryStartTime = summaryStartTime.slice(0, 10) + ' 00:00:00';
		summaryEndTime = summaryEndTime.slice(0, 10) + ' 00:00:00';
		$('.assistant-empty6').hide();
		ajaxM('api/Share/GetSelfPlanDetails_XH_XGJ', 'get', {
				URL: summaryURL,
				SubjectID: SubjectID,
				SchoolID: SchoolID,
				ClassID: $this.attr('data-ClassID'),
				ClassType: $this.attr('data-ClassType'),
				XH: $this.attr('data-XH'),
				Type: summaryTableSelect2,
				State: summaryTableSelect3,
				StartTime: summaryStartTime,
				EndTime: summaryEndTime,
				PageIndex: 1 + page,
				PageSize: 10
			}, function (data) {
				$('.summary-pager4').remove();
				$('.summary-popup3-name').text($this.attr('data-name'));
				var InfoList = data.InfoList;
				if (InfoList.PassRate >= 0.9) {
					$('.summary-popup3-PassRate').attr('class', 'summary-popup3-PassRate green');
				} else if (InfoList.PassRate >= 0.6) {
					$('.summary-popup3-PassRate').attr('class', 'summary-popup3-PassRate orange');
				} else {
					$('.summary-popup3-PassRate').attr('class', 'summary-popup3-PassRate red');
				}
				$('.summary-table4-append').remove();
				table4TotalCount = InfoList.TotalCount
				var Table4list = InfoList.PlanList;
				if (Table4list.length == 0) {
					$('.assistant-empty6').show();
					$('.summary-table4').hide();
					$('.summary-popup3-PassRate').text(((InfoList.PassRate * 100).toFixed(2)) * 1 + '%');
					$('.summary-popup3-PassPlan').text('(' + InfoList.PassPlan + '/' + InfoList.AllPlan + ')');
					$('.summary-popup3').show();
					$('.summary-popup3-main').animate({
						left: '62px'
					}, 'slow', function () {});
					return;
				}
				$('.assistant-empty6').hide();
				$('.summary-table4').show();
				Table4list.map(function (item, idx) {
					idx = conver(idx * 1 + 1 + page * 10);
					if (item.Pass == 1) {
						class1 = 'green';
						var text = '已完成';
					} else {
						class1 = 'red';
						var text = '未完成';
					}
					item.StartTime = item.StartTime.slice(0, -3);
					item.EndTime = item.EndTime.slice(0, -3);
					var time1 = item.StartTime.split(' ');
					var time2 = item.EndTime.split(' ');
					if (time1[0] == time2[0]) {
						var time = item.StartTime + '~' + time2[1];
					} else {
						var time = time1[0] + '~' + time2[0] + ' (' + time1[1] + '~' + time2[1] + ')';
					}
					$('.summary-table4').append($(' <tr class="summary-table4-append" ><td > ' + idx + ' </td> <td> ' + item.PlanName +
						' </td> <td > ' + item.SubjectName + ' </td> <td> ' + time + ' </td> <td class = ' + class1 + ' > ' + text +
						' </td> <td class = "summary-table4-go" data-type=' + item.PCLinkType + ' data-url=' + item.Link +
						' > <i> </i></td><td></td></tr>'))

				});
				$('.summary-table4-go').click(function () {
					if ($(this).attr('data-type') == 1) {
						window.open(summaryURL.slice(0, -1) + $(this).attr('data-url'), '_blank');
					} else {

					}
				})
				if ($('.summary-table4-append') && ($('.summary-table4-append').length > 6 || ($('.summary-table4-append').length >
						5 && page > 0))) {
					$('.summary-table4 tbody').css('overflow-y', 'scroll');
					if (navigator.userAgent.toLowerCase().indexOf("chrome") != -1) {
						$('.summary-table4 thead').css('width', 'calc(100% - 8px)');
					} else {
						$('.summary-table4 thead').css('width', 'calc(100% - 1em)');
					}
					console.log(navigator.userAgent.toLowerCase());
				} else {
					$('.summary-table4 tbody').css('overflow-y', 'hidden');
					$('.summary-table4 thead').css('width', '100%');
				}
				if (table4TotalCount > 10) {
					$('.summary-table4 tbody').append($('<div class="frame_pager_center summary-pager4"></div>'));
					setTable4Pager(table4TotalCount, page);
				}
				$('.summary-popup3-PassRate').text(((InfoList.PassRate * 100).toFixed(2)) * 1 + '%');
				$('.summary-popup3-PassPlan').text('(' + InfoList.PassPlan + '/' + InfoList.AllPlan + ')');
				$('.summary-popup3').show();
				$('.summary-popup3-main').animate({
					left: '62px'
				}, 'slow', function () {});
			},
			function (data) {
				assistantTipsFn('数据连接失败,请重试~');
				$('.summary-pager4').remove();
				$('.assistant-empty6').show();
				$('.summary-table4').hide();
				$('.summary-popup3-PassRate').text('0%');
				$('.summary-popup3-PassPlan').text('(0/0)');
				$('.summary-popup3').show();
				$('.summary-popup3-main').animate({
					left: '62px'
				}, 'slow', function () {});
				return;
			})

	}

	// 分页函数调用
	function handlePaginationClickTable4(new_page_index, pagination_container) {
		setTable4Pager(table4TotalCount, new_page_index);
		summaryTable3Fn(summaryTable3info, new_page_index);
	};

	function setTable4Pager(totalNum, currentNum) {
		$(".summary-pager4").pagination(totalNum, {
			//回调函数，每次点击页面或上下页及跳转按钮的时候执行的函数
			callback: handlePaginationClickTable4,
			//初始化时，高亮的页码，默认为0，即第一页
			current_page: currentNum,
			//每页项目数，默认为10，这仅仅用于计算分页ui的显示，实际数据的写入需要回调函数完成
			items_per_page: 10,
			//显示可点击页码数量
			num_display_entries: 3,
			prev_text: '<',
			next_text: '>',
			link_to: 'javascript:;'
		});
		$('.summary-pager4 .pagination .pagination_go_button').css('position', 'relative');
		$('.summary-pager4 .pagination .pagination_go_button').append($(
			'<div class="summarypager-click-shadow4 pager-click-shadow"></div>'))
		$('.summarypager-click-shadow4').off().click(function (event) {
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
					assistantTipsFn('输入页面超过最大页码了哦~');
					$(this).parent().parent().children('.pagination_go_input').val(' ');
					normal('.summary-pager4 .pagination .pagination_go_input', 3);
				}

			} else {
				$(this).parent().parent().children('.pagination_go_input').val(' ');
				assistantTipsFn('输入的不是有效页码哦~');
				normal('.summary-pager4 .pagination .pagination_go_input', 3);
			}


			event.stopPropagation();
		})

	}










	//通讯录模块
	var lastSearchList = []; //搜索结果
	var contactLeftOption = '1'; //通讯录模块左边选项卡的选项
	var contactSearchStr = ''; //搜索关键词
	var recentContactType = 0; //通讯录模块选择，防止重复点击
	var keyupTimer = ''; //按键后500ms的定时器；做联想搜索；
	var keyupValue = ''; //按键结束后500ms的值，用于过滤相同值频繁请求
	//左边选择
	$('.contact-search-choose').click(function (event) {
		if ($('.contact-search-input').val().replace(/\s*/g, "")) {
			clearTimeout(keyupTimer);
			contactSearchFn($('.contact-search-input').val(), 1, 0);
			keyupValue = $('.contact-search-input').val();
			// console.log($('.contact-search-input').val());
			// console.log(lastSearchList);


			event.stopPropagation();
		} else {
			normal('.contact-left-search', 3);
			$('.contact-search-input').focus();
		}

	});

	//左边搜索框清除搜索内容
	$('.contact-search-input').keyup(function () {
		if ($(this).val()) {
			$('.contact-search-clear').show();
		} else {
			$('.contact-search-clear').hide();
		}
	});

	$('.contact-search-input').blur(function () {
		if (!$(this).val()) {
			$('.contact-search-clear').hide();
		}
	});
	$('.contact-search-clear').click(function () {
		$('.contact-search-input').val('');
		$('.contact-search-input').focus();
		$('.contact-search-clear').hide();
	});
	// 左边回车搜索
	$('.contact-search-input').keyup(function (event) {
		console.log(event);
		clearTimeout(keyupTimer);
		if (event.keyCode == 13) {
			if ($('.contact-search-input').val().replace(/\s*/g, "")) {
				clearTimeout(keyupTimer);
				contactSearchFn($('.contact-search-input').val(), 1, 0);
				keyupValue = $('.contact-search-input').val();
				// console.log($('.contact-search-input').val());
				// console.log(lastSearchList);

				event.stopPropagation();
			} else {
				normal('.contact-left-search', 3)
				$('.contact-search-input').focus();
			}

		}
		if ($('.contact-search-input').val().replace(/\s*/g, "") && keyupValue != $('.contact-search-input').val()) {
			keyupTimer = setTimeout(function () {
				clearTimeout(keyupTimer);
				contactSearchFn($('.contact-search-input').val(), 1, 0);
				keyupValue = $('.contact-search-input').val();
				// console.log($('.contact-search-input').val());
				// console.log(lastSearchList);

				event.stopPropagation();

			}, 500)
		}


	});


	//关闭搜索结果窗口
	$('.assistant-popup').click(function () {
		$('.contact-left-popup').hide();
		keyupValue = '';
	});
	//通讯录左边选项卡功能实现和右边数据的生成
	$(".contact-left ul li").click(function () {
		$(".contact-left ul li").attr('class', '');
		$(this).attr('class', 'contact-list-choose');
		$(".contact-type-p").eq(0).text($(this).attr('name'));
		if ($(this).attr('name') == '最近联系人' && contactLeftOption != 1) {
			$('.contact-type-text').text('清空');
			$('.contact-type-text').attr('name', 1);
			recentContactType = 1;
			recentContactFn(0, 1, '');
			contactLeftOption = '1';
			$('.contact-create').remove();
		} else if ($(this).attr('name') == '常用联系人' && contactLeftOption != 2) {
			$('.contact-type-text').html('<i></i>添加常用联系人');
			$('.contact-type-text').attr('name', 2);
			recentContactType = 2;
			recentContactFn(0, 2, '');
			contactLeftOption = '2';
			$('.contact-create').remove();
		} else if ($(this).attr('name') == '我的班级' && contactLeftOption != 3) {
			recentContactType = 3;
			recentContactFn(0, 3, '');
			contactLeftOption = '3';
			$('.contact-type-text').html('');
			$('.contact-create').remove();
		} else if ($(this).attr('name') == '我的教师组' && contactLeftOption != 5) {
			// recentContactType = 5;
			// recentContactFn(0, 4, '');
			contactLeftOption = '5';
			$('.contact-type-text').html('');
			$('.contact-create').remove();
			if (SubjectIDArr.length == 1) {
				recentContactFn(0, 5, '');
			} else if (SubjectIDArr.length > 1) {
				recentContactFn(0, 6, '');
			}

		} else if ($(this).attr('name') == '全校师生' && contactLeftOption != 4) {
			recentContactType = 4;
			recentContactFn(0, 4, '');
			contactLeftOption = '4';
			$('.contact-type-text').html('');
			$('.contact-create').remove();
		}


	});

	//关闭个人信息页面
	$('.contact-info-close').click(function () {
		$('.contact-info div').eq(0).hide();
		$('.contact-mask').hide();
		$('.contact-info div').eq(1).animate({
			right: '-300px'
		}, 'slow', function () {
			$('.contact-info').hide();
		});
		$('.contact-li li').attr('class', '');
		// $('.contact-li li').css('background', '#fff');
	});
	$('.contact-info div').eq(0).click(function () {
		$('.contact-info div').eq(0).hide();
		$('.contact-mask').hide();
		$('.contact-info div').eq(1).animate({
			right: '-300px'
		}, 'slow', function () {
			$('.contact-info').hide();
		});
		$('.contact-li li').attr('class', '');
		// $('.contact-li li').css('background', '#fff');
	});
	//查找页面通讯录添加联系人
	$('.contact-frequent-commit').click(function () {
		if (!$('.contact-frequent-input').val().replace(/\s*/g, "")) {
			$('.contact-left-popup').hide();
			normal('.contact-frequent-input', 3);
		} else {
			clearTimeout(keyupTimer);
			contactSearchFn($('.contact-frequent-input').val(), 2, 0);
			keyupValue = $('.contact-frequent-input').val();
		}
	});

	// 右边搜索页面关闭
	$('.contact-frequent-close').click(function () {
		keyupValue = '';
		$('.contact-frequent div').eq(0).hide();
		$('.pager5').hide();
		$('.contact-frequent div').eq(1).animate({
			right: '-680px'
		}, 'slow', function () {
			$('.contact-frequent').hide();
		});
		// $('.contact-frequent div').eq(1).css('transition', 'all 0.5s');
		// $('.contact-frequent div').eq(1).css('transform', 'scale(0.3)');
		// $('.contact-frequent div').eq(1).css('right', '-187px');
		// $('.contact-frequent div').eq(1).css('top', '-120px');
		// $('.contact-frequent div').eq(1).css('opacity', '0');
		// setTimeout(function() {
		// 	$('.contact-frequent').hide();
		// }, 500);
		// $(".contact-frequent").css('display', 'none');
		recentContactType = 2;
		recentContactFn(0, 2, '');
	});
	$('.contact-frequent div').eq(0).click(function () {
		keyupValue = '';
		$('.contact-frequent div').eq(0).hide();
		$('.pager5').hide();
		$('.contact-frequent div').eq(1).animate({
			right: '-680px'
		}, 'slow', function () {
			$('.contact-frequent').hide();
		});
		// $('.contact-frequent div').eq(1).css('transition', 'all 0.5s');
		// $('.contact-frequent div').eq(1).css('transform', 'scale(0.3)');
		// $('.contact-frequent div').eq(1).css('right', '-187px');
		// $('.contact-frequent div').eq(1).css('top', '-120px');
		// $('.contact-frequent div').eq(1).css('opacity', '0');
		// setTimeout(function() {
		// 	$('.contact-frequent').hide();
		// }, 500);
		// $(".contact-frequent").css('display', 'none');
		recentContactType = 2;
		recentContactFn(0, 2, '');
	});


	$('.contact-frequent-input').keyup(function () {
		clearTimeout(keyupTimer);
		if (event.keyCode == 13) {
			if (!$('.contact-frequent-input').val().replace(/\s*/g, "")) {
				$('.contact-left-popup').hide();
				normal('.contact-frequent-input', 3)
			} else {
				clearTimeout(keyupTimer);
				contactSearchFn($('.contact-frequent-input').val(), 2, 0);
				keyupValue = $('.contact-frequent-input').val();
			}
		}
		if ($('.contact-frequent-input').val().replace(/\s*/g, "") && keyupValue != $('.contact-frequent-input').val()) {
			keyupTimer = setTimeout(function () {
				clearTimeout(keyupTimer);
				contactSearchFn($('.contact-frequent-input').val(), 2, 0);
				keyupValue = $('.contact-frequent-input').val();
			}, 500)
		}

		if ($(this).val()) {
			$('.contact-frequent-clear').show();
		} else {
			$('.contact-frequent-clear').hide();
		}
	});


	//清空联系人或者是添加常联系人
	$('.contact-type-text').click(function () {
		if ($('.contact-type-text').attr('name') == 1) {
			assistantRemindFn(['确定清空最近联系人信息？', '确定', '取消'], function (data) {
				if (data) {
					ajaxN('PsnMgr/Contact/OperateRecentContact', 'post', {
						"OperateFlag": -2, //  1添加  -2 清空
						"SecretKey": "55555",
					}, function (data) {
						$('.contact-li li').remove();
						$('.contact-right-empty').show();
						$('.contact-empty-text').text($('.contact-type-p').last().text());
						$('.contact-type-text').hide();
						assistantSmallSuccessFn('删除成功~');
					})

				}
			})
		} else {
			// $(".contact-frequent").css('display', 'block');
			$('.contact-frequent').show();
			keyupValue = '';

			$('.contact-frequent-input').val('');
			$('.contact-search-li ').remove();

			$('.contact-frequent-clear').hide();
			$('.contact-search-p').hide();

			$('.contact-frequent div').eq(1).animate({
				right: '0'
			}, 'slow', function () {
				$('.contact-frequent div').eq(0).show();
				$('.contact-frequent-input').focus();
			});
			// $('.contact-frequent div').eq(1).css('transition', 'all 0.5s');
			// $('.contact-frequent div').eq(1).css('transform', 'scale(1)');
			// $('.contact-frequent div').eq(1).css('right', '0');
			// $('.contact-frequent div').eq(1).css('top', '0');
			// $('.contact-frequent div').eq(1).css('opacity', '1');
			// setTimeout(function() {
			// 	
			// }, 500)
			// $('.contact-frequent div').eq(1).animate({
			// 	right: '0',
			// 	top:'0',
			// 	opacity:'1',
			// }, 'slow', function() {
			// 	
			// 	$('.contact-frequent div').eq(0).show();
			// 	// $('.pager').show();
			// });

		}
	});





	//联系人搜索清除按钮
	$('.contact-frequent-input').blur(function () {
		if ($(this).val() == '') {
			$('.contact-frequent-clear').hide();
		}
	});
	$('.contact-frequent-clear').click(function () {
		$('.contact-frequent-input').val('');
		$('.contact-frequent-input').focus();
		$(this).hide();
	});



	//复制功能
	$(".contact-info-copy").on('click', function () {
		var copytxt = '';
		if ($(this).attr('name') == 1) {
			copytxt = document.querySelector('#contact-copy-text1');
		} else if ($(this).attr('name') == 2) {
			copytxt = document.querySelector('#contact-copy-text2');
		} else if ($(this).attr('name') == 3) {
			copytxt = document.querySelector('#contact-copy-text3');
		} else if ($(this).attr('name') == 4) {
			copytxt = document.querySelector('#contact-copy-text4');
		}
		copyToClipboard(copytxt);

	});



	//未读消息查询
	// 	var atime = setInterval(function() {
	// 		var assistantRemindArr1 = [];
	// 		ajaxN('PsnMgr/InfoCentre/GetNewRemindCount', 'get', {}, function(data) {
	// 			console.log(data.Data.TotalCount);
	// 			if (data.Data.TotalCount != 0) {
	// 				clearInterval(atime);
	// 				if (data.Data.TodoListCount == 0) {
	// 					$('.popup-main1 ul li').eq(0).children().children().attr('class', '');
	// 				} else {
	// 					if ($('.assistant-active').attr('name') == 1 && $('.info-active').eq(0).attr('name') == 1 && $(
	// 							'.assistant-popup').css('display') != 'none') {
	// 						$('.popup-main').append($('<div class="isassistant-message-reminder" name ="1">您有新的待办事件啦！</div>'));
	// 						$('.isassistant-message-reminder').animate({
	// 							right: '9px'
	// 						}, 'slow');
	// 					}
	// 					$('.popup-main1 ul li').eq(0).children().children().attr('class', 'info-unread4');
	// 				}
	// 				if (data.Data.NoticeCount == 0) {
	// 					$('.popup-main1 ul li').eq(1).children().children().attr('class', '');
	// 				} else {
	// 					if ($('.assistant-active').attr('name') == 1 && $('.info-active').eq(0).attr('name') == 2 && $(
	// 							'.assistant-popup').css('display') != 'none') {
	// 						$('.popup-main').append($('<div class="isassistant-message-reminder" name ="2">您有新的通知啦！</div>'));
	// 						$('.isassistant-message-reminder').animate({
	// 							right: '9px'
	// 						}, 'slow');
	// 					}
	// 					$('.popup-main1 ul li').eq(1).children().children().attr('class', 'info-unread2');
	// 				}
	// 				if (data.Data.ChatCount == 0) {
	// 					$('.popup-main1 ul li').eq(3).children().children().attr('class', '');
	// 				} else {
	// 					if ($('.assistant-active').attr('name') == 1 && $('.info-active').eq(0).attr('name') == 3 && $(
	// 							'.assistant-popup').css('display') != 'none') {
	// 						$('.popup-main').append($('<div class="isassistant-message-reminder"  name ="3">您有新的聊天信息啦！</div>'));
	// 						$('.isassistant-message-reminder').animate({
	// 							right: '9px'
	// 						}, 'slow');
	// 					}
	// 					$('.popup-main1 ul li').eq(3).children().children().attr('class', 'info-unread4');
	// 				}
	// 				if (data.Data.MessageCount == 0) {
	// 					$('.popup-main1 ul li').eq(2).children().children().attr('class', '');
	// 				} else {
	// 					if ($('.assistant-active').attr('name') == 1 && $('.info-active').eq(0).attr('name') == 4 && $(
	// 							'.assistant-popup').css('display') != 'none') {
	// 						$('.popup-main').append($('<div class="isassistant-message-reminder"  name ="4">您有新的系统消息啦！</div>'));
	// 						$('.isassistant-message-reminder').animate({
	// 							right: '9px'
	// 						}, 'slow');
	// 					}
	// 					$('.popup-main1 ul li').eq(2).children().children().attr('class', 'info-unread4');
	// 				}
	// 				if (data.Data.NewsCount == 0) {
	// 					$('.popup-main1 ul li').eq(4).children().children().attr('class', '');
	// 				} else {
	// 					if ($('.assistant-active').attr('name') == 1 && $('.info-active').eq(0).attr('name') == 5 && $(
	// 							'.assistant-popup').css('display') != 'none') {
	// 						$('.popup-main').append($('<div class="isassistant-message-reminder" name ="5">您有新的新闻资讯啦！</div>'));
	// 						$('.isassistant-message-reminder').animate({
	// 							right: '9px'
	// 						}, 'slow');
	// 					}
	// 					$('.popup-main1 ul li').eq(4).children().children().attr('class', 'info-unread4');
	// 				}
	// 				if (assistantRemindArr1.indexOf('0000')==-1) {
	// 					assistantRemindArr1.push('0000');
	// 				}
	// 			} else {
	// 				$('.assistant-info-prompt').hide();
	// 				$('.popup-main1 ul li').children().children().attr('class', '');
	// 				assistantRemindArr1.map(function(item, idx) {
	// 					if (item == '0000') {
	// 						assistantRemindArr1.splice(idx, 1);
	// 						cancelAnimationFrame(stop);
	// 						canvasFn('待机动作四');
	// 
	// 					}
	// 				});
	// 			}
	// 			assistantRemindArr = assistantRemindArr1;
	// 			if (assistantRemindArr && assistantRemindArr.length > 0) {
	// 				assistantStandby = false;
	// 			} else {
	// 				assistantStandby = true;
	// 			}
	// 		})
	// 
	// 	}, 4000)



	//初始化websocket
	ajaxN('PsnMgr/InfoCentre/GetWebSocketInfo', 'get', {}, function (data) {
		if (data.StatusCode == 200) {
			if (!window.WebSocket) {
				alert('您的浏览器不支持WebSocket，请选择其他的浏览器再尝试连接服务器');
			}
			var wsClient;
			var lockReconnect = false;
			var wsPushUrl = data.Data;
			$(function () {
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
				wsClient.onopen = function (e) {
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
				wsClient.onclose = function (e) {
					reconnectpush(wsPushUrl);
				}
				wsClient.onmessage = function (e) {
					try {
						var result = JSON.parse(e.data);
						console.log(result);
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
							$('.popup-nav-ul li').eq(0).children('b').attr('class', 'info-unread');
							//刷新
							// var assistantRemindArr1 = [];
							if (result.pushtype == '5') {
								scheduleRemindCount++;
								allRemindCount++;
								if (((onlyRemindType == 1 && $('.assistant-remind-count').attr('name') == 5) || $('.assistant-remind-count')
										.attr(
											'name') == -1) && $('.assistant-popup').css('opacity') == 0) {
									assistantRemindArr.push('0005');
									animationRemindFn(5);

								} else {
									if ($('.assistant-info-prompt').css('display') == 'block') {
										assistantRemindArr.push('0005');
										animationRemindFn();
										return;
									}
									if ($('.assistant-remind-count').css('display') == 'block') {
										canvasFn('绿球');
										var allRemindCount1 = allRemindCount;
										if (allRemindCount > 99) {
											allRemindCount1 = '...';
										}
										$('.assistant-remind-count ul').append($(' <li>' + allRemindCount1 + '</li>'));
										$('.assistant-remind-count ul').css('transform', 'translate(0, ' + -30 * ($(
												'.assistant-remind-count ul li')
											.length - 1) + 'px)');
										$('.assistant-remind-count ul').css('width', -30 * ($('.assistant-remind-count ul li').length - 1) + 'px)');
									} else if ($('.assistant-popup').css('opacity') == 0) {
										var allRemindCount1 = allRemindCount;
										if (allRemindCount > 99) {
											allRemindCount1 = '...';
										}
										$('.assistant-remind-count ul li').text(allRemindCount1);
									}
									onlyRemindType = 0;

								}


								if ($('.assistant-active').attr('name') == 1 && $('.info-active').eq(0).attr('name') == 4 && $(
										'.assistant-popup').css('display') != 'none') {
									$('.popup-main').append($('<div class="isassistant-message-reminder"  name ="4">您有新的系统消息啦~</div>'));
									$('.isassistant-message-reminder').animate({
										right: '9px'
									}, 'slow');
								}
								$('.popup-main1 ul li').eq(2).children().children().attr('class', 'info-unread4');
								if (!$('.popup-main1 ul li').eq(2).children().children().children().children().text()) {
									$('.popup-main1 ul li').eq(2).children().children().children().children().text('1');
								} else {
									var count1='';
									if ($('.popup-main1 ul li').eq(2).children().children().children().children().text() == '...') {
										count1 = '...';
									} else {
										 count1 = $('.popup-main1 ul li').eq(2).children().children().children().children().text() * 1 + 1;
										if (count1 > 99) {
											count1 = '...';
										}
									}

									$('.popup-main1 ul li').eq(2).children().children().children('span').append($(' <b>' + count1 + '</b>'));
									$('.popup-main1 ul li').eq(2).children().children().children('span').css('transform', 'translate(0, ' + -12 *
										($('.popup-main1 ul li').eq(2).children().children().children('span').children().length - 1) + 'px)');
								}
								$('.assistant-remind-count').attr('name', '5');
								ajaxN('PsnMgr/Schedule/GetScheduleRemindList', 'get', {
									ScheduleDate: serverTime.slice(0, 10)
								}, function (data) {
									scheduleRemindList = data.Data;
								})
							}
							if (result.pushtype == '1' || result.pushtype == '3' || result.pushtype == '4') {
								if (result.pushtype == '3') {
									MessageRemindCount++;
									allRemindCount++;
									if (((onlyRemindType == 1 && $('.assistant-remind-count').attr('name') == 2) || $('.assistant-remind-count')
											.attr('name') == -1) && $('.assistant-popup').css('opacity') == 0) {
										assistantRemindArr.push('0003');
										animationRemindFn(3);
									} else {
										if ($('.assistant-info-prompt').css('display') == 'block') {
											assistantRemindArr.push('0003');
											animationRemindFn();
											return;
										}
										onlyRemindType = 0;
									}
									$('.assistant-remind-count').attr('name', '2');
								}
								if (result.pushtype == '1') {

									NoticeRemindCount++;
									allRemindCount++;
									if (((onlyRemindType == 1 && $('.assistant-remind-count').attr('name') == 1) || $('.assistant-remind-count')
											.attr('name') == -1) && $('.assistant-popup').css('opacity') == 0) {
										assistantRemindArr.push('0001');
										animationRemindFn(1);
									} else {
										if ($('.assistant-info-prompt').css('display') == 'block') {
											assistantRemindArr.push('0001');
											animationRemindFn();
											return;
										}
										onlyRemindType = 0;
									}
									$('.assistant-remind-count').attr('name', '1');
								}
								if (result.pushtype == '4') {
									TodoRemindCount++;
									allRemindCount++;
									if (((onlyRemindType == 1 && $('.assistant-remind-count').attr('name') == 0) || $('.assistant-remind-count')
											.attr('name') == -1) && $('.assistant-popup').css('opacity') == 0) {
										assistantRemindArr.push('0000');
										animationRemindFn(0);
									} else {
										if ($('.assistant-info-prompt').css('display') == 'block') {
											assistantRemindArr.push('0000');
											animationRemindFn();
											return;
										}
										onlyRemindType = 0;
									}
									$('.assistant-remind-count').attr('name', '0');
								}

								if ($('.assistant-remind-count').css('display') == 'block' && onlyRemindType == 0) {
									canvasFn('绿球');
									var allRemindCount1 = allRemindCount
									if (allRemindCount > 99) {
										allRemindCount1 = '...';
									}
									$('.assistant-remind-count ul').append($(' <li>' + allRemindCount1 + '</li>'));
									$('.assistant-remind-count ul').css('transform', 'translate(0, ' + -30 * ($('.assistant-remind-count ul li')
										.length - 1) + 'px)');
								} else if ($('.assistant-popup').css('opacity') == 0) {
									var allRemindCount1 = allRemindCount
									if (allRemindCount > 99) {
										allRemindCount1 = '...';
									}
									$('.assistant-remind-count ul li').text(allRemindCount1);
								}
								var data = result.msgdata;
								if (data.TodoListCount > 0) {
									if ($('.assistant-active').attr('name') == 1 && $('.info-active').eq(0).attr('name') == 1 && $(
											'.assistant-popup').css('display') != 'none') {
										$('.popup-main').append($('<div class="isassistant-message-reminder" name ="1">您有新的待办事件啦~</div>'));
										$('.isassistant-message-reminder').animate({
											right: '9px'
										}, 'slow');
									}
									if (data.TodoListCount > 99) {
										data.TodoListCount = '...';
									}
									$('.popup-main1 ul li').eq(0).children().children().attr('class', 'info-unread4');
									if (!$('.popup-main1 ul li').eq(0).children().children().children().children().text()) {
										$('.popup-main1 ul li').eq(0).children().children().children().children().text(data.TodoListCount);
									} else {
										$('.popup-main1 ul li').eq(0).children().children().children('span').append($(' <b>' + data.TodoListCount +
											'</b>'));
										$('.popup-main1 ul li').eq(0).children().children().children('span').css('transform', 'translate(0, ' + -
											12 * ($('.popup-main1 ul li').eq(0).children().children().children('span').children().length - 1) +
											'px)');

									}

								} else {
									$('.popup-main1 ul li').eq(0).children().children().attr('class', '');
								}
								if (data.NoticeCount > 0) {
									if ($('.assistant-active').attr('name') == 1 && $('.info-active').eq(0).attr('name') == 2 && $(
											'.assistant-popup').css('display') != 'none') {
										$('.popup-main').append($('<div class="isassistant-message-reminder" name ="2">您有新的通知啦~</div>'));
										$('.isassistant-message-reminder').animate({
											right: '9px'
										}, 'slow');
									}
									$('.popup-main1 ul li').eq(1).children().children().attr('class', 'info-unread2');
									if (data.NoticeCount > 99) {
										data.NoticeCount =  '...';
									}
									if (!$('.popup-main1 ul li').eq(1).children().children().children().children().text()) {

										$('.popup-main1 ul li').eq(1).children().children().children().children().text(data.NoticeCount);
									} else {
										$('.popup-main1 ul li').eq(1).children().children().children('span').append($(' <b>' + data.NoticeCount +
											'</b>'));
										$('.popup-main1 ul li').eq(1).children().children().children('span').css('transform', 'translate(0, ' + -
											12 * ($('.popup-main1 ul li').eq(1).children().children().children('span').children().length - 1) +
											'px)');
									}
								} else {
									$('.popup-main1 ul li').eq(1).children().children().attr('class', '');
								}
								if (data.ChatCount > 0) {
									if ($('.assistant-active').attr('name') == 1 && $('.info-active').eq(0).attr('name') == 3 && $(
											'.assistant-popup').css('display') != 'none') {
										$('.popup-main').append($('<div class="isassistant-message-reminder"  name ="3">您有新的聊天信息啦~</div>'));
										$('.isassistant-message-reminder').animate({
											right: '9px'
										}, 'slow');
									}
									if (data.ChatCount > 99) {
										data.ChatCount =  '...';
									}
									$('.popup-main1 ul li').eq(3).children().children().attr('class', 'info-unread4');
									if (!$('.popup-main1 ul li').eq(3).children().children().children().children().text()) {
										$('.popup-main1 ul li').eq(3).children().children().children().children().text(data.ChatCount);
									} else {
										$('.popup-main1 ul li').eq(3).children().children().children('span').append($(' <b>' + data.ChatCount +
											'</b>'));
										$('.popup-main1 ul li').eq(3).children().children().children('span').css('transform', 'translate(0, ' + -
											12 * ($('.popup-main1 ul li').eq(3).children().children().children('span').children().length - 1) +
											'px)');
									}
								} else {
									$('.popup-main1 ul li').eq(3).children().children().attr('class', '');
								}
								if (data.MessageCount > 0) {
									if ($('.assistant-active').attr('name') == 1 && $('.info-active').eq(0).attr('name') == 4 && $(
											'.assistant-popup').css('display') != 'none') {
										$('.popup-main').append($('<div class="isassistant-message-reminder"  name ="4">您有新的系统消息啦~</div>'));
										$('.isassistant-message-reminder').animate({
											right: '9px'
										}, 'slow');
									}
									if (data.MessageCount > 99) {
										data.MessageCount =  '...';
									}
									$('.popup-main1 ul li').eq(2).children().children().attr('class', 'info-unread4');
									if (!$('.popup-main1 ul li').eq(2).children().children().children().children().text()) {
										$('.popup-main1 ul li').eq(2).children().children().children().children().text(data.MessageCount);
									} else {
										$('.popup-main1 ul li').eq(2).children().children().children('span').append($(' <b>' + data.MessageCount +
											'</b>'));
										$('.popup-main1 ul li').eq(2).children().children().children('span').css('transform', 'translate(0, ' + -
											12 * ($('.popup-main1 ul li').eq(2).children().children().children('span').children().length - 1) +
											'px)');
									}
								} else {
									$('.popup-main1 ul li').eq(2).children().children().attr('class', '');
								}
								if (data.NewsCount > 0) {
									if ($('.assistant-active').attr('name') == 1 && $('.info-active').eq(0).attr('name') == 5 && $(
											'.assistant-popup').css('display') != 'none') {
										$('.popup-main').append($('<div class="isassistant-message-reminder" name ="5">您有新的新闻资讯啦~</div>'));
										$('.isassistant-message-reminder').animate({
											right: '9px'
										}, 'slow');
									}
									if (data.NewsCount > 99) {
										data.NewsCount =  '...';
									}
									$('.popup-main1 ul li').eq(4).children().children().attr('class', 'info-unread4');
									if (!$('.popup-main1 ul li').eq(4).children().children().children().children().text()) {
										$('.popup-main1 ul li').eq(4).children().children().children().children().text(data.NewsCount);
									} else {
										$('.popup-main1 ul li').eq(4).children().children().children('span').append($(' <b>' + data.NewsCount +
											'</b>'));
										$('.popup-main1 ul li').eq(4).children().children().children('span').css('transform', 'translate(0, ' + -
											12 * ($('.popup-main1 ul li').eq(4).children().children().children('span').children().length - 1) +
											'px)');
									}

								} else {
									$('.popup-main1 ul li').eq(4).children().children().attr('class', '');
								}


							}

						}
						heartCheck.reset().start();
					} catch (e) {
						// console.log(e);
					}
				}
				wsClient.onerror = function (e) {
					reconnectpush(wsPushUrl);
				}
			}
			//客户端重连
			function reconnectpush(url) {
				if (lockReconnect) {
					return;
				}
				lockReconnect = true;
				setTimeout(function () {
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
				reset: function () {
					clearTimeout(this.timeoutObj);
					clearTimeout(this.serverTimeoutObj);
					return this;
				},
				start: function () {
					var self = this;
					this.timeoutObj = setTimeout(function () {
						//这里发送一个心跳，后端收到后，返回一个心跳消息，onmessage拿到返回的心跳就说明连接正常
						//obj.MessageType = 2;
						wsClient.send(JSON.stringify(obj1));
						self.serverTimeoutObj = setTimeout(function () {
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


	var remindTypetimer = '';
	//小助手提醒语和提醒动画
	function animationRemindFn(type) {
		if (type == 0 || type) {
			$('.assistant-remind-count').css('display', 'none');
			scheduleRemindCount = allRemindCount;
			TodoRemindCount = allRemindCount;
			NoticeRemindCount = allRemindCount;
			NewsRemindCount = allRemindCount;
			MessageRemindCount = allRemindCount;
			ChatRemindCount = allRemindCount;
		}
		// console.log(assistantRemindArr);
		if (assistantRemindArr && assistantRemindArr.length > 0 && $('.assistant-popup').css('opacity') == 0 && $(
				'.assistant-remind-count').css('display') == 'none') {
			PromptTimerConut = 0;
			var allRemindCount1 = allRemindCount
			if (allRemindCount > 99) {
				allRemindCount1 = '...';
			}
			$('.assistant-remind-count ul li').text(allRemindCount1);

			if (assistantRemindArrOld.length == 0) {
				assistantRemindArrOld = assistantRemindArr;
			} else {
				assistantRemindArr.map(function (item) {
					if (assistantRemindArrOld.indexOf(item) == -1) {
						assistantRemindArrOld.push(item);
					}
				})
			}
			$('.assistant-remind-ul li').remove();
			$('.assistant-info-prompt').show();
			if (assistantRemindArr.indexOf('0005') != -1) {
				if (scheduleRemindCount > 99) {
					scheduleRemindCount = '...';
				}
				$('.assistant-remind-ul').append($('<li>您有<b name="2">' + scheduleRemindCount + '</b>个日程提醒</li>'));
			}
			if (assistantRemindArr.indexOf('0000') != -1) {
				if (TodoRemindCount > 99) {
					TodoRemindCount = '...';
				}
				$('.assistant-remind-ul').append($('<li>您有<b name="0">' + TodoRemindCount + '</b>个新的待办事项</li>'));
			}
			if (assistantRemindArr.indexOf('0001') != -1) {
				if (NoticeRemindCount > 99) {
					NoticeRemindCount = '...';
				}
				$('.assistant-remind-ul').append($('<li>您有<b name="1">' + NoticeRemindCount + '</b>个通知未阅读</li>'));
			}
			if (assistantRemindArr.indexOf('0004') != -1) {
				if (NewsRemindCount > 99) {
					NewsRemindCount = '...';
				}
				$('.assistant-remind-ul').append($('<li>您有<b name="4">' + NewsRemindCount + '</b>个新闻可资讯</li>'));
			}
			if (assistantRemindArr.indexOf('0003') != -1) {
				if (MessageRemindCount > 99) {
					MessageRemindCount = '...';
				}
				$('.assistant-remind-ul').append($('<li>您有<b name="2">' + MessageRemindCount + '</b>个新的系统消息</li>'));
			}
			if (assistantRemindArr.indexOf('0002') != -1) {
				if (ChatRemindCount > 99) {
					ChatRemindCount = '...';
				}
				$('.assistant-remind-ul').append($('<li>您有<b name="3">' + ChatRemindCount + '</b>个新的聊天消息</li>'));
			}
			assistantRemindArr = [];
			if ($('.assistant-remind-ul li').length == 1) {
				assistantStandby = false;
				clearInterval(remindtimer);
				clearInterval(remindtimer1);
				clearInterval(remindTypetimer);
				remindtimer = setTimeout(function () {
					$('.assistant-info-prompt').hide();
					$('.assistant-remind-ul li').remove();
					assistantRemindArrOld = [];
					scheduleRemindCount = 0;
					TodoRemindCount = 0;
					NoticeRemindCount = 0;
					ChatRemindCount = 0;
					MessageRemindCount = 0;
					NewsRemindCount = 0;

					if ($('.assistant-popup').css('opacity') == 0) {
						$('.assistant-remind-count').show();
					}
					clearInterval(assistantPromptTimer);
				}, 15000)


				if (assistantRemindArrOld[0] == '0000') {
					if (sleepState == 1) {
						sleepState = 0;
						wakeupState = 1;
						cancelAnimationFrame(stop);
						canvasFn('唤醒');
						remindTypetimer = setTimeout(function () {
							assistantStandby = false;
							canvasFn('摇铃');
						}, 6000)
					} else {
						cancelAnimationFrame(stop);
						assistantStandby = false;
						canvasFn('摇铃');
					}


				}
				if (assistantRemindArrOld[0] == '0001') {
					if (sleepState == 1) {
						sleepState = 0
						wakeupState = 1;
						cancelAnimationFrame(stop);
						canvasFn('唤醒');
						remindTypetimer = setTimeout(function () {
							cancelAnimationFrame(stop);
							assistantStandby = false;
							canvasFn('喇叭');
						}, 6000)
					} else {
						assistantStandby = false;
						cancelAnimationFrame(stop);
						canvasFn('喇叭');
					}
				}
				if (assistantRemindArrOld[0] == '0002') {
					if (sleepState == 1) {
						sleepState = 0
						wakeupState = 1;
						cancelAnimationFrame(stop);
						canvasFn('唤醒');
						remindTypetimer = setTimeout(function () {
							cancelAnimationFrame(stop);
							assistantStandby = false;
							canvasFn('摇铃');
						}, 6000)
					} else {
						cancelAnimationFrame(stop);
						assistantStandby = false;
						canvasFn('摇铃');
					}
				}
				if (assistantRemindArrOld[0] == '0003') {
					if (sleepState == 1) {
						sleepState = 0
						wakeupState = 1;
						cancelAnimationFrame(stop);
						canvasFn('唤醒');
						remindTypetimer = setTimeout(function () {
							assistantStandby = false;
							cancelAnimationFrame(stop);
							canvasFn('摇铃');
						}, 6000)
					} else {
						cancelAnimationFrame(stop);
						assistantStandby = false;
						canvasFn('摇铃');
					}
				}
				if (assistantRemindArrOld[0] == '0004') {
					if (sleepState == 1) {
						sleepState = 0
						wakeupState = 1;
						cancelAnimationFrame(stop);
						canvasFn('唤醒');
						remindTypetimer = setTimeout(function () {
							assistantStandby = false;
							canvasFn('摇铃');
						}, 6000)
					} else {
						cancelAnimationFrame(stop);
						assistantStandby = false;
						canvasFn('摇铃');
					}
				}
				if (assistantRemindArrOld[0] == '0005') {
					if (sleepState == 1) {
						sleepState = 0
						wakeupState = 1;
						cancelAnimationFrame(stop);
						canvasFn('唤醒');
						remindTypetimer = setTimeout(function () {
							assistantStandby = false;
							cancelAnimationFrame(stop);
							canvasFn('台历');
						}, 6000)
					} else {
						cancelAnimationFrame(stop);
						assistantStandby = false;
						canvasFn('台历');
					}
				}

			} else if ($('.assistant-remind-ul li').length > 1) {
				onlyRemindType = 0;
				clearInterval(remindTypetimer);
				var count = 0;
				clearInterval(remindtimer);
				clearInterval(remindtimer1);
				remindtimer = setInterval(function () {
					$('.assistant-remind-ul').css('transition', 'all 1s ease');
					$('.assistant-remind-ul').css('transform', 'translate(0,-25px)');
					count++;
					// console.log(count);
					if (count >= 4) {
						clearInterval(remindtimer);
						$('.assistant-info-prompt').hide();
						$('.assistant-remind-ul li').remove();
						assistantRemindArrOld = [];
						scheduleRemindCount = 0;
						TodoRemindCount = 0;
						NoticeRemindCount = 0;
						ChatRemindCount = 0;
						MessageRemindCount = 0;
						NewsRemindCount = 0;
						clearInterval(assistantPromptTimer);
						if ($('.assistant-popup').css('opacity') == 0) {
							$('.assistant-remind-count').show();
						}
					} else {
						setTimeout(function () {
							$('.assistant-remind-ul').append($('<li>' + $('.assistant-remind-ul li').eq(0).html() + '</li>'));
							$('.assistant-remind-ul li').eq(0).remove();
							$('.assistant-remind-ul').css('transition', 'all 0s ');
							$('.assistant-remind-ul').css('transform', 'translate(0,0)');
						}, 2000)
					}


				}, 4000)

			}
			console.log('onlyRemindType：', onlyRemindType);
		}

	}

	//教务窗口模块

	function workSparceFn() {
		$('.assistant-popup-loading').show();
		ajaxN('PsnMgr/WorkSpace/GetWorkSpaceList', 'get', {
			UserClass: UserClass
		}, function (data) {
			$('.assistant-popup-loading').hide();
			if (data.StatusCode == 200) {
				if (data.Data && data.Data.length > 0) {
					data.Data.map(function (item) {
						if (item.ModuleName == '发布通知') {
							$('.assistant-deliver-notice').css('display', 'inline-block');
							$('.assistant-deliver-notice').off().click(function () {
								if (item.PCLinkType == 1) {
									if (item.SysID == '000') {
										var tabURL = PsnMgrMainServerAddr + item.PCLink;
										window.open(tabURL, "_blank");
									} else {
										getSysWeb(item.SysID, function (data) {
											var tabURL = data + item.PCLink + '?lg_tk=' + PsnMgrToken;
											window.open(tabURL, "_blank");
										})

									}

								}

							})
						}
						if (item.ModuleName == '发布问卷调查') {
							$('.assistant-deliver-questionnaire').css('display', 'inline-block');
							$('.assistant-deliver-questionnaire').off().click(function () {
								if (item.PCLinkType == 1) {
									if (item.SysID == '000') {
										var tabURL = PsnMgrMainServerAddr + item.PCLink;
										window.open(tabURL, "_blank");
									} else {
										getSysWeb(item.SysID, function (data) {
											var tabURL = data + item.PCLink + '?lg_tk=' + PsnMgrToken;
											window.open(tabURL, "_blank");

										})
									}
								}
							})
						}
						if (item.ModuleName == '学生档案管理') {
							$('.assistant-student-admin').css('display', 'inline-block');
							$('.assistant-student-admin').off().click(function () {
								if (item.PCLinkType == 1) {
									if (item.SysID == '000') {
										var tabURL = PsnMgrMainServerAddr + item.PCLink;
										window.open(tabURL, "_blank");
									} else {
										ajaxN('PsnMgr/InfoCenter/GetSystemWeb', 'get', {
											SysID: item.SysID,
											SubjectID: item.SubjectID
										}, function (data) {
											var tabURL = data.Data + item.PCLink;
											window.open(tabURL, "_blank");
										})
									}
								}
							})
						}
						if (item.ModuleName == '教学班管理') {
							$('.assistant-teaClass-admin').css('display', 'inline-block');
							$('.assistant-teaClass-admin').off().click(function () {
								if (item.PCLinkType == 1) {
									if (item.SysID == '000') {
										var tabURL = PsnMgrMainServerAddr + item.PCLink;
										window.open(tabURL, "_blank");
									} else {
										ajaxN('PsnMgr/InfoCenter/GetSystemWeb', 'get', {
											SysID: item.SysID,
											SubjectID: item.SubjectID
										}, function (data) {
											var tabURL = data.Data + item.PCLink;
											window.open(tabURL, "_blank");
										})
									}
								}
							})
						}
					})
				}
				if (data.Data && data.Data.length > 4) {
					$('.popup-main5 ul').css('padding', '0 0 0 2%');
					$('.popup-main5 ul').css('text-align', 'left');
					$('.popup-main5 ul li').css('margin', '30px 2% 0 0');
				}
				if (data.Data && data.Data.length > 8) {
					$('.popup-main5').css('overflow-y', 'scroll');
				}
			}

		})



	}




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
	//消息中心模块下的选项卡第一个
	var todoLsitTotalCount = 0;
	var todoType = '';

	function todoFn(page, type) {
		if (!initialization) {
			initializationFn();
		}
		ajaxN('PsnMgr/InfoCentre/GetTodoListSortCount', 'get', {}, function (data) {
			$('.todo-type-ul li').remove();
			if (data.Data.length > 1) {
				data.Data.map(function (item) {
					$('.todo-type-ul').append($('<li name=' + item.InfoSourceName + ' data-id=' + item.InfoSourceID + ' data-num=' +
						item.InfoSourceID + ' >' + item.InfoSourceName + '<b>(' + item.AllCount + ')</b></li>'))
				})
			}
		})
		todoType = type;
		var pager = '';
		if (page == 'M') {
			pager = page;
			page = 0;
		} else {
			$('.popup-main2').hide();
		}
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
		todoLsitTotalCount = 0;
		$('.assistant-popup-loading').show();
		ajaxN(todoUrl, 'get', todoData, function (data) {
			$('.pager1').remove();
			$('.pager2').remove();
			$(".pager3").remove();
			$('.infoCenter-empty').hide();
			$("div").remove(".todo-div");
			if (data.StatusCode == 200) {
				$('.todo strong').text(data.Data.TotalCount);
				todoLsitTotalCount = data.Data.TotalCount;
				serverTime = data.Data.ServerTime;
				//获取服务器时间；
				// if(pager!='M'){
				// personalScheduleDate = data.Data.ServerTime.slice(0, 10); //个人日程的日期选择的初始时间
				// $('.schedule-choose-date').text(personalScheduleDate); //个人日程初始化时间
				// // 日程初始化
				// personalScheduleFn(personalScheduleDate);
				// }

				todoLsit = data.Data.Children;
				if (todoLsit && todoLsit.length == 0) {
					$('.infoCenter-empty').show();
					$('.infoCenter-empty-text').text($('.info-active').eq(1).text());
					$('.assistant-popup-loading').hide();
					return;
				} else {
					$('.todo').css('display', 'block');
				}
				$('.assistant-popup-loading').show();
				assistantTimeUpdata = false;
				ajaxN('PsnMgr/InfoCentre/RecordLastReadTime', 'post', {
					ModuleID: 1,
				}, function () {
					assistantTimeUpdata = true;
					if ($('.assistant-popup').css('opacity') == '0') {
						againCountRemindFn();
					} else {
						againCountunreadFn();
					}
				})
				$('.infoCenter-empty').hide();
				$("div").remove(".todo-div");
				$('.assistant-popup-loading').hide();
				todoLsit.map(function (item, idx) {
					var dateTime = Date.parse(item.ExpireTime) - Date.parse(serverTime);
					dateTime = dateTime / 1000 / 60;
					var classname6 = 'todo-div-name';
					if (dateTime <= 2 * 24 * 60 && dateTime > 0) {
						var todoclass = 'todo-dead-time';
						classname6 = '"todo-div-name todo-div-name1"';
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
					var todoDivClass = ' ';
					if (item.AddScheduleID != '') {
						var todoDivClass = '"todo-div todo-div2"';
					} else {
						var todoDivClass = '"todo-div todo-div1"';
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
					// item.ScheduleContent = item.ScheduleContent.slice(0, item.ScheduleContent.length - 2);
					if (item.InfoContent && item.InfoContent.length > 69) {
						item.InfoContentSmall = htmlEncode(item.InfoContent.slice(0, 68) + '...');
						item.InfoContent = '"' + item.InfoContent + '"';
					} else {
						item.InfoContentSmall = htmlEncode(item.InfoContent);
						item.InfoContent = '""';
					}
					todoDiv = $(
						'<div  class=' + todoDivClass + ' data-PCLinkType=' + item.PCLinkType + ' data-SysID=' + item.SysID +
						' data-url=' +
						item
						.PCLink +
						'><span></span><span class=' +
						fontColor + '>' + item.InfoSourceName +
						'</span><span class="todo-div-content" title=' + item.InfoContent + ' > ' + item.InfoContentSmall +
						'</span><span class="todo-add-schedule" data-time="' + item.ExpireTime + '" data-id ="' + item.InfoID +
						'" data-InfoSourceName= "' + item.InfoSourceName +
						'" data-ScheduleContent= "' +
						item.ScheduleContent + '"  data-PCLinkType= "' + item.PCLinkType +
						'"   data-BelongInfoID= "' + item.InfoID +
						'"   data-PCLink= "' + item.PCLink +
						'"   data-AndroidLink= "' + item.AndroidLink +
						'"   data-IOSLink= "' + item.IOSLink + '"   data-SysID= "' + item.SysID +
						'"   ><i></i>加入日程</span><span class=' + classname6 + ' >' + item.timeSlot +
						'<b class=' + todoclass + '  >(' + dateTime +
						')</b></span ><span class="todo-added">已加入行程<i title="查看日程" class="goto-schedule" data-id =' + item.AddScheduleID +
						' ></i></span></div>'
					);
					$('.todo-box ').append(todoDiv);
				})

				if ($('.todo-box .todo-div') && $('.todo-box .todo-div').length > 6 || (page > 0 && $('.todo-box .todo-div') && $(
						'.todo-box .todo-div').length > 5)) {
					var scrollPX = 17 - ($('.todo-box')[0].offsetWidth - $('.todo-box')[0].scrollWidth) - 3 + 'px'; //计算滚动条大小
					$('.todo-div-name').css('margin-right', scrollPX);
					// $('.todo-div-name').css('width', '248px');
					// $('.todo-div-content').css('transform', 'translate(-355px, -50%)');
					// console.log($('.todo-box .todo-div').length);
				} else {
					$('.todo-div-name').css('margin-right', '17px');
					// $('.todo-div-name').css('width', '268px');
					// $('.todo-div-content').css('transform', 'translate(-359px, -50%)');
				}
				$('.todo-box').css('overflow-y', 'auto');
				$('.todo-added').off().click(function (event) {
					$this = $(this).children('.goto-schedule');
					ajaxN('/PsnMgr/Schedule/GetScheduleInfoByID', 'get', {
						ScheduleID: $this.attr('data-id')
					}, function (data) {
						popupNavChoose = 2;
						$('.popup-nav-list ul li').attr('class', '');
						$('.popup-nav-list ul li').eq(1).attr('class', 'assistant-active');
						$('.popup-main-nav').hide();
						$('.popup-main-nav').eq(1).show();
						$('.assistant-popup-loading').hide();
						$('.personal-schedule-ul1').hide();
						$('.personal-schedule-ul2').hide();
						$('.personal-schedule-ul3').hide();
						personalScheduleDate = data.Data.ScheduleDate;
						$('.schedule-choose-date').text(data.Data.ScheduleDate);
						$('.schedule-choose-week').text(dataChangeTerm(termStartDate, data.Data.ScheduleDate));
						personalScheduleFn(personalScheduleDate);
						if (data.Data.ScheduleDate == dateChangeFn(serverTime.slice(0, 10), 1)) {
							$('.schedule-choose-day i:eq(1)').css('background', 'url(' + PsnMgrLgAssistantAddr +
								'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_4.png)');
							$('.schedule-choose-day i:eq(2)').css('background', 'url(' + PsnMgrLgAssistantAddr +
								'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_5.png)');
							$('.schedule-choose-day i').css('color', '#0e95ed');
							$('.schedule-choose-day i:eq(0)').css('background', 'url(' + PsnMgrLgAssistantAddr +
								'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_1.png)');
							$('.schedule-choose-day i:eq(1)').css('color', '#fff');
						} else if (data.Data.ScheduleDate == dateChangeFn(serverTime.slice(0, 10), 2)) {
							$('.schedule-choose-day i:eq(1)').css('background', 'url(' + PsnMgrLgAssistantAddr +
								'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_3.png)');
							$('.schedule-choose-day i:eq(2)').css('background', 'url(' + PsnMgrLgAssistantAddr +
								'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_6.png)');
							$('.schedule-choose-day i').css('color', '#0e95ed');
							$('.schedule-choose-day i:eq(0)').css('background', 'url(' + PsnMgrLgAssistantAddr +
								'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_1.png)');
							$('.schedule-choose-day i:eq(2)').css('color', '#fff');
						} else if (data.Data.ScheduleDate == serverTime.slice(0, 10)) {
							$('.schedule-choose-day i:eq(1)').css('background', 'url(' + PsnMgrLgAssistantAddr +
								'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_3.png)');
							$('.schedule-choose-day i:eq(2)').css('background', 'url(' + PsnMgrLgAssistantAddr +
								'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_5.png)');
							$('.schedule-choose-day i').css('color', '#0e95ed');
							$('.schedule-choose-day i:eq(0)').css('background', 'url(' + PsnMgrLgAssistantAddr +
								'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_2.png)');
							$('.schedule-choose-day i:eq(0)').css('color', '#fff');
						} else {
							$('.schedule-choose-day i:eq(1)').css('background', 'url(' + PsnMgrLgAssistantAddr +
								'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_3.png)');
							$('.schedule-choose-day i:eq(2)').css('background', 'url(' + PsnMgrLgAssistantAddr +
								'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_5.png)');
							$('.schedule-choose-day i').css('color', '#0e95ed');
							$('.schedule-choose-day i:eq(0)').css('background', 'url(' + PsnMgrLgAssistantAddr +
								'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_1.png)');
						}
						var li = data.Data;
						$('.schedule-setting-popup div').eq(0).hide();
						$('.schedule-setting-popup div').eq(1).css('right', '-680px');
						$(".schedule-setting-popup").hide();
						$('.schedule-setting-true').attr('name', '11');
						$('.schedule-setting-true').attr('data-id', li.ScheduleID);
						$('.schedule-setting-true').attr('data-PCLinkType', li.PCLinkType);
						$('.schedule-setting-true').attr('data-BelongInfoID', li.BelongInfoID);
						$('.schedule-setting-true').attr('data-PCLink', li.PCLink);
						$('.schedule-setting-true').attr('data-AndroidLink', li.AndroidLink);
						$('.schedule-setting-true').attr('data-IOSLink', li.IOSLink);
						$('.schedule-setting-true').attr('data-SysID', li.SysID);
						$('.schedule-change-type').text('编辑日程');
						$('.schedule-edit-name').text('自定义');
						$('.schedule-edit-popup').hide();
						if (li.ScheduleType == 0 || li.ScheduleType == 10) {
							$('.schedule-edit-popup').show();
							$('.schedule-type-name').hide();
							$('.schedule-type  i').attr('class', '');
							$('.schedule-type i').eq(3).attr('class', 'schedule-type-true');
							if (li.ScheduleType == 0) {
								$('.schedule-edit-name').text('课程');
								$('.schedule-edit-name').attr('data-scheduleTypeName', li.ScheduleTypeName)
							}
							if (li.ScheduleType == 10) {
								$('.schedule-edit-name').text('监考');
							}
						} else {
							$('.schedule-type i').attr('class', '');
							$('.schedule-type i').eq(li.ScheduleType / 2 - 1).attr('class', 'schedule-type-true');
							if (li.ScheduleType == 8) {
								$('.schedule-type-name').val(li.ScheduleTypeName);
							} else {
								$('.schedule-type-name').val('');
							}
							// $('.schedule-clocks-setting').attr('name');
							// $('.schedule-clocks-time').val();
							// $('.schedule-input-clocks').attr('name');
						};
						$('#lgAssistant-next3').val(li.ScheduleDate);
						$('#schedule-test1').val(li.StartTime.slice(0, 2) + '时' + li.StartTime.slice(3, 5) + '分');
						if (li.StartTime == li.EndTime) {
							$('#schedule-test2').val('');
						} else {
							$('#schedule-test2').val(li.EndTime.slice(0, 2) + '时' + li.EndTime.slice(3, 5) + '分');
						}
						// console.log(li.attr('data-scheduleContent'));
						$('.schedule-topic').val(li.ScheduleContent);
						$('.schedule-topic-length').text($('.schedule-topic').val().length + '/50');
						$('.schedule-topic').css('color', '#333');
						if (li.RemindFlag == -1) {
							$('.schedule-clocks-time').val('30');
							$('.schedule-clocks-setting').css('background', 'url(' + PsnMgrLgAssistantAddr +
								'/PsnMgr/LgAssistant/images/复选_1.png) no-repeat');
							$('.schedule-clocks-setting').attr('name', 'false');
							$('.schedule-clocks-setting1').hide();
						} else {
							$('.schedule-clocks-setting').css('background', 'url(' + PsnMgrLgAssistantAddr +
								'/PsnMgr/LgAssistant/images/复选_2.png) no-repeat');
							$('.schedule-clocks-setting').attr('name', 'true');
							if (li.RemindTime == 0) {
								$('.schedule-clocks-time').val('30');
								$('.schedule-clocks-setting1 i').eq(0).attr('class', 'schedule-input-clocks');
								$('.schedule-clocks-setting1 i').eq(1).attr('class', '');
							} else {
								$('.schedule-clocks-time').val(li.RemindTime);
								$('.schedule-clocks-setting1 i').eq(1).attr('class', 'schedule-input-clocks');
								$('.schedule-clocks-setting1 i').eq(0).attr('class', '');
							}
							$('.schedule-clocks-setting1').show();
						}
						$('.schedule-setting-popup').show();
						$('.schedule-setting-popup div').eq(1).animate({
							right: '0'
						}, 'slow', function () {
							$('.schedule-setting-popup div').eq(0).show();
						});
					})
					event.stopPropagation();
				})
				$('.todo-add-schedule').off().click(function (event) {
					// $('.popup-nav-list ul li').attr('class', '');
					// $('.popup-nav-list ul li').eq(1).attr('class', 'active');
					// $('.popup-main1').hide();
					var $this = $(this);
					$('schedule-setting-true').attr('name', '');
					$('schedule-setting-true').attr('data-id', '');
					$('.schedule-edit-popup').hide();
					$('.popup-main2').show();
					$('.schedule-type-name').show();
					$('.schedule-change-type').text('新建日程');
					$('.schedule-edit-name').text('自定义');
					$('.schedule-type-name').text('');
					$('.schedule-clocks-time').val(30);
					// personalScheduleFn(getDate('03'));
					$('.schedule-setting-popup').show();
					$('.schedule-clocks-setting1').children('i').attr('class', '');
					$('.schedule-clocks-setting1').eq(1).children('i').attr('class', 'schedule-input-clocks');
					$('.schedule-setting-popup div').eq(1).animate({
						right: '0'
					}, 'slow', function () {
						$('.schedule-setting-popup div').eq(0).show();
					});

					nowDate = new Date();
					nowHours = conver(nowDate.getHours());
					nowinutes = conver(nowDate.getMinutes());
					date1 = nowHours + '时' + nowinutes + '分';
					$('#schedule-test1').val(date1);
					$('#schedule-test2').val('');

					if (Date.parse($this.attr('data-time').slice(0, 10)) >= Date.parse(dateChangeFn(serverTime.slice(0, 10), 2))) {
						$('#lgAssistant-next3').val(dateChangeFn($this.attr('data-time').slice(0, 10), -2));
					} else if (Date.parse($this.attr('data-time').slice(0, 10)) >= Date.parse(dateChangeFn(serverTime.slice(0, 10),
							1))) {
						$('#lgAssistant-next3').val(dateChangeFn($this.attr('data-time').slice(0, 10), -1));
					} else {
						$('#lgAssistant-next3').val($this.attr('data-time').slice(0, 10));
					}
					$('.schedule-setting-popup div').eq(1).animate({
						right: '0'
					}, 'slow', function () {
						$('.schedule-setting-popup div').eq(0).show();
					});
					$('.popup-main22').hide();
					if ($this.attr('data-InfoSourceName') == '备课') {
						$('.schedule-type  i').attr('class', '');
						$('.schedule-type i').eq(0).attr('class', 'schedule-type-true');
					} else if ($this.attr('data-InfoSourceName') == '会议') {
						$('.schedule-type  i').attr('class', '');
						$('.schedule-type i').eq(1).attr('class', 'schedule-type-true');
					} else if ($this.attr('data-InfoSourceName') == '重要活动') {
						$('.schedule-type  i').attr('class', '');
						$('.schedule-type i').eq(2).attr('class', 'schedule-type-true');
					} else {
						$('.schedule-type  i').attr('class', '');
						$('.schedule-type i').eq(3).attr('class', 'schedule-type-true');
						$('.schedule-type-name').val($this.attr('data-InfoSourceName'));
					}
					$('.schedule-setting-true').attr('name', '22');
					$('.schedule-setting-true').attr('data-id', $this.attr('data-id'));
					$('.schedule-setting-true').attr('data-PCLinkType', $this.attr('data-PCLinkType'));
					$('.schedule-setting-true').attr('data-BelongInfoID', $this.attr('data-BelongInfoID'));
					$('.schedule-setting-true').attr('data-PCLink', $this.attr('data-PCLink'));
					$('.schedule-setting-true').attr('data-AndroidLink', $this.attr('data-AndroidLink'));
					$('.schedule-setting-true').attr('data-IOSLink', $this.attr('data-IOSLink'));
					$('.schedule-setting-true').attr('data-SysID', $this.attr('data-SysID'));
					$('.schedule-setting-true').attr('data-page', page);
					// $('.schedule-topic').val($(this).attr('data-ScheduleContent'));
					if ($this.attr('data-ScheduleContent').length == 0) {
						$('.schedule-topic').val('请输入日程内容...');
						$('.schedule-topic').css('color', '#999');
					} else {
						$('.schedule-topic').val($this.attr('data-ScheduleContent'));
						$('.schedule-topic').css('color', '#333');
					}
					if ($('.todo-div') && $('.todo-div').length == 0) {
						$('.infoCenter-empty').show();
						$('.infoCenter-empty-text').text($('.info-active').eq(1).text());
					}
					$('.schedule-topic-length').text($('.schedule-topic').val().length + '/50');
					event.stopPropagation();
				})
				$('.todo-div').off().click(function () {
					var $this = $(this);
					if ($(this).attr('data-PCLinkType') == 1) {
						getSysIP($(this).attr('data-SysID'), function (data) {
							var todoURL = data + $this.attr('data-url');
							window.open(todoURL, '_blank');
						})
					} else {
						if ($(this).attr('data-SysID') == 621 || $(this).attr('data-SysID') == 622 || $(this).attr('data-SysID') ==
							623) {
							$('.assistant-popup-loading').show();
							commonOpenClient($this.attr('data-url'));
							setTimeout(function () {
								$('.assistant-popup-loading').hide();
							}, 3000)

						}
					}
				})
				if (todoLsitTotalCount > 15) {
					$('.todo-box ').append($('<div class="frame_pager_center pager1 "></div>'));
					setTodoPager(todoLsitTotalCount, page);
				}
				if (pager != 'M') {
					$('.infoCenter-empty').hide();
					$('.todo-box').scrollTop(0);
					$('.message').css('display', 'none');
					$('.chat').css('display', 'none');
					$('.notice').css('display', 'none');
					$('.news').css('display', 'none');
					$('.todo').css('display', 'block');
					if (todoLsitTotalCount == 0) {
						// $('.notice-clear').hide();
						$('.infoCenter-empty').show();
						$('.infoCenter-empty-text').text($('.info-active').eq(1).text());
					} else {
						$('.infoCenter-empty').hide();
					}
				}
				// console.log(data);



			}
			$('.assistant-popup-loading').hide();
		})


	};


	// 分页函数调用
	function handlePaginationClick1(new_page_index, pagination_container) {
		setTodoPager(todoLsitTotalCount, new_page_index);
		todoFn(new_page_index, todoType);
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
		});
		$('.pager1 .pagination .pagination_go_button').css('position', 'relative');
		$('.pager1 .pagination .pagination_go_button').append($('<div class="pager-click-shadow pager-click-shadow1"></div>'))
		$('.pager-click-shadow1').off().click(function (ev) {
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
					assistantTipsFn('输入页面超过最大页码了哦~');
					$(this).parent().parent().children('.pagination_go_input').val(' ');
					normal('.pager1 .pagination .pagination_go_input', 3);
				}

			} else {
				$(this).parent().parent().children('.pagination_go_input').val(' ');
				assistantTipsFn('输入的不是有效页码哦~');
				normal('.pager1 .pagination .pagination_go_input', 3);
			}



			ev.stopPropagation();

		})

	};

	//消息中心模块下的选项卡第二个
	var messageLsitTotal = 0;

	function noticeFn(page, state) {
		if (!initialization) {
			initializationFn('message');

			return;
		}

		$('.pager1').remove();
		$('.pager2').remove();
		$(".pager3").remove();
		$('.infoCenter-empty').hide();
		$("div").remove(
			".message-div");
		$('.assistant-popup-loading').show();
		ajaxN('PublicInfo/Notice/ReceiveNotice/GetNoticeList', 'get', {
			URL: messageURL,
			PageIndex: page + 1,
			PageSize: 15
		}, function (data) {
			if (data.StatusCode == 200) {
				$('.assistant-popup-loading').hide();
				messageLsit = data.Data.Item.NoticeList;
				// console.log(messageLsit);
				// messageLsit = [{
				// 	"URL": "http://192.168.129.75:0/Message/Message.html?UserID=lcq&NoticeID=12",
				// 	"NoticeTitle": "广东实验中学附属天河学校科普基地开放日活动公告",
				// 	"PublisherName": "李四",
				// 	"EffectTime": "2019-09-29 11:12:58",
				// 	"NoticeID": "12",
				// 	"IsRead": 0
				// }];

				if ($('.popup-main1 ul li').eq(1).children().children().children().children().text()) {
					$('.popup-main1 ul li').eq(1).children().children().children().children().text(data.Data.Item.UnReadCount);
				}
				lastRemindNum = data.Data.Item.UnReadCount;
				messageLsitTotal = data.Data.Item.Total;
				if (messageLsit != null) {
					assistantTimeUpdata = false;
					ajaxN('PsnMgr/InfoCentre/RecordLastReadTime', 'post', {
						ModuleID: 2,
					}, function () {
						assistantTimeUpdata = true;
						//、11111111111111111111111111111111111111
						if ($('.assistant-popup').css('opacity') == '0') {
							againCountRemindFn();
						} else {
							againCountunreadFn();
						}
					})
					if ($('.message').css('display') == 'none' && state) {
						return;
					} else {
						$('.infoCenter-option span strong').text(data.Data.Item.UnReadCount);
						$('.message').css('display', 'block');
					}
					messageLsit.map(function (item, idx) {

						var classname1 = '';
						var classname2 = '';
						if (item.IsRead == '0') {
							classname1 = 'new';
							classname2 = 'newfont';
						};
						var NoticeTitle = '""';
						item.EffectTime = item.EffectTime.slice(0, 16);
						if (item.NoticeTitle && item.NoticeTitle.length > 29) {
							NoticeTitle = '"' + item.NoticeTitle + '"';
							item.NoticeTitle = item.NoticeTitle.slice(0, 28) + '...';
						}
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
					// if ($('.message-box .message-div') && ($('.message-box .message-div').length > 6 || ($(
					// 		'.message-box .message-div').length > 5 && page > 0))) {
					// 	$('.infoCenter-option-box').css('overflow-y', 'scroll');
					// } else {
					// 	$('.infoCenter-option-box').css('overflow-y', 'hidden');
					// }
					$('.infoCenter-option-box').css('overflow-y', 'auto');
					// if (messageLsit && messageLsit.length > 9) {
					// 	$('.message-div-time').css('width', '144px');
					// 	$('.message-div-name').css('margin-right', '20px');
					// } else {
					// 	$('.message-div-name').css('width', '136px');
					// 	$('.message-div-time').css('margin-right', '25px');
					// }

					if (messageLsitTotal > 15) {
						$('.message-box ').append($('<div class="frame_pager_center pager3 "></div>'));
						setMessagePager(messageLsitTotal, page);
					}
				} else {
					$('.infoCenter-empty').show();
					$('.infoCenter-empty-text').text($('.info-active').eq(1).text());
					$('.assistant-popup-loading').hide();
				}

				$('.message-box').scrollTop(0);
				$('.message-div').off().click(function () {
					window.open($(this).attr('data-url') + '&lg_tk=' + PsnMgrToken, '_blank');
					setTimeout(function () {
						noticeFn(page, 'update');
					}, 3000)
				})
			} else {
				assistantTipsFn(data.Msg);
			}
			$('.todo').css('display', 'none');
			$('.chat').css('display', 'none');
			$('.notice').css('display', 'none');
			$('.news').css('display', 'none');
			$('.message').css('display', 'block');

		})
	};
	// 分页函数调用
	function handlePaginationClick3(new_page_index, pagination_container) {
		setMessagePager(messageLsitTotal, new_page_index);
		noticeFn(new_page_index);
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
		})
		$('.pager3 .pagination .pagination_go_button').css('position', 'relative');
		$('.pager3 .pagination .pagination_go_button').append($('<div class="pager-click-shadow pager-click-shadow3"></div>'))
		$('.pager-click-shadow3').off().click(function (ev) {
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
					assistantTipsFn('输入页面超过最大页码了哦~');
					$(this).parent().parent().children('.pagination_go_input').val(' ');
					normal('.pager3 .pagination .pagination_go_input', 3);
				}

			} else {
				$(this).parent().parent().children('.pagination_go_input').val(' ');
				assistantTipsFn('输入的不是有效页码哦~');
				normal('.pager3 .pagination .pagination_go_input', 3);
			}



			ev.stopPropagation();
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
		chatLsit.map(function (item) {
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
	//消息中心模块下的选项卡第四个
	var noticeTotalCount = 0;

	function messageFn(page) {
		$('.pager1').remove();
		$('.pager2').remove();
		$(".pager3").remove();
		$('.notice-clear').show();
		$('.infoCenter-empty').hide();
		$('.assistant-popup-loading').show();
		$("div").remove(".notice-div");
		// if(page=1)
		ajaxN('PsnMgr/InfoCentre/GetMessageList', 'get', {
			PageIndex: page + 1,
			PageSize: 15
		}, function (data) {
			noticeTotalCount = data.Data.TotalCount;
			noticeLsit = data.Data.Children;
			$('.infoCenter-empty').hide();
			$("div").remove(".notice-div");
			if (noticeLsit && noticeLsit.length == 0) {
				$('.notice-clear').hide();
				$('.infoCenter-empty').show();
				$('.infoCenter-empty-text').text($('.info-active').eq(1).text());
				$('.assistant-popup-loading').hide();
				return;
			}
			var ScheduleIDList = '';
			var ScheduleTypeList = '';
			var RemindFlagList = '';
			var DeletePlanFlagList = '';
			var ScheduleDate = '';
			// console.log(scheduleRemindList);
			if (scheduleRemindList.length > 0) {
				scheduleRemindList.map(function (item) {
					ScheduleIDList += item.ScheduleID + ',';
					ScheduleTypeList += item.ScheduleType + ',';
					RemindFlagList += '0,';
					DeletePlanFlagList += '1,';
					ScheduleDate += item.ScheduleDate + ',';
				})
				ajaxN('PsnMgr/Schedule/CloseScheduleRemind', 'post', {
					ScheduleID: ScheduleIDList.slice(0, -1),
					ScheduleType: ScheduleTypeList.slice(0, -1),
					RemindFlag: RemindFlagList.slice(0, -1),
					DeletePlanFlag: DeletePlanFlagList.slice(0, -1),
					ScheduleDate: ScheduleDate,
				}, function (data1) {
					scheduleRemindCount=0;
					message1Fn(page, noticeLsit);


				})
			} else {
				message1Fn(page, noticeLsit);
			}
		})
	};

	function message1Fn(page, noticeLsit) {
		ajaxN('PsnMgr/InfoCentre/GetNewRemindCount', 'get', {}, function (data) {
			$('.notice strong').text(data.Data.MessageCount);
			assistantTimeUpdata = false;
			ajaxN('PsnMgr/InfoCentre/RecordLastReadTime', 'post', {
				ModuleID: 4,
			}, function () {
				assistantTimeUpdata = true;
				if ($('.assistant-popup').css('opacity') == '0') {
					againCountRemindFn();
				} else {
					againCountunreadFn();
				}
			})

			noticeLsit.map(function (item, idx) {
				item.InfoContent = htmlEncode(item.InfoContent);
				item.InfoSourceName = htmlEncode(item.InfoSourceName);
				if (item.InfoContent && item.InfoContent.length > 69) {
					item.InfoContentAll = '"' + item.InfoContent + '"';
					item.InfoContent = item.InfoContent.slice(0, 68) + '...';
				} else {
					item.InfoContentAll = '""';
				}
				var classname6 = '';
				if (!item.SortID) {
					classname6 = 'notice-unshield';
				}
				noticeDiv = $(
					'<div class="notice-div clearfix" data-InfoID ="' + item.InfoID + '"  data-PCLinkType="' + item.PCLinkType +
					'" data-SysID="' + item.SysID +
					'" data-url="' +
					item.PCLink + '"><span></span><span title=' + item.InfoContentAll + ' >' + item.InfoContent +
					'</span><span class="notice-div-name" >' + item.InfoSourceName +
					'</span><span>' + item.RemindTime +
					'</span><span class=' + classname6 + '><i class="notice-shield"  data-id=' + item.InfoID +
					' data-SortID=' + item.SortID +
					'  ><b> </b>屏蔽此类消息</i><i class="notice-del" data-id=' + item.InfoID +
					' ><b></b>删除</i></span></div>'
				);
				$('.notice-box').append(noticeDiv);
			});
			$('.message').css('display', 'none');
			$('.chat').css('display', 'none');
			$('.todo').css('display', 'none');
			$('.news').css('display', 'none');
			$('.notice').css('display', 'block');
			$('.notice-del').off().click(function (event) {
				var $this = $(this);
				assistantRemindFn(['确定删除该系统消息？', '确定', '取消'], function (data) {
					if (data) {
						ajaxN('PsnMgr/InfoCentre/OperateMessage', 'post', {
							"OperateFlag": -1,
							"InfoID": $this.attr('data-id'),
						}, function (data) {
							if (data.StatusCode == 200) {
								assistantSmallSuccessFn('删除成功~');
								messageFn(page);

							} else {
								assistantTipsFn(data.Msg);
							}
						})
					}
				})

				event.stopPropagation();
			})
			$('.notice-shield').off().click(function (event) {
				var $this = $(this)
				ajaxN('PsnMgr/InfoCentre/ReceiveSetting', 'post', {
					"SortIDStr": $(this).attr('data-SortID'), // 消息类型字符串 以 ,号分割
					"FlagStr": "1", //  
				}, function (data) {
					if (data.StatusCode == 200) {
						ajaxN('PsnMgr/InfoCentre/OperateMessage', 'post', {
							"OperateFlag": -1,
							"InfoID": $this.attr('data-id')
						}, function (data1) {
							if (data1.StatusCode == 200) {
								assistantSmallSuccessFn('屏蔽此类消息成功~');
								messageFn(page);
							} else {
								assistantTipsFn(data.Msg);
							}
						})
					} else {
						assistantTipsFn(data.Msg);
					}
				})

				event.stopPropagation();
			})
			$('.notice-clear span').off().click(function () {

				assistantRemindFn(['确定清空所有的系统消息？', '确定', '取消'], function (data) {
					if (data) {
						ajaxN('PsnMgr/InfoCentre/OperateMessage', 'post', {
							"OperateFlag": -2,
							"InfoID": "",
						}, function (data) {
							if (data.StatusCode == 200) {
								$('.notice-div').remove();
								assistantSmallSuccessFn('清空成功~')
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
			$('.notice-div').off().click(function () {

				var $this = $(this);
				if ($(this).attr('data-PCLinkType') == 1) {
					getSysIP($(this).attr('data-SysID'), function (data) {
						var notiveURL = data + $this.attr('data-url');
						if ($this.attr('data-SysID') == 400) {

							setTimeout(function () {
								ajaxN('PsnMgr/InfoCentre/GetNewRemindCount', 'get', {}, function (data) {
									if (data.Data.NoticeCount == 0) {
										$('.popup-main1 ul li').eq(1).children().children().attr('class', '');
									} else {

										$('.popup-main1 ul li').eq(1).children().children().attr('class', 'info-unread2');
										if (data.Data.NoticeCount > 99) {
											data.Data.NoticeCount = '...';
										}
										if (!$('.popup-main1 ul li').eq(1).children().children().children().children().text()) {

											$('.popup-main1 ul li').eq(1).children().children().children().children().text(data.Data.NoticeCount);
										} else {
											if ($('.popup-main1 ul li').eq(1).children().children().children().children().text() == data.Data
												.NoticeCount) {
												$('.popup-main1 ul li').eq(1).children().children().children('span').append($(' <b>' + data.Data
													.NoticeCount +
													'</b>'));
												$('.popup-main1 ul li').eq(1).children().children().children('span').css('transform',
													'translate(0, ' + -
													12 * ($('.popup-main1 ul li').eq(1).children().children().children('span').children().length -
														1) +
													'px)');
											}

										}
									}
								})

							}, 3000)
						}
						window.open(notiveURL, '_blank');
					})




				} else if ($(this).attr('data-PCLinkType') == 2) {
					if ($(this).attr('data-SysID') == 621 || $(this).attr('data-SysID') == 622 || $(this).attr('data-SysID') ==
						623) {
						$('.assistant-popup-loading').show();
						commonOpenClient($this.attr('data-url'));
						setTimeout(function () {
							$('.assistant-popup-loading').hide();
						}, 3000)

					}
				} else if ($(this).attr('data-PCLinkType') == 3) {
					console.log($(this).attr('data-PCLinkType'));
					var $this = $(this)
					popupNavChoose = 2;
					$('.popup-nav-list ul li').attr('class', '');
					$('.popup-nav-list ul li').eq(1).attr('class', 'assistant-active');
					$('.popup-main-nav').hide();
					$('.popup-main-nav').eq(1).show();
					$('.assistant-popup-loading').hide();
					$('.schedule-choose-date').text($this.attr('data-url'));
					$('#lgAssistant-next2').css('font-size', '0');
					$('.personal-schedule-ul1').hide();
					$('.personal-schedule-ul2').hide();
					$('.personal-schedule-ul3').hide();
					var value = $('.schedule-choose-date').text();
					personalScheduleDate = value;
					$('.schedule-choose-date').text(value);
					$('.schedule-choose-week').text(dataChangeTerm(termStartDate, value));
					personalScheduleFn(personalScheduleDate, $this.attr('data-infoid'));
					if (value == dateChangeFn(serverTime.slice(0, 10), 1)) {
						$('.schedule-choose-day i:eq(1)').css('background', 'url(' + PsnMgrLgAssistantAddr +
							'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_4.png)');
						$('.schedule-choose-day i:eq(2)').css('background', 'url(' + PsnMgrLgAssistantAddr +
							'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_5.png)');
						$('.schedule-choose-day i').css('color', '#0e95ed');
						$('.schedule-choose-day i:eq(0)').css('background', 'url(' + PsnMgrLgAssistantAddr +
							'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_1.png)');
						$('.schedule-choose-day i:eq(1)').css('color', '#fff');
					} else if (value == dateChangeFn(serverTime.slice(0, 10), 2)) {
						$('.schedule-choose-day i:eq(1)').css('background', 'url(' + PsnMgrLgAssistantAddr +
							'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_3.png)');
						$('.schedule-choose-day i:eq(2)').css('background', 'url(' + PsnMgrLgAssistantAddr +
							'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_6.png)');
						$('.schedule-choose-day i').css('color', '#0e95ed');
						$('.schedule-choose-day i:eq(0)').css('background', 'url(' + PsnMgrLgAssistantAddr +
							'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_1.png)');
						$('.schedule-choose-day i:eq(2)').css('color', '#fff');
					} else if (value == serverTime.slice(0, 10)) {
						$('.schedule-choose-day i:eq(1)').css('background', 'url(' + PsnMgrLgAssistantAddr +
							'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_3.png)');
						$('.schedule-choose-day i:eq(2)').css('background', 'url(' + PsnMgrLgAssistantAddr +
							'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_5.png)');
						$('.schedule-choose-day i').css('color', '#0e95ed');
						$('.schedule-choose-day i:eq(0)').css('background', 'url(' + PsnMgrLgAssistantAddr +
							'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_2.png)');
						$('.schedule-choose-day i:eq(0)').css('color', '#fff');
					} else {
						$('.schedule-choose-day i:eq(1)').css('background', 'url(' + PsnMgrLgAssistantAddr +
							'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_3.png)');
						$('.schedule-choose-day i:eq(2)').css('background', 'url(' + PsnMgrLgAssistantAddr +
							'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_5.png)');
						$('.schedule-choose-day i').css('color', '#0e95ed');
						$('.schedule-choose-day i:eq(0)').css('background', 'url(' + PsnMgrLgAssistantAddr +
							'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_1.png)');
					}
					$('.schedule-setting-true').attr('name', '');
					$('.schedule-setting-popup div').eq(0).hide();
					$('.schedule-setting-popup div').eq(1).css('right', '-680px');
					$(".schedule-setting-popup").hide();

				}
			})
			if (noticeTotalCount > 15) {
				$('.notice-box').append($('<div class="frame_pager_center pager2 "></div>'));
				setNoticePager(noticeTotalCount, page);
			}
			// if (noticeLsit && noticeLsit.length > 9) {
			// 	$('.notice-div-name').css('margin-left', '499px');
			// } else {
			// 	$('.notice-div-name').css('margin-left', '492px');
			// }
			if (page > 0 && $('.notice-box .notice-div') && $('.notice-box .notice-div').length == 0) {
				messageFn(page - 1);
			}
			$('.notice-box').scrollTop(0);
			// document.getElementByclassName('notice-box').scrollTop = 0
			if ($('.notice-box .notice-div') && $('.notice-box .notice-div').length > 5 || ($('.notice-box .notice-div') &&
					$('.notice-box .notice-div').length > 4 && page > 0)) {
				$('.infoCenter-option-box').css('overflow-y', 'scroll');
			} else {
				$('.infoCenter-option-box').css('overflow-y', 'hidden');
			}
			$('.assistant-popup-loading').hide();
		})

	}
	// 分页函数调用
	function handlePaginationClick2(new_page_index, pagination_container) {
		setNoticePager(noticeTotalCount, new_page_index);
		messageFn(new_page_index);
	};

	function setNoticePager(totalNum, currentNum) {
		$(".pager2").pagination(totalNum, {
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
		})
		$('.pager2 .pagination .pagination_go_button').css('position', 'relative');
		$('.pager2 .pagination .pagination_go_button').append($('<div class="pager-click-shadow pager-click-shadow2"></div>'))
		$('.pager-click-shadow2').off().click(function (ev) {
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
					assistantTipsFn('输入页面超过最大页码了哦~');
					$(this).parent().parent().children('.pagination_go_input').val(' ');
					normal('.pager2 .pagination .pagination_go_input', 3);
				}

			} else {
				$(this).parent().parent().children('.pagination_go_input').val(' ');
				assistantTipsFn('输入的不是有效页码哦~');
				normal('.pager2 .pagination .pagination_go_input', 3);
			}




			ev.stopPropagation();

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
		newslsit.map(function (item) {
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
			$('.assistant-popup-loading').hide();

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
		}, function (data) {
			$('.assistant-popup-loading').hide();
			if (data.StatusCode == 200) {
				shieldList = data.Data;
				shieldList.map(function (item, idx) {
					var settingClassName = ' ';

					settingClassName = item.Children.some(function (ite) {
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

					item.Children.map(function (it) {
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
			$('.setting-option1 p>b').off().click(function () {
				var SortIDStr = '';
				var FlagStr = '';
				if ($(this).attr('class')) {
					$(this).attr('class', '');
					$(this).parent().parent().children('span').children('b').attr('class', '');
					shieldList[$(this).attr('name')].Children.map(function (item) {
						SortIDStr += item.SortID + ',';
						FlagStr += 1 + ',';
					})
				} else {
					$(this).attr('class', 'choosetrue');
					$(this).parent().parent().children('span').children('b').attr('class', 'choosetrue');
					shieldList[$(this).attr('name')].Children.map(function (item) {
						SortIDStr += item.SortID + ',';
						FlagStr += 0 + ',';
					})
				};
				SortIDStr = SortIDStr.slice(0, SortIDStr.length - 1);
				FlagStr = FlagStr.slice(0, FlagStr.length - 1);
				ajaxN('PsnMgr/InfoCentre/ReceiveSetting', 'post', {
					"SortIDStr": SortIDStr, // 消息类型字符串 以 ,号分割
					"FlagStr": FlagStr, //  屏蔽或接收设置字符串，与SortIDStr一一对应 以 ,号分割;  0--取消屏蔽   1--屏蔽
				}, function (data) {
					if (data.StatusCode == 200) {
						// console.log(data.Msg);
						// assistantSmallSuccessFn('设置成功')
					}
				})

			});
			//消息中心的设置的系统消息接收设置模块的开关变换
			$('.setting-option1 span>b').off().click(function () {
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
					SortIDStr = $(this).attr('data-SortID');
					FlagStr = '0';
				};

				ajaxN('PsnMgr/InfoCentre/ReceiveSetting', 'post', {
					"SortIDStr": SortIDStr, // 消息类型字符串 以 ,号分割
					"FlagStr": FlagStr, //  屏蔽或接收设置字符串，与MsgDealTypeStr一一对应 以 ,号分割;  0--取消屏蔽   1--屏蔽
				}, function (data) {
					if (data.StatusCode == 200) {
						// console.log(data.Msg);
						// assistantSmallSuccessFn('设置成功')
					}
				})
			});
			$('.setting-popup').show();
			$('.setting-popup div').eq(1).animate({
				right: '0'
			}, 'slow', function () {
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
		shieldList.map(function (item) {
			var settingOption2Span = $("<span class='setting-option-span'><i></i><b>" + item.name +
				"<i>(" +
				item.tel +
				")</i></b><a>移除</a><i></i>" + "</span>")
			$('.setting-option2 ').append(settingOption2Span);
		});
		//消息中心的设置的在线交流屏蔽名单模块的移除
		$('.setting-option2 a').click(function () {
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
		groupList.map(function (item) {
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

		$('.setting-option3 a').click(function () {
			if ($(this).attr('class')) {
				$(this).attr('class', '');
			} else {
				$(this).attr('class', 'choosetrue');
			};
		});
	};
	//日程表的生成 参数date为时间如2011-01-01
	function personalScheduleFn(date, gotoid) {
		$('.popup-main22').show();
		$(".personal-schedule-box>ul>li").remove();
		$('.assistant-popup-loading').show();
		ajaxN('PsnMgr/Schedule/GetScheduleInformation', 'get', {
			ScheduleDate: date
		}, function (data) {
			$('.assistant-popup-loading').hide();
			if (data.StatusCode == 200) {
				$(".personal-schedule-box>ul>li").remove();
				$('.personal-schedule-empty').hide();
				$('.personal-schedule-box').show();
				var personalScheduleLsit = data.Data;
				personalScheduleLsit.map(function (item) {
					var scheduleClassEdit = ''; //控制编辑按钮是否生成
					var scheduleClassDel = ''; //控制删除按钮是否生成
					var scheduleClassInfo = ''; //控制班级信息是否生成
					var schedulePlaceInfo = ''; //控制地点信息是否生成
					var scheduleClass5 = 'old-li ' + item.ScheduleID; //控制日程显示样式整体
					var scheduleClassName = ''; //控制班级是否出现
					var schedulePlace = ''; //控制班级是否出现
					var scheduleClock = ''; //控制班级是否出现
					var scheduleTime = ''; //计算日程时间段
					var scheduleUlLi = '';
					var scheduleUl1Li = ''; //个人日程早上时间段的li
					var scheduleUl2Li = ''; //个人日程下午时间段的li
					var scheduleUl3Li = ''; //个人日程晚上时间段的li
					if (item.StartTime == item.EndTime || !item.EndTime) {
						scheduleTime = item.StartTime;
					} else {
						scheduleTime = item.StartTime + '~' + item.EndTime;
					}

					if (item.ScheduleLocation) {
						schedulePlace = 'personalSchedule-place';
					}
					if (item.ScheduleType == 0) {
						scheduleClassName = 'personalSchedule-class';
					}
					if (item.ScheduleState == 4) {
						scheduleClassEdit = 'schedule-edit';
						scheduleClass5 = 'next-li ' + item.ScheduleID;
						if (item.ScheduleType != 0 && item.ScheduleType != 10) {
							scheduleClassDel = 'schedule-del';
						}
						if (item.RemindFlag != -1) {
							scheduleClock = 'schedule-clock';
						}
					} else if (item.ScheduleState == 2) {
						scheduleClass5 = 'now-li ' + item.ScheduleID;
					}
					item.ScheduleTypeName = htmlEncode(item.ScheduleTypeName);
					item.ScheduleContentTitle = '"' + item.ScheduleContent + '"';
					if (item.ScheduleContent.length > 34) {
						item.ScheduleContent = item.ScheduleContent.slice(0, 33) + '...';
					}
					item.ClassName = htmlEncode(item.ClassName);
					item.ScheduleLocation = htmlEncode(item.ScheduleLocation);
					scheduleUlLi = $('<li class="' + scheduleClass5 + '" data-ScheduleID= "' + item.ScheduleID +
						'"   data-PCLinkType= "' + item.PCLinkType +
						'"   data-BelongInfoID= "' + item.BelongInfoID +
						'"   data-PCLink= "' + item.PCLink +
						'"   data-AndroidLink= "' + item.AndroidLink +
						'"   data-IOSLink= "' + item.IOSLink + '"   data-SysID= "' + item.SysID +
						'"  data-ScheduleDate="' +
						item.ScheduleDate + '" data-StartTime="' + item.StartTime + '" data-EndTime="' + item.EndTime +
						'" data-ScheduleType="' + item.ScheduleType + '" data-ScheduleTypeName="' + item.ScheduleTypeName +
						'" data-ScheduleContent=' + item.ScheduleContentTitle +
						' data-ScheduleState="' + item.ScheduleState + '" data-SubjectName="' + item.SubjectName +
						'" data-TeacherName="' + item.TeacherName +
						'" data-ClassName="' + item.ClassName + '" data-ScheduleLocation="' + item.ScheduleLocation +
						'" data-ScheduleTimeSlot="' +
						item.ScheduleTimeSlot +
						'" data-RemindFlag="' + item.RemindFlag + '" data-RemindTime="' + item.RemindTime +
						'" data-RemindRealTime="' +
						item.RemindRealTime + '"  data-CourseScheduleID="' + item.CourseScheduleID + '" data-CourseSection="' +
						item.CourseSection +
						'" > <span> ' + scheduleTime + ' </span> <span> ' + item.ScheduleTypeName + ' </span> <span> <p title=' +
						item.ScheduleContentTitle + '> ' + item.ScheduleContent +
						' </p><i class=' + scheduleClock +
						'></i></span> <span> <i class=' + scheduleClassEdit + '> </i><i class=' + scheduleClassDel +
						'></i> </span> <span class = ' + scheduleClassName + ' title=' + item.ClassName + '> <i> </i>' + item.ClassName +
						'</span><span class = ' + schedulePlace + '  title=' + item.ScheduleLocation + '> <i> </i>' + item.ScheduleLocation +
						'</span><b class="schedule-frist-b"></b> <b class="schedule-last-b"></b></li>');
					if (item.ScheduleTimeSlot == 3) {
						$('.personal-schedule-ul1').append(scheduleUlLi);
					} else if (item.ScheduleTimeSlot == 7) {
						$('.personal-schedule-ul2').append(scheduleUlLi);
					} else {
						$('.personal-schedule-ul3').append(scheduleUlLi);
					}


				})
				if ($('.personal-schedule-ul1 li') && $('.personal-schedule-ul1 li').length == 0) {
					$('.personal-schedule-ul1 ').hide();
				} else {
					$('.personal-schedule-ul1 ').show();
				}
				if ($('.personal-schedule-ul2 li') && $('.personal-schedule-ul2 li').length == 0) {
					$('.personal-schedule-ul2 ').hide();
				} else {
					$('.personal-schedule-ul2 ').show();
				}
				if ($('.personal-schedule-ul3 li') && $('.personal-schedule-ul3 li').length == 0) {
					$('.personal-schedule-ul3 ').hide();
				} else {
					$('.personal-schedule-ul3 ').show();
				}
			} else {
				$('.personal-schedule-empty').show();
				$('.personal-schedule-box').hide();
			};
			if (gotoid) {
				var element = document.getElementsByClassName(gotoid)[0];
				element.scrollIntoView();
			}

			//日程删除
			$('.schedule-del').off().click(function () {
				var li = $(this).parent().parent();
				assistantRemindFn(['确定删除该日程安排?', '确定', '取消'], function (data) {
					if (data) {
						// console.log(li.attr('data-ScheduleType'));
						var param = {
							"OperateFlag": -1, //   1 添加  0 编辑  -1 删除
							"SecretKey": "55555",
							"OriginalScheduleDate": '', //创建时间
							"ScheduleID": li.attr('data-ScheduleID'),
							"ScheduleDate": li.attr('data-ScheduleDate'),
							"StartTime": li.attr('data-StartTime'),
							"EndTime": li.attr('data-EndTime'),
							"ScheduleType": li.attr('data-ScheduleType'),
							"ScheduleTypeName": li.attr('data-ScheduleTypeName'),
							"ScheduleContent": li.attr('data-ScheduleContent'),
							"ScheduleState": li.attr('data-ScheduleState'),
							"SubjectName": li.attr('data-SubjectName'),
							"TeacherName": li.attr('data-TeacherName'),
							"ClassName": li.attr('data-ClassName'),
							"ScheduleLocation": li.attr('data-ScheduleLocation'),
							"ScheduleTimeSlot": li.attr('data-ScheduleTimeSlot'),
							"RemindFlag": li.attr('data-RemindFlag'),
							"RemindTime": li.attr('data-RemindTime'),
							"RemindRealTime": li.attr('data-RemindRealTime'),
							"CourseScheduleID": li.attr('data-CourseScheduleID'),
							"CourseSection": li.attr('data-CourseSection'),
							"PCLink": " ",
							"AndroidLink": "",
							"IOSLink": "",
							"BackUpOne": "",
							"BackUpTwo": ""
						};
						ajaxN('PsnMgr/Schedule/OperateSchedule', 'post', param, function (data) {
							if (data.StatusCode == 200) {
								assistantBigSuccessFn('删除成功~');
								li.remove();
								if ($('.info-active').eq(0).attr('name') == '1') {
									todoFn('M');
								}

								// console.log($('.personal-schedule-ul1 li').length);
								if ($('.personal-schedule-ul1 li') && $('.personal-schedule-ul1 li').length == 0) {
									$('.personal-schedule-ul1').hide();
								}
								if ($('.personal-schedule-ul1 li') && $('.personal-schedule-ul2 li').length == 0) {
									$('.personal-schedule-ul2').hide();
								}
								if ($('.personal-schedule-ul1 li') && $('.personal-schedule-ul3 li').length == 0) {
									$('.personal-schedule-ul3').hide();
								}
								if ($('.personal-schedule-box').children().children('li') && $('.personal-schedule-box').children().children(
										'li').length == 0) {
									$('.personal-schedule-box').hide();
									$('.personal-schedule-empty').show();
								}
							} else {
								assistantTipsFn(data.Msg);

							}
						})
					}
				})
			});

			//编辑日程
			$('.schedule-edit').off().click(function () {
				// $('.next-li span').eq(4).attr('class','');
				$(this).parent().attr('class', 'schedule-message');
				$('.schedule-change-type').text('编辑日程');
				$('.schedule-edit-name').text('自定义');
				$('.schedule-setting-popup').show();
				$('.schedule-setting-popup div').eq(1).animate({
					right: '0'
				}, 'slow', function () {
					$('.schedule-setting-popup div').eq(0).show();
				});

				var li = $(this).parent().parent();
				$('.schedule-edit-popup').hide();
				if (li.attr('data-ScheduleType') == 0 || li.attr('data-ScheduleType') == 10) {
					$('.schedule-edit-popup').show();
					$('.schedule-type-name').hide();
					$('.schedule-type  i').attr('class', '');
					$('.schedule-type i').eq(3).attr('class', 'schedule-type-true');
					if (li.attr('data-ScheduleType') == 0) {
						$('.schedule-edit-name').text('课程');
						$('.schedule-edit-name').attr('data-scheduleTypeName', li.attr('data-scheduleTypeName'))
					}
					if (li.attr('data-ScheduleType') == 10) {
						$('.schedule-edit-name').text('监考');
					}
				} else {
					$('.schedule-type i').attr('class', '');
					$('.schedule-type i').eq(li.attr('data-ScheduleType') / 2 - 1).attr('class', 'schedule-type-true');
					if (li.attr('data-ScheduleType') == 8) {
						$('.schedule-type-name').val(li.attr('data-scheduletypename'));
					} else {
						$('.schedule-type-name').val('');
					}
					// $('.schedule-clocks-setting').attr('name');
					// $('.schedule-clocks-time').val();
					// $('.schedule-input-clocks').attr('name');
				};
				$('#lgAssistant-next3').val(li.attr('data-ScheduleDate'));
				$('#schedule-test1').val(li.attr('data-startTime').slice(0, 2) + '时' + li.attr('data-startTime').slice(3, 5) +
					'分');
				if (li.attr('data-startTime') == li.attr('data-endTime')) {
					$('#schedule-test2').val('');
				} else {
					$('#schedule-test2').val(li.attr('data-endTime').slice(0, 2) + '时' + li.attr('data-endTime').slice(3, 5) +
						'分');
				}
				// console.log(li.attr('data-scheduleContent'));
				$('.schedule-topic').val(li.attr('data-scheduleContent'));
				$('.schedule-topic-length').text($('.schedule-topic').val().length + '/50');
				$('.schedule-topic').css('color', '#333');
				if (li.attr('data-remindflag') == -1) {
					$('.schedule-clocks-time').val('30');
					$('.schedule-clocks-setting').css('background', 'url(' + PsnMgrLgAssistantAddr +
						'/PsnMgr/LgAssistant/images/复选_1.png) no-repeat');
					$('.schedule-clocks-setting').attr('name', 'false');
					$('.schedule-clocks-setting1').hide();
				} else {
					$('.schedule-clocks-setting').css('background', 'url(' + PsnMgrLgAssistantAddr +
						'/PsnMgr/LgAssistant/images/复选_2.png) no-repeat');
					$('.schedule-clocks-setting').attr('name', 'true');
					if (li.attr('data-remindtime') == 0) {
						$('.schedule-clocks-time').val('30');
						$('.schedule-clocks-setting1 i').eq(0).attr('class', 'schedule-input-clocks');
						$('.schedule-clocks-setting1 i').eq(1).attr('class', '');
					} else {
						$('.schedule-clocks-time').val(li.attr('data-RemindTime'));
						$('.schedule-clocks-setting1 i').eq(1).attr('class', 'schedule-input-clocks');
						$('.schedule-clocks-setting1 i').eq(0).attr('class', '');
					}
					$('.schedule-clocks-setting1').show();
				}
			})
			// if ($('.personal-schedule-box .scheduleUlLi') && $('.personal-schedule-box  ul li').length > 8) {
			// 	$('.personal-schedule-box').css('overflow-y', 'scroll');
			// } else {
			// 	$('.personal-schedule-box').css('overflow-y', 'hidden');
			// }
		})
	};
	//日程的编辑 
	// 参数 type为1时是新增日程 0 编辑  
	function scheduleChangeFn(type) {
		// console.log(type);
		// console.log($('.schedule-type-true').attr('name'));
		// console.log($('#lgAssistant-next3').val());
		// console.log($('#schedule-test1').val());
		// console.log($('#schedule-test2').val());
		// 	console.log($('.schedule-topic').val());
		// console.log($('.schedule-clocks-setting').attr('name'));
		// console.log($('.schedule-input-clocks').attr('name'));
		// console.log($('.schedule-clocks-time').val());
		var startTime = $('#schedule-test1').val().slice(0, 2) + ':' + $('#schedule-test1').val().slice(3, 5); //开始时间
		var endTime = $('#schedule-test2').val().slice(0, 2) + ':' + $('#schedule-test2').val().slice(3, 5); //结束时间
		var scheduleTypeName = ''; //自定义日程类别名称
		var scheduleTimeSlot = 9; //日程所在的时间段
		var scheduleContent = ''; //日程内容
		var remindFlag = -1; //是否开启日程提醒-1为不开启 0为开启
		var remindTime = ''; //日程提醒提前多少分钟提醒
		var remindRealTime = ''; //日程提醒的时间
		var ScheduleType = ''; //课程类型
		var SysID = ''; //系统id
		var PCLinkType = ''; //pc端跳转方式
		var BelongInfoID = ''; //日程跳转id（可能吧）
		var PCLink = ''; //pc端跳转路径
		var AndroidLink = ''; //安卓端跳转路径
		var IOSLink = ''; //ios端跳转路径
		var ScheduleID = '';
		if (!$('#schedule-test2').val()) {
			endTime = startTime;
		}
		if (!$('#lgAssistant-next3').val()) {
			normal('#lgAssistant-next3', 3);
			return;
		}
		if ($('.schedule-type-true').attr('name') == 4) {

			if ($('.schedule-edit-name').text() == '自定义') {
				ScheduleType = 8;
				if (!$.trim($('.schedule-type-name').val())) {
					normal('.schedule-type-name', 3);
					return;
				}
				scheduleTypeName = $.trim($('.schedule-type-name').val());
			}
			if ($('.schedule-edit-name').text() == '课程') {
				ScheduleType = 0;
				scheduleTypeName = $('.schedule-edit-name').attr('data-scheduleTypeName');
			}
			if ($('.schedule-edit-name').text() == '监考') {
				ScheduleType = 10;
			}



		}
		if (!$('#schedule-test1').val()) {
			normal('#schedule-test1', 3);
			return;
		}
		if ($('.schedule-topic').val() == '请输入日程内容...' || !$.trim($('.schedule-topic').val())) {
			// $('.schedule-topic').focus();
			// assistantTipsFn('日程内容不能为空~');
			$('.schedule-topic').val('');
			normal('.schedule-topic', 3);
			return;
		}
		if ($('.schedule-topic').val() && $('.schedule-topic').val().length > 50) {
			normal('.schedule-topic', 3);
			assistantTipsFn('日程内容不能超过50个字符~');
			return;
		}
		$('.assistant-popup-loading').show();
		ajaxN('PsnMgr/Schedule/GetServerTime', 'get', {}, function (data) {
			var nowdate = data.Data;
			if ($('#lgAssistant-next3').val().slice(0, 10) == nowdate.slice(0, 10)) {
				if ($('#schedule-test1').val().slice(0, 2) > nowdate.slice(11, 13)) {

				} else if ($('#schedule-test1').val().slice(0, 2) == nowdate.slice(11, 13) && $('#schedule-test1').val().slice(3,
						5) > nowdate.slice(14, 16)) {
					if ($('.schedule-clocks-setting').attr('name') == 'true') {
						remindFlag = 0;
						if ($('.schedule-input-clocks').attr('name') == 1) {
							remindTime = 0;
							remindRealTime = $('#lgAssistant-next3').val() + ' ' + startTime;
						} else {
							remindTime = $('.schedule-clocks-time').val();
							remindRealTime = dateChangeMinutes($('#lgAssistant-next3').val() + ' ' + startTime, -$('.schedule-clocks-time')
								.val());
							if (Date.parse(nowdate) >= Date.parse(dateChangeMinutes($('#lgAssistant-next3').val() + ' ' + $(
									'#schedule-test1').val().slice(0, 2) + ':' + $('#schedule-test1').val().slice(3, 5), -$(
									'.schedule-clocks-time').val() - 1))) {
								$('.assistant-popup-loading').hide();
								assistantTipsFn('日程提醒时间已过期~');
								normal('.schedule-clocks-time', 3);
								return;
							}
						}
					} else {
						remindFlag = -1;
					}


				} else {
					$('.assistant-popup-loading').hide();
					assistantTipsFn('日程时间不能小于当前时间~', 2);
					normal('#schedule-test1', 3);
					return;
				}

			}
			$('.assistant-popup-loading').hide();
			if ($('.schedule-clocks-setting').attr('name') == 'true') {
				remindFlag = 0;
				if ($('.schedule-input-clocks').attr('name') == 1) {
					remindTime = 0;
					remindRealTime = $('#lgAssistant-next3').val() + ' ' + startTime;
				} else {
					remindTime = $('.schedule-clocks-time').val();
					remindRealTime = dateChangeMinutes($('#lgAssistant-next3').val() + ' ' + startTime, -$('.schedule-clocks-time')
						.val());
				}
			} else {
				remindFlag = -1;
			}

			if ($('.schedule-type-true').attr('name') == 1) {
				scheduleTypeName = '备课';
				ScheduleType = 2;
			}
			if ($('.schedule-type-true').attr('name') == 2) {
				scheduleTypeName = '会议';
				ScheduleType = 4;
			}
			if ($('.schedule-type-true').attr('name') == 3) {
				scheduleTypeName = '重要活动';
				ScheduleType = 6;
			}
			if ($('#schedule-test1').val().slice(0, 2) < 12) {
				scheduleTimeSlot = 3;
			} else if ($('#schedule-test1').val().slice(0, 2) < 18) {
				scheduleTimeSlot = 7;
			}

			if (type == 0) {
				var scheduleMessage = $('.schedule-message').parent();
				ScheduleID = scheduleMessage.attr('data-ScheduleID');
				if (!scheduleMessage.attr('data-SubjectName')) {
					scheduleMessage.attr('data-SubjectName', '');
				}
				if (!scheduleMessage.attr('data-ScheduleType')) {
					scheduleMessage.attr('data-ScheduleType', '');
				}
				if (!scheduleMessage.attr('data-TeacherName')) {
					scheduleMessage.attr('data-TeacherName', '');
				}
				if (!scheduleMessage.attr('data-ClassName')) {
					scheduleMessage.attr('data-ClassName', '');
				}
				if (!scheduleMessage.attr('data-ScheduleLocation')) {
					scheduleMessage.attr('data-ScheduleLocation', '');
				}
				if (!scheduleMessage.attr('data-CourseScheduleID')) {
					scheduleMessage.attr('data-CourseScheduleID', '');
				}
				if (!scheduleMessage.attr('data-CourseSection')) {
					scheduleMessage.attr('data-CourseSection', '');
				}
				SysID = scheduleMessage.attr('data-SysID');
				PCLinkType = scheduleMessage.attr('data-PCLinkType');
				BelongInfoID = scheduleMessage.attr('data-BelongInfoID');
				PCLink = scheduleMessage.attr('data-PCLink');
				AndroidLink = scheduleMessage.attr('data-AndroidLink');
				IOSLink = scheduleMessage.attr('data-IOSLink');
			} else {
				var scheduleMessage = $('.new-schedule');
				SysID = '200';
				PCLinkType = 3;
				BelongInfoID = '';
				PCLink = '';
				AndroidLink = '';
				IOSLink = '';
			}
			if ($('.schedule-setting-true').attr('name') == '22' || $('.schedule-setting-true').attr('name') == '11') {
				ScheduleID = $('.schedule-setting-true').attr('data-id');
				SysID = $('.schedule-setting-true').attr('data-SysID');
				PCLinkType = $('.schedule-setting-true').attr('data-PCLinkType');
				BelongInfoID = $('.schedule-setting-true').attr('data-BelongInfoID');
				PCLink = $('.schedule-setting-true').attr('data-PCLink');
				AndroidLink = $('.schedule-setting-true').attr('data-AndroidLink');
				IOSLink = $('.schedule-setting-true').attr('data-IOSLink');
			}

			var param = {
				"OperateFlag": type, //   1 添加  0 编辑  -1 删除
				"SecretKey": "55555",
				"OriginalScheduleDate": $('.schedule-choose-date').text(), //创建时间
				"ScheduleID": ScheduleID,
				"ScheduleDate": $('#lgAssistant-next3').val(),
				"StartTime": startTime,
				"EndTime": endTime,
				"ScheduleType": ScheduleType,
				"ScheduleTypeName": scheduleTypeName,
				"ScheduleContent": $.trim($('.schedule-topic').val()).replace(/[\r\n]/g, " "),
				"ScheduleState": 4,
				"SubjectName": scheduleMessage.attr('data-SubjectName'),
				"TeacherName": scheduleMessage.attr('data-TeacherName'),
				"ClassName": scheduleMessage.attr('data-ClassName'),
				"ScheduleLocation": scheduleMessage.attr('data-ScheduleLocation'),
				"ScheduleTimeSlot": scheduleTimeSlot,
				"RemindFlag": remindFlag,
				"RemindTime": remindTime,
				"RemindRealTime": remindRealTime,
				"CourseScheduleID": scheduleMessage.attr('data-CourseScheduleID'),
				"CourseSection": scheduleMessage.attr('data-CourseSection'),
				"PCLink": "",
				"AndroidLink": "",
				"IOSLink": "",
				"SysID": SysID,
				"PCLinkType": PCLinkType,
				"BelongInfoID": BelongInfoID,
				"BackUpOne": "",
				"BackUpTwo": ""
			};
			$('.assistant-popup-loading').show();
			ajaxN('PsnMgr/Schedule/OperateSchedule', 'post', param, function (data) {
				$('.schedule-message').attr('class', '');

				if (data.StatusCode == 200) {
					$('.schedule-setting-popup').css('display', 'none');
					$('.schedule-setting-popup div').eq(0).css('display', 'none');
					$('.schedule-setting-popup div').eq(1).css('right', '-680px');
					$('.assistant-popup-loading').hide();
					if (type == 0) {
						assistantBigSuccessFn('日程修改成功');
					} else {
						assistantBigSuccessFn('日程添加成功');
					}
					if ($('.schedule-setting-true').attr('name') != '22') {
						$('.schedule-choose-date').text($('#lgAssistant-next3').val());
						$('.schedule-choose-week').text(dataChangeTerm(termStartDate, $('#lgAssistant-next3').val()));
						personalScheduleFn($('#lgAssistant-next3').val());

						var value = $('#lgAssistant-next3').val();
						if (value == dateChangeFn(serverTime.slice(0, 10), 1)) {
							$('.schedule-choose-day i:eq(1)').css('background', 'url(' + PsnMgrLgAssistantAddr +
								'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_4.png)');
							$('.schedule-choose-day i:eq(2)').css('background', 'url(' + PsnMgrLgAssistantAddr +
								'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_5.png)');
							$('.schedule-choose-day i').css('color', '#0e95ed');
							$('.schedule-choose-day i:eq(0)').css('background', 'url(' + PsnMgrLgAssistantAddr +
								'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_1.png)');
							$('.schedule-choose-day i:eq(1)').css('color', '#fff');
						} else if (value == dateChangeFn(serverTime.slice(0, 10), 2)) {
							$('.schedule-choose-day i:eq(1)').css('background', 'url(' + PsnMgrLgAssistantAddr +
								'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_3.png)');
							$('.schedule-choose-day i:eq(2)').css('background', 'url(' + PsnMgrLgAssistantAddr +
								'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_6.png)');
							$('.schedule-choose-day i').css('color', '#0e95ed');
							$('.schedule-choose-day i:eq(0)').css('background', 'url(' + PsnMgrLgAssistantAddr +
								'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_1.png)');
							$('.schedule-choose-day i:eq(2)').css('color', '#fff');
						} else if (value == serverTime.slice(0, 10)) {
							$('.schedule-choose-day i:eq(1)').css('background', 'url(' + PsnMgrLgAssistantAddr +
								'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_3.png)');
							$('.schedule-choose-day i:eq(2)').css('background', 'url(' + PsnMgrLgAssistantAddr +
								'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_5.png)');
							$('.schedule-choose-day i').css('color', '#0e95ed');
							$('.schedule-choose-day i:eq(0)').css('background', 'url(' + PsnMgrLgAssistantAddr +
								'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_2.png)');
							$('.schedule-choose-day i:eq(0)').css('color', '#fff');
						} else {
							$('.schedule-choose-day i:eq(1)').css('background', 'url(' + PsnMgrLgAssistantAddr +
								'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_3.png)');
							$('.schedule-choose-day i:eq(2)').css('background', 'url(' + PsnMgrLgAssistantAddr +
								'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_5.png)');
							$('.schedule-choose-day i').css('color', '#0e95ed');
							$('.schedule-choose-day i:eq(0)').css('background', 'url(' + PsnMgrLgAssistantAddr +
								'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_1.png)');
						}



					} else {
						$('.schedule-setting-true').attr('name', '');
						todoFn($('.schedule-setting-true').attr('data-page'));
					}
					layDataMark($('#lgAssistant-next3').val());
					$('.assistant-popup-loading').hide();

					// $('.schedule-choose-day i:eq(1)').css('background', 'url('+PsnMgrLgAssistantAddr+'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_3.png)');
					// $('.schedule-choose-day i:eq(2)').css('background', 'url('+PsnMgrLgAssistantAddr+'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_5.png)');
					// $('.schedule-choose-day i').css('color', '#0e95ed');
					// $('.schedule-choose-day i:eq(0)').css('background', 'url('+PsnMgrLgAssistantAddr+'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_2.png)');
					// $('.schedule-choose-day i:eq(0)').css('color', '#fff');
				} else {
					assistantTipsFn(data.Msg);
				}
				$('.assistant-popup-loading').hide();
			})
		})
	};

	function layDataMark(datas) {
		ajaxN('/PsnMgr/Schedule/GetScheduleDateList', 'get', {
			EndDate: termEndDate,
			StartDate: termStartDate,
			// Token:'74e35f13-9179-4c6f-b61f-f713c7dbe3f2',
			// UserID:'T0003',
			// SchoolID:'S15-130-773A',
			// UserType:'1',
			// URL:'http://192.168.129.1:10103/',
		}, function (data) {
			var mark = {};
			var dateArr = data.Data.split(',');
			dateArr.map(function (item) {
				mark[item] = '';
			})
			$('#lgAssistant-next2').remove();
			$('.chooose-schedule-date').append($('<i id="lgAssistant-next2"></i>'));
			layui.use('laydate', function () {
				var laydate = layui.laydate;
				laydate.render({
					elem: '#lgAssistant-next2', //指定元素
					format: 'yyyy-MM-dd',
					min: termStartDate,
					max: termEndDate,
					btns: ['now'],
					position: 'fixed',
					value: datas,
					isInitValue: false,
					mark: mark,
					trigger: 'click',
					done: function (value, date, endDate) {
						$('#lgAssistant-next2').css('font-size', '0');
						$('.personal-schedule-ul1').hide();
						$('.personal-schedule-ul2').hide();
						$('.personal-schedule-ul3').hide();
						personalScheduleDate = value;
						$('.schedule-choose-date').text(value);
						$('.schedule-choose-week').text(dataChangeTerm(termStartDate, value));
						personalScheduleFn(personalScheduleDate);
						if (value == dateChangeFn(serverTime.slice(0, 10), 1)) {
							$('.schedule-choose-day i:eq(1)').css('background', 'url(' + PsnMgrLgAssistantAddr +
								'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_4.png)');
							$('.schedule-choose-day i:eq(2)').css('background', 'url(' + PsnMgrLgAssistantAddr +
								'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_5.png)');
							$('.schedule-choose-day i').css('color', '#0e95ed');
							$('.schedule-choose-day i:eq(0)').css('background', 'url(' + PsnMgrLgAssistantAddr +
								'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_1.png)');
							$('.schedule-choose-day i:eq(1)').css('color', '#fff');
						} else if (value == dateChangeFn(serverTime.slice(0, 10), 2)) {
							$('.schedule-choose-day i:eq(1)').css('background', 'url(' + PsnMgrLgAssistantAddr +
								'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_3.png)');
							$('.schedule-choose-day i:eq(2)').css('background', 'url(' + PsnMgrLgAssistantAddr +
								'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_6.png)');
							$('.schedule-choose-day i').css('color', '#0e95ed');
							$('.schedule-choose-day i:eq(0)').css('background', 'url(' + PsnMgrLgAssistantAddr +
								'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_1.png)');
							$('.schedule-choose-day i:eq(2)').css('color', '#fff');
						} else if (value == serverTime.slice(0, 10)) {
							$('.schedule-choose-day i:eq(1)').css('background', 'url(' + PsnMgrLgAssistantAddr +
								'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_3.png)');
							$('.schedule-choose-day i:eq(2)').css('background', 'url(' + PsnMgrLgAssistantAddr +
								'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_5.png)');
							$('.schedule-choose-day i').css('color', '#0e95ed');
							$('.schedule-choose-day i:eq(0)').css('background', 'url(' + PsnMgrLgAssistantAddr +
								'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_2.png)');
							$('.schedule-choose-day i:eq(0)').css('color', '#fff');
						} else {
							$('.schedule-choose-day i:eq(1)').css('background', 'url(' + PsnMgrLgAssistantAddr +
								'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_3.png)');
							$('.schedule-choose-day i:eq(2)').css('background', 'url(' + PsnMgrLgAssistantAddr +
								'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_5.png)');
							$('.schedule-choose-day i').css('color', '#0e95ed');
							$('.schedule-choose-day i:eq(0)').css('background', 'url(' + PsnMgrLgAssistantAddr +
								'/PsnMgr/LgAssistant/images/personalSchedule/选项卡_今明后_1.png)');
						}

						// console.log(value); //得到日期生成的值，如：2017-08-18
						// console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
						// console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
					}
				});

			});

		})
		// $('#lgAssistant-next2').click(function() {
		// 	setTimeout(function() {
		// 		$('.laydate-prev-y').text(' ');
		// 		$('.laydate-prev-m').text(' ');
		// 		$('.laydate-next-y').text(' ');
		// 		$('.laydate-next-m').text(' ');
		// 	}, 50)
		// })
	}
	//获取最近通讯录右边列表 name为不同通讯录右边不同的模板1为最近联系人模板，，2为常用联系人模板,3为分类模板 ；4为全部师生模板，class为班级学生模板，stare是传的参数
	function recentContactFn(page, name, state, recentContactScrollTop) {
		$('.popup-nav-list ul li').eq(3).attr('data-page', page);
		$('.popup-nav-list ul li').eq(3).attr('data-name', name);
		$('.popup-nav-list ul li').eq(3).attr('data-state', state);
		if (Object.prototype.toString.call(state) == '[object Object]') {
			if (state.ClassID) {
				$('.popup-nav-list ul li').eq(3).attr('data-state', 1111);
				$('.popup-nav-list ul li').eq(3).attr('data-ClassID', state.ClassID);
			}
			if (state.SubjectID) {
				$('.popup-nav-list ul li').eq(3).attr('data-state', 2222);
				$('.popup-nav-list ul li').eq(3).attr('data-SubjectID', state.SubjectID);
			}
			if (state.GradeID) {
				$('.popup-nav-list ul li').eq(3).attr('data-state', 3333);
				$('.popup-nav-list ul li').eq(3).attr('data-GradeID', state.GradeID);
			}
			if (state.ClassMemberType) {
				$('.popup-nav-list ul li').eq(3).attr('data-state', 1111);
				$('.popup-nav-list ul li').eq(3).attr('data-ClassMemberType', state.ClassMemberType);
			}
			if (state.ClassType) {
				$('.popup-nav-list ul li').eq(3).attr('data-state', 1111);
				$('.popup-nav-list ul li').eq(3).attr('data-ClassType', state.ClassType);
			}
		}
		recentContactType = name;
		var ContactRightLi = '';
		var ContactUrl = ''; //ajax请求url
		var param = {}; //ajax请求参数
		if (name == 3) {
			$('.contact-right>div').attr('class', 'contact-list3');
			if (!state) {
				var ClassMemberType = 2;
				ContactUrl = 'PsnMgr/Contact/GetMyClassList';
				param = {
					'GradeID': '行政班ID',
					'GradeName': ''
				};
			} else {
				if (state == 2) {
					ContactUrl = 'PsnMgr/Contact/GetAllGradeList';

				} else if (state == 1) {
					ContactUrl = 'PsnMgr/Contact/GetSubjectGroupList';
				} else if (state == 5) {
					ContactUrl = 'PsnMgr/Contact/GetSubjectGroupMemberList';
				} else {
					var ClassMemberType = 2;
					ContactUrl = 'PsnMgr/Contact/GetGradeClassList';
					param = state;
					state = '';
				}

			}

			$('.assistant-popup-loading').show();
			ajaxN(ContactUrl, 'get', param, function (data) {
				$(".pager4").remove();
				$('.contact-right-empty').hide();
				$('.contact-type-text').show();
				$('.contact-li li').remove();
				var count = 0;
				$('.assistant-popup-loading').hide();
				if (data.StatusCode == 200) {
					var contactClassList = data.Data;
				} else if (data.StatusCode == 201) {
					$('.contact-right-empty').show();
					$('.contact-empty-text').text($('.contact-type-p').last().text());
					var contactClassList = [];
				} else {
					assistantTipsFn('请求错误~');
					var contactClassList = [];
				}
				var style = '';



				contactClassList.map(function (item) {

					if (!state) {
						if ($('.contact-type-p') && $('.contact-type-p').length < 3) {
							if (item.ClassName != null) {
								if (item.ClassName.indexOf('家长') > -1) {
									style = 'style="background-image:url(' + PsnMgrLgAssistantAddr +
										'/PsnMgr/LgAssistant/images/contact/通讯录头像_家长.png)"';
								} else {

									style = 'style="background-image:url(' + PsnMgrLgAssistantAddr +
										'/PsnMgr/LgAssistant/images/contact/通讯录头像_全部学生.png)"';
								}
							} else {
								return;
							}
						} else {
							style = 'style="background-image:url(' + PsnMgrLgAssistantAddr +
								'/PsnMgr/LgAssistant/images/contact/通讯录头像_班级.png)"';
						}

					} else if (state == 2) {
						style = 'style="background-image:url(' + PsnMgrLgAssistantAddr +
							'/PsnMgr/LgAssistant/images/contact/通讯录头像_年级.png)"';
					} else if (state == 1) {
						style = 'style="background-image:url(' + PsnMgrLgAssistantAddr +
							'/PsnMgr/LgAssistant/images/contact/通讯录头像_教研组.png)"';
					}
					count++;
					if (state == 2) {
						item.ClassName = item.GradeName;
						item.ClassID = item.GradeID;

					}
					if (state == 1) {
						item.ClassName = item.SubjectName;
						item.ClassID = item.SubjectID;

					}
					ContactRightLi = $(
						'<li data-class=' + item.ClassID +
						' data-usertype=' + ClassMemberType +
						' data-name=' + item.ClassName +
						' data-classtype=' + item.ClassType +
						' ><i ' + style + '></i><p><span class="contact-type-name">' +
						item.ClassName + '</span><span></span><i></i><i class="contact-chats" ></i><i></i></p></li>'
					);
					$('.contact-li ').append(ContactRightLi);
					if (state != 1 && state != 2) {
						if (ClassMemberType == 2) {
							ClassMemberType = 3;
						} else {
							ClassMemberType = 2;
						}
					}
				});
				contactSearchClick(page, name, state);
				if ($('.contact-li li') && $('.contact-li li').length > 6) {
					$('.contact-li ').css('overflow-y', 'scroll');
				} else {
					$('.contact-li ').css('overflow-y', 'hidden');
				}
			})




		} else if (name == 4) {
			$('.contact-li li').remove();
			$(".pager4").remove();
			$('.contact-right-empty').hide();
			$('.contact-right>div').attr('class', 'contact-list4');
			$('.contact-li ').css('overflow-y', 'hidden');
			var ContactRightLi = $(
				'<li class="contact-all" data-class="2" data-name="全部学生"  ><i style="background-image:url(' +
				PsnMgrLgAssistantAddr +
				'/PsnMgr/LgAssistant/images/contact/通讯录头像_全部学生.png)"></i><p><span class="contact-type-name">全部学生</span><span></span><i></i><i></i><i></i></p></li><li class="contact-all" data-class="1" data-name="全部老师"  ><i style="background-image:url(' +
				PsnMgrLgAssistantAddr +
				'/PsnMgr/LgAssistant/images/contact/通讯录头像_全部老师.png)"></i><p><span>全部老师</span><span></span><i></i><i></i><i></i></p></li>'
			);
			$('.contact-li').append(ContactRightLi);
			contactSearchClick(page, name, state);
		} else if (name == 6) {
			$('.contact-li li').remove();
			$(".pager4").remove();
			$('.contact-right-empty').hide();
			$('.contact-right>div').attr('class', 'contact-list3');
			$('.contact-li ').css('overflow-y', 'hidden');

			SubjectNameArr.map(function (item, idx) {
				var ContactRightLi = $(
					'<li data-class=' + SubjectIDArr[idx] + ' data-name=' + item + '教师组  ><i style="background-image:url(' +
					PsnMgrLgAssistantAddr +
					'/PsnMgr/LgAssistant/images/contact/通讯录头像_教研组.png)"></i><p><span class="contact-type-name">' + item +
					'教师组</span><span></span><i></i><i></i><i></i></p></li>'
				);
				$('.contact-li').append(ContactRightLi);
			});
			contactSearchClick(0, name, '');
		} else {

			if (name == 1) {
				$('.contact-right>div').attr('class', 'contact-list1');
				ContactUrl = 'PsnMgr/Contact/GetRecentContactList';
			} else if (name == 2) {
				$('.contact-right>div').attr('class', 'contact-list2');
				ContactUrl = 'PsnMgr/Contact/GetFrequentContactList';
			} else if (name == 5) {
				$('.contact-right>div').attr('class', 'contact-list3');
				ContactUrl = 'PsnMgr/Contact/GetSubjectGroupMemberList';
				param = {
					SubjectID: SubjectIDArr[0]
				};
				state = '';
			} else if (name == 'class') {
				$('.contact-right>div').attr('class', 'contact-list3');
				ContactUrl = 'PsnMgr/Contact/GetClassMemberList';
				param = state;
				state = '';
			} else if (name == 'teacher') {
				$('.contact-right>div').attr('class', 'contact-list3');
				ContactUrl = 'PsnMgr/Contact/GetSubjectGroupMemberList';
				param = state;
				state = '';
			}
			$('.assistant-popup-loading').show();
			ajaxN(ContactUrl, 'get', param, function (data) {
				$(".pager4").remove();
				$('.contact-right-empty').hide();
				$('.contact-type-text').show();
				$('.contact-li li').remove();
				$('.assistant-popup-loading').hide();
				if (data.StatusCode == 200) {
					recentContactList = data.Data;
					recentContactpager(page, name, state, recentContactScrollTop);
				} else if (data.StatusCode == 201) {
					$('.contact-right-empty').show();
					$('.contact-empty-text').text($('.contact-type-p').last().text());
					if ($('.contact-type-text').text() == '清空') {
						$('.contact-type-text').hide();
					}
				} else {
					assistantTipsFn('请求错误~');
					recentContactList = '';
				}
				if ($('.contact-li li') && $('.contact-li li').length > 6) {
					$('.contact-li ').css('overflow-y', 'scroll');
				} else {
					$('.contact-li ').css('overflow-y', 'hidden');
				}
			})
		}
	};
	//分页
	function recentContactpager(page, name, state, recentContactScrollTop) {
		name = recentContactType;
		$('.contact-right-empty').hide();
		$('.contact-type-text').show();
		$('.contact-li li').remove();
		$(".pager4").remove();
		$('.contact-type-text').show();
		recentContactList.map(function (item, idx) {
			if (idx >= page * 15 && idx < (page + 1) * 15) {
				if (name == 1 || name == 2) {
					var isContactFlag = 'contact-add ';
					var titlename = '添加到常用联系人';
					if (item.FrequentContactFlag == 1) {
						isContactFlag = 'contact-del';
						titlename = '移除常用联系人';
					}
				} else {
					var isContactFlag = '';
					var titlename = '';
				}

				ContactRightLi = $(
					'<li data-id=' + item.UserID + ' data-usertype= ' + item.UserType + ' ><i style="background-image:url(' +
					item.PhotoPath + ')"></i><p><span>' +
					item.UserName +
					'</span><span>(' + item.UserID + ')</span><i  class=' + isContactFlag +
					' title=' + titlename + ' ></i><i class="contact-chats"></i><i class="contact-mask"></i></p></li>'
				);
				$('.contact-li ').append(ContactRightLi);
			}
		});
		contactSearchClick(page, name, state);
		if (recentContactList && recentContactList.length > 15) {
			$('.contact-li ').append($('<div class="frame_pager_center pager4 "></div>'));
			setrecentContacPager(recentContactList.length, page);
		}
		if ($('.contact-li li') && $('.contact-li li').length > 6 || ($('.contact-li li') && $('.contact-li li').length >
				5 &&
				recentContactList && recentContactList.length > 15)) {
			$('.contact-li ').css('overflow-y', 'scroll');
			// console.log($('.todo-box .todo-div').length);
		} else {
			$('.contact-li ').css('overflow-y', 'hidden');
		}
		if (recentContactScrollTop) {
			$(".contact-li").scrollTop(recentContactScrollTop);
		} else {
			$('.contact-li ').scrollTop(0);
		}
	}


	// 分页函数调用
	function handlePaginationClick4(new_page_index, pagination_container) {
		setrecentContacPager(recentContactList.length, new_page_index);
		recentContactpager(new_page_index, name);
	};

	function setrecentContacPager(totalNum, currentNum) {
		$(".pager4").pagination(totalNum, {
			//回调函数，每次点击页面或上下页及跳转按钮的时候执行的函数
			callback: handlePaginationClick4,
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
		$('.pager4 .pagination .pagination_go_button').css('position', 'relative');
		$('.pager4 .pagination .pagination_go_button').append($('<div class="pager-click-shadow pager-click-shadow4"></div>'))
		$('.pager-click-shadow4').off().click(function (ev) {
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
					assistantTipsFn('输入页面超过最大页码了哦~');
					$(this).parent().parent().children('.pagination_go_input').val(' ');
					normal('.pager4 .pagination .pagination_go_input', 3);
				}

			} else {
				$(this).parent().parent().children('.pagination_go_input').val(' ');
				assistantTipsFn('输入的不是有效页码哦~');
				normal('.pager4 .pagination .pagination_go_input', 3);
			}



			ev.stopPropagation();

		})

	};
	//通讯录右边点击效果
	function contactSearchClick(page, name, state) {
		//通讯录右边列表点击效果
		var contactClick = false;
		console.log(page, name, state);
		$('.contact-li li').off('hover').hover(function () {
			$(this).children().children('.contact-mask').css('display', 'inline-block');
			contactClick = false;
		}, function () {
			if (!contactClick) {
				$(this).children().children('.contact-mask').css('display', 'none');
			} else {
				contactClick = true;
			}

		});
		$('.contact-li li').off('click').click(function () {
			if (name == 6) {
				ContactRightLi = $(
					'<li class="contact-create"><p class="contact-type-p" data-class=' + $(this).attr('data-class') + '>' + $(
						this).attr('data-name') +
					'</p> <span>></span></li>'

				);
				$('.contact-type').append(ContactRightLi);
				recentContactType = 'teacher';
				recentContactFn(0, 'teacher', {
					'SubjectID': $(this).attr('data-class')
				});
			} else if (!$(this).attr('data-class')) {
				contactClick = true;
				$('.contact-li li').attr('class', '');
				$(this).attr('class', 'contact-li-hover');
				contactIofoFn($(this).attr('data-id'), $(this).attr('data-usertype'));
				$(this).children().children('.contact-mask').css('display', 'inline-block');

			} else {
				if (name == 3 && state == '') {
					ContactRightLi = $(
						'<li class="contact-create"><p class="contact-type-p">' + $(this).attr('data-name') +
						'</p> <span>></span></li>'

					);
					$('.contact-type').append(ContactRightLi);
					recentContactType = 'class';
					recentContactFn(0, 'class', {
						'ClassID': $(this).attr('data-class'),
						'ClassMemberType': $(this).attr('data-usertype'),
						'ClassType': $(this).attr('data-classtype')
					});
				} else {
					ContactRightLi = $(
						'<li class="contact-create"><p class="contact-type-p" data-class=' + $(this).attr('data-class') + '>' + $(
							this).attr('data-name') +
						'</p> <span>></span></li>'

					);
					$('.contact-type').append(ContactRightLi);
					if ($('.contact-type li') && $('.contact-type li').length <= 2) {
						// console.log($(this).attr('data-class'));
						recentContactType = 3;
						recentContactFn(0, 3, $(this).attr('data-class'));
					} else if ($('.contact-type li') && $('.contact-type li').length == 3) {
						if ($('.contact-type .contact-type-p').eq(1).text() == "全部老师") {
							recentContactType = 'teacher';
							recentContactFn(0, 'teacher', {
								'SubjectID': $(this).attr('data-class')
							});
						} else {
							recentContactType = 3;
							recentContactFn(0, 3, {
								'GradeID': $(this).attr('data-class')
							});
						};
					} else {
						recentContactType = 1;
						recentContactFn(0, 1, '');
					};

				};
			};

		});
		//移除出常用联系人
		$('.contact-del').off('click').click(function (event) {
			if ($('.contact-type').parent().attr('class') == "contact-list2") {
				$(this).parent().parent().remove();
				$(this).attr('title', '添加到常用联系人');
				$('.assistant-popup-loading').show();
				ajaxN('PsnMgr/Contact/OperateFrequentContact', 'post', {
					"OperateFlag": -1,
					"SecretKey": "55555",
					"ContactID": $(this).parent().parent().attr('data-id'),
					"ContactUserType": $(this).parent().parent().attr('data-usertype'),
				}, function (data) {
					$('.assistant-popup-loading').hide();
					if (data.StatusCode == 200) {
						assistantSmallSuccessFn('移除成功');
						if ($('.contact-li li') && $('.contact-li li').length == 0 && page == 0) {
							$('.contact-right-empty').show();
							$('.contact-empty-text').text($('.contact-type-p').last().text());
							$('.pager4').remove();
						}
						if (page > 0 && $('.contact-li li') && $('.contact-li li').length == 0) {
							recentContactFn(page - 1, name, state);
						} else {
							var recentContactScrollTop = $(".contact-li").scrollTop();
							recentContactFn(page, name, state, recentContactScrollTop);
						}

						if ($('.contact-li li') && $('.contact-li li').length > 6) {
							$('.contact-li').css('overflow-y', 'scroll');
						} else {
							$('.contact-li').css('overflow-y', 'hidden');
						}


					} else {
						assistantTipsFn('请求错误~');
					};
				})
			} else {
				if ($(this).attr('class') == 'contact-add') {
					$(this).attr('class', 'contact-del');
					$(this).attr('title', '移除常用联系人');
					$('.assistant-popup-loading').show();
					ajaxN('PsnMgr/Contact/OperateFrequentContact', 'post', {
						"OperateFlag": 1,
						"SecretKey": "55555",
						"ContactID": $(this).parent().parent().attr('data-id'),
						"ContactUserType": $(this).parent().parent().attr('data-usertype'),
					}, function (data) {
						$('.assistant-popup-loading').hide();
						if (data.StatusCode == 200) {
							assistantSmallSuccessFn('添加成功');
						} else {
							assistantTipsFn('请求错误~');
						}
					})

				} else {
					$(this).attr('class', 'contact-add');
					$(this).attr('title', '添加到常用联系人');
					$('.assistant-popup-loading').show();
					ajaxN('PsnMgr/Contact/OperateFrequentContact', 'post', {
						"OperateFlag": -1,
						"SecretKey": "55555",
						"ContactID": $(this).parent().parent().attr('data-id'),
						"ContactUserType": $(this).parent().parent().attr('data-usertype'),
					}, function (data) {
						$('.assistant-popup-loading').hide();
						if (data.StatusCode == 200) {
							assistantSmallSuccessFn('移除成功');
							// if ($('.contact-li li') && $('.contact-li li').length > 6) {
							// 	$('.contact-li').css('overflow-y', 'scroll');
							// } else {
							// 	$('.contact-li').css('overflow-y', 'hidden');
							// }

						} else {
							assistantTipsFn('请求错误~');
						}
					})
				}
			}
			// console.log(1, $('.contact-type').parent().attr('class'));


			event.stopPropagation();
		});
		//加入常用联系人
		$('.contact-add').off('click').click(function (event) {
			if ($(this).attr('class') == 'contact-add') {
				$(this).attr('class', 'contact-del');
				$(this).attr('title', '移除常用联系人');
				$('.assistant-popup-loading').show();
				ajaxN('PsnMgr/Contact/OperateFrequentContact', 'post', {
					"OperateFlag": 1,
					"SecretKey": "55555",
					"ContactID": $(this).parent().parent().attr('data-id'),
					"ContactUserType": $(this).parent().parent().attr('data-usertype'),
				}, function (data) {
					$('.assistant-popup-loading').hide();
					if (data.StatusCode == 200) {
						assistantSmallSuccessFn('添加成功');
					} else {
						assistantTipsFn('请求错误~');
					}
				})
			} else {
				$(this).attr('class', 'contact-add');
				$(this).attr('title', '添加到常用联系人');
				$('.assistant-popup-loading').show();
				ajaxN('PsnMgr/Contact/OperateFrequentContact', 'post', {
					"OperateFlag": -1,
					"SecretKey": "55555",
					"ContactID": $(this).parent().parent().attr('data-id'),
					"ContactUserType": $(this).parent().parent().attr('data-usertype'),
				}, function (data) {
					$('.assistant-popup-loading').hide();
					if (data.StatusCode == 200) {
						assistantSmallSuccessFn('移除成功');
						if ($('.contact-li li') && $('.contact-li li').length == 0) {
							$('.contact-right-empty').show();
							$('.contact-empty-text').text($('.contact-type-p').last().text());
						}
					} else {
						assistantTipsFn('请求错误~');
					}
				})
			}


			event.stopPropagation();
			// console.log(2, $('.contact-type').parent().attr('class'));
		});
		//跳转聊天
		$('.contact-chats').off('click').click(function (event) {
			// console.log('跳转聊天');


			event.stopPropagation();
		});
		//点击右边顶部分类跳转栏
		$('.contact-type-p').off('click').click(function () {
			// console.log(111111);
			if ($('.contact-type-p') && $('.contact-type-p').length > 1) {
				$(this).parent().nextAll("li").remove();
				if ($(this).text() == '我的班级') {
					recentContactType = 3;
					recentContactFn(0, 3, '');
				} else if ($(this).text() == '全校师生') {
					recentContactType = 4;
					recentContactFn(0, 4, '');
				} else if ($(this).text() == '全部老师') {
					recentContactType = 3;
					recentContactFn(0, 3, 1);
					// console.log(111);
				} else if ($(this).text() == '全部学生') {
					recentContactType = 3;
					recentContactFn(0, 3, 2);
					// console.log(22);
				} else if ($(this).text() == '我的教师组') {
					recentContactType = 6;
					recentContactFn(0, 6, '');
					// console.log(22);
				} else {
					recentContactType = 3;
					recentContactFn(0, 3, {
						'GradeID': $(this).attr('data-class')
					});
				}
			}
		});
	};


	//通讯录获取联系人信息 参数id为联系人UserID，type为联系人UserType
	function contactIofoFn(id, type) {
		$('.assistant-popup-loading').show();
		ajaxN('PsnMgr/Contact/GetContactList', 'get', {
			UserID: id,
			UserType: type
		}, function (Data) {
			$('.assistant-popup-loading').hide();
			if (Data.StatusCode == 200) {
				data = Data.Data;
				var contactPhotoPath = "url(" + data.PhotoPath + ")";
				$('.contact-info-image').css('background-image', contactPhotoPath);
				data.UserName = htmlEncode(data.UserName);
				$('.contact-info-main div span span b').text(data.UserName);
				$('.contact-info-main div span span b').attr('title', data.UserName);
				var sexClass = '';
				if (data.Gender == "女") {
					sexClass = 'contact-info-woman';
				} else if (data.Gender == "男") {
					sexClass = 'contact-info-man';
				};
				$('.contact-message-ul li').attr('class', '');
				if (!data.Telephone) {
					data.Telephone = '未设置';
					$('.contact-message-ul li').eq(0).attr('class', 'contact-message-empty');
				}
				if (!data.QQ) {
					data.QQ = '未设置';
					$('.contact-message-ul li').eq(1).attr('class', 'contact-message-empty');
					$('.lgAssistant-main-QQ').hide();
				} else {
					$('.lgAssistant-main-QQ').attr('href', 'tencent://message/?uin=' + data.QQ + '&Site=唤起QQ&Menu=yes');
					$('.lgAssistant-main-QQ').show();
				}
				if (!data.Weixin) {
					data.Weixin = '未设置';
					$('.contact-message-ul li').eq(2).attr('class', 'contact-message-empty');
					$('.lgAssistant-main-WX').hide();
					$('.lgAssistant-main-WX').attr('target', '');
				} else {
					$('.lgAssistant-main-WX').attr('target', '_blank');
					$('.lgAssistant-main-WX').show();
				}
				if (!data.Weibo) {
					data.Weibo = '未设置';
					$('.contact-message-ul li').eq(3).attr('class', 'contact-message-empty');
					$('.lgAssistant-main-WB').hide();
					$('.lgAssistant-main-WB').attr('target', '');
				} else {
					$('.lgAssistant-main-WB').attr('target', '_blank');
					$('.lgAssistant-main-WB').show();
				}
				$('.contact-info-main div>span>span>i').attr('class', sexClass);
				data.UserID = htmlEncode(data.UserID);
				data.GroupName = htmlEncode(data.GroupName);
				data.Sign = htmlEncode(data.Sign);
				$('.contact-info-id').text(data.UserID);
				$('.contact-info-id').attr('title', data.UserID);
				$('.contact-info-id').attr('data-type', data.UserType);
				$('.contact-info-class').text(data.GroupName);
				$('.contact-info-class').attr('title', data.GroupName);
				if (!data.Sign) {
					$('.contact-info-sign').html('<i></i>' + '这人很懒，什么也没有留下~');
				} else {
					$('.contact-info-sign').html('<i></i>' + data.Sign);
				}
				$('.contact-info-sign').attr('title', data.Sign);
				$('#contact-copy-text1').text(data.Telephone);
				$('#contact-copy-text2').text(data.QQ);
				$('#contact-copy-text3').text(data.Weixin);
				$('#contact-copy-text4').text(data.Weibo);
				$('.contact-info').show();
				$('.contact-message-ul li a').off().click(function () {
					ajaxN('PsnMgr/Contact/OperateRecentContact', 'post', {
						"OperateFlag": 1, //  1添加  -2 清空
						"SecretKey": "55555",
						"ContactID": $('.contact-info-id').text(), //  所要添加的常用联系人ID
						"ContactUserType": $('.contact-info-id').attr('data-type'), //  所要添加的常用联系人用户类型   0或6代表管理员  1教师 2学生 3家长
					}, function (data) {

					})
				});
				$('.contact-info div').eq(1).animate({
					right: '0'
				}, 'slow', function () {
					$('.contact-info div').eq(0).show();
				});
			} else {
				assistantTipsFn('请求错误~');
			}
		})
	};

	//通讯录搜索功能 生成通讯录查找列表信息 state为1时是左边搜索 state不为1时是右边搜索，page是页数
	function contactSearchFn(searchStr, state, page) {
		var searchType = 0;
		if (state != 1) {
			contactSearchStr = searchStr;
			searchType = 1
		} else {
			$('.frame_point_loading_container').hide();
		}
		$('.assistant-popup-loading').show();
		ajaxN('PsnMgr/Contact/SearchContactInfo', 'get', {
			SearchType: searchType
		}, function (data) {
			$('.frame_point_loading_container').show();
			$('.pager5').hide();
			if (data.StatusCode == 200) {
				var contactSearchList = data.Data;
				searchStr = searchStr.replace(/\s*/g, "");
				var searchlength = searchStr.length;
				var searchArr = searchStr.split('');
				var UserNameArr = [];
				var UserIDAr = [];
				lastSearchList = [];
				contactSearchList.map(function (item) {
					var searchNameCount = 0;
					var searchIdCount = 0;
					UserNameArr = item.UserName.split('');
					UserIDArr = item.UserID.split('');
					searchArr.map(function (it) {
						if (UserNameArr.indexOf(it) != -1) {
							searchNameCount++;
						}
						if (UserIDArr.indexOf(it) != -1) {
							searchIdCount++;
						}
					})

					if (searchNameCount == searchlength || searchIdCount == searchlength) {
						lastSearchList.push(item);
					}

				});

				if (state == 1 && lastSearchList && lastSearchList.length > 0) {
					$('.contact-left-popup li').remove();
					$('.contact-left-popup').show();
					var searchListLi = '';
					var UserNameB = '';
					var UserIDB = '';
					lastSearchList.map(function (item, idx) {
						UserNameArr = item.UserName.split('');
						UserNameB = '';
						var arrLength1 = UserNameArr.length;
						UserNameArr.map(function (it, index) {
							if (index < 29) {
								if (searchArr.indexOf(it) != -1) {
									// searchNameCount++;
									UserNameB += ' <b class="contact-search-red">' + it + '</b> '
								} else {
									UserNameB += ' <b class="contact-search-break">' + it + '</b> '
								}
							}



						})
						UserIDArr = item.UserID.split('');
						UserIDB = '';
						var arrLength2 = UserIDArr.length;
						UserIDArr.map(function (it, index) {
							if ((arrLength1 * 1 + index * 1) < 29) {
								if (searchArr.indexOf(it) != -1) {
									// searchNameCount++;
									UserIDB += ' <b class="contact-search-red">' + it + '</b> '
								} else {
									UserIDB += ' <b class="contact-search-break">' + it + '</b> '
								}
							}



						})
						item.UserNameTitle = '""';
						if ((arrLength1 * 1 + arrLength2 * 1) > 29) {
							item.UserNameTitle = '"' + item.UserName + '(' + item.UserID + ')>"';
							UserIDB += ' <b class="contact-search-break">...</b> ';
						}
						if (idx < 7) {
							item.UserName = htmlEncode(item.UserName);
							searchListLi = $('<li class="search-left-li" data-id=' + item.UserID + ' data-usertype=' + item.UserType +
								' ><i style="background-image:url(' + item.PhotoPath +
								')"></i> <span title = ' + item.UserNameTitle + '>' + UserNameB + '<b>(</b> ' + UserIDB +
								')</b> <i></i></span></li>');
							$('.contact-left-popup').append(searchListLi);
						}

					});
					$('.search-left-li').off().click(function () {
						contactIofoFn($(this).attr('data-id'), $(this).attr('data-usertype'))

					});
				} else {
					if (lastSearchList && lastSearchList.length == 0) {
						// assistantTipsFn('未找到相关联系人~');

						if (state == 1) {
							$('.contact-left-popup li').remove();
							$('.contact-left-popup').show();
							$('.contact-left-popup').append($('<li class=" search-left-empty"> 找不到与“<b>' + searchStr +
								'</b>”相关的联系人</li>'));
						}

					}
					$('.contact-search-p').show();
					$('.contact-search-number').text(lastSearchList.length);
					// $('.contact-left-popup').hide();
					$('.contact-search-li').remove();
					if (lastSearchList && lastSearchList.length > 0) {
						// console.log(lastSearchList.length);
						lastSearchList.map(function (item, idx) {
							if (idx >= page * 9 && idx < (page + 1) * 9) {
								var contactSearchClass1 = '';
								var contactSearchClass2 = '';
								var contactSearchli = '';
								if (item.FrequentContactFlag != 1) {
									contactSearchClass1 = 'contact-search-button1';
								} else {
									contactSearchClass1 = 'contact-search-button2';
								}
								if (item.UserTypeName != '') {
									contactSearchClass2 = 'contact-search-type';
								}
								item.UserID = htmlEncode(item.UserID);
								contactSearchli = $('<li class="contact-search-li ' + contactSearchClass1 +
									'"> <i style = "background-image:url(' + item.PhotoPath +
									')" > </i> <span> <b> ' + item.UserName + ' </b> <b title=' + item.UserID + ' >[' + item.UserID +
									']</b> </span> <span class =' +
									contactSearchClass2 + '>' + item.UserTypeName +
									' </span> <button type = "button" class="contact-search-add" data-id=' + item.UserID +
									' data-usertype=' +
									item
									.UserType + ' > 添加 </button> <button type = "button" disabled > 已添加 </button> </li>'
								);
								$('.contact-search-ul').append(contactSearchli);
							}
						});
						if (lastSearchList && lastSearchList.length > 9) {
							$('.pagination').show();
							$('.pager5 ').show();
							setPager(lastSearchList.length, page);
						}
					} else {
						$('.pagination').hide();
					};
					//点击添加按钮添加常用联系人
					$('.contact-search-add').click(function () {
						// console.log($(this).parent().parent());
						$(this).parent().attr('class', 'contact-search-li contact-search-button2');
						$('.assistant-popup-loading').show();
						ajaxN('PsnMgr/Contact/OperateFrequentContact', 'post', {
							"OperateFlag": 1, //  1添加  -1 移除
							"ContactID": $(this).attr('data-id'), //当前用户ID
							"ContactUserType": $(this).attr('data-usertype'), //当前用户类型 
							"SecretKey": "55555"
						}, function (data) {
							$('.assistant-popup-loading').hide();
							if (data.StatusCode == 200) {
								assistantSmallSuccessFn('添加成功~');
							} else {
								assistantTipsFn('请求错误~');
							}
						})
					});
				}
			} else {
				assistantTipsFn('请求错误~');
			}
			$('.assistant-popup-loading').hide();
		});
	};

	// 分页函数调用
	function handlePaginationClick(new_page_index, pagination_container) {
		setPager(lastSearchList.length, new_page_index);
		contactSearchFn(contactSearchStr, 0, new_page_index);
	};

	function setPager(totalNum, currentNum) {
		$(".pager5").pagination(totalNum, {
			//回调函数，每次点击页面或上下页及跳转按钮的时候执行的函数
			callback: handlePaginationClick,
			//初始化时，高亮的页码，默认为0，即第一页
			current_page: currentNum,
			//每页项目数，默认为10，这仅仅用于计算分页ui的显示，实际数据的写入需要回调函数完成
			items_per_page: 9,
			//显示可点击页码数量
			num_display_entries: 3,
			prev_text: '<',
			next_text: '>',
			link_to: 'javascript:;'
		})
		$('.pager5 .pagination .pagination_go_button').css('position', 'relative');
		$('.pager5 .pagination .pagination_go_button').append($('<div class="pager-click-shadow pager-click-shadow5"></div>'))
		$('.pager-click-shadow5').off().click(function (ev) {
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
					assistantTipsFn('输入页面超过最大页码了哦~');
					$(this).parent().parent().children('.pagination_go_input').val(' ');
					normal('.pager5 .pagination .pagination_go_input', 3);
				}

			} else {
				$(this).parent().parent().children('.pagination_go_input').val(' ');
				assistantTipsFn('输入的不是有效页码哦~');
				normal('.pager5 .pagination .pagination_go_input', 3);
			}




			ev.stopPropagation();


		})

	};

	//复制功能
	function copyToClipboard(elem) {
		var targetId = "_hiddenCopyText_";
		var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
		var origSelectionStart, origSelectionEnd;
		if (isInput) {
			// 如果是input标签或textarea，则直接指定该节点
			target = elem;
			origSelectionStart = elem.selectionStart;
			origSelectionEnd = elem.selectionEnd;
			// console.dir(elem);
			// console.log(elem.selectionEnd);
		} else {
			// 如果不是，则使用节点的textContent
			target = document.getElementById(targetId);
			if (!target) {
				//如果不存在，则创建一个
				var target = document.createElement("textarea");
				target.style.position = "absolute";
				target.style.left = "-9999px";
				target.style.top = "0";
				target.id = targetId;
				$('.contact-message-ul').append(target);
				// document.body.appendChild(target);
			}
			target.textContent = elem.textContent;
		}
		// 聚焦目标节点，选中它的内容
		var currentFocus = document.activeElement;
		target.focus();
		target.setSelectionRange(0, target.value.length);
		// 进行复制操作
		var succeed;
		try {
			succeed = document.execCommand("copy");
		} catch (e) {
			succeed = false;
		}
		// 不再聚焦
		if (currentFocus && typeof currentFocus.focus === "function") {
			currentFocus.focus();
		}
		if (isInput) {
			// 清空临时数据
			elem.setSelectionRange(0, 0);
		} else {
			// 清空临时数据
			target.textContent = "";
		}
		return succeed;
	};
	//点击重新登录刷新页面
	$('.assistant-outline-true').click(function () {
		history.go(0);
	})
};
//离线判断函数(掉线检测)
function AgassitantCallbackFn(result) {
	console.log(result);
	if (result.error == 0) {
		if (result.data.result.charAt(result.data.result.length - 1) == 0) {
			$('.assistant-outline').show();
			clearInterval(laAssistantOnlineTimer);
			$('.assistant-hover-box').off().click(function () {
				history.go(0);
			});
		}
	}
	if (result.error == 3) {
		$('.assistant-outline').show();
		clearInterval(laAssistantOnlineTimer);
		$('.assistant-hover-box').off().click(function () {
			history.go(0);
		});
	}

}