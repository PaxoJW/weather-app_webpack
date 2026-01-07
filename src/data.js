async function loadData(searchWord, unitMeas = "metric"){  
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchWord}?unitGroup=${unitMeas}&key=8T66TCLY9TNX9XGXYAWRLG6FJ&contentType=json`);
        const response_1 = await response.json();
        console.log("Data loaded:", response_1.days);
        return response_1;
        
    } catch (err) {
        console.log(err);
    }
}

export default loadData;