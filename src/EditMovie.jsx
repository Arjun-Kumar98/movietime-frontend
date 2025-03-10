import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MovieForm from "./components/MovieForm";
import "./EditMovie.css";

function EditMovie() {
  const { movieId } = useParams(); 
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [errors, setErrors] = useState({});

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");


  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/movies/select?movieId=${movieId}&userId=${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();
        if (response.ok) {
          setTitle(result.movie.title);
          setYear(result.movie.year);
          setImagePreviewUrl(result.movie.poster_url);
        } else {
          alert(result.error || "Failed to fetch movie.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        alert("Error fetching movie details.");
      }
    };

    fetchMovieDetails();
  }, [movieId, userId, token]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setErrors((prev) => ({ ...prev, title: "" }));
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
    setErrors((prev) => ({ ...prev, year: "" }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreviewUrl(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      title: title ? "" : "Title is required",
      year: year ? "" : "Publishing year is required",
    };
    setErrors(newErrors);

    if (!newErrors.title && !newErrors.year) {
      try {
        const formData = new FormData();
        formData.append("movieId", movieId);
        formData.append("title", title);
        formData.append("year", year);
        formData.append("userId", userId);
        if (image) formData.append("image", image);

        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/movies/edit`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "X-Requested-With": "XMLHttpRequest",
          },
          body: formData,
        });

        const result = await response.json();
        if (response.ok) {
          alert("Movie updated successfully!");
          navigate("/movieList");
        } else {
          alert(result.error || "Update failed.");
        }
      } catch (err) {
        console.error("Update error:", err);
        alert("Failed to update movie.");
      }
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="edit-movie-wrapper">
      <h1 className="edit-movie-heading">Edit Movie</h1>

      <MovieForm
        mode="edit"
        title={title}
        year={year}
        image={image}
        imagePreviewUrl={imagePreviewUrl}
        errors={errors}
        onTitleChange={handleTitleChange}
        onYearChange={handleYearChange}
        onImageChange={handleImageChange}
        onRemoveImage={handleRemoveImage}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default EditMovie;
