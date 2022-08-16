import { withFormik, ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup'
import weatherService from '../../services/weather.service';
import { Button, makeStyles, Modal, TextField } from '@mui/material';


const findCitySchema = Yup.object().shape(
    {
        city: Yup.string()
            .required('City name is required')
    }
)
const FormSearch = ({ isOpen, handleClose }) => {

    const [nameCity, setNameCity] = useState('');
    const [cityData, setCityData] = useState();



    useEffect(() => {
        getCityInfo()
    }, [nameCity])


    const initialCredential = {
        city: ''
    };

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




    const citiesFinded = (arr) => {
        let uniqueElements = []

        if (arr) {
            let newArr = [...arr].reverse()

            let lastCities = newArr.filter((eachCity) => {
                const isDuplicate = uniqueElements.includes(eachCity)
                if (!isDuplicate) {
                    uniqueElements.push(eachCity)
                    return true
                }
                return false
            })
            let smallArr = lastCities.slice(0, 8)
            return smallArr
        }


    }


    let infoLocalStorage = JSON.parse(localStorage.getItem('data'))

    let finalArr = citiesFinded(infoLocalStorage)




    const cityValue = useRef('')

    return (
        <Modal

            open={isOpen}
            onClose={handleClose}
        >
            <div>


                <h4>Introduce a City</h4>
                <Formik
                    initialValues={initialCredential}
                    validationSchema={findCitySchema}
                    onSubmit={async (values) => {
                        setNameCity(values.city)

                    }}
                >
                    {/* We get props from Formik */}
                    {
                        props => {
                            const {
                                touched,
                                errors,

                            } = props

                            return (
                                <Form>
                                    <label htmlFor="city">City</label>
                                    <Field id='city' name='city' placeholder='Introduce a new city' />
                                    {/* Errors city */}
                                    {
                                        errors.city && touched.city && (
                                            <ErrorMessage style={{ color: 'red' }} name='city' component='div'></ErrorMessage>
                                        )
                                    }
                                </Form>
                            )
                        }
                    }
                    <button type="submit" onClick={() => handleClose(false)}>Find..</button>

                </Formik>
                <h4>Latest Searchs</h4>
                {
                    infoLocalStorage ?
                        finalArr?.map((city, idx) => {
                            return (
                                <div key={idx}>
                                    <h4 onClick={(e) => {
                                        e.preventDefault()
                                        test(city)
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
            </div>
        </Modal>
    );
}



export default FormSearch;



