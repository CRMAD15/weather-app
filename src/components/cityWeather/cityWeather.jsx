import React, { useEffect, useState, useRef, useContext } from 'react';
import Loader from '../loader/loader';
import './cityWeather.css'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import FormSearch from '../formSearchCity/formSearch';
import { CityContext } from '../../context/cityContext';


const CityWeather = () => {

    const { nameCity, cityWeather, finaPosition, setNameCity, getInfoPerDay } = useContext(CityContext);

    console.log('a ver si cambia el nombre la ciudad', nameCity)

    let iconUrl = `https://openweathermap.org/img/wn/${cityWeather?.weather[0].icon}@4x.png`

    //Modal window close and open
    const [isOpen, setIsOpen] = useState(false)
    const close = () => {
        setIsOpen(!isOpen)
    }
    console.log(cityWeather)
    return (
        <>
            < div className='container_city' >
                <div className='finder-button'>
                    <button className='btn' onClick={() => close(true)} > Seach for places</button>
                    <FormSearch
                        open={isOpen}
                        onClose={() => close()}
                        setNameCity={setNameCity}
                        getInfoPerDay={getInfoPerDay}
                        nameCity={nameCity}
                    />
                    <GpsFixedIcon className='gps-icon' sx={{ fontSize: 30 }} onClick={finaPosition} />
                </div>
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