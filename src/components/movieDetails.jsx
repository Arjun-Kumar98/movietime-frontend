import React from "react";
import "./movieDetails"
function MovieDetails(){
    return(
           <div>
            <div className="input-container">
                <input type="text" placeholder="title" className="input-box-two"/>
                <input type="text" placeholder="release year" className="input-box-one"/>
            </div>
            <div>
                <div className="submit-button">
                    <button className="submit-label">SUBMIT</button>
                </div>
                <div className="cancel-button">
                    <button className="cancel-label">CANCEL</button>
                </div>
            </div>
           </div>
    );
}
export default MovieDetails;