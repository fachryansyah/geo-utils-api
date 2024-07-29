const geoUtils = require("../../geo-utils");

const start = async () => {
  const instance = new geoUtils({
    executablePath: "/Applications/Thorium.app/Contents/MacOS/Thorium",
    timeout: 1000
  });

  console.log(await instance.geocodeAddresses('Junior High School State 68 of Jakarta'));
}

start();