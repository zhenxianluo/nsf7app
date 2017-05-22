FROM ubuntu:14.04

ADD ./sources.list /etc/apt/
RUN apt-get update && git apt-get install -y postgresql nodejs mpn python pip  
RUN git clone https://github.com/zhenxianluo/nsf7app.git /edu-design
WORKDIR /edu-design
RUN npm install && pip install -r requirement.txt
