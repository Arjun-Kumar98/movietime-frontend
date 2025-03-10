import React, { useState } from "react";
import MovieForm from "./components/MovieForm";
import './AddMovie.css';
import { useNavigate } from "react-router-dom";

function AddMovie() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const token =localStorage.getItem("token");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setErrors((prev) => ({ ...prev, title: "" }));
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
    setErrors((prev) => ({ ...prev, year: "" }));
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreviewUrl(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreviewUrl(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreviewUrl(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      title: title ? "" : "Title is required",
      year: year ? "" : "Publishing year is required"
    };
    setErrors(newErrors);
 
    if (!newErrors.title && !newErrors.year) {
      try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("year", year);
        formData.append("userId", userId);
        if (image) formData.append("image", image);

        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/movies/upload`, {
          method: "POST",
          headers: {
            "Authorization":`Bearer ${token}`,
            "X-Requested-With": "XMLHttpRequest", 
          },
          body: formData,
        });

        const result = await response.json();

        if (response.ok) {
          alert("Movie added successfully!");
          setTitle("");
          setYear("");
          setImage(null);
          setImagePreviewUrl(null);
          navigate('/movieList')
        } else {
          alert(result.error || "Something went wrong.");
        }
      } catch (err) {
        console.error("Movie upload error:", err);
        alert("Failed to upload movie.");
      }
    }
  };

  const handleCancel = () => {
    setTitle("");
    setYear("");
    setImage(null);
    setImagePreviewUrl(null);
    setErrors({});
  };

  return (
    <div className="add-movie-wrapper">
      <h1 className="add-movie-heading">Create a new movie</h1>
      <MovieForm
        mode="add"
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

export default AddMovie;
