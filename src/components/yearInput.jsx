import React from "react";
import Select from 'react-select';
import './yearInput.css'

const YearSelect = ({value,onChange,error})=>{
    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({length:currentYear-1900+1},(_,i)=>{
        const year = 1900+i;
        return {value:year,label:year.toString()};
 } );

    return(
        <div className="input-group">
            <Select
            classNamePrefix="year-select"
            options={yearOptions}
            placeholder="Select year"
            isSearchable
            value={yearOptions.find((option)=>option.value===parseInt(value))}
                onChange={(selectedOption)=>onChange(selectedOption?.value||"")}
                />
            {error &&<p className="error-message">{error}</p>}
        </div>
    )
}

export default YearSelect;