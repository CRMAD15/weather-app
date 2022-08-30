import React, { useState } from 'react';
import './buttonsUnits.css'


const ButtonsUnits = ({ setUnits }) => {

    let myObjects = ['ºC', 'ºF']

    const [styleToggle, setStyleToggle] = useState({
        activeObjects: myObjects[0],
        objects: myObjects
    });

    function toggleActive(index) {
        setStyleToggle({ ...styleToggle, activeObjects: styleToggle.objects[index] })
    }
    function toggleActiveStyle(index) {
        if (styleToggle.objects[index] === styleToggle.activeObjects) {
            return 'box active'
        } else {
            return 'box inactive'
        }
    }

    function changeMetrics(index) {
        index === 0 ? setUnits('metric') : setUnits('imperial')
    }

    return (
        <div className='main_buttons'>
            {
                styleToggle.objects.map((elements, index) => (
                    <div
                        key={index}
                        className={toggleActiveStyle(index)}
                        onClick={() => {
                            toggleActive(index)
                            changeMetrics(index)
                        }}>
                        {elements}
                    </div>
                ))
            }
        </div>
    );
}
export default ButtonsUnits;
