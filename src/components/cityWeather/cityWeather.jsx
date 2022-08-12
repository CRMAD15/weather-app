import React, { useEffect, useState } from 'react';
import weatherService from '../../services/weather.service';
import Loader from '../loader/loader';
import './cityWeather.css'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import { getUserPosition } from '../../utils/Geolocalization';

const CityWeather = () => {
    const [cityWeather, setCityWeather] = useState();
    const [geolocation, setGeolocation] = useState([]);
    const [isCoords, setIsCoords] = useState(false)

    useEffect(() => {
        getInfoPerDay()
    }, [isCoords]);

    const finaPosition = () => {
        getUserPosition()
            .then(res => {
                setIsCoords(true)
                setGeolocation(res)
            })
            .catch(err => console.log(err))
    }

    // const city = 'Madrid'
    // const getInfoPerDay = () => {
    //     weatherService
    //         .weatherByCity(city)
    //         .then(({ data }) => {
    //             setCityWeather(data)
    //         })
    //         .catch(error => console.log(error))
    // }



    const getInfoPerDay = () => {

        let lat;
        let lon;
        if (geolocation) {
            lat = geolocation[0];
            lon = geolocation[1];
            weatherService
                .weatherByLatLon(lat, lon)
                .then(({ data }) => {
                    setCityWeather(data)
                })
                .catch(error => console.log(error))
        }
    }



    const now = new Date(cityWeather?.location.localtime)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', ' Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dic']
    const month = months[now.getMonth()]
    const day = now.getDate()
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const dayWeek = days[now.getDay()]



    return (
        <>
            < div className='container_city' >
                <div className='finder-button'>
                    <button className='btn' > Seach for places</button>
                    <GpsFixedIcon className='gps-icon' sx={{ fontSize: 40 }} onClick={finaPosition} />
                </div>
                {geolocation ?

                    <h4>{geolocation[0]} {geolocation[1]}</h4> : <h4>no hay coords</h4>

                }
                {
                    cityWeather ? (

                        < div className='main-info' >
                            <img src={cityWeather.current.condition.icon} alt='logo-weather' />
                            <h1>{cityWeather.current.temp_c}<span className='grades'>ºC</span></h1>
                            <h3>{cityWeather.current.condition.text}</h3>
                            <div>
                                <p>Today: {dayWeek}, {day} {month}</p>
                                <div className='location-footer'>
                                    <p className='icon-location'><LocationOnIcon sx={{ fontSize: 20 }} /></p>
                                    <p>{cityWeather.location.name}</p>
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
