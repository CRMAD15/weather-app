export function divideDaysForescast(arr) {
    if (arr) {
        let newArr = [...arr]
        let result = newArr.map(elemt => {
            let newData = elemt.dt_txt.slice(0, 10)
            let newDate = { ...elemt, dt_txt: newData }
            return newDate
        })

        let data = {}

        result.forEach(element => {
            let dateValue = element.dt_txt

            if (!data[dateValue]) {
                data[dateValue] = []
            }
            data[dateValue].push(element)
        });

        let resultFinal = []
        let converter = Object.keys(data);

        for (let i = 0; i < converter.length; i++) {
            let clave = converter[i];

            resultFinal.push(data[clave])
        }

        resultFinal.shift()
        return (resultFinal);

    }
}
