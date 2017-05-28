FROM ubuntu:14.04
MAINTAINER rnet <http://howduudu.xyz>

ENV PGSQL_PATH=/etc/postgresql/9.3/main
#添加源及拷贝文件
ADD ./sources.list /etc/apt/
ADD ./ /edu-design
WORKDIR /edu-design
#增加pgsql的自动密码文件
RUN cp .pgpass /root/ && chmod 600 /root/.pgpass

EXPOSE 5432
EXPOSE 3000
#CMD ["/bin/bash", "/etc/init.d/postgresql start"]
#CMD ["npm", "start"]
