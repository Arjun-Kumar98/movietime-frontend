import React from "react";
import InputField from "./InputField";
import Button from "./Button";
import "./movieForm.css";

function MovieForm({
  title,
  year,
  image,
  imagePreviewUrl,
  errors,
  onTitleChange,
  onYearChange,
  onImageChange,
  onSubmit,
  onCancel,
  onRemoveImage,
  mode = "add"
}) {
  return (
    <form className="movie-form" onSubmit={onSubmit}>
      <div className="upload-panel">
        <label htmlFor="image-upload" className="image-drop-box">
          {imagePreviewUrl ? (
            <>
              <img
                src={imagePreviewUrl}
                alt="Preview"
                className="image-preview"
              />
              <p>{image?.name}</p>
            </>
          ) : (
            <>
              <span className="upload-icon">&#8682;</span>
              <p>{mode === "edit" ? "Drop other image here" : "Drop an image here"}</p>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            id="image-upload"
            onChange={onImageChange}
            hidden
          />
        </label>

        {image && (
          <div className="image-remove-icon" onClick={onRemoveImage} title="Remove image">
            X
          </div>
        )}
      </div>

      <div className="form-panel">
        <InputField
          type="text"
          placeholder="Title"
          value={title}
          onChange={onTitleChange}
          error={errors?.title}
          isTyping={!!title}
        />
        <InputField
          type="text"
          placeholder="Publishing year"
          value={year}
          onChange={onYearChange}
          error={errors?.year}
          isTyping={!!year}
        />

        <div className="button-group">
          <Button label="Cancel" variant="secondary" onClick={onCancel} />
          <Button
            label={mode === "edit" ? "Update" : "Submit"}
            variant="primary"
            type="submit"
          />
        </div>
      </div>
    </form>
  );
}

export default MovieForm;
