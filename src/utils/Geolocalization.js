
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
