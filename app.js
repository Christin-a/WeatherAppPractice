

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    console.log(req.body.city);
    const query = req.body.city;
    const units = "imperial";
    const apiKey = "3519c7bde5175ad723d41b4e40ee4e56";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" +apiKey+ "&units=" + units;
    
    
    https.get(url, function(response){
        console.log(response.statusCode);
    
    response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imgUrl = "http://openweathermap.org/img/wn/" +icon+ "@2x.png";
    
        console.log(temp, description);
        res.write("<h1>The weather in " +query+ " is " + temp + "</h1>");
        res.write("<p> with " + description + "!<p>");
        res.write("<img src = " + imgUrl + ">" );
        res.send();
    });
    
    });
})

app.listen(3000, function () {
    console.log("Server is running on port 3000.");
})
