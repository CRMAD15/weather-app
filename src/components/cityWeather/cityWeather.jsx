import React, { useEffect, useState, useRef } from 'react';
import weatherService from '../../services/weather.service';
import Loader from '../loader/loader';
import './cityWeather.css'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import { getUserPosition } from '../../utils/Geolocalization';
import { Modal } from '@mui/material';
import FormSearch from '../formSearchCity/formSearch';
import Modals from '../Modals';


const CityWeather = () => {
    const [cityWeather, setCityWeather] = useState();
    const [geolocation, setGeolocation] = useState([40.41684, -3.70377]);
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



    let iconUrl = `https://openweathermap.org/img/wn/${cityWeather?.weather[0].icon}@4x.png`

    //Modal window close and open
    const [open, setOpen] = useState(false);

    const refModal = useRef();


    const [isOpen, setIsOpen] = useState(false)
    const close = () => {
        setIsOpen(!isOpen)
    }
    return (
        <>
            < div className='container_city' >
                <div className='finder-button'>
                    <button className='btn' onClick={() => close(true)} > Seach for places</button>

                    <FormSearch
                        open={isOpen}
                        onClose={() => close()}

                    />

                    <GpsFixedIcon className='gps-icon' sx={{ fontSize: 40 }} onClick={finaPosition} />
                </div>

                <h4>{geolocation[0]} {geolocation[1]}</h4>

                {
                    cityWeather ? (

                        < div className='main-info' >
                            <img src={iconUrl} alt='logo-weather' />
                            <h1>{cityWeather.main.temp}<span className='grades'>ºC</span></h1>
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