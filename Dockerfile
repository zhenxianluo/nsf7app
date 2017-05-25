FROM ubuntu:14.04
MAINTAINER rnet <http://howduudu.xyz>

ENV PGSQL_PATH=/etc/postgresql/9.3/main
#添加源及拷贝文件
ADD ./sources.list /etc/apt/
ADD ./ /edu-design
WORKDIR /edu-design
#增加pgsql的自动密码文件
RUN cp .pgpass /root/ && chmod 600 /root/.pgpass
#更新并安装环境
RUN apt-get update && apt-get install -y vim curl
RUN apt-get install -y python python-dev python-pip libxml2-dev libxslt1-dev zlib1g-dev
RUN apt-get install -y nodejs npm && npm install -gd express --registry=http://registry.npm.taobao.org && npm config set registry http://registry.npm.taobao.org
RUN npm install -g n && n stable && npm install && npm install -g supervisor
RUN apt-get install -y postgresql postgresql-client postgresql-server-dev-all
#创建deploy用户及design表
USER postgres
RUN /etc/init.d/postgresql start && \
		psql --command "CREATE USER deploy WITH SUPERUSER PASSWORD 'deploy';" && \
		createdb -O deploy design
#修改数据库配置文件
USER root
RUN echo "host all  all    0.0.0.0/0  md5" >> $PGSQL_PATH/pg_hba.conf && \
		echo "listen_addresses='*'" >> $PGSQL_PATH/postgresql.conf && \
		sed -i "1i\local all all md5" $PGSQL_PATH/pg_hba.conf
RUN /etc/init.d/postgresql restart && /etc/init.d/postgresql restart && \
		psql -U deploy -t design -f create_db/createdb_all.sql && \
		psql -U deploy -t design -f create_db/course_data.sql && \
		psql -U deploy -t design -f create_db/news_data.sql

EXPOSE 5432
EXPOSE 3000
CMD ["npm", "start"]
