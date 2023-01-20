const express = require("express");
const https = require("https");

const app = express();

app.get("/", (req, res) => {
  const getUrl = "https://" + "";
  https.get(getUrl, (response) => {
    console.log(response);
  });

  res.send("Everything works");
});

app.listen(3000, () => {
  console.log("I exist");
});
