var context={
	// 轮播图#lunbo
  lunbo:["images/hk1.jpg","images/hk2.jpg","images/hk3.jpg","images/hk4.jpg"],
  // 新闻动态#news
  news:[
  	{
      title: "ArchSummit全球架构师峰会于12月2日举行",
      time: "11-20"
    },{
      title: "11月16日第三届世界互联网大会在浙江乌镇",
      time: "11-12"
    },{
      title: "360安全联队10秒攻破难度最高的项目",
      time: "11-10"
    },{
      title: "11月10日世界黑客大赛PwnFest在韩国首尔正式开赛",
      time: "11-02"
    },{
      title: "KCon 黑客大会2016于8月26日隆重举行",
      time: "08-20"
  	}
  ],
  // 视频课程#course
  course:[
  	{
	  	title: "推荐课程",
	  	courseStatus: [{
	  		name: "python hacking",
	  		src: "images/teach1.jpg",
	  		runTime: "23小时",
	  		status: "已完结"
	  	},{
	  		name: "移动应用安全",
	  		src: "images/teach2.jpg",
	  		runTime: "56小时",
	  		status: "已完结"
	  	},{
	  		name: "web2.0 xss透析",
	  		src: "images/teach3.jpg",
	  		runTime: "6小时",
	  		status: "已完结"
	  	},{
	  		name: "实战--arp断网攻击",
	  		src: "images/teach4.jpg",
	  		runTime: "1小时",
	  		status: "已完结"
	  	},]
	  },{
	  	title: "热门课程",
	  	courseStatus: [{
	  		name: "nmap端口扫描",
	  		src: "images/teach5.jpg",
	  		runTime: "1小时",
	  		status: "已完结"
	  	},{
	  		name: "kali安装与配置",
	  		src: "images/teach6.jpg",
	  		runTime: "2小时",
	  		status: "已完结"
	  	},{
	  		name: "sqlmap教程",
	  		src: "images/teach7.jpg",
	  		runTime: "2小时",
	  		status: "已完结"
	  	},{
	  		name: "metasploit功能实战",
	  		src: "images/teach8.jpg",
	  		runTime: "8小时",
	  		status: "已完结"
	  	},]
	  }
  ],
  // 注册#register
  register:[
  	{
  		title: "邮箱账号",
  		input: "<input id='reg_email' type='text' name='email'>"
  	},{
  		title: "昵称",
  		input: "<input id='reg_username' type='text' name='username'>"
  	},{
  		title: "密码",
  		input: "<input id='reg_password' type='password' name='password'>"
  	},{
  		title: "确认密码",
  		input: "<input id='reg_passwordagain' type='password' name='passwordagain'>"
  	},{
  		title: "性别",
  		input: "<input class='sexman' type='radio' name='sex' value='男' checked>男<input calss='sexwoman' type='radio' name='sex' value='女'>女"
  	},{
  		title: "出生日期",
  		input: "<input class='reg_birthday' type='text' placeholder='YYYY-MM-DD' readonly id='picker-date'>"
  	}
  ],
  // 左侧面板的#menuList
  menuList:[
  	{
  		name: "会员",
  		iconName: "person",
  		className: "vip"
  	},{
  		name: "位置",
  		iconName: "world",
  		className: "location"
  	},{
  		name: "设置",
  		iconName: "settings",
  		className: "setting"
  	}
  ],
}
