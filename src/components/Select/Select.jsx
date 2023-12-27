import React, { useEffect, useState } from "react"
import "./Select.scss"

function Select({ options, clasname, id, defaultSelectName, selectedValue, changeHandler }) {

    const [displayOptions, setDisplayOptions] = useState(0);
    const handleOptionSelect = (val) => {
        changeHandler(val);
    };
    const handleOutsideClick = (e) => {
        if (!e.target.classList.contains("select-options-wrapper") && !e.target.classList.contains("selected-option") && !e.target.classList.contains("select-options") && !e.target.classList.contains("option")) {
            setDisplayOptions(0);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
    }, []);

    return (
        <div className={`custom-select ${clasname}`} id={id}>
            <div className={`selected-option ${(displayOptions) ? 'show' : ''}`} onClick={() => setDisplayOptions(!displayOptions)}>
                {
                    (selectedValue != '') ? selectedValue : defaultSelectName
                }
            </div>
            <div className={`select-options-wrapper ${(displayOptions) ? 'show' : ''}`}>
                <ul className="select-options">
                    <li className="option" onClick={() => {handleOptionSelect('');setDisplayOptions(!displayOptions)}}>{defaultSelectName}</li>
                    {
                        options.map((val, index) => <li className="option" key={index} onClick={() => {handleOptionSelect(val);setDisplayOptions(!displayOptions);}}>{val}</li>)
                    }
                </ul>
            </div>
        </div>
    )
}

export default Select;