import requests

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
