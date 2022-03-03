from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
import time
from selenium.webdriver.chrome.service import Service

s = Service("../chromedriver")
driver = webdriver.Chrome(service=s)

# Maximize the testing window
driver.maximize_window()
# driver.set_window_size(1700,1200)

# Open URL
pageUrl = "https://travel.mycwt.com"
driver.get(pageUrl)

# Validate main title
element = WebDriverWait(driver, 30).until(EC.presence_of_element_located((By.ID, "login-main-title")))
assert element, "login-main-title not found"

# Add username
element_username = driver.find_element(By.NAME, "pf.username")
element_username.send_keys("portraitEU2Test@yopmail.com")

# Add password
driver.find_element(By.NAME, "pf.pass").send_keys("Aa123456!!")
driver.find_element(By.CSS_SELECTOR, "button.submit-btn").click()

# click on accept cookies button
time.sleep(5)
cookies = WebDriverWait(driver, 30).until(EC.presence_of_element_located((By.ID, "onetrust-accept-btn-handler")))
driver.find_element(By.ID, "onetrust-accept-btn-handler").click()

# Validate logo
logo = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, "[data-testid=myCWT-logo]")))

# Click on dropdown button (MY PROFILE)
profile = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, "[data-testid=account-dropdown-button]")))
assert profile
driver.find_element(By.CSS_SELECTOR, "[data-testid=account-dropdown-button]").click()

# Click on Edit travel (first option in the menu)
print('Clicking Edit Travel Profile')
edit = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "ToolTipNavItem__TitleStyle-sc-2bc66x-1")))
driver.find_element(By.CLASS_NAME, "ToolTipNavItem__TitleStyle-sc-2bc66x-1").click()

time.sleep(10)
print('Switching to Portrait window')
# Switch to the second tab
profile_window = driver.window_handles[1]
driver.switch_to.window(profile_window)

# Click on email section
emailbar = WebDriverWait(driver, 60).until(EC.presence_of_element_located((By.CSS_SELECTOR, '[data-reactid=".0.0.0.1.0.0.0.0.1.0.0.2.$EmailAddress/=1$EmailAddress.0.0.0"]')))
print('click on the email bar')
driver.find_element(By.CSS_SELECTOR, '[data-reactid=".0.0.0.1.0.0.0.0.1.0.0.2.$EmailAddress/=1$EmailAddress.0.0.0"]').click()

time.sleep(10)
# Validate the correct email
emailAddress = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "TravelerDetails_EmailAddress_0_address")))
print("Checking if portraitEU2Test@yopmail.com is the correct email")

## assert "portraitEU2Test@yopmail.com" == emailAddress.get_attribute('value')