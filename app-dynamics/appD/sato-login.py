from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from selenium.webdriver.chrome.service import Service

s = Service("../chromedriver")
driver = webdriver.Chrome(service=s)

# Maximize the testing window
driver.maximize_window()

# Go to URL
pageUrl = "https://trips.cwtsatotogo.com/"
driver.get(pageUrl)

print('sato login')
# Add username
driver.find_element(By.ID, "username-input").send_keys("sanitysato@yopmail.com")
# Add password
driver.find_element(By.ID, "password-input").send_keys("Qwerty02!!")
# Click on submit
driver.find_element(By.ID, "submit-button").click()
time.sleep(15)
# Validate element in the header
driver.find_element(By.CSS_SELECTOR, "body > div > div > div > div > sato-header > sato-navigation-bar > div > div")
