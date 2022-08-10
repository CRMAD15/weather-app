import axios from "axios";

class WeatherServices {
    constructor() {
        this.api = axios.create({ baseURL: `${process.env.REACT_APP_API_WEATHER_URL}` })
    };

    weatherByCity = (city) => {
        return this.api.get(`/current.json?key=${process.env.REACT_APP_API_WEATHER_KEY}&q=${city}&aqi=no`)
    };
    getForecast = (city, days) => {
        return this.api.get(`forecast.json?key=${process.env.REACT_APP_API_WEATHER_KEY}&q=${city}&days=${days}&aqi=yes&alerts=yes`)
    };
    weatherByLatLon = (lat, lon) => {
        return this.api.get(`/current.json?key=${process.env.REACT_APP_API_WEATHER_KEY}&q=${lat},${lon}&aqi=no`)
    };
}

const weatherService = new WeatherServices();

export default weatherService