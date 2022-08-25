const CryptoJS = require('crypto-js');
const XMLHttpRequest = require('XMLHttpRequest');


// ----------------------------------- GET THE TOKEN -------------------------------------------

let pwdDigestTemplate =
  `<wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd" env:mustUnderstand="true">
<wsse:UsernameToken wsu:Id="UsernameToken-80">
<wsse:Username>{{wssUser}}</wsse:Username>
<wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordDigest">{{wssPwdDigest}}</wsse:Password>
<wsse:Nonce EncodingType="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary">{{wssNonce64}}</wsse:Nonce>
<wsu:Created>{{wssCreated}}</wsu:Created>
</wsse:UsernameToken>\n</wsse:Security>`;

let user = 'DigitalSrvUpdate2021';
let password = 'Q4rhLcdbXcuJBzn';

const xPlaceHolder = /\{\{([^\}]*)\}\}/g;
let now = new Date();
let text = '';
const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

for (let i = 0; i < 5; i++) {
  text += possible.charAt(Math.floor(Math.random() * possible.length));
}

let nonce = now.getTime().toString().concat(text);
const params = {
  wssUser: user,
  wssCreated: now.toISOString(),
  // eslint-disable-next-line no-undef
  wssNonce64: new Buffer.from(nonce).toString('base64'),
  // wssNonce64 : btoa(unescape(encodeURIComponent(nonce))),
  requestTime: new Date('YYYY-MM-dd HH:mm:ss')
};

let baseStr = nonce + params.wssCreated + password;
const enc =  CryptoJS.SHA1(baseStr);
params.wssPwdDigest = CryptoJS.enc.Base64.stringify(enc);

let xml = pwdDigestTemplate;

xml = xml.replace(xPlaceHolder, function (expr, key) {
  return key in params ? params[key] : expr;
});

console.log('XML STARTS HERE:\n'+xml+'\nXML ENDS HERE.');
let usePassword = xml.replace(/\n/g, '').replace(/^(.*0#PasswordDigest">)/, '').split('<');
console.log('Final password is >>>>>>>>>>>>'+usePassword[0]);
let useNonse = xml.replace(/\n/g, '').replace(/^(.*Base64Binary">)/, '').split('<');
console.log('Final nonse is >>>>>>>>>>>>'+useNonse[0]);
// postman.setEnvironmentVariable('_wss', xml);

// ----------------------------------- RUN THE SEARCH -------------------------------------------

let data = `<env:Envelope\n        xmlns:cwt="http://schema.carlsonwagonlit.com/V1"\n        xmlns:env="http://schemas.xmlsoap.org/soap/envelope/"\n        xmlns:xs="http://www.w3.org/2001/XMLSchema"\n        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\n    <env:Header><wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd" env:mustUnderstand="true">\n<wsse:UsernameToken wsu:Id="UsernameToken-80">\n<wsse:Username>DigitalSrvUpdate2021</wsse:Username>\n<wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordDigest">${usePassword}</wsse:Password>\n<wsse:Nonce EncodingType="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary">${useNonse}</wsse:Nonce>\n<wsu:Created>2022-05-21T19:44:15.507Z</wsu:Created>\n</wsse:UsernameToken>\n</wsse:Security>\n    </env:Header>\n    <env:Body>\n        <cwt:TravelerProfileSummaryRequest>\n            <cwt:RequestInfo sentBy="WebServices"/>\n\n            <cwt:SearchOption xsi:type="cwt:searchByTravelerGuid">\n                <cwt:Traveler guid="A:4040792E" />\n            </cwt:SearchOption>\n        </cwt:TravelerProfileSummaryRequest>\n    </env:Body>\n</env:Envelope>`;

let xhr = new XMLHttpRequest.XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open('POST', 'https://itest2profile.cwtwebservices.com/portrait-ws/search');
xhr.setRequestHeader('Accept-Encoding', 'gzip,deflate');
xhr.setRequestHeader('Content-Type', 'text/xml;charset=UTF-8');
xhr.setRequestHeader('SOAPAction', '""');
xhr.setRequestHeader('Connection', 'Keep-Alive');

xhr.send(data);

// let assert = require('assert');
// assert(this.responseText = 10, '>>>>>>>>>Assertion failed!!!');