/*此页为欢迎屏的设置*/
/*欢迎屏幕设置接口
  welcomescreen.close();
  welcomescreen.open();
  welcomescreen.next();
  welcomescreen.previous();
*/
var myapp = myapp || {};
myapp.pages = myapp.pages || {};
myapp.appIndex = function (myapp, $$) {
  // 获取cookie
  function getCookie(cname)
  {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
      var c = ca[i].trim();
      if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    }
    return "";
  }
  // 设置了 cookie 名、cookie 值、cookie过期时间(秒)。
  function setCookie(cname,cvalue,exdays){
    var d = new Date();
    d.setTime(d.getTime()+(exdays*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  }
  // 模板引擎
  (function(){
    var $template,t7html,compiledTemplate,
    $template=$$('#lunbo').html();
    compiledTemplate=Template7.compile($template);
    t7html=compiledTemplate(context);
    $$('#lunbo').html(t7html);

    $template=$$('#news').html();
    compiledTemplate=Template7.compile($template);
    t7html=compiledTemplate(context);
    $$('#news').html(t7html);

    $template=$$('#course').html();
    compiledTemplate=Template7.compile($template);
    t7html=compiledTemplate(context);
    $$('#course').html(t7html);

    $template=$$('#register').html();
    compiledTemplate=Template7.compile($template);
    t7html=compiledTemplate(context);
    $$('#register').html(t7html);

    $template=$$('#menuList').html();
    compiledTemplate=Template7.compile($template);
    t7html=compiledTemplate(context);
    $$('#menuList').html(t7html);
  }());
  //微信相关
  (function(){
    var access_token,savetime;
    var url="";
    var wxapp={
      grant_type:'client_credential',
      appid:'wxbac4e99f68273fca',
      secret:'d4624c36b6795d1d99dcf0547af5443d'
    }
    var cookieName=getCookie('access_token')
    if(cookieName==''){
      $$.get('https://api.weixin.qq.com/cgi-bin/token',wxapp,function(data){
        access_token=data['access_token'];
        savetime=parseInt(data['expires_in']);
        setCookie('access_token',access_token,savetime);
      })
    }else{
      access_token=cookieName;
    }
  }());
  // 主体代码
  (function(){
    // 页面缓存
    /*window.addEventListener('load', function(e){
      window.applicationCache.addEventListener('updateready', function(e){
        console.log("状态："+window.applicationCache.status);
        if(window.applicationCache.status==window.applicationCache.UPDATEREADY){
          window.applicationCache.swapCache();
          if(confirm('webapp有新版本更新，是否更新？')){
            window.location.reload();
          }
        }else{
          console.log('webapp为最新版！');
        }
      }, false)
    }, false)*/
    var view1 = myapp.addView('#tab1',{
      dynamicNavbar: true,
    });
    var view2 = myapp.addView('#tab2', {
      dynamicNavbar: true,
    });
    var view3 = myapp.addView('#tab3',{
      dynamicNavbar: true,
    });
    var view4 = myapp.addView('#tab4',{
      dynamicNavbar: true,
    });
    // 添加轮播图
    var mySwiper1 = myapp.swiper('.lb1', {
      pagination:'.lb1 .swiper-pagination',
      speed: 400,
      spaceBetween: 50,
      autoplay: 3000,
      autoplayDisableOnInteraction:false,
      effect:'slide'
    });
    // 机器人聊天页的布局和设定
    $$(".messagebar").css("bottom","50px");
    var myMessages = myapp.messages('.messages', {
      autoLayout:true
    });
    $$(".toolbarText").css("height","2rem");
    $$(".toolbarText").on("input",function(event){
      var $this=$$(this);
      var $toolbar=$$("#tab3 .toolbar");
      if($this.scrollTop()>0&&$this.height()<92){
        $this.css("height",$this.height()+20+"px");
        $toolbar.css("height",$this.height()+16+"px");
      }
      if($this.scrollTop()==0&&$this.height()>32){
        $this.css("height",$this.height()-20+"px");
        $toolbar.css("height",$this.height()+16+"px");
      }
    });
    $$("#tab3 .page-content").css("padding-bottom","94px");
    $$(".messageSend").on("click",function(event){
      var $toolbarText=$$(".toolbarText");
      var $messageStr=$toolbarText.val();
      var $info=$messageStr.trim();
      if($info.length===0)return;
      $toolbarText.val("");
      var now=new Date();
      var timeStr=now.getMonth()+"月"+now.getDate()+"日 <span>"+now.getHours()+":"+((now.getMinutes()<10)?('0'+now.getMinutes()):now.getMinutes())+"<\/span>";
      var messageHtml="<div class='messages'>"+
        "<div class='messages-date'>"+timeStr+"<\/div>"+
        "<div class='message message-sent'>"+
          "<div class='message-text'>"+
            $messageStr+
          "<\/div>"+
        "<\/div>"+
      "<\/div>";
      $$(".messages-content").append(messageHtml);
      $$.post('http://www.tuling123.com/openapi/api', {key:'1a8439e69be94c379b6f605e4cba43b1', info:$info,userid:"123456789"}, function (data) {
        var obj = eval ("(" + data + ")");
        console.log(obj);
        var bz=false;
        if(obj.code==200000){
          bz=true;
        }
        var reveiveHtml="<div class='message message-with-avatar message-received'>"+
          "<div class='message-name'>小集</div>"+
          "<div style='background-image:url(./images/robot.png)' class='message-avatar'><\/div>"+
          "<div class='message-text'>"+(bz?(obj.text+"<a href='"+obj.url+"'>"+obj.url+"</a>"):obj.text)+"<\/div>"+
        "<\/div>";
        $$(".messages-content").append(reveiveHtml);
        $$(".message-avatar").css("top","30px");
        bz=false;
        $$("#tab3 .page-content").scrollTop(100000);
      });
    });
    /*聊天页发送图片*/
    $$("#fileEle").change(function(e){
      var files=this.files;
      if(files.length){
        var imgs="<div style='float:right;' class='message-text'>";
        for (var i = 0; i < files.length; i++) {
          imgs+='<img style="float:right;" src="'+(window.URL.createObjectURL(files[i]))+'">';
        }
        imgs+="<\/div>";
        var now=new Date();
        var timeStr=now.getMonth()+"月"+now.getDate()+"日 <span>"+now.getHours()+":"+((now.getMinutes()<10)?('0'+now.getMinutes()):now.getMinutes())+"<\/span>";
        var messageHtml="<div class='messages'>"+
          "<div class='messages-date'>"+timeStr+"<\/div>"+
          "<div class='message message-sent'>"+
            imgs+
          "<\/div>"+
        "<\/div>";
        console.log(messageHtml);
        $$(".messages-content").append(messageHtml);
        $$("#tab3 .page-content").scrollTop(100000);
      }
    })
    // 返回顶部按钮
    $$(".footerTop img").on("click",function(event){
      var $page;
      if($$("#tab1").hasClass('active')){
        $page=$$("#tab1 .page-content");
      }else if($$("#tab4").hasClass('active')){
        $page=$$("#tab4 .page-content");
      }
      var pageHeight=$page.scrollTop();
      if(pageHeight==0)return;
      var timer = setInterval(function(){
        pageHeight/=2;
        $page.scrollTop(pageHeight);
        if(pageHeight<10){
          clearInterval(timer);
        }
      },50);
      $page.scrollTop(0);
    });
    // 软件详情页
    $$(document).on('pageInit', '.page[data-page="appdown"]', function (e) {
      var mySwiper2 = myapp.swiper('.swiperAppdown', {
        pagination:'.swiperAppdown .swiper-pagination',
        slidesPerView: 1.3,
        paginationClickable: true,
        spaceBetween: 20
      });
    });
    // 设置的路由
    $$(".setting").on("click",function(event){
      routerUrl("html/setting.html");
    });
    $$(".toabout").on("click",function(event){
      routerUrl("html/about.html");
    });
    $$(".personalInfo").on("click",function(){
      routerUrl("html/info_detail.html");
    });
    // 相对于视图路由函数，url为跳转地址
    function routerUrl(url){
      if($$("#tab1").hasClass('active')){
        view1.router.loadPage(url);
      }else if($$("#tab2").hasClass('active')){
        view2.router.loadPage(url);
      }else if($$("#tab3").hasClass('active')){
        view3.router.loadPage(url);
      }else if($$("#tab4").hasClass('active')){
        view4.router.loadPage(url);
      };
    };
    $$(".live-link").on("click",function(event){
      var $this=$$(this);
      $$(".live-cover").remove();
      $this.prepend('<div class="live-cover"><img src="images/play.png"></div>');
    })
    $$(document).on('pageInit', function (e) {
      if($$(".page").length!=5){
        $$(".indexTool").hide();
      };
    })
    $$(document).on('pageAfterBack',function(e){
      setTimeout(function(){
        if($$(".page").length==5){
          $$(".indexTool").show();
        }
      },100);
    })
    $$('body').on('click',function(event){
      var target=event.target;
      /*app主题切换*/
      if(target.id=='moodCheck'){
        if(target.checked==true){
          $$('body').addClass('layout-dark');
        }else{
          $$('body').removeClass('layout-dark');
        }
      }
    })
    /*下拉刷新*/
    $$('.pull-to-refresh-content').on('refresh',function(e){
      setTimeout(function(){
        myapp.pullToRefreshDone();
      },2000)
    });
		myapp.onPageBeforeInit('setting', function(page){
			$('#loginout').on('click', function(e){
				$.post('/quit', {}, function(res){
					if(res.status=='success'){
						myapp.alert(res.msg, 'app提醒');
						setTimeout(function(){
							location.reload();
						}, 1500)
					}
				}, 'json')
			})
		})
		myapp.onPageBeforeInit('info_detail', function(page){
			function resetinfo(){
				eval($('#infomation').val());
				$('input[name="info_username"]').attr('placeholder', info.username);
				$('input[name="info_email"]').attr('placeholder', info.email);
				$('input[name="info_email"]').val('');
				$('input[name="info_sex"]').attr('placeholder', info.sex);
				$('input[name="info_sex"]').val('');
				$('input[name="info_blog"]').attr('placeholder', info.blog);
				$('input[name="info_blog"]').val('');
				$('input[name="info_intro"]').attr('placeholder', info.intro);
				$('input[name="info_intro"]').val('');
				$('input[name="info_create"]').attr('placeholder', info.createtime.substring(0,10));
				if(info.headimg)$('#head_img').attr('src', info.headimg);
			}
			resetinfo();
			$('#upload_img').on('change', function(e){
				var upimg = $('#upload_img');
				var getData = upimg[0].files[0];
				var fd = new FormData();
				fd.append("imageIcon", getData);
				$.ajax({
					url: '/img_upload',
					type: 'POST',
					data: fd,
					processData: false,
					contentType: false,
					success: function(res){
						console.log(res);
						if(res.status == 'success'){
							$('#head_img').attr('src', res.headimg);
							$('#infomation').attr('value', res.infomation);
							if(res.headimg)$('#headimg_main').attr('src', res.headimg);
						}else myapp.alert(res.msg, '错误提示');
					}
				})
			})
			$('#saveinfo').on('click', function(e){
				$.post('/update_info', {
					email: $('input[name="info_email"]').val(),
					sex: $('input[name="info_sex"]').val(),
					blog: $('input[name="info_blog"]').val(),
					intro: $('input[name="info_intro"]').val()
				}, function(res){
					if(res.status == 'success'){
						$('#infomation').attr('value', res.infomation);
						$('.email').text(res.email);
						resetinfo();
						myapp.alert(res.msg, 'app提示');
					}else{myapp.alert(res.msg, '错误提醒')}
				}, 'json');
			});
			$('#save_btn').on('click', function(e){$('#saveinfo').trigger('click');});
			$('#reset_btn').on('click', function(e){resetinfo();});
		})
  }());
};
