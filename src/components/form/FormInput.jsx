import React from "react";
import { requireMessages, validationMessages } from "../../constants/validation-message";

function FormInput({
  label,
  name,
  placeholder,
  defaultValue,
  type = "text",
  register,
  required = true,
  pattern,
  error,
  className,
}) {
  return (
    <div className={`${className}`}>
      <label className="font-semibold">{label}</label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        {...register(name, {
          required: {
            value: required,
            message: requireMessages[name],
          },
          pattern: pattern && {
            value: pattern,
            message: validationMessages[name],
          },
        })}
        className={`w-full p-3 outline-blue-500 hover:outline-blue-300 border-[2px] rounded-xl ${className}`}
      />
      <p className="text-xs font-light text-red-500 h-1 p-1">
        {!error ? "" : error}
      </p>
    </div>
  );
}

export default FormInput;
