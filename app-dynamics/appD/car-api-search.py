import requests
import json

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
    'auth': 'Bearer eyJhbGciOiJSUzUxMiIsImtpZCI6InRva2VuQ2VydCJ9.eyJzY29wZSI6W10sImNsaWVudF9pZCI6IkN3dFRvR29PYXV0aENsaWVudCIsImp3dE9BdXRoIjoiR2ltMEFaaWZ3cVpZbEVuRllRVUUyTUJPUXh5R0dPZmoiLCJpZG1FbWFpbCI6IkFBcnJpZXNnYWRvQENhcmxzb253YWdvbmxpdC5jb20iLCJsYXN0TmFtZSI6IkFycmllc2dhZG8iLCJ0b3BJZCI6ImE6MTE2MGMiLCJyb2xlcyI6InRyYXZlbGVyIiwidHJhdmVsZXJFbWFpbCI6IkFBcnJpZXNnYWRvQENhcmxzb253YWdvbmxpdC5jb20iLCJ0cmF2ZWxlclR5cGVHVUlEIjoiQTpEQzE1Iiwic3ViSWQiOiJhOjRlNzE4IiwiZmlyc3ROYW1lIjoiSm9kaWUiLCJtaWRkbGVOYW1lIjoiV29kaWUiLCJpZCI6ImU4YjE4Nzc0LTNlODMtNDBjNi05YzNlLWU4ODIzYzU1NGNhZSIsIjNyZFBhcnR5U3luY0lkIjoiVFFaMkRUSkZPQSIsInRyYXZlbGVyR1VJRCI6ImE6NDAzZTk4MWEiLCJ1c2VybmFtZSI6ImNhcmdkc3Byb0B5b3BtYWlsLmNvbSIsImV4cCI6MTY0NjI5NjU1MH0.rT2Xp7f0IR9vCPGTSgnyLGq-5nGE9idpvclEAPKV_u_LA3OCwb2BUyMkAZJcTG9NdDh_Z_fzLFLppTG2oMKQhEA1H89199zTBfKCLryRreeGXvzl2hlrrZjUsQBiB9vpWywWj1D6BJgDCx7fiba0dB9ImJU-pHaQL1-lJRo2s6iUa2O9mrwCwebJdZWmJlTQJ4_9vvdnUcKJgvyzDJ2SlpPdaVs6jCmrPdX41mseHxXm8ebvZdRSw1RPJBX7q3xFhNA9dEfiiKLga-Ge9JwS0Zsr1-qmtF3xdJ62jbaTUt9G03Rb2poe2B3Je7YJtOsKmGlqH6CwBtVsWD0OM9AgJw',
    'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

# Check status code is 200, if not send error to console.
assert response.status_code == 200, "Status code is not 200"

# Check response to contain some text, if not send error to console.
assert "rentalRoundedDays" in response.text, "Expected response to contain rentalRoundedDays"

print(response.text)


