import React,{useState} from 'react';
import './inputBox.css';

function InputField({type,placeholder,error,value,onChange}){
    const[isTyping,setIsTyping]=useState(false);

    const handleChange = (e) =>{
        onChange(e);
        setIsTyping(true);
    };

    return(
        <div>
            <input 
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            className ={`inputBox.${isTyping?'typing':''}${error?'error':''}`}
            />
            {error && <span className="error message">{error}</span>}
        </div>
    );
};

export default InputField;