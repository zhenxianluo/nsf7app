FROM ubuntu:14.04

ADD ./sources.list /etc/apt/
ADD ./ /edu-design
WORKDIR /edu-design
RUN apt-get update && \
		apt-get install -y vim python python-dev python-pipodejs npm postgresql-client postgresql curl postgresql-server-dev-all libxml2-dev libxslt1-dev zlib1g-dev && \
		npm install -g n && n stable && npm install && npm install -g supervisor
USER postgres
RUN /etc/init.d/postgresql start && \
		psql --command "CREATE USER deploy WITH SUPERUSER PASSWORD 'deploy';" && \
		createdb -O deploy design
USER root
RUN echo "host all  all    0.0.0.0/0  md5" >> /etc/postgresql/9.3/main/pg_hba.conf && \
		echo "listen_addresses='*'" >> /etc/postgresql/9.3/main/postgresql.conf && \
		sed -i "1i\local all all md5" /etc/postgresql/9.3/main/pg_hba.conf && \
		/etc/init.d/postgresql restart && \
		psql -U deploy -t design -f create_db/createdb_all.sql && \
		psql -U deploy -t design -f create_db/course_data.sql && \
		psql -U deploy -t design -f create_db/course_news.sql
EXPOSE 5432
EXPOSE 3000
CMD ["npm", "start"]
