import React from "react";

function PrimaryButton({ onClick, title, className, Icon }) {
  return (
    <button
      className={` bg-white text-slate-800 font-medium p-[10px] rounded-full px-5  transition-all duration-300 ease-in-out ${className}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default PrimaryButton;
