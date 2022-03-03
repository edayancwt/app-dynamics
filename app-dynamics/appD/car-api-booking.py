import requests
import json

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
    'auth': 'Bearer eyJhbGciOiJSUzUxMiIsImtpZCI6InRva2VuQ2VydCJ9.eyJzY29wZSI6W10sImNsaWVudF9pZCI6IkN3dFRvR29PYXV0aENsaWVudCIsImp3dE9BdXRoIjoiS0VoZDZtSzUySHQ4dzU2ZDRTYTlUd3VhUVoxUGg1MUYiLCJpZG1FbWFpbCI6IkFBcnJpZXNnYWRvQENhcmxzb253YWdvbmxpdC5jb20iLCJsYXN0TmFtZSI6IkFycmllc2dhZG8iLCJ0b3BJZCI6ImE6MTE2MGMiLCJyb2xlcyI6InRyYXZlbGVyIiwidHJhdmVsZXJFbWFpbCI6IkFBcnJpZXNnYWRvQENhcmxzb253YWdvbmxpdC5jb20iLCJ0cmF2ZWxlclR5cGVHVUlEIjoiQTpEQzE1Iiwic3ViSWQiOiJhOjRlNzE4IiwiZmlyc3ROYW1lIjoiSm9kaWUiLCJtaWRkbGVOYW1lIjoiV29kaWUiLCJpZCI6ImU4YjE4Nzc0LTNlODMtNDBjNi05YzNlLWU4ODIzYzU1NGNhZSIsIjNyZFBhcnR5U3luY0lkIjoiVFFaMkRUSkZPQSIsInRyYXZlbGVyR1VJRCI6ImE6NDAzZTk4MWEiLCJ1c2VybmFtZSI6ImNhcmdkc3Byb0B5b3BtYWlsLmNvbSIsImV4cCI6MTY0NjIxNjc5OH0.fXfzcjH9vT9UQBbEBVy83pJzdgGkVOLPwrAYfAOqATHhYcbrInpuWQMfeYENe9t3x81_Kuc3Xxdv6Q_6VoYHH7ibRGDEmU-ZknjmBMRUAfMfId06nC5nwkqMLhHB3zRwCEHDGjY6bXWXINmpdeMgfaxuzhUt1HfkeMXBlIG2xUSasEQmVEj5_RMsUXL00Ocr48PlFdMaFSctYZbS9uOw4cg-tTdOg7IlQcp_IT8GARXxOU5HP2EwfMrXxYLF60aOubaZnihU_xvJ7OBgRGiV2KkALtj-OsjBjgNJG6lKZ0l1GSUPhlipYNNoibDI5QJHF8HsxCoSlwBDKf2tIsnUQQ',
    'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
