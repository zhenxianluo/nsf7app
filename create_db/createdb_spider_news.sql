create table news(
	id serial primary key,
	author text,
	origin text,
	publisher text,
	pubtime timestamp,
	title text,
	content text,
	website text,
	content_img text,
	create_at timestamp default current_timestamp
)
