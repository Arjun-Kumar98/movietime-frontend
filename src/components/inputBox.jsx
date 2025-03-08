import React from "react";
import "./inputBox.css";

export const InputField = ({label,type='text',placeholder,error,value,onChange})=>{


const handleChange = (e)=>{
    onChange(e);
    setIsTyping(true);
};

    return(
      <div className="input-container">
        {label &&<label className = "input-label">{label}</label>}
      <input 
       type={type}
       placeholder={placeholder}
       value={value}
       onChange={handleChange}
       className={`input-field ${isTyping?'typing':''}${error ? 'error':' '}`}
       />
      {error && <span className="error-message">{error}</span>}
      </div>  
      
   );
};

 
