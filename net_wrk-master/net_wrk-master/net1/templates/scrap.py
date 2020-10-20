from selenium import webdriver
from time import sleep
path = "/home/ubuntu/Desktop/chromedriver"
driver = webdriver.Chrome(path)
l=[]
for i in range(1,6):
   x = driver.get("https://www.amazon.in/s?k=redmi&page=%s" % str(i))
   sleep(5)
   # l.append(x)
   print(l)
   an = driver.find_elements_by_tag_name('a')
   for a in an:
   	 if(a.get_attribute("class")=="a-link-normal a-text-normal"):
   	 	print(a.text)
   	 	l.append(a.text)
driver.close()
# import requests
# import pandas as pd
# from bs4 import BeautifulSoup
# from selenium import webdriver
# from time import sleep

# path = "/home/ubuntu/Desktop/chromedriver"
# driver = webdriver.Chrome(path)
# q = ["kaithi", "shiva", "mersal"]
# # l=[]
# for query in q:
#     e1 = driver.get('https://www.google.com/search?q=' + query + 'movie' + 'wikipedia')
#     html_content = driver.page_source
#     soup = BeautifulSoup(html_content, 'lxml')
#     an = driver.find_elements_by_tag_name('h3')[0].click()
#     table = driver.find_elements_by_tag_name('table')
#     for table_rows in table:
#         if (table_rows.get_attribute("class") == "tracklist"):
#             # print(table_rows.text)
#             table11 = table_rows.find_elements_by_tag_name('tr')
#             for tr in table11:
#                 td = tr.find_elements_by_tag_name('td')
#                 row = [tr.text for tr in td]
#                 print(row)
# th = tr.find_elements_by_tag_name('th')
# row1 = [tr.text for tr in th]
# print(row1)
# l.append(row)

# l.append(table_rows.text)

# table11 = table_rows.findAll('tr')
# data = []
# for row in table_rows:
#     data.append([t.text.strip() for t in row.find_all('td')])

# links = tags.findAll("toclevel-1 tocsection-4")
# for link in links:
# 	print(link)
# for span in spans:
# print(tags)
# for a in an:
# 	if(a.get_attribute("class")=="TbwUpd NJjxre"):
#  	   print(a.text)

# driver.close()

# import requests
# from bs4 import BeautifulSoup
# from selenium import webdriver
# from time import sleep

# path = "/home/ubuntu/Desktop/chromedriver"
# driver = webdriver.Chrome(path)
# q = ["kaithi"]
# for query in q:
#     driver.get('https://en.wikipedia.org/wiki/Kaithi_(2019_film)')
#     html_content = driver.page_source
#     soup = BeautifulSoup(html_content, 'lxml')
#     an = driver.find_elements_by_tag_name('class')
#     ann = an.find_elements_by_tag_name("li")
#     for i in ann:
#         print (i.text)
# for a in an:
# 	if(a.get_attribute("class")=="toclevel-1 tocsection-4"):
#  	   print(a.text)
# driver.close()


