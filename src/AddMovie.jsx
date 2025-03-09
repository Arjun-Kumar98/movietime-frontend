import React, { useState } from "react";
import MovieForm from "./components/MovieForm";
import './AddMovie.css' // New CSS for page-specific layout

function AddMovie() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setErrors((prev) => ({ ...prev, title: "" }));
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
    setErrors((prev) => ({ ...prev, year: "" }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      title: title ? "" : "Title is required",
      year: year ? "" : "Publishing year is required"
    };
    setErrors(newErrors);

    if (!newErrors.title && !newErrors.year) {
      console.log("Movie Submitted:", { title, year, image });
      // Submit to API
    }
  };

  const handleCancel = () => {
    setTitle("");
    setYear("");
    setImage(null);
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
        errors={errors}
        onTitleChange={handleTitleChange}
        onYearChange={handleYearChange}
        onImageChange={handleImageChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default AddMovie;
