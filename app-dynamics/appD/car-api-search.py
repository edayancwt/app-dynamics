import requests
import json

url = "https://accounts.stage-mycwt.com/as/token.oauth2?grant_type=password&username=shlomy16@yopmail.com&password=Qwerty15!"
payload = "client_id=CwtToGoOauthClient"
headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Cookie': 'NSC_TUBHF_qjoh_gfe_dmvtufs_mcwt=14b5a3d907ae730905f9bfc7f098c33361acf7a69a3a2ce3f01643004ad1133756fd6511; PF=BljJ8gF0TGfdJXjYGgW8qv'
}

rawToken = requests.request("POST", url, headers=headers, data=payload)
myToken = rawToken.text.replace("{", "").replace("\"", "").replace("access_token:", "").replace(",", "").split("refresh_token")[0]

# print(rawToken.text)
# print(myToken)

# ------------------------------------------------------------------------------

url = "https://apistage.worldmate.com/gateway/car-rental/search"

payload = json.dumps({
    "carSearchRQ": {
        "carSearchCriteria": {
            "returnInfo": {
                "time": "10:00",
                "date": "2022-12-28",
                "location": {
                    "airportCode": "SFO"
                }
            },
            "pickUpInfo": {
                "date": "2022-12-25",
                "time": "10:00",
                "location": {
                    "airportCode": "SFO"
                }
            }
        }
    }
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
assert "rentalRoundedDays" in response.text, "Expected response to contain rentalRoundedDays"

print(response.text)
