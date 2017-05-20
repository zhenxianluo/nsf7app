var express = require('express');
var path = require('path');
var fs = require('fs');
var fm = require('formidable')
var crypto = require('crypto');
var pgp = require('pg-promise')({});
var cn = "postgresql://deploy:deploy@localhost:5432/design";
var db = pgp(cn);
function getTimeStr(){
	var nd = new Date();
	return [[nd.getFullYear(),nd.getMonth(),nd.getDate()].join('-'),[nd.getHours(),nd.getMinutes(),nd.getSeconds()].join(':')].join(' ');
}
module.exports = function(app){
	app.post('/go_news_pages', (req, res) => {
		var sql = "select title, pubtime from (select *, row_number() over() as rown from news order by pubtime desc) as bb where rown>"+((req.body['page']-1)*10).toString()+" limit 10;";
		db.any(sql).then(data => {
			if(data.length > 0){
				res.json({
					'status': 'success',
					'data': data
				});
			}else res.json({'status': 'error', 'msg': '已经是最后一页！'});
		});
	});
	app.post('/get_news', (req, res) => {
		var sql = "select * from news where title='"+req.body['title']+"' and pubtime='"+req.body['pubtime']+"'";
		db.any(sql).then(data => {
			if(data.length > 0){
				res.json({
					'status': 'success',
					'data': data[0]
				})
			}else res.json({'status': 'error', 'msg': '未查询到结果！'});
		})
	})
	app.post('/get_course_all', (req, res) => {
		var sql = "select courseimg, coursename, teacher, coursetype from course where coursetype='"+req.body['courseType']+"'";
		db.any(sql).then(data => {
			if(data.length > 0){
				res.json({
					'status': 'success',
					'data': data
				})
			}else res.json({'status': 'error', 'msg': '未查询到结果！'});
		})
	})
	app.post('/get_course', (req, res) => {
		var sql= "select * from course where teacher='"+req.body['teacher']+"' and coursename='"+req.body['coursename']+"'";
		db.any(sql).then(data => {
			if(data.length > 0){
				res.json({
					'status': 'success',
					'data': data[0]
				})
			}else res.json({'status': 'error', 'msg': '未查询到结果！'});
		});
	});
	app.post('/quit', (req, res) => {
		req.session.user = '';
		res.json({
			status: 'success',
			msg: '退出登录成功！'
		});
	})
	app.post('/update_info', (req, res) => {
		db.tx(t => {
			var item=[];
			for(var title in req.body){
				if(req.body[title])
					item.push(title+"='"+req.body[title]+"'")
			}
			var sql = "update siteuser set "+item.join(',')+" where username='"+req.session.user+"'";
			return t.none(sql).then(() => {
				var sql = "select * from siteuser where username='"+req.session.user+"'";
				return t.any(sql).then(data => {
					if(data.length > 0){
						res.json({
							'status': 'success',
							'email': data[0].email,
							'msg': '修改成功！',
							'infomation': 'var info='+JSON.stringify(data[0])
						});
					}
				});
			})
		}).catch(err => {
			res.json({
				'status': 'error',
				'msg': '保存失败，请刷新页面重试！'
			});
		});
	})
	app.post('/img_upload', (req, res) => {
		var form = new fm.IncomingForm();
		form.uploadDir=path.join(__dirname,'../public/userimg');
		form.parse(req);
		form.on('end', () => {
			console.log('upload success!');
		});
		form.on('file', (field, file) => {
			var na = file.name.split('.');
			var file_type = na[na.length-1];
			var allow_file = ['jpg', 'jpeg', 'png']
			if(allow_file.indexOf(file_type) < 0){
				return res.json({'status': 'error', 'msg': '请确保图片格式为jpg、jpeg或png格式！'});
			}
			var filename = '/' + req.session.user + (new Date().getTime()) + '.' + file_type;
			db.tx(t => {
				var sql = "update siteuser set headimg='/userimg"+filename+"' where username='"+req.session.user+"'";
				return t.none(sql).then( () => {
					fs.renameSync(file.path,path.join(form.uploadDir,filename));
					var sql = "select * from siteuser where username='"+req.session.user+"'";
					return t.any(sql).then(data => {
						if(data.length > 0){
							res.json({
								'status': 'success',
								'headimg': '/userimg'+filename,
								'infomation': 'var info='+JSON.stringify(data[0])
							});
						}
					});
				});
			});
		});
	})
	app.get('/', function(req, res){
		var user, useremail, info, headimg;
		db.tx(t => {
			var sql = "select * from siteuser where username='"+req.session.user+"'";
			return t.any(sql).then(data => {
				if(data.length > 0){
					useremail=data[0].email;
					info = 'var info='+JSON.stringify(data[0]);
					headimg = data[0].headimg;
				}
				var sql = "select coursename,courseimgbig,teacher,teacherimg from course where coursevideomd!='' and teacherimg!='' and courseimgbig!='' and coursename!='' limit 4;";
				return t.any(sql).then(hotc => {
					var sql = "select * from news order by pubtime desc limit 10;";
					return t.any(sql).then(news => {
						res.render('index', {
							user: req.session.user||-1,
							email: useremail||-1,
							headimg: headimg||'./images/personImg.png',
							infomation: info||-1,
							hotcourse: hotc,
							hotnews: news
						});
					})
				});
			});
		});
	  //fs.readFile(path.join(__dirname, '../views', 'index.html'), 'utf-8', function (err, data) {
		//	if (err) throw err;
		//	res.writeHead(200, {"Content-Type": "text/html"});
		//	res.write(data);
		//	res.end();
		//});	
	});
	app.post('/login', (req, res) => {
		var querystr = '';
		if(/.*@.*\.com$/.test(req.body.username))querystr = 'email';
		else querystr = 'username';
		var sql = "select * from siteuser where "+querystr+"='"+req.body.username+"'";
		db.any(sql).then(data => {
			if(data.length > 0){
				if(req.body.password == data[0].password){
					console.log("登录成功！"+data[0].username);
					req.session.user = data[0].username;
					console.log(data[0].username);
					return res.json({
						status: 'success',
						msg: '登录成功！',
						user: data[0].username,
						email: data[0].email,
						sex: data[0].sex,
						birthday:data[0].birthday,
						headimg:data[0].headimg,
						infomation: 'var info='+JSON.stringify(data[0])});
				}else{
					console.log("密码错误！"+data[0].username);
					return res.json({status: 'error', msg: '密码错误!'});
				}
			}else{
				console.log('用户名或邮箱不存在:'+querystr+':'+req.body.username);
				return res.json({status: 'error', msg: '用户名或邮箱不存在，请注册！'});
			}
		});
	});
	app.post('/register', (req, res) => {
		var sql = "select * from siteuser where username='"+req.body.username+"' or email='"+req.body.email+"';";
		db.tx(t => {
			return t.any(sql).then(data =>{
				if(data.length > 0){
					console.log("注册失败，用户或邮箱已存在");
					return res.json({
						status: 'error',
						msg: '注册失败，用户或邮箱已存在!'
					});
				}else{
					var timestr = getTimeStr();
					var sql = "insert into siteuser(username, password, email, sex, birthday, createtime) values('" + req.body.username + "', '"+req.body.password+"', '"+req.body.email+"', '"+req.body.sex+"', '"+req.body.birthday+"', '"+timestr+"');";
					return t.query(sql);
				}
			});
		}).then(data => {
			console.log('注册成功！');
			return res.json({
				status: 'success',
				msg: '注册成功!'
			});
		}).catch(err => {
			console.log('注册失败!：', err);
			return res.json({status: 'error', msg: '注册失败!'});
		});
	})
}
