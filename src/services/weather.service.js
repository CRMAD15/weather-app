import axios from "axios";

class WeatherServices {
    constructor() {
        this.api = axios.create({ baseURL: `${process.env.REACT_APP_API_WEATHER_URL}` })
    };

    weatherByCity = (city) => {
        return this.api.get(`/current.json?key=${process.env.REACT_APP_API_WEATHER_KEY}&q=${city}&aqi=no`)
    };

}

const weatherService = new WeatherServices();

export default weatherService