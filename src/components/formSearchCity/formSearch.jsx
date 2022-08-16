import React, { useRef, useState } from 'react';
import weatherService from '../../services/weather.service';
import { Button, Modal } from '@mui/material';
import { citiesFinded } from '../../utils/functions';
import * as Yup from 'yup'


const findCitySchema = Yup.object().shape(
    {
        city: Yup.string()
            .required('City name is required')
    }
)

const FormSearch = ({ open, onClose }) => {

    const [nameCity, setNameCity] = useState('');
    const [cityData, setCityData] = useState();

    const getCityInfo = () => {
        if (nameCity) {
            weatherService
                .weatherByCity(nameCity)
                .then(({ data }) => {
                    setCityData(data)
                    if (localStorage.getItem('data') === null) {
                        localStorage.setItem('data', '[]')
                    }
                    let previousData = JSON.parse(localStorage.getItem('data'))
                    previousData.push(data.name)
                    localStorage.setItem('data', JSON.stringify(previousData))

                })
                .catch(err => {
                    alert('The name city doesn´t exist')
                })
                .finally(() => console.log('Finished on one way or the other way'))
        }
    }

    let infoLocalStorage = JSON.parse(localStorage.getItem('data'))

    let finalArr = citiesFinded(infoLocalStorage)
    const cityValue = useRef('')


    const handleSelect = (e) => {
        setNameCity(e.target.value)
    }
    console.log(nameCity)

    const body = (
        <div>
            <h4>Introduce a City</h4>
            <form onSubmit={getCityInfo}>
                <input ref={cityValue} id='city'
                    type="text"
                    className='form-control form-control-lg'
                    required placeholder='city'
                    onChange={handleSelect}
                    value={nameCity ? nameCity : ''} />
                <Button type="submit" >Find..</Button>
            </form>
            < h4 > Latest Searchs</h4>
            {
                infoLocalStorage ?
                    finalArr?.map((city, idx) => {
                        return (
                            <div key={idx}>
                                <h4 onClick={() => {
                                    setNameCity(city)
                                }}
                                    ref={cityValue}
                                >
                                    {city}
                                </h4>
                            </div>
                        )
                    }) :
                    <h4>There is no searchs</h4>
            }
        </div >
    )


    return (
        <Modal
            open={open}
            onClose={onclose}
        >
            {body}
        </Modal>
    );
}



export default FormSearch;



