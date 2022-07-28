const express = require("express");
const { json } = require("express/lib/response");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/app.html");
});

app.post("/", function(req, res) {


    const query = req.body.cityName;
    const apid = "5a2138967fef115e9449f71b62e91f04#";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apid;
    https.get(url, function(response) {
        console.log(response.statusCode);


        response.on("data", function(data) {
            const wdata = JSON.parse(data);
            console.log(wdata);
            const temp = wdata.main.temp;
            console.log(temp);

            const des = wdata.weather[0].description;
            const icon = wdata.weather[0].icon;
            const imgurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.send("<h1>THE TEMPERATURE IN " + query + " IS " + temp + " DEGREE CELCIUS. THE WEATHER IS " + des + " </h1> <img src=" + imgurl + ">");
        })
    })

})




app.listen("2000", function() {
    console.log("connected");
})