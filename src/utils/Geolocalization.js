// export function getPosition() {

//     let finalsPositions = {}
//     let finalError = {}
//     const options = {
//         enableHighAccuracy: true,  //==> le decimos que el dipositivo haga la mejor lectura de la localización
//         timeout: 5000,             // ==>Cuento va estar esperando la respuesta para tomar la lectura
//         maximumAge: 0              //==>Para no guardar en cache la lectura y que no tenga como referencia la anterior al tomar una nueva lectura 
//     }
//     const success = (position) => {
//         finalsPositions = position.coords
//         console.log(position)
//         return finalsPositions
//     }
//     const error = err => {
//         console.log(err)
//         finalError = err
//         return finalError
//     }
//     navigator.geolocation.getCurrentPosition(success, error, options)
// }


// export const getAddress = async () => {
//     // notice, no then(), cause await would block and 
//     // wait for the resolved result
//     const position = await this.getCoordinates();
//     let latitude = position.coords.latitude;
//     let longitude = position.coords.longitude;
//     let url = Constants.OSMAP_URL + latitude + "&lon=" + longitude;

//     // Actually return a value
//     return this.reverseGeoCode(url);
// }



export const getUserPosition = async () => {
    const options = {
        enableHighAccuracy: true,  //==> le decimos que el dipositivo haga la mejor lectura de la localización
        timeout: 5000,             // ==>Cuento va estar esperando la respuesta para tomar la lectura
        maximumAge: 0              //==>Para no guardar en cache la lectura y que no tenga como referencia la anterior al tomar una nueva lectura
    }
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                resolve([coords.latitude, coords.longitude])
            },
            (err) => {
                alert('Location not detected');
                console.log(err);
                reject()
            },
            options
        )
    })
}
