async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

async function sleep (time) {
  await new Promise((resolve) => setTimeout(resolve, time));
};

async function parseUrl(url) {
  const urls = url.split("/");
  const fullAddress = decodeURIComponent(urls[5]).replace(/\+/g, " ");
  const latitude = urls[6].split(",")[0].replace(/\@/g, "");
  const longitude = urls[6].split(",")[1];
  return {
    fullAddress,
    latitude,
    longitude,
  };
};

module.exports = {
  asyncForEach, sleep, parseUrl
}