import { createContext, useState, useEffect } from "react";

const CityContext = createContext()

function CityNameProviderWraper(props) {
    const [city, setCity] = useState()

    const storeCityName = (cityName) => {
        localStorage.setItem('cityValue', cityName)
    }
    const removeCityname = () => {
        localStorage.removeItem('cityValue')
    }
    const getCityName = () => {
        setCity(localStorage.getItem('cityValue'))
    }

    useEffect(() => {
        getCityName()
    }, [city])
    console.log('---------------------', city)
    return (
        <CityContext.Provider value={{ city, storeCityName, setCity, removeCityname }}>
            {props.children}
        </CityContext.Provider>
    )

}
export { CityContext, CityNameProviderWraper }