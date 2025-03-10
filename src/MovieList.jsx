// src/screens/MovieList.jsx
import React, { useEffect, useState } from "react";
import MovieCard from "./components/MovieCard";
import Pagination from "./components/Pagination";
import "./MovieList.css";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const MOVIES_PER_PAGE = 8;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/movies/list?userId=${userId}&page=${currentPage}&limit=${MOVIES_PER_PAGE}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();
        setMovies(result.movies);
        setTotalPages(result.totalPages);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [currentPage, userId]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const handleAddMovie = () => {
    window.location.href = "/addMovie";
  };

  return (
    <div className="movie-list-container">
      {movies.length > 0 && (
        <div className="movie-list-top-bar">
          <div className="movie-list-title">My movies</div>
          <div className="right-header-actions">
            <button className="add-movie-btn" onClick={handleAddMovie}>
              Add a new movie
            </button>
            <div className="logout-section" onClick={handleLogout}>
              <span className="logout-text">Logout</span>
              <span className="logout-icon">&#10162;</span>
            </div>
          </div>
        </div>
      )}

      {movies.length === 0 ? (
        <div className="empty-message">
          <h1>Your movie list is empty</h1>
          <button className="add-movie-btn" onClick={handleAddMovie}>
            Add a new movie
          </button>
        </div>
      ) : (
        <>
          <div className="movie-grid">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                year={movie.year}
                posterUrl={movie.poster_url}
              />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
    </div>
  );
}

export default MovieList;
