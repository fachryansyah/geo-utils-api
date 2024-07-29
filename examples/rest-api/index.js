const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const geoUtils = require("../../geo-utils");

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const geoInstance = new geoUtils({
  executablePath: "/Applications/Thorium.app/Contents/MacOS/Thorium",
  timeout: 1000,
});

// Define the POST endpoint
app.post("/geocode", async (req, res) => {
  const { address } = req.body;  
  if (address) {
    const result = await geoInstance.geocodeAddresses(address);
    res.status(200).send({ message: 'Location Detected!', data: result });
  } else {
    res.status(400).send({ error: "Address is required" });
  }
});

app.post("/auto-complete", async (req, res) => {
  const { query } = req.body;
  if (query) {
    const result = await geoInstance.autoComplete(query);
    res.status(200).send({ message: 'Location Detected!', data: result });
  } else {
    res.status(400).send({ error: "Query is required" });
  }
})

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

process.on('SIGTERM', async () => {
  debug('SIGTERM signal received: closing HTTP server')
  server.close(() => {
    debug('HTTP server closed')
  })
  await geoInstance.close()
})