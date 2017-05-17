var myapp = myapp || {}; 
myapp.pages = myapp.pages || {}; 
myapp.welcome = function (myapp, $$) {
  // 引导页js代码
  (function(){
    var logintext=
          '<div class="login-screen-title">用户登录</div>'+
          '<div class="list-block">'+
              '<ul>'+
                  '<li>'+
                      '<div class="item-content">'+
                          '<div class="item-media">'+
                              '<i class="icon icon-form-name"></i>'+
                          '</div>'+
                          '<div class="item-inner">'+
                              '<input type="text" name="name" id="username" placeholder="手机号/邮箱/用户名">'+
                          '</div>'+
                      '</div>'+
                  '</li>'+
                  '<li>'+
                      '<div class="item-content">'+
                          '<div class="item-media"><i class="icon icon-form-email"></i></div>'+
                          '<div class="item-inner">'+
                              '<input type="password" id="userpasswd" name="passwd" placeholder="密码" style="width: 70%;"><a href="#" class="forgetpasswd">找回<br>密码</a>'+
                          '</div>'+
                      '</div>'+
                  '</li>'+
              '</ul>'+
          '</div>'+
          '<p><a href="#" class="button button-big button-fill color-green login-btn">登录</a></p>'+
          '<p style="text-align: center;">没有账号？<a href="#" class="open-popup" data-popup=".register-screen">立即注册</a></p>'+
          '<div class="login_method">'+
              '<div class="login_method_title">第三方登录</div>'+
              '<div class="row">'+
                  '<div class="col-33">'+
                      '<span id="qqLoginBtn" class=""><a href="javascript:;" onclick="return window.open(\'https://graph.qq.com/oauth2.0/authorize?client_id=100229030&amp;response_type=token&amp;scope=all&amp;redirect_uri=http%3A%2F%2Fqzonestyle.gtimg.cn%2Fqzone%2Fopenapi%2Fredirect-1.0.1.html\', \'oauth2Login_10124\' ,\'height=525,width=585, toolbar=no, menubar=no, scrollbars=no, status=no, location=yes, resizable=yes\');" class=""><img src="lib/framework7/img/qqlogin.svg" alt="QQ登录" border="0"></a></span>'+
                  '</div>'+
                  '<div class="col-33">'+
                      '<img src="lib/framework7/img/wechatlogin.svg" id="wechatLoginBtn">'+
                  '</div>'+
                  '<div class="col-33">'+
                      '<div id="wb_connect_btn"></div>'+
                  '</div>'+
              '</div>'+
          '</div>';
    var options = {
      'bgcolor': '#0da6ec',
      'fontcolor': 'yellow',
      'onOpened': function () {
        console.log("welcome screen opened");
      },
      'onClosed': function () {
        console.log("welcome screen closed");
      }
    },
    welcomescreen_slides = [
      {
        id: 'slide0',
        picture: '<img src="images/welcome2.jpg">',
        text: '引导教程共四步能让你快速上手此应用，请向左滑动查看下一页。'
      },
      {
        id: 'slide1',
        picture: '<img src="images/welcome3.jpg">',
        text: '第二页'
      },
      {
        id: 'slide2',
        picture: '<img src="images/welcome4.jpg">',
        text: '第三页'
      },
      {
        id: 'slide3',
        picture: '<img src="images/welcome1.jpg">',
        text: logintext
      }
    ],
    welcomescreen = myapp.welcomescreen(welcomescreen_slides, options);
    $$("#slide3 .welcomescreen-text").css("bottom",Math.floor(($$(".welcomescreen-picture").height()-521.5)/2)+"px");
    $$("#slide3 .welcomescreen-text ul").css("opacity","0.7");
    /* 移动注册页到引导层 */
    $$('.welcomescreen-container').append($$('.popup-register').html());
    $$('.popup-register').remove();
    /* 移动服务条款弹出框到引导层 */
    $$('.welcomescreen-container').append($$('.issues-info').html());
    $$('.issues-info').remove();
		/*登录页输入框验证 开始*/
		$$(".welcomescreen-text .login-btn").on('click', function(event) { 
			var username=$$("#username").val(),
					userpasswd=$$("#userpasswd").val();
			var bz=0;
			if(username=="test" && userpasswd=="test"){
				welcomescreen.close();
			}else if ($$("#username").val()==""||$$("#userpasswd").val()=="") {
				if($$("#username").val()==""){
					$$("#username").css("border","1px solid red");
					myapp.alert("用户名不能为空","登录提示");
					bz=1;
				}
				if($$("#userpasswd").val()==""){
					$$("#userpasswd").css("border","1px solid red");
					if (bz==0) myapp.alert("密码不能为空","登录提示");
				}
			}else{
				$.post('/login', {'username': username, 'password': userpasswd}, function(res){
					if(res.status == 'error'){
						myapp.alert(res.msg,"登录提示");
					}else if(res.status == 'success'){
						myapp.alert(res.msg,"登录提示");
						$('.nickName').text(res.user);
						$('.email').text(res.email);
						$('#infomation').attr('value', res.infomation);
						if(res.headimg)$('#headimg_main').attr('src', res.headimg);
						welcomescreen.close();
					}
				}, 'json');
			}
		});
		$$("#username").blur(function(event){
			if($$(this).val()==""){
				$$(this).css("border","1px solid red");
			}
		})
		$$("#username").focus(function(event){
			$$(this).css("border","");
		})
		$$("#userpasswd").blur(function(event){
			if($$(this).val()==""){
				$$(this).css("border","1px solid red");
			}
		})
		$$("#userpasswd").focus(function(event){
			$$(this).css("border","");
		})
		/*登录页输入框验证 结束*/
		/*第三方登录之微博 开始*/
    /*微博登录按钮显示复位*/
    setTimeout(function(){
      $$("#wb_connect_btn img").attr({
        src: 'lib/framework7/img/webologin.svg'
      });
      $$("#qqLoginBtn img").attr({
        src: 'lib/framework7/img/qqlogin.svg'
      });
    },1000);
    //WB2.anyWhere(function (W) {
    //    W.widget.connectButton({
    //        id: "wb_connect_btn",
    //        type: '4,1',
    //        callback: {
    //            login: function (o) { //登录后的回调函数
    //                welcomescreen.close();
    //                console.log('微博已经登录过了');
    //            },
    //            logout: function () { //退出后的回调函数
    //                alert('logout');
    //            }
    //        }
    //    });
    //});
    /*第三方登录之微博 结束*/
    /*第三方登录之QQ 开始*/
    //QC.Login({
    //   btnId:"qqLoginBtn"    //插入按钮的节点id
    //});
    //QC.api("get_user_info", {})
    //.success(function (s) {//成功回调
    //    //alert("当前用户昵称为：" + s.data.nickname + "  性别为：" + s.data.gender);
    //    welcomescreen.close();
    //    console.log('qq已经登录过了');
    //}).error(function (f) {//失败回调
    //    //alert("获取用户信息失败！");
    //}).complete(function (c) {//完成请求回调
    //    //alert("获取用户信息完成！");
    //});
    /*第三方登录之微博 结束*/
    /*注册页的日期设置 开始*/
    var today=new Date();
    var registerDate=myapp.picker({
      input: '#picker-date',
      rotateEffect: true,
      value: [today.getFullYear(),today.getMonth(),today.getDate()],
      formatValue: function(picker,values,displayValues){
        return values[0]+'-'+(values[1]<10?('0'+values[1]):values[1])+'-'+(values[2]<10?('0'+values[2]):values[2]);
      },
      toolbarTemplate:
        '<div class="toolbar">' +
            '<div class="toolbar-inner">' +
                '<div class="left"></div>' +
                '<div class="right">' +
                    '<a href="#" class="link close-picker">选择</a>' +
                '</div>' +
            '</div>' +
        '</div>',
      cols:[
        {
          values: (function(){
            var arr=[];
            for(var i=1950;i<=2030;i++){arr.push(i);}
            return arr;
          })(),
        },
        {
            divider: true,
            content: ' - '
        },
        {
          values: [1,2,3,4,5,6,7,8,9,10,11,12],
        },
        {
            divider: true,
            content: ' - '
        },
        {
          values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        },
      ]
    });
    /*注册页的日期设置 结束*/
		/*注册页输入框 开始*/
		$('.register-btn').on('click', function(event){
			if($('#reg_email').val() == '')
				myapp.alert("请输入邮箱，便于密码找回!","注册提示");
			else if($('#reg_username').val() == '' || $('#reg_password').val() == '' || $('#reg_passwordagain').val() == '')
				myapp.alert("用户名或密码不能为空!","注册提示");
			else if($('#reg_password').val() != $('#reg_passwordagain').val())
				myapp.alert("两次密码输入不一致","注册提示");
			else if($('.reg_birthday').val() == '')
				myapp.alert("请选择出生年月!","注册提示");
			else if($('#agree')[0].checked == false)myapp.alter("请在已阅读本条款前面打勾！","注册提示");
			else {
				$.ajax({
					type: 'POST',
					url: '/register',
					dataType: 'json',
					data: {
						username: $('#reg_username').val(),
						password: $("#reg_password").val(),
						email: $("#reg_email").val(),
						sex: $("input[name='sex']:checked")[0].defaultValue,
						birthday: $('.reg_birthday').val()
					},
					success: function(res){
						if(res.status == 'error'){
							myapp.alert(res.msg,"注册提示");
						}else if(res.status == 'success'){
							myapp.alert(res.msg + ' 请登录',"注册提示");
							setTimeout(function(){
								myapp.closeModal('.register-screen');
							}, 1500);
						}
					}
				});
			}
		});
		/*注册页输入框 结束*/
  }());
}
