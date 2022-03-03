from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.chrome.service import Service

s = Service("../chromedriver")
driver = webdriver.Chrome(service=s)

# Maximize the testing window
driver.maximize_window()

pageURL = "https://accenture.mycwt.com"
driver.get(pageURL)

element = WebDriverWait(driver, 15).until(EC.presence_of_element_located((By.NAME, "loginfmt")))
assert element