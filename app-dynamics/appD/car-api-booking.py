import requests
import json

# ----------------------------------- GET THE TOKEN -------------------------------------------

url = "https://accounts.stage-mycwt.com/as/token.oauth2?grant_type=password&username=shlomy16@yopmail.com&password=Qwerty15!"
payload = "client_id=CwtToGoOauthClient"
headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Cookie': 'NSC_TUBHF_qjoh_gfe_dmvtufs_mcwt=14b5a3d907ae730905f9bfc7f098c33361acf7a69a3a2ce3f01643004ad1133756fd6511; PF=BljJ8gF0TGfdJXjYGgW8qv'
}

rawToken = requests.request("POST", url, headers=headers, data=payload)
myToken = rawToken.text.replace("{", "").replace("\"", "").replace("access_token:", "").replace(",", "").split("refresh_token")[0]

print(rawToken.text)
print(myToken)

# ----------------------------------- RUN SEARCH -------------------------------------------

url = "https://apistage.worldmate.com/gateway/car-rental/booking"

payload = json.dumps({
    "carSegment": {
        "rateQualifier": {
            "rateCode": "BEST"
        },
        "vendorCode": "ET",
        "pickupDate": "2022-06-22",
        "pickupTime": "10:00",
        "vehicleType": "ECAR",
        "returnDate": "2022-06-23",
        "pickupLocationCode": "JFK",
        "returnTime": "10:00",
        "returnLocationCode": "JFK"
    },
    "receivedFrom": "CWT2GO_IPHONE_21.3.3_94",
    "travelerGuid": "a:403e981a"
})
headers = {
    'cwt-token-type': 'pingFed',
    'cwt-client-id': 'pegaOAuthClient',
    'VARIANT_ID': '3',
    'auth': 'Bearer '+myToken,
    'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

# Check status code is 200, if not send error to console.
assert response.status_code == 200, "Status code is not 200"

# Check response to contain some text, if not send error to console.
textToVerify = "carReservation"
assert textToVerify in response.text, "Response is not including: "+textToVerify

print(response.text)
