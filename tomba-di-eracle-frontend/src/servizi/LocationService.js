import axios from "axios";

const URL = "http://localhost:8080/locations/"

class LocationService {

    getAllMacro() {
        return axios.get(URL + 'macro')
    }
}

export default new LocationService();