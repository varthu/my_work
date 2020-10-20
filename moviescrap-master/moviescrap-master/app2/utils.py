import requests
import pandas as pd
from bs4 import BeautifulSoup
from selenium.webdriver.chrome.options import Options
from selenium import webdriver
from time import sleep

def add_soundtrack(movie_name):
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    path = "/home/ubuntu/Desktop/chromedriver"
    driver = webdriver.Chrome(executable_path=path,
                              chrome_options=chrome_options
                              )
    url = 'https://www.google.com/search?q=' + movie_name + 'movie' + 'wikipedia'
    # print(url)
    e1 = driver.get(url)
    an = driver.find_elements_by_tag_name('h3')[0].click()
    # print(an)
    sleep(2)
    table = driver.find_elements_by_tag_name('table')
    sv = []
    for table_rows in table:
        # print("inside_table")
        if (table_rows.get_attribute("class") == "tracklist"):
            # print(table_rows.text)
            table11 = table_rows.find_elements_by_tag_name('tr')
            for tr in table11:
                # print("inside_table row")
                td = tr.find_elements_by_tag_name('td')
                row = [tu.text for tu in td]
                sv.append(row)
    return sv
                 

