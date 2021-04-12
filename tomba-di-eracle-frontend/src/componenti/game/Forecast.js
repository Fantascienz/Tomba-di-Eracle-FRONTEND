import React from 'react';
import MeteoService from '../../servizi/MeteoService';

const Forecast = () => {

    //1: verifica che la data attuale sia uguale all'ultima data nel db
    //2 TRUE: se è uguale, amen
    //2 FALSE: se è diversa, fa la chiamata al servizio e mette il meteo in session
    //3: costruisce l'oggetto METEO
    //4: passa l'oggetto METEO al DB e sostituisce la prima collonna della tabella Meteo
    //5: rimuove il meteo dalla session

    function verificaData() {
        return MeteoService.getMeteoReale()
            .then(res => {
                sessionStorage.setItem('dataMeteoDB', JSON.stringify(res.data.data_inserimento))
            })
    }



    function comparaData() {
        var dataAttuale = new Date().toLocaleDateString();
        var dataDB = JSON.parse(sessionStorage.getItem('dataMeteoDB'));
        var gVerifica = parseInt(dataDB.substring(8, 10))
        var mVerifica = parseInt(dataDB.substring(5, 7))
        var aVerifica = parseInt(dataDB.substring(0, 4))
        var dataVerifica = gVerifica + "/" + mVerifica + "/" + aVerifica
        // eslint-disable-next-line
        if (dataAttuale == dataVerifica) {
            return true
        }
        return false
    }



    function nuovoMeteo() {
        return MeteoService.newMeteoReale()
            .then(res => {
                sessionStorage.setItem('nuovoMeteo', JSON.stringify(res.data.weather[0].main))
            })
    }


    function creaNuovoMeteo() {
        var climaAPI = JSON.parse(sessionStorage.getItem('nuovoMeteo'));

        if (climaAPI === "Mist" || climaAPI === "Smoke" || climaAPI === "Haze" || climaAPI === "Dust" || climaAPI === "Sand" || climaAPI === "Ash" || climaAPI === "Squall" || climaAPI === "Tornado") {
            climaAPI = "Fog"
        }

        var nuovoMeteo = {
            clima: climaAPI,
            data_inserimento: new Date()
        }

        return MeteoService.modificaMeteoReale(nuovoMeteo)
    }



    function fine() {
        sessionStorage.removeItem('dataMeteoDB')
        sessionStorage.removeItem('nuovoMeteo')
    }





    function tuttoassieme() {
        verificaData()
            .then(res =>
            (comparaData()
                ? fine()
                : nuovoMeteo()
                    .then(res => creaNuovoMeteo()
                        .then(res => fine())))
            )
    }


    return (
        <>
            {tuttoassieme()}
        </>
    )
}
export default Forecast;