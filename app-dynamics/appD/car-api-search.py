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
    'auth': 'Bearer eyJhbGciOiJSUzUxMiIsImtpZCI6InRva2VuQ2VydCJ9.eyJzY29wZSI6W10sImNsaWVudF9pZCI6IkN3dFRvR29PYXV0aENsaWVudCIsImp3dE9BdXRoIjoiTnBxQ3N3Wmpkb2k1V1JBSXh6UnM0QlFON3BidGlsaUQiLCJpZG1FbWFpbCI6IkFBcnJpZXNnYWRvQENhcmxzb253YWdvbmxpdC5jb20iLCJsYXN0TmFtZSI6IkFycmllc2dhZG8iLCJ0b3BJZCI6ImE6MTE2MGMiLCJyb2xlcyI6InRyYXZlbGVyIiwidHJhdmVsZXJFbWFpbCI6IkFBcnJpZXNnYWRvQENhcmxzb253YWdvbmxpdC5jb20iLCJ0cmF2ZWxlclR5cGVHVUlEIjoiQTpEQzE1Iiwic3ViSWQiOiJhOjRlNzE4IiwiZmlyc3ROYW1lIjoiSm9kaWUiLCJtaWRkbGVOYW1lIjoiV29kaWUiLCJpZCI6ImU4YjE4Nzc0LTNlODMtNDBjNi05YzNlLWU4ODIzYzU1NGNhZSIsIjNyZFBhcnR5U3luY0lkIjoiVFFaMkRUSkZPQSIsInRyYXZlbGVyR1VJRCI6ImE6NDAzZTk4MWEiLCJ1c2VybmFtZSI6ImNhcmdkc3Byb0B5b3BtYWlsLmNvbSIsImV4cCI6MTY0NjIyMzQ0NX0.kr_trjt4xrqR_ac9s8i5U1I6gsiOezEV0TwbZu4ewm1n0YPgSGiL6WAuIkq6c6y3LHXghXFeU5F-3fQaRFWXBfHGYa-8XrqxCVoLadRNRCcL2LFWCtgi1SYiCKMkAp1s-U0K3wuCJi30oNka0Ai5glGFEp-LgKEyLiXHYS92tdr9n3WmllJCkrcZ-GE-BhHVVCd4S5XZggx2gjmz-_ziMxmS5bwqb35LnZtHxhkG1dRKL3orKt4wg0WpxFtck3grAD08yOXdGWgyIqfgnupgCj6QOAKvsDjyR-x_azIeX3wAuD5a0p8IOQ6wr-Dh6V4ebbHHjyD5Jj3zHASIHwWQmQ',
    'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)


