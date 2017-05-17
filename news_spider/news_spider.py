# coding:utf-8
import sys
reload(sys)
sys.setdefaultencoding('utf-8')
import requests, re, os, time, psycopg2, logging, codecs
from bs4 import BeautifulSoup as BS
from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())
base_url = os.environ.get('BASE_URL')

def save_data(datas):
    for data in datas:
        keys = []
        values = []
        for key in data:
            keys.append(key)
            values.append(data[key])
        sql = "insert into news(" + ','.join(keys) + ") values('" + "','".join(values) + "');";
        try:
            conn = psycopg2.connect(os.environ.get('PG_URL'))
            cur = conn.cursor()
            cur.execute(sql.encode('utf-8'))
            conn.commit()
        except Exception, e:
            logging.error('----------------:'+sql)
            logging.error(str(e))
        finally:
            if cur is not None: cur.close()
            if conn is not None: conn.close()


def get_data(path_url):
    cont = requests.get(base_url+path_url).content
    soup = BS(cont, 'lxml')
    links = soup.select('#wp_news_w3 a')
    output = []
    for link in links:
        cont = requests.get(base_url+link['href']).content.decode()
        soup = BS(cont, 'lxml')
        data = {}
        mapping = {'author': 'Article_Author', 'origin': 'Article_Source',
                'publisher': 'Article_Publisher', 'pubtime': 'Article_PublishDate',
                'title': 'Article_Title',
                }
        for title in mapping:
            data[title] = soup.find('span', {'class': mapping[title]}).get_text().strip()
        data['content'] = soup.find('div', {'class': 'Article_Content'}).get_text().strip()
        data['website'] = base_url+link['href']
        imgs = soup.select('.Article_Content img')
        if len(imgs) > 0: data['content_img'] = '|'.join([base_url+img['src'] for img in imgs])
        output.append(data)
    save_data(output)

if __name__ == "__main__":
    r = requests.get(base_url+'/201/list.htm').text
    soup = BS(r, 'lxml')
    max_pages = int(soup.find('em', {'class': 'all_pages'}).string.strip())
    for i in range(1, max_pages+1):
        print '第' + str(i) + "页"
        get_data('/201/list'+str(i)+'.htm')
