import { createContext, useState, useEffect } from "react";

const CityContext = createContext()

function CityNameProviderWraper(props) {
    const [city, setCity] = useState(`Madrid`)

    const storeCityName = (cityName) => {
        localStorage.setItem('cityValue', cityName)
    }
    // const removeCityname = () => {
    //     localStorage.removeItem('cityValue')
    // }
    const getCityName = () => {
        setCity(localStorage.getItem('cityValue'))
    }

    useEffect(() => {
        if (city) { getCityName() }
    }, [])

    return (
        <CityContext.Provider value={{ city, storeCityName }}>
            {props.children}
        </CityContext.Provider>
    )

}
export { CityContext, CityNameProviderWraper }