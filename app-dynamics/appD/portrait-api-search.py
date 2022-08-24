# import requests
#
#
# pwdDigestTemplate = "<wsse:Security xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\" env:mustUnderstand=\"true\">"
# "<wsse:UsernameToken wsu:Id=\"UsernameToken-80\">"
# "<wsse:Username>{{wssUser}}</wsse:Username>"
# "<wsse:Password Type=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordDigest\">{{wssPwdDigest}}</wsse:Password>"
# "<wsse:Nonce EncodingType=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary\">{{wssNonce64}}</wsse:Nonce>"
# "<wsu:Created>{{wssCreated}}</wsu:Created>"
# "</wsse:UsernameToken>\n</wsse:Security>";
#
# user = postman.getEnvironmentVariable("wsUser");
# password = postman.getEnvironmentVariable("wsPassword");
#
# xPlaceHolder = /\{\{([^\}]*)\}\}/g;
# let now = new Date();
# let text = "";
# const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
#
# for (var i = 0; i < 5; i++) {
# text += possible.charAt(Math.floor(Math.random() * possible.length));
# }
#
# let nonce = now.getTime().toString().concat(text);
# const params = {
# wssUser: user,
# wssCreated: now.toISOString(),
# //wssNonce64: new Buffer(nonce).toString('base64'),
# wssNonce64 : btoa(unescape(encodeURIComponent(nonce))),
# requestTime: new Date('YYYY-MM-dd HH:mm:ss')
# };
#
# let baseStr = nonce + params.wssCreated + password;
# const enc =  CryptoJS.SHA1(baseStr);
# params.wssPwdDigest = CryptoJS.enc.Base64.stringify(enc);
#
# var xml = pwdDigestTemplate;
#
# xml = xml.replace(xPlaceHolder, function (expr, key) {
# return key in params ? params[key] : expr
# });
#
# postman.setEnvironmentVariable("_wss", xml);
#
# url = "https://itest2profile.cwtwebservices.com/portrait-ws/search"
#
# payload = "<env:Envelope\n        xmlns:cwt=\"http://schema.carlsonwagonlit.com/V1\"\n        xmlns:env=\"http://schemas.xmlsoap.org/soap/envelope/\"\n        xmlns:xs=\"http://www.w3.org/2001/XMLSchema\"\n        xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">\n    <env:Header><wsse:Security xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\" env:mustUnderstand=\"true\">\n<wsse:UsernameToken wsu:Id=\"UsernameToken-80\">\n<wsse:Username>DigitalSrvUpdate2021</wsse:Username>\n<wsse:Password Type=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordDigest\">Ar2UnI8RGcZZjosCjDUtG9rQKw8=</wsse:Password>\n<wsse:Nonce EncodingType=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary\">MTY0OTU4MjA2OTI4NTRCZHQz</wsse:Nonce>\n<wsu:Created>2022-04-10T09:14:29.285Z</wsu:Created>\n</wsse:UsernameToken>\n</wsse:Security>\n    </env:Header>\n    <env:Body>\n        <cwt:TravelerProfileSummaryRequest>\n            <cwt:RequestInfo sentBy=\"WebServices\"/>\n\n            <cwt:SearchOption xsi:type=\"cwt:searchByTravelerGuid\">\n                <cwt:Traveler guid=\"A:4040792E\" />\n            </cwt:SearchOption>\n        </cwt:TravelerProfileSummaryRequest>\n    </env:Body>\n</env:Envelope>"
# headers = {
#     'Accept-Encoding': 'gzip,deflate',
#     'Content-Type': 'text/xml;charset=UTF-8',
#     'SOAPAction': '""',
#     'Connection': 'Keep-Alive'
# }
#
# response = requests.request("POST", url, headers=headers, data=payload)
#
# print(response.text)
