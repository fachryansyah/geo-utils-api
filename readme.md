# Geo Utils API
Geo Utils Api: helps you to save your usage billing of maps APIs, this library can find a place with suggestions by query & can take a look at the lat-long position based on addresses.

This library uses puppeteer-core as a scrapper, so you must install the browser first and pass the executable path to the argument.

## Installation
```bash
$ npm i geo-utils-api
```
or
```bash
$ yarn add geo-utils-api
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
