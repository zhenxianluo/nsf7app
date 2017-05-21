create table siteuser(
	id serial primary key,
	username character varying(32),
	password character varying(32),
	email character varying(32),
	sex character varying(8),
	blog text,
	intro text,
	headimg text,
	birthday timestamp,
	createTime timestamp default current_timestamp
);
insert into siteuser(username, password, email, sex, blog) values('admin', 'admin', 'zxl_d@foxmail.com', '男', 'http://howduudu.xyz');
