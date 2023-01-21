const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const query = req.body.cityName;
  const apiKey = "0dc6a234721528be7d15a94544cda192";
  const unit = "metric";

  const getUrl =
    "https://" +
    "api.openweathermap.org/data/2.5/weather?appid=" +
    apiKey +
    "&q=" +
    query +
    "&units=" +
    unit +
    "";
  https.get(getUrl, (response) => {
    //console.log(response);

    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@4x.png";
      res.write(`<h1>The temperature in ${query} is ${temp} degrees Celcius.</h1>`);
      res.write(`<h2> The weather conditions are: ${desc}</h2>`);
      res.write("<img src=" + imageURL + ">");
      res.send();
    });
  });
});

app.listen(3000, () => {
  console.log("I exist");
});
