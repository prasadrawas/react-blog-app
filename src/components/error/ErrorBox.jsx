import React from "react";
import { MdOutlineError } from "react-icons/md";

function ErrorBox({ errorMessage, className }) {
  return (
    <div
      className={`flex items-center space-x-2 p-3 rounded-lg bg-red-500 text-white ${className} transition-all duration-300 ease-in`}
    >
      <MdOutlineError />
      <p className="text-sm">{errorMessage}</p>
    </div>
  );
}

export default ErrorBox;
