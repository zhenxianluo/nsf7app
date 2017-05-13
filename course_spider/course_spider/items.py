# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

from scrapy.item import Item,Field


class CourseSpiderItem(Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    courseName = Field()
    teacher = Field()
    sourceType = Field()
    courseImg = Field()
    courseFrom = Field()
    coursePoint = Field()
    courseNum = Field()
    courseIntro = Field()
    teacherFrom = Field()
    teacherFullPoint = Field()
    teacherShortPoint = Field()
    teacherIntro = Field()
    aboutBook = Field()
    courseMenu = Field()
    courseFull = Field()
    courseShort = Field()
    website = Field()
