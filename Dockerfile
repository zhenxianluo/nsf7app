FROM ubuntu:14.04
MAINTAINER zxl zxl_d@foxmail.com

ADD ./* /edu-design
ADD ./sources.list /etc/apt/sources.list
RUN	apt-get update && apt-get install -y postgresql && apt-get install -y python && apt-get install -y pip && apt-get install -y nodejs && apt-get install -y npm
WORKDIR /edu-design
RUN npm install && pip -r requirement.txt

