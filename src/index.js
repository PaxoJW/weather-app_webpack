import "./style.css";
import loadData from "./data.js";


const image = document.querySelector("img");
let locationInput = document.querySelector("#location-input");
const searchBtn = document.querySelector("button");
const todayTemp = document.querySelector("#temperature");
const daysDiv = document.querySelector("#result");
const location1 = document.querySelector("#location-display"); //There is something preventing me from declaring location as a variable

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const loc = locationInput.value;
    const locationInfo = loadData(loc);
    displayData(locationInfo);
    fetchData(loc);
})

function fetchData(searchWord) {
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchWord}?unitGroup=metric&key=8T66TCLY9TNX9XGXYAWRLG6FJ&contentType=json`)
    //we must return the json and then log the response to the console to see the data
        .then(function(response){
            return response.json();
        })
        .then(function(response){
            displayData(response);
            console.log(response);
            console.log(response.currentConditions.icon);
            displayGif(response.currentConditions.icon);
        })
        .catch(function(err){
            console.log(err);
        });
}

function displayData(r) {
    r.array.forEach(day => {
        const dayDiv = document.createElement("div");
        day.forEach(info => {
            para = document.createElement("p");
            para.textContent = info;
            dayDiv.append(para);
        })
        daysDiv.append(dayDiv);
    });
}

function displayGif(weatherCond) {
    fetch(`https://api.giphy.com/v1/gifs/translate?api_key=BpNNwaH2DUzqkVbCtJ9SWSDpKaxy9HOl&s=${weatherCond}`)
        .then(function(gifResponse){
            return gifResponse.json();
        })
        .then(function(gifResponse){
            image.src = gifResponse.data.images.downsized.url;
            image.parentElement.classList = "visible";
            console.log(gifResponse);
        })
        .catch(function(err){
            console.log(err);
        })
}



