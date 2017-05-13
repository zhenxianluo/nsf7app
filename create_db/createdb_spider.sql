create table course{
	id serial primary key,
	courseName character varying(64), -- 课程名
	teacher character varying(32),    -- 教师名
	sourceType character varying(256),
	courseImg text,                   -- 课程图片
	courseFrom character varying(64), -- 课程来源
	coursePoint character varying(8), -- 课程学分
	courseNum character varying(8),   -- 课时
	courseIntro text,                 -- 课程介绍
	teacherFrom character varying(64),-- 教师来源
	teacherFullPoint text,            -- 教师职位简称
	teacherShortPoint text,           -- 教师全部职位
	teacherIntro text,                -- 教师个人介绍
	aboutBook text,                   -- 参考教材
	courseMenu text,									-- 课程菜单
	courseFull text,                  -- 课程详细介绍
	courseShort text,                 -- 课程简短介绍
	website text											-- 课程详细信息来源
}
