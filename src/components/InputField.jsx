import React from "react";
import "./InputField.css"

const InputField=({
    type,
    placeholder,
    value,
    onChange,
    error,
    isTyping
})=>{
    const inputClass = error
    ?"input-field error"
    :isTyping
    ?"input-field active"
    :"input-field";

    return(
        <div className="input-group">
            <input className={inputClass} type={type} placeholder={placeholder} value={value} onChange={onChange}/>
            {error && <p className = "error-message">{error}</p>}
        </div>
    );
}

export default InputField;