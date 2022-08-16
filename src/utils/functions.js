export const citiesFinded = (arr) => {
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