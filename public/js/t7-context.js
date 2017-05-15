var context={
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
	  	title: "通用能力",
	  	courseStatus: [{
	  		name: "九型人格之职场心理",
	  		src: "http://p.ananas.chaoxing.com/star3/270_169/5632caf8e4b0a295abab2011.jpg",
	  		teacher: "洪新",
	  		status: "最热门"
	  	},{
	  		name: "大学生魅力讲话实操",
	  		src: "http://p.ananas.chaoxing.com/star3/270_169c/56177f51498e9c25ac53a9c6.jpg",
	  		teacher: "殷亚敏",
	  		status: "最热门"
	  	},{
	  		name: "《论语》中的人生智慧与自我管理",
	  		src: "http://p.ananas.chaoxing.com/star3/270_169/55cdde33e4b0529fd53fc868.jpg",
	  		teacher: "刘强",
	  		status: "已完结"
	  	},{
	  		name: "创新思维训练",
	  		src: "http://p.ananas.chaoxing.com/star3/108_108c/561b128ae4b0222c70a7912a.jpg",
	  		teacher: "王竹立",
	  		status: "已完结"
	  	}]
	  },{
	  	title: "综合素养",
	  	courseStatus: [
				{name: "易经十讲",src: "http://p.ananas.chaoxing.com/star2/2014-06/origin/1402646708394yjunf.jpg",teacher: "雷毅 等",status: "已完结"},
				{name: "移动互联网时代的信息安全与防护",src: "http://p.ananas.chaoxing.com/star3/270_169/5604b868498ed981287f3c68.jpg",teacher: "陈波",status: "已完结"},
				{name: "欧洲文明概论",src: "http://p.ananas.chaoxing.com/star3/270_169c/551b53a0e4b00ae0928440e0.jpg",teacher: "朱孝远",status: "已完结"},
				{name: "西方美术欣赏",src: "http://p.ananas.chaoxing.com/star2/2014-06/270_169c/1403058896963lfegj.jpg",teacher: "孙乃树",status: "已完结"}
			]
	  },{
	  	title: "推荐课程",
	  	courseStatus: [
				{name: "军事理论（第二版）",src: "http://p.ananas.chaoxing.com/star3/270_169c/54471b8fa310a7916bc4809e.png",teacher: "艾跃进等",status: "最好评"},
				{name: "思想道德修养与法律基础（2015版）",src: "http://p.ananas.chaoxing.com/star3/270_169c/55f260a7498ed981287db31d.jpg",teacher: "冯秀军等",status: "已完结"},
				{name: "马克思主义基本原理概论（2015版）",src: "http://p.ananas.chaoxing.com/star3/270_169/56d3c12ee4b0dfadae77b67a.jpg",teacher: "李富君",status: "已完结"},
				{name: "大学生心理健康教育",src: "http://p.ananas.chaoxing.com/star3/270_169/549654835370d4613682dc12.jpg",teacher: "李子勋等",status: "已完结"}
			]
	  },{
	  	title: "公共必修",
	  	courseStatus: [
				{name: "高等数学（上）",src: "http://p.ananas.chaoxing.com/star3/270_169/550698ca537016c9ba1e1fdf.jpg",teacher: "李换琴",status: "已完结"},
				{name: "军事理论（新版）",src: "http://p.ananas.chaoxing.com/star3/270_169c/5588b660498e2975b5ef1977.jpg",teacher: "张国清",status: "已完结"},
				{name: "中国近现代史纲要（2015版）",src: "http://p.ananas.chaoxing.com/star3/270_169/55f29559e4b040cfea173525.jpg",teacher: "李松林",status: "已完结"},
				{name: "大学物理",src: "http://p.ananas.chaoxing.com/star3/270_169/558a5425e4b0ec35e2d29cb2.jpg",teacher: "董占海",status: "已完结"}
			]
	  },{
	  	title: "成长基础",
	  	courseStatus: [
				{name: "大学生职业生涯规划",src: "http://p.ananas.chaoxing.com/star3/270_169c/54964ce5e4b012c1da891c8a.jpg",teacher: "庄明科等",status: "已完结"},
				{name: "大学生心理健康教育",src: "http://p.ananas.chaoxing.com/star3/270_169/549654835370d4613682dc12.jpg",teacher: "李子勋等",status: "已完结"},
				{name: "大学生生理健康",src: "http://p.ananas.chaoxing.com/star3/270_169/561f6c89e4b0222c70a88536.jpg",teacher: "李华",status: "已完结"},
				{name: "大学生恋爱与性健康（李子勋版）",src: "http://p.ananas.chaoxing.com/star3/270_169/55e57bdbe4b030b228d95e0b.jpg",teacher: "李子勋",status: "已完结"}
			]
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
