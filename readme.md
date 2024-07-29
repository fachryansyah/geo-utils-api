# Geo Utils API
Geo Utils Api: help you to save your usage billing of maps apis, this library can find a place with sugesstions by query & can take looks the lat-long position based on addresses.

This library using puppeteer-core as scrapper so you need install the browser first, and passing the executable path to the argument.

## Installation
```bash
$ npm i geo-utils-api
```
or
```bash
$ yarn i geo-utils-api
```

## Usage
```js
const geoUtils = require('geo-utils-api');
const instance = new geoUtils({
    executablePath: "/Applications/Thorium.app/Contents/MacOS/Thorium", // your chrome path
    timeout: 1000 // timeout navigation
});

console.log(await instance.geocodeAddresses('Junior High School State 68 of Jakarta'));
```