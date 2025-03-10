import React from "react";
import { useNavigate } from "react-router-dom";
import "./MovieCard.css";

function MovieCard({ posterUrl, title, year, id }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    localStorage.setItem("movieId", id);
    navigate(`/editMovie/${id}`);
  };

  return (
    <div className="movie-card">
      <img src={posterUrl} alt={title} className="movie-poster" />
      <h4 className="movie-title">{title}</h4>
      <p className="movie-year">{year}</p>
      <button className="edit-movie-btn" onClick={handleEdit}>Edit</button>
    </div>
  );
}

export default MovieCard;
