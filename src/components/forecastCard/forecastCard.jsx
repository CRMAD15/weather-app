import React from 'react';
import './forecastCard.css'
import { getDaysWeekForecast } from '../../utils/DateFunciton';
import Loader from '../loader/loader';

const ForecastCard = ({ forecastDay, units }) => {

    let firstArr = forecastDay[0]

    const days = getDaysWeekForecast(firstArr.dt_txt)
    const maxTemp = Math.round(forecastDay[3].main.temp_max)
    const mminTemp = Math.round(forecastDay[2].main.temp_min)


    let iconUrl = `https://openweathermap.org/img/wn/${forecastDay[2].weather[0].icon}@2x.png`

    return (


        < div className='forecastCard-container' >
            {
                forecastDay ?
                    <div>
                        <h3>{days}</h3>
                        <img src={iconUrl} alt="Logo type weather" />
                        <div className='temperatures'>
                            <h6>{maxTemp} {units === 'metric' ? 'ºC' : 'ºF'}</h6>
                            <h6 className='min-temperature'>{mminTemp} {units === 'metric' ? 'ºC' : 'ºF'}</h6>
                        </div>
                    </div> :
                    <Loader />
            }
        </div >

    );
}

export default ForecastCard;
