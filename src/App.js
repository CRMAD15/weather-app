
import { useState } from "react"
const App = () => {
    const [counter, setCounter] = useState(0);
    const [values, setValues] = useState();

    const handleClick = () => {
        setCounter(counter + 1)
        setValues(values.concat(counter))
    }
    return (
        <div className="container">

            <h1>Hola Cristian</h1>
            <h1>{counter}</h1>
            <button onClick={handleClick}>Press</button>
        </div>
    )
}



export default App




