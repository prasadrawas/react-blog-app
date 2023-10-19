import React from "react";
import { Controller } from "react-hook-form";
import { BiImageAdd } from "react-icons/bi";

function ImageInput({ control, label, className, error, onImageChange, defaultImage }) {
  return (
    <div className={`w-full my-2 ${className}`}>
      <label className="font-semibold">{label}</label>

      <Controller
        name="image"
        control={control}
        defaultValue={defaultImage}
        rules={{
          required: "Image is required",
        }}
        render={({ field: { onChange, value } }) => (
          <label
            htmlFor="imageInput"
            className="rounded-xl bg-slate-100 w-full h-[300px] hover:bg-slate-200 cursor-pointer flex items-center justify-center my-3"
          >
            {(defaultImage || value) ? (
              <img
                src={value ? value : defaultImage}
                alt="Selected"
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              <BiImageAdd className="text-5xl" />
            )}
            <input
              type="file"
              accept="image/*"
              id="imageInput"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files[0];
                onImageChange(file);

                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    onChange(event.target.result);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </label>
        )}
      />
      {error && <p className="text-xs font-light text-red-500 mb-2">{error}</p>}
    </div>
  );
}

export default ImageInput;
