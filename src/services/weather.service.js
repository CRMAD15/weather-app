import axios from "axios";

class WeatherServices {
    constructor() {
        this.api = axios.create({ baseURL: `${process.env.REACT_APP_API_WEATHER_URL}` })
    };

    weatherByLatLon = (lat, lon) => {
        return this.api.get(`/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_API_WEATHER_KEY}`)
    };
    weatherByCity = (city) => {
        return this.api.get(`/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_WEATHER_KEY}`)
    };

    getForecast = (city) => {
        return this.api.get(`/forecast?q=${city}&units=metric&appid=${process.env.REACT_APP_API_WEATHER_KEY}`)
    };

    getForecastByCoords = (lat, lon) => {
        return this.api.get(`/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_API_WEATHER_KEY}`)
    }

}

const weatherService = new WeatherServices();

export default weatherService