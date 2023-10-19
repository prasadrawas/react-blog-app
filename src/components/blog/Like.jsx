import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

function Like({ like = false, className }) {
  const [isLiked, setIsLiked] = useState(like);

  const onLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div
      onClick={onLike}
      className={`p-3 text-2xl right-0 cursor-pointer ${className}`}
    >
      {isLiked ? (
        <AiFillHeart className="text-red-500" />
      ) : (
        <AiOutlineHeart className="text-slate-800" />
      )}
    </div>
  );
}

export default Like;
