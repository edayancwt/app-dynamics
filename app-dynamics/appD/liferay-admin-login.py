from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from selenium.webdriver.chrome.service import Service

s = Service("../chromedriver")
driver = webdriver.Chrome(service=s)

# Maximize the testing window
driver.maximize_window()

# Go to URL
pageUrl = "https://travel.mycwt.com"
driver.get(pageUrl)

element = WebDriverWait(driver, 15).until(EC.presence_of_element_located((By.ID, "login-main-title")))
assert element, "login-main-title not found"
element_username = driver.find_element(By.NAME, "pf.username")
element_username.send_keys("mycwttest2@yopmail.com")

driver.find_element(By.NAME, "pf.pass").send_keys("Qwerty10!")
driver.find_element(By.CSS_SELECTOR, "button.submit-btn").click()
logo = WebDriverWait(driver, 15).until(EC.presence_of_element_located((By.CSS_SELECTOR, "[data-testid=myCWT-logo]")))
title = WebDriverWait(driver, 15).until(EC.presence_of_element_located((By.CSS_SELECTOR, "[data-testid=company-news-title]")))

pageUrl = "https://travel-admin.mycwt.com"
driver.get(pageUrl)

time.sleep(10)
assert "US-GEN" in driver.title
WebDriverWait(driver, 15).until(EC.presence_of_element_located((By.ID, "header-navigation-link-1")))

