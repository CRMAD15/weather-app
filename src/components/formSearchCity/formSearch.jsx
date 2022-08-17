import React, { useContext } from 'react';
import { Button, Modal } from '@mui/material';
import { citiesFinded } from '../../utils/functions';
import './formSearch.css'
import { CityContext } from '../../context/cityContext';



const FormSearch = ({ open, onClose, nameCity, setNameCity, getInfoPerDay }) => {


    const { storeCityName } = useContext(CityContext)

    let infoLocalStorage = JSON.parse(localStorage.getItem('data'))
    let finalArr = citiesFinded(infoLocalStorage)

    const handleSelect = (e) => {
        e.preventDefault();
        setNameCity(e.target.value)
        storeCityName(e.target.value)
    }
    const body = (
        <div className='form-container' >
            <button className='form-btn' onClick={onClose}>X</button>

            <h4>Introduce a City</h4>
            <form onSubmit={(e) => {
                e.preventDefault()
                getInfoPerDay()
                onClose()
                setNameCity('')
            }}>
                <input id='city'
                    type="text"
                    className='form-control form-control-lg'
                    onChange={handleSelect}
                    value={nameCity ? nameCity : ''}
                />
                <Button type="submit" >Find..</Button>
            </form>
            {
                infoLocalStorage ?

                    <div>
                        <h3>Your lastest searches</h3>
                        {
                            finalArr?.map((city, idx) => {
                                return (
                                    <div key={idx}>
                                        <h4 onClick={() => {
                                            setNameCity(city)
                                        }}
                                        >
                                            {city}
                                        </h4>
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



