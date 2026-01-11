import "./style.css";
import loadData from "./data.js";

const dropBtn = document.querySelector("#drop-btn");
const dropCont = document.querySelector("ul");
const optionsBtn = document.querySelectorAll("ul>button");
let locationInput = document.querySelector("#location-input");
const searchBtn = document.querySelector("form>button");
const unitSelPara = document.querySelector("p#unit-selected");

const daysDiv = document.querySelector("#result");
//There is something preventing me from declaring location as a variable.
//location is a reserved global object in browsers (window.location) that controls the URL. To avoid conflicts, always use a more specific name like currentLocation or userLocation

let unitMeas = "metric";
unitSelPara.innerHTML = unitMeas;

//Get this info from the API
let usefulInfo = ["datetime", "tempmax", "tempmin", "description"];


//Logic to show/hide the dropdown menu
document.addEventListener("click", (e) => {
    const withinBtn = e.composedPath().includes(dropBtn);
    const withinDropMenu = e.composedPath().includes(dropCont);
    

    if (withinBtn) {
        dropCont.classList.toggle("invisible");
        dropCont.classList.toggle("visible");
        return; //need to return this to make sure only one branch is fired at a time
    }

    if (!withinDropMenu) {
        dropCont.classList.remove("visible");
        dropCont.classList.add("invisible");
    }
});

//Logic to determine what unit of measurement to use
optionsBtn.forEach(btn => {
    btn.addEventListener("click", (e) => {
        unitMeas = e.target.id;
        unitSelPara.innerHTML = e.target.id;
        dropCont.classList = "invisible";
    });
});


//This logic controls what happens after clicking the search button
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const loc = locationInput.value;
    console.log(loc);
    loadData(loc, unitMeas)
        .then(data => {
            if (data) {
            console.log("data loaded");
            displayData(data);
            }
        })
        .catch(function(err){
            console.log(err);
        });
})


function displayData(r) {
    console.log(r);
    daysDiv.innerHTML = "";
    r.days.forEach(day => {
        console.log(day);
        const dayDiv = document.createElement("div");
        dayDiv.classList = "day";
        const html = Object.keys(day).filter(key => usefulInfo.includes(key))
        .map(key => `<li>${key}: ${day[key]}</li>`)
        .join(""); //convert the array to a string
        dayDiv.innerHTML = html;
        daysDiv.append(dayDiv);
        console.log(dayDiv);
    });
    document.body.append(daysDiv);
}