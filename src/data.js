function loadData(searchWord, unitMeas){  
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchWord}?unitGroup=${unitMeas}&key=8T66TCLY9TNX9XGXYAWRLG6FJ&contentType=json`)
        .then(function(response){
            return response.json();
        })
        .then(function(response){
            console.log("Data loaded:", response.days);
            days = {searchWord};
            response.days.array.forEach(day => {
                day = {date, temp, tempmin, tempmax, prec, precipprob, cloudcover};
                date = day.datetime;
                temp = day.temp;
                tempmax = day.tempmax;
                tempmin = day.tempmin;
                prec = day.prectype[0];
                precipprob = day.precipprob;
                
                days.append(day);
            });

            return days;
        })
        .catch(function(err){
            console.log(err);
        });
}

export default loadData();
