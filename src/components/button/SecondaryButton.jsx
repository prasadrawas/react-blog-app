import React from "react";
import Loading from "../loading/Loading";

function SecondaryButton({
  onClick,
  title,
  className,
  type = "button",
  loading = false,
}) {
  return (
    <div className="relative">
      <input
        type={type}
        className={`bg-black text-white font-medium p-[10px] ${
          !loading && "cursor-pointer"
        } rounded-full px-5 ${
          loading ? "bg-slate-800" : "hover:bg-slate-800"
        } transition-all duration-300 ease-in-out ${className}`}
        value={loading ? "" : title}
        onClick={!loading ? onClick : null}
      />
      {loading && (
        <div className="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-5 h-5 border-t-2 border-b-2 border-slate-200 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}

export default SecondaryButton;
