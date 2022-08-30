import React, { useEffect, useState, useContext } from 'react';
import Loader from '../loader/loader';
import './cityWeather.css'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import FormSearch from '../formSearchCity/formSearch';
import { CityContext } from '../../context/cityContext';
import weatherService from '../../services/weather.service';


const CityWeather = ({ geolocation, setGeolocation, finalPosition, units }) => {

    const [cityWeather, setCityWeather] = useState();
    const { city, setCity, removeCityname } = useContext(CityContext);

    // console.log(units)
    const getInfoPerDay = () => {
        if (!city) {
            let lat;
            let lon;
            lat = geolocation[0];
            lon = geolocation[1];
            weatherService
                .weatherByLatLon(lat, lon, units)
                .then(({ data }) => {
                    setCityWeather(data)
                })
                .catch(error => console.log(error))
                .finally(() => console.log('Finished promise by coords'))

        } else {
            weatherService
                .weatherByCity(city, units)
                .then(({ data }) => {
                    setCityWeather(data)
                    setGeolocation([])

                    //Save data of cities of searchs in local storage
                    if (localStorage.getItem('data') === null) {
                        localStorage.setItem('data', '[]')
                    }
                    let previousData = JSON.parse(localStorage.getItem('data'))
                    previousData.push(data.name)
                    localStorage.setItem('data', JSON.stringify(previousData))
                })
                .catch(err => {
                    alert(`${city} no existe`)
                    removeCityname()
                })
                .finally(() => console.log('Finished promise by city'))
        }
    }

    //useEffect mountain component
    useEffect(() => {
        getInfoPerDay()
    }, [city, units]);


    let iconUrl = `https://openweathermap.org/img/wn/${cityWeather?.weather[0].icon}@4x.png`
    //Modal window close and open
    const [isOpen, setIsOpen] = useState(false)
    const close = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            < div className='container_city' >
                <div className='finder-button'>
                    <button className='btn'
                        onClick={() => {
                            close(true)
                        }}

                    >
                        Seach for places</button>
                    <FormSearch
                        open={isOpen}
                        onClose={() => close()}
                        getInfoPerDay={getInfoPerDay}
                    />
                    <GpsFixedIcon className='gps-icon' sx={{ fontSize: 30 }} onClick={() => {
                        removeCityname()
                        setCity('')
                        finalPosition()
                        getInfoPerDay()

                    }} />
                </div>
                {
                    cityWeather ? (

                        < div className='main-info' >
                            <img src={iconUrl} alt='logo-weather' />
                            <h1>{cityWeather.main.temp}<span className='grades'>{units === 'metric' ? 'ºC' : 'ºF'}</span></h1>
                            <h3>{cityWeather.weather[0].main}</h3>
                            <div>
                                <p>Description: {cityWeather.weather[0].description}</p>
                                <div className='location-footer'>
                                    <p className='icon-location'><LocationOnIcon sx={{ fontSize: 20 }} /></p>
                                    <p>{cityWeather.name}</p>
                                </div>
                            </div>
                        </div >
                    ) :
                        <Loader />
                }
            </div >
        </>

    );

}

export default CityWeather;