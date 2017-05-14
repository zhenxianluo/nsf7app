# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

from scrapy.item import Item,Field


class CourseSpiderItem(Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    courseName = Field() #
    teacher = Field() #
    courseType = Field() #
    courseImg = Field() #
    courseIntro = Field()
    teacherSchool = Field() #
    teacherSchoolSub = Field() #
    teacherImg = Field() #
    courseVideoMD = Field() #
    courseVideoHD = Field() #
    teacherFullPoint = Field() #
    teacherShortPoint = Field() #
    teacherIntro = Field() #
    courseMenu = Field() #
    courseFull = Field() #
    website = Field() #
