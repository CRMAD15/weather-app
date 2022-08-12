import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup'
import weatherService from '../../services/weather.service';

const findCitySchema = Yup.object().shape(
    {
        city: Yup.string()
            .required('City name is required')
    }
)
const FormSearch = () => {

    const [nameCity, setNameCity] = useState('');
    const [cityData, setCityData] = useState();



    let listCities = []
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
            let lastCities = arr.filter((eachCity) => {
                const isDuplicate = uniqueElements.includes(eachCity)
                if (!isDuplicate) {
                    uniqueElements.push(eachCity)
                    return true
                }
                return false
            })
            console.log(lastCities)
            let smallArr = lastCities.slice(-4)
            let finalArr = smallArr.reverse()
            return finalArr
        }
    }

    let infoLocalStorage = JSON.parse(localStorage.getItem('data'))

    citiesFinded(infoLocalStorage)

    let finalArr = citiesFinded(infoLocalStorage)
    console.log(finalArr)
    return (
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
                            values,
                            touched,
                            errors,
                            isSubmitting,
                            handleChange,
                            handleBlur
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

            </Formik>
            <h4>Latest Searchs</h4>
            {infoLocalStorage ?
                finalArr?.map((city, idx) => {
                    return (
                        <h4 key={idx}>{city}</h4>
                    )
                }) :
                <h4>There is no searchs</h4>
            }

        </div>
    );
}

export default FormSearch;
