# -*- coding: utf-8 -*-
import scrapy
from scrapy.spider import Spider
import logging, json, math, re
from scrapy.selector import Selector
from course_spider.items import CourseSpiderItem

class CourseSpider(scrapy.Spider):
    name = "course"
    allowed_domains = ["jhc.zhiye.chaoxing.com", "mooc1.chaoxing.com"]
    start_urls = ['http://jhc.zhiye.chaoxing.com/portal/schoolCourseInfo/columnCourse?columnId=5652']

    def parse(self, response):
        print response._body
        soup = BeautifulSoup(response._body, 'lxml')
