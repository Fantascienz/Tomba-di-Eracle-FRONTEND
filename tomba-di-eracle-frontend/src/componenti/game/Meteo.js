import React, { useState } from 'react'

const Meteo = () => {
    let [responseObj, setResponseObj] = useState({});

    function getMeteo() {
        // weather data fetch function will go here: https://community-open-weather-map.p.rapidapi.com/forecast?q=Larissa%2C%20GR&lang=it&cnt=9
        fetch("https://community-open-weather-map.p.rapidapi.com/forecast?q=Larissa%2C%20GR&lang=it&cnt=9", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "795aeec374mshbd6b72a1ae860e5p1e983djsn86f58d2e1ecc",
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
            }
        })
            .then(res => res.json())
            .then(response => {
                setResponseObj(response)
            })
            .then(sessionStorage.setItem('meteo', JSON.stringify(responseObj)))
            .catch(err => {
                console.error(err);
            });
    }
    
    var dataOdierna = new Date();
    var datiMeteo = JSON.parse(sessionStorage.getItem('meteo'));
    var anno = parseInt((datiMeteo.list[8].dt_txt).substring(0, 4));
    var mese = parseInt((datiMeteo.list[8].dt_txt).substring(5, 7));
    var giorno = parseInt((datiMeteo.list[8].dt_txt).substring(8, 10));
    var ora = parseInt((datiMeteo.list[8].dt_txt).substring(11, 13))


    return (
        // JSX code will go here
        <div>
            <h2>Find Current Weather Conditions</h2>
            <div>
                {datiMeteo.city.name}
                <br/>
                {datiMeteo.list[0].dt_txt}: {datiMeteo.list[0].weather[0].description}
                <br/>
                {datiMeteo.list[1].dt_txt}: {datiMeteo.list[1].weather[0].description}
                <br/>
                {datiMeteo.list[2].dt_txt}: {datiMeteo.list[2].weather[0].description}
                <br/>
                {datiMeteo.list[3].dt_txt}: {datiMeteo.list[3].weather[0].description}
                <br/>
                {datiMeteo.list[4].dt_txt}: {datiMeteo.list[4].weather[0].description}
                <br/>
                {datiMeteo.list[5].dt_txt}: {datiMeteo.list[5].weather[0].description}
                <br/>
                {datiMeteo.list[6].dt_txt}: {datiMeteo.list[6].weather[0].description}
                <br/>
                {datiMeteo.list[7].dt_txt}: {datiMeteo.list[7].weather[0].description}
                <br/>
                {datiMeteo.list[8].dt_txt}: {datiMeteo.list[8].weather[0].description}
                <br/><br/>
                Anno: {anno-810}
                <br/>
                Mese: {mese}
                <br/>
                Giorno: {giorno}
                <br/>
                Ora: {ora}
                <br/><br/>
                Data Odierna: <p>{dataOdierna}</p>

                
            </div>
            {/* <button onClick={getMeteo}>Get Forecast</button> */}
        </div>
    )
}
export default Meteo;