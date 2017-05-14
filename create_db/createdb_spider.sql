create table course(
	id serial primary key,
	courseName text,                   -- 课程名
	teacher text,                      -- 教师名
	courseType text,                   -- 课程类型
	courseImg text,                    -- 课程图片
	courseIntro text,                  -- 课程介绍
	teacherSchool text,                -- 教师学校
	teacherSchoolSub text,             -- 二级岗位
	teacherImg text,                   -- 头像
	courseVideoMD text,                -- 课程短视频md
	courseVideoHD text,                -- 课程短视频hd
	teacherFullPoint text,             -- 教师职位简称
	teacherShortPoint text,            -- 教师全部职位
	teacherIntro text,                 -- 教师个人介绍
	courseMenu text,									 -- 课程菜单
	courseFull text,                   -- 课程详细介绍*
	website text											 -- 课程详细信息来源
);
