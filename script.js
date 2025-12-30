const image = document.querySelector("img");
let locationInput = document.querySelector("#location-input");
const searchBtn = document.querySelector("button");
const todayTemp = document.querySelector("#temperature");
const location1 = document.querySelector("#location-display");

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const loc = locationInput.value;
    fetchData(loc);
    
})

function fetchData(searchWord) {
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchWord}?unitGroup=us&key=8T66TCLY9TNX9XGXYAWRLG6FJ&contentType=json`)
    //we must return the json and then log the response to the console to see the data
        .then(function(response){
            return response.json();
        })
        .then(function(response){
            displayData(response);
        })
        .catch(function(err){
            console.log(err);
        });
}

function displayData(r) {
    location1.textContent += r.address;
    todayTemp.textContent += r.currentConditions.temp;
}



