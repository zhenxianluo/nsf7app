# -*- coding: utf-8 -*-
import scrapy
from scrapy.spider import Spider
import logging, json, math, re
from scrapy.selector import Selector
from bs4 import BeautifulSoup
from course_spider.items import CourseSpiderItem

class CourseSpider(scrapy.Spider):
    name = "course"
    allowed_domains = ["jhc.zhiye.chaoxing.com", "mooc1.chaoxing.com"]
    start_urls = ['http://jhc.zhiye.chaoxing.com/portal/schoolCourseInfo/columnCourse?columnId=5652&classifyId=0&keyword=&pageNum=1']
    urls = ['http://jhc.zhiye.chaoxing.com/portal/schoolCourseInfo/columnCourse?columnId=2773&classifyId=0&keyword=&pageNum=',
            'http://jhc.zhiye.chaoxing.com/portal/schoolCourseInfo/columnCourse?columnId=5652&classifyId=0&keyword=&pageNum=',
            'http://jhc.zhiye.chaoxing.com/portal/schoolCourseInfo/columnCourse?columnId=5653&classifyId=0&keyword=&pageNum=',
            'http://jhc.zhiye.chaoxing.com/portal/schoolCourseInfo/columnCourse?columnId=5654&classifyId=0&keyword=&pageNum=',
            'http://jhc.zhiye.chaoxing.com/portal/schoolCourseInfo/columnCourse?columnId=5655&classifyId=0&keyword=&pageNum='
            ]
    def start_requests(self):
        for url in self.urls:
            yield scrapy.Request(url=url+'1' , callback=self.parse, meta={'url':url, 'page_now':1})

    def parse_data(self, datastr):
        x = datastr.strip()
        x = re.sub(' {2,1000}', ' ', x)
        x = re.sub('<.{0,10}>', '', x)
        x = re.sub('<.*>', '', x)
        x = re.sub('\n{1,1000}', '^_^', x)
        x = re.sub('[\'"]', '`', x)
        return x

    def parse(self, response):
        i = response.meta['page_now']
        url = response.meta['url']
        soup = BeautifulSoup(response._body, 'lxml')
        dls = soup.select('.listCourse dl')
        sourceType = soup.select('.infion-con span')[0].string
        print '=====', sourceType, '页号', str(i)
        for dl in dls:
            if len(dl.select('dd')) == 2:
                item = CourseSpiderItem()
                item['courseImg'] = self.parse_data(dl.img['src'])
                website = item['website'] = self.parse_data(dl.select('dd a')[0]['href'])
                item['courseName'] = self.parse_data(dl.select('dd a')[0]['title'])
                item['courseType'] = self.parse_data(sourceType)
                yield scrapy.Request(url=website, callback=self.get_detail, meta={'item':item})
        elements = re.findall('\d+', re.findall('课程总数：.*个', str(soup))[0])[0]
        if ((i-1)*9+len(dls)) < int(elements):
            yield scrapy.Request(url=url+str(i+1), callback=self.parse, meta={'url':url, 'page_now':i+1})


    def get_detail(self, response):
        item = response.meta['item']
        soup = BeautifulSoup(response._body, 'lxml')
        try:
            item['teacher'] = self.parse_data(soup.select('.course_title_box span')[1].string)
        except Exception as e:
            item['teacher'] = ''
        source = soup.find_all('div', {'class': 'mt30 pt20'})
        try:
            item['courseFull'] = self.parse_data(''.join([hehe.get_text() for hehe in source[2:][:-2]]))
        except Exception as e:
            item['courseFull'] = ''
        try:
            item['courseIntro'] = self.parse_data(source[0].get_text())
        except Exception as e:
            item['courseIntro'] = ''
        try:
            item['teacherImg'] = self.parse_data(soup.select('.course_tch_info img')[0]['src'])
        except Exception as e:
            item['teacherImg'] = ''
        try:
            item['teacherIntro'] = self.parse_data(soup.select('.course_tch_info')[0]['data'])
        except Exception as e:
            item['teacherIntro'] = ''
        try:
            video_data=json.loads(soup.select('#moocplayer')[0]['data'])
            item['courseVideoMD'] = self.parse_data(video_data['httpmd'])
            item['courseVideoHD'] = self.parse_data(video_data['httphd'])
        except Exception as e:
            item['courseVideoMD'] = ''
            item['courseVideoHD'] = ''
        teachinfo_title = ['teacherShortPoint', 'teacherSchool', 'teacherSchoolSub', 'teacherFullPoint']
        try:
            teachinfo = soup.find('div', {'class':'course_tch_info'}).select('p')
            values = [info.string for info in teachinfo]
            values[0] = self.parse_data(' '.join(teachinfo[0].get_text().split(' ')[1:]))
            for v, t in zip(values, teachinfo_title):
                item[t] = self.parse_data(v)
            for t in teachinfo_title[len(values):]:
                item[t] = ''
        except Exception as e:
            for t in teachinfo_title:
                item[t] = ''
        if len(soup.select('.bgblue1'))>0:
            item['courseMenu'] = self.parse_data(soup.select('.bgblue1')[0].get_text().strip())
        elif soup.find('div', {'class': 'cell w330'}):
            item['courseMenu'] = self.parse_data(soup.find('div', {'class': 'cell w330'}).get_text().strip())
        elif soup.find('div', {'class': 'metroListBox'}):
            item['courseMenu'] = self.parse_data(soup.find('div', {'class': 'metroListBox'}).parent.get_text())
        return item
