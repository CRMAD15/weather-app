import React, { useContext, useState } from 'react';
import { Button, Modal } from '@mui/material';
import { citiesFinded } from '../../utils/functions';
import './formSearch.css'
import { CityContext } from '../../context/cityContext';



const FormSearch = ({ open, onClose, getInfoPerDay }) => {

    const [refCity, setRefCity] = useState('')

    const { storeCityName, setCity } = useContext(CityContext)

    let infoLocalStorage = JSON.parse(localStorage.getItem('data'))
    let finalArr = citiesFinded(infoLocalStorage)

    const handleSelect = (e) => {
        e.preventDefault();
        setRefCity(e.target.value)
    }

    const body = (
        <div className='form-container' >
            <button className='form-btn' onClick={onClose}>X</button>

            <h4>Introduce a City</h4>
            <form id="create-course-form" onSubmit={(e) => {
                e.preventDefault()
                getInfoPerDay()
                onClose()
                storeCityName(refCity)
                setCity(refCity)


            }}>
                <input id='city'
                    type="text"
                    className='form-control'
                    onChange={handleSelect}
                    placeholder='New city'
                    value={refCity ? refCity : ''}
                />
                <button className='btn-form' type="submit" >Find..</button>
            </form>
            {
                infoLocalStorage ?

                    <div>
                        <h3>Your lastest searches</h3>
                        {
                            finalArr?.map((city, idx) => {
                                return (
                                    <div key={idx}>
                                        <h4 className='list-cities'
                                            onClick={() => {
                                                setRefCity(city)
                                            }}
                                        >
                                            {city}
                                        </h4 >
                                    </div>
                                )
                            })
                        }
                    </div >
                    :
                    <h4>there is no search</h4>
            }
        </div >
    )
    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
        >
            {body}

        </Modal>
    );
}

export default FormSearch;