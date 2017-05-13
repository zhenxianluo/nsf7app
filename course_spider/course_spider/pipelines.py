# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html
def exec_pgsql(sql):
    conn = psycopg2.connect(settings.get('PG_URL'))
    cur = conn.cursor()
    try:
        cur.execute(sql)
        conn.commit()#进行提交操作，不提交则此次对数据库的更改无效
    except Exception, e:
        logging.error(sql)
    finally:
        cur.close()
        conn.close()

class CourseSpiderPipeline(object):
    def process_item(self, item, spider):
        keys = []
        values = []
        for key in item:
            keys.append(key)
            if isinstance(item[key], int):
                value = str(item[key])
            elif item[key] is None:
                value = ''
            else:
                value = item[key].encode('utf-8')
            values.append(value)
        insert_data = 'insert into course(%s) values(\'%s\');' % (','.join(keys), '\',\''.join(values))
        exec_pgsql(insert_data)
