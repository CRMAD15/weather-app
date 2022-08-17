import { createContext, useState, useEffect } from "react";
import weatherService from '../services/weather.service'
import { getUserPosition } from "../utils/Geolocalization";


const CityContext = createContext()

function CityNameProviderWraper(props) {
    const [cityWeather, setCityWeather] = useState();
    const [geolocation, setGeolocation] = useState([51.507351, -0.127758]);
    const [isCoords, setIsCoords] = useState(false)
    const [nameCity, setNameCity] = useState('');

    const storeCityName = (cityName) => {
        localStorage.setItem('cityValue', cityName)
    }
    const removeCityname = () => {
        localStorage.removeItem('cityValue')
    }
    const getCityName = () => {
        return localStorage.getItem('cityValue')
    }

    const finaPosition = () => {
        getUserPosition()
            .then(res => {
                setIsCoords(true)
                setGeolocation(res)
                setNameCity()
            })
            .catch(err => console.log(err))
            .finally(() => console.log('Finished get coords'))
    }

    const getInfoPerDay = () => {

        if (!nameCity) {
            let lat;
            let lon;
            lat = geolocation[0];
            lon = geolocation[1];
            weatherService
                .weatherByLatLon(lat, lon)
                .then(({ data }) => {
                    setCityWeather(data)
                    setIsCoords(false)
                })
                .catch(error => console.log(error))
                .finally(() => console.log('Finished promise by coords'))
        } else {
            weatherService
                .weatherByCity(nameCity)
                .then(({ data }) => {
                    setCityWeather(data)
                    setGeolocation([])
                    if (localStorage.getItem('data') === null) {
                        localStorage.setItem('data', '[]')
                    }
                    let previousData = JSON.parse(localStorage.getItem('data'))
                    previousData.push(data.name)
                    localStorage.setItem('data', JSON.stringify(previousData))

                })
                .catch(err => {
                    alert(`${nameCity} no existe`)
                })
                .finally(() => console.log('Finished promise by city'))

        }

    }

    useEffect(() => {
        getInfoPerDay()
    }, [isCoords]);

    return (
        <CityContext.Provider value={{ nameCity, cityWeather, storeCityName, removeCityname, getCityName, getInfoPerDay, finaPosition, setNameCity }}>
            {props.children}
        </CityContext.Provider>
    )

}
export { CityContext, CityNameProviderWraper }