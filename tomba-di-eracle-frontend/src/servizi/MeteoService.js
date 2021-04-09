import axios from 'axios'

const URL = "http://localhost:8080/meteo";

class MeteoService {

    modificaMeteoReale(meteoReale) {
        return axios.post(URL, meteoReale)
    }

    getMeteoReale() {
        return axios.get(URL + "/reale")
    }

    getMeteoSpecifico(id) {
        return axios.get(URL + "/" + id)
    }

    newMeteoReale() {
        var options = {
            method: 'GET',
            url: 'https://community-open-weather-map.p.rapidapi.com/weather',
            params: {q: 'Larissa,GR', lang: 'null'},
            headers: {
              'x-rapidapi-key': '795aeec374mshbd6b72a1ae860e5p1e983djsn86f58d2e1ecc',
              'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
            }
          };
        return axios.request(options)
    }

}

export default new MeteoService();