import axios from "axios";

class WeatherServices {
    constructor() {
        this.api = axios.create({ baseURL: `${process.env.REACT_APP_API_WEATHER_URL}` })
    };

    weatherByLatLon = (lat, lon, units) => {
        return this.api.get(`/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${process.env.REACT_APP_API_WEATHER_KEY}`)
    };
    weatherByCity = (city, units) => {
        return this.api.get(`/weather?q=${city}&units=${units}&appid=${process.env.REACT_APP_API_WEATHER_KEY}`)
    };

    getForecast = (city, units) => {
        return this.api.get(`/forecast?q=${city}&units=${units}&appid=${process.env.REACT_APP_API_WEATHER_KEY}`)
    };

    getForecastByCoords = (lat, lon, units) => {
        return this.api.get(`/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${process.env.REACT_APP_API_WEATHER_KEY}`)
    }

}

const weatherService = new WeatherServices();

export default weatherService