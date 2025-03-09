import React, { useState } from "react";
import MovieForm from "./components/MovieForm";
import "./EditMovie.css"; // CSS for page-level styling

function EditMovie() {
  // Simulate existing data (could be from API)
  const existingMovie = {
    title: "Inception",
    year: "2010",
    image: null
  };

  const [title, setTitle] = useState(existingMovie.title);
  const [year, setYear] = useState(existingMovie.year);
  const [image, setImage] = useState(existingMovie.image);
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
      console.log("Movie Updated:", { title, year, image });
      // Submit update logic here
    }
  };

  const handleCancel = () => {
    console.log("Edit cancelled.");
    // Optionally navigate away
  };

  return (
    <div className="edit-movie-wrapper">
      <h1 className="edit-movie-heading">Edit Movie</h1>

      <MovieForm
        mode="edit"
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

export default EditMovie;
